import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

// components
import CalendarPopUp from '../../../commons/calenderPopup';

// styles
import styles from './styles';

class Calendar extends Component {
  constructor( props ) {
    super( props );
    this.handleCalenderApply = this.handleCalenderApply.bind( this );
  }

  handleCalenderApply( date ) {
    this.props.toggleCalendar( false );
    this.props.handleApply( new Date( date ) );
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <div className={`${classes.formInputBox} ${this.props.show ? classes.onFocus : ''}`}>
          <Typography variant="subtitle2" component="label">Date</Typography>
          <div
            className={classes.dropDownSelectTime}
            onClick={this.props.toggleCalendar.bind( null, !this.props.show )}
          >
            <Moment format="MMMM DD, YYYY">{this.props.date}</Moment>
          </div>
          <span>
            <img src={`${window.location.origin}/img/calender-green2.png`} alt="" />
          </span>
        </div>
        <div className={classes.calendarContainer}>
          {
            this.props.show && (
            <CalendarPopUp
              selectedDate={this.props.date}
              updateBtn
              handleCalenderCancel={this.props.toggleCalendar.bind( null, false )}
              handleCalenderApply={this.handleCalenderApply}
            />
            )
          }
        </div>
      </Fragment>
    );
  }
}

const enhance = compose(
  withStyles( styles, { withTheme: true } ),
);

Calendar.propTypes = {
  classes: PropTypes.object.isRequired,
  handleApply: PropTypes.func.isRequired,
  toggleCalendar: PropTypes.func.isRequired,
  date: PropTypes.object,
  show: PropTypes.bool,
};

Calendar.defaultsProps = {
  classes: {},
  handleApply: () => {},
  toggleCalendar: () => {},
  date: new Date(),
  show: false,
};

export default enhance( Calendar );
