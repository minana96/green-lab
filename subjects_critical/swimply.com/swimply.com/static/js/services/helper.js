// utils
import _ from 'lodash';
import moment from 'moment';
import UserUtils from '../components/utilities/UserUtils';

// config
import { IS_US } from '../config';
import { FULL_TIME_ARRAY, US_REGION_REGEXP } from '../constants';

export default class HelperService {
  static handleHostPlaceholder() {
    const isHost = UserUtils.getUserRole() === 'Host';
    const userCountry = UserUtils.getUserCountry();
    const userCountryIsUs = US_REGION_REGEXP.test( userCountry );
    return ( IS_US !== userCountryIsUs ) && userCountry && isHost;
  }

  static parseAddressComponents( addressComponents ) {
    const addressDetails = {};

    addressComponents.forEach( ( addressComponent ) => {
      addressComponent.types.forEach( ( type ) => {
        if ( type === 'country' ) {
          addressDetails.countryFullDetail = addressComponent;
        } else if ( type === 'administrative_area_level_1' ) {
          addressDetails.stateFullDetail = addressComponent;
        } else if ( type === 'locality' || type === 'sublocality' ) {
          addressDetails.cityFullDetail = addressComponent;
        } else {
          addressDetails[type] = addressComponent.long_name;
        }
      } );
    } );

    if ( !addressDetails.postal_code || addressDetails.postal_code === 'long_name' ) {
      addressDetails.postal_code = '00000';
    }

    return addressDetails;
  }

  static copyToClipboard( str ) {
    const el = document.createElement( 'textarea' );
    el.value = str;
    el.setAttribute( 'readonly', '' );
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild( el );
    el.select();
    document.execCommand( 'copy' );
    document.body.removeChild( el );
  }

  static showTooltip( top, left, text ) {
    const tooltip = document.getElementById( 'tooltip' );
    if ( tooltip ) {
      tooltip.textContent = text;
      tooltip.style.top = `${top}px`;
      tooltip.style.left = `${left}px`;
      tooltip.classList.add( 'show' );
      tooltip.addEventListener( 'click', () => {
        tooltip.classList.remove( 'show' );
      } );
      setTimeout( () => {
        tooltip.classList.remove( 'show' );
      }, 1000 );
    }
  }

  static createReferralLink( code ) {
    return `${window.location.origin}/referral${code ? `?code=${code}` : ''}`;
  }

  static isFullVerified( userVerifications, isHost ) {
    return !!( userVerifications
      && userVerifications[0]
      && userVerifications[0].successful_booking
      && userVerifications[0].passport_drive_url
      && ( !isHost || userVerifications[0].pool_proof_url ) );
  }

  static isVerified( userVerifications, isHost, checkOnApproved = false ) {
    if ( userVerifications && userVerifications[0] ) {
      return !!( userVerifications[0].successful_booking
        || ( userVerifications[0].passport_drive_url
          && ( !checkOnApproved || userVerifications[0].img_id_approved ) )
        || (
          isHost && userVerifications[0].pool_proof_url
          && ( !checkOnApproved || userVerifications[0].img_proof_approved )
        ) );
    }
    return false;
  }

  static getVerifiedPluses( userVerifications, isHost, checkOnApproved = false ) {
    if ( userVerifications && userVerifications[0] ) {
      let count = 0;
      if (
        userVerifications[0].passport_drive_url
        && ( !checkOnApproved || userVerifications[0].img_id_approved )
      ) {
        count += 1;
      }
      if (
        userVerifications[0].pool_proof_url
        && isHost
        && ( !checkOnApproved || userVerifications[0].img_proof_approved )
      ) {
        count += 1;
      }
      if ( userVerifications[0].successful_booking ) {
        count += 1;
      }
      if ( count === 3 ) {
        return '++';
      } if ( count === 2 ) {
        return '+';
      }
      return '';
    }
    return '';
  }

  static getVerifiedInPercentage( userVerifications, isHost ) {
    if ( userVerifications && userVerifications[0] ) {
      let count = 0;
      if ( userVerifications[0].passport_drive_url ) {
        count += 1;
      }
      if ( userVerifications[0].pool_proof_url && isHost ) {
        count += 1;
      }
      if ( userVerifications[0].successful_booking ) {
        count += 1;
      }
      if ( count === 3 ) {
        return { percentage: '100', completedSteps: count };
      } if ( count === 2 ) {
        return { percentage: '66', completedSteps: count };
      } if ( count === 1 ) {
        return { percentage: '33', completedSteps: count };
      }
      return { percentage: '0', completedSteps: 0 };
    }
    return { percentage: '0', completedSteps: 0 };
  }

