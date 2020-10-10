import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles'
import { withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { loader } from 'graphql.macro'
import ReactTooltip from 'react-tooltip';

// materials components
import {
  TextField,
  Typography,
  DialogContent,
} from '@material-ui/core'

// components
import PageLoader from '../../../commons/pageloader'

// utils
import * as commonFunctions from '../../../utilities/commonFunctions'
import UserUtils from '../../../utilities/UserUtils'

// services
import AuthService from '../../../../services/auth'

// contexts
import UserContext from '../../../../contexts/UserContext'

// styles
import styles from './styles'
import AppContext from "../../../../contexts/AppContext";

const oauthLogin = loader( './../../../../graphql/auth/oauthLogin.graphql' )

class OauthSignUp extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    zipCode: '',
    loading: false,
    emailExist: false,
    firstNameExist: false,
    lastNameExist: false,
    errorMessage: '',
    validation: {
      email: {
        valid: true,
      },
      firstName: {
        valid: true,
      },
      lastName: {
        valid: true,
      },
      phoneNumber: {
        valid: true,
      },
      zipCode: {
        valid: true,
      },
    },
  }

  provider = 'FACEBOOK'
  accessToken = ''

  componentDidMount () {
    this.handleParams()
  }

  componentDidUpdate (prevProps) {
    if (this.props.signUpData !== prevProps.signUpData) {
      this.handleParams()
    }
  }

  handleParams = () => {
    const { fields, accessToken, provider = 'FACEBOOK' } = this.props.signUpData || {}
    this.provider = provider
    this.accessToken = accessToken
    this.setState({
      emailExist: !fields.includes('email'),
      firstNameExist: !fields.includes('firstname'),
      lastNameExist: !fields.includes('lastname'),
    })
  }

  handleChange = (field, { target: { value }}) => {
    this.setState({
      [field]: value
    }, () => {
      this.toggleValid([field], true)
    })
  }

  submit = (event) => {
    event.preventDefault()

    const {
      email,
      firstName,
      lastName,
      phoneNumber,
      zipCode,
      loading,
      emailExist,
      firstNameExist,
      lastNameExist
    } = this.state

    if (loading) {
      return
    }

    const invalidFields = []

    if (!emailExist && !commonFunctions.validateEmail(email)) {
      invalidFields.push('email')
    }

    if (!firstNameExist && !firstName.length) {
      invalidFields.push('firstName')
    }

    if (!lastNameExist && !lastName.length) {
      invalidFields.push('lastName')
    }

    if (phoneNumber.length < 10) {
      invalidFields.push('phoneNumber')
    }

    if (zipCode.length < 4 || zipCode.length > 10){
      invalidFields.push('zipCode')
    }

    if (invalidFields.length) {
      this.toggleValid(invalidFields, false)
      return
    }

    this.setState({
      loading: true
    }, async () => {
      try {
        const referralToken = UserUtils.getReferralToken()
        const data = {
          provider: this.provider,
          request: 'auth',
          zipcode: this.state.zipCode,
          phone_number: this.state.phoneNumber,
          referral_token: referralToken
        }

        if (this.provider === 'FACEBOOK') {
          data.access_token = this.accessToken
        }

        if (this.provider === 'APPLE') {
          data.id_token = this.accessToken
        }

        if (this.state.email) {
          data.email = this.state.email
        }

        if (this.state.firstName) {
          data.firstname = this.state.firstName
        }

        if (this.state.lastName) {
          data.lastname = this.state.lastName
        }

        const { data: { OauthLogin: login } } = await this.props.client.mutate({
          mutation: oauthLogin,
          variables: {
            data
          },
        })

        this.setState({ loading: false }, () => {
          if (login.status.match(/USER_REGISTERED|LOGGED_IN/)) {
            AuthService.handleSignUp(login, this.props)
            this.props.handleUser()
            this.props.handleOauthSignUp(login)
            this.props.toggleJoyspaceModal(true)
          } else if (login.status && login.message) {
            this.setState({ errorMessage: login.message })
          } else {
            this.setState({ errorMessage: 'Something went wrong.' })
          }
        })
      } catch (e) {
        this.setState({ loading: false }, () => {
          const errorMessage = commonFunctions.parseGraphQLErrorMessage(e)
          if (errorMessage.toLowerCase().match(/email already exists/)) {
            this.toggleValid(['email'], false)
          } else if (
            e.graphQLErrors[0]
            && e.graphQLErrors[0].extensions
            && e.graphQLErrors[0].extensions.errors
            && e.graphQLErrors[0].extensions.errors.email
            && e.graphQLErrors[0].extensions.errors.email[0]
          ) {
            this.setState({
              errorMessage: e.graphQLErrors[0].extensions.errors.email[0]
            })
          }
        })
      }
    })
  }

  toggleValid = (fields, valid = true) => {
    const validation = {}
    for (let i = 0; i < fields.length; i++) {
      validation[fields[i]] = { valid }
    }
    this.setState({
      validation: {
        ...this.state.validation,
        ...validation
      }
    })
  }

  handlePhoneNumber = ({ target: { value } }) => {
    const re = /^[0-9\b]+$/
    if (value === '' || re.test( value )) {
      const input = value.substring(0, 13)
      if (input.length < 13) {
        this.setState({
          phoneNumber: value
        }, () => {
          this.toggleValid(['phoneNumber'], true)
        })
      }
    }
  }

  handleCloseError = () => {
    this.setState({
      errorMessage: ''
    })
  }

  render () {
    const { classes } = this.props

    return (
      <div className={classes.container}>
        {this.state.loading && <PageLoader loading />}
        <p onClick={this.props.closePopup} className={classes.modalCloseIcons}>
          <img
            src={`${window.location.origin}/img/close-button.png`}
            alt='Close'
          />
        </p>
        <Typography
          variant='caption'
          component='p'
          className={`${classes.errorMsgClose} ${!this.state.errorMessage ? classes.hidden : ''}`}
        >
          {this.state.errorMessage}
          <i
            className={`fa fa-close ${classes.closeBtn}`}
            onClick={this.handleCloseError}
          />
        </Typography>
        <DialogContent className={classes.dialogBox}>
          {!this.state.firstNameExist && <div className={classes.formInputBox}>
            <Typography variant='subtitle2' component='label'>First Name</Typography>
            <TextField
              id="outlined-first-name-input"
              placeholder='First Name'
              className={this.state.validation.firstName.valid ? classes.textField : classes.errorMessage}
              type='text'
              name='pool'
              margin='normal'
              variant='outlined'
              value={this.state.firstName}
              onChange={this.handleChange.bind(this, 'firstName')}
            />
            <p
              className={this.state.validation.email.valid ? classes.inputTooltip : classes.inputTooltipError}
              data-tip="Doesn't look like a valid email."
            >
              <i className='fa fa-info'/>
            </p>
          </div>}
          {!this.state.lastNameExist && <div className={classes.formInputBox}>
            <Typography variant='subtitle2' component='label'>Last Name</Typography>
            <TextField
              id="outlined-last-name-input"
              placeholder='Last Name'
              className={this.state.validation.lastName.valid ? classes.textField : classes.errorMessage}
              type='text'
              name='pool'
              margin='normal'
              variant='outlined'
              value={this.state.lastName}
              onChange={this.handleChange.bind(this, 'lastName')}
            />
            <p
              className={this.state.validation.email.valid ? classes.inputTooltip : classes.inputTooltipError}
              data-tip="Doesn't look like a valid email."
            >
              <i className='fa fa-info'/>
            </p>
          </div>}
          {!this.state.emailExist && <div className={classes.formInputBox}>
            <Typography variant='subtitle2' component='label'>Email</Typography>
            <TextField
              id='outlined-email-input'
              placeholder='Email'
              className={this.state.validation.email.valid ? classes.textField : classes.errorMessage}
              type='text'
              name='pool'
              margin='normal'
              variant='outlined'
              value={this.state.email}
              onChange={this.handleChange.bind(this, 'email')}
            />
            <p
              className={this.state.validation.email.valid ? classes.inputTooltip : classes.inputTooltipError}
              data-tip="Doesn't look like a valid email."
            >
              <i className='fa fa-info'/>
            </p>
          </div>}

          <div className={classes.formInputBox}>
            <Typography variant='subtitle2' component='label'>PHONE NUMBER</Typography>
            <TextField
              id='outlined-phone-number-input'
              placeholder='Phone Number'
              className={this.state.validation.phoneNumber.valid ? classes.textField : classes.errorMessage}
              type='text'
              name='pool'
              margin='normal'
              variant='outlined'
              value={this.state.phoneNumber}
              onChange={this.handlePhoneNumber}
            />
            <p
              className={this.state.validation.phoneNumber.valid ? classes.inputTooltip : classes.inputTooltipError}
              data-tip="Phone number should be 10-12 digits."
            >
              <i className='fa fa-info'/>
            </p>
          </div>

          <div className={classes.formInputBox}>
            <Typography variant='subtitle2' component='label'>ZIP CODE</Typography>
            <TextField
              id='outlined-zipcode-input'
              placeholder='Zip Code'
              className={this.state.validation.zipCode.valid ? classes.textField : classes.errorMessage}
              type='text'
              name='pool'
              margin='normal'
              variant='outlined'
              value={this.state.zipCode}
              onChange={this.handleChange.bind(this, 'zipCode')}
            />
            <p
              className={this.state.validation.zipCode.valid ? classes.inputTooltip : classes.inputTooltipError}
              data-tip="Doesn't look like a valid Zip Code."
            >
              <i className='fa fa-info'/>
            </p>
          </div>
          <div className={classes.signupBtn} onClick={this.submit}>
            <Typography variant='button'>
              Next
            </Typography>
          </div>
        </DialogContent>
        <ReactTooltip place='top' className={classes.toolTipForms} type='error' effect='solid' />
      </div>
    )
  }
}

OauthSignUp.propTypes = {
  classes: PropTypes.object.isRequired,
  signUpData: PropTypes.object.isRequired,
  closePopup: PropTypes.func.isRequired,
  handleOauthSignUp: PropTypes.func.isRequired,
}

OauthSignUp.defaultProps = {
  classes: {},
  signUpData: {
    fields: [],
    provider: 'FACEBOOK',
    accessToken: '',
  },
  closePopup: () => {},
  handleOauthSignUp: () => {},
}

const enhance = compose(
  withStyles(styles),
  withRouter,
  withApollo,
);

function OauthSignUpContainer (props) {
  const appContext = useContext(AppContext)
  const context = useContext(UserContext)
  return <OauthSignUp {...context} {...appContext} {...props} />
}

export default enhance(OauthSignUpContainer)
