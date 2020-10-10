import React, { Component, useContext } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { withApollo } from 'react-apollo'
import {loader} from 'graphql.macro'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import queryString from 'query-string'

// components
import Loader from '../commons/pageloader'
import HostPlaceholder from '../shared/host-placeholder'
import BackButton from '../commons/back-button'
import Avatar from '../commons/avatar'

// materials component
import { Typography } from '@material-ui/core'

// contexts
import UserContext from '../../contexts/UserContext'

// utils
import UserUtils from '../utilities/UserUtils'
import * as commonFunctions from '../utilities/commonFunctions'

// services
import HelperService from '../../services/helper'

// styles
import styles from './styles'
import ConnectStripeButton from "../commons/connect-stripe-button";
import StepProgressBar from "../commons/step-progress-bar";
import RegionContext from "../../contexts/RegionContext";
import StripeService from "../../services/stripe";

// graphql
// const changeRole = loader('./../../graphql/user/changerole.graphql')
const stripeConnect = loader('./../../graphql/user/stripeConnect.graphql')

class Profile extends Component {
  state = {
    loading: false,
    showHostPlaceholder: HelperService.handleHostPlaceholder(),
    balance: 0,
  }

  componentDidMount () {
    this.handleStripeCode()
    if (!UserUtils.getAccessToken()) {
      this.logout()
    } else {
      this.props.handleUser()
    }
  }

  handleStripeCode = () => {
    const parsed = queryString.parse(this.props.location.search)
    if (parsed.code) {
      this.setState({ loading: true }, async () => {
        try {
          const { data: { saveConnectedAccount: data }} = await this.props.client.mutate({
            mutation: stripeConnect,
            variables: {
              data: {
                code: parsed.code
              }
            },
          })
          if (data.status) {
            this.setState({ loading: false }, () => {
              this.props.history.replace('/profile')
            })
          } else {
            this.setState({
              loading: false,
              errorMessage: data.message,
            })
            console.log('err', data.message)
          }
        } catch (e) {
          console.log('error', e)
          let errorMessage = commonFunctions.parseGraphQLErrorMessage(e)
          this.setState({
            errorMessage,
            loading: false
          })
        }
      })
    }
  }

  redirectToStripeDashboard = async () => {
    StripeService.redirectToStripeDashboard()
  }

  goBack = () => {
    this.props.history.goBack()
  }

  navigateTo = (next) => {
    if (next !== '/payment-method') {
      this.props.history.push(next)
    } else {
      this.props.history.push({
        pathname: '/payment-method',
        state: {
          needGoBackAfterUpdate: this.props.needGoBackAfterUpdate
        }
      })
    }
  }

  goToVerification = () => {
    const { user } = this.props
    const getStartedWasShowed = UserUtils.getVerificationGetStarted() === 'showed'
    const isHost = user && user.roles && user.roles[0].name === 'Host' && user.isAnyPool
    const isVerified = user && HelperService.isVerified(user.verifications, isHost)
    if (getStartedWasShowed || isVerified) {
      this.navigateTo('/profile/verification')
    } else {
      this.navigateTo('/profile/verification-get-started')
    }
  }

  logout = () => {
    UserUtils.setPreviousUrl(this.props.location.pathname)
    UserUtils.setPreviousSearchUrl(this.props.location.search)
    UserUtils.setIsPreviousUrl('yes')
    UserUtils.logout()
    this.props.history.push('/')
  }

  goToListYourPool = () => {
    // this.setState({ loading: true }, async () => {
      // try {
      //   const { data: { changeRole: data } } = await this.props.client
      //     .mutate({
      //       mutation: changeRole,
      //     })

      //   if (data.status) {
      //     this.setState({
      //       loading: false,
      //       errorMessage: ''
      //     })
      //     this.props.handleUser({
      //       roles: [{ name: 'Host' }],
      //       ...this.props.user
      //     })
      //     UserUtils.setUserRole('Host')
          this.props.history.push('/hostprompt')
      //   } else {
      //     this.setState({
      //       loading: false,
      //       errorMessage: data.message
      //     })
      //   }
      // } catch (error) {
      //   console.log(error)
      //   let errorMessage = commonFunctions.parseGraphQLErrorMessage(error)
      //   this.setState({
      //     loading: false,
      //     errorMessage,
      //   })
      // }
    // })
  }

