import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { withApollo } from 'react-apollo'
import { loader } from 'graphql.macro'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'

// components
import Loader from '../commons/pageloader'
import InfoPopup from './info-popup'

// materials component
import { Typography, Avatar } from '@material-ui/core'

// utils
import UserUtils from '../utilities/UserUtils'

// styles
import styles from './styles'

// graphql
const getInviter = loader('../../graphql/referral/getInviter.graphql')

class Referral extends Component {
  state = {
    loading: false,
    showInfoPopup: false,
    inviter: null,
  }

  componentDidMount () {
    this.handleUser()
    this.handleReferralCode()
  }

  handleUser = () => {
    const accessToken = UserUtils.getAccessToken()
    if (accessToken) {
      this.props.history.replace('/profile')
    }
  }

  handleReferralCode = () => {
    const query = new URLSearchParams(this.props.location.search)
    const referralCode = query.get('code')
    UserUtils.setReferralToken(referralCode)
    // TODO add request to get inviting user info by got referral code
    this.setState({ loading: true }, async () => {
      try {
        const { data: { getInviter: inviter } } = await this.props.client.query({
          query: getInviter,
          variables: { token: referralCode },
          fetchPolicy: 'network-only'
        })
        this.setState({
          loading: false,
          inviter,
        })
      } catch (e) {
        console.log('error', e)
        this.setState({ loading: false })
      }
    })
  }

  handleInfoPopup = (show) => {
    this.setState({
      showInfoPopup: show
    })
  }

  joinAsSwimmer = () => {
    this.props.history.push('/search')
  }

  joinAsHost = () => {
    this.props.history.push('/listyourpool')
  }

  getProfileImage = (image) => {
    return image ? image : window.location.origin + '/img/profile-icon.png'
  }

  render () {
    const { classes } = this.props

    const firstName = this.state.inviter && this.state.inviter.firstname
    const image = this.state.inviter && this.state.inviter.img_url

    return (
      <Typography variant='body1' component='div'>
        <header className={classes.header}>
          <img src={`${window.location.origin}/img/Swimply-logo-white.png`} alt='Swimply' />
          <h1>Swimply</h1>
        </header>
        <div className={classes.container}>
          <div className={classes.innerContainer}>
            <div className={classes.invitedPersonContainer}>
              <Avatar
                className='avatar'
                src={this.getProfileImage(image)}
                alt='Avatar'
              />
              <p>{firstName} invited you to join Swimply</p>
            </div>
          </div>
          <div className={classes.innerContainer}>
            <h2 className={`${classes.sectionTitle} swimmer`}>A pool of your own-on demand</h2>
            <p className={classes.text}>
              Enjoy private, beautiful pools by the hour and receive a
              <span className={classes.credits}> $5 </span>
              Swimply credit just for signing up!
            </p>
            <p className={classes.text}>
              ({firstName} will receive <span className={classes.credits}>$5</span> too!)
            </p>
            <button
              className={`${classes.button} border`}
              onClick={this.handleInfoPopup.bind(this, true)}
            >
              Discover pools nearby!
            </button>
          </div>
          <div className={`${classes.innerContainer} mobile-without-margin`}>
            <div className={classes.divider} />
          </div>
          <div className={classes.innerContainer}>
            <h2 className={`${classes.sectionTitle} pool`}>Become a Swimply Host</h2>
            <p className={classes.text}>
              Earn an effortless income and become a Summer hero by hosting contact-free reservations on your own terms. 
            </p>
            <p className={classes.bold}>
              Referal bonus: Earn an additional <span className={classes.credits}>$50</span> after your first reservation!
            </p>
            <button
              className={classes.button}
              onClick={this.joinAsHost}
            >
              Learn more and Become a Host
            </button>
          </div>
        </div>
        {
          this.state.showInfoPopup && <InfoPopup
            handlePopup={this.handleInfoPopup}
          />
        }
        {this.state.loading && <Loader />}
      </Typography>
    )
  }
}

Referral.propTypes = {
  classes: PropTypes.object.isRequired,
}

Referral.defaultProps = {
  classes: {},
}

const enhance = compose(
  withStyles(styles),
  withRouter,
  withApollo
)

export default enhance(Referral)