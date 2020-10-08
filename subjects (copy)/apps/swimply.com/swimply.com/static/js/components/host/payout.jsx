import React, {useContext} from "react";
import compose from "recompose/compose";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { withApollo } from "react-apollo";
import Pageloader from "../commons/pageloader";
import ConnectStripeButton from '../commons/connect-stripe-button';
import Button from "@material-ui/core/Button";
import Stepper from "./stepper";
import UserContext from "../../contexts/UserContext";

const styles = theme => ({
  stepperNew: {
    padding: "0",
    maxWidth: "350px",
    "& > div": {
      background: theme.palette.common.blue
    }
  },
  formInputBox: {
    "& > div > div ": {
      padding: "0"
    },
    "& label + div ": {
      marginTop: "0",
      marginBottom: "0",
      width: "100%"
    },

    position: "relative",
    marginBottom: "20px",
    "& fieldset": {
      opacity: 0
    },

    "& label": {
      textTransform: "uppercase",
      fontSize: "12px",
      marginBottom: "5px",
      letterSpacing: "1px"
    },
    "& input": {
      background: theme.palette.common.gray,
      position: "relative",
      width: "100%",
      padding: "10px 15px ",
      fontWeight: "normal",
      border: "1px solid #f3f5f5",
      fontSize: "13px",
      borderRadius: "5px",
      maxWidth: "40px",
      textAlign: "right",
      "&:focus": {
        border: "1px solid #00ade2"
      },
      "&::placeholder": {
        color: "#000",
        opacity: "0.5"
      }
    },
    "& textarea": {
      background: theme.palette.common.gray,
      padding: "10px 15px ",
      border: "1px solid #f3f5f5",
      fontSize: "13px",
      width: "calc(100% - 30px)",
      borderRadius: "5px",
      "&:focus": {
        border: "1px solid #00ade2"
      },
      "&::placeholder": {
        color: "#000",
        opacity: "0.5"
      }
    },
    "& span": {
      position: "absolute",
      top: "3px",
      bottom: "0",
      margin: "auto",
      height: "0px",
      left: "9px",
      zIndex: "1",
      "& img": {
        maxWidth: "20px"
      }
    }
  },
  backStep: {
    marginBottom: "10px",
    color: theme.palette.common.blue,
    cursor: "pointer",
    fontWeight: "500",
    "& i": {
      fontSize: "22px",
      verticalAlign: " text-bottom",
      marginRight: "3px",
      marginTop: "-1px"
    },
    '@media (max-width:767px)': {
      width: '25px',
      height: '25px',
      overflow: 'hidden',
      color: theme.palette.common.black,
      marginBottom: "0px",
      "& i": {
        fontSize: "30px",
      }
    }
  },
  ContentContainer: {
    paddingTop: "15px",
    "& p": {
      fontWeight: "100",
      fontSize: "13px"
    }
  },

  nextButton: {
    marginTop: "35px"
  },

  managePaymentBtn: {
    background: "transparent",
    border: "2px solid #22bfea",
    padding: "6px 15px",
    fontSize: "13px",
    fontWeight: "500",
    textTransform: "inherit",
    "& span": {
      color: theme.palette.common.black
    },
    "&:hover": {
      background: theme.palette.common.blue,
      "& span": {
        color: theme.palette.common.white
      }
    }
  },
  stripBottomContent: {
    marginTop: '15px',
    fontSize: '13px',
    '& p': {
      marginBottom: '5px',
      marginTop: '0',
      '&:last-child': {
        marginTop: '5px',
      }
    },
    '& ul': {
      listStyle: 'outside decimal',
      paddingLeft: '25px',
      margin: '0',
    },
    '& li': {
      padding: '5px',
      lineHeight: '22px',
      '& strong': {
        fontWeight: '500',
      }
    }
  }
});

class Payout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 91.3
    };
    this.redirectToProfile = this.redirectToProfile.bind(this);
    this.handleBackBtn = this.handleBackBtn.bind(this);
  }
  componentDidMount() {
    let { stripe_id, user } = this.props;
    if (stripe_id && user.stripe_account_onboard) {
      let profileStatus = true;
      this.props.redirectToProfile(profileStatus);
    }
  }
  redirectToProfile() {
    let profileStatus = true;
    this.props.redirectToProfile(profileStatus);
  }
  handleBackBtn() {
    this.props.handleNextScreen('payoutStatus', 'showManageCalendarScreen');
  }

  render() {
    const { classes, backBtnChange } = this.props;
    const { loading, activeStep } = this.state;
    return (
      <Typography variant="body1" component="div">
        {loading === true ? <Pageloader loading={loading} /> : ""}
        <div className={classes.locationMain}>
          <div className={classes.backStep} onClick={this.handleBackBtn}>
            <font>
              <i className="fa fa-angle-left" aria-hidden="true" /> BACK
            </font>
          </div>

          {backBtnChange === true ? "" : <Stepper activeStep={activeStep} />}
          <div className={classes.ContentContainer}>
            <Typography variant="h3">Set your payout method</Typography>

            <p>
              Securely connect your bank account via Stripe to
              receive payouts from completed reservations.
            </p>
            <p>Payouts are sent 24 hours after a successful booking.</p>
          </div>
          <div>
            <ConnectStripeButton>
              <Button className={classes.managePaymentBtn}>Connect to Stripe</Button>
            </ConnectStripeButton>
            <div className={classes.stripBottomContent}>
              <p>You will be asked for the following (it only takes a minute)</p>
              <ul>
                <li>Your full legal name, email address, phone number, DOB, and address.</li>
                <li>For the "Industry" field, select "Property Rentals"</li>
                <li>A bank account for us to send your funds to you.</li>
              </ul>
              <p>And you're all set!</p>
            </div>
            <div className={classes.nextButton} >
              <Typography variant="button" onClick={this.redirectToProfile}>
                Do This Later
              </Typography>
            </div>
          </div>
        </div>
      </Typography>
    );
  }
}
Payout.propTypes = {
  classes: PropTypes.object.isRequired
};

const enhance = compose(
  withStyles(styles),
  withApollo
);

function PayoutContainer (props) {
  const context = useContext(UserContext)
  return <Payout {...context} {...props} />
}

export default enhance(PayoutContainer);
