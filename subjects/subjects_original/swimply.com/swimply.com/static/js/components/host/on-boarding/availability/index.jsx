import React, { Component, Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import compose from 'recompose/compose'
import update from 'immutability-helper'
import TagManager from 'react-gtm-module'
import { loader } from 'graphql.macro'
import { withApollo } from 'react-apollo'

// materials components
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

// components
import PageLoader from '../../../commons/pageloader'
import Stepper from '../../stepper'
import AvailabilityTipsPopup from './availability-tips-popup'

// utils
import UserUtils from '../../../utilities/UserUtils'

// styles
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// contexts
import UserContext from '../../../../contexts/UserContext'

// constants
import { ADVANCE_NOTICES, AVAILABILITY_WINDOW } from '../../../../constants'
import * as commonFunctions from '../../../utilities/commonFunctions'

// graphql
const availabilityMutation = loader('./../../../../graphql/host/pool/availability.graphql')
const poolDetailsMutation = loader('./../../../../graphql/findpool/pooldetailsQuery.graphql')

class Availability extends Component {
  state = {
    loading: false,
    showPopup: false,
    poolId: null,
    availability: {
      notice: ADVANCE_NOTICES[2].key,
      window: AVAILABILITY_WINDOW[4].key
    },
    defaultInstantBooking: true
  }

  activeStep = 86

  componentDidMount () {
    this.getPoolData()
  }

  async getPoolData () {
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
              availability: update(this.state.availability, {
                notice: { $set: pool.advance_notice || ADVANCE_NOTICES[2].key },
                window: { $set: pool.availability_window || AVAILABILITY_WINDOW[4].key },
              }),
              defaultInstantBooking: typeof pool.default_instant_booking === 'boolean' ? pool.default_instant_booking : true,
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

  onSelect = (fieldName, { target: { value } }) => {
    this.setState({
      availability: update(this.state.availability, {
        [fieldName]: { $set: value }
      })
    })
  }

  handlePopup = (showPopup) => {
    this.setState({ showPopup })
  }

  goToNextScreen = () => {
    this.save().then(() => {
      const nextScreen = this.state.defaultInstantBooking ? 'showLearnHowBookScreen' : 'showRequestsInstructionScreen'
      this.props.handleNextScreen('showAvailabilityScreen', nextScreen)
    })
  }

  goBack = () => {
    if (this.props.isEditing) {
      this.props.history.goBack()
    } else {
      this.props.handleNextScreen('showAvailabilityScreen', 'cancellationPolicyStatus')
    }

  }

  save = async () => {
    this.setState({
      loading: true
    }, async () => {
      const data = {
        pool_id: this.state.poolId,
        advance_notice: this.state.availability.notice,
        availability_window: this.state.availability.window,
      }

      try {
        const { data: { savePoolAvailability: pool } } = await this.props.client
          .mutate({
            mutation: availabilityMutation,
            variables: {
              data: data
            }
          })

        TagManager.dataLayer({
          dataLayer: {
            poolId: pool.pool_id,
            advanceNotice: this.state.availability.notice,
            availabilityWindow: this.state.availability.window,
          },
          events: {
            RegistrationStep1: 'RegistrationStep10' // TODO need to set correct step number
          }
        })
      } catch (e) {
        console.error(e)
      }

      this.setState({ loading: false })
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
          <Typography variant='h3'>Availability</Typography>
          <p className={classes.subTitle}>Automatically manage your calendar and which reservations you get.</p>
          <div className={classes.selectContainer}>
            <Typography variant='h4' className={classes.title}>Advance notice</Typography>
            <p className={classes.selectSubTitle}>How much notice do you need before a guest arrives?</p>
            <Select
              className={classes.select}
              value={this.state.availability.notice}
              onChange={this.onSelect.bind(null, 'notice')}
              displayEmpty
            >
              {
                ADVANCE_NOTICES.map((notice, index) => {
                  return (
                    <MenuItem value={notice.key} key={`availability-notice-${index}`}>{notice.value}</MenuItem>
                  )
                })
              }
            </Select>
          </div>
          <div className={classes.selectContainer}>
            <Typography variant='h4' className={classes.title}>Availability window</Typography>
            <p className={classes.selectSubTitle}>Choose how far in advance guests can book your place.</p>
            <Select
              className={classes.select}
              value={this.state.availability.window}
              onChange={this.onSelect.bind(null, 'window')}
              displayEmpty
            >
              {
                AVAILABILITY_WINDOW.map((window, index) => {
                  return (
                    <MenuItem value={window.key} key={`availability-window-${index}`}>{window.value}</MenuItem>
                  )
                })
              }
            </Select>
          </div>
          <div className={classes.availabilityTipsContainer}>
            <p className={classes.subTitle}>
              Check out more information about Availability settings.
            </p>
            <span onClick={this.handlePopup.bind(null, true)} className={classes.availabilityTipsButton}>?</span>
            <span onClick={this.handlePopup.bind(null, true)} className={classes.availabilityTipsArrowButton}>
              <img src='/img/Arrow-Right.png' alt='Arrow icon' />
            </span>
          </div>
          <div className={classes.buttonContainer}>
            <Typography variant='button' onClick={this.goToNextScreen}>
              Next
            </Typography>
          </div>
        </Typography>
        {this.state.loading && <PageLoader loading />}
        {this.state.showPopup && <AvailabilityTipsPopup
          handlePopup={this.handlePopup}
          fullScreen
        />}
      </Fragment>
    )
  }
}

const enhance = compose(
  withStyles( styles, { withTheme: true } ),
  withApollo,
  withRouter
)

Availability.propTypes = {
  classes: PropTypes.object.isRequired,
  handleNextScreen: PropTypes.func.isRequired,
  isEditing: PropTypes.bool
}

Availability.defaultsProps = {
  classes: {},
  handleNextScreen: () => {},
  isEditing: false
}

function AvailabilityContainer (props) {
  const userContext = useContext(UserContext)
  return <Availability {...userContext} {...props} />
}

export default enhance(AvailabilityContainer);
