import React from "react";
import PropTypes from "prop-types";
import compose from "recompose/compose";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { withApollo } from "react-apollo";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import UserUtils from "../utilities/UserUtils";
import { loader } from "graphql.macro";
import Pageloader from "./../commons/pageloader";
import CardDetailsForm from './card-details-form';
import { Elements, StripeProvider } from 'react-stripe-elements';

// config
import { STRIPE_KEY } from '../../config'

const saveCardDetailsMutation = loader(
  "./../../graphql/findpool/saveCardDetailsMutation.graphql"
);

const styles = theme => ({
  container: {
    maxWidth: "1170px",
    margin: "0 auto",
    width: "100%",
    padding: "0 15px",
    "@media (max-width:1170px)": {
      maxWidth: "992px"
    },
    "@media (max-width:1000px)": {
      maxWidth: "750px"
    },
    "@media (max-width:767px)": {
      width: "calc(100% - 30px)"
    }
  },
  checkBox: {
    paddingLeft: "0",
    paddingRight: "7px",
    "& span": {
      paddingLeft: "0"
    },
    color: theme.palette.common.darkgray,
    "&$checked": {
      color: theme.palette.common.blue
    }
  },
  checked: {},

  signupBtn: {
    marginBottom: "15px",
    "& span": {
      display: "inline-block",
      padding: "8px 45px",
      marginTop: "20px"
    },
    '@media (max-width:767px)':{
      '& span':{
       display:'block',
       marginBottom:'45px'
      }

    }
  },
  signupDisableBtn: {
    "& span": {
      background: "#ccc",
      marginTop: "25px"
    },
    "& span:hover": {
      background: "#ccc",
      cursor: "default"
    },
    '@media (max-width:767px)':{
      '& span':{
       display:'block',
       marginBottom:'50px'
      }

    }
  },
  paymentMethod: {
    paddingTop: "10px",
    margin: "0 -15px",

    "& > div:first-child": {
      margin: "10px 0"
    },
    "&  a": {
      color: theme.palette.common.blue,
      textDecoration: "none"
    }
  },

  radioBtnLabel: {
    paddingTop: "14px",
    display: "inline-block",
    color: theme.palette.common.black,
    fontWeight: "500"
  },
  bookingIdError: {
    background: "#fdece2",
    color: "#f06b2c",
    maxWidth: "550px"
  }
});

class PaymentInfoForm extends React.Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      poolId: 0,
      creaditDebit: "creaditDebit",
      loading: false,
      errorMessage: "",
      stripeKey: STRIPE_KEY
    };
    this.handleCreditDebit = this.handleCreditDebit.bind(this);
    this.showErrorMessage = this.showErrorMessage.bind(this);
    this.submitCardDetails = this.submitCardDetails.bind(this);
  }
  /**
   * @param {*} event
   */
  componentDidMount() {
    let poolId = UserUtils.getPoolId();
    this.setState({ poolId: poolId});
  }
  handleCreditDebit(e) {
    this.setState({ creaditDebit: e.target.value });
  }

  showErrorMessage(message) {
    this.setState({
      loading:false,
      errorMessage:message
    })
  }

  submitCardDetails(data) {
    let { bookingId } = this.props;
    data.booking_id = bookingId;
    this.setState({ loading: true });
    this.props.client
    .mutate({
      mutation: saveCardDetailsMutation,
      variables: {
        data: data
      }
    })
    .then(res => {
      this.props.handlePaymentMethod(res.data);
      this.setState({ loading: false });
    })
    .catch(error => {
      this.setState({
        loading: false,
        errorMessage: "Invalid card information"
      });
    });
  }


  /**
   * render
   */
  render() {
    const { classes, bookingId, updatePayment } = this.props;
    let {
      loading,
      creaditDebit,
      errorMessage
    } = this.state;
    return (
          <Typography variant="body1" component="span">
            {loading === true ? <Pageloader loading={loading} /> : ""}
            {bookingId === "" ? (
              ""
            ) : (
              <Typography
                variant="caption"
                component="p"
                className={classes.bookingIdError}
              >
                Your payment failed to process. Please submit new payment
                information for this booking.
              </Typography>
            )}
            {errorMessage === "" ? (
              ""
            ) : (
              <Typography variant="caption" component="p">
                {errorMessage}
              </Typography>
            )}
            <div className={classes.container}>
              <div className={classes.paymentMethod}>
                <div className={classes.radioMethod}>
                  <FormControl
                    component="fieldset"
                    className={classes.formControlRadio}
                  >
                    <Radio
                      checked={creaditDebit === "creaditDebit"}
                      classes={{
                        root: classes.checkBox,
                        checked: classes.checked
                      }}
                      value="creaditDebit"
                      onChange={this.handleCreditDebit}
                    />
                  </FormControl>
                  <span className={classes.radioBtnLabel}>
                    Credit or debit card{" "}
                  </span>
                </div>

                <StripeProvider apiKey={this.state.stripeKey}>
                <div className="example">
                  <Elements>
                    <CardDetailsForm showErrorMessage={this.showErrorMessage} submitCardDetails={this.submitCardDetails} updatePayment={updatePayment}/>
                  </Elements>
                </div>
              </StripeProvider>
              </div>
            </div>
          </Typography>
    );
  }
}
PaymentInfoForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const enhance = compose(
  withStyles(styles),
  withRouter,
  withApollo
);

export default enhance(PaymentInfoForm);
