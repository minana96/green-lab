// CheckoutForm.js
import React from "react";
import PropTypes from "prop-types";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from "react-stripe-elements";
import * as commonFunctions from "./../utilities/commonFunctions";
import TextField from "@material-ui/core/TextField";
import UserUtils from '../utilities/UserUtils'
import { IS_US } from '../../config'

const styles = theme => ({

  formInputBox: {
    marginTop: 12,
    "& label + div ": {
      marginTop: "0",
      marginBottom: "0",
      width: "100%"
    },

    position: "relative",
    marginBottom: "15px",
    maxWidth: "450px",
    "& fieldset": {
      opacity: 0
    },

    "& label": {
      textTransform: "uppercase",
      fontSize: "14px",
      paddingBottom: "3px",
      color: theme.palette.common.black,
      fontWeight: "500",
      display: "table"
    },
    "& input": {
      background: theme.palette.common.gray,
      position: "relative",
      width: "100%",
      padding: "10px 15px ",
      fontWeight: "normal",
      border: "1px solid #f3f5f5",
      fontSize: "14px",
      borderRadius: "5px",

      "&:focus": {
        border: "1px solid #00ade2"
      }
    },
    "& span": {
      position: "absolute",
      top: "3px",
      bottom: "0",
      margin: "auto",
      height: "0px",
      left: "9px"
    }
  },
  signupBtn: {
    marginBottom: "15px",
    "& button": {
      display: "inline-block",
      padding: "8px 45px",
      marginTop: "20px",
      borderColor:'transparent'
    },
    "@media (max-width:767px)": {
      "& button": {
        display: "block",
        marginBottom: "45px",
        borderColor:'transparent'
      }
    }
  },
  signupDisableBtn: {
    "& button": {
      background: "#ccc",
      marginTop: "25px",
      borderColor:'transparent',
      pointerEvents:'none'
    },
    "& button:hover": {
      background: "#ccc",
      cursor: "default",
      borderColor:'transparent'
    },
    "@media (max-width:767px)": {
      "& button": {
        display: "block",
        marginBottom: "50px",
        borderColor:'transparent'
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
  errorMessage: {
    "& input": {
      border: "1px solid red",
      borderRadius: "5px"
    }
  },
  paymentForm: {
    position: "relative",
    maxWidth: "450px",
    marginBottom: "15px"
  },
  cardnumber: {
    padding: "10px 15px",
    background: "#f3f5f5",
    borderRadius: 5,
    "& :focus": {
      border: "1px solid #00ade2"
    }
  },
  cardnumberlabel: {
    color: "#232323",
    display: "table",
    fontSize: "14px",
    fontWeight: 500,
    paddingBottom: 3
  },
  expiry: {
    display: "flex",
    maxWidth: " 450px"
  },
  expirydate: {
    width: "50%",
    paddingRight: "15px"
  },
  cvv: {
    width: "50%"
  },
});
class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      cnumber:false,
      ccvv: false,
      cexpiry:false,
      cardnumber:'',
      loading:false,
      showCardHolderNameError: false,
      showFormErrorMessage: false,
    };
    this.validateCardHolderName = this.validateCardHolderName.bind(this);
  }

  validateCardHolderName() {
    let { name } = this.state;
    let hasError = false;
    if (commonFunctions.isEmpty(name)) {
      hasError = true;
    }
    this.setState({
      showCardHolderNameError: hasError === true ? true : false
    });
    return hasError === true ? false : true;
  }

  handleNamechange = e => {
    let name = e.target.value;
    if(name.trim() !== '' && name.trim() !== null){
      this.setState({ cname: true,name: e.target.value });
    } else {
      this.setState({ cname: false, name: e.target.value });
    }
  };

  handlenumber = e => {
    if(e.complete === true){
      this.setState({ cnumber: true });
    } else {
      this.setState({ cnumber: false });
    }
  }


  handlecvv = e => {
    if(e.complete === true){
      this.setState({ ccvv: true });
    } else {
      this.setState({ ccvv: false });
    }
  }
  handleexpiry = e => {
    if(e.complete === true){
      this.setState({ cexpiry: true });
    } else {
      this.setState({ cexpiry: false });
    }
  }

  handleSubmit = ev => {
    ev.preventDefault();
    let { name, cnumber, ccvv, cexpiry } = this.state;

    if(cnumber === true && ccvv === true && cexpiry === true) {
      if (!this.validateCardHolderName()) {
          return
      } else {
        this.setState({
          loading:true
        })
      }
    }


    this.props.stripe
      .createToken({ type: "card",'name': name})
      .then(response => {
        if(response.error) {
          this.validateCardHolderName();
          this.props.showErrorMessage(response.error.message);
        } else {
          UserUtils.setSwimmerCountry( IS_US ? 'US' : 'AU' );
          this.props.submitCardDetails({token:response.token.id})
        }
      });
  };

  render() {
    const { classes, updatePayment } = this.props;
    const { name, cnumber, ccvv, cexpiry,showCardHolderNameError } = this.state;
    let buttonDisable = true;
    if(cnumber === true && cnumber === true && ccvv === true && cexpiry === true && name !== '') {
      buttonDisable = false;
    }
    return (
      <Typography variant="body1" component="div" className={classes.paymentForm}>
        <form onSubmit={this.handleSubmit}>
          <label className={classes.cardnumberlabel}>CARD NUMBER</label>
          <CardNumberElement
            className={classes.cardnumber}
            onChange={this.handlenumber}
            placeholder="**** **** **** ****"
          />
          <div className={classes.formInputBox}>
            <label>Card Holder</label>
            <TextField
               className={
                      showCardHolderNameError === false
                        ? classes.textField
                        : classes.errorMessage
                    }
              type="text"
              placeholder="Name on card"
              name="name"
              autoComplete="off"
              margin="normal"
              variant="outlined"
              value={name}
              onChange={this.handleNamechange}
              onBlur={this.validateCardHolderName}
            />
          </div>
          <div className={classes.expiry}>
            <div className={classes.expirydate}>
              <label className={classes.cardnumberlabel}>EXPIRY DATE</label>
              <CardExpiryElement  className={classes.cardnumber}   name="carexpiry" onChange={this.handleexpiry} />
            </div>
            <div className={classes.cvv}>
              <label className={classes.cardnumberlabel}>CVC</label>
              <CardCvcElement  className={classes.cardnumber}  name="cardcvv" onChange={this.handlecvv}/>
            </div>
          </div>
            <div className={classes.signupBtn + " " + (buttonDisable&&classes.signupDisableBtn)}>
              <Typography variant="button" component="button">
                {updatePayment === true
                  ? "Update Payment Information"
                  : "Enter Payment Information"}
              </Typography>
            </div>

        </form>
      </Typography>
    );
  }
}

CheckoutForm.propTypes = {
  classes: PropTypes.object.isRequired
};

const enhance = compose(withStyles(styles));

export default injectStripe(enhance(CheckoutForm));
