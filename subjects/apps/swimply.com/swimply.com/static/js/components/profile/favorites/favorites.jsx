import React from 'react';
import { loader } from 'graphql.macro';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import InfiniteScroll from 'react-infinite-scroller';
import { ClipLoader } from 'react-spinners';
import Typography from '@material-ui/core/Typography';

import SearchResult from '../../results/searchresult';
import Pageloader from '../../commons/pageloader';

const favoritesQuery = loader( '../../../graphql/user/favorites.graphql' );

const styles = theme => ( {
  container: {
    maxWidth: '1170px',
    marginTop: '25px',
    margin: '0 auto',
    width: '100%',
    padding: '0 15px',
    minHeight: '100vh',
    '@media (max-width:1170px)': {
      maxWidth: '992px',
    },
    '@media (max-width:1000px)': {
      maxWidth: '750px',
    },
    '@media (max-width:767px)': {
      width: 'calc(100% - 30px)',
      overflowY: 'scroll',
    },
    '@media (max-height: 800px) and (min-width: 560px)': {
      minHeight: '800px',
    },
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
} );

class Favorites extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      page: 1,
      limit: 10,
      favorites: [],
      hasMore: false,
      loading: false,
      // isLoadingMore: false,
    };
    this.getFavorites = this.getFavorites.bind( this );
    this.loadMore = this.loadMore.bind( this );
    this.handleFavoriteChange = this.handleFavoriteChange.bind( this );
  }

  componentDidMount() {
    this.setState( { loading: true } );
    this.getFavorites();
  }

  getFavorites() {
    this.props.client.query( {
      query: favoritesQuery,
      variables: {
        count: this.state.limit,
        page: this.state.page || 1,
      },
      fetchPolicy: 'network-only',
    } )
      .then( ( res ) => {
        const updatedRes = res.data.myFavoritesPools.data.map( favorite => {
          favorite.isFavorite = true;
          return favorite;
        } );
        this.setState( prevProps => ( {
          loading: false,
          isLoadingMore: false,
          favorites: [...prevProps.favorites, ...updatedRes],
          hasMore: res.data.myFavoritesPools.paginatorInfo.hasMorePages,
        } ) );
      } );
  }

  loadMore() {
    this.setState( prevState => ( {
      page: prevState.page + 1,
      isLoadingMore: true,
    } ), () => {
      this.getFavorites();
    } );
  }

  handleFavoriteChange( poolId ) {
    const favoriteIndex = this.state.favorites.findIndex( favorite => favorite.id === poolId );
    this.setState( {
      favorites: update( this.state.favorites, {
        $splice: [[favoriteIndex, 1]],
      } ),
    } );
  }

  render() {
    const {
      favorites,
      loading,
      hasMore,
      isLoadingMore,
    } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadMore}
          hasMore={!isLoadingMore && hasMore}
        >
          <Typography variant="body1" component="div">
            {loading === true ? <Pageloader loading={loading} /> : ''}
            <div className={classes.container}>
              <SearchResult
                searchResults={favorites}
                onFavoriteChange={this.handleFavoriteChange}
                loading={loading}
                showDistance={false}
                noData={<div className={classes.textCenter}>
                  <Typography variant="subheading">No pools added to favorites.</Typography>
                </div>}
                showDefaultInstantBooking
                showFavPopup
                withSocialIcons
              />
            </div>
          </Typography>
          <div className={classes.loader}>
            <ClipLoader
              sizeUnit='px'
              size={50}
              color='#00ADE2'
              loading={isLoadingMore}
            />
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

Favorites.propTypes = {
  classes: PropTypes.object.isRequired,
};

const enhance = compose(
  withStyles( styles ),
  withRouter,
  withApollo,
);

export default enhance( Favorites );
