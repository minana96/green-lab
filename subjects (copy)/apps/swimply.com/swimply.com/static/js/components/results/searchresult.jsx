import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import StarRatings from 'react-star-ratings';
import PoolAvailabilities from './poolAvailabilities';
import UserUtils from '../utilities/UserUtils';
import TagManager from 'react-gtm-module';
import moment from 'moment';
import Slider from "react-slick";

// contexts
import RegionContext from '../../contexts/RegionContext'
import SocialIcons from "../shared/social-icons";

// services
import HelperService from '../../services/helper'

function SampleNextArrow(props) {
  const { className, onClick } = props
  return (
    <div
      className={className}
      style={{
        'position': 'absolute',
        'top': '50%',
        'right': '10px',
        'width': '32px',
        'background': 'url(../img/next.png)',
        'backgroundPosition': ' right',
        'zIndex': '9',
        'cursor': 'pointer',
        'opacity': '0.8',
        'fontSize': '25px',
        backgroundSize: '25px',
        backgroundRepeat: " no-repeat",
      }}
      onClick={onClick}
    ></div>
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props
  return (
    <div
      className={className}
      style={{
        'position': 'absolute',
        'top': '50%',
        'left': '10px',
        'width': '32px',
        'backgroundPosition': ' 0 0',
        'background': 'url(../img/prev.png)',
        'zIndex': '7',
        'cursor': 'pointer',
        'opacity': '0.8',
        'fontSize': '25px',
        backgroundSize: '25px',
      }}
      onClick={onClick}
    ></div>
  );
}

const styles = theme => ({
  searchResultsContainer: {
    marginBottom: '25px',

    display: 'flex',
    alignItems: 'flex-start',
    '@media (max-width:767px)': {
      display: 'block'
    }
  },
  resultMain: {
    position: 'relative',
    '& img': {
      width:'100%',
       borderRadius:'10px',
    }
  },
  leftSideCol: {
    '& h2': {
      marginBottom: '15px',
      fontSize: '25px',
    },
    '& p': {
      paddingBottom: '5px',
      marginBottom: '0px'
    },
    '& h4': {
      marginTop: '0px',
      marginBottom: '20px',
      fontWeight: '400',
      color: '#7b858b',
      '& div': {
        marginTop: '10px',
        color: '#ccc'
      },
    },
    '& img': {
      verticalAlign: 'middle',
      marginRight: '5px',
    },
    '& a': {
      textDecoration: 'none'
    },
    '@media (max-width:767px)':{
      position:'relative',
      '& h2': {
        fontSize:'18px',
        marginBottom:'5px',
        paddingRight:'60px',
      },
      '& h4': {
        fontSize:'14px',
        fontWeight:'300',
        '& div':{
          position: 'absolute',
          top: 0,
          marginTop:' 0px !important',
          right: 0,
          color: '#232323 !important',
          fontWeight: '500',
        }
      }
    }
  },
  perHour: {
    fontSize: '16px',
    paddingTop: '20px',
    '& span': {
      fontWeight: '500',
      fontSize: '20px',
      color: theme.palette.common.black,
      verticalAlign: 'middle',
      paddingRight: '10px',
    },
    '& p': {
      marginTop: '0'
    },
    '@media (max-width:767px)':{
      display:'inline-block',
    }
  },
  moreDetailsBtn: {
    maxWidth: '160px',
    '& span': {
      padding: '6px 25px',
      fontWeight: '300'
    },
    '@media (max-width:767px)':{
      display:'inline-block',
      verticalAlign: 'text-bottom',
      marginLeft: '25px',
      '& span': {
        padding: '12px 25px',


      },
    }
  },
  noResult: {
    '& p': {
      marginTop: '5px',
    },
    '& > div': {
      marginTop: '25px',
      '& p': {
        marginTop: '2px',
        fontSize: '12px',
        marginBottom: '0px',
      },
      '& p:last-child a': {
        marginLeft: '6px',
        color: '#1db6e5',
        textDecoration: 'none',
        cursor: 'pointer'
      }
    }
  },
  noAvailableLabel: {
    fontWeight: '500',
    color: theme.palette.common.black,
  },
  showRating: {
    paddingBottom:'5px'
  }
});


class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.redirectToPoolDetails = this.redirectToPoolDetails.bind(this);
  }

  redirectToPoolDetails(id) {
    let { history } = this.props;
    
    UserUtils.setBackBtnLink('search')

    let date = UserUtils.getAvailableDate();
    if(date !== null && date !== undefined) {
      date = moment(date).format('YYYY-MM-DD')
    } else {
      date = '';
    }

    TagManager.dataLayer({
      dataLayer: {
        poolID: id,
        date: date,
        location: UserUtils.getAddress()
      },
      events: {
        poolPageView: 'poolPageView'
      }
    });

    history.push(`/pooldetails/${id}?from=search`);
    UserUtils.removeMessageReceiverId();
  }

  /**
   * render
   */
  render() {
    const { classes, searchResults, searchFields, loading } = this.props;
    const settings = {
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };

    const {
      showDistance,
      noData,
      showDefaultInstantBooking,
      withSocialIcons
    } = this.props;
    const isUs = HelperService.isUsRegion(this.props.region)

    return (

      <div >
        {
          searchResults.map((data, index) =>{
            const sortedImages = data.images && data.images.slice().sort((prev) => {
              if (prev.cover) {
                return -1
              } else {
                return 0
              }
            })

            return(
            <Grid container spacing={24} className={classes.searchResultsContainer} key={`pool-${data.id}`}>
              <Grid item xs={12} sm={7}>
                <div className={classes.resultMain}>
                  <div className="social-icons-absolute top right">
                    { withSocialIcons
                    && <SocialIcons
                      isFavorite={data.isFavorite}
                      poolId={data.id}
                      userRole="swimmer"
                      onFavoriteChange={this.props.onFavoriteChange}
                      handleShowFavPopup={this.props.showFavPopup}
                    /> }
                  </div>
                  <Slider {...settings}>
                    {sortedImages.length > 0 && sortedImages.map((img, imgIndex) =>
                      <div key={imgIndex}>
                        <img alt="" src={img.url} />
                      </div>
                    )}
                    {sortedImages.length <= 0 &&
                      <div>
                        <img alt="" src={window.location.origin + "/img/default-pool.png"} />
                      </div>
                    }
                  </Slider>
                </div>
              </Grid>

              <Grid item xs={12} sm={5}>
                <div className={classes.leftSideCol}>
                  <Typography variant="h2">{data.title}</Typography>
                  <Typography variant="h4">
                    {( data.city !== '' && data.city !== null ) ? data.city+', ':''} {(data.state !== '' && data.state !== null ) ? data.state+', ':''} {data.zip_code !== '00000'?(''+data.zip_code):''}
                    {showDistance && <div>{data.distance.toFixed( 2 )} {isUs ? 'miles' : 'kilometres'}</div>}
                  </Typography>
                  <p dangerouslySetInnerHTML={{ __html: data.description }}/>

                  {(searchFields && searchFields.startTime !== '' && searchFields.endTime !== '') ?
                    <PoolAvailabilities
                      from="search"
                      poolDetails={data}
                      isDefaultInstantBooking={data.default_instant_booking}
                      searchFields={searchFields}
                    />
                   : ''}
                  {showDefaultInstantBooking && data.default_instant_booking &&
                  <label>
                    <img alt='' src={window.location.origin + "/img/time.png"} /> Book Instantly
                  </label>}
                  <div className={classes.perHour}>
                    <span>${data.hourly_price ? data.hourly_price : 0}{' '}</span>per hour
                    <div className={classes.showRating}>
                      {(data.rating!==null&&data.rating!==''&&data.rating!==0&&
                        <StarRatings
                          rating={(data.rating===null || data.rating === '')?0:data.rating}
                          changeRating={this.changeRating}
                          numberOfStars={5}
                          name='rating'
                          starRatedColor="#00ade2"
                          starDimension="20px"
                          starSpacing="1px"
                        />
                      )}

                    </div>
                  </div>
                  <div className={classes.moreDetailsBtn} onClick={this.redirectToPoolDetails.bind(this, data.id)}>
                    <Typography variant="button">
                      More Details
                      </Typography>
                  </div>

                </div>
              </Grid>
            </Grid>

          )})
        }
        {
          searchResults.length === 0 && !loading ?
            <div className={classes.noResult}>
              {noData ? noData : (
                <div>
                  <Typography variant="h3">Doesn't seem like there is anything available then</Typography>
                  <p>Try modifying your search</p>
                  <div className={classes.noResultSendMessage}>
                    <p>We may not have any pools in your area. Let us lend a hand.</p>
                    <p>Can’t find a pool?<a href="#/" onClick={(event) => {
                      if (event) {
                        event.preventDefault()
                        event.stopPropagation()
                      }
                      this.props.showPopupCallback()
                    }}>Click here</a></p>
                  </div>
                </div>
              )}
            </div>
            : ""
        }
      </div>
    );
  }
}

SearchResult.defaultProps = {
  // error: null,
  onFavoriteChange: null,
  showDistance: true,
  showDefaultInstantBooking: false,
  showFavPopup: false,
  withSocialIcons: false
};

SearchResult.propTypes = {
  classes: PropTypes.object.isRequired,
  onFavoriteChange: PropTypes.func,
  showDistance: PropTypes.bool,
  showDefaultInstantBooking: PropTypes.bool,
  noData: PropTypes.any,
  showFavPopup: PropTypes.bool,
  withSocialIcons: PropTypes.bool
};

const enhance = compose(
  withStyles(styles),
  withRouter,
);

function SearchResultContainer (props) {
  const { region } = useContext(RegionContext)
  return <SearchResult region={region} {...props} />
}

export default enhance(SearchResultContainer)
