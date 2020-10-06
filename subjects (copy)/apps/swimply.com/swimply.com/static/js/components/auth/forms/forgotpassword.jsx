import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { withApollo } from "react-apollo";
import compose from "recompose/compose";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import { loader } from "graphql.macro";
import Pageloader from "../../commons/pageloader";
import * as commonFunctions from "../../utilities/commonFunctions";
const forgotPasswordMutation = loader(
  "./../../../graphql/auth/forgotpassword.graphql"
);

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  },
  formInputBox: {
    "& label + div ": {
      marginTop: "0",
      marginBottom: "0",
      width: "100%"
    },

    position: "relative",
    marginBottom: "15px",
    "& fieldset": {
      opacity: 0
    },

    "& label": {
      textTransform: "uppercase",
      fontSize: "12px",
      letterSpacing: "0.6px",
      marginBottom: "3px"
    },
    "& input": {
      background: theme.palette.common.gray,
      position: "relative",
      width: "100%",
      padding: "10px 35px ",
      fontWeight: "normal",
      border: "1px solid #f3f5f5",
      fontSize: "13px",
      borderRadius: "5px",
      "&:focus": {
        border: "1px solid #00ade2"
      }
    },
    "& span": {
      position: "absolute",
      top: "7px",
      bottom: "0",
      margin: "auto",
      height: "0px",
      left: "9px",
      "& img": {
        maxWidth: "20px"
      }
    }
  },
  CheckboxBottm: {
    position: "relative",
    marginTop: "-10px",
    "& img": {
      position: "absolute",
      top: "14px",
      bottom: "0",
      left: "28px",
      width: "18px"
    }
  },
  checkBox: {
    color: theme.palette.common.darkgray,
    "&$checked": {
      color: theme.palette.common.blue
    }
  },
  checked: {},
  dialogBoxContainer: {
    padding: "15px 22px 15px",

    "& h3": {
      padding: "15px 22px 15px"
    }
  },
  dialogBox: {
    minWidth: "280px",
    paddingTop: "25px",
    '@media (max-width:480px)': {
      minWidth: '200px',
    },
    "& > label": {
      marginBottom: "15px"
    },
    "& a": {
      textDecoration: "none"
    }
  },
  signupBtn: {
    marginBottom: "15px",
    marginTop: "25px",
    '@media (max-width:359px)': {
      fontSize: '14px',
      '& span': {
        padding: '10px 15px'
      }
    }
  },
  signupToHostBtn: {
    marginBottom: "10px",
    "& span": {
      color: theme.palette.common.black,
      background: theme.palette.common.transparent,
      border: "2px solid #00ade2",
      padding: "6px 15px"
    }
  },
  alreadyHaveAccount: {
    background: theme.palette.common.gray,
    padding: "15px",
    textAlign: "center",
    borderTop: "1px solid #ccc",
    "& label": {
      fontSize: "14px",
      "& span": {
        color: theme.palette.common.blue,
        textTransform: "uppercase",
        fontWeight: "500"
      }
    }
  },
  mobileIcon: {
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "500",
    fontFamily: '"Poppins", sans-serif',
    color: theme.palette.common.darkgray,
    paddingBottom: "15px",
    "& i": {
      position: "absolute",
      left: "10px",
      fontSize: "27px",
      top: "7px",
      color: theme.palette.common.blue,
      "& img": {
        maxWidth: "20px",
        marginTop: "10px",
        marginLeft: "15px"
      }
    }
  },
  modalCloseIcons: {
    position: "absolute",
    right: "20px",
    cursor: "pointer",
    top: "-6px",
    "& img": {
      maxWidth: "30px",
      filter: "grayscale(1)"
    },
    "& img:hover": {
      filter: "grayscale(0)"
    }
  },
  textFieldTwo: {
    background: "#f3f5f5",
    width: "100%",
    marginTop: 0
  },
  forgotPass: {
    position: "absolute",
    top: 0,
    right: 0,
    fontFamily: "poppins",
    fontSize: "12px",
    paddingTop: "3px",
    color: "#00ade2",
    cursor: "pointer"
  },
  errorMessage: {
    "& input": {
      border: "1px solid red",
      borderRadius: "5px"
    }
  }
});

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      showEmailError: false,
      showFormErrorMessage: false,
      loading: false,
      successMessage: "",
      ErrorMessage: ""
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.handleForgotPassword = this.handleForgotPassword.bind(this);
    this.handleForgotPasswordCloseModal = this.handleForgotPasswordCloseModal.bind(
      this
    );
  }
  handleEmail(e) {
    this.setState({ email: e.target.value });
  }
  validateEmail() {
    let { email, showFormErrorMessage } = this.state;
    let hasError = false;
    if (commonFunctions.isEmpty(email)) {
      hasError = true;
    } else if (!commonFunctions.validateEmail(email)) {
      hasError = true;
    }
    this.setState({
      showEmailError: hasError === true ? true : false,
      showFormErrorMessage: showFormErrorMessage === true && false
    });
    return hasError === true ? false : true;
  }

  validateForm() {
    let hasError = false;
    if (!this.validateEmail()) {
      hasError = true;
    }

    this.setState({
      showFormErrorMessage: hasError === true ? true : false
    });
    return hasError === true ? false : true;
  }

  handleForgotPassword(e) {
    if (e.key === undefined || e.key === "Enter") {
      let { email } = this.state;
      if (!this.validateForm()) {
        return;
      }
      this.setState({ loading: true });
      this.props.client
        .mutate({
          mutation: forgotPasswordMutation,
          variables: {
            data: {
              email: email
            }
          }
        })
        .then(res => {
          if (res.data.forgotPassword.status === "EMAIL_NOT_SENT") {
            this.setState({
              successMessage: "",
              ErrorMessage: res.data.forgotPassword.message,
              loading: false
            });
          } else {
            this.setState({
              ErrorMessage: "",
              email: "",
              successMessage: res.data.forgotPassword.message,
              loading: false
            });
          }
        })
        .catch(error => {
          let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
          this.setState({
            loginFailError: errorMsg,
            loading: false
          });
        });
    }
  }
  handleForgotPasswordCloseModal() {
    this.props.handleForgotPasswordCloseModal();
  }

  render() {
    const { classes } = this.props;
    let {
      email,
      showEmailError,
      loading,
      successMessage,
      ErrorMessage
    } = this.state;
    return (
      <div>
        {loading === true ? <Pageloader loading={loading} /> : ""}
        <Typography variant="h3" component="h3">
          Forgot Password
        </Typography>
        {successMessage === "" ? (
          ""
        ) : (
            <Typography variant="overline" component="p">
              {successMessage}
            </Typography>
          )}
        {ErrorMessage === "" ? (
          ""
        ) : (
            <Typography variant="caption" component="p">
              {ErrorMessage}
            </Typography>
          )}
        <p
          onClick={this.handleForgotPasswordCloseModal}
          className={classes.modalCloseIcons}
        >
          <img src={window.location.origin + "/img/close-button.png"} alt="" />
        </p>
        <DialogContent className={classes.dialogBox}>
          <div className={classes.formInputBox}>
            <Typography variant="subtitle2" component="label">
              Email
            </Typography>
            <TextField
              id="outlined-email-input"
              placeholder=""
              className={
                showEmailError === false
                  ? classes.textField
                  : classes.errorMessage
              }
              type="text"
              name="email"
              autoComplete=""
              margin="normal"
              variant="outlined"
              value={email}
              onChange={this.handleEmail}
              onKeyUp={this.handleForgotPassword}
            />
            <span>
              <img src={window.location.origin + "/img/email-n.png"} alt="" />
            </span>
          </div>

          <div
            className={classes.signupBtn}
            onClick={this.handleForgotPassword}
          >
            <Typography variant="button">Send password reset email</Typography>
          </div>
        </DialogContent>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  classes: PropTypes.object.isRequired
};
const enhance = compose(
  withStyles(styles),
  withRouter,
  withApollo
);

export default enhance(ForgotPassword);