  static filterBookings( bookings, date ) {
    bookings = date  ? _.filter( bookings, { date } ) : bookings;
    bookings = _.reject( bookings, { status: 8 } ); // chat booking flow (pre approved booking)
    bookings = _.reject( bookings, { status: 7 } ); // chat booking flow (empty booking)
    bookings = _.reject( bookings, { status: 5 } );
    bookings = _.reject( bookings, { status: 4 } );
    bookings = _.reject( bookings, { status: 2 } );
    bookings = _.reject( bookings, { status: 1 } );
    bookings = _.reject( bookings, { status: 0 } );
    return bookings;
  }

  static getBookingsTimes( bookings ) {
    let bookingTimes = [];
    if ( bookings.length >= 1 ) {
      for ( let b = 0; b < bookings.length; b++ ) {
        const start = parseInt( bookings[b].from.split( ':' )[0] );
        const end = parseInt( bookings[b].to.split( ':' )[0] );
        for ( let t = start; t <= end + 1; t++ ) {
          bookingTimes.push( t );
        }
      }
      bookingTimes = _.uniq( bookingTimes );
    }
    return bookingTimes;
  }

  static getAvailableMonths( months ) {
    return months.filter( item => item.is_available )
      .map( item => moment( item.month_number, 'MM' ).format( 'MM' ) );
  }

  static getAvailableStartEndTime ({ poolUnAvailabilities, bookingTimes, startTime, endTime, date }) {
    // check if startTime and endTime exist
    if (!startTime || !endTime) {
      return {
        startTime,
        endTime,
      }
    }

    // get all available time slots
    let availableTimes = []
    for (let i = +startTime; i <= +endTime; i++) {
      const searchTime = i > 9 ? `${i}:00:00` : `0${i}:00:00`

      const unAvailableIndex = poolUnAvailabilities.findIndex(x => x.date === date && x.time === searchTime)
      const bookingIndex = bookingTimes.indexOf(i)

      if (unAvailableIndex === -1 && bookingIndex === -1) {
        const currAvailableTime = i
        const prevAvailableTime = availableTimes[availableTimes.length - 1]
        if (!prevAvailableTime || (currAvailableTime - prevAvailableTime) === 1) {
          availableTimes.push(i)
        } else if (availableTimes.length <= 1) {
          availableTimes = [currAvailableTime]
        } else {
          break
        }
      }
    }

    if (availableTimes.length > 1) {
      return {
        startTime: availableTimes[0],
        endTime: availableTimes[availableTimes.length - 1],
      }
    } else {
      return {
        startTime: null,
        endTime: null,
      }
    }
  }

  static handlePoolUnAvailabilities({ poolUnAvailabilities, startTime, endTime, date, bookingTimes }) {
    let previousSlotIsAvailable = false
    let previousAvailableSlot = null

    for (let i = parseInt(startTime); i <= parseInt(endTime); i++) {
      const searchTime = i > 9 ? `${i}:00:00` : `0${i}:00:00`

      const unAvailableIndex = poolUnAvailabilities.findIndex(x => x.date === date && x.time === searchTime)
      const bookingIndex = bookingTimes.indexOf(i)

      // check if at least 2 available slots in a row
      if (previousSlotIsAvailable && previousAvailableSlot && unAvailableIndex === -1 && bookingIndex === -1) {
        return true
      }

      previousSlotIsAvailable = unAvailableIndex === -1 && bookingIndex === -1
      previousAvailableSlot = unAvailableIndex === -1 && bookingIndex === -1 ? i : null
    }

    return false
  }

  static isHost(user) {
    return user && user.roles
      && user.roles[0] && user.roles[0].name
      && user.roles[0].name.toLocaleLowerCase() === 'host'
  }

  static isUsRegion(region) {
    return US_REGION_REGEXP.test(region)
  }

  static formatTime(time) {
    let formattedTime = parseInt(time)
    if (formattedTime) {
      if (formattedTime > 12) {
        formattedTime = (formattedTime - 12) + ":00 PM"
      } else if (formattedTime === 12) {
        formattedTime = (formattedTime) + ":00 PM"
      } else if (formattedTime === 0) {
        formattedTime = "12:00 AM"
      } else {
        formattedTime = formattedTime + ":00 AM"
      }
    } else {
      formattedTime = null
    }
    return formattedTime
  }
  
  static disableSingleAvailableTimeSlots(slots) {
    return slots.map((item, index) => {
      if (
        !item.disable
        && (!slots[index - 1] || slots[index - 1].disable)
        && (!slots[index + 1] || slots[index + 1].disable)
      ) {
        item.disable = true
      }
      return item
    })
  }

