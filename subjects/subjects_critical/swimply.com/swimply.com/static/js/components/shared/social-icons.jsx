import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Input,
  IconButton,
  ClickAwayListener,
  Modal,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { loader } from 'graphql.macro';
import { withApollo } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';
import { GRAPHQL_SERVER_BASE_URL } from '../../config';
import UserUtils from '../utilities/UserUtils';
import * as commonFunctions from '../utilities/commonFunctions';

const updateFavoriteQuery = loader( '../../graphql/user/updateFavorite.graphql' );
const buttonStyles = {
  cursor: 'pointer',
  padding: '6px 16px',
  fontSize: '0.875rem',
  minWidth: '120px',
  textAlign: 'center',
  transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  lineHeight: '1.75',
  fontFamily: 'Poppins, sans-seri',
  fontWeight: 500,
  borderRadius: '4px',
  textTransform: 'uppercase',
  border: 0,
  outline: 'none',
};

const styles = theme => ( {
  icons: {
    display: 'flex',
    '& .icon': {
      width: '25px',
      height: '25px',
      display: 'block',
      backgroundSize: 'cover',
      cursor: 'pointer',
      '&.share': {
        backgroundImage: 'url(../img/icons/share.png)',
        '&.blue': {
          backgroundImage: 'url(../img/icons/share-blue.png)',
        },
      },
      '&.favorite': {
        marginLeft: '20px',
        backgroundImage: 'url(../img/icons/heart.png)',
        '&.blue': {
          backgroundImage: 'url(../img/icons/heart-blue.png)',
        },
        '&.active': {
          backgroundImage: 'url(../img/icons/heart-filled.png)',
        },
      },
    },
    '& .share-container': {
      position: 'relative',
    },
    '& .share-section': {
      padding: '15px',
      position: 'absolute',
      background: '#fff',
      boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
      borderRadius: '4px',
      right: '-15px',
      bottom: '35px',
      display: 'flex',
      opacity: 0,
      '@media (max-width:420px)': {
        right: '-60px',
      },
      '&.bottom': {
        bottom: '-85px',
      },
      '&.visible': {
        opacity: 1,
      },
      '& input': {
        width: '330px',
        flexShrink: 1,
        '@media (max-width:420px)': {
          width: '260px',
        },
        '@media (max-width:370px)': {
          width: '220px',
          fontSize: '11px',
        },
      },
      '& button': {
        marginLeft: '15px',
        '@media (max-width:380px)': {
          padding: '15px 5px',
        },
      },
    },
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    outline: 'none',
  },
  modalContainer: {
    padding: '25px',
    backgroundColor: theme.palette.common.white,
    borderRadius: '4px',
    outline: 'none',
  },
  buttonContainer: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'space-around',
  },
  button: {
    ...buttonStyles,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  cancelButton: {
    ...buttonStyles,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.darkgray,
  },
} );

