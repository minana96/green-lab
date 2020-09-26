import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import compose from 'recompose/compose';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { withRouter } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Dialog from '@material-ui/core/Dialog';
import Signup from '../auth/forms/signup';
import Login from '../auth/forms/login';
import ResetPassword from '../auth/forms/resetpassword';
import CreateProfile from '../auth/forms/createprofile';
import ForgotPassword from '../auth/forms/forgotpassword';
import UserUtils from '../utilities/UserUtils';
import { loader } from 'graphql.macro';
import { withApollo } from "react-apollo";
import TagManager from 'react-gtm-module';
import ReactGA from 'react-ga';
import OauthSignUp from "../auth/forms/OauthSignUp";
import Badge from "../commons/badge";
import { IS_SHVIMPLY, LOGO_IMAGE } from '../../config';
import UserContext from "../../contexts/UserContext";
import AppContext from "../../contexts/AppContext";

// components
// import ToggleRegion from './toggle-region'

const getProfileDetails = loader('./../../graphql/user/me.graphql');

ReactGA.initialize('UA-3065622-25');
ReactGA.pageview(window.location.pathname + window.location.search);

const styles = theme => ({
	root: {
		background: theme.palette.common.transparent,
		position: "fixed",
		boxShadow: "none",
		color: theme.palette.common.white,
		fontWeight: "normal",
		zIndex: 9,
		width: '100%',

	},
	headerMain: {
		background: theme.palette.common.transparent,
		boxShadow: "none",
		"& a": {
			color: theme.palette.common.white,
			textDecoration: "none",
		}
	},
	header: {
		width: "95%",
		maxWidth: "1170px",
		margin: "0 auto",
		'& img': {
			filter: 'brightness(0) invert(1)',
		},
		'& button:hover': {
			background: 'transparent',
		},
		'& button:last-child': {
			border: '1px solid #fff',
			borderRadius: '15px',
			padding: ' 4px 24px',
			marginLeft: '20px',
			'@media (max-width: 880px)': {
				marginLeft: '10px',
			}
		},
		'@media (max-width:767px)': {
			width: '100%',
			'& h6': {
				display: 'table',
				width: 'calc(100% - 40px)',
				textAlign: 'center',
			}
		}
	},
	headerScroll: {
		background: "rgba(255,255,255,1)",
		boxShadow: '0px -2px 9px 0px #ccc',
		'& span': {
			color: theme.palette.common.blue,
		},
		'& img': {
			filter: 'none',
		},
		'& button:first-child': {
			'& > span': {
				color: IS_SHVIMPLY ? theme.palette.common.blue : '#F9007B !important'
			}
		},
		'& button:last-child': {
			border: '1px solid #22bfea',
			background: '#22bfea',
			'& span': {
				color: '#fff',
			}
		}

	},
	buttonHead: {
		fontWeight: 300,
		paddingLeft: "20px",
		paddingRight: "20px",
		fontSize: "13px",
		background: theme.palette.common.transparent,
		color: theme.palette.common.white,
		'& span': {
			fontWeight: '500',
		},
		'@media (max-width:980px)': {
			paddingLeft: "15px",
			paddingRight: "15px",
		},
		'@media (max-width:880px)': {
			paddingLeft: '7px',
			paddingRight: '7px',
			fontSize: '12px',
		}
	},
	joyspace: {
		color: '#F9007B',
		'& span': {
			textShadow: '0px 0px 1px #fff',
		},
		'& > div': {
			padding: '0',
		}
	},
	faMenuIcon: {
		fontSize: "22px",
		display: "block",
		verticalAlign: 'middle',
		paddingLeft: " 7px",
	},
	avatarProfile: {
		width: "auto",
		height: "auto",
		marginRight: "8px",
	},
	menuMain: {
		width: "100%",
		textAlign: "right",
		'@media (max-width:767px)': {
			display: "none",
		}
	},
	mobileMenu: {
		display: "none",
		color: theme.palette.common.white,
		'@media (max-width:767px)': {
			display: "block",
			textAlign: "right",
			position: 'absolute',
			left: '0',

		}
	},
	drawerMenu: {
		height: '100vh',
		width: '100vw',
		background: theme.palette.common.white,
		'& ul': {
			display: 'table',
			margin: '0 auto',
			padding: '5px 0',
			'& > div > div': {
				paddingRight: '0',
			},
			'& span': {
				color: theme.palette.common.black,
				background: theme.palette.common.transparent,
				fontSize: '18px',
				textAlign: 'center',
				textTransform: 'uppercase',
			},
			'& svg': {
				color: theme.palette.common.black,
			}
		}
	},
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
		marginBottom: "10px",
		'& fieldset': {
			opacity: 0,
		},

		'& label': {
			textTransform: "uppercase",
			fontSize: '12px',
		},
		'& input': {
			background: theme.palette.common.gray,
			position: "relative",
			width: "100%",
			padding: "10px 15px ",
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
			top: "3px",
			bottom: "0",
			margin: "auto",
			height: "0px",
			left: "9px",
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
		},
	},
	checked: {},
	dialogBoxContainer: {
		padding: '15px 22px',
		'& h3': {
			padding: '15px 22px 15px',
		},
		'& > div > div:first-child': {
			maxHeight: 'calc(100vh - 25px)',
			maxWidth: '350px',
			minWidth: '350px',
			"@media (max-width:767px)": {
				minWidth: '330px',
				borderRadius: '10px',
			},
			"@media (max-width:360px)": {
				minWidth: '290px',
				borderRadius: '10px',
			}
		}

	},
	dialogBox: {
		minWidth: '280px',
		'& > label': {
			marginBottom: '15px',
		},
		'& a': {
			textDecoration: 'none'
		},
		'@media (max-width:480px)': {
			minWidth: '200px',
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
		'& label': {
			fontSize: '14px',
			'& span': {
				color: theme.palette.common.blue,
				textTransform: 'uppercase',
				fontWeight: '500',
				'@media (max-width:767px)': {
					fontSize: '16px',
				}
			}
		},
		'meida (max-width:767px)': {
			'& span': {
				fontSize: '16px'
			}
		}

	},
	mobileIcon: {
		textAlign: 'center',
		textTransform: 'uppercase',
		fontWeight: '500',
		fontFamily: '"Poppins", sans-serif',
		color: "#ccc",
		paddingBottom: '15px',
		'& i': {
			position: 'absolute',
			left: '10px',
			fontSize: '27px',
			top: '7px',
			color: theme.palette.common.blue,
			'& img': {
				maxWidth: '18px',
				marginTop: '10px',
				marginLeft: '15px',
			},
		},

	},
	modalCloseIcons: {
		position: 'absolute',
		right: '20px',
		cursor: 'pointer',
		top: '0',
		'& img': {
			maxWidth: '30px',
			filter: 'grayscale(1)',
		},
		'& img:hover': {
			filter: 'grayscale(0)',
		},

	},

	textFieldTwo: {
		background: '#f3f5f5',
		width: '100%',
		marginTop: 0,
	},
	msgUnred: {
		content: "",
		position: 'absolute',
		width: '10px',
		height: '10px',
		background: 'red',
		top: '0',
		right: '12px',
		borderRadius: '50%'
	},
	mobileMsgUnred: {
		content: "",
		position: 'absolute',
		width: '10px',
		height: '10px',
		background: 'red',
		top: '4px',
		right: '10px',
		borderRadius: '50%',
		'@media (max-width:767px)': {
			right: '0',
			top: '3px'
		}
	},
	socailIcons: {
		listStyle: "none",
		display: "table",
		textAlign: "center",
		margin: "0 auto",
		padding: 0,
		"& li": {
			width: "40px",
			height: "40px",
			background: theme.palette.common.blue,
			display: "inline-block",
			borderRadius: "50%",
			marginRight: "35px",
			cursor: "pointer",
			'&:last-child': {
				marginRight: '0'
			},
			"&:hover": {
				background: "#00ade2"
			},
			"& i": {
				marginTop: "9px",
				color: "#fff",
				fontSize: '25px',
			}
		}
	},
	pageLinks: {
		listStyle: "none",
		paddingLeft: "0",
		marginBottom: "35px",
		textTransform: "uppercase",
		"@media (max-width:767px)": {
			marginBottom: "0",
			display: 'flex !important',
			flexWrap: 'wrap',
			justifyContent: 'center',
		},
		"& li": {
			display: " inline-block",
			color: theme.palette.common.blue,
			paddingRight: "34px",
			cursor: "pointer",
			"@media (max-width:767px)": {
				// display: "inline-block",
				width: '50%',
				textAlign: "center",
				padding: "15px 0",
				flex: 1,
				whiteSpace: 'nowrap',
				display: 'flex',
				justifyContent: 'center',
				'&:first-child': {
					flex: '100%'
				}
			},
			"& a": {
				color: theme.palette.common.darkgray,
				"&:hover": {
					color: "#00ade2"
				}
			}
		}
	},
	footerMain: {
		fontFamily: '"Poppins", sans-serif',
		width: ' 100%',
		position: ' relative',
		textAlign: 'center',
		maxWidth: ' 290px',
		paddingTop: '70px',
		margin: '0 auto',
	},
	active: {
		'& span': {
			color: theme.palette.common.blue + ' !important',
		}
	},
	logoImage: {
		'& img': {
			maxWidth: '140px',
		}
	},
	toggleContainer: {
		display: 'flex',
		justifyContent: 'center',
		marginBottom: '15px'
	}
});

