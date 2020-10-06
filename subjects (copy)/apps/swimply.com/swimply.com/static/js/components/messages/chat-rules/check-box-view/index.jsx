import React, { Component } from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles'

// materials components
import Typography from '@material-ui/core/Typography'

// styles
import styles from './styles'

class CheckBoxView extends Component {
  render () {
    const {
      icon,
      label,
      text,
      checked,
      onClick,
      containerClass,
      iconClass,
      classes,
    } = this.props

    return (
      <Typography className={`${classes.container} ${containerClass}`} variant='body1' component='div' onClick={onClick}>
        <div className={classes.iconWrap}>
          <img src={icon} alt='Icon' className={`${classes.icon} ${iconClass}`} />
        </div>
        <div className={classes.textWrap}>
          <p className={classes.label}>{label}</p>
          <p className={classes.text}>{text}</p>
        </div>
        <div className={classes.checkBoxIconWrap}>
          {
            checked ?
              <img src={`${window.location.origin}/img/commons/checked.png`} className={classes.checkBoxIcon} alt='checked' />
              : <div className={classes.unCheckedCircle} />
          }
        </div>
      </Typography>
    )
  }
}

CheckBoxView.propTypes = {
  onClick: PropTypes.func,
  containerStyles: PropTypes.object,
  iconStyle: PropTypes.object,
  label: PropTypes.string,
  text: PropTypes.string,
  checked: PropTypes.bool,
  icon: PropTypes.any,
}

CheckBoxView.defaultProps = {
  onClick: () => {},
  containerStyles: {},
  iconStyle: {},
  label: '',
  text: '',
  checked: false,
  icon: null,
}

const enhance = compose(
  withStyles(styles),
)

export default enhance(CheckBoxView)