  static getEditedFields = (reservation) => {
    const adultCount = reservation.edited_fields && this.isNumber(reservation.edited_fields.adult_guests) ?
      reservation.edited_fields.adult_guests : reservation.adult_guests
    const childrenCount = reservation.edited_fields && this.isNumber(reservation.edited_fields.children_guests) ?
      reservation.edited_fields.children_guests : reservation.children_guests
    const infantCount = reservation.edited_fields && this.isNumber(reservation.edited_fields.infant_guests) ?
      reservation.edited_fields.infant_guests : reservation.infant_guests
    const reservationFrom = reservation.edited_fields && reservation.edited_fields.from ?
      reservation.edited_fields.from : reservation.from
    const reservationTo = reservation.edited_fields && reservation.edited_fields.to ?
      reservation.edited_fields.to : reservation.to
    const reservationDate = reservation.edited_fields && reservation.edited_fields.date ?
      reservation.edited_fields.date : reservation.date

    const startTime = FULL_TIME_ARRAY.find(item => (
      item.time_insert === reservationFrom
      || item.displayFormattedTime === reservationFrom
    )).timeNumber
    const endTime = FULL_TIME_ARRAY.find(item => (
      item.time_insert === reservationTo
      || item.displayFormattedTime === reservationTo
    )).timeNumber + 1

    const today = moment()
    let date = moment(reservationDate)
    date = date.isBefore(today, 'day') ? today : date

    return {
      adultCount,
      childrenCount,
      infantCount,
      startTime,
      endTime,
      date,
    }
  }

  static getExtraGuestFee ({ reservation, adultCount, childrenCount, startTime, endTime }) {
    const totalHours = endTime - startTime
    const selectedGuestsCount = adultCount + childrenCount
    if (selectedGuestsCount > reservation.pool.price_per_guest_min_capacity) {
      return ((selectedGuestsCount - reservation.pool.price_per_guest_min_capacity) * reservation.pool.price_per_guest) * totalHours
    } else {
      return 0
    }
  }

  static getPrice ({ reservation, serviceCharge, startTime, endTime, adultCount, childrenCount }) {
    const totalHours = endTime - startTime

    let hoursPrice = reservation && reservation.pool ? reservation.pool.hourly_price * totalHours : 0

    const isPromoCodeApplied = reservation && reservation.promocode_status === 'ok'
    let promoCodeAmount = 0

    if (isPromoCodeApplied) {
      if (reservation.promocode.off_type === 'percent') {
        promoCodeAmount = (hoursPrice / 100) * reservation.promocode.percent_off
      } else {
        promoCodeAmount = reservation.promocode.percent_off
      }

      if (promoCodeAmount >=  hoursPrice) {
        promoCodeAmount = hoursPrice
        hoursPrice = 0
      } else {
        hoursPrice = hoursPrice - promoCodeAmount
      }
    }

    const extraGuestFee = reservation && reservation.pool && reservation.pool.price_per_guest_enabled ?
      this.getExtraGuestFee({ reservation, adultCount, childrenCount, startTime, endTime }) : 0

    const serviceFee = ((hoursPrice / 100) * serviceCharge) + ((extraGuestFee / 100) * serviceCharge)
    const totalPrice = hoursPrice + serviceFee + extraGuestFee

    return {
      isPromoCodeApplied,
      promoCodeAmount,
      totalHours,
      hoursPrice,
      extraGuestFee,
      serviceFee,
      totalPrice
    }
  }

  static isEditedBooking (reservation) {
    return reservation.edited_fields
      && reservation.status !== 6 // check if it is not a completed booking
      && reservation.status !== 5 // check if it is not a cancelled booking
      && reservation.status !== 2 // check if it is not a declined booking
  }

  static isAvailableToUpdate (reservation) {
    const cancellationPolicyDate = this.getCancellationPolicyDate(reservation)
    // Not count cancellation policy if booking status is pending
    const cancellationPolicyAvailable = reservation.status === 0 || moment().isBefore(cancellationPolicyDate, 'hour')
    return reservation.status !== 6 // check if it is not a completed booking
      && reservation.status !== 5 // check if it is not a cancelled booking
      && reservation.status !== 2 // check if it is not a declined booking
      && cancellationPolicyAvailable
  }

  static isNotIntoCancellationPolicy (reservation) {
    const cancellationPolicyDate = this.getCancellationPolicyDate(reservation)
    return moment().isBefore(cancellationPolicyDate)
  }

  static getCancellationPolicyDate (reservation) {
    let timeObject = FULL_TIME_ARRAY.find(item => item.time_insert === reservation.from)
    const startTime = timeObject ? timeObject.timeNumber : parseInt(reservation.from.split(':')[0])
    return reservation.pool && reservation.pool.cancellation_policy ?
      moment(reservation.date).hour(startTime).minute(0).second(0).subtract(reservation.pool.cancellation_policy.hours, 'hour') : moment()
  }

  static isInstantBooking ({ reservation, adultCount, childrenCount }) {
    const questsCount = adultCount + childrenCount
    return reservation && reservation.pool.default_instant_booking
      && (reservation.pool.instant_group_size >= questsCount)
      && (reservation.pool.max_guests >= questsCount)
  }

  static isNumber (value) {
    return !isNaN(parseInt(value))
  }
}
