import React, {Component, useContext} from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { withApollo } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { loader } from 'graphql.macro'
import moment from 'moment'

// materials components
import { TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

// components
import PageLoader from '../commons/pageloader'
import SelectDateAndTime from './select-date-and-time'
import SelectGuests from './select-guests'
import UserAvatar from '../commons/avatar'

// contexts
import UserContext from '../../contexts/UserContext'
import RegionContext from '../../contexts/RegionContext'

// services
import HelperService from '../../services/helper'

// utils
import UserUtils from '../utilities/UserUtils'
import * as commonFunctions from '../utilities/commonFunctions'

// styles
import styles from './styles'

// constants
import { timeArray } from '../../config'

// graphql
const sendMessageMutation = loader('../../graphql/messages/sendMessageMutation.graphql')
const poolDetailsQuery = loader('../../graphql/findpool/pooldetailsQuery.graphql')

class ContactHost extends Component {
  state = {
    showGuests: false,
    showCalendar: false,
    showTimer: false,
    loading: false,
    poolDetails: null,
    adultCount: 1,
    childrenCount: 0,
    infantCount: 0,
    selectedDate: moment(),
    startTime: null,
    endTime: null,
    user: null,
    message: '',
    invalidDates: [],
    allDatesIsInvalid: false,
    firstAvailableDate: null,
  }

  UNSAFE_componentWillMount () {
    this.handleParams()
  }

  componentDidMount () {
    this.handleChatRules()
  }

  componentDidUpdate (prevProps) {
    if (!this.state.user && (this.props.user !== prevProps.user)) {
      this.handleChatRules()
    }
  }

  handleChatRules = () => {
    if (this.props.user && !this.props.user.accept_chat_rules) {
      this.setState({
        user: this.props.user
      }, () => {
        this.props.history.replace({
          pathname: '/chat-rules',
          state: {
            replaceTo: this.props.location.pathname
          }
        })
      })
    }
  }

  handleParams = () => {
    this.setState({ loading: true }, async () => {
      try {
        const adultCount = await UserUtils.getAdultCount() || 1
        const childrenCount = await UserUtils.getChildCount() || 0
        const infantCount = await UserUtils.getInfantCount() || 0
        let selectedDate = await UserUtils.getAvailableDate() || moment()
        let startTime = await UserUtils.getStartTime()
        let endTime = await UserUtils.getEndTime()

        const poolDetails = await this.getPoolDetails()

        const questsCount = adultCount + childrenCount
        const isDefaultInstantBooking = poolDetails.default_instant_booking
          && (poolDetails.instant_group_size >= questsCount)
          && (poolDetails.max_guests >= questsCount)

        if (typeof startTime === 'string') {
          startTime = timeArray.find(item => item.displayFormattedTime === startTime)
          startTime = startTime ? startTime.timeNumber : null
          endTime = timeArray.find(item => item.displayFormattedTime === endTime)
          endTime = endTime ? endTime.timeNumber : null
        }

        const { invalidDates, selectedDateIsInvalid, firstAvailableDate } = commonFunctions.getInvalidDates(poolDetails, selectedDate)

        if (selectedDateIsInvalid) {
          selectedDate = null
          startTime = null
          endTime = null
        }

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

        this.setState({
          selectedDate,
          startTime,
          endTime,
          adultCount,
          childrenCount,
          infantCount,
          isDefaultInstantBooking,
          poolDetails,
          invalidDates,
          allDatesIsInvalid: selectedDateIsInvalid && !firstAvailableDate,
          firstAvailableDate,
          loading: false
        })
      } catch (e) {
        console.log('error', e)
        this.setState({ loading: false })
      }
    })
  }

  getPoolDetails = async () => {
    const { poolDetails } = this.props.location.state || {}
    const { poolId } = this.props.match.params || {}
    if (!poolDetails) {
      const { data: { pool } } = await this.props.client.query({
        query: poolDetailsQuery,
        variables: { 'id': poolId },
        fetchPolicy: 'network-only'
      })

      return pool
    } else {
      return poolDetails
    }
  }

  goBack = () => {
    this.props.history.goBack()
  }

  getHostName = () => {
    const { poolDetails } = this.state
    return poolDetails ?
      `Hosted by ${poolDetails.createdBy.firstname}` : ''
  }

  getPoolName = () => {
    const { poolDetails } = this.state
    return poolDetails ? poolDetails.title : ''
  }

  getHostHourPrice = () => {
    return this.state.poolDetails ? `$${this.state.poolDetails.hourly_price}` : '$0'
  }

  getAdditinalFees = () => {
    return this.state.poolDetails
      ? `$${this.state.poolDetails.price_per_guest} per guest per hour after ${this.state.poolDetails.price_per_guest_min_capacity} guests`
      : 'additional: $0 per guest per hour'
  }

  getHostImage = () => {
    const { poolDetails } = this.state
    return poolDetails && poolDetails.createdBy && poolDetails.createdBy.img_url ?
      this.state.poolDetails.createdBy.img_url
      : window.location.origin + '/img/profile-icon.png'
  }

  updateInstant = () => {
    const { adultCount, childrenCount, poolDetails } = this.state
    const questsCount = adultCount + childrenCount
    const isDefaultInstantBooking = poolDetails && poolDetails.default_instant_booking
      && (poolDetails.instant_group_size >= questsCount)
      && (poolDetails.max_guests >= questsCount)
    this.setState({ isDefaultInstantBooking })
  }

  onChangeMessage = ({ target: { value: message } }) => {
    this.setState({
      message
    })
  }

  submit = async () => {
    if (!this.props.user) {
      window.headerComponent.handleLoginModelOpen();
    } else {
      this.setState({ loading: true }, async () => {
        try {
          const data = {
            reciever_id: this.state.poolDetails.createdBy.id,
            message: this.state.message,
            booking_chat: {
              pool_id: this.state.poolDetails.id,
              user_id: this.props.user.id,
              date: moment(this.state.selectedDate).format('YYYY-MM-DD'),
              from: `${this.state.startTime}`,
              to: `${this.state.endTime}`,
              adult_guests: this.state.adultCount,
              children_guests: this.state.childrenCount,
              infant_guests: this.state.infantCount
            },
          }

          await this.props.client
            .mutate({
              mutation: sendMessageMutation,
              variables: {
                data
              },
            })

          this.setState({ loading: false }, () => {
            UserUtils.setMessageReceiverId(this.state.poolDetails.createdBy.id)
            UserUtils.setBackBtnLink(this.props.location.pathname)
            this.props.history.push('/conversations')
          })
        } catch (e) {
          console.log('error', e)
          this.setState({ loading: false }, async () => {
            let errorMsg = commonFunctions.parseGraphQLErrorMessage(e)
            if (errorMsg === 'Unauthenticated.') {
              const status = await this.props.refreshToken(this.props.history)
              if (status === 'ok') {
                this.submit()
              }
            }
          })
        }
      })
    }
  }

  handleDisable = () => {
    return !this.state.message.length || !(this.state.adultCount + this.state.childrenCount) || !this.state.startTime || !this.state.endTime
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
    UserUtils.setAvailableDate(date)
    this.setState({
      selectedDate: date,
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

  onChange = (field, value) => {
    this.setState({
      [field]: value
    })
  }

  setTimeCallback = (startTime, endTime) => {
    let modifiedPoolDetails = {...this.state.poolDetails}
    modifiedPoolDetails.startTime = startTime
    modifiedPoolDetails.endTime = endTime
    this.setState({
      startTime: startTime,
      endTime: endTime,
      poolDetails: modifiedPoolDetails
    })
  }

  render () {
    const { classes } = this.props

    return (
      <Typography variant='body1' component='div'>
        <div className={classes.wrapper}>
          <div className={classes.container}>
            <div className={classes.header}>
              <div className={classes.backStep} onClick={this.goBack}>
                <font><i className='fa fa-angle-left' aria-hidden='true'></i> BACK</font>
              </div>
              <Typography variant='h2'>CONTACT HOST</Typography>
            </div>
          </div>
          <div className={`${classes.container} mobile-none-padding`}>
            <div className={classes.blueMessageBox}>
              <p>
                Please provide us some information
                before reaching out to this host
              </p>
              <span className='exclamation-blue-icon'>
              <i className='fas fa-exclamation' />
            </span>
            </div>
          </div>
          <div className={classes.container}>
            <div className={classes.hostInfoContainer}>
              <UserAvatar
                user={this.state.poolDetails && this.state.poolDetails.createdBy}
                className={classes.avatar}
                src={this.getHostImage()}
                alt='Host Avatar'
              />
              <div>
                <Typography variant='h3'>{this.getPoolName()}</Typography>
                <div className='hosted-container'>
                  <Typography variant='h4' className='hosted'>{this.getHostName()}</Typography>
                </div>
                <Typography variant='h4' className='price'>{this.getHostHourPrice()}</Typography>
                {this.state.poolDetails && this.state.poolDetails.price_per_guest_enabled
                  ? <Typography variant='h4' className='price'>{this.getAdditinalFees()}</Typography>
                  : null
                }
              </div>
            </div>
            <div>
              <SelectDateAndTime
                poolDetails={this.state.poolDetails}
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
                fromPage={(this.props.location && this.props.location.state && this.props.location.state.fromPage) || null}
                setTimeCallback={this.setTimeCallback}
                invalidDates={this.state.invalidDates}
                allDatesIsInvalid={this.state.allDatesIsInvalid}
              />
            </div>
            <div>
              <SelectGuests
                poolDetails={this.state.poolDetails}
                adultCount={this.state.adultCount}
                childrenCount={this.state.childrenCount}
                infantCount={this.state.infantCount}
                handleApply={this.handleApplyGuests}
                handleGuestsPopup={this.handleGuestsPopup}
                showGuests={this.state.showGuests}
              />
            </div>
            <div className={classes.textFieldContainer}>
              <TextField
                value={this.state.message}
                multiline
                label='Send your first message to the host'
                rows='5'
                variant='outlined'
                onChange={this.onChangeMessage}
              />
            </div>
            <div className={classes.buttonContainer}>
              <Button
                variant='button'
                disabled={this.handleDisable()}
                onClick={this.submit}
                className={`${this.handleDisable() ? classes.disableBtn : classes.nextButton}`}>
                Start Conversation
              </Button>
            </div>
          </div>
        </div>
        {this.state.loading && <PageLoader loading />}
      </Typography>
    )
  }
}

function ContactHostContainer (props) {
  const { region } = useContext(RegionContext)
  const context = useContext(UserContext)
  return <ContactHost region={region} {...context} {...props} />
}

const enhance = compose(
  withStyles(styles),
  withRouter,
  withApollo,
)

export default enhance(ContactHostContainer)

ContactHost.propTypes = {
  client: PropTypes.shape({
    mutate: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.object.isRequired,
}

ContactHost.defaultProps = {
  client: {},
  user: {},
}
