import React, { Component, useContext } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { withApollo } from 'react-apollo'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'

// components
import HostPlaceholder from '../../../shared/host-placeholder'
import BackButton from '../../../commons/back-button'
import ProgressBar from '../../../commons/progress-bar'

// services
import HelperService from '../../../../services/helper'

// contexts
import UserContext from '../../../../contexts/UserContext'

// materials component
import { Typography } from '@material-ui/core'

// styles
import styles from './styles'

class VerificationFirstScreen extends Component {
  state = {
    loading: false,
    showHostPlaceholder: HelperService.handleHostPlaceholder(),
  }

  goBack = () => {
    this.props.history.goBack()
  }

  navigateTo = (next) => {
    this.props.history.push(next)
  }

  getPercentage = () => {
    const { user } = this.props

    const isHost = user && user.roles && user.roles[0].name === 'Host'
    const verifications = user && user.verifications
    const isVerified = verifications && verifications.length && HelperService.isVerified(verifications, isHost)
    const verifiedPluses = verifications && verifications.length && HelperService.getVerifiedPluses(verifications, isHost)

    if (isVerified && verifiedPluses.length === 0) {
      return isHost ? 33.33 : 50
    } else if (isVerified && verifiedPluses.length === 1) {
      return isHost ? 66.66 : 100
    } else if (isVerified && verifiedPluses.length === 2) {
      return 100
    } else {
      return 0
    }
  }

  render () {
    const { classes, user } = this.props

    if (this.state.showHostPlaceholder) {
      return <HostPlaceholder withLogout />
    }

    const isHost = user && user.roles && user.roles[0].name === 'Host'
    const verifications = user && user.verifications
    const isVerified = verifications && verifications.length && HelperService.isVerified(verifications, isHost)
    const verifiedPluses = verifications && verifications.length && HelperService.getVerifiedPluses(verifications, isHost)
    const passportDriveUrl = verifications && verifications.length && verifications.find(verification => verification.passport_drive_url)
    const passportDriveUrlApproved = passportDriveUrl && verifications.find(verification => verification.img_id_approved)
    const poolProofUrl = verifications && verifications.length && verifications.find(verification => verification.pool_proof_url)
    const poolProofUrlApproved = poolProofUrl && verifications.find(verification => verification.img_proof_approved)
    const successfulBooking = verifications && verifications.length && verifications.find(verification => verification.successful_booking)
    const isWaitingForApproval = (passportDriveUrl && !passportDriveUrlApproved) || (poolProofUrl && !poolProofUrlApproved)

    return (
      <Typography variant='body1' component='div'>
        <div className={classes.container}>
          <div className={`${classes.innerContainer} ${classes.paddingHorizontal}`}>
            <div className={`${classes.alignItemsCenter}`}>
              <BackButton />
            </div>
            <h2 className={classes.title}>VERIFICATION PROGRESS</h2>
            <div className={classes.progressBarContainer}>
              <div className={classes.verifiedProgressIcons}>
                <span className={`verified ${isVerified ? 'active': ''}`} />
                <span className={`verified ${isVerified && verifiedPluses.length >= 1 ? 'active': ''}`}>+</span>
                {
                  isHost ?
                    <span className={`verified ${isVerified && verifiedPluses.length >= 2 ? 'active': ''}`}>++</span>
                    : null
                }
              </div>
              <ProgressBar percentage={this.getPercentage()} />
              {
                isWaitingForApproval
                  ? <p className={classes.alertMessage}>(Waiting for Swimply approval)</p>
                  : null
              }
            </div>
            <p className={`${classes.text} ${classes.marginBottom}`}>To be verified entirely you need</p>
            <div onClick={this.navigateTo.bind(this, '/profile/verification-first-step')} className={classes.button}>
              <p className={`${classes.buttonTitle} passport`}>
                <span className='text'>Upload your ID</span>
                <i className={`right-blue-arrow fa ${passportDriveUrl ? 'fa-check-circle' : 'fa-angle-right'}`} aria-hidden='true' />
              </p>
              <p className={classes.text}>Best way to be 100% certain you’re not a robot.</p>
            </div>
            {
              isHost ? <div onClick={this.navigateTo.bind(this, '/profile/verification-second-step')} className={classes.button}>
                <p className={`${classes.buttonTitle} owner`}>
                  <span className='text'>Upload proof of ownership</span>
                  <i className={`right-blue-arrow fa ${poolProofUrl ? 'fa-check-circle' : 'fa-angle-right'}`} aria-hidden='true'/>
                </p>
                <p className={classes.text}>Just a quick photo of a utility bill with your name and address.</p>
              </div> : null
            }
            <div className={classes.button}>
              <p className={`${classes.buttonTitle} booking`}>
                <span className='text'>{isHost ? 'Host a successful booking!' : 'Enjoy a swim!'}</span>
                <i className={`right-blue-arrow fa ${successfulBooking ? 'fa-check-circle' : ''}`} aria-hidden='true' />
              </p>
              <p className={classes.text}>Experience the awesomeness of Swimply.</p>
            </div>
          </div>
        </div>
      </Typography>
    )
  }
}


VerificationFirstScreen.propTypes = {
  classes: PropTypes.object.isRequired,
}

VerificationFirstScreen.defaultProps = {
  classes: {},
}

const enhance = compose(
  withStyles(styles),
  withRouter,
  withApollo
)

function VerificationFirstScreenContainer (props) {
  const context = useContext(UserContext)
  return <VerificationFirstScreen {...context} {...props} />
}

export default enhance(VerificationFirstScreenContainer)
