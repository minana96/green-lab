import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'
import compose from 'recompose/compose'
import { loader } from 'graphql.macro'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import * as commonFunctions from '../../utilities/commonFunctions'
import UserUtils from '../../utilities/UserUtils'
import Pageloader from '../../commons/pageloader'

// styles
import styles from './styles'
import { withApollo } from "react-apollo"
import UserContext from "../../../contexts/UserContext";

const getProfileDetails = loader('./../../../graphql/user/me.graphql')
const createProfileMutation = loader('./../../../graphql/auth/createprofile.graphql')

class EditProfilePopup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      description: '',
      profileImage: '',
      showDescriptionError: false,
      showProfileImageError: false,
      showFormErrorMessage: false,
      imageError: '',
      loading: false,
      successMessage: '',
      profileFailError: '',
      isModify: false,
      deleteAlert: false,
      completeProfileText: ''
    }
    this.setCoverImages = this.setCoverImages.bind(this)
    this.handleDeleteProfileImage = this.handleDeleteProfileImage.bind(this)
    this.handleDeleteProfileImageConfirm = this.handleDeleteProfileImageConfirm.bind(this)
    this.closeAlertPopup = this.closeAlertPopup.bind(this)
    this.handleInputs = this.handleInputs.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
    this.triggerProfileImage = this.triggerProfileImage.bind(this)
    this.cancel = this.cancel.bind(this)
    this.setCompleteProfileText = this.setCompleteProfileText.bind(this)
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = () => { // refactored
    const accessToken = UserUtils.getAccessToken()
    if (accessToken) {
      this.setState({ loading: true }, async () => {
        try {
          const { data: { me: user }} = await this.props.client.query({
            query: getProfileDetails,
            fetchPolicy: 'network-only',
          })

          this.setState({
            profileImage: user.img_url || '',
            description: user.description || '',
            loading: false,
          }, () => {
            this.setCompleteProfileText(user.img_url, user.description)
            UserUtils.setUserID(user.id)
            UserUtils.setUserCountry(user.country_code)
            UserUtils.setSwimmerCountry(user.country_code_swimmer)
            UserUtils.setLastPoolId(user.last_pool_id)
          })
        } catch (e) {
          const errorMsg = commonFunctions.parseGraphQLErrorMessage(e)
          this.setState({ loading: false }, async () => {
            if (errorMsg === 'Unauthenticated.') {
              const status = await this.props.refreshToken(this.props.history)
              if (status === 'ok') {
                this.getProfileDetails()
              }
            }
          })
        }
      })
    }
  }

  setCompleteProfileText (profileImage, description) {
    let completeProfileText = ''
    description = description || ''
    if (this.props.isDefaultInstantBooking) {
      if (!profileImage && (!description || description.length < 15)) {
        completeProfileText = 'To complete your reservation, this host requires a Profile picture and Bio (min 15 characters). Show your good side!'
      } else if (!profileImage) {
        completeProfileText = 'To complete your reservation, this host requires a Profile picture. Show your good side!'
      } else if (description.length < 15) {
        completeProfileText = 'To complete your reservation, this host requires a Bio (min 15 characters). Show your good side!'
      }
    } else {
      if (!profileImage && (!description || description.length < 15)) {
        completeProfileText = 'Most hosts only approve reservations from guests with a profile picture and bio (min 15 characters).'
      } else if (!profileImage) {
        completeProfileText = 'Most hosts only approve reservations from guests with a profile picture.'
      } else if (description.length < 15) {
        completeProfileText = 'Most hosts only approve reservations from guests with a bio (min 15 characters).'
      }
    }
    this.setState({
      completeProfileText: completeProfileText
    })
  }

  triggerProfileImage() {
    this.refs.coverImage.click()
  }

  setCoverImages() {
    const file = this.refs.coverImage.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    let extension = ''
    reader.onloadend = function (e) {
      const base64string = reader.result
      const filename = file.name
      const filesize = file.size
      const imageSize = filesize / 1024 / 1024

      if (filename.indexOf('png') !== -1 || filename.indexOf('PNG') !== -1) {
        extension = 'png'
      } else if (filename.indexOf('jpg') !== -1 || filename.indexOf('jpeg') !== -1) {
        extension = 'jpg'
      } else if (filename.indexOf('gif') !== -1 || filename.indexOf('GIF') !== -1) {
        extension = 'gif'
      }
      if ((extension === 'jpg' || extension === 'png' || extension === 'gif') && extension !== null && extension !== '' && extension !== undefined) {
        if (imageSize < 5) {
          this.setState({
            profileImage: base64string,
            isModify: true,
            imageError: '',
            showProfileImageError: false,
          })
        } else {
          this.setState({
            imageError: 'Image size should be less than 5MB.',
            profileImage: '',
            showProfileImageError: true,
          })
        }
      } else {
        this.setState({
          imageError: 'Uploaded file is not a valid image. Only JPG, PNG and GIF files are allowed.	',
          profileImage: '',
          showProfileImageError: true,
        })
      }
    }.bind(this)
  }

  handleDeleteProfileImage() {
    this.setState({ deleteAlert: true })
  }

  handleDeleteProfileImageConfirm() {
    this.setState({
      profileImage: '',
      deleteAlert: false,
    })
  }

  closeAlertPopup() {
    this.setState({ deleteAlert: false })
  }

  handleInputs(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  validateDescription() {
    const { description, showFormErrorMessage } = this.state

    let hasError = false
    if (commonFunctions.isEmpty(description) || description.length < 15) {
      hasError = true
    }
    this.setState({
      showDescriptionError: (hasError === true),
      showFormErrorMessage: (showFormErrorMessage === true) && false,
    })
    return hasError !== true
  }

  validateProfileImage() {
    const { profileImage, showFormErrorMessage } = this.state

    let hasError = false
    if (commonFunctions.isEmpty(profileImage)) {
      hasError = true
    }
    this.setState({
      showProfileImageError: (hasError === true),
      showFormErrorMessage: (showFormErrorMessage === true) && false,
    })
    return hasError !== true
  }

  validateForm() {
    let hasError = false
    if (!this.validateDescription()) {
      hasError = true
    }
    if (!this.validateProfileImage()) {
      hasError = true
    }
    this.setState({
      showFormErrorMessage: (hasError === true),
    })
    return hasError !== true
  }

  submitHandler() {
    const { description, profileImage, isModify } = this.state
    if (!this.validateForm()) {
      return
    }
    this.setState({ loading: true })
    const data = {
      description,
      image_url: profileImage,
      isModify,
    }
    this.props.client.mutate({
          mutation: createProfileMutation,
          variables: {
            data,
          },
        })
        .then((res) => {
          this.setState({
            loading: false,
            successMessage: 'Profile updated successfully.',
          })

          this.props.handlePopup(false, true)
          this.props.setButtonActiveCallback()

        }).catch(async (error) => {
      const errorMsg = commonFunctions.parseGraphQLErrorMessage(error)
      this.setState({
        profileFailError: errorMsg,
        loading: false,
      })
      if (errorMsg === 'Unauthenticated.') {
        const status = await this.props.refreshToken(this.props.history)
        if (status === 'ok') {
          this.submitHandler()
        }
      }
    })
  }

  cancel() {
    this.props.handlePopup(false)
    this.props.setButtonActiveCallback()
  }

  render() {
    const { classes } = this.props
    const {
      profileImage, description, profileFailError, showDescriptionError, showProfileImageError, loading, successMessage, imageError, completeProfileText
    } = this.state

    return (
        <Dialog keepMounted open>
          <DialogContent className={classes.popupContainer}>
            <Typography variant="body1" component="div">
              {loading === true ? <Pageloader loading={loading}/> : ''}
              <div>
                <Typography variant="h2" className={classes.subTitle}>Update Profile </Typography>
                <Typography variant="subtitle1" component="p">
                  {completeProfileText}
                </Typography>
                <div className={classes.EditProfilePopup}>
                  <div className={classes.uploadInput}>
                    <Avatar
                        onClick={this.triggerProfileImage}
                        alt=""
                        src={profileImage === '' ? window.location.origin + '/img/profile-icon.png' : profileImage}
                        className={showProfileImageError === false ? classes.bigAvatar : classes.bigAvatarError}
                    />

                    {profileImage === '' ? ''
                        : <i className="fa fa-trash" onClick={this.handleDeleteProfileImage}/>}
                    <input
                        ref="coverImage"
                        type="file"
                        name="coverImage"
                        onChange={this.setCoverImages}
                    />
                  </div>
                  <p>Upload new photo</p>
                </div>
                <div>
                  {imageError === '' ? '' :
                      <Typography variant="caption" component="p">{imageError}</Typography>}
                  {successMessage === '' ? ''
                      : <Typography variant="overline" component="p">{successMessage}</Typography>}
                  {profileFailError === '' ? ''
                      : <Typography variant="caption" component="p">{profileFailError}</Typography>}
                  <div className={classes.formInputBox}>
                    <Typography variant="subtitle2" component="label">Tell us about yourself</Typography>
                    <TextField
                        id="description"
                        className={showDescriptionError === false ? classes.textFieldTwo : classes.textFieldTwoError}
                        placeholder="Min 15 characters"
                        type="text"
                        name="description"
                        autoComplete=""
                        margin="normal"
                        variant="outlined"
                        multiline
                        rows={4}
                        rowsMax={4}
                        onInput={(e) => {
                          e.target.value = e.target.value.slice(0, 140)
                        }}
                        value={description}
                        onChange={this.handleInputs}
                    />
                  </div>
                  <div className={classes.buttonsContainer}>
                    <Typography
                        variant="button"
                        className={classes.okButton}
                        onClick={this.submitHandler}
                    >
                      Save Changes
                    </Typography>
                    <Typography
                        variant='button'
                        className={classes.cancelButton}
                        onClick={this.cancel}
                    >
                      Cancel
                    </Typography>
                  </div>
                </div>

              </div>
              <Dialog
                  open={this.state.deleteAlert}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  className={classes.deletePopup}
              >
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete profile photo?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Typography variant="button" onClick={this.handleDeleteProfileImageConfirm} autoFocus>
                    yes
                  </Typography>
                  <Typography variant="button" onClick={this.closeAlertPopup}>
                    no
                  </Typography>

                </DialogActions>
              </Dialog>
            </Typography>
          </DialogContent>
        </Dialog>
    )
  }
}

EditProfilePopup.propTypes = {
  classes: PropTypes.object.isRequired,
}

const enhance = compose(
    withStyles(styles, { withTheme: true }),
    withApollo,
)

function EditProfilePopupContainer (props) {
  const context = useContext(UserContext)
  return <EditProfilePopup {...context} {...props} />
}

export default enhance(EditProfilePopupContainer)
