import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import DialogContent from "@material-ui/core/DialogContent"
import Dialog from '@material-ui/core/Dialog'
import { withStyles } from "@material-ui/core/styles"
import { withApollo } from 'react-apollo'
import Button from '@material-ui/core/Button'
import compose from "recompose/compose"
import { loader } from 'graphql.macro'

const savePopupUser = loader('./../../graphql/user/searchPoolLocationSubscribe.graphql')

const styles = theme => ({
  formInputBox: {
    "& label + div ": {
      marginTop: "0",
      marginBottom: "0",
      width: "100%"
    },

    position: "relative",
    marginBottom: "15px",
    "& span": {
      position: "absolute",
      top: "7px",
      bottom: "0",
      margin: "auto",
      height: "0px",
      left: "9px",
      "& img": {
        maxWidth: "20px"
      }
    }
  },
  dialogBoxContainer: {
    padding: "15px 22px 15px",
    display: 'flex',
    justifyContent: 'center',

    "& h3": {
      padding: "15px 22px 15px"
    },
    '& .MuiDialog-paperWidthSm-176': {
      minWidth: '300px'
    },
    '& div.MuiDialog-paperWidthSm-169': {
      minWidth: '300px',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: 'auto',
      borderRadius: '10px',
    },
    '& div div': {
      borderRadius: '10px'
    }
  },
  box: {
    background: '#00b6e7',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    minWidth: '300px',
    maxWidth: '320px',
    borderRadius: '10px',
    '& div': {
      borderRadius: 10
    }
  },
  dialogBox: {
    minWidth: "280px",
    paddingTop: "25px",
    boxSizing: 'border-box',
    '@media (max-width:480px)': {
      minWidth: '200px',
    },
    "& > label": {
      marginBottom: "15px"
    },
    "& a": {
      textDecoration: "none"
    }
  },
  infoSection: {
    width: '95%',
    textAlign: 'center',
    padding: '25px 15px 0',
    color: 'white',
    fontSize: '17px',
    lineHeight: 1.5,
    boxSizing: 'border-box'
  },
  userInfoForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  roundedBtn: {
    borderRadius: 3,
    textTransform: 'none',
    background: 'white',
    margin: '10px 0',
    padding: '8px 16px',
    '&.bigRounded': {
      borderRadius: 23,
      padding: '8px 24px',
      '@media all and (max-width: 360px)': {
        padding: '8px 15px'
      },
      '& .bellIcon': {
        width: '16px',
        height: '16px',
        marginLeft: '15px',
        background: `url(/img/bell.png) no-repeat center/contain`
      }
    },
    '& span': {
      color: '#00b6e7',
      fontSize: '15px'
    },
    '&:hover': {
      background: 'white',
      opacity: 0.9
    },
    '&.hidden': {
      display: 'none'
    }
  },
  formInputContainer: {
    width: '100%',
    margin: '5px 0',
    display: 'flex',
    justifyContent: 'center'
  },
  formInput: {
    width: '85%',
    outline: 'none',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(255, 255, 255, 0.8)',
    padding: '10px',
    boxSizing: 'border-box',
    fontSize: '16px',
    color: 'white',
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.8)'
    }
  },
  skipBtn: {
    background: 'transparent',
    color: 'white',
    textTransform: 'none'
  }
})

class SaveSearchPopup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userEmail: '',
      userPhone: '',
      sending: false
    }
    this.handleInput = this.handleInput.bind(this)
    this.handleIfnoSubmit = this.handleIfnoSubmit.bind(this)
    this.showFieldsOrMakeRequest = this.showFieldsOrMakeRequest.bind(this)
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  showFieldsOrMakeRequest() {
    if (!localStorage.getItem('swimply::access_token') || !localStorage.getItem('swimply::email')) {
      this.setState({
        showInputs: true
      })
    } else {
      this.handleIfnoSubmit()
    }
  }

  async handleIfnoSubmit (event) {
    if (event) {
      event.preventDefault()
    }
    if (!this.state.sending) {
      this.setState({ sending: true }, async () => {
        let email = this.state.userEmail || localStorage.getItem('swimply::email')
        let phone = this.state.userPhone
        if (email) {
          await this.props.client.mutate({
            mutation: savePopupUser,
            variables: {
              data: {
                'email': email,
                'phone': phone,
                'user_id': localStorage.getItem('swimply::user_id') || '', // TODO need to use UserUtils
                'full_address': this.props.userSearchedAddress
              }
            }
          })
          this.props.hidePopupCallback()
        }
      })
    }
  }

  render() {
    const { classes } = this.props
    return (
      <Dialog
        disableRestoreFocus={true}
        open={this.props.showPopup}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.dialogBoxContainer}>
          <div className={classes.box}>
        <Typography className={classes.infoSection} component="p">
          {this.state.showInputs
            ? 'How would you like to be notified?'
            : 'Hey! Would you like us to notify you when a new pool signs up in your area?'
          }
        </Typography>
        <DialogContent className={classes.dialogBox}>
          <div className={classes.userInfoForm}>
            <div className={classes.roundedBtnContainer} onClick={this.showFieldsOrMakeRequest}>
              <Button className={`${classes.roundedBtn} bigRounded ${this.state.showInputs && 'hidden'}`}>Yes! Keep me in the loop<span className='bellIcon'></span></Button>
            </div>
          </div>
          {this.state.showInputs
            ? <form onSubmit={this.handleIfnoSubmit} className={classes.userInfoForm}>
              <div className={classes.formInputContainer}>
                <input type='email' required value={this.state.userEmail} placeholder='email' name='userEmail' onChange={this.handleInput} className={classes.formInput} />
              </div>

              <div className={classes.formInputContainer}>
                <input type='text' value={this.state.userPhone} placeholder='phone number (optional)' name='userPhone' onChange={this.handleInput} className={classes.formInput} />
              </div>
              <Button className={classes.roundedBtn} type='submit'>Done</Button>
            </form>
            : null
          }
          <div className={classes.userInfoForm}>
            <div className={classes.skipBtnContainer}>
              <Button className={classes.skipBtn} onClick={this.props.hidePopupCallback}>Skip</Button>
            </div>
          </div>
        </DialogContent>
        </div>
      </Dialog>
    )
  }
}

SaveSearchPopup.propTypes = {
  classes: PropTypes.object.isRequired,
  showPopup: PropTypes.bool
}

const enhance = compose(
  withStyles(styles),
  withApollo
)

export default enhance(SaveSearchPopup)
