
import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

const styles = theme => ({
  container: {
    maxWidth: '1170px',
    margin: '0 auto',
    width: '100%',
    padding: '0 15px',
  },
  checkBox: {
    color: theme.palette.common.darkgray,
    '&$checked': {
      color: theme.palette.common.blue,
    },
  },
  checked: {},
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
    maxWidth: '268px',
    margin: '83px auto 0',
    left: '0',
    right: '0',
    padding: '26px',
    '@media (max-width:767px)': {
      margin: '155px auto 0',
    },
    '& > div > div > div  > div': {
      background: '#00a6e2',
    },
    '& > div > div > div > span > div': {
      background: theme.palette.common.white,
      borderColor: theme.palette.common.white,
      boxShadow: '0 0 3px rgba(0, 0, 0, 0.3)'
    }
  },
  displayTimerRange: {
    display: "flex",
    padding: "0 15px 15px",
    '& div': {
      width: "50%",
      textAlign: "center",
      '& div ': {
        width: "100%",
        color: theme.palette.common.black,
        fontSize: "16px",
        fontWeight: "500"
      }
    }
  },
  checkboxBottom: {
    position: "relative",
    background: '#f9f9f9',
    padding: '2px',
    textAlign: 'left',
    margin: '0 -25px',
    paddingLeft: '35px',
    '& input': {
      position:'absolute !important',
    },
    '& img': {
      position: "absolute",
      top: "14px",
      bottom: "0",
      left: "28px",
      width: "18px",
    },
    '& label': {
      fontSize: '13px',
      '& > span': {
        textTransform: 'none',
        padding: '5px 2px'
      }
    },
    '@media (max-width:767px)': {
      background: '#fff',
    },
  },
  buttonTimer: {
    float: "right",
    marginTop: "15px",
    marginRight: '-9px',
    '& Button': {
      padding: '3px 15px',
      marginLeft: '5px',
      height: '30px',
      display: 'inline-block',
      '& span': {
        minWidth: '60px',
        position: "relative",
        left: 'inherit',
        top: 'inherit',
        height: 'inherit',
        marginLeft: '0px',
        padding: '0px 0px',
      }
    },
    '& div': {
      display: "flex",
    },
  },
  cancelBtn: {
    background: theme.palette.common.transparent,
    '& span': {
      color: '#00afe3',
    },
    '&:hover': {
      background: 'linear-gradient(90deg,#00b6e7,#04bfeb,#23d1f2,#00b6e7,#23d1f2)',
      '& span': {
        color: theme.palette.common.white,
      },
    }
  },
  displayColor: {
    background: 'transparent !important'
  },
  hypenSymbol: {
    fontSize: '16px',
    color: '#888484',
    paddingTop: '11px',
  },
  text: {
    margin: '10px 0 0',
    textAlign: 'center',
    fontSize: '14px',
    color: theme.palette.common.darkgray,
  }
});


class Timerpopup extends React.Component {
  /**
  * @param {*} props
  */
  constructor(props) {
    super(props);
    this.state = {
      timerRange: {
        min: 16,
        max: 20
      },
      checkedFlexibleTime: true,
      startTime: '',
      endTime: '',
      adultCount: '',
      childrenCount: '',
      infantCount: ''
    };
    this.handleFlexibleTime = this.handleFlexibleTime.bind(this);
    this.handleTimerRange = this.handleTimerRange.bind(this);
    this.handleTimerApply = this.handleTimerApply.bind(this);
  }

