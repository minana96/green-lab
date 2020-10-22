import React, { Component } from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles'
import moment from 'moment'
import update from 'immutability-helper'
import _ from 'lodash'

// materials components
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

// components
import CalendarPopUp from '../../commons/calenderPopup'
import Moment from 'react-moment'

// styles
import styles from './styles'

// constants
import { timeArray } from '../../../config'
import HelperService from '../../../services/helper'

// utils
import UserUtils from '../../utilities/UserUtils'

class SelectDateAndTime extends Component {
  state = {
    selectedDate: new Date(),
    startTime: null,
    endTime: null,
    minDate: moment().format(),
    maxDate: moment().add(1, 'month').format(),
    timeDetails: timeArray,
    poolDetails: null,
    todayBookingTimes: [],
    modify: {
      date: new Date(),
      startTime: null,
      endTime: null,
    },
    minAvailableMonthIndex: moment().month(),
    unAvailableMonths: [],
    invalidDates: [],
  }

  initialized = false

  componentDidMount() {
    if (this.props.poolDetails && !this.initialized) {
      this.initialized = true
      this.handleParams()
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props !== prevProps && this.props.poolDetails) {
      this.initialized = true
      this.handleParams()
    }
  }

  updateAvailabilities = () => {
    const {
      poolDetails,
      selectedDate,
      startFrom,
      endAt,
      isDefaultInstantBooking,
      startTime,
      endTime
    } = this.state

    let defaultTime = _.cloneDeep(timeArray)

    if (!selectedDate) {
      defaultTime = defaultTime.map(item => {
        item.disable = true
        return item
      })
      this.setState({
        timeDetails: defaultTime,
        startTime: null,
        endTime: null,
        modify: {
          startTime: null,
          endTime: null
        }
      })
      return
    }

    const date = moment(selectedDate).format('YYYY-MM-DD')

    // Get All Selected day bookings
    const bookings = HelperService.filterBookings(poolDetails.bookings, date)
    const bookingTimes = HelperService.getBookingsTimes(bookings)

    this.setState({
      todayBookingTimes: bookingTimes
    })

    const currentSelectedMonthNumber = moment(selectedDate).month() + 1
    const isNotAvailableDate = this.state.unAvailableMonths.includes(currentSelectedMonthNumber)
      || moment(this.state.maxPoolDate) < moment(selectedDate)

    const minAvailableDate = moment().add(poolDetails.advance_notice, 'hours')
    const dayUnavailable = poolDetails.unavailable_dates.find(day => moment(day).isSame(moment(selectedDate), 'day'))
    const unAvailabilities = poolDetails.pool_unavailabilities.filter(unavailability => moment(unavailability.date).isSame(moment(selectedDate), 'day'))

    for (let i = 0; i < this.state.timeDetails.length; i++) {
      const unAvailabilitiesIndex = _.filter( unAvailabilities, { time: defaultTime[i]['time_insert'] } )
      const currentDate = moment(selectedDate).hours(timeArray[i].timeNumber)
      const bookingIndex = bookingTimes.indexOf(timeArray[i].timeNumber)

      if (
        isNotAvailableDate ||
        unAvailabilitiesIndex.length >= 1 ||
        bookingIndex >= 0 ||
        defaultTime[i].timeNumber < startFrom ||
        defaultTime[i].timeNumber > endAt ||
        dayUnavailable ||
        currentDate < minAvailableDate
      ) {
        defaultTime[i].disable = true
      }

      if (!defaultTime[i].disable && isDefaultInstantBooking) {
        defaultTime[i].instant = true
      }

      if ((startTime || endTime) && !defaultTime[i].disable && defaultTime[i].timeNumber >= startTime && defaultTime[i].timeNumber <= endTime) {
        defaultTime[i].active = true
      }
    }

    defaultTime = HelperService.disableSingleAvailableTimeSlots(defaultTime)
    let countOfActives = defaultTime.filter(el => !el.disable).length

    if (countOfActives > 1) {
      // can book today
      this.setState({
        timeDetails: defaultTime
      })
    } else {
      // disable today
      if (countOfActives === 1) {
        defaultTime = defaultTime.map(el => {
          el.disable = true
          return el
        })
      }
      this.setState({
        timeDetails: defaultTime,
        startTime: null,
        endTime: null,
        modify: {
          startTime: null,
          endTime: null
        }
      })
    }
  }

