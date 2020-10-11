import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';

// materials components
import { Button, Typography } from '@material-ui/core';

// styles
import styles from './styles';

// constants
import { TIME_DETAILS } from '../../../../constants';

class TimePicker extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      timeDetails: TIME_DETAILS,
      timeStartIndex: -1,
      timeEndIndex: -1,
      disableTimeIndex: -1,
    };

    this.handlePicker = this.handlePicker.bind( this );
    this.handleApply = this.handleApply.bind( this );
    this.handleSelectTime = this.handleSelectTime.bind( this );
    this.handleAvailableTime = this.handleAvailableTime.bind( this );
    this.checkIfSelectedCurrentDate = this.checkIfSelectedCurrentDate.bind( this );
    this.setDefaultTime = this.setDefaultTime.bind( this );
    this.displayTime = this.displayTime.bind( this );
    this.renderTimeItems = this.renderTimeItems.bind( this );
  }

  componentDidMount() {
    this.handleAvailableTime();
    this.setDefaultTime();
  }

  componentDidUpdate( prevProps ) {
    if ( prevProps.date !== this.props.date ) {
      this.handleAvailableTime();
    }
  }

  handlePicker( show ) {
    this.setState( {
      onFocus: show,
      show,
    } );
  }

  handleApply() {
    this.props.toggleTimePicker( false );
    this.props.handleApply( {
      startIndex: this.state.timeStartIndex,
      endIndex: this.state.timeEndIndex,
    } );
  }

  handleSelectTime( index ) {
    const { timeStartIndex: start, timeEndIndex: end } = this.state;
    if ( start < 0 ) { // if previously user didn't select time
      this.setState( { timeStartIndex: index } );
    } else if ( start >= 0 && index > start && end < 0 ) { // if previously user selected start time and didn't select end time
      this.setState( { timeEndIndex: index } );
    } else { // if previously user selected start and end time
      this.setState( {
        timeStartIndex: index,
        timeEndIndex: -1,
      } );
    }
  }

  handleAvailableTime() { // remove ability to select previous time
    if ( this.checkIfSelectedCurrentDate() ) {
      const currentDate = new Date();
      const hours = currentDate.getHours();
      this.setState( {
        disableTimeIndex: hours,
      } );
    } else {
      this.setState( {
        disableTimeIndex: -1,
      } );
    }
  }

  checkIfSelectedCurrentDate() {
    const { date: selectedDate } = this.props;
    const currentDate = new Date();
    return new Date( selectedDate ).setHours( 0, 0, 0, 0 ) === currentDate.setHours( 0, 0, 0, 0 );
  }

  setDefaultTime() {
    const currentDate = new Date();
    const currentHours = currentDate.getHours();
    const hours = currentHours >= 23 ? 0 : currentHours;

    this.props.handleApply( {
      startIndex: hours,
      endIndex: hours + 1,
    } );
  }

  displayTime() {
    const startTime = this.state.timeDetails[this.props.time.startIndex];
    const endTime = this.state.timeDetails[this.props.time.endIndex];
    if ( startTime && endTime ) {
      return `${startTime} - ${endTime}`;
    } if ( startTime ) {
      const endIndex = this.props.time.startIndex >= 23 ? 0 : this.props.time.startIndex + 1;
      return `${startTime} - ${this.state.timeDetails[endIndex]}`;
    }
    return 'Select time';
  }

  renderTimeItems() {
    return this.state.timeDetails.map( ( time, index ) => {
      const { timeStartIndex: start, timeEndIndex: end } = this.state;
      const isActive = ( index === start || index === end ) || ( index > start && index <= end );
      const isDisable = this.state.disableTimeIndex >= index;

      return (
        <li
          key={`time-${index}`}
          className={`${isActive ? 'active' : ''}`}
          onClick={this.handleSelectTime.bind( null, index )}
          disabled={isDisable}
        >
          {time}
        </li>
      );
    } );
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <div className={`${classes.formInputBox} ${this.props.show ? classes.onFocus : ''}`}>
          <Typography variant="subtitle2" component="label">Time</Typography>
          <div
            className={classes.dropDownSelectTime}
            onClick={this.props.toggleTimePicker.bind( this, !this.props.show )}
          >
            {this.displayTime()}
          </div>
          <span>
            <img src={`${window.location.origin}/img/timer.png`} alt="Timer" />
          </span>
        </div>
        <div className={classes.timerContainer}>
          {
            this.props.show
            && (
            <div>
              <ul className="time_block">
                {this.renderTimeItems()}
                <div className="timer_buttons">
                  <Button className={classes.cancelBtn} onClick={this.props.toggleTimePicker.bind( null, false )}>
                    Cancel
                  </Button>

                  <Button onClick={this.handleApply}>
                    Update
                  </Button>
                </div>
              </ul>
            </div>
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

TimePicker.propTypes = {
  classes: PropTypes.object.isRequired,
  handleApply: PropTypes.func.isRequired,
  toggleTimePicker: PropTypes.func.isRequired,
  date: PropTypes.object,
  time: PropTypes.object,
  show: PropTypes.bool,
};

TimePicker.defaultsProps = {
  classes: {},
  handleApply: () => {},
  toggleTimePicker: () => {},
  date: new Date(),
  time: {},
  show: false,
};

export default enhance( TimePicker );
