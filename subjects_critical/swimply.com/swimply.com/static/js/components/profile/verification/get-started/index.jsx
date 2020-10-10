import React, {Component, useContext} from 'react'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { withApollo } from 'react-apollo'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'

// components
import HostPlaceholder from '../../../shared/host-placeholder'
import BackButton from '../../../commons/back-button'

// services
import HelperService from '../../../../services/helper'

import UserUtils from '../../../utilities/UserUtils'

// contexts
import UserContext from '../../../../contexts/UserContext'

// materials component
import { Typography } from '@material-ui/core'

// styles
import styles from './styles'

class VerificationGetStarted extends Component {
  state = {
    loading: false,
    showHostPlaceholder: HelperService.handleHostPlaceholder(),
  }

  goBack = () => {
    this.props.history.goBack()
  }

  getStarted = () => {
    UserUtils.setVerificationGetStarted('showed')
    this.props.history.replace('/profile/verification')
  }

  render () {
    const { classes, user } = this.props

    if (this.state.showHostPlaceholder) {
      return <HostPlaceholder withLogout />
    }

    const isHost = user && user.roles && user.roles[0].name === 'Host'

    return (
      <Typography variant='body1' component='div'>
        <div className={classes.container}>
          <div className={`${classes.innerContainer} ${classes.paddingHorizontal}`}>
            <div className={`${classes.alignItemsCenter}`}>
              <BackButton />
            </div>
            <h2 className={classes.title}>
              {
                isHost ? 'Becoming a Verified Host on Swimply' : 'Becoming a Verified Swimmer on Swimply'
              }
            </h2>
            <p className={`${classes.text} ${classes.marginBottom}`}>
              {
                isHost ?
                  `To increase the trust and safety of the Swimply community, we allow hosts to become verified by providing a valid ID and proof of pool ownership (a utility bill or something)` :
                  `To increase the trust and safety of the Swimply community, we allow Swimmers to become verified by providing a valid government issued ID`
              }
            </p>
            <div className={classes.blueBox}>
              <p>This information is not shown to Guests and is stored securely in the Swimply data base.</p>
            </div>
            <p className={classes.listTitle}>Why becomes verified?</p>
            <ul className={classes.verifiedList}>
              {
                isHost ? <>
                  <li className='item'>
                    <p>Verified Hosts receive a Verified Badge which results in increased credibility and more bookings.</p>
                  </li>
                  <li className='item'>
                    <p>Priority Payments. Verified Hosts get paid faster; within 24-48 hours of the booking.</p>
                  </li>
                  <li className='item'>
                    <p>Priority visibility in search results.</p>
                  </li>
                </> : <>
                  <li className='item'>
                    <p>Receive exclusive access to pools that only accept Verified Swimmers.</p>
                  </li>
                  <li className='item'>
                    <p>Verified Swimmers are 75% more likely to get approved for a booking.</p>
                  </li>
                  <li className='item'>
                    <p>Some pools are only “Pre-approved” for verified swimmers.</p>
                  </li>
                </>
              }
            </ul>
            <div className={classes.marginTop}>
              <button
                onClick={this.getStarted}
                className={classes.button}
              >
                Get started
              </button>
            </div>
          </div>
        </div>
      </Typography>
    )
  }
}


VerificationGetStarted.propTypes = {
  classes: PropTypes.object.isRequired,
}

VerificationGetStarted.defaultProps = {
  classes: {},
}

const enhance = compose(
  withStyles(styles),
  withRouter,
  withApollo
)

function VerificationGetStartedContainer (props) {
  const context = useContext(UserContext)
  return <VerificationGetStarted {...context} {...props} />
}

export default enhance(VerificationGetStartedContainer)
