import React, { Component } from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'

// materials components
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

// styles
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// constants
import { INSTANT_GROUP_SIZE } from '../../../../../constants'

class Popup extends Component {
  state = {
    guests: this.props.guests
  }

  onSelect = ({ target: { value: guests } }) => {
    this.setState({ guests })
  }

  save = () => {
    this.props.handlePopup(false, this.state.guests)
  }

  cancel = () => {
    this.props.handlePopup(false)
  }

  render () {
    const { classes } = this.props

    return (
      <Dialog keepMounted open>
        <DialogContent className={classes.popupContainer}>
          <Typography variant='body1' component='div'>
            <p className={`${classes.subTitle} ${classes.reduceMarginTop}`}>
              10 guests is the recommended maximum for pre-approved reservations but you may edit this number below.
            </p>
            <Select
              className={classes.select}
              value={this.state.guests}
              onChange={this.onSelect}
              displayEmpty
            >
              {
                INSTANT_GROUP_SIZE.map((quests, index) => {
                  return (
                    <MenuItem value={quests} key={`quests-${index}`}>{quests} guests</MenuItem>
                  )
                })
              }
            </Select>
            <span>guests</span>
          </Typography>
          <div className={classes.buttonsContainer}>
            <Typography
              variant='button'
              className={classes.okButton}
              onClick={this.save}
            >
              OK
            </Typography>
            <Typography
              variant='button'
              className={classes.cancelButton}
              onClick={this.cancel}
            >
              Cancel
            </Typography>
          </div>
        </DialogContent>
      </Dialog>
    )
  }
}

const enhance = compose(
  withStyles( styles, { withTheme: true } )
)

Popup.propTypes = {
  classes: PropTypes.object.isRequired,
  handlePopup: PropTypes.func.isRequired,
  guests: PropTypes.number,
}

Popup.defaultsProps = {
  classes: {},
  handlePopup: () => {},
  guests: 10,
}

export default enhance( Popup )
