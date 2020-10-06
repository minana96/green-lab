import React, {useContext} from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { withApollo } from 'react-apollo';
import { loader } from 'graphql.macro';
import { ClipLoader } from 'react-spinners';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import SearchResultForm from './searchresultform';
import SearchResult from './searchresult';
import UserUtils from '../utilities/UserUtils';
import { getParameterByName } from '../utilities/commonFunctions';
import Pageloader from '../commons/pageloader';
import SaveSearchPopup from './save-search-popup';
import { IS_US } from '../../config';
import { sendAnalytics } from '../utilities/analyticsUtils';

import SwimmerPlaceholder from '../shared/swimmer-placeholder';
import UserContext from "../../contexts/UserContext";

const searchPoolPaginatedQuery = loader( '../../graphql/findpool/searchPoolQuery.graphql' );

const styles = theme => ( {
  container: {
    maxWidth: '1170px',
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
    }
  },
  foundResult: {
    paddingBottom: '25px',
    paddingTop: '8px',
    borderBottom: '1px solid #f3eded',
    marginBottom: '40px',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
  },

} );

class Results extends React.Component {
  constructor( props ) {
    super( props );
    const addressFromQueryURL = getParameterByName('address')
    if (addressFromQueryURL) {
      UserUtils.setAddress(addressFromQueryURL)
      window.location.href = window.location.origin + window.location.pathname
    } else if (!UserUtils.getAddress()) {
      UserUtils.setAddress(IS_US ? 'Los Angeles, CA, USA' : 'Sydney NSW, Australia')
    }
    this.state = {
      address: IS_US ? 'Los Angeles, CA, USA' : 'Sydney NSW, Australia',
      available_date: '',
      available_time_from: '',
      available_time_to: '',
      searchFields: {},
      searchResultsCount: 0,
      searchResults: [],
      loading: true,
      limit: 10,
      page: 1,
      maxPage: 1,
      isLoadingMore: false,
      showSaveSearchPopup: false,
      currentPoolId: '',
      showSwimmerPlaceholder: false
    };
    this.timerId = null;
    this.loadMore = this.loadMore.bind( this );
    this.getItems = this.getItems.bind( this );
    this.hidePopupCallback = this.hidePopupCallback.bind(this)
    this.showPopupCallback = this.showPopupCallback.bind(this)
    this.toggleLoaderCallback = this.toggleLoaderCallback.bind(this)
  }

  componentWillMount() {
    UserUtils.removeStartTime()
    UserUtils.removeEndTime()
    UserUtils.removeAvailableDate()
    window.scrollTo( 0, 0 );
    UserUtils.setPoolSearchPage( 1 );
    const fullAddress = UserUtils.getAddress() || ''
    this.getItems( true )
      .then( ( res ) => {
        const paginatedResponse = (res && res.data && res.data.searchPoolPaginated) || {}
        const searchResults = paginatedResponse.data ? paginatedResponse.data.map(pool => {
          pool.isFavorite = this.props.user && this.props.user.favorites.indexOf(+pool.id) >= 0
          return pool;
        }) : [];
        this.setState( {
          searchResultsCount: (paginatedResponse.paginatorInfo && paginatedResponse.paginatorInfo.total) || 0,
          searchResults,
          loading: false,
        }, () => {
          let currentSearchedZipCode = fullAddress.replace(/,/g, '')
          let pastZipCodesArray = localStorage.getItem('searched_zip_codes') && localStorage.getItem('searched_zip_codes').split(',')

          if (this.state.searchResultsCount === 0) {
            if (pastZipCodesArray && !pastZipCodesArray.includes(currentSearchedZipCode)) {
              pastZipCodesArray.push(currentSearchedZipCode)
              localStorage.setItem('searched_zip_codes', pastZipCodesArray)

              this.setState({ showSaveSearchPopup: true })
            } else if (!pastZipCodesArray) {
              localStorage.setItem('searched_zip_codes', [currentSearchedZipCode])

              this.setState({ showSaveSearchPopup: true })
            }
          } else {
            if (pastZipCodesArray && !pastZipCodesArray.includes(currentSearchedZipCode)) {
              pastZipCodesArray.push(currentSearchedZipCode)
              localStorage.setItem('searched_zip_codes', pastZipCodesArray)

              this.timerId = setTimeout(() => {
                this.setState({ showSaveSearchPopup: true })
              }, 10000)
            } else if (!pastZipCodesArray) {
              localStorage.setItem('searched_zip_codes', [currentSearchedZipCode])

              this.timerId = setTimeout(() => {
                this.setState({ showSaveSearchPopup: true })
              }, 10000)
            }
          }
        });
      } );
    const fullAddressArr = fullAddress.split(',').reverse()
    const analyticsData = {
      timestamp: new Date().toISOString(),
      'event_type': 'initial-search',
      fullAddress,
      country: fullAddressArr[0],
      city: fullAddressArr[IS_US ? 2 : 1] || '',
      weekDay: moment( this.getAvailableDate() ).format( 'dddd' ),
      startTime: UserUtils.getStartTime(),
      endTime: UserUtils.getEndTime(),
      platform: 'web',
      location: IS_US ? 'US' : 'AU',
      userId: UserUtils.getUserID(),
      userRole: 'swimmer',
    };
    sendAnalytics( this.props.client, analyticsData );
  }

