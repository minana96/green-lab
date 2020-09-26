import React, { Component } from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import update from 'immutability-helper'

// materials components
import Typography from '@material-ui/core/Typography'

// styles
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

class MonthsCalendar extends Component {
  state = {
    months: [
      { value: 'Jan.', key: 1, active: false },
      { value: 'Feb.', key: 2, active: false },
      { value: 'Mar.', key: 3, active: false },
      { value: 'Apr.', key: 4, active: false },
      { value: 'May', key: 5, active: false },
      { value: 'Jun.', key: 6, active: false },
      { value: 'Jul.', key: 7, active: false },
      { value: 'Aug.', key: 8, active: false },
      { value: 'Sep.', key: 9, active: false },
      { value: 'Oct.', key: 10, active: false },
      { value: 'Nov.', key: 11, active: false },
      { value: 'Dec.', key: 12, active: false },
    ]
  }

  componentDidUpdate (prevProps) {
    if (prevProps.activeMonths !== this.props.activeMonths) {
      this.handleActiveMonths()
    }
  }

  handleActiveMonths = () => {
    if (this.props.activeMonths.length) {
      const months = [ ...this.state.months ]
      this.props.activeMonths.forEach((activeMonths) => {
        months[activeMonths - 1].active = true
      })
      this.setState({ months })
    }
  }

  toggleMonth = (index) => {
    this.setState({
      months: update(this.state.months, {
        [index]: {
          active: { $set: !this.state.months[index].active }
        }
      })
    }, () => {
      const activeMonths = this.state.months.filter(month => month.active).map(month => month.key)
      this.props.handleChange(activeMonths)
    })
  }

  render () {
    const { classes } = this.props

    return (
      <Typography variant='body1' component='div'>
        <ul className={classes.monthsList}>
          {this.state.months.map((month, index) => {
            return (
              <li
                key={`month-${index}`}
                className={`${classes.monthItem} ${month.active ? classes.activeMonthItem : ''}`}
                onClick={this.toggleMonth.bind(null, index)}
              >
                <p>{month.value}</p>
              </li>
            )
          })}
        </ul>
      </Typography>
    )
  }
}

const enhance = compose(
  withStyles( styles, { withTheme: true } )
)

MonthsCalendar.propTypes = {
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.object.isRequired,
  activeMonths: PropTypes.array,
}

MonthsCalendar.defaultsProps = {
  classes: {},
  handleChange: () => {},
  activeMonths: [],
}

export default enhance( MonthsCalendar )
