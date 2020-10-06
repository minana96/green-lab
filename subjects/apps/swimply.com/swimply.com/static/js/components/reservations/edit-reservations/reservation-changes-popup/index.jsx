import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { withApollo } from 'react-apollo'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'

// materials components
import DialogContent from '@material-ui/core/DialogContent'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'

// constants
import { FULL_TIME_ARRAY } from '../../../../constants'

// styles
import styles from './styles'
import HelperService from "../../../../services/helper";

class ReservationChangesPopup extends Component {
  state = {
    serviceCharge: 0,
  }

  goBack = () => {
    this.props.history.goBack()
  }

  cancel = () => {
    this.props.onCancel()
  }

  proceed = () => {
    this.props.onSubmit()
  }

  getExtraGuestFee = (previous = false) => {
    const { reservation, adultCount, childrenCount } = this.props
    const totalHours = this.getTotalHours(previous)
    const selectedGuestsCount = previous ?
      reservation.adult_guests + reservation.children_guests : adultCount + childrenCount
    if (selectedGuestsCount > reservation.pool.price_per_guest_min_capacity) {
      return ((selectedGuestsCount - reservation.pool.price_per_guest_min_capacity) * reservation.pool.price_per_guest) * totalHours
    } else {
      return 0
    }
  }

  getTotalHours = (previous) => {
    const { endTime, startTime, reservation } = this.props
    if (previous) {
      const from = FULL_TIME_ARRAY.find(item => item.time_insert === reservation.from)
      const to = FULL_TIME_ARRAY.find(item => item.time_insert === reservation.to)
      const prevStartTime = from ? from.timeNumber : 0
      const prevEndTime = to ? to.timeNumber + 1 : 0
      return prevEndTime - prevStartTime
    } else {
      return endTime - startTime
    }
  }

  getPrice = (previousPrice = false) => {
    const { reservation, serviceCharge } = this.props

    const totalHours = this.getTotalHours(previousPrice)

    let hoursPrice = reservation && reservation.pool ? reservation.pool.hourly_price * totalHours : 0

    const isPromoCodeApplied = reservation && reservation.promocode_status === 'ok'
    let promoCodeAmount = 0

    if (isPromoCodeApplied) {
      if(reservation.promocode.off_type === 'percent') {
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
      this.getExtraGuestFee(previousPrice) : 0

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

  getButtonText = () => {
    const { reservation, isDefaultInstantBooking } = this.props
    if (!reservation) {
      return 'Proceed'
    } else {
      const { totalPrice: previousTotalPrice } = this.getPrice(true)
      const { totalPrice } = this.getPrice()
      const priceDiff = totalPrice - previousTotalPrice

      const prevBookingIsInstant = HelperService.isInstantBooking({
        adultCount: reservation.adult_guests,
        childrenCount: reservation.children_guests,
        reservation
      })

      // in case if new price more then current or user want change this booking from request to instant
      if (isDefaultInstantBooking && (priceDiff > 0 || !prevBookingIsInstant)) {
        return 'Proceed to pay'
      } else {
        return 'Proceed'
      }
    }
  }

  render () {
    const { classes, reservation } = this.props
    const {
      isPromoCodeApplied,
      promoCodeAmount,
      totalHours,
      hoursPrice,
      extraGuestFee,
      serviceFee,
      totalPrice
    } = this.getPrice()

    return (
      <Dialog className={classes.popup} keepMounted open={this.props.show}>
        <DialogContent className={classes.popupContainer}>
          <Typography variant='body1' component='div'>
            <div className={classes.titleContainer}>
              <h2 className={classes.title}>
                Reservation changes
              </h2>
              <p className={classes.description}>
                You have made changes that require an additional fee
              </p>
            </div>
            <div className={classes.priceContainer}>
              <div className='item'>
                <p>${reservation ? reservation.pool.hourly_price : 0} x {`${totalHours ? totalHours : 0}`}</p>
                <p>${hoursPrice}</p>
              </div>
              {
                isPromoCodeApplied && <div className='item'>
                  <p>Promocode discount</p>
                  <p>-${promoCodeAmount}</p>
                </div>
              }
              <div className='item'>
                <p>Service fee</p>
                <p>${serviceFee}</p>
              </div>
              {
                reservation && reservation.pool.price_per_guest_enabled && <div className='item'>
                  <p>Extra guests fee</p>
                  <p>${extraGuestFee}</p>
                </div>
              }
              <div className='item total'>
                <p>TOTAL</p>
                <p>${totalPrice}</p>
              </div>
            </div>
            <div className={classes.buttonsContainer}>
              <button className='cancel' onClick={this.cancel}>Cancel changes</button>
              <button className='submit' onClick={this.proceed}>{this.getButtonText()}</button>
            </div>
          </Typography>
        </DialogContent>
      </Dialog>
    )
  }
}

ReservationChangesPopup.propTypes = {
  classes: PropTypes.object.isRequired,
  reservation: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  show: PropTypes.bool,
  startTime: PropTypes.number,
  endTime: PropTypes.number,
  serviceCharge: PropTypes.number,
}

ReservationChangesPopup.defaultProps = {
  classes: {},
  reservation: {},
  onCancel: () => {},
  onSubmit: () => {},
  show: false,
  startTime: 0,
  endTime: 0,
  serviceCharge: 0,
}

const enhance = compose(
  withStyles(styles),
  withApollo,
)

export default enhance(ReservationChangesPopup)
