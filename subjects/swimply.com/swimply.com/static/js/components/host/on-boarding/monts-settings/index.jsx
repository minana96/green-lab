import React, {Component, Fragment, useContext} from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import InputRange from 'react-input-range'
import TagManager from 'react-gtm-module'
import update from 'immutability-helper'
import { withApollo } from 'react-apollo'
import { loader } from 'graphql.macro'
import { withRouter } from 'react-router-dom'

// materials components
import Typography from '@material-ui/core/Typography'

// components
import PageLoader from '../../../commons/pageloader'
import Stepper from '../../stepper'
import MonthsCalendar from './months-calendar'

// styles
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// utils
import UserUtils from '../../../utilities/UserUtils'
import * as commonFunctions from '../../../utilities/commonFunctions'

// constants
import { timeArray } from '../../../../config'
import Button from '@material-ui/core/Button'
import UserContext from "../../../../contexts/UserContext";

// graphql
const availabilityMutation = loader('./../../../../graphql/host/pool/availability.graphql')
const poolDetailsMutation = loader('./../../../../graphql/findpool/pooldetailsQuery.graphql')

class MonthsSettings extends Component {
  state = {
    loading: false,
    showRange: false,
    timeRange: { min: 9, max: 21 },
    displayTime: { min: '9 am', max: '9 pm' },
    available: { from: '9:00 AM', to: '9:00 PM' },
    activeMonths: [],
    poolId: null
  }

  activeStep = 97

  componentDidMount () {
    this.getPoolData()
  }

  getPoolData () {
    const poolId = parseInt(UserUtils.getHostPoolID(), 10)
    const accessToken = UserUtils.getAccessToken()

    if (accessToken) {
      this.setState({
        poolId,
      }, () => {
        this.setState({ loading: true }, async () => {
          try {
            const { data: { pool = {} } } = await this.props.client.query({
              query: poolDetailsMutation,
              variables: {
                id: poolId,
              },
              fetchPolicy: 'network-only',
            })
            this.setState({
              activeMonths: pool.months.map(month => month.month_number),
              available: this.formatAvailableTime(pool),
              displayTime: this.formatDisplayTime(pool),
              timeRange: this.formatTimeRange(pool),
              loading: false
            })
          } catch (err) {
            const errorMsg = commonFunctions.parseGraphQLErrorMessage(err)
            if (errorMsg === 'Unauthenticated.') {
              const status = await this.props.refreshToken(this.props.history)
              if (status === 'ok') {
                this.getPoolData()
              }
            }
            this.setState({ loading: false })
          }
        })
      })
    } else {
      UserUtils.logoutAndSetPreviousUrl(this.props.history, this.props.location)
    }
  }

  formatAvailableTime = ({ available_from, available_to }) => {
    return {
      from: timeArray.find(item => item.time_insert === available_from).time_insert,
      to: timeArray.find(item => item.time_insert === available_to).time_insert,
    }
  }

  formatTimeRange = ({ available_from, available_to }) => {
    return {
      min: timeArray.find(item => item.time_insert === available_from).timeNumber,
      max: timeArray.find(item => item.time_insert === available_to).timeNumber,
    }
  }

  formatDisplayTime = ({ available_from, available_to }) => {
    return {
      min: timeArray.find(item => item.time_insert === available_from).displayTime,
      max: timeArray.find(item => item.time_insert === available_to).displayTime,
    }
  }

  goToNextScreen = () => {
    this.save().then(() => {
      if (this.props.isEditing) {
        this.props.history.goBack()
      } else {
        this.props.setAvailableMonths(this.state.activeMonths) // to use data from props when we get emty months array from server
        this.props.handleNextScreen('showMonthsSettingsScreen', 'showManageCalendarScreen')
      }
    })
  }

  goBack = () => {
    const prevScreen = this.props.prevScreen || 'showLearnHowBookScreen'
    this.props.handleNextScreen('showMonthsSettingsScreen', prevScreen)
  }

  handleMonthsChange = (activeMonths) => {
    this.setState({ activeMonths })
  }

