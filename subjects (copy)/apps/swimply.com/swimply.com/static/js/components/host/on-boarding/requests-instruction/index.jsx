import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { withRouter } from 'react-router-dom'
import { withApollo } from 'react-apollo'
import { loader } from 'graphql.macro'

// materials components
import Typography from '@material-ui/core/Typography'

// components
import PageLoader from '../../../commons/pageloader'
import Stepper from '../../stepper'

// styles
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'
import UserUtils from '../../../utilities/UserUtils'
import { IS_SHVIMPLY } from '../../../../config'

// graphql
const availabilityMutation = loader('./../../../../graphql/host/pool/availability.graphql')

class RequestsInstruction extends Component {
  state = {
    loading: false,
    poolId: null
  }

  activeStep = 90

  componentDidMount () {
    this.getPoolData()
  }

  getPoolData = () => {
    const poolId = UserUtils.getHostPoolID()
    this.setState({ poolId })
  }

  goToNextScreen = () => {
    this.props.handleNextScreen('showRequestsInstructionScreen', 'showMonthsSettingsScreen')
  }

  goBack = () => {
    this.props.handleNextScreen('showRequestsInstructionScreen', 'showAvailabilityScreen')
  }

  goBackToInstantBooking = () => {
    this.goToInstantBooking().then(() => {
      this.props.handleNextScreen('showRequestsInstructionScreen', 'showLearnHowBookScreen')
    })
  }

  goToInstantBooking = async () => {
    this.setState({
      loading: true
    }, async () => {
      const data = {
        pool_id: this.state.poolId,
        default_instant_booking: true
      }

      try {
        const { data: { savePoolAvailability: pool } } = await this.props.client
          .mutate({
            mutation: availabilityMutation,
            variables: {
              data: data
            }
          })
        console.log(pool); // TODO: put a google tag push here?
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
          <p className={classes.subTitle}> </p>
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
                  <Typography variant='h4'>They send you a reservation request</Typography>
                  <p className={classes.subTitle}>
                    Guests who are interested in your listing will send you a reservation request.
                    You have 12 hours to approve or decline the reservation.
                    For reservations within 24 hours, you will only have 3 hours to approve or decline.
                  </p>
                  {/*<p className={classes.subTitle}>*/}
                  {/*  Guests may request several pools but will only be*/}
                  {/*  charged for the first pool that approves the request.*/}
                  {/*</p>*/}
                  <p className={classes.subTitle}>
                    Once you approve a reservation request, the guest will need to confirm before being charged.
                  </p>
                  <p className={classes.subTitle}>
                    The sooner you review and approve the request, the more likely the guest will confirm.
                  </p>
                  <p className={classes.subTitle}>
                    Guests will not confirm the reservation if
                    <ol type='A' className={classes.conditionList}>
                      <li>
                        <p className={classes.subTitle}>Another pool accepted their request sooner</p>
                      </li>
                      <li>
                        <p className={classes.subTitle}>The time no longer works for the guests</p>
                      </li>
                      <li>
                        <p className={classes.subTitle}>They find a pre approved pool</p>
                      </li>
                    </ol>
                  </p>
                  <p className={classes.link} onClick={this.goBackToInstantBooking}>
                    <span className={classes.linkBold}>I don't want to review every request</span>
                  </p>
                </div>
              </li>
              <li className={classes.listItem}>
                <div className={classes.listNumber}>3</div>
                <div>
                  <Typography variant='h4'>You'll get a reservation confirmation</Typography>
                  <p className={classes.subTitle}>
                    Once you accept a reservation, you'll get a confirmation email with
                    the trip details, including the dates and how many total guests to expect.
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
                  <Typography variant='h4'>Want extra host protection?</Typography>
                  <p className={classes.subTitle}>
                    When you set rules allowing some guests to book instantly, you immediately
                    gain extra protection, including penalty-free cancellations for
                    reservations you're uncomfortable with and additional host controls.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <p className={classes.link} onClick={this.goBackToInstantBooking}>
              <span className={classes.linkBold}>Get extra protection by allowing some guests to book instantly ></span>
            </p>
          </div>
          <div className={classes.buttonContainer}>
            <Typography variant='button' onClick={this.goToNextScreen}>
              Next
            </Typography>
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

RequestsInstruction.propTypes = {
  classes: PropTypes.object.isRequired,
  handleNextScreen: PropTypes.func.isRequired,
  isEditing: PropTypes.bool
}

RequestsInstruction.defaultsProps = {
  classes: {},
  handleNextScreen: () => {},
  isEditing: false
}

export default enhance( RequestsInstruction )
