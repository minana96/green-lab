import React, { Component, Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { loader } from 'graphql.macro'
import TagManager from 'react-gtm-module'

// materials components
import Typography from '@material-ui/core/Typography'

// components
import PageLoader from '../../../commons/pageloader'
import Stepper from '../../stepper'
import MaxGuestsPopup from './max-guests-popup'
import SendRequestsPopup from './send-requests-popup'

// utils
import UserUtils from '../../../utilities/UserUtils'
import * as commonFunctions from '../../../utilities/commonFunctions'
import { IS_SHVIMPLY } from '../../../../config'

// styles
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// contexts
import UserContext from '../../../../contexts/UserContext'

// graphql
const availabilityMutation = loader('./../../../../graphql/host/pool/availability.graphql')
const poolDetailsMutation = loader('./../../../../graphql/findpool/pooldetailsQuery.graphql')

class LearnHowBook extends Component {
  state = {
    loading: false,
    groupSize: 10,
    showGuestsPopup: false,
    showRequestsPopup: false,
    poolId: null
  }

  activeStep = 90

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
            if (!pool.default_instant_booking && this.props.prevScreen !== 'showRequestsInstructionScreen') {
              this.props.handleNextScreen('showLearnHowBookScreen', 'showRequestsInstructionScreen')
            } else {
              this.setState({
                groupSize: pool.instant_group_size || 10,
                loading: false
              })
            }
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

  goToNextScreen = (nextScreen = 'showMonthsSettingsScreen', instantBooking = true) => {
    this.save(instantBooking).then(() => {
      this.props.handleNextScreen('showLearnHowBookScreen', nextScreen)
    })
  }

  goBack = () => {
    this.props.handleNextScreen('showLearnHowBookScreen', 'showAvailabilityScreen')
  }

  handleGuestsPopup = (showGuestsPopup, groupSize) => {
    this.setState({
      groupSize: groupSize || this.state.groupSize,
      showGuestsPopup
    })
  }

  handleRequestsPopup = (showRequestsPopup) => {
    this.setState({
      showRequestsPopup
    })
  }

  save = async (instantBooking = true) => {
    this.setState({
      loading: true
    }, async () => {
      const data = {
        pool_id: this.state.poolId,
        default_instant_booking: instantBooking,
        instant_group_size: this.state.groupSize,
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
            defaultInstantBooking: instantBooking,
            groupSize: this.state.groupSize,
          },
          events: {
            RegistrationStep1: 'RegistrationStep11'
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
          <Typography variant='h3'>Learn how guests book on {IS_SHVIMPLY ? 'Shvimply' : 'Swimply'}</Typography>
          <p className={classes.subTitle}>
            Qualified groups with less than 10 guests can book
            available days without sending a reservation request.
          </p>
          <div className={classes.listContainer}>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <div className={classes.listNumber}>1</div>
                <div>
                  <Typography variant='h4'>A guest finds your listing</Typography>
                  <p className={classes.subTitle}>
                    Your listing will show up in search results.
                    Remember to keep your calendar updated to avoid requests for days you can't host.
                  </p>
                </div>
              </li>
              <li className={classes.listItem}>
                <div className={classes.listNumber}>2</div>
                <div>
                  <Typography variant='h4'>Qualified guests can book instantly</Typography>
                  <p className={classes.subTitle}>
                    <span className={classes.link} onClick={this.handleGuestsPopup.bind(null, true, null)}>
                      Groups with {this.state.groupSize} or fewer guests
                    </span>
                    and who meet your requirements can book available
                    time slots instantly. Larger groups can still send you a reservation request.
                  </p>
                  <p className={classes.link} onClick={this.handleRequestsPopup.bind(null, true)}>
                    I want to review every request
                  </p>
                </div>
              </li>
              <li className={classes.listItem}>
                <div className={classes.listNumber}>3</div>
                <div>
                  <Typography variant='h4'>You'll get a reservation confirmation</Typography>
                  <p className={classes.subTitle}>
                    You'll get a confirmation when they book with information like trip details,
                    how many guests will be arriving and the start and end time of the booking.
                    Cancelling a reservation after confirmation may result in penalty per our terms of use.
                    See terms 
                    <a className={classes.link} href='https://swimply.com/termsandconditions' rel='noopener noreferrer' target='_blank'>
                      here.
                    </a>
                  </p>
                </div>
              </li>
              <li className={classes.listItem}>
                <div className={classes.listNumber}>4</div>
                <div>
                  <Typography variant='h4'>We’re here for you</Typography>
                  <p className={classes.subTitle}>
                    Hosts have 12 hours to cancel on any reservation 
                    they are uncomfortable with penalty free. 
                    As always, our Host Care team is at your service 24/7.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className={classes.buttonContainer}>
            <Typography variant='button' onClick={this.goToNextScreen.bind(null, 'showMonthsSettingsScreen', true)}>
              Next
            </Typography>
          </div>
        </Typography>
        {this.state.loading && <PageLoader loading />}
        {this.state.showGuestsPopup && <MaxGuestsPopup
          handlePopup={this.handleGuestsPopup}
          guests={this.state.groupSize}
        />}
        {this.state.showRequestsPopup && <SendRequestsPopup
          handlePopup={this.handleRequestsPopup}
          goToNextScreen={this.goToNextScreen}
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

LearnHowBook.propTypes = {
  classes: PropTypes.object.isRequired,
  handleNextScreen: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
  prevScreen: PropTypes.string
}

LearnHowBook.defaultsProps = {
  classes: {},
  handleNextScreen: () => {},
  isEditing: false,
  prevScreen: ''
}

function LearnHowBookContainer (props) {
  const userContext = useContext(UserContext)
  return <LearnHowBook {...userContext} {...props} />
}

export default enhance(LearnHowBookContainer);
