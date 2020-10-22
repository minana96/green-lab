import React, {Component, useContext} from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { withApollo } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { loader } from 'graphql.macro'

// materials components
import Typography from '@material-ui/core/Typography'
import DialogActions from '@material-ui/core/DialogActions'
import Dialog from '@material-ui/core/Dialog'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

// components
import PageLoader from '../../commons/pageloader'

// utils
import * as commonFunctions from '../../utilities/commonFunctions'

// styles
import styles from './styles'

// constants
import { HOST_DECLINE_REASONS } from '../../../constants'

// contexts
import UserContext from '../../../contexts/UserContext'

// graphql
const declineReservation = loader('../../../graphql/host/declinereservations.graphql')

class DeclineButton extends Component {
  state = {
    showDeclineReasonPopup: false,
    showDeclineChatMessagePopup: false,
    showAlert: false,
    loading: false,
    otherDeclineReason: '',
    declineReason: '',
    declineChatMessage: '',
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

  handleDeclineAlert = (show = false) => {
    this.setState({
      showAlert: show
    })
  }

  handleDeclineReasonPopup = (show) => {
    this.setState({
      showDeclineReasonPopup: show,
      showAlert: false,
    })
  }

  handleDeclineChatMessagePopup = (show) => {
    this.setState({
      showDeclineChatMessagePopup: show,
      showDeclineReasonPopup: false,
    })
  }

  onChangeDeclineReason = ({ target: { value: declineReason } }) => {
    this.setState({ declineReason })
  }

  onChangeOtherReason = ({ target: { value: otherDeclineReason } }) => {
    this.setState({ otherDeclineReason })
  }

  onChangeDeclineChatMessage = ({ target: { value: declineChatMessage } }) => {
    this.setState({ declineChatMessage })
  }

  handleOtherReason = (reason) => {
    return reason.toLowerCase().match(/other/) ? this.state.otherDeclineReason : reason
  }

  disableDecline = () => {
    const { declineReason, otherDeclineReason } = this.state
    return (!declineReason || (declineReason.match(/Other/) && otherDeclineReason.trim().length <= 10))
  }

  disableCancelChatButton = () => {
    return this.state.declineChatMessage.trim().length < 10
  }

  declineBooking = () => {
    const { bookingData } = this.props
    this.setState({
      showDeclineChatMessagePopup: false,
      loading: true
    }, async () => {
      try {
        const { data: { declineReservation: data } } = await this.props.client
          .mutate({
            mutation: declineReservation,
            variables: {
              data: {
                booking_id: bookingData.id,
                decline_reason: this.handleOtherReason(this.state.declineReason),
                cancel_chat_message: this.state.declineChatMessage
              },
            },
          })

        this.setState({ loading: false }, () => {
          if (data.status === 'DECLINED_BOOKING_SUCCESSFULL') {
            this.props.handleDeclineSuccess()
          } else {
            this.props.handleErrorMessage(data.message)
          }
        })
      } catch (e) {
        this.handleError(e, this.declineBooking)
      }
    })
  }

  getGuestName = () => {
    const { guest } = this.props
    return guest ? `${guest.firstname} ${guest.lastname ? `${guest.lastname.charAt(0).toUpperCase()}.` : ''}` : ''
  }

  render () {
    const { classes } = this.props

    return (
      <div className={classes.container}>
        <Typography variant='button' className={classes.declineButton} onClick={this.handleDeclineAlert.bind(this, true)}>
          Decline
        </Typography>
        <Dialog
          open={this.state.showAlert}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
          className={classes.deletePopup}
        >
          <DialogContent>
            <Typography variant='h3' className={classes.cancelPopupTitle}>
              {`Are you sure you want to decline ${this.getGuestName()} request?`}
            </Typography>
            <DialogContentText id='alert-dialog-description'>
              Declining too many requests may reduce yours pool's popularity and appearance in search results.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Typography variant='button' onClick={this.handleDeclineReasonPopup.bind(null, true)} autoFocus>
              yes
            </Typography>
            <Typography variant='button' onClick={this.handleDeclineAlert.bind(this, false)}>
              no
            </Typography>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.showDeclineReasonPopup}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogContent className='inner-container'>
            <DialogContentText id='alert-dialog-description'>
              <div className={classes.selectContainer}>
                <Typography variant='h5' className={classes.dropDownTitle}>
                  Let us know the reason for declining in order to help us improve our platform
                </Typography>
                <Select
                  className={classes.selectDeclineReason}
                  value={this.state.declineReason}
                  onChange={this.onChangeDeclineReason}
                  displayEmpty
                >
                  <MenuItem value=''>Select</MenuItem>
                  {
                    HOST_DECLINE_REASONS.map((reason, index) => {
                      return (
                        <MenuItem value={reason} key={`reason-${index}`}>{reason}</MenuItem>
                      )
                    })
                  }
                </Select>
                {this.state.declineReason.match(/Other/) && <div>
                  <TextField
                    type='text'
                    name='email'
                    margin='normal'
                    variant='outlined'
                    onInput={(e) => { e.target.value = e.target.value.slice(0, 140) }}
                    value={this.state.otherDeclineReason}
                    onChange={this.onChangeOtherReason}
                    rowsMax={4}
                    rows={4}
                    fullWidth
                    multiline
                    placeholder='Decline Reason (min 10 characters)'
                  />
                </div>}
              </div>
              <div className={classes.popupButtons}>
                <Button
                  className={classes.mainButton}
                  disabled={this.disableDecline()}
                  onClick={this.handleDeclineChatMessagePopup.bind(this, true)}
                >
                  Decline reservation request
                </Button>
                <Typography
                  variant='button'
                  className={classes.cancelBtn}
                  onClick={this.handleDeclineReasonPopup.bind(this, false)}
                >
                  cancel
                </Typography>
              </div>
            </DialogContentText>
          </DialogContent>
        </Dialog>
        <Dialog
          open={this.state.showDeclineChatMessagePopup}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              <p>Last step! Send the Guest a quick message</p>
              <div className={classes.blueBox}>
                <p>
                  Here you may explain to the guest <br /> why will be declining the request
                </p>
              </div>
            </DialogContentText>
            <TextField
              type='text'
              name='email'
              margin='normal'
              variant='outlined'
              onInput={(e) => { e.target.value = e.target.value.slice(0, 140) }}
              value={this.state.declineChatMessage}
              onChange={this.onChangeDeclineChatMessage}
              rowsMax={4}
              rows={4}
              fullWidth
              multiline
              placeholder='(min 10 characters)'
            />
            <div className={classes.popupButtons}>
              <Button
                className={classes.mainButton}
                disabled={this.disableCancelChatButton()}
                onClick={this.declineBooking}
              >
                Decline reservation request
              </Button>
              <Typography
                variant='button'
                className={classes.cancelBtn}
                onClick={this.handleDeclineChatMessagePopup.bind(this, false)}
              >
                Cancel
              </Typography>
            </div>
          </DialogContent>
        </Dialog>
        {this.state.loading && <PageLoader loading />}
      </div>
    )
  }
}

const enhance = compose(
  withStyles(styles),
  withRouter,
  withApollo,
)

function DeclineButtonContainer (props) {
  const context = useContext(UserContext)
  return <DeclineButton {...context} {...props} />
}


export default enhance(DeclineButtonContainer)

DeclineButton.propTypes = {
  client: PropTypes.shape({
    mutate: PropTypes.func.isRequired,
  }).isRequired,
  bookingData: PropTypes.object,
  guest: PropTypes.object,
  handleErrorMessage: PropTypes.func,
  handleDeclineSuccess: PropTypes.func
}

DeclineButton.defaultProps = {
  client: {},
  bookingData: {},
  guest: {},
  handleErrorMessage: () => {},
  handleDeclineSuccess: () => {},
}
