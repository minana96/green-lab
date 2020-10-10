import React, {Component, useContext} from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { withApollo } from 'react-apollo'
import { loader } from 'graphql.macro'
import moment from 'moment'
import _ from 'lodash'

// materials components
import { Typography } from '@material-ui/core/index'

// components
import Loader from '../../commons/pageloader'
import SelectDateAndTime from '../../contact-host/select-date-and-time'
import SelectGuests from '../../contact-host/select-guests'
import BackButton from '../../commons/back-button'
import Button from '../../commons/button'
import ReservationChangesPopup from './reservation-changes-popup'
import ErrorMessage from '../../commons/error-message'

// contexts
import UserContext from '../../../contexts/UserContext'

// services
import HelperService from '../../../services/helper'

// utils
import * as commonFunctions from '../../utilities/commonFunctions'

// constants
import { FULL_TIME_ARRAY } from '../../../constants'

// styles
import styles from './styles'

// graphql
const reservationDetails = loader('./../../../graphql/edit-reservation/editReservationDetails.graphql')
const editBookingPool = loader('./../../../graphql/edit-reservation/editBookingPool.graphql')
const serviceChargeQuery = loader('./../../../graphql/findpool/serviceChargeQuery.graphql')

class EditReservation extends Component {
  state = {
    invalidDates: [],
    firstAvailableDate: null,
    allDatesIsInvalid: false,
    adultCount: 1,
    childrenCount: 0,
    infantCount: 0,
    serviceCharge: 0,
    selectedDate: moment(),
    startTime: null,
    endTime: null,
    reservationData: null,
    isDefaultInstantBooking: false,
    showGuests: false,
    showCalendar: false,
    showTimer: false,
    loading: false,
    errorMessage: '',
    initialFields: {
      adultCount: 1,
      childrenCount: 0,
      infantCount: 0,
      selectedDate: moment(),
      startTime: null,
      endTime: null,
    }
  }

  componentDidMount () {
    this.getReservationData()
    this.getServiceCharge()
  }

  getReservationData = () => {
    this.setState({ loading: true }, async () => {
      try {
        const { data: { reservationDetails: reservation }} = await this.props.client.query({
          query: reservationDetails,
          variables: {
            id: +this.props.match.params.id
          },
          fetchPolicy: 'no-cache',
        })

        this.setState({
          loading: false,
          reservationData: reservation,
          ...this.getReservationFields(reservation)
        })
      } catch (e) {
        this.handleError(e, this.getReservationData)
      }
    })
  }

  getServiceCharge = async () => {
    try {
      const { data: { serviceCharge: data }} = await this.props.client.query({
        query: serviceChargeQuery,
        fetchPolicy: 'network-only'
      })
      let service_fee_index = data.findIndex(x => x.name === 'service_fee')
      this.setState({ serviceCharge: data[service_fee_index].percentage })
    } catch (e) {
      console.log('error', e)
    }
  }

  getReservationFields = (reservation) => {
    let {
      adultCount,
      childrenCount,
      infantCount,
      startTime,
      endTime,
      date
    } = HelperService.getEditedFields(reservation)

    const questsCount = adultCount + childrenCount
    const isDefaultInstantBooking = reservation.pool.default_instant_booking
      && (reservation.pool.instant_group_size >= questsCount)
      && (reservation.pool.max_guests >= questsCount)

    // remove current booking from all bookings to make this time available
    reservation.pool.bookings = _.reject( reservation.pool.bookings, { id: reservation.id } )
    const {
      invalidDates,
      selectedDateIsInvalid,
      firstAvailableDate,
      allDatesIsInvalid
    } = commonFunctions.getInvalidDates(reservation.pool, date)

    if (selectedDateIsInvalid) {
      date = null
      startTime = null
      endTime = null
    }

    return {
      selectedDate: date,
      startTime,
      endTime,
      isDefaultInstantBooking,
      adultCount,
      childrenCount,
      infantCount,
      invalidDates,
      firstAvailableDate,
      allDatesIsInvalid,
      initialFields: {
        selectedDate: date,
        startTime,
        endTime,
        adultCount,
        childrenCount,
        infantCount,
      }
    }
  }

  updateInstant = () => {
    const { adultCount, childrenCount, reservationData: reservation } = this.state
    this.setState({
      isDefaultInstantBooking: HelperService.isInstantBooking({
        reservation,
        adultCount,
        childrenCount
      })
    })
  }