  handleParams = () => {
    let { startTime, endTime, poolDetails, date: selectedDate } = this.props

    // let { todayBookingTimes } = this.state
    // const unAvailabilities = poolDetails.pool_unavailabilities.filter(unavailability => moment(unavailability.date).isSame(moment(selectedDate), 'day'))
    // let unAvailabilityTimes = []
    // for (let i = 0; i < unAvailabilities.length; i++) {
    //   unAvailabilityTimes.push(parseInt(unAvailabilities[i].time))
    // }

    const startFrom = timeArray.find(time => time.time_insert === this.props.poolDetails.available_from).timeNumber
    const endAt = timeArray.find(time => time.time_insert === this.props.poolDetails.available_to).timeNumber
    startTime = startTime && (startTime < startFrom) ? startFrom : startTime
    endTime = endTime && (endTime > endAt) ? endAt : endTime

    // for (let i = 0; i < todayBookingTimes.length; i++) {
    //   if (startTime && startTime === todayBookingTimes[i]) {
    //     startTime++
    //   } else if (endTime && endTime === todayBookingTimes[i]) {
    //     endTime--
    //   }
    // }
    //
    // for (let i = 0; i < unAvailabilityTimes.length; i++) {
    //   if (startTime && startTime === unAvailabilityTimes[i]) {
    //     if (this.props.fromPage !== '/conversations') {
    //       startTime++
    //     } else {
    //       startTime = null
    //       endTime = null
    //     }
    //   } else if (endTime && endTime === unAvailabilityTimes[i]) {
    //     if (this.props.fromPage !== '/conversations') {
    //       endTime--
    //     } else {
    //       endTime = null
    //       startTime = null
    //     }
    //   }
    // }

    if (this.props.fromPage === '/pooldetails' && startTime && endTime) {
      let formattedStartForLocalStorage = HelperService.formatTime(startTime)
      let formattedEndForLocalStorage = HelperService.formatTime(endTime)
      UserUtils.setStartTime(formattedStartForLocalStorage)
      UserUtils.setTimerMin(startTime)
      UserUtils.setEndTime(formattedEndForLocalStorage)
      UserUtils.setTimerMax(endTime)
    }

    if ( endTime && (endTime <= startTime) ) {
      startTime = null
      endTime = null
    }

    let prevStartTime = this.state.startTime
    let prevEndTime = this.state.endTime

    const bookings = HelperService.filterBookings(poolDetails.bookings, moment(selectedDate).format('YYYY-MM-DD'))
    const bookingTimes = HelperService.getBookingsTimes(bookings)
    const { startTime: availableStartTime, endTime: availableEndTime } = HelperService.getAvailableStartEndTime({
      poolUnAvailabilities: poolDetails.pool_unavailabilities,
      date: moment(selectedDate).format('YYYY-MM-DD'),
      startTime,
      endTime,
      bookingTimes,
    })

    startTime = availableStartTime
    endTime = availableEndTime

    const { unAvailableMonths, invalidMonths, minAvailableMonthIndex } = this.getInvalidMonths(this.props.poolDetails)
    this.setState({
      poolDetails: this.props.poolDetails,
      isDefaultInstantBooking: this.props.isDefaultInstantBooking,
      minDate: moment().format(),
      maxDate: moment().add('year', 1).format(),
      maxPoolDate: this.getMaxDate(this.props.poolDetails),
      minAvailableMonthIndex,
      unAvailableMonths,
      invalidMonths,
      startFrom: timeArray.find(time => time.time_insert === this.props.poolDetails.available_from).timeNumber,
      endAt: timeArray.find(time => time.time_insert === this.props.poolDetails.available_to).timeNumber,
      selectedDate,
      startTime,
      endTime,
      modify: {
        startTime,
        endTime,
      }
    }, () => {
      this.handleInvalidMonths(this.updateAvailabilities)
      if ((prevStartTime !== this.state.startTime || prevEndTime !== this.state.endTime) && typeof this.props.setTimeCallback === 'function') {
        // this.props.setTimeCallback(startTime, endTime) // TODO we realy need to do it ?
      }
    })
  }

