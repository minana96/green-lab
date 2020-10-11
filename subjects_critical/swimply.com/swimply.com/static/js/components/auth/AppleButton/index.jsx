/* global AppleID */
import React, {Component, useContext} from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles'
import { withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { loader } from 'graphql.macro'

// components
import Loader from '../../commons/pageloader'

// contexts
import UserContext from '../../../contexts/UserContext'

// utils
import UserUtils from '../../utilities/UserUtils'

// services
import AuthService from '../../../services/auth'

// styles
import styles from './styles'

// graphql
const oauthLogin = loader('../../../graphql/auth/oauthLogin.graphql')

class AppleButton extends Component {
  state = {
    loading: false
  }

  componentDidMount () {
    document.addEventListener('AppleIDSignInOnSuccess', this.appleIDSignInOnSuccess)
    document.addEventListener('AppleIDSignInOnFailure', this.appleIDSignInOnFailure)
  }

  componentWillUnmount() {
    document.removeEventListener('AppleIDSignInOnSuccess', this.appleIDSignInOnSuccess)
    document.removeEventListener('AppleIDSignInOnFailure', this.appleIDSignInOnFailure)
  }

  appleIDSignInOnSuccess = (data) => {
    this.setState({ loading: true }, async () => {
      try {
        const referralToken = UserUtils.getReferralToken()
        const { data: { OauthLogin: login } } = await this.props.client.mutate({
          mutation: oauthLogin,
          variables: {
            data: {
              provider: 'APPLE',
              request: 'auth',
              id_token: data.detail.authorization.id_token,
              referral_token: referralToken,
              apple_email_allow: true
            }
          },
        })
        this.setState({ loading: false }, async () => {
          if (login.status === 'FIELDS_FAILED') {
            // go to facebook sign up screen
            this.props.handleSignUpScreen(login.fields, data.detail.authorization.id_token, 'APPLE')
          } else if (login.status === 'USER_EXISTS') {
            this.props.showErrorMessage('Seems like you already have an account, try login in.')
          } else if (login.status === 'RETRIEVE_TOKEN_FAILED') {
            this.props.showErrorMessage('Something went wrong.')
          } else if (login.status === 'LOGGED_IN') {
            // handle success login
            AuthService.handleLogin(login, this.props)
            this.props.handleUser()
            this.props.handleOauthLogin()
          }
        })
      } catch (e) {
        console.log('error', e)
      }
    })
  }

  appleIDSignInOnFailure = (error) => {
    console.log('error', error)
    this.setState({ loading: false }, () => {
      if (error.detail.error !== 'popup_closed_by_user') {
        this.props.showErrorMessage('Something went wrong.')
      }
    })
  }

  loginWithApple = () => {
    AppleID.auth.signIn()
  }

  renderAppleIcon = () => {
    return <img src={`${window.location.origin}/img/icons/apple-white.png`} alt='apple' />
  }

  render () {
    const { classes } = this.props
    return (
      <>
        <div className={classes.button} onClick={this.loginWithApple}>
          <span className={classes.icon}>{this.renderAppleIcon()}</span>
          <p className={classes.label}>Continue with Apple</p>
        </div>
        {this.state.loading && <Loader loading />}
      </>
    )
  }
}


AppleButton.propTypes = {
	classes: PropTypes.object.isRequired,
  user: PropTypes.object,
  showErrorMessage: PropTypes.func,
  handleOauthLogin: PropTypes.func,
  handleUser: PropTypes.func,
}

AppleButton.defaultProps = {
  classes: {},
  user: {},
  showErrorMessage: () => {},
  handleOauthLogin: () => {},
  handleUser: () => {},
}

const enhance = compose(
	withStyles(styles),
  withApollo,
  withRouter,
)

function AppleButtonContainer (props) {
  const context = useContext(UserContext)
  return <AppleButton {...context} {...props} />
}

export default enhance(AppleButtonContainer)
