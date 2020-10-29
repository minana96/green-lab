import React, { useContext } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import mobiscroll from '@mobiscroll/react';
import Typography from '@material-ui/core/Typography';
import { loader } from 'graphql.macro';
import _ from 'lodash'
import update from 'immutability-helper'

import Pageloader from '../commons/pageloader';
import UserUtils from '../utilities/UserUtils';
import * as commonFunctions from '../utilities/commonFunctions';
import HourlyAvailability from '../commons/hourlyAvailability';
import { IS_US, timeArray } from '../../config';
import Stepper from '../host/stepper';
import { sendAnalytics } from "../utilities/analyticsUtils";
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'

// components
import ErrorMessage from '../commons/error-message'

// constants
import { OBJECT_TIME_ARRAY } from '../../constants'

// contexts
import UserContext from '../../contexts/UserContext'

// services
import HelperService from '../../services/helper'

const savePoolDaysUnAvailability = loader( './../../graphql/host/savePoolDayUnavailability.graphql' );
const pooldetailsQuery = loader( './../../graphql/findpool/pooldetailsQuery.graphql' );
const savePoolUnAvailability = loader( './../../graphql/host/savepoolunavailability.graphql' );

// Can be three objects with arrays of elements or just a simple array of elements but with status
const calendarData = {
  available: [{
    start: '2020-03-01T00:00:00.000Z',
    end: '2020-03-31T00:00:00.000Z',
  }],
  unavailable: [{
    start: '2020-04-01T00:00:00.000Z',
    end: '2020-04-30T00:00:00.000Z',
  }],
  partiallyAvailable: [{
    start: '2020-05-01T00:00:00.000Z',
    end: '2020-05-31T00:00:00.000Z',
  }],
};

