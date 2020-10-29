import React, {Component, useContext} from 'react'
import { FacebookProvider, Login } from 'react-facebook'
import { withRouter } from 'react-router-dom'
import { loader } from 'graphql.macro'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles'
import { withApollo } from 'react-apollo'

// styles
import styles from './styles'

// config
import { FB_APP_ID } from '../../../config'

// utils
import UserUtils from '../../utilities/UserUtils'

// services
import AuthService from '../../../services/auth'

// contexts
import UserContext from '../../../contexts/UserContext'

// graphql
const oauthLogin = loader('../../../graphql/auth/oauthLogin.graphql')

class FacebookButton extends Component {
  state = {
    loading: false
  }

  handleResponse = async (data) => {
    const { tokenDetail: { accessToken } } = data
    await this.loginWithFacebook(accessToken)
  }

  handleError = (error) => {
    console.log('error', error)
    // TODO need to show error message
  }

  loginWithFacebook = async (accessToken) => {
    try {
      this.setState({loading: true}, async () => {
        try {
          const referralToken = UserUtils.getReferralToken()
          const {data: {OauthLogin: login}} = await this.props.client.mutate({
            mutation: oauthLogin,
            variables: {
              data: {
                provider: 'FACEBOOK',
                request: 'auth',
                access_token: accessToken,
                referral_token: referralToken
              }
            },
          })
          this.setState({loading: false}, async () => {
            if (login.status === 'FIELDS_FAILED') {
              // go to facebook sign up screen
              this.props.handleSignUpScreen(login.fields, accessToken, 'FACEBOOK')
            } else if (login.status === 'USER_EXISTS') {
              this.props.showErrorMessage('Seems like you already have an account, try login in')
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
    } catch (e) {
      console.log('error', e.graphQLErrors)
    }
  }

  renderFacebookIcon = () => {
    return <img src={`${window.location.origin}/img/icons/facebook.png`} alt='facebook' />
  }

  render () {
    const { classes } = this.props

    return (
      <FacebookProvider appId={FB_APP_ID}>
        <Login
          scope='email'
          onCompleted={this.handleResponse}
          onError={this.handleError}
        >
          {({ handleClick }) => {
            return (
              <button
                type="button"
                onClick={handleClick}
                className={classes.button}
              >
                <span className={classes.icon}>{this.renderFacebookIcon()}</span>
                <p className={classes.label}>Continue with Facebook</p>
              </button>
            )
          }}
        </Login>
      </FacebookProvider>
    )
  }
}

FacebookButton.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSignUpScreen: PropTypes.func.isRequired,
  handleOauthLogin: PropTypes.func.isRequired,
  showErrorMessage: PropTypes.func.isRequired,
}

FacebookButton.defaultProps = {
  classes: {},
  handleSignUpScreen: () => {},
  handleOauthLogin: () => {},
  showErrorMessage: () => {},
}

const enhance = compose(
  withStyles(styles),
  withRouter,
  withApollo
);

function FacebookButtonContainer (props) {
  const context = useContext(UserContext)
  return <FacebookButton {...context} {...props} />
}

export default enhance(FacebookButtonContainer)

