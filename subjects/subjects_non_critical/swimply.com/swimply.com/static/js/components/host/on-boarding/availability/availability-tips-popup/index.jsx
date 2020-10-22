import React, { Component } from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'

// materials components
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Slide from '@material-ui/core/Slide'
import Fade from '@material-ui/core/Fade'

// styles
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

class AvailabilityTipsPopup extends Component {
  state = {
    show: true
  }

  close = () => {
    this.setState({
      show: false
    })
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
          <DialogContent className={classes.popupContainer}>
            <span className={classes.closeButton} onClick={this.close}>
              <img src='/img/close-button.png' alt='Close icon'/>
            </span>
            <Typography variant='body1' component='div'>
              <div className={classes.availabilityTipsContainer}>
                <Typography variant='h3'>Availability tips</Typography>
                <div className={classes.textContainer}>
                  <Typography variant='h4' className={classes.title}>Booking window</Typography>
                  <p className={classes.subTitle}>
                    At least 1 day notice can help you plan for a guest's arrival,
                    but you might miss out on last-minute reservations.
                  </p>
                  <p className={classes.subTitle}>
                    Most hosts keep their calendars updated up to 3 months out.
                  </p>
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

AvailabilityTipsPopup.propTypes = {
  classes: PropTypes.object.isRequired,
  handlePopup: PropTypes.func.isRequired,
}

AvailabilityTipsPopup.defaultsProps = {
  classes: {},
  handlePopup: () => {},
}

export default enhance( AvailabilityTipsPopup )
