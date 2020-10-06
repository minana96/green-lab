import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { withApollo } from 'react-apollo';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import { loader } from 'graphql.macro';
import UserUtils from '../../utilities/UserUtils';
import * as commonFunctions from '../../utilities/commonFunctions';
import Pageloader from '../../commons/pageloader';
import ReactTooltip from 'react-tooltip';
const resetPasswordMutation = loader('./../../../graphql/auth/reset-password.graphql');


const styles = theme => ({
	paper: {
		position: 'absolute',
		width: theme.spacing.unit * 50,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
		outline: 'none',
	},
	formInputBox: {
		'& label + div ': {
			marginTop: '0',
			marginBottom: '0',
			width: '100%'
		},

		position: "relative",
		marginBottom: "15px",
		'& fieldset': {
			opacity: 0,
		},

		'& label': {
			textTransform: "uppercase",
			fontSize: '12px',
			marginBottom:'3px',
			letterSpacing:'1px'
		},
		'& input': {
			background: theme.palette.common.gray,
			position: "relative",
			width: "100%",
			padding: "10px 35px ",
			fontWeight: "normal",
			border: '1px solid #f3f5f5',
			fontSize: '13px',
			borderRadius: '5px',
			'&:focus': {
				border: '1px solid #00ade2'
			}
		},
		'& span': {
			position: "absolute",
			top: "7px",
			bottom: "0",
			margin: "auto",
			height: "0px",
			left: "9px",
			'& img': {
				maxWidth:'20px'
			}
		},

	},
	CheckboxBottm: {
		position: "relative",
		marginTop: '-10px',
		'& img': {
			position: "absolute",
			top: "14px",
			bottom: "0",
			left: "28px",
			width: "18px",
		},
	},
	checkBox: {
		color: theme.palette.common.darkgray,
		'&$checked': {
			color: theme.palette.common.blue,
			paddingRight:'5px',
		},
	},
	checked: {},
	dialogBoxContainer: {
		padding: '15px 22px',

		'& h3': {
			padding: '15px 22px',

		}
	},
	dialogBox: {
		minWidth: '280px',
		'@media (max-width:480px)':{
			minWidth: '200px',
		},
		'& > label': {
			marginBottom: '15px',
		},
		'& a': {
			textDecoration: 'none'
		}
	},
	signupBtn: {
		marginBottom: '15px',

	},
	signupToHostBtn: {
		marginBottom: '10px',
		'& span': {
			color: theme.palette.common.black,
			background: theme.palette.common.transparent,
			border: '2px solid #00ade2',
			padding: '6px 15px',
		}
	},
	alreadyHaveAccount: {
		background: theme.palette.common.gray,
		padding: '15px',
		textAlign: 'center',
		borderTop: '1px solid #ccc',
		'& label':{
			fontSize:'14px',
			'& span':{
				color:theme.palette.common.blue,
				textTransform:'uppercase',
				fontWeight:'500',
				'& a': {
					color:theme.palette.common.blue,
					textDecoration:'none',
					verticalAlign: 'baseline',
					paddingLeft: '3px',
					paddingTop: '1px',
					display: 'inline-block',
					marginTop: '-3px'
				},
				'& a:hover': {
					color:theme.palette.common.black,					
				}
			}
		},

	},
	mobileIcon: {
		textAlign: 'center',
		textTransform: 'uppercase',
		fontWeight: '500',
		fontFamily: '"Poppins", sans-serif',
		color: theme.palette.common.darkgray,
		paddingBottom: '15px',
		'& i': {
			position: 'absolute',
			left: '10px',
			fontSize: '27px',
			top: '7px',
			color: theme.palette.common.blue,
			'& img': {
				maxWidth: '20px',
				marginTop: '10px',
				marginLeft: '15px',
			},
		},

	},
	modalCloseIcons: {
		position: 'absolute',
		right: '15px',
		cursor: 'pointer',
		top: '-6px',
		'& img': {
			maxWidth: '30px',
			filter: 'grayscale(1)',
		},
		'& img:hover': {
			filter: 'grayscale(0)',
		}
	},
	textFieldTwo: {
		background: '#f3f5f5',
		width: '100%',
		marginTop: 0,
	},
	forgotPass: {
		position: 'absolute',
		top: 0,
		right: 0,
		fontFamily: 'poppins',
		fontSize: '12px',
		paddingTop: '3px',
		color: '#00ade2',
		cursor: 'pointer',
	},
	errorMessage: {
		'& input':{
		border: '1px solid red',
		borderRadius:'5px',
		}
	},
	passwordImg:{
		'& img': {
			maxWidth: '25px',
			minWidth:'25px',
    	marginTop: '-5px',
		}
	},
	inputTooltip: {
		display:'none'
	},
	inputTooltipError: {
		position: 'absolute',
	    top: '20px',
	    right: '11px',
	    background: '#ccc',
	    width: '20px',
	    height: '20px',
	    borderRadius: '50%',
	    textAlign: 'center',
	    fontSize: '12px',
	    display: 'flex',
	    alignItems: 'center',
	    justifyContent: 'center',
	},
	toolTipForms: {
		color: '#ffffff',
		backgroundColor: 'green',
		maxWidth:'240px',
		fontFamily: "'Poppins', sans-serif",
		fontSize:'12px'
	}

});

