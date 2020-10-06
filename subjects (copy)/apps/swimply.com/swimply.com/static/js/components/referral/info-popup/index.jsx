import React, { Component } from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { withRouter } from 'react-router-dom'

// materials components
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Button from '@material-ui/core/Button'
import Fade from '@material-ui/core/Fade'
import Slide from '@material-ui/core/Slide'

// styles
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

class InfoPopup extends Component {
  state = {
    show: true,
  }

  close = () => {
    this.setState({
      show: false
    })
  }

  joinAsSwimmer = () => {
    this.props.handlePopup(false)
    window.headerComponent.handleSignup()
  }

  goToSearch = () => {
    this.props.history.push('/search')
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
                <Typography variant='h3'>A quick note Before we show you some awesome pools.</Typography>
                <Typography variant='p' className={classes.subTitle}>
                  In order to receive your referral bonus you will need to
                </Typography>
                <ul className={classes.list}>
                  <li>
                    <p>Create an account with a profile picture and bio</p>
                  </li>
                  <li>
                    <p>Confirm your email address.</p>
                  </li>
                </ul>
                <div className={classes.buttonsContainer}>
                  <Button className={classes.button} onClick={this.joinAsSwimmer}>Create account now</Button>
                  <Button className={classes.button} onClick={this.goToSearch}>Show me the pools</Button>
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
  withStyles( styles, { withTheme: true } ),
  withRouter,
)

InfoPopup.propTypes = {
  classes: PropTypes.object.isRequired,
  handlePopup: PropTypes.func.isRequired,
}

InfoPopup.defaultsProps = {
  classes: {},
  handlePopup: () => {},
}

export default enhance( InfoPopup )