  componentWillMount() {
    let { searchFields } = this.props;
    let { timerRange } = this.state;
    if (searchFields !== undefined) {
      let flexibleTime = (searchFields.checkedFlexibleTime === true || searchFields.checkedFlexibleTime === 'true') ? true : false;
      let startTime = "";

      let minVal = searchFields.timerRange ? searchFields.timerRange.min : timerRange.min;
      let maxVal = searchFields.timerRange ? searchFields.timerRange.max : timerRange.max;
      if (minVal < 7) {
        minVal = 7
        maxVal = minVal + 1
      }
      if (minVal > 12) {
        startTime = (minVal - 12) + ":00 PM";
      } else if (minVal === 12) {
        startTime = (minVal) + ":00 PM";
      } else {
        startTime = minVal + ":00 AM";
      }
      let endTime = "";
      if (maxVal > 12) {
        endTime = (maxVal - 12) + ":00 PM";
      } else if (maxVal === 12) {
        endTime = (maxVal) + ":00 PM";
      } else {
        endTime = maxVal + ":00 AM";
      }
      this.setState({
        timerRange: {
          min: minVal,
          max: maxVal
        },
        checkedFlexibleTime: flexibleTime,
        startTime: searchFields.startTime || startTime,
        endTime: searchFields.endTime || endTime,
        adultCount: searchFields.adultCount,
        childrenCount: searchFields.childrenCount,
        infantCount: searchFields.infantCount
      })
    }

  }

  handleTimerRange(e) {
    let start = "";
    if (e.min > 12) {
      start = (e.min - 12) + ":00 PM";
    } else if (e.min === 12) {
      start = (e.min) + ":00 PM";
    } else if (e.min === 0) {
      start = "12:00 AM";
    } else {
      start = e.min + ":00 AM";
    }
    let end = "";
    if (e.max > 12) {
      end = `${e.max - 12}:00 ${e.max - 12 === 12 ? 'AM' : 'PM'}`;
    } else if (e.max === 12) {
      end = (e.max) + ":00 PM";
    } else {
      end = e.max + ":00 AM";
    }
    this.setState({ startTime: start });
    this.setState({ endTime: end });
    this.setState({ timerRange: e });
  };

  handleFlexibleTime(e) {
    this.setState({ checkedFlexibleTime: e.target.checked });
  };

  handleTimerApply() {
    let { timerRange, checkedFlexibleTime, startTime, endTime, adultCount, childrenCount, infantCount } = this.state;
    let start = "";
    let end = "";
    if (startTime === "") {
      start = (timerRange.min >= 12) ? timerRange.min + ":00 PM" : timerRange.min + ":00 AM";
    } else {
      start = startTime
    }
    if (endTime === "") {
      end = (timerRange.max >= 12) ? timerRange.max + ":00 PM" : timerRange.max + ":00 AM";
    } else {
      end = endTime
    }
    let data = {
      timerRange: timerRange,
      checkedFlexibleTime: checkedFlexibleTime,
      startTime: start,
      endTime: end,
      adultCount: adultCount,
      childrenCount: childrenCount,
      infantCount: infantCount
    }
    this.setState({
      startTime: start,
      endTime: end
    })
    this.props.handleTimerApply(data);
  }

  render() {
    const { classes, updateBtn } = this.props;
    let { timerRange, checkedFlexibleTime, startTime, endTime } = this.state;
    return (
      <div className={classes.timerDropdown + " " + classes.timerSet} >
        <div >
          <InputRange
            maxValue={24}
            minValue={7}
            value={timerRange}
            formatLabel={timerRange => ``}
            step={1}
            onChange={this.handleTimerRange} />

            <p className={classes.text}>Between</p>
          <div className={classes.displayTimerRange}>
            <div>
              {/*From*/}
              <div className={classes.displayColor}>{startTime}</div>
            </div>
            <div className={classes.hypenSymbol}>-</div>
            <div>
              {/*To*/}
              <div className={classes.displayColor}>{endTime}</div>
            </div>

          </div>
          <div className={classes.checkboxBottom}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedFlexibleTime}
                  onChange={this.handleFlexibleTime}
                  value='FlexibleTime'
                  classes={{
                    root: classes.checkBox,
                    checked: classes.checked,
                  }}
                />
              }
              label="I'm flexible by a couple hours!"
            />
          </div>
        </div>
        <div className={classes.buttonTimer}>
          <div>
            <Button className={classes.cancelBtn} onClick={this.props.handleTimerCancel}>
              Cancel
              </Button>

            <Button onClick={this.handleTimerApply}>
              {updateBtn === true ? 'Update' : 'Apply'}
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

Timerpopup.propTypes = {
  classes: PropTypes.object.isRequired,
};

const enhance = compose(
  withStyles(styles),
  withRouter,
);

export default enhance(Timerpopup);