  handleTimeRange = (timeRange) => {
    let { min, max } = timeRange
    let from, to

    from = timeArray.find(item => item.timeNumber === min)
    from = from ? from.time_insert : '09:00:00'
    to = timeArray.find(item => item.timeNumber === max)
    to = to ? to.time_insert : '21:00:00'
    min = timeArray.find(item => item.timeNumber === min)
    min = min ? min.displayTime : '9 am'
    max = timeArray.find(item => item.timeNumber === max)
    max = max ? max.displayTime : '9 pm'

    this.setState({
      displayTime: update(this.state.displayTime, {
        min: { $set: min },
        max: { $set: max },
      }),
      available: update(this.state.available, {
        from: { $set: from },
        to: { $set: to },
      }),
      timeRange: {
        min: timeRange.min,
        max: timeRange.max
      }
    })
  }

  save = async () => {
    this.setState({
      loading: true
    }, async () => {

      const data = {
        pool_id: this.state.poolId,
        months_open: this.state.activeMonths,
        available_from: this.state.available.from,
        available_to: this.state.available.to,
      }

      try {
        const { data: { savePoolAvailability: pool } } = await this.props.client
          .mutate({
            mutation: availabilityMutation,
            variables: {
              data: data
            }
          })
        this.setState({ loading: false })
        TagManager.dataLayer({
          dataLayer: {
            poolId: pool.pool_id,
            months: this.state.activeMonths,
            available_from: this.state.available.from,
            available_to: this.state.available.to,
          },
          events: {
            RegistrationStep1: 'RegistrationStep12'
          }
        })
      } catch (e) {
        console.error(e)
        this.setState({ loading: false })
      }

    })
  }

  render () {
    const { classes } = this.props

    return (
      <Fragment>
        <Typography variant='body1' component='div'>
          <div className={classes.backContainer}>
            <font onClick={this.goBack}>
              <i className='fa fa-angle-left' aria-hidden /> BACK
            </font>
          </div>
          {!this.props.isEditing && <div className={classes.stepperContainer}>
            <Stepper activeStep={this.activeStep} />
          </div>}
          <div className={classes.marginTop}>
            <Typography variant='h3'>What months is your pool open?</Typography>
            <p className={classes.subTitle}>
              Tap on the months your pool will be open. Any month not tapped
              will automatically make those dates unavailable.
            </p>
            <MonthsCalendar activeMonths={this.state.activeMonths} handleChange={this.handleMonthsChange} />
          </div>
          <div className={classes.marginTop}>
            <Typography variant='h3'>What time frame will you be renting out your pool?</Typography>
            <p className={classes.subTitle}>
              Set the earliest and latest times your pool would be available.
              You will edit your pool’s exact availability later.
            </p>
            <div className={classes.inputRangeContainer}>
              <InputRange
                maxValue={24}
                minValue={7}
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
          <div className={classes.buttonContainer}>
            <Button
              variant='button'
              disabled={!this.state.activeMonths.length}
              onClick={this.goToNextScreen}
              className={`${!this.state.activeMonths.length ? classes.disableBtn : classes.nextButton}`}>
              {this.props.isEditing ? 'Save' : 'Next'}
            </Button>
          </div>
        </Typography>
        {this.state.loading && <PageLoader loading />}
      </Fragment>
    )
  }
}

const enhance = compose(
  withStyles( styles, { withTheme: true } ),
  withApollo,
  withRouter
)

MonthsSettings.propTypes = {
  classes: PropTypes.object.isRequired,
  handleNextScreen: PropTypes.func.isRequired,
  setAvailableMonths: PropTypes.func,
  isEditing: PropTypes.bool,
  prevScreen: PropTypes.string
}

MonthsSettings.defaultsProps = {
  classes: {},
  handleNextScreen: () => {},
  setAvailableMonths: () => {},
  isEditing: false,
  prevScreen: ''
}

function MonthsSettingsContainer (props) {
  const context = useContext(UserContext)
  return <MonthsSettings {...context} {...props} />
}

export default enhance( MonthsSettingsContainer )
