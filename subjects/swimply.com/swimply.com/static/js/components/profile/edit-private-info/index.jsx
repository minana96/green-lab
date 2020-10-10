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
import BackButton from '../../commons/back-button'
import FloatingLabelInput from '../../commons/floating-label-input'
import ErrorMessage from '../../commons/error-message'

// materials component
import { Typography } from '@material-ui/core'

// contexts
import UserContext from '../../../contexts/UserContext'

// services
import HelperService from '../../../services/helper'

// styles
import styles from './styles'

// utils
import * as commonFunctions from '../../utilities/commonFunctions'
import UserUtils from '../../utilities/UserUtils'

// graphql
const createProfileMutation = loader('./../../../graphql/auth/createprofile.graphql')
const manageLoginMutation = loader('./../../../graphql/auth/managelogin.graphql')
const verifyPasswordQuery = loader('./../../../graphql/auth/verifypassword.graphql')

class EditPrivateInfo extends Component {
  state = {
    loading: false,
    showHostPlaceholder: HelperService.handleHostPlaceholder(),
    errorMessage: '',
    email: '',
    password: '',
    phoneNumber: '',
    currentPassword: '',
    newPassword: '',
    user: null
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
    const {user} = this.props
    this.setState({
      password: (user && user.password) || '',
      phoneNumber: (user && user.phone_number) || '',
      email: (user && user.email) || '',
      user,
    })
  }

  logout = () => {
    UserUtils.logout()
    this.props.history.replace('/')
  }

  goBack = () => {
    this.props.history.goBack()
  }

  handleErrorMessage = (errorMessage) => {
    this.setState({ errorMessage })
  }

  onChange = (field, { target: { value }}) => {
    this.setState({
      [field]: value,
    })
  }

  onChangePhoneNumber = ({ target: { value }}) => {
    const re = /^[0-9\b]+$/
    if (value === '' || re.test(value)) {
      const input = value.substring(0, 13)
      if (input.length < 13) {
        this.setState({ phoneNumber: value })
      }
    }
  }

  updateUser = () => {
    this.props.handleUser({
      ...(this.props.user || {}),
      email: this.state.email,
      phone_number: this.state.phoneNumber,
    })
  }

  validation = async () => {
    const { phoneNumber, email, currentPassword, newPassword } = this.state

    if (!commonFunctions.validateEmail(email)) {
      throw new Error('Enter valid email address.')
    }

    if (phoneNumber.length < 10) {
      throw new Error('Enter valid mobile number.')
    }

    if (commonFunctions.isEmpty(newPassword)) {
      return
    }

    if (commonFunctions.isEmpty(currentPassword)) {
      throw new Error('Please give current password.')
    }

    if (!(await this.validateCurrentPassword(currentPassword))) {
      throw new Error('Invalid current password.')
    }

    if (!commonFunctions.isEmpty(currentPassword) && !commonFunctions.isValidPassword(newPassword)) {
      throw new Error('Invalid new password.')
    }
  }

  validateCurrentPassword = async (currentPassword) => {
    try {
      const { data: { verifyPassword }} = await this.props.client.query({
        query: verifyPasswordQuery,
        variables: { old_password: currentPassword },
        fetchPolicy: 'network-only'
      })

      return verifyPassword.status === 'true'
    } catch (e) {
      return false
    }
  }

  save = async () => {
    this.validation()
      .then(() => {
        this.setState({ loading: true }, async () => {
          try {
            if (this.state.newPassword) {
              const { data: { manageLogin } } = await this.props.client.mutate({
                mutation: manageLoginMutation,
                variables: {
                  data: {
                    email: this.state.email,
                    password: this.state.newPassword
                  }
                },
              })
              if (!manageLogin.status) {
                this.setState({
                  loading: false,
                  errorMessage: manageLogin.message
                })
                return
              }
            }

            const { data: { createProfile } } = await this.props.client.mutate({
              mutation: createProfileMutation,
              variables: {
                data: {
                  email: this.state.email,
                  firstname: this.props.user.firstname,
                  lastname: this.props.user.lastname,
                  image_url: this.props.user.img_url,
                  phone_number: this.state.phoneNumber,
                  isModify: false,
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
            let errorMessage = commonFunctions.parseGraphQLErrorMessage(error)
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
      })
      .catch((error) => {
        this.setState({
          errorMessage: typeof error.message === 'string' ? error.message : 'Something went wrong.'
        })
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
              <BackButton/>
              <p onClick={this.save} className={`${classes.link}`}>Save</p>
            </div>
            <h2 className={classes.title}>Edit private information</h2>
            <ErrorMessage
              message={this.state.errorMessage}
              hide={this.handleErrorMessage.bind(this, '')}
            />
            {/* to disable autocomplete on inputs with password type */}
            <input type='password' className={classes.hidden} />
            <FloatingLabelInput
              type='text'
              onChange={this.onChange.bind(this, 'email')}
              value={this.state.email}
              label='EMAIL'
              id='email'
              focused
            />
            <FloatingLabelInput
              type='text'
              onChange={this.onChangePhoneNumber}
              value={this.state.phoneNumber}
              label='PHONE NUMBER'
              id='phoneNumber'
              focused
            />
            <FloatingLabelInput
              type='password'
              onChange={this.onChange.bind(this, 'currentPassword')}
              value={this.state.currentPassword}
              label='CURRENT PASSWORD'
              id='currentPassword'
            />
            <FloatingLabelInput
              type='password'
              onChange={this.onChange.bind(this, 'newPassword')}
              value={this.state.newPassword}
              label='NEW PASSWORD'
              id='newPassword'
            />
          </div>
        </div>
        {this.state.loading && <Loader />}
      </Typography>
    )
  }
}

function EditPrivateInfoContainer (props) {
  const context = useContext(UserContext)
  return <EditPrivateInfo {...context} {...props} />
}


EditPrivateInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
}

EditPrivateInfo.defaultProps = {
  classes: {},
  user: null,
}

const enhance = compose(
  withStyles(styles),
  withRouter,
  withApollo
)

export default enhance(EditPrivateInfoContainer)