  handleGuestsPopup = () => {
    this.setState({
      showGuests: !this.state.showGuests,
      showCalendar: false,
      showTimer: false,
    })
  }

  handleCalendarPopup = () => {
    this.setState({
      showGuests: false,
      showCalendar: !this.state.showCalendar,
      showTimer: false,
    })
  }

  handleTimerPopup = () => {
    this.setState({
      showGuests: false,
      showCalendar: false,
      showTimer: !this.state.showTimer,
    })
  }

  handleApplyDate = (date) => {
    date = moment(date).isBefore(moment(this.state.firstAvailableDate), 'day') ? this.state.firstAvailableDate : date
    date = !this.state.allDatesIsInvalid ? date : null
    this.setState({
      selectedDate: moment(date),
      showCalendar: false,
    })
  }

  handleApplyTime = ({ startTime, endTime }) => {
    this.setState({
      startTime,
      endTime,
      showTimer: false,
    })
  }

  handleApplyGuests = (data) => {
    this.setState(data, this.updateInstant)
  }

  handleDisable = () => {
    return !(this.state.adultCount + this.state.childrenCount) || !this.state.startTime || !this.state.endTime
  }

  handleReservationChangesPopup = (show = false) => {
    this.setState({ showReservationChangesPopup: show })
  }

  getAddress = () => {
    const { reservationData: { pool } } = this.state
    return `${pool.city ? `${pool.city}, ` : ''}${pool.state ? `${pool.state}, ` : ''}${pool.zip_code !== '00000' ? `${pool.zip_code}, ` : ''}`
  }

  handleError = (e, callback = () => {}, showError = false) => {
    const errorMessage = commonFunctions.parseGraphQLErrorMessage(e)
    this.setState({
      loading: false,
      showReservationChangesPopup: false,
      errorMessage: showError ? 'Something went wrong.' : ''
    }, async () => {
      console.log('error', e)
      if (errorMessage === 'Unauthenticated.') {
        const status = await this.props.refreshToken(this.props.history)
        if (status === 'ok') {
          callback()
        }
      }
    })
  }

  clearErrorMessage = () => {
    this.setState({ errorMessage: '' })
  }

  getEditedData = () => {
    const {
      adultCount,
      childrenCount,
      infantCount,
      selectedDate,
      startTime,
      endTime,
      initialFields,
    } = this.state

    const editedData = {}

    if (startTime !== initialFields.startTime || endTime !== initialFields.endTime) {
      editedData.from = FULL_TIME_ARRAY.find(item => item.timeNumber === startTime).displayFormattedTime
      editedData.to = FULL_TIME_ARRAY.find(item => item.timeNumber === endTime).displayFormattedTime
    }

    if (adultCount !== initialFields.adultCount) {
      editedData.adult_guests = adultCount
    }

    if (childrenCount !== initialFields.childrenCount) {
      editedData.children_guests = childrenCount
    }

    if (infantCount !== initialFields.infantCount) {
      editedData.infant_guests = infantCount
    }

    if (!moment(selectedDate).isSame(initialFields.selectedDate, 'day')) {
      editedData.date = moment(selectedDate).format('YYYY-MM-DD')
    }

    return editedData
  }

  success = () => {
    this.setState({
      loading: false,
      showReservationChangesPopup: false,
    }, () => {
      this.props.history.goBack()
    })
  }

  proceed = () => {
    this.setState({ loading: true }, async () => {
      try {
        const data = this.getEditedData()

        if (!Object.keys(data).length) { // check if the data is not changed
          this.success()
          return
        }

        data.booking_id = +this.props.match.params.id

        const { data: { editBookingPool: result } } = await this.props.client
          .mutate({
            mutation: editBookingPool,
            variables: {
              data,
            }
          })

        if (result.status.match(/EDIT_BOOKING_SUCCESSFUL|EDIT_BOOKING_READY_APPROVE/)) {
          this.success()
        } else {
          this.setState({
            loading: false,
            showReservationChangesPopup: false,
            errorMessage: result.message
          })
        }
      } catch (e) {
        this.handleError(e, this.proceed, true)
      }
    })
  }

  getEditedPrice = (editedFields) => {
    let { reservationData: reservation, serviceCharge } = this.state
    reservation = { ...reservation }
    reservation.edited_fields = editedFields
    let { adultCount, childrenCount, startTime, endTime } = HelperService.getEditedFields(reservation)
    if (reservation.edited_fields.to) {
      endTime -= 1
    }

    const { totalPrice } = HelperService.getPrice({
      reservation,
      serviceCharge,
      startTime,
      endTime,
      adultCount,
      childrenCount
    })

    return totalPrice
  }

