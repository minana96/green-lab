import React, {Component, useContext} from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { withApollo } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { loader } from 'graphql.macro'
import moment from 'moment'
import update from 'immutability-helper'

// materials components
import Typography from '@material-ui/core/Typography'

// components
import PageLoader from '../../commons/pageloader'
import DeclineButton from '../decline-button'

// utils
import * as commonFunctions from '../../utilities/commonFunctions'

// styles
import styles from './styles'

// contexts
import UserContext from '../../../contexts/UserContext'

// constants
import { timeArray } from '../../../config'

// graphql
const approveReservation = loader('../../../graphql/host/approvereservations.graphql')
const preApproveReservation = loader('../../../graphql/host/pre-approve-reservation.graphql')
const bookPoolMutation = loader('../../../graphql/findpool/bookPoolMutation.graphql')

class BookingChatButton extends Component {
  state = {
    loading: false,
    disableBookingBtn: false,
  }

  getBookingButtonText = (isHost) => {
    const { chatDetails, isDefaultInstantBooking } = this.props
    if (!isHost) {
      const { booking_status: status } = chatDetails.last_booking
      if ((isDefaultInstantBooking && status === 7) || status === 8) {
        return 'Book now'
      } else if (status === 7) {
        return 'Request to book'
      } else if (status === 0) {
        return 'Request sent!'
      }
    } else {
      return 'Pre approve for guest'
    }
  }

  handleBookingEvent = async (isHost) => {
    if (!isHost) {
      const { isDefaultInstantBooking, chatDetails: data } = this.props
      if (data.last_booking && (data.last_booking.booking_status === 7) && !isDefaultInstantBooking) {
        // just confirm from swimmer side
        const toIndex = timeArray.findIndex((item) => item.time_insert === data.last_booking.to)
        const to = timeArray[toIndex + 1].time_insert // Need plus one because from server we get to time on one hour less
        let dataSent = {
          pool_id: data.last_booking.pool.id,
          date: moment(data.last_booking.date).format('YYYY-MM-DD'),
          from: data.last_booking.from,
          to: to,
          adult_guests: parseInt(data.last_booking.adult_guests, 10),
          children_guests: parseInt(data.last_booking.children_guests, 10),
          infant_guests: parseInt(data.last_booking.infant_guests, 10),
          booking_id: data.last_booking.id
        }
        try {
          this.setState({ loading: true })
          let results = await this.props.client
            .mutate({
              mutation: bookPoolMutation,
              variables: {
                data: dataSent,
              }
            })
          this.setState({ loading: false }, () => {
            if (results.data.bookPool.status === 'BOOKING_SUCCESSFULL') {
              this.props.clearChatDetails(
                update(this.props.chatDetails, {
                  last_booking: {
                    booking_status: {$set: 0}
                  },
                })
              )
            } else {
              this.props.handleErrorMessage(results.data.bookPool.message)
            }
          })
        } catch (err) {
          this.handleError(err, this.handleBookingEvent.bind(this, isHost))
        }
      } else {
        // all other usual cases
        this.props.history.push({
          pathname: `/payment/${this.props.chatDetails.last_booking.pool.id}`,
          state: {
            bookingData: JSON.stringify(this.props.chatDetails.last_booking),
            from: '/conversations'
          }
        })
      }
    } else {
      this.preApproveBooking()
    }
  }

  handleError = (error, callback = () => {}) => {
    console.log('error', error)
    this.setState({ loading: false }, async () => {
      let errorMsg = commonFunctions.parseGraphQLErrorMessage(error)
      if (errorMsg === 'Unauthenticated.') {
        const status = await this.props.refreshToken(this.props.history)
        if (status === 'ok') {
          callback()
        }
      } else {
        this.props.handleErrorMessage('Something went wrong.')
      }
    })
  }

  handleDeclineSuccess = () => {
    this.props.clearChatDetails(
      update(this.props.chatDetails, {
        last_booking: {
          booking_status: { $set: 2 }
        },
      })
    )
  }

