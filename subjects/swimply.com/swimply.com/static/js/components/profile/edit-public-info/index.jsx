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
import TextArea from '../../commons/text-area'
import ErrorMessage from '../../commons/error-message'

// materials component
import { Typography, Avatar, DialogContent, Dialog } from '@material-ui/core'

// contexts
import UserContext from '../../../contexts/UserContext'

// styles
import styles from './styles'

// services
import HelperService from '../../../services/helper'

// utils
import * as commonFunctions from '../../utilities/commonFunctions'
import UserUtils from '../../utilities/UserUtils'

// graphql
const createProfileMutation = loader('./../../../graphql/auth/createprofile.graphql')

class EditPublicInfo extends Component {
  state = {
    loading: false,
    showHostPlaceholder: HelperService.handleHostPlaceholder(),
    isModify: false,
    errorMessage: '',
    image: '',
    firstName: '',
    lastName: '',
    bio: '',
    user: null,
    showProfileImagePopup: false,
  }

  imageInput = React.createRef()

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
    this.setState({
      image: (user && user.img_url) || '',
      firstName: (user && user.firstname) || '',
      lastName: (user && user.lastname) || '',
      bio: (user && user.description) || '',
      user,
    })
  }

  goBack = () => {
    this.props.history.goBack()
  }

  getProfileImage = () => {
    return this.state.image ? this.state.image : window.location.origin + '/img/profile-icon.png'
  }

  handleImage = () => {
    const file = this.imageInput.files[0]
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
            isModify: true,
          })
        } else {
          this.setState( {
            errorMessage: 'Image size should be less than 5MB.',
          })
        }
      } else {
        this.setState({
          errorMessage: 'Image size should be less than 5MB.',
        })
      }
    }
  }

  triggerImageInput = () => {
    this.imageInput.click()
  }

  handleErrorMessage = (errorMessage) => {
    this.setState({ errorMessage })
  }

  onChange = (field, { target: { value }}) => {
    this.setState({
      [field]: value
    })
  }

  updateUser = () => {
    this.props.handleUser({
      ...(this.props.user || {}),
      firstname: this.state.firstName,
      lastname: this.state.lastName,
      description: this.state.bio,
      img_url: this.state.image,
    })
  }

  validation = async () => {
    const { firstName, lastName } = this.state

    if (commonFunctions.isEmpty(firstName)) {
      throw new Error('Please enter first name.')
    }

    if (commonFunctions.isEmpty(lastName)) {
      throw new Error('Please enter last name.')
    }
  }

  logout = () => {
    UserUtils.logout()
    this.props.history.replace('/')
  }

  newProfileImage = () => {
    this.setState({
      showProfileImagePopup: false
    }, this.triggerImageInput)
  }

  removeProfileImage = () => {
    this.setState({
      image: '',
      isModify: true,
      showProfileImagePopup: false,
    })
  }

  handleProfileImagePopup = (show) => {
    this.setState({
      showProfileImagePopup: show
    })
  }

  save = async () => {
    this.validation()
      .then(() => {
        this.setState({ loading: true }, async () => {
          try {
            const { data: { createProfile } } = await this.props.client.mutate({
              mutation: createProfileMutation,
              variables: {
                data: {
                  firstname: this.state.firstName,
                  lastname: this.state.lastName,
                  description: this.state.bio,
                  image_url: this.state.image,
                  isModify: this.state.isModify,
                  phone_number: this.props.user.phone_number,
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
              <BackButton />
              <p onClick={this.save} className={`${classes.link}`}>Save</p>
            </div>
            <h2 className={classes.title}>Edit public information</h2>
            <ErrorMessage
              message={this.state.errorMessage}
              hide={this.handleErrorMessage.bind(this, '')}
            />
            <div className={classes.alignItemsCenter}>
              <div className={classes.avatarContainer} onClick={this.handleProfileImagePopup.bind(this, true)}>
                <Avatar
                  className={classes.avatar}
                  src={this.getProfileImage()}
                  alt='Host Avatar'
                />
              </div>
              <p onClick={this.handleProfileImagePopup.bind(this, true)} className={classes.link}>Edit profile picture</p>
            </div>
            <FloatingLabelInput
              type='text'
              onChange={this.onChange.bind(this, 'firstName')}
              value={this.state.firstName}
              label='FIRST NAME'
              id='firstName'
              focused
            />
            <FloatingLabelInput
              type='text'
              onChange={this.onChange.bind(this, 'lastName')}
              value={this.state.lastName}
              label='LAST NAME'
              id='lastName'
              focused
            />
            <TextArea
              onChange={this.onChange.bind(this, 'bio')}
              value={this.state.bio}
              label='BIO'
              id='bio'
            />
          </div>
        </div>
        {this.state.loading && <Loader />}
        {this.state.showProfileImagePopup && <Dialog keepMounted open>
          <DialogContent className={classes.popupContainer}>
            <Typography variant='body1' component='div'>
              <h2 className={`${classes.subTitle}`}>
                Change Profile Photo
              </h2>
              <p onClick={this.newProfileImage}>New Profile Photo</p>
              {this.state.image && <p onClick={this.removeProfileImage}>Remove Profile Photo</p>}
              <p onClick={this.handleProfileImagePopup.bind(this, false)}>Cancel</p>
            </Typography>
          </DialogContent>
        </Dialog>}
        {/* hidden image input */}
        <input
          ref={r => this.imageInput = r}
          type='file'
          accept='image/*'
          onChange={this.handleImage}
          className={classes.imageCoverInput}
        />
      </Typography>
    )
  }
}

function EditPublicInfoContainer (props) {
  const context = useContext(UserContext)
  return <EditPublicInfo {...context} {...props} />
}


EditPublicInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
}

EditPublicInfo.defaultProps = {
  classes: {},
  user: null,
}

const enhance = compose(
  withStyles(styles),
  withRouter,
  withApollo
)

export default enhance(EditPublicInfoContainer)