  getAvailableDate() {
    let available_date = UserUtils.getAvailableDate();
    available_date = available_date === null ? new Date() : available_date;
    const date = new Date( available_date );
    const day = date.getDate();
    const year = date.getFullYear();
    let monthVal = date.getMonth() + 1;
    monthVal = monthVal < 10 ? `0${monthVal}` : monthVal
    return `${year}-${monthVal}-${day}`;
  }

  componentWillUnmount() {
    clearTimeout(this.timerId);
  }

  returnSuffix = (hours, adding = 0) => {
    if (0 <= (parseInt(hours) + adding) && (parseInt(hours) + adding) < 12) {
      return ':00 AM'
    } else if (24 > (parseInt(hours) + adding) && (parseInt(hours) + adding) >= 12) {
      return ':00 PM'
    } else if (36 > (parseInt(hours) + adding) && (parseInt(hours) + adding) >= 24) {
      return ':00 AM'
    } else if (-12 <= (parseInt(hours) + adding) && (parseInt(hours) + adding) < 0) {
      return ':00 PM'
    }
  }

  getItems( showLoader = false ) {
    const address = UserUtils.getAddress() || '';
    let checkedFlexibleTime = UserUtils.getFlexibleHours();
    let checkedInstantBooking = UserUtils.getInstantBooking();
    const adultCount = UserUtils.getAdultCount() || 1;
    const childrenCount = UserUtils.getChildCount() || 0;
    const infantCount = UserUtils.getInfantCount() || 0;
    let timerRangeMin = UserUtils.getTimerMin();
    let timerRangeMax = UserUtils.getTimerMax();
    let startTime = UserUtils.getStartTime() || '';
    let endTime = UserUtils.getEndTime() || '';
    let available = UserUtils.checkAvailableDate() || '';
    let currentHour = new Date().getHours();
    let amenities = UserUtils.getAmenities() || [];
    let startPrice = UserUtils.getStartPrice() || 15;
    let endPrice = UserUtils.getEndPrice() || 200;

    // first search time
    const anytime = showLoader ? !startTime : !!this.state.searchFields.anytime // check if function called on initialization or on load more
    const anyDate = showLoader ? !available : !!this.state.searchFields.anyDate // check if function called on initialization or on load more

    available = this.getAvailableDate()

    if ( timerRangeMin === null ) {
      if ( currentHour >= 18 ) {
        // currentHour = 18;
      }
    } else {
      timerRangeMin = parseInt( timerRangeMin );
      timerRangeMax = parseInt( timerRangeMax );
    }

    // let currentDate = new Date().getDate()
    // let availableDate = new Date(available).getDate()

    checkedFlexibleTime = checkedFlexibleTime === 'true';
    checkedInstantBooking = checkedInstantBooking === 'true';
    const searchFields = {
      address: address,
      available_date: available,
      checkedFlexibleTime,
      checkedInstantBooking,
      adultCount: adultCount,
      childrenCount: childrenCount,
      infantCount: infantCount,
      timerRange: {
        // min: (!timerRangeMin || timerRangeMin < currentHour) ? currentHour + 2 : timerRangeMin,
        // max: (!timerRangeMax || timerRangeMax < currentHour + 2) ? currentHour + 4 : timerRangeMax
        min: anytime ? 7 : timerRangeMin,
        max: anytime ? 24 : timerRangeMax,
      },
      amenities: amenities,
      budget: {
        low: startPrice,
        high: endPrice
      },
      // endTime: (!endTime || (availableDate <= currentDate && parseInt(endTime) < currentHour + 2)) ? (currentHour + 4) + this.returnSuffix(currentHour, 4) : endTime,
      // startTime: (!startTime || (availableDate <= currentDate && parseInt(startTime) < currentHour)) ? (currentHour + 2) + this.returnSuffix(currentHour, 2) : startTime,
      endTime: anytime ? '12:00 AM' : endTime,
      startTime: anytime ? '7:00 AM' : startTime,
      anytime,
      anyDate
    };

    if (parseInt(searchFields.startTime) > 12) {
      if (parseInt(searchFields.startTime) >= 24) {
        searchFields.startTime = 10 + ':00 PM'
        // TODO maybe change searchFields.timerRange here?
      } else {
        searchFields.startTime = (parseInt(searchFields.startTime) - 12) + ':00 PM'
      }
    }
    if (parseInt(searchFields.endTime) > 12) {
      if (parseInt(searchFields.endTime) >= 24) {
        searchFields.endTime = 12 + ':00 AM'
      } else {
        searchFields.endTime = (parseInt(searchFields.endTime) - 12) + ':00 PM'
      }
    }
    
    this.setState( {
      searchFields,
      loading: showLoader,
    } );
    let page = UserUtils.getPoolSearchPage();
    if (!startTime) {
      startTime = searchFields.startTime
    }
    if (!endTime) {
      endTime = searchFields.endTime
    }

    let restroom = amenities.includes('restroom')
    amenities = amenities.filter(item => item !== 'restroom')
    amenities = amenities.map(item => parseInt(item))
    return this.props.client.query( {
      query: searchPoolPaginatedQuery,
      variables: {
        datas: {
          address,
          available_date: searchFields.anyDate ? '' : available,
          available_time_from: searchFields.anytime && searchFields.anyDate ? '' : startTime,
          available_time_to: searchFields.anytime && searchFields.anyDate ? '' : endTime,
          adult: adultCount,
          children: childrenCount,
          infants: infantCount,
          instant_booking: checkedInstantBooking,
          flexible_hours: checkedFlexibleTime,
          budget: {
            low: startPrice,
            high: endPrice
          },
          amenities: amenities,
          restroom: restroom
        },
        count: 4,
        page: page || 1,
      },
      fetchPolicy: 'network-only',
    } )
      .then( ( res ) => {
        if ( !page ) {
          page = 1;
        }
        if ( page <= res.data.searchPoolPaginated.paginatorInfo.lastPage ) {
          UserUtils.setPoolSearchPage( page + 1 );
          this.setState( {
            page: page + 1,
            maxPage: res.data.searchPoolPaginated.paginatorInfo.lastPage,
          } );
        }
        this.setState( { loading: false } );
        return res;
      } ).catch( ( error ) => {
        this.setState( { loading: false } );
      } );
  }