class ResetPassword extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			showEmailError: false,
			showPasswordError: false,
			showFormErrorMessage: false,
			loading: false,
			loginFailError: '',
			resetSuccessMessage: ''
		}
		this.handleEmail = this.handleEmail.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
		this.validateEmail = this.validateEmail.bind(this);
		this.validatePassword = this.validatePassword.bind(this);
		this.handleResetPasswordSubmit = this.handleResetPasswordSubmit.bind(this);
		this.handleResetPasswordModelClose = this.handleResetPasswordModelClose.bind(this);
	}
	handleEmail(e) {
		this.setState({ email: e.target.value });
	}
	handlePassword(e) {
		this.setState({ password: e.target.value });
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
			showEmailError: (hasError === true) ? true : false,
			showFormErrorMessage: (showFormErrorMessage === true) && false
		});
		return (hasError === true) ? false : true;
	}
	validatePassword() {
		let { password, showFormErrorMessage } = this.state;
		let hasError = false;
		let minLength = 6;
		if (commonFunctions.isEmpty(password)) {
			hasError = true;
		} else if (!commonFunctions.isValidPassword(password, minLength)) {
      hasError = true;
    }
		this.setState({
			showPasswordError: (hasError === true) ? true : false,
			showFormErrorMessage: (showFormErrorMessage === true) && false
		});
		return (hasError === true) ? false : true;
	}
	validateForm() {
		let hasError = false;
		if (!this.validateEmail()) {
			hasError = true;
		}
		if (!this.validatePassword()) {
			hasError = true;
		}
		this.setState({
			showFormErrorMessage: (hasError === true) ? true : false,
		});
		return (hasError === true) ? false : true;
	}

	handleResetPasswordSubmit(e) {
		if(e.key === undefined || e.key === 'Enter') {
			let { email, password } = this.state;
			let token = UserUtils.getAccessTokenForgotPassword();
			if (!this.validateForm()) {
				return
			} 
			let data = {
				'email': email,
				'token': token, 
				'password': password
			};
			if(token !== null && token !== undefined && token !== '') {
				this.setState({ loading: true });
				this.props.client.mutate({
					mutation: resetPasswordMutation,
					variables: { 
						data: data
					}
				})
				.then((res) => {
					if(res.data.updateForgottenPassword.status === "PASSWORD_NOT_UPDATED") {
						this.setState({
							loginFailError: res.data.updateForgottenPassword.message,
							resetSuccessMessage:'',
							loading: false
						});
						
					}else{
						this.props.handleResetPassword(res.data);
						UserUtils.removeResetPassword('reset_password');
						this.setState({ 
							resetSuccessMessage: res.data.updateForgottenPassword.message,
							loginFailError:'',
							loading: false,
							email: "",
							password: ""
						});
					}
					
				}).catch((error) => {
					let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
					this.setState({
						loginFailError: errorMsg,
						loading: false
					});
				});
			} else {
				this.setState({
					loginFailError: 'Reset password token expired!',
					resetSuccessMessage: ''
				});
			}
		}
	}
	handleResetPasswordModelClose() {
		this.props.handleResetPasswordClose();
	}


	render() {
		const { classes } = this.props;
		let { loading, email, password, showEmailError, showPasswordError, loginFailError, resetSuccessMessage } = this.state;
		return (
			<div>
				 {loading === true ? <Pageloader loading={loading}/> : ""}
				<Typography variant="h3" component="h3">Set New Password</Typography>
				{loginFailError === "" ? "" : <Typography variant="caption" component="p">{loginFailError}</Typography>}
				{resetSuccessMessage === "" ? "" : <Typography variant="overline" component="p">{resetSuccessMessage}</Typography>}
				<p onClick={this.handleResetPasswordModelClose} className={classes.modalCloseIcons}><img src={window.location.origin +"/img/close-button.png"} alt="" /></p>
				<DialogContent className={classes.dialogBox}>
					<div className={classes.formInputBox}>
						<Typography variant="subtitle2" component="label">Email</Typography>
						<TextField
							id="outlined-email-input"
							placeholder=""
							className={showEmailError === false ? classes.textField : classes.errorMessage}
							type="text"
							name="email"
							autoComplete=""
							margin="normal"
							variant="outlined"
							value={email}
							onChange={this.handleEmail}
							onBlur={this.validateEmail}
							onKeyUp={this.handleResetPasswordSubmit}
						/>
						<span><img src={window.location.origin +"/img/email-n.png"} alt="" /></span>
					</div>

					<div className={classes.formInputBox}>
						<Typography variant="subtitle2" component="label">Confirm new password</Typography>
						<TextField
							id="outlined-email-input"
							placeholder=""
							className={showPasswordError === false ? classes.textField : classes.errorMessage}
							type="password"
							name="password"
							autoComplete=""
							margin="normal"
							variant="outlined"
							value={password}
							onChange={this.handlePassword}
							onBlur={this.validatePassword}
							onKeyUp={this.handleResetPasswordSubmit}
						/>
						<span className={classes.passwordImg}><img src={window.location.origin +"/img/password.png"} alt="" /></span>
						<p className={showPasswordError === false ? classes.inputTooltip : classes.inputTooltipError} data-tip="Password should contain minimum 6 characters."><i className="fa fa-info"></i></p>
					</div>
				
					<div className={classes.signupBtn} onClick={this.handleResetPasswordSubmit}>
						<Typography variant="button">
							Set password
						</Typography>
					</div>
					
				</DialogContent>
				<ReactTooltip place="top" className={classes.toolTipForms} type="error" effect="solid"/>
			</div>
		)
	}
}

ResetPassword.propTypes = {
	classes: PropTypes.object.isRequired,
};
const enhance = compose(
	withStyles(styles),
	withRouter,
	withApollo
);

export default enhance(ResetPassword);