  handleAction = () => {
    const { reservationData: reservation, isDefaultInstantBooking } = this.state
    const data = this.getEditedData()
    const editedPrice = this.getEditedPrice(data)
    const prevIsInstant = HelperService.isInstantBooking({
      reservation, adultCount: reservation.adult_guests, childrenCount: reservation.children_guests
    })
    const showPopup = editedPrice > reservation.reservation_price_total // in case if new price more then current
      || (!prevIsInstant && isDefaultInstantBooking) // in case if user want change this booking from request to instant

    if (!Object.keys(data).length) { // check if the data is not changed
      this.success()
    } else if (showPopup) {
      this.handleReservationChangesPopup(true)
    } else {
      this.proceed()
    }
  }

  render () {
    const { classes } = this.props
    const { reservationData } = this.state

    return (
      <Typography variant='body1' component='div'>
        <div className={`${classes.container} ${this.state.showGuests ? 'extra-bottom-padding' : ''}`}>
          <div className={classes.innerContainer}>
            <div className={classes.poolInfoContainer}>
              <BackButton/>
              <h2 className='title'>{reservationData ? reservationData.pool.title : ''}</h2>
              <p className='address gray'>{reservationData ? this.getAddress(reservationData.pool) : ''}</p>
              <div className='price-container'>
                <p className='hourly-price'>
                  <span className='blue'>${reservationData ? reservationData.pool.hourly_price : '0'}</span> per hour
                </p>
                {
                  reservationData && reservationData.pool.price_per_guest_enabled && <p className='text'>
                    <span className='blue'>${reservationData ? reservationData.pool.price_per_guest : '0'}</span>
                    {' for guest per hour '}
                    <span className='gray'>(after {reservationData.pool.price_per_guest_min_capacity || '10'} people)</span>
                  </p>
                }
              </div>
            </div>
          </div>
          <div className={classes.innerContainer}>
            <div className={classes.formContainer}>
              <h3 className={classes.sectionTitle}>What would you like to change?</h3>
              <div>
                <SelectDateAndTime
                  poolDetails={reservationData && reservationData.pool}
                  date={this.state.selectedDate}
                  startTime={this.state.startTime}
                  endTime={this.state.endTime}
                  handleApplyDate={this.handleApplyDate}
                  handleApplyTime={this.handleApplyTime}
                  handleCalendarPopup={this.handleCalendarPopup}
                  handleTimerPopup={this.handleTimerPopup}
                  showCalendar={this.state.showCalendar}
                  showTimer={this.state.showTimer}
                  isDefaultInstantBooking={this.state.isDefaultInstantBooking}
                  invalidDates={this.state.invalidDates}
                />
              </div>
              <div>
                <SelectGuests
                  poolDetails={reservationData && reservationData.pool}
                  adultCount={this.state.adultCount}
                  childrenCount={this.state.childrenCount}
                  infantCount={this.state.infantCount}
                  handleApply={this.handleApplyGuests}
                  handleGuestsPopup={this.handleGuestsPopup}
                  showGuests={this.state.showGuests}
                />
              </div>
              <div className={classes.errorMessageContainer}>
                <ErrorMessage message={this.state.errorMessage} hide={this.clearErrorMessage} />
              </div>
              <div className={classes.buttonContainer}>
                <Button
                  disabled={this.handleDisable()}
                  onClick={this.handleAction}
                >
                  Request a change
                </Button>
              </div>
            </div>
          </div>
        </div>
        <ReservationChangesPopup
          show={this.state.showReservationChangesPopup}
          reservation={this.state.reservationData}
          startTime={this.state.startTime}
          endTime={this.state.endTime}
          adultCount={this.state.adultCount}
          childrenCount={this.state.childrenCount}
          onCancel={this.handleReservationChangesPopup.bind(this, false)}
          onSubmit={this.proceed}
          isDefaultInstantBooking={this.state.isDefaultInstantBooking}
          serviceCharge={this.state.serviceCharge}
        />
        {this.state.loading && <Loader />}
      </Typography>
    )
  }
}

EditReservation.propTypes = {
  classes: PropTypes.object.isRequired,
}

EditReservation.defaultProps = {
  classes: {},
}

const enhance = compose(
  withStyles(styles),
  withRouter,
  withApollo
)

function EditReservationContainer (props) {
  const context = useContext(UserContext)
  return <EditReservation {...context} {...props} />
}

export default enhance(EditReservationContainer)