  modifySearchResult( result, data, totalCount, updatePagination = false, onSearchClick = false ) {
    const fullAddress = UserUtils.getAddress() || ''
    if ( updatePagination ) {
      UserUtils.setPoolSearchPage( 2 );
      this.setState( { page: 2 } );
    }

    this.setState( {
      searchResultsCount: totalCount,
      searchResults: result,
      searchFields: data,
      loading: false,
    }, () => {
      if (onSearchClick) {
        let currentSearchedZipCode = fullAddress.replace(/,/g, '')
        let pastZipCodesArray = localStorage.getItem('searched_zip_codes') && localStorage.getItem('searched_zip_codes').split(',')

        if (this.state.searchResultsCount === 0) {
          if (pastZipCodesArray && !pastZipCodesArray.includes(currentSearchedZipCode)) {
            pastZipCodesArray.push(currentSearchedZipCode)
            localStorage.setItem('searched_zip_codes', pastZipCodesArray)

            this.setState({ showSaveSearchPopup: true })
          } else if (!pastZipCodesArray) {
            localStorage.setItem('searched_zip_codes', [currentSearchedZipCode])

            this.setState({ showSaveSearchPopup: true })
          }
        } else {
          if (pastZipCodesArray && !pastZipCodesArray.includes(currentSearchedZipCode)) {
            pastZipCodesArray.push(currentSearchedZipCode)
            localStorage.setItem('searched_zip_codes', pastZipCodesArray)

            this.timerId = setTimeout(() => {
              this.setState({ showSaveSearchPopup: true })
            }, 10000)
          } else if (!pastZipCodesArray) {
            localStorage.setItem('searched_zip_codes', [currentSearchedZipCode])

            this.timerId = setTimeout(() => {
              this.setState({ showSaveSearchPopup: true })
            }, 10000)
          }
        }
      }
    });
  }