class Headermain extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			left: false,
			openDrop: false,
			modalOpen: false,
			checkedInstantBooking: false,
			profileModelOpen: false,
			loginModelOpen: false,
			userId: '',
			userIdGTM: '',
			emailGTM: '',
			forgotPasswordModal: false,
			userRole: [],
			accessToken: '',
			resetPassword: '',
			resetPasswordModal: true,
			currentPage: this.props.match.path,
			unreadMessage: false,
			referral_code: "",
			email: "",
			firstname: "",
			showOauthSignUpPopup: false,
			signUpData: {
				accessToken: '',
				fields: []
			}
		}
		this.handleToggle = this.handleToggle.bind(this);
		this.handleModelOpen = this.handleModelOpen.bind(this);
		this.handleModel = this.handleModel.bind(this);
		this.handleCreateProfileModelOpen = this.handleCreateProfileModelOpen.bind(this);
		this.handleLoginModelOpen = this.handleLoginModelOpen.bind(this);
		this.handleResetPassword = this.handleResetPassword.bind(this);
		this.redirectPage = this.redirectPage.bind(this);
		this.goTo = this.goTo.bind(this);
		// this.scrollToContactSection = this.scrollToContactSection.bind(this);
		this.addHeaderClass = this.addHeaderClass.bind(this);
		this.channel = '';
		window.headerComponent = this;
	}

	componentDidMount() {
		window.scrollTo(0, 0)
		let userRole = UserUtils.getUserRole();
		let lastPoolId = UserUtils.getLastPoolId();
		let accessToken = UserUtils.getAccessToken();
		let resetPassword = UserUtils.getResetPassword();
		window.addEventListener('scroll', this.addHeaderClass, false);
		this.renderUnreadMessage();
		this.setState({
			userRole: userRole,
			accessToken: accessToken,
			resetPassword: resetPassword,
			lastPoolId
		});

		let url = UserUtils.getPreviousUrl();
		let is_url = UserUtils.getIsPreviousUrl();
		if (is_url !== undefined && is_url !== null && is_url === 'yes' && url !== undefined && url !== null && url !== '') {
			this.handleLoginModelOpen();
		}

	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (!!this.props.newMessage && (!prevProps.newMessage || prevProps.newMessage.id !== this.props.newMessage.id) && !this.state.unreadMessage) {
			if (+this.props.user.id !== this.props.newMessage.sender_id) {
				this.setState( { unreadMessage: true } )
			}
		}
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.addHeaderClass, false);
	}

	addHeaderClass() {
		const { classes } = this.props;
		let scrollpos = window.scrollY;
		let header = document.getElementById("header");
		scrollpos = window.scrollY;
		if (scrollpos > 10) {
			header.classList.add(classes.headerScroll);
		}
		else {
			header.classList.remove(classes.headerScroll);
		}
	}

	goTo(section) {
		let invalidFields = document.getElementById(section);
		invalidFields.scrollIntoView({ behavior: "smooth" });
	}

	// scrollToContactSection() {
	// 	let contactSection = document.getElementById('contact-section');
	// 	contactSection.scrollIntoView({ behavior: 'smooth' });
	// }

	redirectToTwitter() {
		window.open("https://twitter.com/swimply");
	}
	redirectToInstagram() {
		window.open("https://www.instagram.com/swimply.official");
	}
	redirectToFacebook() {
		window.open("https://www.facebook.com/swimply.official");
	}

	renderUnreadMessage() {
		this.props.client.query({
			query: getProfileDetails,
			fetchPolicy: "network-only"
		})
			.then((res) => {
				this.setState({
					unreadMessage: res.data.me.unread_message,
					userIdGTM: res.data.me.id,
					emailGTM: res.data.me.email,
				});
				UserUtils.setUserID(res.data.me.id)
				UserUtils.setUserCountry(res.data.me.country_code);
				UserUtils.setSwimmerCountry(res.data.me.country_code_swimmer);
				UserUtils.setLastPoolId(res.data.me.last_pool_id);
			}).catch((error) => {

			});
	}

	handleToggle() {
		let { open } = this.state;
		this.setState({ open: !open });
	}

	handle = event => {
		if (this.anchorEl.contains(event.target)) {
			return;
		}
		this.setState({ open: false });
	};

	toggleDrawer = (side, open) => () => {
		this.setState({
			[side]: open,
		});
	};

	handleClick = () => {
		this.setState({
			openDrop: !this.state.openDrop,
			open: false
		});
	};

	handleModelOpen() {
		this.setState({ modalOpen: true });
	}

	handleModel() {
		UserUtils.removePreviousUrl();
		UserUtils.removeIsPreviousUrl();
		UserUtils.removePreviousSearchUrl();
		this.setState({
			modalOpen: false,
			profileModelOpen: false,
			loginModelOpen: false
		});
	}

	handleCreateProfileModelOpen() {
		this.setState({ profileModelOpen: true });
	}

	handleLoginModelOpen(data={}) {
		this.setState({ loginModelOpen: true, 'left': false });
		if (data.callback) {
			data.callback()
		}
	}

	handleSignupClose(modal) {
		this.setState({ modalOpen: false })
	}
	handleSignUp(data, referralCode, firstname, email) {
		let userRole = UserUtils.getUserRole();
		let lastPoolId = UserUtils.getLastPoolId();
		let accessToken = UserUtils.getAccessToken();
		this.setState({
			modalOpen: false,
			userId: data.signUp.user_id,
			profileModelOpen: true,
			userRole: userRole,
			accessToken: accessToken,
			referral_code: referralCode,
			email: email,
			firstname: firstname,
			lastPoolId
		});

	}
	handleCreateProfileClose() {
		this.setState({ profileModelOpen: false })
	}

	handleCreateProfile() {
		this.setState({
			profileModelOpen: false,
		});
	}
	handleLogin() {
		let userRole = UserUtils.getUserRole();
		let lastPoolId = UserUtils.getLastPoolId();
		let accessToken = UserUtils.getAccessToken();
		this.renderUnreadMessage();
		this.setState({
			loginModelOpen: false,
			userRole: userRole,
			accessToken: accessToken,
			lastPoolId
		});
	}

	handleForgotPassword() {
		this.setState({
			forgotPasswordModal: true,
			loginModelOpen: false
		})
	}

	handleForgotPasswordCloseModal() {
		this.setState({ forgotPasswordModal: false });
	}
	openLoginDialog() {
		this.setState({
			modalOpen: false,
			loginModelOpen: true
		});
	}
	handleSignup() {
		this.setState({
			modalOpen: true,
			loginModelOpen: false
		});
	}

	handleResetPasswordClose() {
		let token = UserUtils.getAccessTokenForgotPassword();
		this.setState({ resetPasswordModal: false });
		UserUtils.removeResetPassword('reset_password');
		UserUtils.removeAccessTokenForgotPassword(token);
	}
	handleResetPassword(data) {
		let token = UserUtils.getAccessTokenForgotPassword();
		this.setState({
			resetPasswordModal: true,
		});
		UserUtils.removeResetPassword('reset_password');
		UserUtils.removeAccessTokenForgotPassword(token);
	}

	redirectPage(link, permisions) {
		let accessToken = UserUtils.getAccessToken();
		if (permisions === false || (accessToken !== null && accessToken !== '')) {
			let { history } = this.props;
			this.setState({
				left: false,
			});
			if (history.location.pathname === '/' && /#/.test(link)) {
				window.location.href = link
			} else {
				history.push(link)
			}
		} else {
			this.handleLoginModelOpen();
		}
	}

	handleSignUpScreen = (fields, accessToken, provider) => {
		this.setState({
			signUpData: {
				fields,
				accessToken,
				provider
			},
			loginModelOpen: false,
			modalOpen: false,
			showOauthSignUpPopup: true,
		})
	}

	handleOauthSignUp = (data) => {
		let userRole = UserUtils.getUserRole()
		let lastPoolId = UserUtils.getLastPoolId()
		let accessToken = UserUtils.getAccessToken()
		this.setState({
			showOauthSignUpPopup: false,
			profileModelOpen: true,
			userRole,
			accessToken,
			lastPoolId,
			signUpData: {
				...this.state.signUpData,
				image: data && data.image_url
			}
		})
	}

	handleOauthLogin = () => {
		let userRole = UserUtils.getUserRole()
		let lastPoolId = UserUtils.getLastPoolId()
		let accessToken = UserUtils.getAccessToken()
		this.renderUnreadMessage()
		this.setState({
			loginModelOpen: false,
			modalOpen: false,
			userRole,
			accessToken,
			lastPoolId
		})
	}

	closeOauthSignUpPopup = () => {
		this.setState({
			showOauthSignUpPopup: false
		})
	}

	render() {
		const { classes } = this.props;
		const { emailGTM, userIdGTM, resetPassword, userId, forgotPasswordModal, accessToken,
			userRole, unreadMessage, lastPoolId } = this.state;
		const tagManagerArgs = {
			dataLayer: {
				userId: userIdGTM,
				email: emailGTM
			},
			dataLayerName: 'PageDataLayer'
		}
		TagManager.dataLayer(tagManagerArgs);
		const sideList = (
			<div>
				<p className={classes.mobileIcon} onClick={this.toggleDrawer('left', false)}><i className="fa"><img src={window.location.origin + "/img/close-button1.png"} alt="" /></i>Menu</p>
				<div className={classes.toggleContainer}>
					{/*<ToggleRegion />*/}
				</div>

				{accessToken !== "" && accessToken !== null ? (
					<div>
						<List>

							<ListItem className={classes.joyspace} button onClick={() => this.redirectPage('/#joyspace', false)}>
								<Badge badgeText="New" />
								<ListItemText primary="Joyspace" />
							</ListItem>

							<ListItem className={classes.active} button onClick={() => this.redirectPage('/#mainbody', false)}>
								<ListItemText primary="Find a pool" />
							</ListItem>
						</List>
						{userRole !== null && userRole === 'Host' ? (
							<List>
								<ListItem button onClick={() => this.redirectPage('/host-reservation', true)}>
									<ListItemText primary="Reservations" />
								</ListItem>
							</List>
						) : (
								<List>
									<ListItem button onClick={() => this.redirectPage('/my-reservation', true)}>
										<ListItemText primary="Reservations" />
									</ListItem>
								</List>
							)
						}
						{userRole === 'Host' ?
							<List >
								<ListItem button onClick={() => this.redirectPage('/host', true)}>
									<ListItemText primary="Pool" />
								</ListItem>
							</List>
							: ''}

						{userRole === 'Host' && <List>
							<ListItem button onClick={() => this.redirectPage(`/daily-calendar-management/${lastPoolId}`, true)}>
								<ListItemText primary='Calendar' />
							</ListItem>
						</List>}

						<List>
							<ListItem button onClick={() => this.redirectPage('/messages', true)}>
								{unreadMessage === true ? <span ><small className={classes.mobileMsgUnred}></small></span> : ""}
								<ListItemText primary="Inbox" />
							</ListItem>
						</List>

						<List>
							<ListItem button onClick={() => this.redirectPage('/profile', true)}>
								<ListItemText primary="Profile" />
							</ListItem>
						</List>
					</div>
				) : (
						<div>
							<List>
								<ListItem className={classes.joyspace} button onClick={() => this.redirectPage('/#joyspace', false)}>
									<Badge badgeText="New" />
									<ListItemText primary="Joyspace" />
								</ListItem>
								<ListItem className={classes.active} button onClick={() => this.redirectPage('/#mainbody', false)}>
									<ListItemText primary="Find a pool" />
								</ListItem>
							</List>
							<List>
								<ListItem button onClick={() => this.redirectPage('/listyourpool', false)}>
									<ListItemText primary="BECOME A HOST" />
								</ListItem>
							</List>
							<List>
								<ListItem button onClick={this.handleLoginModelOpen}>
									<ListItemText primary="Login" />
								</ListItem>
							</List>
						</div>
					)}

				<div className={classes.footerMain}>
					<ul className={classes.socailIcons}>
						<li onClick={this.redirectToTwitter}>
							<i className="fa fa-twitter" />
						</li>
						<li onClick={this.redirectToFacebook}>
							<i className="fa fa-facebook" />
						</li>
						<li onClick={this.redirectToInstagram}>
							<i className="fa fa-instagram" />
						</li>
					</ul>
					<ul className={classes.pageLinks}>
						{/* <li>
							<Link to="/aboutus">About Us </Link>
						</li> */}
						<li>
							<a href="mailto:admin@swimply.com">Contact US</a>
						</li>
						<li>
							<Link to="/termsandconditions">Terms of use</Link>
						</li>
						<li>
							<Link to="/privacy">Privacy policy</Link>
						</li>
					</ul>

				</div>
			</div>
		);
		return (
			<div className={classes.root} >
				<AppBar position="static" className={classes.headerMain} id="header">
					<Toolbar className={classes.header}>
						<Typography variant="h6" color="inherit" className={classes.logoImage}>
							<Link to="/"> <img src={LOGO_IMAGE} alt="" /> </Link>
						</Typography>
						{accessToken !== "" && accessToken !== null ? (
							<div className={classes.menuMain}>
								{IS_SHVIMPLY ? null
								: <Button className={[classes.buttonHead, classes.joyspace]} color="inherit" onClick={this.goTo.bind(this, 'joyspace')}>
									<Badge badgeText="New" />
									Joyspace
								</Button>}
								<Button className={classes.buttonHead} color="inherit" onClick={this.goTo.bind(this, 'mainbody')}>Find a pool</Button>
								{userRole !== null && userRole === 'Host' ?
									<Button className={classes.buttonHead} color="inherit" onClick={() => this.redirectPage('/host-reservation', true)}>Reservations</Button> :
									<Button className={classes.buttonHead} color="inherit" onClick={() => this.redirectPage('/my-reservation', true)}>Reservations</Button>
								}
								{userRole !== null && userRole === 'Host' ? <Button className={classes.buttonHead} color="inherit" onClick={() => this.redirectPage('/host', true)}>Pool</Button> : ""}
								{userRole !== null && userRole === 'Host' && <Button
									className={classes.buttonHead}
									color='inherit'
									onClick={() => this.redirectPage(`/daily-calendar-management/${lastPoolId}`, true)}>
									Calendar
								</Button>}
								<Button className={classes.buttonHead} color="inherit" onClick={() => this.redirectPage('/messages', true)}>{unreadMessage === true ? <span ><small className={classes.msgUnred}></small></span> : ""}Inbox</Button>
								{/*{this.state.currentPage === '/'*/}
								{/*	? <Button className={classes.buttonHead} color="inherit" onClick={this.scrollToContactSection}>Contact Us</Button>*/}
								{/*	: null*/}
								{/*}*/}
								<Button className={classes.buttonHead} color="inherit" onClick={() => this.redirectPage('/profile', true)}>Profile</Button>
								{/*<ToggleRegion />*/}
							</div>
						) : (
								<div className={classes.menuMain}>
									{IS_SHVIMPLY ? null
									: <Button className={[classes.buttonHead, classes.joyspace]} color="inherit" onClick={this.goTo.bind(this, 'joyspace')}>
										<Badge badgeText="New" />
										Joyspace
									</Button>}
									<Button className={classes.buttonHead} color="inherit" onClick={this.goTo.bind(this, 'mainbody')}>Find a pool</Button>
									<Button className={classes.buttonHead} color="inherit" onClick={() => this.redirectPage('/listyourpool', false)}>BECOME A HOST</Button>
									{/*{this.state.currentPage === '/'*/}
									{/*	? <Button className={classes.buttonHead} color="inherit" onClick={this.scrollToContactSection}>Contact Us</Button>*/}
									{/*	: null*/}
									{/*}*/}
									<Button className={classes.buttonHead} color="inherit" onClick={this.handleLoginModelOpen}>Login</Button>
									{/*<ToggleRegion />*/}
								</div>
							)}

						<IconButton className={classes.mobileMenu} color="inherit" aria-label="Menu" onClick={this.toggleDrawer('left', true)}>
							<MenuIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
				<SwipeableDrawer
					open={this.state.left}
					on={this.toggleDrawer('left', false)}
					onOpen={this.toggleDrawer('left', true)}
					onClose={this.toggleDrawer('left', false)}
				>
					<div
						className={classes.drawerMenu}
						tabIndex={0}
						role="button"
					>
						{sideList}
					</div>
				</SwipeableDrawer>

				<Dialog
					open={this.state.modalOpen}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
					className={classes.dialogBoxContainer}
				>
					<Signup
						handleSignUpScreen={this.handleSignUpScreen}
						handleOauthLogin={this.handleOauthLogin}
						openLoginDialog={this.openLoginDialog.bind(this)}
						handleSignupClose={this.handleSignupClose.bind(this)}
						handleSignUp={this.handleSignUp.bind(this)}
					/>
				</Dialog>
				<Dialog
					open={this.state.profileModelOpen}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
					className={classes.dialogBoxContainer}
				>
					<CreateProfile
						userId={userId}
						referralCode={this.state.referral_code}
						email={this.state.email}
						firstname={this.state.firstname}
						image={this.state.signUpData.image}
						handleCreateProfileClose={this.handleCreateProfileClose.bind(this)}
						handleCreateProfile={this.handleCreateProfile.bind(this)} />
				</Dialog>
				<Dialog
					open={this.state.loginModelOpen}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
					className={classes.dialogBoxContainer}
				>
					<Login
						handleSignup={this.handleSignup.bind(this)}
						handleForgotPassword={this.handleForgotPassword.bind(this)}
						handleLogin={this.handleLogin.bind(this)}
						handleSignUpScreen={this.handleSignUpScreen}
						handleOauthLogin={this.handleOauthLogin}
					/>
				</Dialog>
				{resetPassword === "reset_password" ?
					<Dialog
						open={this.state.resetPasswordModal}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
						className={classes.dialogBoxContainer}
					>
						<ResetPassword
							handleResetPasswordClose={this.handleResetPasswordClose.bind(this)}
							handleResetPassword={this.handleResetPassword.bind(this)}
						/>
					</Dialog> : ""}

				<Dialog
					open={forgotPasswordModal}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
					className={classes.dialogBoxContainer}
				>
					<ForgotPassword handleForgotPasswordCloseModal={this.handleForgotPasswordCloseModal.bind(this)} />
				</Dialog>
				<Dialog
					open={this.state.showOauthSignUpPopup}
					aria-labelledby='alert-dialog-title'
					aria-describedby='alert-dialog-description'
					className={classes.dialogBoxContainer}
				>
					<OauthSignUp
						handleOauthSignUp={this.handleOauthSignUp}
						closePopup={this.closeOauthSignUpPopup}
						signUpData={this.state.signUpData}
					/>
				</Dialog>
			</div>
		)
	}
}

Headermain.propTypes = {
	classes: PropTypes.object.isRequired,
};

const enhance = compose(
	withStyles(styles),
	withRouter,
	withApollo
);

function HeaderMainContainer(props) {
	const context = useContext(UserContext)
	const appContext = useContext(AppContext)
	return <Headermain {...context} {...appContext} {...props} />
};

export default enhance(HeaderMainContainer);