  getMaxDate = (poolDetails) => {
    const { availability_window } = poolDetails
    const availabilityWindow = moment().add( availability_window, 'days' ).format()
    return availabilityWindow
  }

  getMinDate = (poolDetails) => {
    const { months } = poolDetails
    const currentMonthIndex = moment().month()
    let firstMonthIndex = months && months.length ? months[0].month_number - 1 : currentMonthIndex
    firstMonthIndex = firstMonthIndex < currentMonthIndex ? currentMonthIndex : firstMonthIndex
    const firstMonthDate = moment().set('month', firstMonthIndex)
    return currentMonthIndex === firstMonthIndex ? firstMonthDate.format() : firstMonthDate.startOf('month').format()
  }

  getInvalidMonths = (poolDetails) => {
    const { months } = poolDetails
    const minAvailableMonthNumber = moment(this.state.minDate).month() + 1
    let minAvailableMonthIndex = -1
    const unAvailableMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    for (let i = 0; i < months.length; i++) {
      const index = unAvailableMonths.indexOf(months[i].month_number)
      if (index !== -1) {
        if (minAvailableMonthIndex === -1 && (months[i].month_number >= minAvailableMonthNumber)) {
          minAvailableMonthIndex = months[i].month_number - 1
        }
        unAvailableMonths.splice(index, 1)
      }
    }
    return {
      minAvailableMonthIndex,
      unAvailableMonths,
      invalidMonths: unAvailableMonths.reduce((result, next) => {
        result.push({
          start: moment().month(next - 1).startOf('month'),
          end: moment().month(next - 1).endOf('month'),
        })

        // block unavailable months for next year
        result.push({
          start: moment().add('year', 1).month(next - 1).startOf('month'),
          end: moment().add('year', 1).month(next - 1).endOf('month'),
        })
        return result
      }, [])
    }
  }

  handleInvalidMonths = (callback) => {
    const currentSelectedMonth = moment(this.state.selectedDate).month()
    if (this.state.unAvailableMonths.includes(currentSelectedMonth + 1)) {
      this.setState({
        startTime: null,
        endTime: null,
        modify: {
          startTime: null,
          endTime: null,
        }
      }, callback)
    } else {
      callback()
    }
  }

  handleTimerCancel = () => {
    this.setState({
      modify: {
        startTime: this.state.startTime,
        endTime: this.state.endTime,
      }
    }, () => {
      this.props.handleTimerPopup()
    })
  }

  handleTimerApply = () => {
    this.setState({
      startTime: this.state.modify.startTime,
      endTime: this.state.modify.endTime,
    }, () => {
      this.props.handleApplyTime(this.state.modify)
    })
  }

  handleCalendarApply = (date) => {
    this.setState({
      selectedDate: new Date(date),
    }, () => {
      this.props.handleApplyDate(date)
      this.updateAvailabilities()
    })
  }

  getTimerPlaceholder = () => {
    let {
      modify: { startTime, endTime  },
      // todayBookingTimes
    } = this.state
    // for (let i = 0; i < todayBookingTimes.length; i++) {
    //   if (startTime && startTime === todayBookingTimes[i]) {
    //     startTime++
    //   } else if (endTime && endTime === todayBookingTimes[i]) {
    //     endTime--
    //   }
    // }
    //
    // if ( endTime && (endTime <= startTime) ) {
    //   startTime = null
    //   endTime = null
    // }

    if (!startTime && !endTime) {
      return 'Select start time'
    } else if (startTime && !endTime) {
      return 'Select end time'
    } else {
      let start = ''
      if (startTime > 12) {
        start = (startTime - 12) + ':00 PM'
      } else if (startTime === 12) {
        start = (startTime) + ':00 PM'
      } else if (startTime === 0) {
        start = '12:00 AM'
      } else {
        start = startTime + ':00 AM'
      }

      let end = ''
      if (endTime > 12) {
        if(endTime === 24) {
          end = '12:00 AM'
        } else {
          end = (endTime - 12) + ':00 PM'
        }

      } else if (endTime === 12) {
        end = (endTime) + ':00 PM'
      } else {
        end = endTime + ':00 AM'
      }

      return `${start}-${end}`
    }
  }