  preApproveBooking = () => {
    this.setState({ loading: true }, async () => {
      try {
        const { data: { preApproveReservation: data } } = await this.props.client
          .mutate({
            mutation: preApproveReservation,
            variables: {
              data: {
                booking_id: this.props.chatDetails.last_booking.id
              },
            },
          })

        this.setState({ loading: false }, () => {
          if (data.status === 'PRE_APPROVE_BOOKING_SUCCESSFULL') {
            this.props.clearChatDetails(
              update(this.props.chatDetails, {
                last_booking: {
                  booking_status: { $set: 8 }
                },
              })
            )
          } else {
            this.props.handleErrorMessage(data.message)
          }
        })
      } catch (e) {
        this.handleError(e, this.preApproveBooking)
      }
    })
  }

  approveBooking = () => {
    this.setState({ loading: true }, async () => {
      try {
        const { data: { approveReservation: data } } = await this.props.client
          .mutate({
            mutation: approveReservation,
            variables: {
              data: {
                booking_id: this.props.chatDetails.last_booking.id
              },
            },
          })

        this.setState({ loading: false }, () => {
          if (data.status === 'APPROVE_BOOKING_SUCCESSFULL') {
            this.props.clearChatDetails(
              update(this.props.chatDetails, {
                last_booking: {
                  booking_status: { $set: 1 }
                },
              })
            )
          } else {
            this.props.handleErrorMessage(data.message)
          }
        })
      } catch (e) {
        this.handleError(e, this.approveBooking)
      }
    })
  }

  renderBookingButton = () => {
    const { chatDetails, classes, user, isDefaultInstantBooking } = this.props
    if (chatDetails && chatDetails.last_booking && user) {
      const isHost = user.roles[0].name === 'Host' && +chatDetails.last_booking.swimmer_id !== +user.id
      const status = chatDetails.last_booking.booking_status
      if (isHost && status === 0) {
        return (
          <div className={classes.bookingButtonContainer}>
            <Typography variant='button' onClick={this.approveBooking}>
              Approve
            </Typography>
            <DeclineButton
              handleErrorMessage={this.props.handleErrorMessage}
              handleDeclineSuccess={this.handleDeclineSuccess}
              bookingData={chatDetails.last_booking}
              guest={chatDetails.conversation_with}
            />
          </div>
        )
      } else if (
        (status === 8 && !isHost)
        || (isHost && status === 0)
        || (status === 7 && !isDefaultInstantBooking)
        || (status === 7 && !isHost && isDefaultInstantBooking)
      ) {
        return (
          <div className={classes.bookingButtonContainer}>
            <Typography className={this.state.disableBookingBtn ? classes.disabledFullWidth : classes.fullWidth} variant='button' onClick={() => {
              this.setState({
                disableBookingBtn: true
              }, () => { this.handleBookingEvent(isHost) })
            }}>
              {this.getBookingButtonText(isHost)}
            </Typography>
          </div>
        )
      } else if (!isHost && status === 0) {
        return (
          <div className={classes.bookingButtonContainer}>
            <Typography className={classes.disabledFullWidth} variant='button'>
              {this.getBookingButtonText(isHost)}
            </Typography>
          </div>
        )
      }
    }
  }

  render () {
    const { classes } = this.props

    return (
      <div className={classes.container}>
        {this.renderBookingButton()}
        {this.state.loading && <PageLoader />}
      </div>
    )
  }
}

const enhance = compose(
  withStyles(styles),
  withRouter,
  withApollo,
)

function BookingChatButtonContainer (props) {
  const context = useContext(UserContext)
  return <BookingChatButton {...context} {...props} />
}

export default enhance(BookingChatButtonContainer)

BookingChatButton.propTypes = {
  client: PropTypes.shape({
    mutate: PropTypes.func.isRequired,
  }).isRequired,
  clearChatDetails: PropTypes.func,
  handleErrorMessage: PropTypes.func,
}

BookingChatButton.defaultProps = {
  client: {},
  clearChatDetails: () => {},
  handleErrorMessage: () => {},
}
