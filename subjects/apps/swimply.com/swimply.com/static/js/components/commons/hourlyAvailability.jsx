import React, { Component, useContext } from 'react';
import moment from 'moment';
import mobiscroll from '@mobiscroll/react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import _ from 'lodash';
import cloneDeep from 'lodash/cloneDeep';
import { withStyles } from '@material-ui/core/styles';
import {Link, withRouter} from 'react-router-dom';
import { withApollo } from 'react-apollo';
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import DatePicker from "react-datepicker";
import Moment from "react-moment";

import { timeArray, defaultDays } from '../../config';
import { CustomInput } from '../editpool/calendarmanagement';
import * as commonFunctions from '../utilities/commonFunctions';
import { loader } from 'graphql.macro';
import Pageloader from "./pageloader";
import InputRange from 'react-input-range'

// materials components
import { Avatar } from '@material-ui/core'

// constants
import { OBJECT_TIME_ARRAY } from '../../constants'

// contexts
import UserContext from '../../contexts/UserContext'

const savePoolUnAvailability = loader( './../../graphql/host/savepoolunavailability.graphql' );
const savePoolDaysUnAvailability = loader( './../../graphql/host/savePoolDayUnavailability.graphql' );

const styles = ( theme ) => ( {
  overlay: {
    height: '130px',
    position: 'absolute',
    width: '100%',
    zIndex: '2',
  },
  overlayFull: {
    top: 0,
    zIndex: 2,
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
  },
  dayUnavailable: {
    background: '#f3f5f5',
    color: '#c2c2c2 !important',
    borderColor: ' #e6e3e3  !important',
  },
  weekView: {
    marginTop: '0px',
    position: 'relative',
    display: 'table',
    width: '100%',
    '@media(max-width:479px)': {
      maxWidth: '90%',
      margin: 'auto',
    },
    '& h3': {
      fontSize: '13px',
      fontWeight: '500',
      color: theme.palette.common.black,
      textTransform: 'uppercase',
      letterSpacing: '1px',
      float: 'left',
    },
    '& ul': {
      padding: '0 0px',
      listStyle: 'none',
      display: 'flex',
    },
    '& li': {
      cursor: 'pointer',
      width: '15%',
      border: '1px solid #ccc',
      height: '40px',
      textAlign: 'center',
      marginRight: '5px',
      fontSize: '12px',
      fontWeight: '100',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.common.black,
    },
    '& > div:last-child': {
      position: 'relative',
    },
  },
  switchBox: {
    position: 'relative',
    top: -2,
    zIndex: 5,
  },
  activeWeek: {
    border: '1px solid #20a3e0 !important',
    background: '#f3f5f5',
  },
  addOpacity: {
    opacity: '0'
  },
  repeatWeeklyBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    '@media(max-width:767px)': {
      flexDirection: 'column'
    },
  },
  manageButtons: {
    padding: '0 15px',
    '& span': {
      display: 'inline-block',
      padding: '4px 24px',
      fontWeight: '400',
      '@media(max-width:479px)': {
        maxWidth: '100%',
        padding: '4px 0px',
      }
    },
    '& span:last-child': {
      background: 'transparent',
      color: theme.palette.common.blue,
      paddingRight: '0',
      '&:hover': {
        background: 'transparent',
      }

    },
    '@media(max-width:767px)': {
      '& span': {
        marginBottom: '0px'
      },
      '& span:first-child': {
        marginBottom: '10px'
      }
    },
    '@media(max-width:375px)': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
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
  markAsUnavial: {
    padding: '4px 45px !important',
    marginRight: '15px',
    background: '#fa4f4b !important',
  },
  dateButton: {
    background: '#f3f5f5',
    padding: '11px 15px',
    boxShadow: 'none',
    border: 'none',
    fontSize: '15px',
    marginBottom: '6px',
    outline: 'none'
  },
  timeItemsContainer: {
    '&.time_block_manage.time_block li': {
      width: '16.666%',
      boxSizing: 'border-box',
      height: '50px'
    }
  },
  timeItemsContainerWrap: {
    marginBottom: '25px'
  },
  inputRangeContainer: {
    maxWidth: '200px',
    margin: '20px auto 0',
    padding: '6px 0',
    '& .input-range__track--active': {
      background: '#fa4f4b',
    },
    '& .input-range__slider-container > div': {
      borderColor: theme.palette.common.white,
      boxShadow: '0 0 3px rgba(0, 0, 0, 0.3)',
      background: theme.palette.common.white,
    },
    '& .input-range__label-container': {
      display: 'none',
    },
  },
  displayTimerRange: {
    display: 'flex',
    justifyContent: 'center',
    padding: '5px 0',
    '& div': {
      fontSize: '14px',
      fontWeight: '500',
      textAlign: 'center',
      color: theme.palette.common.black,
      '& div': {
        width: '100%',
        fontSize: '13px',
        fontWeight: '500',
      },
    },
    '& span': {
      margin: '0 10px',
    },
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px 0',
    borderBottom: `1px solid ${theme.palette.common.border}`,
    fontFamily: "'Poppins', sans-serif",
    boxSizing: 'border-box',
    '&:last-child': {
      marginBottom: '20px',
    },
    '& *': {
      boxSizing: 'border-box',
    },
    '& p': {
      margin: '0',
    },
    '& .flex': {
      display: 'flex',
      alignItems: 'center',
    },
    '& .space-between': {
      justifyContent: 'space-between',
    },
    '& .title': {
      fontSize: '16px',
      fontWeight: 'bold',
      color: theme.palette.common.black,
    },
    '& .avatar': {
      width: '28px',
      height: '28px',
      marginRight: '6px',
    },
    '& .link': {
      fontSize: '14px',
      color: theme.palette.common.primary,
      cursor: 'pointer',
    },
    '& .time-line': {
      position: 'relative',
      width: '100%',
      height: '8px',
      margin: '8px 0',
      overflow: 'hidden',
      borderRadius: '5px',
      backgroundColor: theme.palette.common.slider,
      '& .active-time-line': {
        position: 'absolute',
        height: '8px',
        borderRadius: '4px',
        backgroundColor: theme.palette.common.secondary,
        '&.blue': {
          backgroundColor: theme.palette.common.primary,
        }
      }
    },
    '& .time-container': {
      justifyContent: 'center',
      fontSize: '14px',
      color: theme.palette.common.black,
      '& .time-number': {
        margin: '0 4px',
        fontWeight: 'bold',
        color: theme.palette.common.secondary,
        '&.blue': {
          color: theme.palette.common.primary,
        }
      },
      '& .dash': {
        margin: '0 6px',
      },
      '& .time-format': {
        fontWeight: 'bold',
      },
    },
    '& .remove-icon': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '19px',
      height: '19px',
      padding: '4px',
      border: `2px solid ${theme.palette.common.secondary}`,
      borderRadius: '50%',
      cursor: 'pointer',
      '&.opacity': {
        opacity: '0.6',
        cursor: 'initial',
      },
      '& i': {
        fontSize: '14px',
        lineHeight: '20px',
        color: theme.palette.common.secondary,
      },
    },
  },
  addTimeFrameButton: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '400px',
    margin: '20px auto',
    fontSize: '14px',
    fontWeight: 'bold',
    color: theme.palette.common.secondary,
    cursor: 'pointer',
    boxSizing: 'border-box',
    '& *': {
      boxSizing: 'border-box',
    },
    '& p': {
      margin: '0'
    },
    '& .plus-icon': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '19px',
      height: '19px',
      padding: '4px',
      marginRight: '6px',
      border: `1px solid ${theme.palette.common.secondary}`,
      borderRadius: '50%',
    },
  },
  submitBtn: {
    width: '30%',
    margin: '20px auto',
    '@media (max-width:479px)': {
      width: '100%',
    },
  },
  submitBtnRed: {
    '& span': {
      background: '#fa4f4b !important',
    },
  },
  opacity: {
    opacity: '0.6',
    cursor: 'initial',
  }
} );

