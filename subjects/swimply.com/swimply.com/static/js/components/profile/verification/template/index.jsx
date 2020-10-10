import React, {Component, useContext} from 'react'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { withApollo } from 'react-apollo'
import { loader } from 'graphql.macro'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'

// components
import HostPlaceholder from '../../../shared/host-placeholder'
import BackButton from '../../../commons/back-button'
import ProgressBar from '../../../commons/progress-bar'
import ErrorMessage from '../../../commons/error-message'
import Loader from '../../../commons/pageloader'

// services
import HelperService from '../../../../services/helper'

// utils
import * as commonFunctions from '../../../utilities/commonFunctions'
import UserUtils from '../../../utilities/UserUtils'

// contexts
import UserContext from '../../../../contexts/UserContext'

// materials component
import { Typography } from '@material-ui/core'

// styles
import styles from './styles'

// graphql
const saveUserVerifications = loader('../../../../graphql/verification/saveUserVerifications.graphql')

class Verification extends Component {
  state = {
    loading: false,
    showHostPlaceholder: HelperService.handleHostPlaceholder(),
    image: null,
    modified: false,
    errorMessage: '',
  }

  dataWasLoaded = false
  imageInput = React.createRef()

  componentDidMount () {
    this.handleData()
  }

  componentDidUpdate (prevProps) {
    if (!this.dataWasLoaded && this.props.user !== prevProps.user) {
      this.handleData()
    }
  }

  handleData = () => {
    const { user, step } = this.props
    if (user && (step === 1 || step === 2) && user.verifications && user.verifications[0]) {
      this.dataWasLoaded = true
      this.setState({
        image: step === 1 ? user.verifications[0].passport_drive_url : user.verifications[0].pool_proof_url
      })
    }
  }

