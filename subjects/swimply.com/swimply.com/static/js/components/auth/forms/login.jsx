import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { withApollo } from 'react-apollo';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import { loader } from 'graphql.macro';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import UserUtils from '../../utilities/UserUtils';
import * as commonFunctions from './../../utilities/commonFunctions';
import Pageloader from '../../commons/pageloader';
import FacebookButton from '../FacebookButton';
import UserContext from '../../../contexts/UserContext';
import { RouterContext } from '../../router/router-context';
import { IS_SHVIMPLY } from '../../../config'
import AppleButton from '../AppleButton';
import AppContext from "../../../contexts/AppContext";

const loginMutation = loader('./../../../graphql/auth/login.graphql');

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
		display: 'flex',
		justifyContent: 'space-between',
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
		// marginBottom: '15px',
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
				cursor:'pointer',
				'@media (max-width:767px)':{
					fontSize:'16px',
				}
			},
			'& span:hover': {
				color:theme.palette.common.black,
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
		fontFamily: 'poppins',
		fontSize: '12px',
		paddingTop: '3px',
		color: '#00ade2',
		cursor: 'pointer',
		'@media(max-width:359px)':{
			fontSize:'10px',
			paddingTop: '6px',
		}
	},
	errorMessage: {
		'& input':{
		border: '1px solid red',
		borderRadius:'5px',
		}
	},
	passwordImg: {
		'& img': {
			maxWidth: '25px',
			minWidth: '25px',
			marginTop: '-5px',
		}
	},
	blueErrorMsgClose: {
		position: 'relative',
		marginTop: '5p',
		padding: '10px 30px 10px 10px',
		fontSize: '12px',
		textAlign: 'left',
		transition: 'all 0.2s ease',
		background: '#daf4fe',
		color: '#107ba5',
		cursor: 'pointer',
	},
	hidden: {
		opacity: '0',
		marginTop: '25px',
	},
	closeBtn: {
		float: 'right',
		fontSize: '18px',
		position: 'absolute',
		top: '0',
		bottom: '0',
		right: '10px',
		margin: 'auto',
		height: '17px',
		color: '#2399c4',
	},
	orText: {
		textAlign: 'center',
		margin: '8px 0',
	},
});

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			rememberMe: true,
			showEmailError: false,
			showPasswordError: false,
			showFormErrorMessage: false,
			errorMessage: '',
			loading: false,
			loginFailError: ''
		}
		this.handleEmail = this.handleEmail.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
		this.validateEmail = this.validateEmail.bind(this);
		this.validatePassword = this.validatePassword.bind(this);
		this.handleRememberMe = this.handleRememberMe.bind(this);
		this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
		this.handleForgotPasswordModal = this.handleForgotPasswordModal.bind(this);
		this.handleLoginModelClose = this.handleLoginModelClose.bind(this);
		this.redirectToSignup = this.redirectToSignup.bind(this);
		this.goToSettingsCallback = this.goToSettingsCallback.bind(this);
	}
	static contextType = RouterContext;

	goToSettingsCallback (lastStep) {
		this.props.history.push({
      pathname: '/addpool',
      state: { lastStep }
    })
	}

	handleEmail(e) {
		this.setState({ email: e.target.value });
	}
	handlePassword(e) {
		this.setState({ password: e.target.value });
	}
	handleRememberMe(e) {
		this.setState({ rememberMe: e.target.checked });
	}

	validateEmail() {
		let { email, showFormErrorMessage } = this.state;
		let hasError = false;
		if (commonFunctions.isEmpty(email)) {
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
		if (commonFunctions.isEmpty(password)) {
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

	handleLoginSubmit(e) {
		if(e.key === undefined || e.key === 'Enter') {
			e.preventDefault();
			let { email, password } = this.state;
			let { history } = this.props;
			if (!this.validateForm()) {
				return
			}
			this.setState({ loading: true });
			this.props.client.mutate({
				mutation: loginMutation,
				variables: {
					data: {
						'username': email,
						'password': password
					}
				}
			})
				.then(({ data }) => {
					if (!data.login.role.length) {
						throw new Error('Server error')
					}

					const role = data.login.role[0].name
					UserUtils.removeReferralId();
					UserUtils.removeReferralToken();
					UserUtils.setEmail(email);
					UserUtils.setAccessToken(data.login.access_token);
					UserUtils.setRefreshToken(data.login.refresh_token);
					UserUtils.setUserRole(role);
					UserUtils.setLastPoolId(data.login.last_pool_id);
					UserUtils.setUserCountry(data.login.country_code);
					UserUtils.setSwimmerCountry(data.login.country_code_swimmer);

					this.props.handleLogin(data);
					this.props.handleUser()
					this.setState({ loading: false });
					let currentPage =  this.props.match.path;
					if(currentPage === '/payment/:id' && window.setAccessToken !== undefined) {
						window.setAccessToken();
					} else {
						let url = UserUtils.getPreviousUrl();
						let is_url = UserUtils.getIsPreviousUrl();
						let search_url = UserUtils.getPreviousSearchUrl();
						if(is_url !== undefined && is_url !== null && is_url === 'yes' && url !== undefined
							&& url !== null && url !== '') {
							UserUtils.removePreviousUrl();
							UserUtils.removeIsPreviousUrl();
							UserUtils.removePreviousSearchUrl();

							if(url === 'home_top') {
								window.scrollTo(0, 0);
							} else {
								let redirect = {};
								redirect.pathname = url;
								if(search_url !== undefined && search_url !== null && search_url !== '') {
									redirect.search = search_url;
								}
								history.push(redirect);
							}
						}
					}
					if (role.toLowerCase() === 'host' && data.login.notify_olden === false && data.login.last_pool_id) {
						this.context.showIncompleteHostPopup({lastPool: data.login.last_pool_id, userName: data.login.firstname + ' ' + data.login.lastname, userRole: role.toLowerCase(), infoIsComplete: data.login.notify_olden, onPressSettings: this.goToSettingsCallback })
					}
				}).catch((error) => {
					let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
					this.setState({
						loginFailError: errorMsg,
						loading: false
					});
				});
		}
	}
	handleForgotPasswordModal() {
		UserUtils.removePreviousUrl();
      	UserUtils.removeIsPreviousUrl();
      	UserUtils.removePreviousSearchUrl();
		this.props.handleForgotPassword();
	}
	handleLoginModelClose() {
		UserUtils.removePreviousUrl();
      	UserUtils.removeIsPreviousUrl();
      	UserUtils.removePreviousSearchUrl();
		this.props.handleLogin();
	}
	redirectToSignup() {
		UserUtils.removePreviousUrl();
      	UserUtils.removeIsPreviousUrl();
      	UserUtils.removePreviousSearchUrl();
		this.props.handleSignup();
	}

	handleCloseError = () => {
		this.setState({
			 errorMessage: ''
		})
	}

	showErrorMessage = (errorMessage = '') => {
		this.setState({
			errorMessage
		})
	}

	render() {
		const { classes } = this.props;
		let { loading, email, password, rememberMe, showEmailError, showPasswordError, loginFailError } = this.state;
		return (
			<div>
				 {loading === true ? <Pageloader loading={loading}/> : ""}
				<Typography variant="h3" component="h3">Login</Typography>
				{loginFailError === "" ? "" : <Typography variant="caption" component="p">{loginFailError}</Typography>}
				<p onClick={this.handleLoginModelClose} className={classes.modalCloseIcons}><img src={window.location.origin +"/img/close-button.png"} alt="" /></p>
				{this.state.errorMessage && <Typography
					variant='caption'
					component='p'
					className={`${classes.blueErrorMsgClose} ${!this.state.errorMessage ? classes.hidden : ''}`}
				>
					{this.state.errorMessage}
					<i
						className={`fa fa-close ${classes.closeBtn}`}
						onClick={this.handleCloseError}
					/>
				</Typography>}
				<DialogContent className={classes.dialogBox}>
				<form onSubmit={this.handleLoginSubmit}>
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
							onKeyUp={this.handleLoginSubmit}
						/>
						<span><img  src={window.location.origin + '/img/email-n.png'}  alt="" /></span>
					</div>

					<div className={classes.formInputBox}>
						<Typography variant="subtitle2" component="label">Password</Typography>
						<TextField
							id="outlined-password-input"
							placeholder=""
							className={showPasswordError === false ? classes.textField : classes.errorMessage}
							type="password"
							name="password"
							autoComplete=""
							margin="normal"
							variant="outlined"
							value={password}
							onChange={this.handlePassword}
							onKeyUp={this.handleLoginSubmit}
						/>
						<span className={classes.passwordImg}><img src={window.location.origin + "/img/password.png"} alt="" /></span>
					</div>
					<div className={classes.CheckboxBottm}>
						<FormControlLabel
							className={classes.labelInstantBook}
							control={
								<Checkbox
									checked={rememberMe}
									onChange={this.handleRememberMe}
									value='rememberMe'
									classes={{
										root: classes.checkBox,
										checked: classes.checked,
									}}
								/>
							}
							label="Remember me"
						/>
						<p className={classes.forgotPass} onClick={this.handleForgotPasswordModal}>FORGOT PASSWORD?</p>
					</div>
					<div className={classes.signupBtn} onClick={this.handleLoginSubmit}>
						<Typography variant="button">
							Login
						</Typography>
					</div>
					{!IS_SHVIMPLY && <Typography variant='p' component='label' className={classes.orText}>or</Typography>}
					{IS_SHVIMPLY ? null
						: <FacebookButton
							handleSignUpScreen={this.props.handleSignUpScreen}
							handleOauthLogin={this.props.handleOauthLogin}
							showErrorMessage={this.showErrorMessage}
						/>
					}
					{!IS_SHVIMPLY ? <AppleButton
						handleSignUpScreen={this.props.handleSignUpScreen}
						handleOauthLogin={this.props.handleOauthLogin}
						showErrorMessage={this.showErrorMessage}
					/> : null}
				</form>
				</DialogContent>
				<div className={classes.alreadyHaveAccount} onClick={this.redirectToSignup}>
						<Typography variant="h6" component="label">No account yet? <span> Sign up</span></Typography>
					</div>
			</div>
		)
	}
}

Login.propTypes = {
	classes: PropTypes.object.isRequired,
};
const enhance = compose(
	withStyles(styles),
	withRouter,
	withApollo
);

function LoginContainer(props) {
	const userContext = useContext(UserContext)
	const appContext = useContext(AppContext)
	return <Login {...userContext} {...appContext} {...props} />
};

export default enhance(LoginContainer);

