import React, { Component } from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles'

// materials components
import Typography from '@material-ui/core/Typography'

// components
import GuestPopup from '../../commons/guestpopup'

// styles
import styles from './styles'

class SelectGuests extends Component {
  state = {
    modify: {
      adultCount: 1,
      childrenCount: 0,
      infantCount: 0,
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        adultCount: this.props.adultCount,
        childrenCount: this.props.childrenCount,
        infantCount: this.props.infantCount,
        modify: {
          adultCount: this.props.adultCount,
          childrenCount: this.props.childrenCount,
          infantCount: this.props.infantCount,
        }
      })
    }
  }

  handleGuestApply = (data) => {
    this.setState({
      adultCount: data.adultCount,
      childrenCount: data.childrenCount,
      infantCount: data.infantCount,
      modify: {
        adultCount: data.adultCount,
        childrenCount: data.childrenCount,
        infantCount: data.infantCount,
      }
    }, () => {
      this.props.handleApply(data)
      this.props.handleGuestsPopup()
    })
  }

  renderGuestsText (adultCount, childrenCount, infantCount) {
    if (!adultCount && !adultCount && !adultCount) {
      return 'Select guests'
    }

    let aCount = ''
    let aLabel = ''
    if (adultCount === 0) {
      aCount = ''
      aLabel = ''
    } else if (adultCount === 1) {
      aCount = adultCount;
      aLabel = (childrenCount === 0 && infantCount === 0) ? 'Adult' : 'Adult,'
    } else {
      aCount = adultCount;
      aLabel = (childrenCount === 0 && infantCount === 0) ? 'Adults' : 'Adults,'
    }
    let cCount = ''
    let cLabel = ''
    if (childrenCount === 0) {
      cCount = ''
      cLabel = ''
    } else if (childrenCount === 1) {
      cCount = childrenCount;
      cLabel = infantCount === 0 ? 'Children' : 'Children,'
    } else {
      cCount = childrenCount;
      cLabel = infantCount === 0 ? 'Childrens' : 'Childrens,'
    }
    let iCount = ''
    let iLabel = ''
    if (infantCount === 0) {
      iCount = ''
      iLabel = ''
    } else if (infantCount === 1) {
      iCount = infantCount;
      iLabel = 'Infant'
    } else {
      iCount = infantCount;
      iLabel = 'Infants'
    }

    return aCount+' '+ aLabel+' \u00A0'+cCount+' '+cLabel+' \u00A0'+iCount+' '+iLabel
  }

  render () {
    const {
      modify,
      adultCount,
      childrenCount,
      infantCount,
    } = this.state
    const { classes } = this.props

    return (
      <div className={classes.container}>
        <Typography variant='subtitle2' className='light' component='label'>Who will be coming?</Typography>
        <div
          className={`${classes.dropDownSelect} ${this.props.showGuests ? 'focus' : ''}`}
          onClick={this.props.handleGuestsPopup}>
            {this.renderGuestsText(adultCount, childrenCount, infantCount)}
            <i className='fas fa-caret-down' style={{fontSize: 15}} aria-hidden='true' />
        </div>

        <div className={classes.guestsPopup}>
          {
            this.props.showGuests && <GuestPopup
              updateBtn
              searchFields={modify}
              adultCountNew={modify.adultCount}
              childrenCountNew={modify.childrenCount}
              infantCountNew={modify.infantCount}
              handleGuestCancel={this.props.handleGuestsPopup}
              handleGuestApply={this.handleGuestApply}
              poolDetails={this.props.poolDetails}
            />
          }
        </div>
      </div>
    )
  }
}

const enhance = compose(
  withStyles(styles)
)

export default enhance(SelectGuests)

SelectGuests.propTypes = {
  poolDetails: PropTypes.object,
  adultCount: PropTypes.number,
  childrenCount: PropTypes.number,
  infantCount: PropTypes.number,
  handleApply: PropTypes.func,
  handleGuestsPopup: PropTypes.func,
  showGuests: PropTypes.bool,
}

SelectGuests.defaultProps = {
  adultCount: 0,
  childrenCount: 0,
  infantCount: 0,
  handleApply: () => {},
  handleGuestsPopup: () => {},
  showGuests: false,
}