const styles = theme => ( {
  container: {
    maxWidth: '1170px',
    margin: '0 auto',
    width: '100%',
    padding: '0 15px',
    '@media (max-width:1170px)': {
      maxWidth: '992px',
    },
    '@media (max-width:1000px)': {
      maxWidth: '750px',
    },
    '@media (max-width:767px)': {
      width: 'calc(100% - 30px)',
      position: 'fixed',
      top: '0',
      background: '#fff',
      zIndex: '23',
      height: '100%',
      overflow: 'auto',
    },
    '& .mbsc-form-group': {
      maxWidth: '400px',
      marginRight: 'auto',
      marginLeft: 'auto'
    },
    '& .mbsc-mobiscroll .mbsc-cal-c .mbsc-cal .mbsc-cal-body .mbsc-cal-day-picker .mbsc-cal-row .mbsc-selected .mbsc-cal-cell-txt': {
      background: '#fff',
      color: '#000',
      borderColor: '#000',
      '&:hover': {
        background: '#DEE0DE',
      }
    },
    '& .mbsc-material .mbsc-cal-c .mbsc-cal .mbsc-cal-body .mbsc-cal-row .mbsc-selected .mbsc-cal-cell-txt': {
      background: '#fff !important',
      color: '#000 !important',
      borderColor: '#000 !important',
    },
    '& .mbsc-mobiscroll .mbsc-cal-c .mbsc-cal .mbsc-cal-body .mbsc-cal-day-picker .mbsc-cal-row .mbsc-cal-cell-txt:hover': {
      background: '#DEE0DE',
    },
    '& .mbsc-calendar': {
      '&.mbsc-cal-day-picker .mbsc-cal-cell:focus .mbsc-cal-cell-txt': {
        background: '#fff'
      },
      '& .mbsc-cal-day-colored.mbsc-selected .mbsc-cal-day-date': {
        borderColor: '#000'
      },
      '& .mbsc-cal-table': {
        borderSpacing: '0',
        padding: '3px 0',
        boxSizing: 'border-box'
      },
      '& .mbsc-cal-row:first-child': {
        marginTop: '3px'
      },
      '& .mbsc-cal-row': {
        display: 'flex',
        padding: '0 2px',
        '& .mbsc-cal-day': {
          width: '14%'
        }
      },
      '& .mbsc-cal-cell-i': {
        padding: '0'
      },
      '& .mbsc-cal-day-date': {
        width: '100%',
        height: 'auto',
        margin: '0',
        padding: '10px 0',
        borderRadius: '0',
        border: '0.5px solid #ccc',
        boxSizing: 'border-box',
        fontWeight: '600',
        fontSize: '14px',
        '&:hover': {
          backgroundColor: '#DEE0DE'
        }
      },
      '& .mbsc-cal-cell.dollar': {
        position: 'relative',
        '&:after': {
          content: '"$"',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: '2px',
          right: '2px',
          width: '16px',
          height: '16px',
          fontSize: '11px',
          borderRadius: '50%',
          color: theme.palette.common.primary,
          backgroundColor: '#fff',
          boxSizing: 'border-box',
        },
        '&.available .mbsc-cal-day-markup .mbsc-cal-marks': {
          display: 'none'
        }
      },
      '& .mbsc-cal-day-marked': {
        '& .mbsc-cal-day-date': {
          position: 'relative',
          '&:after': {
            content: '',
            display: 'block',
            position: 'absolute',
            width: '100%',
            height: '1px',
            color: 'red'
          }
        },
        '& .mbsc-cal-day-markup .mbsc-cal-txt': {
          position: 'absolute',
          top: '5px',
          right: '5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '20px',
          height: '20px',
          boxSizing: 'border-box',
          borderRadius: '50%',
          backgroundColor: '#fff !important',
          color: `${theme.palette.common.primary} !important`,
          '&.mbsc-hover:before': {
            backgroundColor: 'transparent',
          }
        },
        '& .mbsc-cal-day-markup .mbsc-cal-marks': {
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '32px',
          height: '1px',
          transform: 'rotate(-45deg) translateX(-16px) translateY(-6px)',
          backgroundColor: '#8b8a8a',
          '& .mbsc-cal-mark': {
            display: 'none'
          }
        }
      }
    }
  },
  editPoolcontainer: {
    padding: '60px 0',
    '@media(max-width:767px)': {
      padding: '0 0 20px 0',
    },
  },
  backStep: {
    marginBottom: '10px',

    '& a': {
      color: theme.palette.common.blue,
      fontWeight: '500',
    },
    '& i': {
      fontSize: '22px',
      verticalAlign: ' text-bottom',
      marginRight: '3px',
      marginTop: '-1px',
    },
    '@media (max-width:767px)': {
      width: '25px',
      height: '25px',
      overflow: 'hidden',
      color: theme.palette.common.black,
      marginBottom: '10px',
      position: 'absolute',
      top: '12px',
      '& a': {
        color: theme.palette.common.black,
      },
      '& i': {
        fontSize: '30px',
      },
    },
  },
  formContainer: {
    maxWidth: '100%',
    paddingTop: '0',
  },
  ContentContainer: {
    paddingTop: '0',
    '& h3': {
      fontSize: '20px',
      marginBottom: '12px',
      paddingTop: '15px',
    },
    '& p': {
      fontWeight: '100',
      fontSize: '14px',
      margin: '2px 0 0',
    },
    '@media (max-width:767px)': {
      '& h3': {
        fontSize: '14px',
        marginBottom: '0px',
        padding: '20px 20px 15px',
        textAlign: 'center',
        boxShadow: 'none',
        margin: ' 0px',
        textTransform: 'uppercase',
      },
    },
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    '@media (max-width:767px)': {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  submitBtn: {
    width: '30%',
    margin: 'auto',
    '@media (max-width:479px)': {
      width: '100%',
    },
  },
  submitBtnRed: {
    '& span': {
      background: '#fa4f4b !important',
    },
  },
  alignCenter: {
    '@media (max-width:767px)': {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  toggleBox: {
    listStyle: 'none',
    display: 'flex',
    paddingLeft: '0',
    margin: '0',
    '& li': {
      padding: '8px 30px',
      border: '1px solid #ccc',
      cursor: 'pointer',
      '&:first-child': {
        borderRadius: '5px 0px 0px 5px',
      },
      '&:last-child': {
        marginLeft: '-1px',
        borderRadius: '0px 5px 5px 0px',
      },
    },
  },
  activeToggle: {
    border: '1px solid #12bfea !important',
    zIndex: 1,
    color: '#12bfea !important',
  },
  dayUnavailable: {
    background: '#f3f5f5',
    color: '#c2c2c2 !important',
    borderColor: ' #e6e3e3  !important',
  },
  defaultReservationBtn: {
    '& span:first-child': {
      background: '#ccc',
    },
    '& span:first-child:hover': {
      background: '#ccc',
      cursor: 'default',
    },
    '@media (max-width:767px)': {
      '& span:first-child': {
        padding: '6px 8px',
      },
    },
  },
  errorMessage: {
    maxWidth: '100%',
  },
  stepperContainer: {
    marginBottom: '20px',
  },
  backContainer: {
    marginBottom: '10px',
    fontWeight: '500',
    color: theme.palette.common.blue,
    '& font': {
      cursor: 'pointer',
    },
    '& i': {
      marginRight: '3px',
      marginTop: '-1px',
      fontSize: '22px',
      verticalAlign: ' text-bottom',
    },
    '@media (max-width:767px)': {
      width: '25px',
      height: '25px',
      marginBottom: '0',
      overflow: 'hidden',
      color: theme.palette.common.black,
      '& i': {
        fontSize: '30px',
      },
    },
  },
  addPoolAlign: {
    // padding: navigator.appVersion.indexOf("Chrome/") === -1 ? '0' : '0 15px'
    left: 0,
  },
  popupContainer: {
    maxWidth: '300px',
    textAlign: 'center'
  },
  subTitle: {
    fontWeight: '100',
    fontSize: '15px',
    color: 'black',
  },
  reduceMarginTop: {
    marginTop: '0',
  },
  okButton: {
    // maxWidth: '70px',
    transition: 'all 0.2s ease',
  },
  cancelButton: {
    // maxWidth: '70px',
    background: 'transparent',
    color: theme.palette.common.blue,
    transition: 'all 0.2s ease',
    '&:hover': {
      background: 'transparent',
      color: theme.palette.common.blue,
      opacity: '0.9',
    },
  },
  maxWidth: {
    display: 'inline-block',
    maxWidth: '420px',
    marginBottom: '10px',
    '@media (max-width:767px)': {
      padding: '10px',
      textAlign: 'center'
    },
  },
  bold: {
    fontWeight: 'bold',
  }
} );

const enhance = compose(
  withStyles( styles, { withTheme: true } ),
  withRouter,
  withApollo,
);

class DailyCalendarManagement extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      loading: false,
      buttonText: 'Save',
      isMonthlyView: true,
      timeDetails: [...timeArray],
      poolDetails: {},
      minTime: new Date(),
      // maxTime: null,
      repeat: false,
      isAddPool: false,
      firstAvailableDate: new Date(),
      unAvailableTimeGroups: {},
      bookings: {},
      showBlockTimeRange: false,
      errorMessage: '',
      showHourlyPopup: false,
    };
    this.updatedUnavailability = [];
    this.makeUnavailabilityAvailable = [];
    this.selectedDate = new Date();
    this.colors = [];
    this.marked = [];
    this.invalid = [];
    this.calendar = { settings: {} };
    this.hourlyCalendar = { settings: {} };
    this.initialCalendar = { settings: {} };
    this.available = '#fff';
    this.unavailable = '#DEE0DE !important';
    this.partiallyAvailable = 'linear-gradient( -45deg, transparent, transparent 49%, #ccc 49%, #DEE0DE 51%, #DEE0DE 51% ) !important';
    this.updatedData = {
      available: [],
      unavailable: [],
    };
    this.repeatedDays = [];
    this.updatedTimes = [];
    this.activeStep = 100

    this.getPoolData = this.getPoolData.bind( this );
    this.updateCalendarInst = this.updateCalendarInst.bind( this );
    this.handleCalender = this.handleCalender.bind( this );
    this.handleHourlyCalender = this.handleHourlyCalender.bind( this );
    this.toggleHourlyView = this.toggleHourlyView.bind( this );
    this.handleSubmit = this.handleSubmit.bind( this );
    this.onSetTimeDetails = this.onSetTimeDetails.bind( this );
    this.onSelectDate = this.onSelectDate.bind( this );
    this.onSetDay = this.onSetDay.bind( this );
    this.onCancelRepeat = this.onCancelRepeat.bind( this );
    this.presetSelectedDayUnchangedTime = this.presetSelectedDayUnchangedTime.bind( this );
    this.presetSelectedUpdateUnavailabilityTime = this.presetSelectedUpdateUnavailabilityTime.bind( this );
  }

  componentDidMount() {
    this.setState({
      isAddPool: this.props.isAddPool,
      buttonText: this.state.isMonthlyView ? this.props.isAddPool ? 'Next' : 'Save' : 'Block'
    }, this.getPoolData)
  }

  formatUnAvailableTimeGroups = ({ pool_unavailabilities = [], unavailable_dates = [] }) => {
    const result = {}
    const poolUnAvailabilities = pool_unavailabilities.filter(item => !unavailable_dates.includes(item.date))
    for (let i = 0; i < poolUnAvailabilities.length; i++) {
      const item = OBJECT_TIME_ARRAY.time_insert[poolUnAvailabilities[i].time]
      if (item) {
        if (result[poolUnAvailabilities[i].date]) {
          result[poolUnAvailabilities[i].date].push(item.timeNumber)
        } else {
          result[poolUnAvailabilities[i].date] = [item.timeNumber]
        }
      }
    }

    for (let k in result) {
      result[k] = _.uniq(result[k])
      result[k] = result[k].sort((a, b) => a - b)
      result[k] = result[k].reduce((res, item) => {
        const currGroup = res[res.length - 1]
        if (currGroup && currGroup.length) {
          const lastItem = currGroup[currGroup.length - 1]
          if (item - lastItem === 1) {
            currGroup.push(item)
          } else {
            res.push([item])
          }
        } else {
          res.push([item])
        }
        return res
      }, [])
    }
    return result
  }

  formatSingleTimeGroup = (group) => {
    group = _.uniq(group)
    group = group.map(item => OBJECT_TIME_ARRAY.time_insert[item] ? OBJECT_TIME_ARRAY.time_insert[item].timeNumber : null).sort((a, b) => a - b)
    group = group.reduce((res, item) => {
      const currGroup = res[res.length - 1]
      if (currGroup && currGroup.length) {
        const lastItem = currGroup[currGroup.length - 1]
        if (item - lastItem === 1) {
          currGroup.push(item)
        } else {
          res.push([item])
        }
      } else {
        res.push([item])
      }
      return res
    }, [])
    return group
  }

  formatBookings = (bookings) => {
    bookings = HelperService.filterBookings(bookings)
    const result = {}
    for (let i = 0; i < bookings.length; i++) {
      if (result[bookings[i].date]) {
        result[bookings[i].date].push(bookings[i])
      } else {
        result[bookings[i].date] = [bookings[i]]
      }
    }
    return result
  }

  removeUnAvailableTimeGroup = async (index) => {
    const { unAvailableTimeGroups } = this.state
    const formattedDate = moment(this.selectedDate).format('YYYY-MM-DD')
    const groupToRemove = unAvailableTimeGroups[formattedDate] ? unAvailableTimeGroups[formattedDate][index] : []
    let allUnAvailableTimes = unAvailableTimeGroups[formattedDate] ? unAvailableTimeGroups[formattedDate].flat() : []
    allUnAvailableTimes = allUnAvailableTimes.filter(item => !groupToRemove.includes(item))
    await this.updateUnAvailableTimes(allUnAvailableTimes.map(item => OBJECT_TIME_ARRAY.timeNumber[item].time_insert))
    this.setState({
      unAvailableTimeGroups: update(unAvailableTimeGroups, {
        [formattedDate]: {
          $splice: [[index, 1]]
        }
      })
    }, async () => {
      if (!this.state.unAvailableTimeGroups[formattedDate].length) {
        await this.makePartialAvailableOrUnavailable(true, formattedDate)
      }
    })
  }

  updateUnAvailableTimes = async (times = []) => {
    try {
      await this.props.client
        .mutate({
          mutation: savePoolUnAvailability,
          variables: {
            data: {
              available_date: moment(this.selectedDate).format('YYYY-MM-DD'),
              available_time: times,
              pool_id: this.state.poolDetails.id,
              repeat_availablitlity: false,
              end_date: null,
              days: [],
            },
          },
        })
    } catch (error) {
      const errorMsg = commonFunctions.parseGraphQLErrorMessage(error)
      console.log('Request error', errorMsg)
      if (errorMsg === 'Unauthenticated.') {
        const status = await this.props.refreshToken(this.props.history)
        if (status === 'ok') {
          await this.updateUnAvailableTimes(times)
        }
      }
    }
  }

  getPoolData() {
    const poolId = parseInt(
      this.state.isAddPool ? UserUtils.getHostPoolID() : this.props.match.params.id,
      10
    );
    const accessToken = UserUtils.getAccessToken();
    const currentUserId = UserUtils.getUserID();
    const { history } = this.props;
    if ( accessToken ) {
      this.setState( {
        poolId,
      }, () => {
        this.setState({ loading: true })
        this.props.client.query({
          query: pooldetailsQuery,
          variables: {
            id: poolId,
          },
          fetchPolicy: 'network-only',
        })
          .then((res) => {
            if (!res.data.pool) {
              history.push('/host')
            } else if (res.data.pool.createdBy && res.data.pool.createdBy.id === currentUserId) {
              const pool = _.cloneDeep(res.data.pool)
              this.setState({
                loading: false,
                poolDetails: pool,
                hourlyPrice: pool.hourly_price,
                bookings: this.formatBookings(pool.bookings),
                unAvailableTimeGroups: this.formatUnAvailableTimeGroups(pool),
              }, () => {
                let { poolDetails } = this.state
                this.handleCalendarData(poolDetails)
                const firstAvailableDate = this.getCurrentAvailableMonth(poolDetails.months)
                this.selectedDate = moment(this.selectedDate).month() < firstAvailableDate.month() ?
                  firstAvailableDate : this.selectedDate
                this.setState({
                  firstAvailableDate: firstAvailableDate.format('YYYY-MM-DD')
                })
              })
            } else {
              history.push('/host');
            }
          })
          .catch(async (error) => {
            const errorMsg = commonFunctions.parseGraphQLErrorMessage(error)
            if (errorMsg === 'Unauthenticated.') {
              const status = await this.props.refreshToken(this.props.history)
              if (status === 'ok') {
                this.getPoolData()
              }
            }
            this.setState({
              loading: false,
            })
          })
      } );
    } else {
      UserUtils.logout();
      UserUtils.setPreviousUrl( this.props.location.pathname );
      UserUtils.setPreviousSearchUrl( this.props.location.search );
      UserUtils.setIsPreviousUrl( 'yes' );
      history.push( '/' );
    }
  }


  getCurrentAvailableMonth = (months) => {
    const currentDate = moment()
    const firstAvailableMonth = months.length ? (months[0].month_number || months[0]) - 1 : 0
    const currentMonth = currentDate.month()
    const availableMonth = firstAvailableMonth >= currentMonth ? firstAvailableMonth : currentMonth
    const futureDate = currentDate.month(availableMonth).startOf('month')
    return months.length && (firstAvailableMonth > currentMonth) ? futureDate : moment()
  }

  handleCalendarData(pool) {
    pool.months = this.props.availableMonths && this.props.availableMonths.length ? this.props.availableMonths : pool.months
    const updatedCalendarData = { ...calendarData };
    const calendarKeys = Object.keys( updatedCalendarData );
    // eslint-disable-next-line no-plusplus
    for ( let colorKeyIndex = 0; colorKeyIndex < calendarKeys.length; colorKeyIndex++ ) {
      const colorKey = calendarKeys[colorKeyIndex];
      updatedCalendarData[colorKey].map( ( dateRange ) => {
        // eslint-disable-next-line no-param-reassign
        dateRange.status = this[colorKey];
        // eslint-disable-next-line no-param-reassign
        dateRange.background = this[colorKey];
        return dateRange;
      } );
    }
    // TODO remove this fields
    if (pool.months[0] && pool.months[0].hasOwnProperty('month_number')) {
      pool.months = pool.months.map( month => month.month_number );
    }
    pool.unavailable_dates = pool.unavailable_dates || ['2020-03-16'];
    this.setState( {
      minTime: moment().format(),
      // maxTime: moment().add( pool.availability_window, 'days' ).format(),
      availableFrom: pool.available_from,
      availableTo: pool.available_to,
    } );
    this.colors = []
    this.marked = []
    for ( let i = 0; i < 12; i++ ) {
      const month = moment().startOf( 'year' ).add( i, 'month' );
      this.colors.push( {
        start: month.startOf( 'month' ).format(),
        end: month.endOf( 'month' ).format(),
        background: pool.months.includes( i + 1 ) ? this.available : this.unavailable,
      } );
      if ( !pool.months.includes( i + 1 ) ) {
        this.invalid.push( {
          start: month.startOf( 'month' ).format(),
          end: month.endOf( 'month' ).format(),
        } );
      }
    }
    const yesterday = moment().subtract(1, 'day')
    const groupedPoolUnavailabilities = this.groupByDates( pool.pool_unavailabilities );
    for ( let i = 0; i < groupedPoolUnavailabilities.length; i++ ) {
      if (moment(groupedPoolUnavailabilities[i].date).isAfter(yesterday)) {
        this.colors = [
          { d: moment( groupedPoolUnavailabilities[i].date ), background: this.partiallyAvailable },
          ...this.colors,
        ];
        this.marked = this.marked.filter((item) => !moment(item.d).isSame(groupedPoolUnavailabilities[i].date, 'd'))
      }
    }

    const markedDates = {}
    const unavailable_dates = [ ...this.updatedData.unavailable, ...pool.unavailable_dates ]
    for ( let i = 0; i < unavailable_dates.length; i++ ) {
      if (moment(unavailable_dates[i]).isAfter(yesterday)) {
        this.colors = [
          { d: moment( unavailable_dates[i] ), background: this.unavailable },
          ...this.colors,
        ];
        this.marked = [
          { d: moment( unavailable_dates[i] ), color: '#8b8a8a', cssClass: this.state.bookings[unavailable_dates[i]] ? 'dollar' : '' },
          ...this.marked,
        ];
        markedDates[unavailable_dates[i]] = true
      }
    }

    for (let date in this.state.bookings) {
      if (!markedDates[date]) {
        this.marked = [
          { d: moment(date), cssClass: 'dollar available' },
          ...this.marked,
        ];
      }
    }

    this.calendar.settings.invalid = this.invalid;
    this.calendar.settings.colors = this.colors;
    this.initialCalendar.settings.colors = this.colors;
    this.calendar.settings.marked = this.marked;
    this.calendar.redraw();
  }

  groupByDates( data ) {
    const groups = data.reduce( ( groups, day ) => {
      const date = day.date;
      if ( !groups[date] ) {
        groups[date] = [];
      }
      groups[date].push( day );
      return groups;
    }, {} );

    const groupArrays = Object.keys( groups ).map( date => {
      return {
        date,
        items: groups[date],
      };
    } );
    return groupArrays;
  }

  handleCalender( item, inst ) {
    // Check if available
    if ( item.background === this.available ) {
      // eslint-disable-next-line no-param-reassign
      this.calendar.settings.colors = [{
        d: item.date, background: this.unavailable,
      }, ...inst.settings.colors];

      this.markBooking(item.date)

      this.updateData( item.date, 'unavailable' );
    // Check if unavailable
    } else if ( item.background === this.unavailable ) {
      // eslint-disable-next-line no-param-reassign
      const colors = [{
        d: item.date, background: this.available,
      }, ...inst.settings.colors];
      this.calendar.settings.colors = colors;

      this.markBooking(item.date, true)

      this.updateData( item.date, 'available' );
    } else if ( item.background === this.partiallyAvailable ) {
      this.handleHourlyPopup(true, item.date)
      // this.toggleHourlyView( item.date, false );
    }
    this.selectedDate = item.date;
    inst.setDate(item.date)
    this.setState({ forceUpdateRender: true }) // early was inst.redraw(), but in some cases calendar didn't redraw
  }

  handleHourlyPopup = (show, date) => {
    this.setState({
      showHourlyPopup: show,
      selectedHourlyDate: moment(date).format('YYYY-MM-DD')
    })
  }

  markBooking = (date, available = false, filter = true) => {
    const hasBooking = this.state.bookings[moment(date).format('YYYY-MM-DD')]
    this.calendar.settings.marked = filter ? this.calendar.settings.marked.filter(({d}) => !moment(d).isSame(date, 'd')) : this.calendar.settings.marked
    if (hasBooking || !available) {
      const fields = !available || true ? { color: '#8b8a8a' } : {}
      fields.cssClass = hasBooking ? `dollar ${available ? 'available' : ''}` : ''
      this.calendar.settings.marked = [
        { d: moment(date), ...fields },
        ...this.calendar.settings.marked,
      ]
    }
  }

  makePartialAvailableOrUnavailable = (available, date) => {
    this.setState({ showHourlyPopup: false, loading: true }, async () => {
      try {
        const currentDateIndex = this.updatedTimes.findIndex(item => moment( item.date ).isSame( date ))
        this.updatedTimes.splice(currentDateIndex, 1)

        const { data: { savePoolDaysUnAvailability: data } } = await this.props.client
          .mutate({
            mutation: savePoolDaysUnAvailability,
            variables: {
              data: {
                unavailable: !available ? [date] : [],
                available: available ? [date] : [],
                pool_id: this.state.poolId,
              },
            },
          })
        if (data.status === 'success') {
          const availableDate = date
          await this.props.client
            .mutate({
              mutation: savePoolUnAvailability,
              variables: {
                data: {
                  available_date: availableDate,
                  available_time: [],
                  pool_id: this.state.poolId,
                  repeat_availablitlity: false,
                  end_date: null,
                  days: [],
                },
              },
            })
          this.setState({
            loading: false
          }, () => {
            this.calendar.settings.colors = [{
              d: availableDate, background: this.available,
            }, ...this.calendar.settings.colors]
            this.updatedUnavailability = this.updatedUnavailability
              .filter(item => availableDate !== item.date)
            this.calendar.settings.marked = this.calendar.settings.marked.filter((item) => !moment(item.d).isSame(date, 'd'))
            this.markBooking(date, true, false)
            this.calendar.redraw()
          })
        }
      } catch (e) {
        console.log('error', e)
        const errorMsg = commonFunctions.parseGraphQLErrorMessage(e)
        if (errorMsg === 'Unauthenticated.') {
          const status = await this.props.refreshToken(this.props.history)
          if (status === 'ok') {
            await this.makePartialAvailableOrUnavailable(available, date)
          }
        }
        this.setState({ loading: false })
      }
    })
  }

  updateData( date, newStatus ) {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const updatedData = { ...this.updatedData };
    let momentDate = moment( date ).format('YYYY-MM-DD')

    let hasDateInUnAvailable = this.updatedData.unavailable.indexOf(momentDate)
    let hasDateInAvailable = this.updatedData.available.indexOf(momentDate)
    if (hasDateInUnAvailable >= 0) {
      this.updatedData.unavailable.splice(hasDateInUnAvailable, 1)
    }
    if (hasDateInAvailable >= 0) {
      this.updatedData.available.splice(hasDateInAvailable, 1)
    }

    updatedData[newStatus].push( momentDate );

    this.updatedData = updatedData;
  }

  handleHourlyCalender( date, data ) {
    if ( data.length > 0 ) {
      this.calendar.settings.colors = [{
        d: date, background: this.partiallyAvailable,
      }, ...this.calendar.settings.colors];
      this.calendar.settings.marked = this.calendar.settings.marked.filter((item) => !moment(item.d).isSame(date, 'd'))
      this.markBooking(date, true, false)
    } else {
      let itemIndex = this.calendar.settings.colors.findIndex( item => moment( item.d ).isSame( date ) && item.background === this.partiallyAvailable );
      if ( itemIndex >= 0 ) {
        this.calendar.settings.colors.splice( itemIndex, 1 );
      }
      this.calendar.redraw();
    }
  }

  toggleHourlyView( day, value ) {
    this.selectedDate = day || this.selectedDate;
    this.setState( {
      isMonthlyView: value,
      buttonText: value ? this.props.isAddPool ? 'Next' : 'Save' : 'Block',
      repeat: false
    }, () => {
      // reset not saved changes to defaults and get actual pool data to avoid bugs
      this.updatedData = {
        available: [],
        unavailable: [],
      }
      this.makeUnavailabilityAvailable = []
      this.colors = []
      this.marked = []
      this.updatedTimes = []
      this.getPoolData()

      this.calendar.redraw();
    } );
  }

  handleBlockTimeRange = (show = false) => {
    this.setState({ showBlockTimeRange: show })
  }

  async handleSubmit() {
    const { poolDetails, repeat, unAvailableTimeGroups } = this.state;
    this.setState({ loading: true })
    try {
      let hasBooking = this.updatedTimes.some(item => {
        let bookingTimes = []
        if (this.state.bookings[item.date]) {
          bookingTimes = this.state.bookings[item.date].map(booking => {
            const from = OBJECT_TIME_ARRAY.time_insert[booking.from].timeNumber
            const to = OBJECT_TIME_ARRAY.time_insert[booking.to].timeNumber + 1
            return _.range(from, to + 1).map(time => OBJECT_TIME_ARRAY.timeNumber[time].time_insert)
          }).flat()
        }
        return bookingTimes.filter(time => item.times.includes(time)).length > 1
      })

      if (hasBooking) {
        this.showErrorMessage('You can’t block time with existing bookings.')
        return
      }

      if ( this.updatedTimes.length ) {
        for ( let i = 0; i < this.updatedTimes.length; i++ ) {
          const makeAvailable = !!this.makeUnavailabilityAvailable.find(itemDate => itemDate === this.updatedTimes[i].date)
          let allUnAvailableTimes = unAvailableTimeGroups[this.updatedTimes[i].date]
            ? unAvailableTimeGroups[this.updatedTimes[i].date].flat() : []
          allUnAvailableTimes = allUnAvailableTimes.map(item => OBJECT_TIME_ARRAY.timeNumber[item].time_insert)
          this.updatedTimes[i].times = [...allUnAvailableTimes, ...this.updatedTimes[i].times]

          const data = {
            'pool_id': poolDetails.id,
            'available_date': this.updatedTimes[i].date,
            'available_time': makeAvailable ? [] : this.updatedTimes[i].times,
            'repeat_availablitlity': repeat,
            'end_date': null,
            'days': [],
          };

          const { data: { savePoolUnAvailability: result }} = await this.props.client.mutate({
            mutation: savePoolUnAvailability,
            variables: {
              data,
            },
          } );

          if (result.status === 'BOOKING_EXIST') {
            this.showErrorMessage('You can’t block time with existing bookings.')
            return
          }

          this.setState({
            unAvailableTimeGroups: update(this.state.unAvailableTimeGroups, {
              [this.updatedTimes[i].date]: {
                $set: this.formatSingleTimeGroup(this.updatedTimes[i].times)
              }
            }),
            showBlockTimeRange: false
          })
        }
        this.makeUnavailabilityAvailable = []
      }

      hasBooking = this.updatedData.unavailable.some(date => this.state.bookings[date])
      if (hasBooking) {
        this.showErrorMessage('You can’t block time with existing bookings.')
        return
      }

      let res = await this.props.client.mutate({
        mutation: savePoolDaysUnAvailability,
        variables: {
          data: {
            unavailable: this.updatedData.unavailable,
            available: this.updatedData.available,
            pool_id: poolDetails.id,
          },
        },
      } );

      if (res.data.savePoolDaysUnAvailability.status === 'success') {
        // TODO commented by Kirill - why do we need to set something in poolDetails
        // TODO if this was set from function `this.getPoolData`?
        // this.setState({
        //   poolDetails: update(this.state.poolDetails, {
        //     unavailable_dates: {$set: res.data.savePoolDaysUnAvailability.unavailabilities}
        //   })
        // })
        this.updatedData = {
          available: [],
          unavailable: [],
        };
      } else if (res.data.savePoolDaysUnAvailability.status === 'BOOKING_EXIST') {
        this.showErrorMessage('You can’t block time with existing bookings.')
        return
      }
      
      this.getPoolData()

      if ( this.state.isAddPool && this.state.isMonthlyView ) {
        this.sendCreatingPoolAnalytics(poolDetails.id)
        this.props.handleNextScreen('showManageCalendarScreen', 'payoutStatus')
      }
      this.setState( { loading: false } );
    } catch ( error ) {
      let errorMsg = commonFunctions.parseGraphQLErrorMessage( error );
      if ( errorMsg === 'Unauthenticated.' ) {
        const status = await this.props.refreshToken(this.props.history)
        if (status === 'ok') {
          this.handleSubmit()
        }
        errorMsg = ''
      }
      this.setState( {
        loading: false,
        errorMessage: errorMsg
      } );
    }
  }

  showErrorMessage = (errorMessage) => {
    this.setState({
      loading: false,
      errorMessage,
    })
    window.scrollTo({ top: 0 })
  }

  sendCreatingPoolAnalytics( poolID ) {
    const startCreatePoolTime = UserUtils.getCreatePoolTime();
    const startCreatePoolId = UserUtils.getCreatePoolIDEvent();
    const endTime = new Date();
    if (startCreatePoolTime && startCreatePoolId && startCreatePoolId === poolID) {
      const duration = endTime - new Date(startCreatePoolTime)
      const analyticsData = {
        timestamp: new Date().toISOString(),
        'event_type': 'creating-pool-time',
        poolId: poolID,
        duration,
        platform: 'web',
        location: IS_US ? 'US' : 'AU',
        userId: UserUtils.getUserID(),
        userRole: 'host',
      };
      sendAnalytics( this.props.client, analyticsData );
      UserUtils.removeCreatePoolTime();
      UserUtils.removeCreatePoolIDEvent();
    }
  }

  updateCalendarInst( event, inst ) {
    if ( this.calendar !== inst ) {
      this.calendar = inst;
    }
  }

  onSetDay( { repeat, endDate, days, dayIndex, addDayIndex, updateDate, unavailable } ) {
    if ( days ) {
      this.setState( { days } );
    }
    if ( endDate ) {
      this.setState( { endDate } );
    }
    if ( typeof dayIndex === 'number' ) {
      this.setState( { dayIndex } );
    }
    if ( typeof repeat === 'boolean' ) {
      this.setState( { repeat } );
    }
    if ( addDayIndex >= 0 ) {
      const newItem = {
        d: updateDate,
        background: unavailable ?
          this.unavailable : days[addDayIndex].active ?
            this.partiallyAvailable : this.available
      }
      const repeatedDayIndex = this.repeatedDays.findIndex(item => item.d === updateDate)
      if (repeatedDayIndex >= 0) {
        if (!days[addDayIndex].active) {
          this.repeatedDays = this.repeatedDays.filter(item => item.d !== updateDate)
        } else {
          this.repeatedDays[repeatedDayIndex] = newItem
          this.repeatedDays = [ ...this.repeatedDays ]
        }
      } else {
        this.repeatedDays = [
          newItem,
          ...this.repeatedDays
        ]
      }
      const colorIndex = this.calendar.settings.colors.findIndex(item => item.d === updateDate)
      if (colorIndex >= 0) {
        if (!days[addDayIndex].active) {
          this.calendar.settings.colors = this.calendar.settings.colors.filter(item => item.d !== updateDate)
        } else {
          this.calendar.settings.colors[colorIndex] = newItem
          this.calendar.settings.colors = [ ...this.calendar.settings.colors ]
        }
      } else {
        this.calendar.settings.colors = [
          newItem,
          ...this.calendar.settings.colors
        ]
      }
      this.calendar.redraw();
    }
  }


  // using another function than for manual blocking to avoid incorrect displaying not really blocked dates
  presetSelectedDayUnchangedTime( timeDetails, date, previousDate ) {
    const { poolDetails } = this.state;
    const momentDate = moment( date ).format( 'YYYY-MM-DD' );
    const momentPreviousDate = moment( previousDate ).format( 'YYYY-MM-DD' );

    this.setState( { timeDetails } );
    // eslint-disable-next-line no-param-reassign
    timeDetails = timeDetails.filter( times => times.activeClass );

    // remove current date form updated availabilities
    this.presetSelectedUpdateUnavailabilityTime( momentDate, timeDetails, momentPreviousDate );

    // remove previously setted date unavailable hours (if any) to set new for the same date
    this.updatedUnavailability = this.updatedUnavailability
      .filter( item => momentDate !== item.date );

    // remove previously selected date (if any) if it wasn't blocked (just clicked)
    this.updatedUnavailability = this.updatedUnavailability
      .filter( item => item.date !== momentPreviousDate && !item.temporary );

    // formatting new (modified) date's hours
    const updatedTimeDetails = timeDetails.map( item => ( {
      date: momentDate,
      time: item.time_insert,
      temporary: true,
      __typename: 'PoolUnavailabilities',
    } ) );
    // add new blocked hours to existing
    this.updatedUnavailability = [...this.updatedUnavailability, ...updatedTimeDetails];

    // attuning calendar blocked/partly-blocked/available colors displaying
    const { availableFrom, availableTo } = this.state
    const updatedTimes = timeDetails.filter(item => !item.disable && item.activeClass)
    const firstSelectedTime = updatedTimes[0] && updatedTimes[0].time_insert
    const lastSelectedTime = updatedTimes[updatedTimes.length - 1] && updatedTimes[updatedTimes.length - 1].time_insert
    if (firstSelectedTime === availableFrom && lastSelectedTime === availableTo) {

      this.updatedUnavailability = this.updatedUnavailability
        .filter( item => momentDate !== item.date );
      this.updatedData.available = this.updatedData.available
        .filter(itemDate => momentDate !== itemDate)
      this.makeUnavailabilityAvailable.push(momentDate)
      this.updatedData.unavailable.push( momentDate );
    } else if ( this.updatedUnavailability.length > 0 ) {
      this.calendar.settings.marked = this.calendar.settings.marked || []
      this.calendar.settings.marked = this.calendar.settings.marked.filter((item) => !moment(item.d).isSame(date, 'd'))
      this.markBooking(date, true, false)

      const dayUnavailable = poolDetails.unavailable_dates.find(day => moment(day).isSame(moment(date), 'day'))
      if ( dayUnavailable && this.updatedData.available.indexOf(momentDate) === -1 ) {
        this.updatedData.available.push( momentDate );
      }

    } else if ( this.updatedUnavailability.length === 0 ) {
      this.updatedUnavailability = this.updatedUnavailability
        .filter( item => momentDate !== item.date );
      this.calendar.settings.marked = this.calendar.settings.marked.filter((item) => !moment(item.d).isSame(date, 'd'))
      this.markBooking(date, true, false)
    }

    this.calendar.redraw();
  }


  presetSelectedUpdateUnavailabilityTime( date, timeDetails, previousDate ) {
    const existingDateIndex = this.updatedTimes.findIndex( item => moment( item.date ).isSame( date ) );
    const inUnavailableUpdatedDataIndex = this.updatedData.unavailable.indexOf( date )
    if (inUnavailableUpdatedDataIndex >= 0) {
      this.updatedData.unavailable.splice(inUnavailableUpdatedDataIndex, 1)
    }
    if ( existingDateIndex >= 0 ) {
      this.updatedTimes[existingDateIndex].times = timeDetails.map( time => time.time_insert );
    } else {
      this.updatedTimes = this.updatedTimes.filter(item => {
        return item.date !== previousDate || !item.temp
      })
      this.updatedTimes.push( {
        date,
        times: timeDetails.map( time => time.time_insert ),
        temp: true
      } );
    }
  }



  onSetTimeDetails( timeDetails, date ) {
    const momentDate = moment( date ).format( 'YYYY-MM-DD' );
    const { poolDetails } = this.state;
    this.setState( { timeDetails } );
    // eslint-disable-next-line no-param-reassign
    timeDetails = timeDetails.filter( times => times.activeClass );
    // remove current date form updated availabilities
    this.updateUnavailabilityTime( momentDate, timeDetails );

    this.updatedUnavailability = this.updatedUnavailability
      .filter( item => momentDate !== item.date );
    const updatedTimeDetails = timeDetails.map( item => ( {
      date: momentDate,
      time: item.time_insert,
      __typename: 'PoolUnavailabilities',
    } ) );
    this.updatedUnavailability = [...this.updatedUnavailability, ...updatedTimeDetails];

    if (this.updatedTimes.length) {
      this.updatedTimes = this.updatedTimes.map((item) => {
        if (item.date === momentDate) {
          item.temp = false
        }
        return item
      })
    }

    const { availableFrom, availableTo } = this.state
    const updatedTimes = timeDetails.filter(item => !item.disable && item.activeClass)
    const firstSelectedTime = updatedTimes[0] && updatedTimes[0].time_insert
    const lastSelectedTime = updatedTimes[updatedTimes.length - 1] && updatedTimes[updatedTimes.length - 1].time_insert
    if (firstSelectedTime === availableFrom && lastSelectedTime === availableTo) {
      this.calendar.settings.colors = [
        { d: date, background: this.unavailable },
        ...this.calendar.settings.colors
      ];

      this.markBooking(date)

      this.updatedUnavailability = this.updatedUnavailability
        .filter( item => momentDate !== item.date );
      this.updatedData.available = this.updatedData.available
        .filter(itemDate => momentDate !== itemDate)
      this.makeUnavailabilityAvailable.push(momentDate)
      this.updatedData.unavailable.push( momentDate );

    } else if ( this.updatedUnavailability.length > 0 ) {
      this.calendar.settings.colors = [{
        d: date, background: this.partiallyAvailable,
      }, ...this.calendar.settings.colors];

      this.markBooking(date, true)

      const dayUnavailable = poolDetails.unavailable_dates.find(day => moment(day).isSame(moment(date), 'day'))
      if ( dayUnavailable && this.updatedData.available.indexOf(momentDate) === -1 ) {
        this.updatedData.available.push( momentDate );
      }

      this.makeUnavailabilityAvailable = this.makeUnavailabilityAvailable.filter(item => item !== momentDate)
    } else if ( this.updatedUnavailability.length === 0 ) {
      this.calendar.settings.colors = [{
        d: date, background: this.available,
      }, ...this.calendar.settings.colors];
      this.updatedUnavailability = this.updatedUnavailability
        .filter( item => momentDate !== item.date );

      this.calendar.settings.marked = this.calendar.settings.marked.filter((item) => !moment(item.d).isSame(date, 'd'))
      this.makeUnavailabilityAvailable = this.makeUnavailabilityAvailable.filter(item => item !== momentDate)
    }
    this.calendar.redraw();
  }

  updateUnavailabilityTime( date, timeDetails ) {
    const existingDateIndex = this.updatedTimes.findIndex( item => moment( item.date ).isSame( date ) );
    const inUnavailableUpdatedDataIndex = this.updatedData.unavailable.indexOf( date )
    if (inUnavailableUpdatedDataIndex >= 0) {
      this.updatedData.unavailable.splice(inUnavailableUpdatedDataIndex, 1)
    }
    if ( existingDateIndex >= 0 ) {
      this.updatedTimes[existingDateIndex].times = timeDetails.map( time => time.time_insert );
    } else {
      this.updatedTimes.push( {
        date,
        times: timeDetails.map( time => time.time_insert ),
      } );
    }
  }

  onSelectDate( date ) {
    this.selectedDate = date;
  }

  onCancelRepeat() {
    for ( let i = 0; i < this.repeatedDays.length; i++ ) {
      this.calendar.settings.colors = this.calendar.settings.colors.filter(color => !(moment( color.d ).isSame( this.repeatedDays[i].d ) && color.background === this.partiallyAvailable) )
    }
    this.repeatedDays = [];
    this.calendar.redraw();
  }

  goBack = () => {
    this.props.handleNextScreen('showManageCalendarScreen', 'showMonthsSettingsScreen')
  }

  handleErrorMessage = (errorMessage) => {
    this.setState({
      errorMessage,
    })
  }

  render() {
    const { classes } = this.props;
    const { unAvailableTimeGroups, isAddPool, loading, buttonText, isMonthlyView, poolDetails, timeDetails, repeat, minTime, availableFrom, availableTo, firstAvailableDate } = this.state;
    const { selectedDate, calendar, updatedUnavailability } = this;

    return (
      <Typography variant='body1' component='div'>
        {loading && <Pageloader loading={loading} />}
        <div className={`${classes.container} ${isAddPool ? classes.addPoolAlign : ''}`}>
          <div className={classes.editPoolcontainer}>
            {
              isAddPool ? (
                <div className={classes.backContainer}>
                  <font onClick={this.goBack}>
                    <i className='fa fa-angle-left' aria-hidden='true'></i> BACK
                  </font>
                </div>
              ) : (
                <div className={classes.backStep}>
                  <Link to='/host'>
                    <font><i className='fa fa-angle-left' aria-hidden='true'></i> BACK</font>
                  </Link>
                </div>
              )
            }
            {isAddPool && <div className={classes.stepperContainer}>
              <Stepper activeStep={this.activeStep}/>
            </div>}
            <div className={classes.formContainer}>
              <div className='manageCalender daily poolTimeManagements'>
                <div className={classes.ContentContainer}>
                  <div className={classes.headerContainer}>
                    <div>
                      <Typography variant='h3'>
                        Manage Calendar
                      </Typography>
                      <div className={classes.alignCenter}>
                        <Typography variant='body1' className={`${classes.marginLeft} ${classes.maxWidth}`}>
                          Tap on dates to block or unblock the entire day or click
                          on <span className={classes.bold}>Daily view</span> to block out specific hours
                        </Typography>
                      </div>
                    </div>
                    <ul className={classes.toggleBox}>
                      <li className={isMonthlyView ? classes.activeToggle : ''}
                          onClick={this.toggleHourlyView.bind(null, null, true)}>Monthly View
                      </li>
                      <li className={isMonthlyView ? '' : classes.activeToggle}
                          onClick={this.toggleHourlyView.bind(null, null, false)}>Daily View
                      </li>
                    </ul>
                  </div>
                </div>
                {
                  this.state.errorMessage ?
                    <ErrorMessage
                      hide={this.handleErrorMessage.bind(this, '')}
                      message={this.state.errorMessage}
                    /> : null
                }
                {isMonthlyView
                  ? (<div>
                    <mobiscroll.Form>
                      <mobiscroll.FormGroup>
                        <label>
                          <mobiscroll.Calendar
                            theme="bootstrap"
                            layout="liquid"
                            yearChange={false}
                            month="auto" // More info about weeks: https://docs.mobiscroll.com/4-6-2/react/calendar#opt-weeks
                            display="inline"  // Specify display mode like: display='bottom' or omit setting to use default
                            placeholder="Please Select..."
                            value={this.state.firstAvailableDate}
                            onDayChange={this.handleCalender}
                            onInit={this.updateCalendarInst}
                            showOuterDays={false}
                            min={firstAvailableDate}
                            // max={maxTime}
                            colors={calendar.settings.colors}
                            marked={calendar.settings.marked}
                            invalid={calendar.settings.invalid}
                          >
                            <input type="hidden"/>
                          </mobiscroll.Calendar>
                        </label>
                      </mobiscroll.FormGroup>
                    </mobiscroll.Form>
                  </div>)
                  : (
                    <HourlyAvailability
                      selectedDate={selectedDate}
                      poolUnavailabilitie={[...poolDetails.pool_unavailabilities, ...updatedUnavailability]}
                      poolDetails={poolDetails}
                      invalid={calendar.settings.invalid}
                      colors={this.initialCalendar.settings.colors}
                      handleUpdate={this.handleHourlyCalender}
                      onSetTimeDetails={this.onSetTimeDetails}
                      presetSelectedDayUnchangedTime={this.presetSelectedDayUnchangedTime}
                      onSelectDate={this.onSelectDate}
                      timeDetails={timeDetails}
                      onSetDay={this.onSetDay}
                      onCancelRepeat={this.onCancelRepeat}
                      minTime={minTime}
                      // maxTime={maxTime}
                      availableFrom={availableFrom}
                      availableTo={availableTo}
                      unavailableDates={poolDetails.unavailable_dates}
                      updatedUnavailableDates={this.updatedData.unavailable}
                      updatedUnavailability={updatedUnavailability}
                      getPoolData={this.getPoolData}
                      firstAvailableDate={firstAvailableDate}
                      unAvailableTimeGroups={unAvailableTimeGroups}
                      removeUnAvailableTimeGroup={this.removeUnAvailableTimeGroup}
                      updateCalendarInst={this.updateCalendarInst}
                      handleBlockTimeRange={this.handleBlockTimeRange}
                      showBlockTimeRange={this.state.showBlockTimeRange}
                      handleSubmit={this.handleSubmit}
                      bookings={this.state.bookings}
                      handleErrorMessage={this.handleErrorMessage}
                    />
                  )
                }
              </div>
              {
                isMonthlyView ? <div className={`${classes.submitBtn} ${repeat ? classes.defaultReservationBtn : ''} ${buttonText === 'Block' && !repeat ? classes.submitBtnRed : ''}`}>
                  <Typography variant="button" onClick={!repeat ? this.handleSubmit : () => {
                  }}>
                    {buttonText}
                  </Typography>
                </div> : null
              }
            </div>
            <Dialog keepMounted open={this.state.showHourlyPopup}>
              <DialogContent className={classes.popupContainer}>
                <Typography variant='body1' component='div'>
                  <p className={`${classes.subTitle} ${classes.reduceMarginTop}`}>
                    Making this date available will remove your blocked out time slot
                  </p>
                </Typography>
                <div className={classes.buttonsContainer}>
                  <Typography
                    variant='button'
                    className={classes.okButton}
                    onClick={this.makePartialAvailableOrUnavailable.bind(this, true, this.state.selectedHourlyDate)}
                  >
                    Make it available
                  </Typography>
                  <Typography
                    variant='button'
                    className={classes.cancelButton}
                    onClick={this.handleHourlyPopup.bind(this, false, null)}
                  >
                    Cancel
                  </Typography>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Typography>
    );
  }
}

DailyCalendarManagement.propTypes = {
  classes: PropTypes.object.isRequired,
  handleNextScreen: PropTypes.func
};

function DailyCalendarManagementContainer (props) {
  const userContext = useContext(UserContext)
  return <DailyCalendarManagement {...userContext} {...props} />
}

export default enhance(DailyCalendarManagementContainer);