  handleImage = () => {
    const file = this.imageInput.files[0]
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onloadend = () => {
        const base64string = reader.result
        const fileName = file.name
        const fileSize = file.size
        const imageSize = fileSize / 1024 / 1024

        const extensionIsValid = /jpg|jpeg|png|gif/.test(fileName.toLowerCase())

        if (extensionIsValid) {
          if (imageSize < 5) {
            this.setState({
              image: base64string,
              modified: true,
              errorMessage: ''
            })
          } else {
            this.setState( {
              errorMessage: 'Image size should be less than 5MB.',
            })
          }
        } else {
          this.setState({
            errorMessage: 'The image must be a valid type.',
          })
        }
      }
    }
  }

  triggerImageInput = () => {
    this.imageInput.click()
  }

  handleErrorMessage = (errorMessage) => {
    this.setState({ errorMessage })
  }

  goBack = () => {
    this.props.history.goBack()
  }

  logout = () => {
    UserUtils.logout()
    this.props.history.replace('/')
  }

  getPercentageByStep = (step) => {
    switch (step) {
      case 1:
        return 0
      case 2:
        return 33.33
      case 3:
        return 66.66
      default:
        return 0
    }
  }

  handleDisable = () => {
    return !this.state.image && (this.props.step === 1 || this.props.step === 2)
  }

  goToNext = () => {
    this.props.history.goBack()
  }

  handleUser = () => {
    const { user, step } = this.props
    const verifications = (user.verifications && user.verifications[0]) ? user.verifications[0] : {}
    if (step === 1) {
      verifications.passport_drive_url = this.state.image
    } else {
      verifications.pool_proof_url = this.state.image
    }
    this.props.handleUser({
      ...user,
      verifications: [verifications],
    })
  }

  upload = () => {
    this.setState({ loading: true }, async () => {
      try {
        const data = {
          step: this.props.step,
          user_id: this.props.user && this.props.user.id,
        }

        if (this.props.step === 1) {
          data.passport_drive_url = this.state.image
        } else {
          data.pool_proof_url = this.state.image
        }

        const { data: { saveUserVerifications: result } } = await this.props.client.mutate({
          mutation: saveUserVerifications,
          variables: { data }
        })

        if (result.status) {
          this.handleUser()
          this.setState({
            loading: false,
            errorMessage: ''
          }, this.goToNext)
        } else {
          this.setState({
            loading: false,
            errorMessage: result.message
          })
        }
      } catch (e) {
        console.log('error', e)
        const errorMessage = commonFunctions.parseGraphQLErrorMessage(e)
        if (errorMessage === 'Unauthenticated.') {
          const status = await this.props.refreshToken(this.props.history)
          if (status === 'ok') {
            this.upload()
          }
        } else {
          this.setState({
            loading: false,
            errorMessage: 'Something went wrong.'
          })
        }
      }
    })
  }

  submit = () => {
    if (this.props.step === 1 || this.props.step === 2) {
      if (this.state.image && !this.state.modified) {
        this.goToNext()
      } else {
        this.upload()
      }
    } else {
      this.props.history.goBack()
      // const hostWithPool = this.props.user && this.props.user.last_pool_id
      // this.props.history.push(hostWithPool ? '/host' : '/hostprompt')
    }
  }

  getButtonText = () => {
    const { step } = this.props
    if (step === 1 || step === 2) {
      if (this.state.image && !this.state.modified) {
        return 'Next'
      } else {
        return 'Upload'
      }
    } else {
      return 'Next'
      // return 'List my pool'
    }
  }

  renderUploadImage = () => {
    const { classes, step } = this.props
    const isFirstStep = step === 1
    return (
      <div onClick={this.triggerImageInput}>
        <div
          className={classes.uploadImageContainer}
          style={{ backgroundImage: this.state.image ? `url(${this.state.image})` : '' }}
        >
          <p className={`${classes.uploadImageText} ${isFirstStep ? 'passport' : 'owner'} ${this.state.image ? 'hidden' : ''}`}>
            {
              isFirstStep
                ? `+ Upload Driver's License or Passport Photo`
                : `+ Upload proof of ownership`
            }
          </p>
        </div>
        <p className={classes.alertMessage}>
          This will be store securely and will not be shared
        </p>
      </div>
    )
  }

  render () {
    const { classes, title, description, step } = this.props

    if (this.state.showHostPlaceholder) {
      return <HostPlaceholder withLogout />
    }

    return (
      <Typography variant='body1' component='div'>
        <div className={classes.container}>
          <div className={`${classes.innerContainer} ${classes.paddingHorizontal}`}>
            <div className={`${classes.alignItemsCenter}`}>
              <BackButton />
            </div>
            <div className={classes.marginVertical}>
              <ProgressBar percentage={this.getPercentageByStep(step)} />
            </div>
            <ErrorMessage
              message={this.state.errorMessage}
              hide={this.handleErrorMessage.bind(this, '')}
            />
            <h2 className={classes.title}>{title}</h2>
            <p className={`${classes.text} ${classes.marginBottom}`}>{description}</p>
            {
              step === 1 || step === 2 ? this.renderUploadImage() : null
            }
            <div className={classes.marginTop}>
              <button
                onClick={this.submit}
                className={classes.button}
                disabled={this.handleDisable()}
              >
                {this.getButtonText()}
              </button>
            </div>
          </div>
          <input
            ref={r => this.imageInput = r}
            type='file'
            accept='image/*'
            onChange={this.handleImage}
            className={classes.hiddenInput}
          />
        </div>
        {this.state.loading && <Loader />}
      </Typography>
    )
  }
}


Verification.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired,
}

Verification.defaultProps = {
  classes: {},
  title: '',
  description: '',
  step: 0,
}

const enhance = compose(
  withStyles(styles),
  withRouter,
  withApollo
)

function VerificationContainer (props) {
  const context = useContext(UserContext)
  return <Verification {...context} {...props} />
}

export default enhance(VerificationContainer)