  clickTime = (item, index) => {
    if (!item.disable) {
      let { timeDetails, modify: { startTime, endTime } } = this.state
      timeDetails = _.cloneDeep(timeDetails)
      if ((!startTime && !endTime) || (endTime && endTime)) {
        if (!timeDetails[index].disable) {
          const startTime = timeArray[index].timeNumber
          const endTime = null
          timeDetails[index].active = true
          timeDetails = this.updateActiveItems(timeDetails, startTime, endTime)
          this.setState({
            timeDetails,
            modify: update(this.state.modify, {
              startTime: { $set: startTime },
              endTime: { $set: endTime },
            })
          })
        }
      } else {
        if (startTime > timeArray[index].timeNumber) {
          const startTime = timeArray[index].timeNumber
          const endTime = null
          timeDetails[index].active = true
          timeDetails = this.updateActiveItems(timeDetails, startTime, endTime)
          this.setState({
            timeDetails,
            modify: update(this.state.modify, {
              startTime: { $set: startTime },
              endTime: { $set: endTime },
            })
          })
        } else {
          let startIndex = timeArray.findIndex(time => time.timeNumber === startTime)
          for (let i = startIndex; i <= index; i++) {
            if (!timeDetails[i].disable) {
              const startTime = this.state.modify.startTime
              const endTime = timeArray[index].timeNumber
              timeDetails[index].active = true
              timeDetails = this.updateActiveItems(timeDetails, startTime, endTime)
              if (i + 1 === index) {
                this.setState({
                  timeDetails,
                  modify: update(this.state.modify, {
                    endTime: { $set: endTime },
                  })
                })
              }
            } else {
              const startTime = this.state.modify.startTime
              const endTime = timeArray[index].timeNumber
              timeDetails = this.updateActiveItems(timeDetails, startTime, endTime)
              this.setState({
                timeDetails,
                modify: update(this.state.modify, {
                  endTime: { $set: endTime },
                })
              })
              break
            }
          }
        }
      }
    }
  }

  updateActiveItems = (timeDetails, startTime, endTime) => {
    return timeDetails.map((item) => {
      item.active = (endTime && item.timeNumber >= startTime && item.timeNumber <= endTime) || item.timeNumber === startTime
      item.hovered = false
      return item
    })
  }

  handleTimer = () => {
    this.setState({
      showCalendar: false,
      showTimer: !this.state.showTimer,
      onFocusCalendar: false,
      onFocusTimer: !this.state.showTimer,
    })
  }

  onMouseEnter = (item, index) => {
    let { modify: { startTime, endTime }, timeDetails } = this.state
    if (startTime && !endTime) {
      timeDetails = _.cloneDeep(timeDetails)
      let startIndex = timeArray.findIndex(time => time.timeNumber === startTime)
      for (let i = startIndex; i < timeArray.length; i++) {
        if (i <= index && i !== startIndex) {
          timeDetails[i].hovered = true
        } else {
          timeDetails[i].hovered = false
        }
      }
      this.setState({ timeDetails })
    }
  }

  onMouseLeave = () => {
    let { modify: { startTime, endTime }, timeDetails } = this.state
    if (startTime && !endTime) {
      timeDetails = _.cloneDeep(timeDetails)
      let startIndex = timeArray.findIndex(time => time.timeNumber === startTime)
      for (let i = startIndex; i < timeArray.length; i++) {
        timeDetails[i].hovered = false
      }
      this.setState({ timeDetails })
    }
  }

  getTimeItemClass = (item) => {
    return `
      ${item.active ? 'active' : ''}
      ${item.disable ? 'disable' : ''}
      ${item.instant ? 'instant' : ''}
      ${item.hovered ? 'hovered' : ''}
    `
  }

