import React, { Component } from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import update from 'immutability-helper'

// materials components
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'
import Slide from '@material-ui/core/Slide'
import Fade from '@material-ui/core/Fade'

// styles
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

class SendRequestsPopup extends Component {
  state = {
    show: true,
    disabled: true,
    data: [
      {
        title: `You'll only have 12 hours to respond to requests without penalty and 3 hours for any reservations that are for within 24 hours.`,
        checked: false
      },
      {
        title: `Guests may request up to 3 pools at a time and will only be charged for the first pool that approves.`,
        checked: false
      },
      {
        title: `Your listing will be ranked lower in search, so you may get fewer reservations.`,
        checked: false
      },
      {
        title: `You'll lose some host protection and controls, including penalty-free cancellations if you're uncomfortable with a reservation.`,
        checked: false
      },
    ]
  }

  close = () => {
    this.setState({
      show: false
    })
  }

  renderImage = (checked = false) => {
    const imageSrc = checked ? '/img/Check-Checked.png' : '/img/Check-Unchecked.png'
    return <img alt='Checkbox' src={imageSrc} className={this.props.classes.checkbox}/>
  }

  renderLabel = (title) => {
    return (
      <div>
        <p>{title}</p>
      </div>
    )
  }

  handleCheckbox = (index) => {
    this.setState({
      data: update(this.state.data, {
        [index]: {
          checked: { $set: !this.state.data[index].checked }
        }
      })
    }, () => {
      const disabled = !!this.state.data.find(item => !item.checked)
      this.setState({ disabled })
    })
  }

  submit = () => {
    this.props.goToNextScreen('showRequestsInstructionScreen', false)
  }

  render () {
    const { classes } = this.props
    const fullScreen = window.innerWidth < 600
    const AnimateComponent = fullScreen ? Slide : Fade
    const animateProps = fullScreen ? { direction: 'up' } : { }

    return (
      <Dialog
        style={{ backgroundColor: 'transparent' }}
        fullScreen={fullScreen}
        open
      >
        <AnimateComponent in={this.state.show} onExited={this.props.handlePopup.bind(null, false)} {...animateProps}>
          <DialogContent>
            <span className={classes.closeButton} onClick={this.close}>
              <img src='/img/close-button.png' alt='Close icon'/>
            </span>
            <Typography variant='body1' component='div'>
              <div className={classes.container}>
                <Typography variant='h3'>Are you sure you want guests to send requests?</Typography>
                <div className={classes.formContainer}>
                  <p className={classes.subTitle}>Check to confirm you understand:</p>
                  <FormControl component='fieldset'>
                    {
                      this.state.data.map((item, index) =>
                        <FormControlLabel
                          value={index}
                          key={`label-${index}`}
                          control={
                            <Radio
                              checked={item.checked}
                              icon={this.renderImage(false)}
                              checkedIcon={this.renderImage(true)}
                              onClick={this.handleCheckbox.bind(null, index)}
                            />
                          }
                          label={this.renderLabel(item.title)}
                        />
                      )
                    }
                  </FormControl>
                </div>
                <div className={classes.buttonContainer}>
                  <Button disabled={this.state.disabled} onClick={this.submit}>Ok</Button>
                </div>
              </div>
            </Typography>
          </DialogContent>
        </AnimateComponent>
      </Dialog>
    )
  }
}

const enhance = compose(
  withStyles( styles, { withTheme: true } )
)

SendRequestsPopup.propTypes = {
  classes: PropTypes.object.isRequired,
  handlePopup: PropTypes.func.isRequired,
  handleNextScreen: PropTypes.func.isRequired,
}

SendRequestsPopup.defaultsProps = {
  classes: {},
  handlePopup: () => {},
  handleNextScreen: () => {},
}

export default enhance( SendRequestsPopup )
