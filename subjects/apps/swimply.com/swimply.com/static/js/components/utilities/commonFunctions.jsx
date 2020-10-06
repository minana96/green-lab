import moment from 'moment'
import _ from 'lodash'
import HelperService from '../../services/helper'
import {timeArray} from '../../config'
import UserUtils from './UserUtils'

//Validate the value for a valid email
export function validateEmail(email) {
  // eslint-disable-next-line
  const re = new RegExp(['^(([^<>()\\[\\]\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\.,;:\\s@"]+)*)',
    '|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])',
    '|(([a-zA-ZÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜŸäëïöüŸ¡¿çÇŒœßØøÅåÆæÞþÐð:\\-0-9]+\\.)',
    '+[a-zA-ZÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜŸäëïöüŸ¡¿çÇŒœßØøÅåÆæÞþÐð:]{2,}))$'].join(''));
  return re.test(email);
}

// Check if the string is empty, return boolean (`true` if field is empty) /^[A-Za-z]+$/
export function isEmpty(str) {
  return !str.replace(/^\s+/g, '').length;
}

// Check if the firstName and lastName accept only string not number
export function validateName(str) {
  const re = new RegExp(/((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i);
  return re.test(str);
}

// Validate password (one capital, one small, lenth is min lenth)
export function isValidPassword(password, minLength) {
  if(password.length >= 6) {
    return true;
  } else {
    return false;
  }
}

// VALIDATE PHONE NUMBER ACCORDING TO US FORMAT xxx-xxx-xxxx
//let phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
// /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
export function validateNumbersOnly(number) {
  const re = new RegExp(/\D/)
  return re.test(number);
}

export function validateMinLength(str) {
  const minLength = new RegExp(["^.{"+str+"}$"])

  return minLength.test(str);
}

export function validatePhoneNumber(number) {
  const re = new RegExp(/^\d{10}$/)
  return re.test(number);
}

export function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
export function parseGraphQLErrorMessage(error, type) {
  let errorMessage;
  errorMessage = error.toString().replace('Error: GraphQL error: ', '');
  errorMessage = errorMessage.toString().replace('400 - ', '');
  errorMessage = errorMessage.toString().replace('401 - ', '');

  //If the error message is a valid JSON then, retrieve the error message from the object
  if (IsJsonString(errorMessage)) {
    let errorObj = JSON.parse(errorMessage);
    errorMessage = errorObj.error.message;
  }

  if(type !== undefined && type !== '') {
  	errorMessage = 'City or State is missing, please enter valid address.'
  }

  // If the message contains network error
  if (errorMessage.toLowerCase().indexOf("network error") !== -1) {
    //errorMessage = errorMessage.toString().replace('Error: Network error: ', '');
    //Error: Network error: Response not successful: Received status code 400
    errorMessage = "An error occurred please try again later.";
  }

  if (error.graphQLErrors && error.graphQLErrors[0] && error.graphQLErrors[0].extensions && typeof error.graphQLErrors[0].extensions.errors === 'string') {
    errorMessage = error.graphQLErrors[0].extensions.errors || errorMessage
  }

  return errorMessage;
}

export function handleGuests ({ adult_guests, children_guests, infant_guests }) {
  let aCount = ''
  let aLabel = ''
  if (adult_guests === 0) {
    aCount = ''
    aLabel = ''
  } else if (adult_guests === 1) {
    aCount = adult_guests
    aLabel = (children_guests === 0 && infant_guests === 0) ? 'Adult' : 'Adult,'
  } else {
    aCount = adult_guests
    aLabel = (children_guests === 0 && infant_guests === 0) ? 'Adults' : 'Adults,'
  }
  let cCount = ''
  let cLabel = ''
  if (children_guests === 0) {
    cCount = ''
    cLabel = ''
  } else if (children_guests === 1) {
    cCount = children_guests
    cLabel = infant_guests === 0 ? 'Children' : 'Children,'
  } else {
    cCount = children_guests
    cLabel = infant_guests === 0 ? 'Childrens' : 'Childrens,'
  }
  let iCount = ''
  let iLabel = ''
  if (infant_guests === 0) {
    iCount = ''
    iLabel = ''
  } else if (infant_guests === 1) {
    iCount = infant_guests
    iLabel = 'Infant'
  } else {
    iCount = infant_guests
    iLabel = 'Infants'
  }

  if (aCount || cCount || iCount) {
    return `(
         ${aCount} ${aLabel}
         ${cCount} ${cLabel}
         ${iCount} ${iLabel}
      )`
  } else {
    return ''
  }
}

export function updateDefaultTime( defaultTime, presentTime, index, timeArray ) {
  const updatedTime = [...defaultTime];
  if ( updatedTime[index].instaBookingClass ) {
    // eslint-disable-next-line no-plusplus
    for ( let instaBookingIndex = index; defaultTime[instaBookingIndex + 1]; instaBookingIndex++ ) {
      if ( !updatedTime[instaBookingIndex].instaBookingClass && !presentTime[instaBookingIndex].disable ) {
        updatedTime[instaBookingIndex].instaBookingClass = 'insta_booking';
        break;
      }
    }
  } else {
    // eslint-disable-next-line no-plusplus
    for ( let timeSlotIndex = index; timeSlotIndex < timeArray.length; timeSlotIndex++ ) {
      updatedTime[timeSlotIndex].instaBookingClass = '';
    }
  }
  // eslint-disable-next-line no-plusplus
  for ( let instaBookingIndex = 0; instaBookingIndex < index; instaBookingIndex++ ) {
    updatedTime[instaBookingIndex].instaBookingClass = '';
  }
  return updatedTime;
}

export function getParameterByName (name, url) {
  if (!url) {
    url = window.location.href
  }
  name = name.replace(/[[]]/g, '\\$&')
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  let results = regex.exec(url)
  if (!results) {
    return null
  }
  if (!results[2]) {
    return ''
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

export function getUnAvailableMonths (months) {
  const unAvailableMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const minAvailableMonthNumber = moment().month() + 1
  let minAvailableMonthIndex = -1
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
    unAvailableMonths
  }
}

export function getInvalidDates (poolDetails, selectedDate) { // copied function from mobile app
  selectedDate = moment(selectedDate)
  let selectedDateIsInvalid = !selectedDate.isValid() // check if date is invalid
  let firstAvailableDate = null
  let datesBlackList = []
  let unavailableDates = poolDetails.unavailable_dates
  if (unavailableDates && unavailableDates.length > 0) {
    for (let i = 0; i < unavailableDates.length; i++) {
      selectedDateIsInvalid = selectedDateIsInvalid || moment(selectedDate).isSame(moment(unavailableDates[i]), 'day')
      datesBlackList.push({start: moment(unavailableDates[i], ('YYYY-MM-DD')), end: moment(unavailableDates[i], ('YYYY-MM-DD'))})
    }
  }

  if (poolDetails.months) {
    let unAvailableMonths = getUnAvailableMonths(poolDetails.months).unAvailableMonths
    for (let i = 0; i < unAvailableMonths.length; i++) {
      let processedMonth = moment().set('month', unAvailableMonths[i] - 1)
      let currentMonthDates = new Array(processedMonth.daysInMonth()).fill(null).map((x, i) => moment(processedMonth.startOf('month').add(i, 'days')))
      selectedDateIsInvalid = selectedDateIsInvalid || moment(selectedDate).isSame(moment(currentMonthDates[0]), 'month')
      datesBlackList.push({
        start: moment(currentMonthDates[0]),
        end: moment(currentMonthDates.pop())
      })
    }
  }

  let totalPoolAvailableHours = 17
  let subtractFrom = parseInt(poolDetails.available_from.split(':')[0]) - 7
  let subtractTo = 0
  if (poolDetails.available_to !== '00:00:00') {
    subtractTo = (parseInt(poolDetails.available_to.split(':')[0]) - 24) * -1
  }

  totalPoolAvailableHours = totalPoolAvailableHours - subtractFrom - subtractTo

  let approvedBookings = []
  if (poolDetails.bookings && poolDetails.bookings.length) {
    for (let i = 0; i < poolDetails.bookings.length; i++) {
      if (moment(poolDetails.bookings[i].date, 'YYYY-MM-DD').isAfter(moment().subtract(1, 'day'))) {
        approvedBookings.push(...HelperService.filterBookings(poolDetails.bookings, poolDetails.bookings[i].date))
      }
    }
  }

  // preparing an array to get and disable single time slots (without pair) (that can't be booked)
  let blockedDaysUnAvailableHours = []

  approvedBookings = _.uniq(approvedBookings)

  let bookedHours = []
  if (approvedBookings.length > 0) {
    for (let i = 0; i < approvedBookings.length; i++) {
      if (moment(approvedBookings[i].date, 'YYYY-MM-DD').isAfter(moment().subtract(1, 'day'))) {
        let dateAlreadyPresent = bookedHours.find(el => el.date === approvedBookings[i].date)
        let startBookingTime = parseInt(approvedBookings[i].from.split(':')[0])
        let endBookingTime = parseInt(approvedBookings[i].to.split(':')[0]) + 2

        // getting UNavailable hours to then get and disable single ones, that can't be booked
        let presentInAvailableHours = blockedDaysUnAvailableHours.find(el => el.date === approvedBookings[i].date)
        if (presentInAvailableHours) {
          presentInAvailableHours.availableTimes = [...presentInAvailableHours.availableTimes, ..._.range(startBookingTime, endBookingTime)] // we don't need to decrease endBookingTime, cause range doesn't count last element
        } else {
          blockedDaysUnAvailableHours.push({date: approvedBookings[i].date, availableTimes: _.range(startBookingTime, endBookingTime)})
        }

        if (dateAlreadyPresent) {
          dateAlreadyPresent.hoursBlocked = dateAlreadyPresent.hoursBlocked + (endBookingTime - startBookingTime)
        } else {
          bookedHours.push({date: approvedBookings[i].date, hoursBlocked: (endBookingTime - startBookingTime)})
        }
      }
    }
  }

  let blockedHours = []
  if (poolDetails.pool_unavailabilities && poolDetails.pool_unavailabilities.length) {
    for (let i = 0; i < poolDetails.pool_unavailabilities.length; i++) {
      if (moment(poolDetails.pool_unavailabilities[i].date, 'YYYY-MM-DD').isAfter(moment().subtract(1, 'day'))) {

        // getting UNavailable hours to then get and disable single ones, that can't be booked
        let presentInAvailableHours = blockedDaysUnAvailableHours.find(el => el.date === poolDetails.pool_unavailabilities[i].date)
        let currentBlockedTime = parseInt(poolDetails.pool_unavailabilities[i].time.split(':')[0])
        if (presentInAvailableHours) {
          presentInAvailableHours.availableTimes = [...presentInAvailableHours.availableTimes, currentBlockedTime]
        } else {
          blockedDaysUnAvailableHours.push({date: poolDetails.pool_unavailabilities[i].date, availableTimes: [currentBlockedTime]})
        }

        let dateAlreadyPresent = blockedHours.find(el => el.date === poolDetails.pool_unavailabilities[i].date)
        if (dateAlreadyPresent) {
          dateAlreadyPresent.hoursBlocked++
        } else {
          blockedHours.push({date: poolDetails.pool_unavailabilities[i].date, hoursBlocked: 1})
        }
      }
    }
  }

  let possibleBlackListDates = [...bookedHours]

  if (blockedHours.length > 0) {
    for (let i = 0; i < blockedHours.length; i++) {
      let dateAlreadyPresent = possibleBlackListDates.find(el => el.date === blockedHours[i].date)
      if (dateAlreadyPresent) {
        dateAlreadyPresent.hoursBlocked = dateAlreadyPresent.hoursBlocked + blockedHours[i].hoursBlocked
      } else {
        possibleBlackListDates.push({date: blockedHours[i].date, hoursBlocked: blockedHours[i].hoursBlocked})
      }
    }
  }

  let formattedNewBlacklistDates = []
  if (possibleBlackListDates.length > 0) {
    possibleBlackListDates = possibleBlackListDates.filter(item => item.hoursBlocked >= totalPoolAvailableHours)
    formattedNewBlacklistDates = possibleBlackListDates.map((el, i) => {
      selectedDateIsInvalid = selectedDateIsInvalid || moment(selectedDate).isSame(moment(el.date), 'day')
      return {
        start: moment(el.date, 'YYYY-MM-DD'),
        end: moment(el.date, 'YYYY-MM-DD')
      }
    })
  }

  // handle advance notice option
  const minAvailableDate = moment().add(poolDetails.advance_notice, 'hour')
  // get range of unavailable dates from today to min available date
  const unAvailableDates = getDatesRange(moment(), minAvailableDate)
  // get all bookings which date equal to min available date
  const bookings = HelperService.filterBookings(poolDetails.bookings, minAvailableDate.format('YYYY-MM-DD'))
  const bookingTimes = HelperService.getBookingsTimes(bookings)
  const availableFromNumber = timeArray.find(item => item.time_insert === poolDetails.available_from).timeNumber
  const availableToNumber = timeArray.find(item => item.time_insert === poolDetails.available_to).timeNumber
  // get all times
  const allTimes = _.range(availableFromNumber, availableToNumber)
  // get all un available times
  const unAvailableTimes = [..._.range(availableFromNumber, minAvailableDate.hour()), ...bookingTimes]
  // filter all times to get all available times
  const availableTimes = allTimes.filter(item => !unAvailableTimes.includes(item))
  const minAvailableDateIsUnAvailable = !availableTimes.length

  // in case if min date(by advance_notice) is available need to remove this one from un available dates array
  if (!minAvailableDateIsUnAvailable) {
    unAvailableDates.pop()
  }

  let totalPoolDayAvailableHours = _.range(availableFromNumber, availableToNumber + 1)
  let completelyBlockedDays = getCompletelyBlockedDays(blockedDaysUnAvailableHours, totalPoolDayAvailableHours, poolDetails.advance_notice)
  completelyBlockedDays = completelyBlockedDays.map((item, index) => {
    return { start: moment(item, 'YYYY-MM-DD'), end: moment(item, 'YYYY-MM-DD') }
  })

  for (let i = 0; i < unAvailableDates.length; i++) {
    selectedDateIsInvalid = selectedDateIsInvalid || moment(selectedDate).isSame(moment(unAvailableDates[i]), 'day')
    datesBlackList.push({
      start: moment(unAvailableDates[i], 'YYYY-MM-DD'),
      end: moment(unAvailableDates[i], 'YYYY-MM-DD')
    })
  }

  // handle availability window option
  datesBlackList.push({
    start: moment().add(poolDetails.availability_window, 'day'),
    end: moment().add(poolDetails.availability_window + 365, 'day'),
  })

  datesBlackList = [...datesBlackList, ...formattedNewBlacklistDates, ...completelyBlockedDays]

  if (selectedDateIsInvalid) {
    firstAvailableDate = getFirstAvailableDate(datesBlackList, poolDetails.availability_window)
  }

  return {
    allDatesIsInvalid: selectedDateIsInvalid && !firstAvailableDate,
    invalidDates: datesBlackList,
    selectedDateIsInvalid,
    firstAvailableDate
  }
}

// getting available hours from UNavailable
function getCompletelyBlockedDays (availableHours = {}, totalPoolDayAvailableHours, advanceNotice) {
  let unAvailableHours = _.cloneDeep(availableHours)
  let dayTimeRange = [...totalPoolDayAvailableHours]
  for (let i = 0; i < unAvailableHours.length; i++) {
    if (moment(unAvailableHours[i].date).date() === moment().date() && moment().hours() > 7) {
      let endTime = Math.max(...totalPoolDayAvailableHours)
      dayTimeRange = _.range(moment().hours() + 1 + advanceNotice, endTime + 1)
    } else {
      dayTimeRange = [...totalPoolDayAvailableHours]
    }

    unAvailableHours[i].availableTimes = dayTimeRange.filter(item => !unAvailableHours[i].availableTimes.includes(item)).sort((a, b) => a - b)
  }

  let completelyBlockedDays = []
  
  for (let i = 0; i < unAvailableHours.length; i++) {
    let currentHoursSet = unAvailableHours[i]
    if (currentHoursSet.availableTimes.length > 0) {
      let singleSlots = []
      // eslint-disable-next-line
      currentHoursSet.availableTimes.map((item, index) => {
        let previousSibling = currentHoursSet.availableTimes[index - 1] || null
        let previousSiblingCheck = previousSibling && item - previousSibling === 1
        let nextSibling = currentHoursSet.availableTimes[index + 1] || null
        let nextSiblingCheck = nextSibling && item - nextSibling === -1
        
        if (!previousSiblingCheck && !nextSiblingCheck) {
          singleSlots.push(item)
        }
        if (currentHoursSet.availableTimes.length === singleSlots.length) {
          completelyBlockedDays.push(currentHoursSet.date)
        }
      })
    } else {
      completelyBlockedDays.push(currentHoursSet.date)
    }
  }

  return completelyBlockedDays
}

function getFirstAvailableDate (datesBlackList, availability_window) {
  // create array with all unavailable dates
  let unAvailableRange = []
  for (let i = 0; i < datesBlackList.length; i++) {
    const start = datesBlackList[i].start
    const end = datesBlackList[i].end
    unAvailableRange = [...unAvailableRange, ...getDatesRange(moment(start), moment(end))]
  }

  // get dates range from the small(today) unavailable date to the biggest unavailable date
  const filteredUnAvailableRange = unAvailableRange.filter(date => !moment(date).isBefore(moment(), 'day')) // filter past dates
  const sortedUnAvailableRange  = filteredUnAvailableRange.sort((a, b) => moment(a).diff(moment(b)))
  const datesRange = getDatesRange(moment(), moment(sortedUnAvailableRange[sortedUnAvailableRange.length - 1]))

  let firstAvailableDate = null
  for (let i = 0; i < datesRange.length; i++) {
    if (!sortedUnAvailableRange.includes(datesRange[i])) {
      firstAvailableDate = moment(datesRange[i])
      break
    }
  }

  // in case if range has not available date need to set last unavailable date and add 1 day
  if (!firstAvailableDate) {
    const lastUnAvailableDate = moment(sortedUnAvailableRange[sortedUnAvailableRange.length - 1])
    firstAvailableDate = lastUnAvailableDate.add(1, 'day')
  }

  if (firstAvailableDate.isAfter(moment().add(availability_window, 'day'))) {
    firstAvailableDate = null
  }

  return firstAvailableDate
}

function getDatesRange (startDate, stopDate) {
  let dateArray = []
  let currentDate = moment(startDate)
  stopDate = moment(stopDate)
  while (currentDate <= stopDate) {
    dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
    currentDate = moment(currentDate).add(1, 'days')
  }
  return dateArray
}

export function getFormatDate (date) {
  date = new Date(date)
  let day = date.getDate()
  let year = date.getUTCFullYear()
  let monthVal = date.getMonth() + 1
  return year + '-' + monthVal + '-' + day
}

// push new message to Async Storage to show it to user immediately when he enters the chat
export function handleNewMessage (e) {
  e.message.id = e.message.id.toString();
  e.message.reciever_id = e.message.reciever_id.toString();
  e.message.sender_id = e.message.sender_id.toString();

  let latestChats = UserUtils.getLatestChats()
  let currentChatIndex = latestChats.findIndex(chat => chat.receiverId === e.message.sender_id)
  if (currentChatIndex >= 0) {
    if (latestChats[currentChatIndex].messages.length >= 10) {
      latestChats[currentChatIndex].messages.pop()
    }
    latestChats[currentChatIndex].messages.unshift(e.message)
  } else {
    if (latestChats.length >= 10) {
      latestChats.pop()
    }
    let chatToSave = {
      messages: [e.message],
      receiverId: e.message.sender_id
    }
    latestChats.unshift(chatToSave)
  }
  UserUtils.setLatestChats(latestChats)
}
