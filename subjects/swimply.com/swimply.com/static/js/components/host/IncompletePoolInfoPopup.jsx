import React, { Component } from 'react'
import compose from 'recompose/compose'
import { withApollo } from "react-apollo"
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import { RouterContext } from '../router/router-context';

import UserUtils from '../utilities/UserUtils'

import { POOL_SCREENS } from '../../constants'


const styles = theme => ({
  popupContent: {
    fontFamily: '"Poppins", sans-serif',
    fontSize: 17,
    margin: '25px 10px 30px',
    display: 'flex',
    textAlign: 'center',
    lineHeight: 1.7,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& .bold': {
      fontSize: 19,
      fontWeight: 600,
      margin: '15px 0'
    }
  },
  mainButton: {
    color: 'white',
    backgroundColor: '#22bfea'
  },
  actionButtons: {
    justifyContent: 'space-between',
    '& button, span': {
      cursor: 'pointer'
    }
  }
})

class IncompletePoolInfoPopup extends Component {
  constructor(props) {
    super(props)
    this.hidePopup = this.hidePopup.bind(this)
    this.handleGoToSettings = this.handleGoToSettings.bind(this)
  }
  static contextType = RouterContext;


  hidePopup () {
    this.context.hideIncompleteHostPopup()
  }

  handleGoToSettings () {
    const lastStep = POOL_SCREENS.find(screen => screen.value === 'pricingGuest').value
    UserUtils.setHostPoolID(this.props.poolId)
    this.props.onPressSettings(lastStep)
    this.hidePopup()
  }


  render() {
    const { classes } = this.props
    return (
      <Dialog
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{minWidth: 300}}
      >
        <DialogContent style={{maxWidth: 500}}>
          <div className={classes.popupContent}>
            <span className='bold'>
              Welcome back{' ' + (this.props.hostName || '')}!
            </span> 
            We have added a few things to make managing your pool even easier while maximizing your profits.
          </div>
          <DialogActions className={classes.actionButtons}>
            <Typography variant="button" onClick={this.hidePopup}>
							CANCEL
						</Typography>
						<Button
							className={classes.mainButton}
							// disabled={this.checkOnSubmit()}
							onClick={this.handleGoToSettings}
						>
							SETTINGS
						</Button>
					</DialogActions>
        </DialogContent>
      </Dialog>
    )
  }
}

const enhance = compose(
	withStyles(styles),
  withApollo
);

export default enhance(IncompletePoolInfoPopup);