  emptySearchResult() {
    this.setState( {
      searchFields: {},
      searchResultsCount: 0,
      searchResults: [],
      loading: true,
    } );
  }

  turnOffLoading() {
    this.setState( {
      loading: false,
    } );
  }

  loadMore() {
    this.setState( { isLoadingMore: true } );
    this.getItems()
      .then( ( res ) => {
        const { searchResults, searchFields } = this.state;
        setTimeout( () => {
          this.setState( { isLoadingMore: false } );
        }, 500 );
        const searchPoolPaginated = res && res.data && res.data.searchPoolPaginated ? res.data.searchPoolPaginated : {}
        const newSearchResults = searchPoolPaginated.data ? searchPoolPaginated.data.map(pool => {
          pool.isFavorite = this.props.user && this.props.user.favorites.indexOf(+pool.id) >= 0;
          return pool;
        }) : [];
        this.modifySearchResult(
          [...searchResults, ...(newSearchResults || [])],
          searchFields,
          searchPoolPaginated.paginatorInfo ? searchPoolPaginated.paginatorInfo.total : 0
        );
      } );
  }

  hidePopupCallback() {
    this.setState({ showSaveSearchPopup: false })
  }

  showPopupCallback() {
    this.setState({ showSaveSearchPopup: true })
  }

  toggleLoaderCallback(isLoading) {
    this.setState({ loading: isLoading, isLoadingMore: isLoading })
  }

  render() {
    const { classes } = this.props;
    const {
      searchResultsCount, searchResults, searchFields, loading, isLoadingMore, page, maxPage,
    } = this.state;

    if (this.state.showSwimmerPlaceholder) {
      return (
        <SwimmerPlaceholder currentPoolId={this.state.currentPoolId} user='swimmer' />
      )
    }

    return (
      <div>
        <SaveSearchPopup
          userSearchedAddress={searchFields.address}
          showPopup={this.state.showSaveSearchPopup}
          hidePopupCallback={this.hidePopupCallback}
        />
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadMore}
          hasMore={searchResults.length < searchResultsCount && !isLoadingMore && (page <= maxPage + 1)}
        >
          <Typography variant='body1' component='div'>
            {loading === true ? <Pageloader loading={loading}/> : ''}
            <div className={classes.root}>
              <div className={classes.container}>
                <div className={classes.resultContainer}>
                  <SearchResultForm searchFields={searchFields} modifySearchResult={this.modifySearchResult.bind(this)}
                                    emptySearchResult={this.emptySearchResult.bind(this)}
                                    turnOffLoading={this.turnOffLoading.bind(this)}/>
                  <Typography variant='h6'>
                    <p className={classes.foundResult}>
                      {searchResultsCount}
                      {' '}
                      pools found
                    </p>
                  </Typography>
                  <div>
                    <SearchResult
                      searchResults={searchResults}
                      searchFields={searchFields}
                      loading={loading}
                      showPopupCallback={this.showPopupCallback}
                      checkSwitchNeeded={this.checkSwitchNeeded}
                    />
                  </div>
                </div>
              </div>
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
Results.propTypes = {
  classes: PropTypes.object.isRequired,
};


const enhance = compose(
  withStyles( styles ),
  withApollo,
  withRouter
);

function ResultsContainer( props ) {
  const userContext = useContext( UserContext );
  return <Results {...userContext} {...props} />;
}

export default enhance( ResultsContainer );
