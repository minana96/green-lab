import React, { Component } from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles'

// styles
import styles from './styles'

class TextArea extends Component {
  state = {
    isFocused: false,
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
    const { classes, label, value, id, floatingLabel, ...props } = this.props
    const { isFocused } = this.state

    return (
      <div className={classes.container}>
        <label htmlFor={id} className={`${classes.label} ${isFocused || value || !floatingLabel ? 'focused' : ''}`}>{label}</label>
        <textarea
          {...props}
          value={value}
          id={id}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          ref={r => this.ref = r}
          className={classes.textarea}
        />
      </div>
    )
  }
}

TextArea.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  floatingLabel: PropTypes.bool,
}

TextArea.defaultProps = {
  classes: {},
  value: '',
  label: '',
  id: '',
  floatingLabel: false,
}

const enhance = compose(
  withStyles(styles),
)

export default enhance(TextArea)