const SocialIcons = ( {
  isFavorite,
  classes,
  poolId,
  isBlue,
  isEditable,
  userRole,
  onFavoriteChange,
  client,
  user,
  refreshToken,
  history,
  poolStatus,
  handleShowFavPopup,
  updateUserFavorites,
} ) => {
  const [showFavorite, setShowFavorite] = useState( isFavorite );
  const [showShare, setShowShare] = useState( false );
  const [showPopup, setShowPopup] = useState( false );
  const inputRef = useRef();
  const shareRef = useRef();
  const baseUrl = GRAPHQL_SERVER_BASE_URL
    .replace( 'admin.', '' )
    .replace( 'us.', '' );
  const shareUrl = `${baseUrl}pooldetails/${poolId}`;

  useEffect( () => {
    setShowFavorite( isFavorite );
  }, [isFavorite] );

  const handleRequest = async ( newValue ) => {
    try {
      await client.mutate( {
        mutation: updateFavoriteQuery,
        variables: {
          data: {
            pool_id: poolId,
            favorite: newValue,
          },
        },
      } );
    } catch ( error ) {
      const errorMsg = commonFunctions.parseGraphQLErrorMessage( error );
      if ( errorMsg === 'Unauthenticated.' ) {
        const status = await refreshToken();
        if ( status === 'logout' ) {
          UserUtils.logout();
          history.push( '/' );
        } else {
          handleRequest( newValue );
        }
      }
    }
  };

  const handleFavorite = async ( e ) => {
    e.stopPropagation();
    if ( isEditable ) {
      const newValue = !showFavorite;
      setShowFavorite( newValue );
      if ( onFavoriteChange ) {
        onFavoriteChange( poolId );
      }
      await handleRequest( newValue );
      let updatedFavorites = [ ...user.favorites ];
      const favoriteIndex = user.favorites.findIndex( favorite => favorite === +poolId );
      if ( favoriteIndex >= 0 ) {
        user.favorites.splice( favoriteIndex, 1 );
        updatedFavorites = user.favorites;
      } else {
        user.favorites.push( +poolId );
        updatedFavorites = user.favorites;
      }
      updateUserFavorites( updatedFavorites );
      setShowPopup( false );
    }
  };

  const showFavPopup = ( e ) => {
    e.stopPropagation();
    setShowPopup( true );
  };

  const hidePopup = () => {
    setShowPopup( false );
  };

  const copyToClipboard = () => {
    const tempInput = document.createElement( 'input' );
    tempInput.value = shareUrl;
    document.body.appendChild( tempInput );
    tempInput.select();
    document.execCommand( 'copy' );
    document.body.removeChild( tempInput );
  };

  const handleShareDialog = ( e ) => {
    e.stopPropagation();
    const offsetTop = e.target.getBoundingClientRect().top;
    const newValue = !showShare;
    setShowShare( newValue );
    if ( !showShare ) {
      setTimeout( () => {
        if ( offsetTop <= 145 ) {
          shareRef.current.classList.add( 'bottom' );
        }
        shareRef.current.classList.add( 'visible' );
      }, 200 );
    }
  };


  if ( user ) {
    return <div className={classes.icons}>
      {/* Visible to Swimmer or Host if pool live or commercial_live */}
      {( userRole === 'swimmer' || ( userRole === 'host' && ( poolStatus === 1 || poolStatus === 5 ) ) )
        && (
        <div className="share-container">
          <span
            className={`icon share ${isBlue ? 'blue' : ''}`}
            onClick={handleShareDialog}
          />
          {showShare
          && (
            <ClickAwayListener onClickAway={handleShareDialog}>
              <div className="share-section" ref={shareRef}>
                <Input ref={inputRef} type="text" fullWidth value={shareUrl} />
                <IconButton variant="outlined" onClick={copyToClipboard}>
                  <FileCopyOutlinedIcon color="action" fontSize="small" />
                </IconButton>
              </div>
            </ClickAwayListener>
          )
          }
        </div>
        )
      }

      {/* Visible only to swimmer */}
      {userRole === 'swimmer'
      && <span
        className={`icon favorite ${showFavorite ? 'active' : ''} ${isBlue ? 'blue' : ''}`}
        onClick={( e ) => (
          handleShowFavPopup
            ? showFavPopup( e )
            : handleFavorite( e )
        )}
      />
      }
      <Modal
        open={handleShowFavPopup && showPopup}
        className={classes.modal}
      >
        <div className={classes.modalContainer}>
          <Typography variant="subheading">
            Are you sure you want to remove this pool from favorites?
          </Typography>
          <div className={classes.buttonContainer}>
            <button type="button" className={[classes.cancelButton]} onClick={hidePopup}>Cancel</button>
            <button
              type="button"
              className={classes.button}
              onClick={handleFavorite}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </div>;
  }

  return <div />;
};

SocialIcons.propTypes = {
  poolId: PropTypes.string.isRequired,
  classes: PropTypes.object,
  isFavorite: PropTypes.bool,
  isBlue: PropTypes.bool,
  isEditable: PropTypes.bool,
  userRole: PropTypes.string.isRequired,
  onFavoriteChange: PropTypes.func,
  user: PropTypes.object.isRequired,
  refreshToken: PropTypes.func,
  history: PropTypes.object.isRequired,
  client: PropTypes.shape( {
    mutate: PropTypes.func.isRequired,
  } ).isRequired,
  poolStatus: PropTypes.number,
  handleShowFavPopup: PropTypes.bool,
  updateUserFavorites: PropTypes.func.isRequired
};

SocialIcons.defaultProps = {
  classes: {},
  isFavorite: false,
  isBlue: false,
  isEditable: true,
  onFavoriteChange: null,
  refreshToken: null,
  poolStatus: 1,
  handleShowFavPopup: false,
};

const enhance = compose(
  withStyles( styles ),
  withApollo,
  withRouter,
);

function SocialIconsContainer( props ) {
  const userContext = useContext( UserContext );
  return <SocialIcons {...userContext} {...props} />;
}

export default enhance( SocialIconsContainer );
