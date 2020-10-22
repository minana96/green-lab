import React, { Component, useContext } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { withApollo } from 'react-apollo'
import { loader } from 'graphql.macro'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'

// components
import Loader from '../../commons/pageloader'
import HostPlaceholder from '../../shared/host-placeholder'
import ErrorMessage from '../../commons/error-message'
import BackButton from '../../commons/back-button'

// materials component
import { Typography } from '@material-ui/core'

// styles
import styles from './styles'

// utils
import * as commonFunctions from '../../utilities/commonFunctions'
import UserUtils from '../../utilities/UserUtils'

// services
import HelperService from '../../../services/helper'

// contexts
import UserContext from '../../../contexts/UserContext'

// graphql
const createProfileMutation = loader('./../../../graphql/auth/createprofile.graphql')

class EditProfileNotifications extends Component {
  state = {
    loading: false,
    showHostPlaceholder: HelperService.handleHostPlaceholder(),
    message: false,
    notification: false,
    email: false,
    errorMessage: '',
    user: null,
  }

  componentDidMount () {
    this.handleUser()
    if (!UserUtils.getAccessToken()) {
      this.logout()
    }
  }

  componentDidUpdate (prevProps) {
    if (!this.state.user && this.props.user && (this.props.user !== prevProps.user)) {
      this.handleUser()
    }
  }

  handleUser = () => {
    const { user } = this.props
    if (user) {
      this.setState({
        message: user.text_notifications,
        notification: user.push_notification,
        email: user.mail_notifications
      })
    }
  }

  goBack = () => {
    this.props.history.goBack()
  }

  handleErrorMessage = (errorMessage) => {
    this.setState({ errorMessage })
  }

  updateUser = () => {
    this.props.handleUser({
      ...(this.props.user || {}),
      text_notifications: this.state.message,
      push_notification: this.state.notification,
      mail_notifications: this.state.email
    })
  }

  onChange = (field) => {
    this.setState({
      [field]: !this.state[field]
    })
  }

  logout = () => {
    UserUtils.logout()
    this.props.history.replace('/')
  }

  save = async () => {
    this.setState({ loading: true }, async () => {
      try {
        const { data: { createProfile } } = await this.props.client.mutate({
          mutation: createProfileMutation,
          variables: {
            data: {
              image_url: this.props.user.img_url,
              isModify: false,
              push_notification: this.state.notification,
              text_notifications: this.state.message,
              mail_notifications: this.state.email
            },
          },
        })
        if (createProfile.status) {
          this.setState({ loading: false })
          this.updateUser()
          this.goBack()
        } else {
          this.setState({
            loading: false,
            errorMessage: createProfile.message
          })
        }
      } catch (error) {
        const errorMessage = commonFunctions.parseGraphQLErrorMessage(error)
        if (errorMessage === 'Unauthenticated.') {
          const status = await this.props.refreshToken(this.props.history)
          if (status === 'ok') {
            this.save()
          }
        } else {
          this.setState({
            loading: false,
            errorMessage
          })
        }
      }
    })
  }

  render () {
    const { classes } = this.props

    if (this.state.showHostPlaceholder) {
      return <HostPlaceholder withLogout />
    }

    return (
      <Typography variant='body1' component='div'>
        <div className={classes.container}>
          <div className={classes.innerContainer}>
            <div className={`${classes.alignItemsCenter} ${classes.spaceBetween}`}>
              <BackButton />
              <p onClick={this.save} className={`${classes.link}`}>Save</p>
            </div>
            <h2 className={classes.title}>Notifications</h2>
            <ErrorMessage
              message={this.state.errorMessage}
              hide={this.handleErrorMessage.bind(this, '')}
            />
            <ul className={classes.items}>
              <li
                onClick={this.onChange.bind(this, 'message')}
                className={`${classes.item} ${this.state.message ? 'checked' : ''} message`}
              >
                <p>SMS messages</p>
              </li>
              <li
                onClick={this.onChange.bind(this, 'email')}
                className={`${classes.item} ${this.state.email ? 'checked' : ''} email`}
              >
                <p>Email notifications</p>
              </li>
              <li
                onClick={this.onChange.bind(this, 'notification')}
                className={`${classes.item} ${this.state.notification ? 'checked' : ''} notification`}
              >
                <p>Push notifications</p>
              </li>
            </ul>
          </div>
        </div>
        {this.state.loading && <Loader />}
      </Typography>
    )
  }
}

function EditProfileNotificationsContainer (props) {
  const context = useContext(UserContext)
  return <EditProfileNotifications {...context} {...props} />
}

EditProfileNotifications.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
  handleUser: PropTypes.func,
}

EditProfileNotifications.defaultProps = {
  classes: {},
  user: null,
  handleUser: () => {},
}

const enhance = compose(
  withStyles(styles),
  withRouter,
  withApollo
)

export default enhance(EditProfileNotificationsContainer)