  getProfileImage = () => {
    const { user } = this.props
    return user && user.img_url ? user.img_url : window.location.origin + '/img/profile-icon.png'
  }

  getProfileName = () => {
    const { user } = this.props
    return user ? `${user.firstname} ${user.lastname || ''}` : ''
  }

  getProfileEmail = () => {
    const { user } = this.props
    return user ? user.email : ''
  }

  render () {
    const { classes, user } = this.props

    if (this.state.showHostPlaceholder) {
      return <HostPlaceholder withLogout />
    }

    const userExist = user && user.roles
    const isSwimmer = userExist && (user.roles[0].name === 'Swimmer' || (user.roles[0].name === 'Host' && !user.isAnyPool))
    const isHost = userExist && user.roles[0].name === 'Host' && user.isAnyPool
    const isVerifiedUser = userExist && HelperService.isFullVerified(user && user.verifications, isHost)
    const isPartialVerified = userExist && HelperService.isVerified(user && user.verifications, isHost)
    const { percentage, completedSteps } = HelperService.getVerifiedInPercentage(user && user.verifications, isHost)

    const balance = user && user.referral_balance ? user.referral_balance : 0

    const rightBlueArrow = <i className={`${classes.rightBlueArrow} fa fa-angle-right right-blue-arrow`} aria-hidden='true' />

    return (
      <Typography variant='body1' component='div'>
        <div className={classes.container}>
          <div className={classes.innerContainer}>
            <div className={`${classes.alignItemsCenter} ${classes.spaceBetween} ${classes.marginBottom}`}>
              <BackButton />
              <p onClick={this.logout} className={`${classes.link}`}>Log out</p>
            </div>
            <div className={classes.userInfoContainer}>
              <Avatar
                user={user}
                verifiedIconSize='big'
                className={classes.avatar}
                src={this.getProfileImage()}
                alt='Host Avatar'
              />
              <div>
                <Typography variant='h3'>{this.getProfileName()}</Typography>
                <Typography variant='h4' className={classes.email}>{this.getProfileEmail()}</Typography>
              </div>
            </div>
            {
              !isVerifiedUser ? <div>
                <button onClick={this.goToVerification} className={classes.verifiedButton}>
                  {
                    isPartialVerified ? 'Complete Verification'
                    : isHost ? 'Become a verified Host' : 'Become a verified Swimmer'
                  }
                  {rightBlueArrow}
                </button>
                {
                  isHost ? <div className={classes.progressBarContainer}>
                    <StepProgressBar steps={3} completedSteps={completedSteps} />
                    <p className='percentage'>{percentage || 0} % verification completed</p>
                  </div> : null
                }
                <p className={classes.verifiedMessage}>
                  {
                    isHost ?
                      'Verified hosts receive more bookings and quicker payments!'
                      : 'Verified Swimmers are approved more often and get access to more pools.'
                  }
                </p>
              </div> : null
            }
            <div>
              <ul>
                <li className={`${classes.item} bank`} onClick={this.navigateTo.bind(this, '/profile/referral-info')}>
                  <p>{isHost ? 'Invite friends to book your pool!' : 'Swimply Bank'}</p>
                  <p className='money'>$ {balance}</p>
                  {rightBlueArrow}
                </li>
              </ul>
            </div>
            <div>
              <Typography variant='h2' className={classes.sectionTitle}>Account settings</Typography>
              <ul>
                <li className={`${classes.item} public`} onClick={this.navigateTo.bind(this, '/profile/edit-public-info')}>
                  <p>Public information</p>
                  {rightBlueArrow}
                </li>
                <li className={`${classes.item} private`} onClick={this.navigateTo.bind(this, '/profile/edit-private-info')}>
                  <p>Private information</p>
                  {rightBlueArrow}
                </li>
                {
                  isVerifiedUser ? <li
                    className={`${classes.item} verification`}
                    onClick={this.navigateTo.bind(this, '/profile/verification')}
                  >
                    <p>Verification information</p>
                    {rightBlueArrow}
                  </li> : null
                }
                {
                  isHost && user.stripe_id
                    ? user.stripe_account_onboard
                      ? <li
                        onClick={this.redirectToStripeDashboard}
                        className={`${classes.item} payments`}
                      >
                        <p>View payments</p>
                        {rightBlueArrow}
                      </li>
                      : <li
                        onClick={this.redirectToStripeDashboard}
                        className={`${classes.item} ${classes.exclamation} payments`}
                      >
                        <p>Setup your Stripe account</p>
                        {rightBlueArrow}
                      </li>
                    : null
                }
                {
                  isHost && !user.stripe_account_onboard && !user.stripe_id
                    ? <ConnectStripeButton>
                      <li
                        className={`${classes.item} ${classes.exclamation} payments`}
                      >
                        <p>Connect to Stripe</p>
                        <div>
                          <i className="fa fa-exclamation-circle with-margin" />
                        </div>
                        {rightBlueArrow}
                      </li>
                    </ConnectStripeButton> : null
                }
                <li className={`${classes.item} payments`} onClick={this.navigateTo.bind(this, '/payment-method')}>
                  <p>Choose a Payment Method</p>
                  {rightBlueArrow}
                </li>
                <li className={`${classes.item} favorites`} onClick={this.navigateTo.bind(this, '/favorites')}>
                  <p>Favorites</p>
                  {rightBlueArrow}
                </li>
                <li className={`${classes.item} notifications`} onClick={this.navigateTo.bind(this, '/profile/edit-profile-notifications')}>
                  <p>Notifications</p>
                  {rightBlueArrow}
                </li>
                {
                  isSwimmer ? <li
                    className={`${classes.item} present margin-none blue extra-padding`}
                    onClick={this.navigateTo.bind(this, '/profile/referral-info')}>
                    <p className='blue'>Earn free swims!</p>
                    {rightBlueArrow}
                  </li> : null
                }
                {
                  isSwimmer ? <li
                    className={`${classes.item} pool`}
                    onClick={this.goToListYourPool}>
                    <p>List my pool</p>
                    {rightBlueArrow}
                  </li> : null
                }
              </ul>
            </div>
            {/*{*/}
            {/*  isSwimmer && <div>*/}
            {/*    <Typography variant='h2' className={classes.sectionTitle}>REFERRAL</Typography>*/}
            {/*    <ul>*/}
            {/*      <li className={`${classes.item} present border-none blue extra-padding`}*/}
            {/*          onClick={this.navigateTo.bind(this, '/profile/referral-info')}>*/}
            {/*        <p className='blue'>Earn free swims!</p>*/}
            {/*        {rightBlueArrow}*/}
            {/*      </li>*/}
            {/*    </ul>*/}
            {/*  </div>*/}
            {/*}*/}
            <div>
              <Typography variant='h2' className={classes.sectionTitle}>Information</Typography>
              <ul>
                <li>
                  <a className={`${classes.item} link help`} href='https://swimply.zendesk.com/hc/en-us' rel='noopener noreferrer' target='_blank'>
                    <p>Help center</p>
                  </a>
                </li>
                <li className={`${classes.item} contact`} onClick={this.navigateTo.bind(this, '/profile/contact-us')}>
                  <p>Contact us</p>
                  {rightBlueArrow}
                </li>
                <li>
                  <a className={`${classes.item} terms`} href='https://swimply.com/termsandconditions' rel='noopener noreferrer' target='_blank'>
                    <p>Terms of use</p>
                  </a>
                </li>
                <li>
                  <a className={`${classes.item} privacy`} href='https://swimply.com/privacy' rel='noopener noreferrer' target='_blank'>
                    <p>Privacy Policy</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {this.state.loading && <Loader />}
      </Typography>
    )
  }
}

function ProfileContainer (props) {
  const context = useContext(UserContext)
  const { region } = useContext(RegionContext)
  return <Profile region={region} {...context} {...props} />
}


Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
}

Profile.defaultProps = {
  classes: {},
  user: null,
}

const enhance = compose(
  withStyles(styles),
  withRouter,
  withApollo
)

export default enhance(ProfileContainer)