const enhance = compose(
  withStyles( styles, { withTheme: true } ),
  withRouter,
  withApollo,
);

class HourlyAvailability extends Component {
  constructor( props ) {
    let isMobile = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
      isMobile = true;
    }
    super( props );
    const { selectedDate, poolUnavailabilitie, poolDetails, timeDetails } = this.props;
    this.state = {
      selectedDate: selectedDate || new Date(),
      poolUnavailabilitie,
      poolDetails,
      calendar: null,
      days: cloneDeep( defaultDays ),
      repeat: false,
      timeDetails,
      isMobile,
      loading: false,
      isOpen: false,
      timeRange: { min: 9, max: 21 },
      displayTime: { min: '9 am', max: '9 pm' },
      rangeAvailableFrom: 9,
      rangeAvailableTo: 21,
      ///////////////
      previousDate: null,
      showBlockTimeRange: false,
    };
    this.available = '#fff';
    this.unavailable = '#DEE0DE !important';
    this.partiallyAvailable = 'linear-gradient( -45deg, transparent, transparent 49%, #ccc 49%, #DEE0DE 51%, #DEE0DE 51% ) !important';

    this.manageUnAvailabilities = this.manageUnAvailabilities.bind( this );
    this.makeAllTimesUnavailable = this.makeAllTimesUnavailable.bind( this );
    this.handleCalender = this.handleCalender.bind( this );
    // this.selectTime = this.selectTime.bind( this );
    this.updateCalendarInst = this.updateCalendarInst.bind( this );
    this.handleDateChange = this.handleDateChange.bind( this );
    this.cancelRepeat = this.cancelRepeat.bind( this );
    this.makeUnavailabel = this.makeUnavailabel.bind( this );
		this.toggleCalendar = this.toggleCalendar.bind( this );
  }

	//Toggle calander
	toggleCalendar(e) {
		let { repeat } = this.state;
		if (this.state.isMobile) {
			e && e.preventDefault()
			if (this.state.isOpen === true || (repeat === true && this.state.isOpen === false)) {
				this.setState({ isOpen: !this.state.isOpen })
			}

		}
	}

  componentDidMount() {
    this.handleCalender( this.state.selectedDate, 'init' )
  }

  // getTimeItems() {
  //   const { classes } = this.props;
  //   return this.state.timeDetails.map( ( time, index ) =>
  //     <li
  //       key={index}
  //       className={`${time.activeClass ? classes.dayUnavailable : ''}`}
  //       onClick={( e ) => this.selectTime( e, index )}
  //       disabled={time.disable}
  //     >
  //       {time.time}
  //     </li> );
  // }

  getWeekDays() {
    const { days } = this.state;
    const { classes } = this.props;
    return days.map( ( day, index ) =>
      <li
        key={index}
        className={day.active ? classes.activeWeek : ''}
        onClick={( e ) => this.clickDay( e, index )}
      >
        {day.day}
      </li>
    );
  }

  manageUnAvailabilities(date) {
    let { selectedDate } = this.state;
    const { poolUnavailabilitie, availableFrom, availableTo, unavailableDates, updatedUnavailableDates, updatedUnavailability } = this.props;
    selectedDate = date || selectedDate
    selectedDate = moment( selectedDate ).format( 'YYYY-MM-DD' );
    const dateWasUpdated = !!updatedUnavailability.find(day => moment(day.date).isSame(moment(selectedDate), 'day'))
    const unvalibilities = _.filter( dateWasUpdated ? updatedUnavailability : poolUnavailabilitie, { date: selectedDate } );
    const timeDetails = cloneDeep( timeArray );
    const startFrom = timeDetails.find(time => time.time_insert === availableFrom).timeNumber
    const endAt = timeDetails.find(time => time.time_insert === availableTo).timeNumber
    const isToday = moment( selectedDate ).isSame( moment(), 'day' )
    const dayUnavailable = unavailableDates && !dateWasUpdated && !unvalibilities.length ? [...unavailableDates, ...updatedUnavailableDates].find(day => moment(day).isSame(moment(selectedDate), 'day')) : null
    let hour = new Date().getHours() + 1;
    for ( let i = 0; i < timeDetails.length; i++ ) {
      if (timeDetails[i].timeNumber < startFrom || timeDetails[i].timeNumber > endAt
        || ( isToday && timeDetails[i].timeNumber < hour )
      ) {
        timeDetails[i].disable = true
      } else {
        const unvalibilityIndex = _.filter( unvalibilities, { time: timeDetails[i]['time_insert'] } );
        if ( unvalibilityIndex.length >= 1 || dayUnavailable) {
          timeDetails[i].activeClass = 'active';
        } else {
          // remove previously selected day active time slots
          timeDetails[i].activeClass = '';
        }
      }
    }

    let endDate = new Date( this.state.selectedDate );
    let currentWeekDay = endDate.getDay();
    let daysToEndWeek = 7 - (currentWeekDay + 1);
    endDate = endDate.setDate( endDate.getDate() + daysToEndWeek );
    endDate = new Date( endDate );

    let rangeAvailableFrom = timeDetails.find(item => item.time_insert === this.props.availableFrom).timeNumber
    let rangeAvailableTo = timeDetails.find(item => item.time_insert === this.props.availableTo).timeNumber
    rangeAvailableFrom = timeDetails.find(item => !item.disable && item.timeNumber >= rangeAvailableFrom)
    rangeAvailableFrom = rangeAvailableFrom ? rangeAvailableFrom.timeNumber : null

    const timeRange = this.getSelectedDayTimeRange(timeDetails, rangeAvailableFrom, rangeAvailableTo)
    
    ///////////////////
    this.presetSelectedDayUnchangedTime(timeRange)
    ////////////////////

    this.setState( {
      timeDetails,
      repeat: false,
      days: cloneDeep( defaultDays ),
      endDate,
      displayTime: this.formatDisplayTime(timeRange),
      timeRange,
      rangeAvailableFrom,
      rangeAvailableTo,
    } );
  }

  getSelectedDayTimeRange = (timeDetails, availableFrom, availableTo) => {
    const activeTime = timeDetails.filter(item => item.activeClass)
    if (activeTime[0]) {
      let min = activeTime[0].timeNumber
      let max = activeTime[activeTime.length - 1].timeNumber
      return {
        min,
        max
      }
    } else {
      let min = availableFrom
      let max = availableTo
      const mid = parseInt((availableTo - availableFrom) / 2, 10)
      if (mid > 1) {
        min = availableFrom + (mid - 1)
        max = availableFrom + (mid + 2)
      }
      return {
        min,
        max
      }
    }
  }

  // find preselected time indexes
  presetSelectedDayUnchangedTime = (timeRange) => {
    const minIndex = this.state.timeDetails.findIndex(item => item.timeNumber === timeRange.min)
    const maxIndex = this.state.timeDetails.findIndex(item => item.timeNumber === timeRange.max)
    let rangeOfIndexes = this.getRangeOfIndexes(minIndex, maxIndex)
    this.updatePreselectedItems(rangeOfIndexes)
  }

  // set 'active' (i.e. unavailable) hours in partly blocked date, if they are not disabled
  updatePreselectedItems = (indexes) => {
    const { timeDetails, selectedDate, previousDate } = this.state
    for (let index = 0; index < timeDetails.length; index++) {
      if (!timeDetails[index].disable) {
        if (indexes.includes(index)) {
          timeDetails[index].activeClass = 'active'
          timeDetails[index].temporary = true
        } else {
          timeDetails[index].activeClass = ''
        }
      }
    }
    this.setState({
      timeDetails,
    }, () => {
      this.state.calendar.redraw()
    })
    this.props.presetSelectedDayUnchangedTime(timeDetails, selectedDate, previousDate)
  }

  getTimeNumber = (item) => {
    const time = timeArray.find(element => element.time_insert === item.time)
    if (time) {
      return time.timeNumber
    } else {
      const timeNumber = parseInt(item.time.slice(0, 2))
      return timeNumber === 0 ? 24 : timeNumber
    }
  }

  makeAllTimesUnavailable(date) {
    let { availableFrom, availableTo } = this.props;
    let { selectedDate } = this.state;
    const timeDetails = cloneDeep( timeArray );
    const startFrom = timeDetails.find(time => time.time_insert === availableFrom).timeNumber
    const endAt = timeDetails.find(time => time.time_insert === availableTo).timeNumber
    const isToday = moment( selectedDate ).isSame( moment(), 'day' )
    let hour = new Date().getHours() + 1;

    for ( let i = 0; i < timeArray.length; i++ ) {
      if (timeDetails[i].timeNumber < startFrom || timeDetails[i].timeNumber > endAt
        || ( isToday && timeDetails[i].timeNumber < hour )
      ) {
        timeDetails[i].disable = true
      } else {
        timeDetails[i].activeClass = 'active';
      }
    }

    let endDate = new Date( date );
    let currentWeekDay = endDate.getDay();
    let daysToEndWeek = 7 - (currentWeekDay + 1);
    endDate = endDate.setDate( endDate.getDate() + daysToEndWeek );
    endDate = new Date( endDate );

    let rangeAvailableFrom = timeDetails.find(item => item.time_insert === this.props.availableFrom).timeNumber
    let rangeAvailableTo = timeDetails.find(item => item.time_insert === this.props.availableTo).timeNumber
    rangeAvailableFrom = timeDetails.find(item => !item.disable && item.timeNumber >= rangeAvailableFrom).timeNumber

    const timeRange = this.getSelectedDayTimeRange(timeDetails, rangeAvailableFrom, rangeAvailableTo)

    this.setState( {
      timeDetails,
      repeat: false,
      days: cloneDeep( defaultDays ),
      endDate,
      displayTime: this.formatDisplayTime(timeRange),
      timeRange,
      rangeAvailableFrom,
      rangeAvailableTo,
    } );
  }

  handleCalender( event, from ) {
    let date = '';
    if ( from === 'init' ) {
      date = moment( event );
    } else {
      date = moment( event.date );
    }
    this.props.onSelectDate( date );

    /* for removing previously clicked date from array of blocked dates
      if it wasn't actually blocked, but just clicked */
    const previousDate = this.state.selectedDate
    this.setState( {
      selectedDate: date,
      previousDate
    }, () => {
      if ( event.background === this.unavailable ) {
        this.manageUnAvailabilities(date)
        this.makeAllTimesUnavailable(date)
      } else if (
        /* only for INITIAL rendering: the 'event' is a DATE and doesn't have a background property,
        so the INIT DATE is not being counted like blocked even if it is, and INCORRECT func 
        ( manageUnAvailabilities() instead of makeAllTimesUnavailable() ) is being called, so we need another check for this case */
        from === 'init'
        && this.props.unavailableDates.includes(moment(event).format('YYYY-MM-DD'))
      ) {
        this.makeAllTimesUnavailable(date)
      } else {
        this.manageUnAvailabilities( date )
      }
    } );
  }

  clickDay( event, index ) {
    const { days, repeat, timeRange } = this.state;
    const { unavailableDates } = this.props;
    if (repeat) {
      let date = new Date(this.state.selectedDate);
      let currentDayIndex = date.getDay()
      const diff = index - currentDayIndex;
      const updateDate = diff >= 0 ?
        moment( this.state.selectedDate ).add( diff, 'days' ).format('YYYY-MM-DD') :
        moment( this.state.selectedDate ).subtract( (diff * -1), 'days' ).format('YYYY-MM-DD')
      const availableFromNumber = timeArray.find(item => item.time_insert === this.props.availableFrom).timeNumber
      const availableToNumber = timeArray.find(item => item.time_insert === this.props.availableTo).timeNumber
      const unavailable = (this.state.timeRange.min === availableFromNumber && this.state.timeRange.max === availableToNumber)
        || unavailableDates.includes(updateDate)
      if (moment().diff(updateDate, 'days') <= 0) {
        days[index].active = !days[index].active
        this.setState( {
          days,
        }, () => {
          this.props.onSetDay( { days, addDayIndex: index, updateDate, timeRange, unavailable } )
        } );
      }
    }
  }

  // selectTime( event, index ) {
  //   const { timeStartIndex: start, timeEndIndex: end, timeDetails } = this.state;
  //   if (!timeDetails[index].disable) {
  //     if ( start < 0 ) { // if previously user didn't select time
  //       this.setState( { timeStartIndex: index }, () => {
  //         this.updateItems(this.getRangeOfIndexes(index, index))
  //       } );
  //     } else if ( start >= 0 && index > start && end < 0 ) { // if previously user selected start time and didn't select end time
  //       this.setState( { timeEndIndex: index }, () => {
  //         this.updateItems(this.getRangeOfIndexes(this.state.timeStartIndex, index))
  //       } );
  //     } else { // if previously user selected start and end time
  //       this.setState( {
  //         timeStartIndex: index,
  //         timeEndIndex: -1,
  //       }, () => {
  //         this.updateItems(this.getRangeOfIndexes(index, index))
  //       } );
  //     }
  //   }
  // }

  getRangeOfIndexes = (from, to) => {
    const indexes = []
    for (let i = from; i <= to; i++) {
      indexes.push(i)
    }
    return indexes
  }

  updateItems = (indexes) => {
    const { timeDetails } = this.state
    const { onSetTimeDetails } = this.props
    for (let index = 0; index < timeDetails.length; index++) {
      if (!timeDetails[index].disable) {
        if (indexes.includes(index)) {
          timeDetails[index].activeClass = 'active'
        } else {
          timeDetails[index].activeClass = ''
        }
      }
    }
    this.setState({
      timeDetails,
    }, () => {
      // const updatedTimes = timeDetails.filter(item => !item.disable && item.activeClass)
      // const firstSelectedTime = updatedTimes[0] && updatedTimes[0].time_insert
      // const lastSelectedTime = updatedTimes[updatedTimes.length - 1] && updatedTimes[updatedTimes.length - 1].time_insert
      // /* eslint-disable */
      // if (firstSelectedTime === availableFrom && lastSelectedTime === availableTo) {
      //   this.state.calendar.settings.colors = [{
      //     d: selectedDate, background: this.unavailable,
      //   }, ...this.state.calendar.settings.colors]
      // } else if (updatedTimes.length > 0) {
      //   this.state.calendar.settings.colors = [{
      //     d: selectedDate, background: this.partiallyAvailable,
      //   }, ...this.state.calendar.settings.colors]
      //   this.props.handleUpdate(selectedDate, updatedTimes)
      // } else if (updatedTimes.length === 0) {
      //   this.state.calendar.settings.colors = [{
      //     d: selectedDate, background: this.available,
      //   }, ...this.state.calendar.settings.colors]
      //   this.props.handleUpdate(selectedDate, updatedTimes)
      // }
      // /* eslint-enable */
      // this.state.calendar.redraw()
    })
    onSetTimeDetails(this.state.timeDetails, this.state.selectedDate)
  }

  updateCalendarInst( event, inst ) {
    if ( this.state.calendar !== inst ) {
      this.setState( { calendar: inst } );
      this.props.updateCalendarInst(event, inst)
    }
  }

  handleChange = name => event => {
    if (name === 'repeat') {
      if (event.target.checked === false) {
        this.setState({ [name]: event.target.checked, days: cloneDeep(defaultDays) });
        this.props.onSetDay( { repeat: false } )
        this.props.onCancelRepeat()
      } else {
        const availableFromNumber = timeArray.find(item => item.time_insert === this.props.availableFrom).timeNumber
        const availableToNumber = timeArray.find(item => item.time_insert === this.props.availableTo).timeNumber
        const unavailable = this.state.timeRange.min === availableFromNumber &&  this.state.timeRange.max === availableToNumber
        let days = cloneDeep(defaultDays)
        let date = new Date(this.state.selectedDate);
        let currentWeekDay = date.getDay();
        let daysToEndWeek = 7 - (currentWeekDay + 1);
        let dayNumber = date.getDay()
        let day = date.getDay();
        days[day].active = true;
        date = date.setDate(date.getDate() + daysToEndWeek);
        date = new Date(date);
        this.setState({ [name]: event.target.checked, endDate: date, days: days }, () => {
          this.props.onSetDay( {
            repeat: this.state.repeat,
            endDate: date,
            days,
            dayIndex: dayNumber,
            addDayIndex: dayNumber,
            updateDate: moment(this.state.selectedDate).format('YYYY-MM-DD'),
            unavailable
          } )
        });

      }
    } else {
      this.setState({ [name]: event.target.checked });
    }
  };

  handleDateChange( event ) {
    if (typeof event.target !== 'undefined' && event.target !== '') {
      this.setState({ [event.target.name]: event.target.value });
    } else {
      this.setState({ endDate: event, 'isOpen': false });
      this.props.onSetDay( { endDate: event } )
    }
  }

  isSubmitButtonDisabled() {
    let { repeat, endDate, days, timeDetails } = this.state;
    let repeatTimeDetails = timeDetails.filter(item => item.activeClass)
    let repeatDays = _.filter(days, { 'active': true });
    repeatDays = _.map(repeatDays, 'day_name');
    let buttonDisable = true
    if (repeat === true && repeatDays.length >= 1 && endDate !== '' && repeatTimeDetails.length > 0) {
      buttonDisable = false;
    }
    return buttonDisable
  }

  cancelRepeat() {
    this.setState( { repeat: false, days: cloneDeep( defaultDays ) } )
    this.props.onSetDay( { repeat: false } )
    this.props.onCancelRepeat()
  }

  makeUnavailabel () {
    let { availableFrom, availableTo, unAvailableTimeGroups, selectedDate: currSelectedDate } = this.props;
    this.setState({
      loading: true
    });
    let { selectedDate, days, repeat, poolDetails, endDate, timeRange } = this.state;
    const currentSelectedDate = moment(selectedDate)
    currentSelectedDate.set('date', currentSelectedDate.date() - currentSelectedDate.day()) // set first day of current visible week
    let date = moment(currentSelectedDate).format('YYYY-MM-DD');
    endDate = moment(endDate).format('YYYY-MM-DD');
    let pool_id = poolDetails.id;
    const unvalibilities = _.range(timeRange.min, timeRange.max + 1)
      .map(item =>  OBJECT_TIME_ARRAY.timeNumber[item].time_insert)
    let repeatDays = _.filter(days, { 'active': true });
    repeatDays = _.map(repeatDays, 'day_name');
    const currFormattedDate = moment(currSelectedDate).format('YYYY-MM-DD')
    const groups = unAvailableTimeGroups[currFormattedDate]
    const times = groups ? groups.flat().map(item => OBJECT_TIME_ARRAY.timeNumber[item].time_insert) : unvalibilities
    const isUnavailable = times[0] === availableFrom && times[times.length - 1] === availableTo

    // check if this pool have bookings on date which user want to block
    let hasBooking = false
    for (let k in this.props.bookings) {
      const day = defaultDays.find(item => item.day_number === moment(k).day()).day_name
      if (
        (moment(k).isSame(date, 'day')
        || moment(k).isAfter(date, 'day'))
        && !moment(k).isAfter(endDate, 'day')
        && repeatDays.includes(day)
      ) {
        if (isUnavailable) {
          hasBooking = true
          break
        } else {
          const bookingTimes = this.props.bookings[k].map(booking => {
            const from = OBJECT_TIME_ARRAY.time_insert[booking.from].timeNumber
            const to = OBJECT_TIME_ARRAY.time_insert[booking.to].timeNumber + 1
            return _.range(from, to + 1).map(time => OBJECT_TIME_ARRAY.timeNumber[time].time_insert)
          }).flat()
          hasBooking = bookingTimes.filter(time => times.includes(time)).length > 1
          if (hasBooking) {
            break
          }
        }
      }
    }

    if (hasBooking) {
      this.setState({ loading: false })
      this.props.handleErrorMessage('You can’t block time with existing bookings.')
      window.scrollTo({ top: 0 })
      return
    }

    if ((repeat === false) || (repeat === true && repeatDays.length >= 1 && endDate !== '')) {
      let data = {
        "pool_id": pool_id,
        "available_date": date,
        "available_time": isUnavailable ? [] : times,
        "repeat_availablitlity": repeat,
        "end_date": endDate,
        "days": repeatDays
      }

      this.setState({ loading: true }, async () => {
        try {
          const { data: { savePoolUnAvailability: result } } = await this.props.client.mutate({
            mutation: savePoolUnAvailability,
            variables: {
              data: data
            }
          })

          if (isUnavailable) {
            const unavailableData = []
            const repeatDaysIndexes = defaultDays.filter(day => repeatDays.includes(day.day_name)).map(day => day.day_number)

            let start = new Date(date)
            let end = new Date(endDate)

            while (start <= end) {
              if (repeatDaysIndexes.includes(start.getDay())) {
                unavailableData.push(moment(start).format('YYYY-MM-DD'))
              }
              let newDate = start.setDate(start.getDate() + 1)
              start = new Date(newDate)
            }

            await this.submitPoolUnAvailability({ unavailable: unavailableData })
          } else {
            const available = poolDetails.unavailable_dates.filter(unAvailableDate => {
              const day = defaultDays.find(item => item.day_number === moment(unAvailableDate).day()).day_name
              return (moment(unAvailableDate).isSame(date, 'day')
                || !moment(unAvailableDate).isAfter(endDate, 'day'))
                && moment(unAvailableDate).isAfter(date, 'day')
                && repeatDays.includes(day)
            })

            await this.submitPoolUnAvailability({ available })
          }

          this.setState({
            loading: false,
            repeat: false
          }, () => {
            this.props.onSetDay( { repeat: false } )
            if (result.status === 'true') {
              this.props.getPoolData()
            }
          })
        } catch (error) {
          let errorMsg = commonFunctions.parseGraphQLErrorMessage(error)
          this.setState({ loading: false })
          if (errorMsg === 'Unauthenticated.') {
            const status = await this.props.refreshToken(this.props.history)
            if (status === 'ok') {
              this.makeUnavailabel()
            }
          }
        }
      })
    }
  }

  submitPoolUnAvailability = async ({ unavailable = [], available = []}) => {
    try {
      await this.props.client.mutate({
        mutation: savePoolDaysUnAvailability,
        variables: {
          data: {
            unavailable: unavailable,
            available: available,
            pool_id: this.state.poolDetails.id,
          },
        },
      })
    } catch (error) {
      let errorMsg = commonFunctions.parseGraphQLErrorMessage(error)
      if (errorMsg === 'Unauthenticated.') {
        const status = await this.props.refreshToken(this.props.history)
        if (status === 'ok') {
          await this.submitPoolUnAvailability({ unavailable, available })
        }
      }
    }
  }

  handleTimeRange = (timeRange) => {
    this.setState({
      timeRange,
      displayTime: this.formatDisplayTime(timeRange)
    }, () => {
      const minIndex = this.state.timeDetails.findIndex(item => item.timeNumber === timeRange.min)
      const maxIndex = this.state.timeDetails.findIndex(item => item.timeNumber === timeRange.max)
      this.updateItems(this.getRangeOfIndexes(minIndex, maxIndex))
    })
  }

  formatDisplayTime = (timeRange) => {
    return {
      min: timeArray.find(item => item.timeNumber === timeRange.min).displayTime,
      max: timeArray.find(item => item.timeNumber === timeRange.max).displayTime,
    }
  }

  render() {
    const {
      classes,
      invalid,
      colors,
      selectedDate,
      firstAvailableDate,
    } = this.props
    const {
      rangeAvailableFrom,
      rangeAvailableTo,
      poolDetails,
      repeat,
      loading,
    } = this.state
    const bookings = this.props.bookings[moment(selectedDate).format('YYYY-MM-DD')] || []
    const unAvailableTimeGroups = this.props.unAvailableTimeGroups[moment(selectedDate).format('YYYY-MM-DD')] || []
    const poolAvailableFrom = OBJECT_TIME_ARRAY.time_insert[poolDetails.available_from].timeNumber
    const poolAvailableTo = OBJECT_TIME_ARRAY.time_insert[poolDetails.available_to].timeNumber
    const poolActiveTimesCount = (poolAvailableTo - poolAvailableFrom)
    return (
    <div className='hourly-availability'>
      { loading === true ? <Pageloader loading={loading} /> : '' }
      {repeat && <div className={classes.overlay} />}
      <mobiscroll.Form>
        <mobiscroll.FormGroup>
          <label>
            <mobiscroll.Calendar
              theme="bootstrap"
              layout="liquid"
              weeks={1}         // More info about weeks: https://docs.mobiscroll.com/4-6-2/react/calendar#opt-weeks
              display="inline"  // Specify display mode like: display="bottom" or omit setting to use default
              placeholder="Please Select..."
              onDayChange={this.handleCalender}
              value={selectedDate}
              colors={colors}
              invalid={invalid}
              onInit={this.updateCalendarInst}
              min={firstAvailableDate}
              // max={maxTime}
            >
              <input type="hidden" />
            </mobiscroll.Calendar>
          </label>
        </mobiscroll.FormGroup>
      </mobiscroll.Form>
      <div className={classes.timeItemsContainerWrap}>
        {
          bookings.length ? <div>
            {
              bookings.map((booking, index) => {
                const from = OBJECT_TIME_ARRAY.time_insert[booking.from]
                let to = OBJECT_TIME_ARRAY.time_insert[booking.to]
                to = OBJECT_TIME_ARRAY.timeNumber[to.timeNumber + 1]
                return <div className={classes.itemContainer} key={`booking-item-${index}`}>
                  <div className='flex space-between'>
                    <p className='title'>Booking</p>
                    <div className='flex'>
                      <Avatar
                        className='avatar'
                        alt='profile image'
                        src={booking.swimmer && booking.swimmer.img_url ? booking.swimmer.img_url : window.location.origin + '/img/profile-icon.png'}
                      />
                      <Link className='link' to='/host-reservation'>See reservation</Link>
                    </div>
                  </div>
                  <div className='time-line'>
                    <div
                      className='active-time-line blue'
                      style={{
                        left: Math.ceil((100 / poolActiveTimesCount) * (from.timeNumber - poolAvailableFrom)) + '%',
                        width: Math.ceil((100 / poolActiveTimesCount) * (to.timeNumber - from.timeNumber)) + '%'
                      }}
                    />
                  </div>
                  <div className='flex time-container'>
                    <p className='time-text'>
                      from
                      <span className='time-number blue'>
                        {from.displayTimeNumber}
                      </span>
                      <span className='time-format'>{from.timeFormat}</span>
                    </p>
                    <p className='dash'>
                      -
                    </p>
                    <p className='time-text'>
                      Until
                      <span className='time-number blue'>
                        {to.displayTimeNumber}
                      </span>
                      <span className='time-format'>{to.timeFormat}</span>
                    </p>
                  </div>
                </div>
              })
            }
          </div> : null
        }
        {
          unAvailableTimeGroups.length ? <div>
            {
              unAvailableTimeGroups.map((group, index) => {
                const from = OBJECT_TIME_ARRAY.timeNumber[group[0]]
                const to = OBJECT_TIME_ARRAY.timeNumber[group[group.length - 1]]
                return <div className={classes.itemContainer} key={`time-block-item-${index}`}>
                  <div className='flex space-between'>
                    <p className='title'>Time Block</p>
                    <div
                      className={`remove-icon ${repeat ? 'opacity' : ''}`}
                      onClick={!repeat ? this.props.removeUnAvailableTimeGroup.bind(this, index) : () => {}}
                    >
                      <i className='fa fa-times' aria-hidden='true' />
                    </div>
                  </div>
                  <div className='time-line'>
                    <div
                      className='active-time-line'
                      style={{
                        left: Math.ceil((100 / poolActiveTimesCount) * (from.timeNumber - poolAvailableFrom)) + '%',
                        width: Math.ceil((100 / poolActiveTimesCount) * (to.timeNumber - from.timeNumber)) + '%'
                      }}
                    />
                  </div>
                  <div className='flex time-container'>
                    <p className='time-text'>
                      from
                      <span className='time-number'>
                        {from.displayTimeNumber}
                      </span>
                      <span className='time-format'>{from.timeFormat}</span>
                    </p>
                    <p className='dash'>
                      -
                    </p>
                    <p className='time-text'>
                      Until
                      <span className='time-number'>
                        {to.displayTimeNumber}
                      </span>
                      <span className='time-format'>{to.timeFormat}</span>
                    </p>
                  </div>
                </div>
              })
            }
          </div> : null
        }

        {
          unAvailableTimeGroups.length < 3 ?
            !unAvailableTimeGroups.length || this.props.showBlockTimeRange ?
              <div>
                <div>
                  <div className={classes.inputRangeContainer}>
                    <InputRange
                      minValue={rangeAvailableFrom}
                      maxValue={rangeAvailableTo}
                      value={this.state.timeRange}
                      step={1}
                      onChange={this.handleTimeRange}
                    />
                  </div>

                  <div className={classes.displayTimerRange}>
                    <div>
                      From
                      <div>{this.state.displayTime.min}</div>
                    </div>
                    <span>-</span>
                    <div>
                      To
                      <div>{this.state.displayTime.max}</div>
                    </div>
                  </div>
                </div>
                <div className={`${classes.submitBtn} ${!repeat ? classes.submitBtnRed : classes.defaultReservationBtn}`}>
                  <Typography variant='button' onClick={!repeat ? this.props.handleSubmit : () => {}}>
                    BLOCK
                  </Typography>
                </div>
              </div> : <div
                className={`${classes.addTimeFrameButton} ${repeat ? classes.opacity : ''}`}
                onClick={!repeat ? this.props.handleBlockTimeRange : () => {}}
              >
                <div className='plus-icon'>
                  <i className='fa fa-plus' aria-hidden='true' />
                </div>
                <p>Add time frame block</p>
              </div> : null
        }

        <div className={classes.weekView}>
          <div className={`${!repeat ? classes.overlayFull : ''}`}></div>
          <h3>Repeat this availability</h3>
          <Switch
            checked={this.state.repeat}
            onChange={this.handleChange( 'repeat' )}
            value="repeat"
            color="primary"
            className={classes.switchBox}
          />
          <div className={repeat === false ? classes.addOpacity : ''}>
            <ul>
              {this.getWeekDays()}
            </ul>
            <div className={classes.repeatWeeklyBottom}>
              <Typography variant="subtitle2" component="label">End Date</Typography>
              {!this.state.isMobile && <DatePicker
                fixedHeight
                customInput={<CustomInput repeat={repeat} value={this.endDate}/>}
                selected={this.state.endDate}
                minDate={new Date(this.state.selectedDate)}
                dateFormat="MM/dd/yyyy"
                popperPlacement="top-start"
                onChange={this.handleDateChange}
              />}
              {
                this.state.isMobile && (
                  <div>
                    <button className={classes.dateButton} onClick={this.toggleCalendar}>
                      <Moment format="MM / DD / YY">{this.state.endDate}</Moment>
                    </button>
                  </div>
                )
              }
              {(this.state.isMobile && this.state.isOpen) && (
                <DatePicker
                  selected={this.state.endDate}
                  onChange={this.handleDateChange}
                  dateFormat="MM/dd/yyyy"
                  minDate={new Date(this.state.selectedDate)}
                  withPortal
                  onClickOutside={this.toggleCalendar}
                  inline
                  fixedHeight
                />
              )}
              <div className={classes.manageButtons}>
                <Typography variant="button" onClick={this.makeUnavailabel} className={classes.markAsUnavial}>
                  Mark as UNAVAILABLE
                </Typography>
                <Typography variant="button" onClick={this.cancelRepeat} className="cancelBtn">
                  Cancel
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> );
  }
}

HourlyAvailability.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedDate: PropTypes.object.isRequired,
  unAvailableTimeGroup: PropTypes.object,
  poolUnavailabilitie: PropTypes.array,
  colors: PropTypes.array.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  onSetDay: PropTypes.func.isRequired,
  presetSelectedDayUnchangedTime: PropTypes.func,
  removeUnAvailableTimeGroup: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleBlockTimeRange: PropTypes.func,
  showBlockTimeRange: PropTypes.bool,
};

HourlyAvailability.defaultProps = {
  classes: {},
  selectedDate: new Date(),
  unAvailableTimeGroup: {},
  poolUnavailabilitie: [],
  colors: [],
  handleUpdate: () => {},
  onSetDay: () => {},
  presetSelectedDayUnchangedTime: () => {},
  removeUnAvailableTimeGroup: () => {},
  handleSubmit: () => {},
  handleBlockTimeRange: () => {},
  showBlockTimeRange: false,
};

function HourlyAvailabilityContainer (props) {
  const userContext = useContext(UserContext)
  return <HourlyAvailability {...userContext} {...props} />
}

export default enhance(HourlyAvailabilityContainer);
