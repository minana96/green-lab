
import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import mobiscroll from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    maxWidth: '1170px',
    margin: '0 auto',
    width: '100%',
    padding: '0 15px',
  },
  timerDropdown: {
    background: theme.palette.common.white,
    boxShadow: theme.shape.boxShadowGray,
    display: "table",
    width: "calc(100% - 30px)",
    padding: "10px 15px",
    position: "absolute",
    zIndex: "1"
  },

  timerSet: {
    width: '100%',
    maxWidth: '290px',
    margin: '83px auto 0',
    left: '0',
    right: '0',
    padding: '25px',

  },
  displayTimerRange: {
    display: "flex",
    padding: "15px",
    '& div': {
      width: "50%",
      textAlign: "center",
      '& div': {
        width: "100%",
        color: theme.palette.common.black,
        fontSize: "16px",
        fontWeight: "500"
      }
    }
  },

  CheckboxBottm: {
    position: "relative",
    '& img': {
      position: "absolute",
      top: "14px",
      bottom: "0",
      left: "28px",
      width: "18px",
    },
  },

  calenderBtn: {
    float: "right",
    display: "flex",
    marginTop: "-10px",

    '& Button': {
      padding: '3px 15px',
      marginRight: '10px',
      height: '30px',
      display: 'inline-block',
      '& span': {
        minWidth: '60px',
      }
    },

    '& div': {
      '& span': {
        position: "relative",
        left: 'inherit',
        top: 'inherit',
        height: 'inherit',
        marginLeft: '15px',
        padding: '3px 15px',

      }
    }
  },

  calenderView: {
    padding: '0 0 15px',
    maxWidth: '320px',
    '& form': {
      background: '#fff !important',
      boxShadow:'none !important',
      '& div': {
        background: theme.palette.common.white,
        boxShadow:'none !important',
        '@media (max-width: 850px)': {
          background: 'transparent',
        }
      }
    }
  },
  cancelBtn: {
    background: 'transparent',
    '& span': {
      color: '#00afe3',
    },
    '&:hover': {
      background: 'linear-gradient(90deg,#00b6e7,#04bfeb,#23d1f2,#00b6e7,#23d1f2)',
      '& span': {
        color: theme.palette.common.white,
      },
    }
  }
});


class CalendarPopUp extends React.Component {
  /**
  * @param {*} props
  */
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: props.selectedDate ? new Date(props.selectedDate) : null,
    }
    this.handleCalenderApply = this.handleCalenderApply.bind(this);
    this.handleCalender = this.handleCalender.bind(this);
  }

  handleCalender(event, inst) {
    this.setState({ selectedDate: event.date })
  }

  handleCalenderApply() {
    let { selectedDate } = this.state;
    let selected = selectedDate ? selectedDate : new Date()
    this.props.handleCalenderApply(selected)
  }

  render() {
    const { classes, updateBtn } = this.props;
    let { selectedDate } = this.state;
    let tomorrow = new Date(new Date().setDate(new Date().getDate()));
    return (
      <div className={classes.timerDropdown + " " + classes.timerSet + " " + classes.calenderView} >
        <div >
          <mobiscroll.Form>
            <mobiscroll.FormGroup>
              <label>
                <mobiscroll.Calendar
                  theme="bootstrap"
                  layout="liquid"
                  weeks={1}         // More info about weeks: https://docs.mobiscroll.com/4-6-2/react/calendar#opt-weeks
                  display="inline"  // Specify display mode like: display="bottom" or omit setting to use default
                  placeholder="Please Select..."
                  value={selectedDate}
                  onDayChange={this.handleCalender}
                  min={this.props.minDate || tomorrow}
                  max={this.props.maxDate}
                  invalid={this.props.invalidDates}
                >
                  <input type="hidden" />
                </mobiscroll.Calendar>
              </label>
            </mobiscroll.FormGroup>
          </mobiscroll.Form>
          <div className={classes.calenderBtn}>
            <Button className={classes.cancelBtn} onClick={this.props.handleCalenderCancel}>
              Cancel
              </Button>
            <Button onClick={this.handleCalenderApply}>
              {updateBtn === true ? 'Update' : 'Apply'}
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

CalendarPopUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

const enhance = compose(
  withStyles(styles),
  withRouter,
);

export default enhance(CalendarPopUp);