  renderTimeItems = () => {
    return this.state.timeDetails.map((item, index) =>
      <li
        key={index}
        onMouseEnter={this.onMouseEnter.bind(this, item, index)}
        className={this.getTimeItemClass(item)}
        onClick={this.clickTime.bind(this, item, index)}
      >
        {item.time}
        {item.disable
          ? <div className='lineThrough' />
          : null
        }
      </li>
    )
  }

  render () {
    const {
      selectedDate,
      maxDate,
      minDate,
      modify,
    } = this.state
    const { classes, timePopupCustomStyles = null, allDatesIsInvalid } = this.props

    return (
      <div className={classes.container} onMouseLeave={this.onMouseLeave}>
        <div className={`${classes.inputItem} ${classes.relative} ${classes.paddingRight} date`}>
          <div className={`${classes.formInputBox} ${(this.props.showCalendar ? 'focus' : '')}`}>
            <Typography variant='subtitle2' component='label'>Date</Typography>
            <div
              className={classes.dropDownSelectTime}
              onClick={this.props.handleCalendarPopup}
            >
              {selectedDate && !allDatesIsInvalid ? <Moment format='MMMM DD, YYYY'>{selectedDate}</Moment> : 'Select date'}
            </div>
            <span className='icon'>
              <img src={window.location.origin + '/img/calender-green2.png'} alt='calendar' />
            </span>
          </div>
          <div className={classes.calendar}>
            {
              this.props.showCalendar && <CalendarPopUp
                selectedDate={selectedDate}
                maxDate={maxDate}
                minDate={minDate}
                handleCalenderCancel={this.props.handleCalendarPopup}
                handleCalenderApply={this.handleCalendarApply}
                invalidDates={this.props.invalidDates}
                updateBtn
              />
            }
          </div>
        </div>
        <div className={`${classes.inputItem} ${classes.relative} time`}>
          <div className={`${classes.formInputBox} ${this.props.showTimer ? 'focus' : ''}`}>
            <Typography variant='subtitle2' component='label'>Time</Typography>
            <div className={classes.dropDownSelectTime} onClick={this.props.handleTimerPopup} >
              {this.getTimerPlaceholder()}
            </div>
            <span className='icon'>
              <img src={window.location.origin + '/img/timer.png'} alt='Timer' />
            </span>
          </div>
          {
            this.props.showTimer && <div className={classes.timeBlock} style={timePopupCustomStyles}>
              <ul className={`time-block`}>
                {this.renderTimeItems()}
                <div className={'timer-buttons'}>
                  <Button className={classes.cancelBtn} onClick={this.handleTimerCancel}>
                    Cancel
                  </Button>

                  <Button
                    disabled={!modify.startTime || !modify.endTime}
                    onClick={this.handleTimerApply}>
                    Update
                  </Button>
                </div>
              </ul>
            </div>
          }
        </div>
      </div>
    )
  }
}

const enhance = compose(
  withStyles(styles)
)

export default enhance(SelectDateAndTime)

SelectDateAndTime.propTypes = {
  poolDetails: PropTypes.object,
  date: PropTypes.object,
  startTime: PropTypes.any,
  endTime: PropTypes.any,
  handleApplyDate: PropTypes.func,
  handleApplyTime: PropTypes.func,
  handleCalendarPopup: PropTypes.func,
  handleTimerPopup: PropTypes.func,
  showCalendar: PropTypes.bool,
  showTimer: PropTypes.bool,
  timePopupCustomStyles: PropTypes.object,
  isDefaultInstantBooking: PropTypes.bool,
  allDatesIsInvalid: PropTypes.bool,
}

SelectDateAndTime.defaultProps = {
  poolDetails: null,
  date: new Date(),
  startTime: null,
  endTime: null,
  handleApplyDate: () => {},
  handleApplyTime: () => {},
  handleCalendarPopup: () => {},
  handleTimerPopup: () => {},
  showCalendar: false,
  showTimer: false,
  timePopupCustomStyles: null,
  isDefaultInstantBooking: false,
  allDatesIsInvalid: false,
}
