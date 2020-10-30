import React, { Component } from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles'

// styles
import styles from './styles'

class FloatingLabelInput extends Component {
  state = {
    isFocused: this.props.focused,
  }

  ref = React.createRef()

  handleFocus = () => this.setState({ isFocused: true })
  handleBlur = () => this.setState({ isFocused: false })

  blur = () => {
    this.ref.blur()
    this.setState({
      isFocused: false
    })
  }

  render() {
    const { classes, label, value, id, ...props } = this.props
    const { isFocused } = this.state

    return (
      <div className={classes.container}>
        <label htmlFor={id} className={`${classes.label} ${isFocused || value ? 'focused' : ''}`}>{label}</label>
        <input
          {...props}
          id={id}
          value={value}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          ref={r => this.ref = r}
          className={classes.input}
        />
      </div>
    )
  }
}

FloatingLabelInput.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  focused: PropTypes.bool,
}

FloatingLabelInput.defaultProps = {
  value: '',
  label: '',
  id: '',
  focused: false,
}

const enhance = compose(
  withStyles(styles),
)

export default enhance(FloatingLabelInput)
