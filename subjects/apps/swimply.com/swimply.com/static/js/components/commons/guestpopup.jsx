
import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const styles = theme => ({
  container: {
    maxWidth: '1170px',
    margin: '0 auto',
    width: '100%',
    padding: '0 15px',
  },
  gueastDropdown: {
    background: theme.palette.common.white,
    boxShadow: theme.shape.boxShadowGray,
    display: "table",
    width: "calc(100% - 30px)",
    padding: "10px 15px",
    position: "absolute",
    zIndex: "1",
    marginTop: '5px',
    '@media (max-width: 880px)': {
      marginLeft: '-40px',
    },
    '@media (max-width: 767px)': {
      marginLeft: 0,
    },
  },

  gueastDropdownMain: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    marginBottom: "25px",
  },

  counter: {
    width: "100%",
    position: "relative",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    '&.disabled': {
      opacity: '0.6'
    },

    '& Button': {
      width: "20px",
      minWidth: '20px',
      height: "20px",
      borderRadius: "50%",
      padding: 0,
      marginRight: 0,
      boxShadow: "none",
      border: "none",
      cursor: "pointer",
      '& span:first-child': {
        display: 'table',
        left: 'inherit',
        margin: '-2px 0 0 1px',      
        paddingLeft: 'inherit',
        position: 'relative',
        right: 'inherit',
        top: 'inherit',
        width: 'inherit',
      }
    },
    '& p': {
      width: "40px",
      padding: "5px",
      margin: "10px auto 6px",
      boxShadow: "0 0 5px #ccc",
      color: theme.palette.common.black,
      fontWeight: '500',
      '&.count': {
        margin: '10px 0',
      }
    },
  },
  labelName: {
    position: "relative",
    marginTop: '10px',
    textTransform: 'uppercase',
    fontSize: '12px',
    fontWeight: '500',
    letterSpacing: '2px',
    '& small': {
      textTransform: 'initial'
    }
  },
  buttonGuest: {
    float: "right",
    marginTop: "-10px",

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


class Guestpopup extends React.Component {
  /**
  * @param {*} props
  */
  constructor(props) {
    super(props);
    this.state = {
      adultCount: 1,
      childrenCount: 0,
      infantCount: 0,
      timerRange: {}
    };
    this.increaseAdultCount = this.increaseAdultCount.bind(this);
    this.decreaseAdultCount = this.decreaseAdultCount.bind(this);
    this.increaseChildCount = this.increaseChildCount.bind(this);
    this.descreseChildCount = this.descreseChildCount.bind(this);
    this.increaseInfantCount = this.increaseInfantCount.bind(this);
    this.decreaseInfantCount = this.decreaseInfantCount.bind(this);
    this.handleGuestApply = this.handleGuestApply.bind(this);
  }

  componentDidMount() {
    let {  searchFields, adultCountNew, childrenCountNew, infantCountNew } = this.props;
    if (searchFields !== undefined) {
      this.setState({
        adultCount: searchFields.adultCount ? parseInt(searchFields.adultCount) : adultCountNew,
        childrenCount: searchFields.childrenCount ? parseInt(searchFields.childrenCount) : childrenCountNew,
        infantCount: searchFields.infantCount ? parseInt(searchFields.infantCount) : infantCountNew,
        timerRange: searchFields.timerRange
      })
    }    
  }

  increaseAdultCount() {
    let { adultCount } = this.state;
    this.setState({ adultCount: parseInt(adultCount) + parseInt(1) });
  }
  decreaseAdultCount() {
    let { adultCount } = this.state;
    if (adultCount > 0) {
      this.setState({ adultCount: adultCount - 1 });
    }
  }
  increaseChildCount() {
    let { childrenCount } = this.state;
    this.setState({ childrenCount: parseInt(childrenCount) + parseInt(1) });
  }
  descreseChildCount() {
    let { childrenCount } = this.state;
    if (childrenCount > 0) {
      this.setState({ childrenCount: childrenCount - 1 });
    }
  }
  increaseInfantCount() {
    let { infantCount } = this.state;
    this.setState({ infantCount: parseInt(infantCount) + parseInt(1) });
  }
  decreaseInfantCount() {
    let { infantCount } = this.state;
    if (infantCount > 0) {
      this.setState({ infantCount: infantCount - 1 });
    }
  }

  handleGuestApply() {
    let { adultCount, childrenCount, infantCount } = this.state;
    let data = {
      adultCount: adultCount,
      childrenCount: childrenCount,
      infantCount: infantCount
    }
    this.props.handleGuestApply(data);
  }

  render() {
    const { classes, updateBtn, poolDetails } = this.props;
    let { adultCount, childrenCount, infantCount } = this.state;

    const childrenAllowed = !poolDetails || (poolDetails && poolDetails.guests_children_allowed)
    const infantsAllowed = !poolDetails || (poolDetails && poolDetails.guests_infants_allowed)

    return (
      <div className={classes.gueastDropdown} >
        <div className={classes.gueastDropdownMain}>
          <div className={classes.counter} >
            <Button onClick={this.increaseAdultCount}>+</Button>
            <p className='count'>{ adultCount }</p>
            <Button onClick={this.decreaseAdultCount}>-</Button>
            <div className={classes.labelName} >Adults <br/><small>&nbsp;</small></div>
          </div>
          <div className={`${classes.counter} ${!childrenAllowed ? 'disabled' : ''}`}>
            <Button disabled={!childrenAllowed} onClick={this.increaseChildCount}>+</Button>
            <p className='count'> {childrenCount } </p>
            <Button disabled={!childrenAllowed} onClick={this.descreseChildCount}>-</Button>
            <div className={classes.labelName}>Children <br/><small>(Ages 2-12)</small></div>
          </div>
          <div className={`${classes.counter} ${!infantsAllowed ? 'disabled' : ''}`}>
            <Button disabled={!infantsAllowed} onClick={this.increaseInfantCount}>+</Button>
            <p className='count'>  {infantCount }</p>
            <Button disabled={!infantsAllowed} onClick={this.decreaseInfantCount}>-</Button>
            <div className={classes.labelName}>Infants <br/><small>(Under 2)</small></div>
          </div>
        </div>
        <div className={classes.buttonGuest}>
          <Button className={classes.cancelBtn} onClick={this.props.handleGuestCancel}>
            Cancel
          </Button>
          <Button onClick={this.handleGuestApply}>
            {updateBtn === true ? 'Update' : 'Apply'}
          </Button>
        </div>
      </div>
    )
  }
}

Guestpopup.propTypes = {
  poolDetails: PropTypes.object,
  classes: PropTypes.object.isRequired,
};

const enhance = compose(
  withStyles(styles),
  withRouter,
);

export default enhance(Guestpopup);
