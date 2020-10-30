import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Dialog from '@material-ui/core/Dialog';
import Signup from '../auth/forms/signup';
import Login from '../auth/forms/login';
import CreateProfile from '../auth/forms/createprofile';
import ForgotPassword from '../auth/forms/forgotpassword';
import UserUtils from '../utilities/UserUtils';
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import { loader } from 'graphql.macro';
import { withApollo } from "react-apollo";
import TagManager from 'react-gtm-module';
import ReactGA from 'react-ga';
import OauthSignUp from "../auth/forms/OauthSignUp";
import { LOGO_IMAGE } from '../../config';
import UserContext from "../../contexts/UserContext";
import AppContext from "../../contexts/AppContext";
// import ToggleRegion from './toggle-region'
const getProfileDetails = loader('./../../graphql/user/me.graphql');

ReactGA.initialize('UA-3065622-25');
ReactGA.pageview(window.location.pathname + window.location.search);

const styles = theme => ({
	root: {
		background: theme.palette.common.white,
		position: "fixed",
		boxShadow: theme.shape.boxShadowGray,
		color: theme.palette.common.black,
		fontWeight: "normal",
		zIndex: 9,
		width: '100%',
		top: "0"
	},
	headerMain: {
		background: theme.palette.common.transparent,
		boxShadow: "none",
		"& a": {
			color: theme.palette.common.black,
			textDecoration: "none",
		}
	},
	header: {
		width: "95%",
		maxWidth: "1170px",
		margin: "0 auto",
		'@media (max-width:767px)': {
			background: theme.palette.common.blue,
			'& h6': {
				display: 'table',
				width: 'calc(100% - 36px)',
				textAlign: 'center',
				'& img': {
					verticalAlign: 'middle',
					filter: 'brightness(0) invert(1)',
				}
			}
		}
	},
	headerGap: {
		height: "65px",
		"@media (max-width:767px)": {
			height: "56px",
		}
	},
	headerScroll: {
		background: theme.palette.common.white,
		'@media (max-width:767px)': {
			paddingTop: '0px'
		}
	},
	buttonHead: {
		'& span': {
			color: theme.palette.common.black,
			fontWeight: '400',
		},
		fontWeight: '300',
		paddingLeft: "20px",
		paddingRight: "20px",
		fontSize: "13px",
		background: theme.palette.common.transparent,
		color: theme.palette.common.black,
		'&:hover': {
			background: theme.palette.common.transparent,
		},
		'&:last-child': {
			paddingRight: "0",
		}
	},
	active: {
		paddingLeft: '20px',
		paddingRight: '20px',
		background: theme.palette.common.transparent,
		'& span': {
			color: '#12bfea',
			background: theme.palette.common.transparent,
			fontWeight: '500',
			fontSize: '13px'
		},
		'&:hover': {
			background: theme.palette.common.transparent,
		},
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
		color: theme.palette.common.black,
		'@media (max-width:767px)': {
			display: "block",
			textAlign: "right",
			position: 'absolute',
			left: '0',
			color: theme.palette.common.white,
		}
	},
	drawerMenu: {
		height: '100vh',
		width: '100vw',
		background: theme.palette.common.white,
		'& ul': {
			display: 'table',
			margin: '0 auto',
			'& > div > div': {
				paddingRight: '0',
			},
			padding: '0',
			'& span': {
				color: theme.palette.common.black,
				background: theme.palette.common.transparent,
				fontSize: '18px',
				textAlign: 'center',
				textTransform: 'uppercase'
			},
			'& svg': {
				color: theme.palette.common.black,
			}
		}
	},
	dialogBoxContainer: {
		padding: '15px 22px',
		'& h3': {
			padding: '15px 22px 15px',
		},
		'& > div > div:first-child': {
			maxHeight: 'calc(100vh - 25px)',
			maxWidth: '350px',
			"@media (max-width:767px)": {
				minWidth: '100%',
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
	buttonHeadLast: {
		paddingRight: '0',
		'& active': {
			paddingRight: '0',
		}
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
	lastButtonHead: {
		paddingRight: '0'
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
			marginBottom: "0"
		},
		"& li": {
			display: " inline-block",
			color: theme.palette.common.blue,
			paddingRight: "34px",
			cursor: "pointer",
			"@media (max-width:767px)": {
				display: "inline-block",
				width: '50%',
				textAlign: "center",
				padding: "15px 0"
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
	responsiveActive: {
		'& span': {
			color: theme.palette.common.blue + ' !important',
		},
		'& a': {
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

class Header extends React.Component {
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
			email: '',
			userIdGTM: '',
			forgotPasswordModal: false,
			userRole: [],
			accessToken: '',
			unreadMessage: false,
			currentPage: this.props.match.path,
			showFacebookSignUpPopup: false,
			showOauthSignUpPopup: false,
			referralToken: '',
			signUpData: {
				accessToken: '',
				fields: [],
				image: null
			}
		}
		this.handleToggle = this.handleToggle.bind(this);
		this.handleModelOpen = this.handleModelOpen.bind(this);
		this.handleModel = this.handleModel.bind(this);
		this.handleCreateProfileModelOpen = this.handleCreateProfileModelOpen.bind(this);
		this.handleLoginModelOpen = this.handleLoginModelOpen.bind(this);
		this.redirectPage = this.redirectPage.bind(this);
		this.addHeaderClass = this.addHeaderClass.bind(this);
		this.renderUnreadMessage = this.renderUnreadMessage.bind(this);
		window.headerComponent = this;
	}

	componentDidMount() {
		let userRole = UserUtils.getUserRole();
		let lastPoolId = UserUtils.getLastPoolId();

		const referralToken = UserUtils.getReferralToken()

		let accessToken = UserUtils.getAccessToken();
		window.scrollTo(0, 0)
		window.addEventListener('scroll', this.addHeaderClass, false);
		this.renderUnreadMessage()

		this.setState({
			userRole: userRole,
			accessToken: accessToken,
			lastPoolId,
			referralToken
		});
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

	redirectToTwitter() {
		window.open("https://twitter.com/swimply");
	}
	redirectToInstagram() {
		window.open("https://www.instagram.com/swimply.official");
	}
	redirectToFacebook() {
		window.open("https://www.facebook.com/swimply.official");
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
		if (data.callback && typeof(data.callback) === 'function') {
			data.callback()
		}
	}

	handleSignupClose(modal) {
		this.setState({ modalOpen: false })
	}
	handleSignUp(data) {
		let userRole = UserUtils.getUserRole();
		let lastPoolId = UserUtils.getLastPoolId();
		let accessToken = UserUtils.getAccessToken();
		this.setState({
			modalOpen: false,
			userId: data.signUp.user_id,
			profileModelOpen: true,
			userRole: userRole,
			accessToken: accessToken,
			lastPoolId
		});
	}
	handleCreateProfileClose() {
		this.setState({ profileModelOpen: false });
		this.redirectToSearch()
	}
	handleCreateProfile() {
		this.setState({ profileModelOpen: false });
		this.redirectToSearch()
	}

	handleLogin() {
		let userRole = UserUtils.getUserRole();
		let lastPoolId = UserUtils.getLastPoolId();
		let accessToken = UserUtils.getAccessToken();
		this.setState({
			loginModelOpen: false,
			userRole: userRole,
			accessToken: accessToken,
			lastPoolId
		}, this.redirectToSearch);
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

	redirectPage(link, permisions) {
		let accessToken = UserUtils.getAccessToken();
		if (permisions === false || (accessToken !== null && accessToken !== '')) {
			let { history } = this.props;
			history.push(link)
		} else {
			this.handleLoginModelOpen();
		}
	}

	redirectToSearch = () => {
		if (this.props.location.pathname === '/referral') {
			this.setState({ referralToken: '' })
			this.props.history.replace('/search')
		}
	}

	handleSignUpScreen = (fields, accessToken, provider) => {
		this.setState({
			signUpData: {
				fields,
				accessToken,
				provider,
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
		}, this.redirectToSearch)
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
					email: res.data.me.email,
				});
				UserUtils.setUserID(res.data.me.id)
				UserUtils.setUserCountry(res.data.me.country_code);
				UserUtils.setSwimmerCountry(res.data.me.country_code_swimmer);
				UserUtils.setLastPoolId(res.data.me.last_pool_id);
			}).catch((error) => {

		});
	}

	closeOauthSignUpPopup = () => {
		this.setState({
			showOauthSignUpPopup: false
		})
	}

	render() {
		const { classes } = this.props;
		const { userId, userIdGTM, email, forgotPasswordModal, accessToken, userRole, unreadMessage, currentPage, lastPoolId } = this.state;

		let calendarActiveClass = false
		if (currentPage === '/daily-calendar-management/:id') {
			calendarActiveClass = true
		}
		let hostActiveClass = false;
		if (currentPage === '/host' || currentPage === '/hostprompt' || currentPage === '/addpool' || currentPage === '/calendar-management/:id' || currentPage === '/editpool') {
			hostActiveClass = true;
		}
		let messagesActiveClass = false;
		if (currentPage === '/conversations' || currentPage === '/messages' || currentPage === '/chat-rules') {
			messagesActiveClass = true;
		}

		let profileActiveClass = false;
		if (
			currentPage === '/profile'
			|| currentPage === '/profile/edit-public-info'
			|| currentPage === '/profile/edit-private-info'
			|| currentPage === '/profile/edit-profile-notifications'
			|| currentPage === '/profile/contact-us'
			|| currentPage === '/profile/invite-friends'
			|| currentPage === '/profile/referral-info'
		) {
			profileActiveClass = true;
		}

		let findPoolActiveClass = false;
		if (currentPage === '/search' || currentPage === '/pooldetails/:id' || currentPage === '/payment/:id' || currentPage === '/payment-method') {
			findPoolActiveClass = true;
		}

		let reservationActiveClass = false;
		if (currentPage === '/host-reservation' || currentPage === '/reservation-details/:id' || currentPage === '/my-reservation' || currentPage === '/reservation-success'
			|| currentPage === '/reservation-cancelled' || currentPage === '/reviews/:bookingId' || currentPage === '/thankyou/:bookingId') {
			reservationActiveClass = true;
		}

		if (userIdGTM && email) {
			const tagManagerArgs = {
				dataLayer: {
					userId: userIdGTM,
					email: email
				},
				dataLayerName: 'PageDataLayer'
			}
			TagManager.dataLayer(tagManagerArgs);
		}

		const sideList = (
			<div>
				<p className={classes.mobileIcon} onClick={this.toggleDrawer('left', false)}><i className="fa"><img src={window.location.origin + "/img/close-button1.png"} alt="" /></i>Menu</p>
				<div className={classes.toggleContainer}>
					{/*<ToggleRegion />*/}
				</div>
				<List>
					<ListItem className={findPoolActiveClass ? classes.responsiveActive : ''} button onClick={() => this.redirectPage('/', false)}>
						<ListItemText primary="Find a pool" />
					</ListItem>
				</List>

				{userRole !== null && userRole === 'Host' ? (
					<List>
						<ListItem className={reservationActiveClass ? classes.responsiveActive : ''} button onClick={() => this.redirectPage('/host-reservation', true)}>
							<ListItemText primary="Reservations" />
						</ListItem>
					</List>
				) : (
						<List>
							<ListItem className={reservationActiveClass ? classes.responsiveActive : ''} button onClick={() => this.redirectPage('/my-reservation', true)}>
								<ListItemText primary="Reservations" />
							</ListItem>
						</List>
					)
				}

				{userRole === 'Host' ?
					<List >
						<ListItem className={hostActiveClass ? classes.responsiveActive : ''} button onClick={() => this.redirectPage('/host', true)}>
							<ListItemText primary="Pool" />
						</ListItem>
					</List>
					: ''}
				{userRole !== null && userRole === 'Host' && lastPoolId
				&& <List>
					<ListItem
						onClick={() => this.redirectPage(`/daily-calendar-management/${lastPoolId}`, true)}
						className={calendarActiveClass ? classes.responsiveActive : ''}
						button
					>
						<ListItemText primary='Calendar' />
					</ListItem>
				</List>}
				<List>
					<ListItem className={messagesActiveClass ? classes.responsiveActive : ''} button onClick={() => this.redirectPage('/messages', true)}>
						{unreadMessage === true ? <span ><small className={classes.mobileMsgUnred}></small></span> : ""}
						<ListItemText primary="Inbox" />
					</ListItem>
				</List>

				{accessToken !== "" && accessToken !== null ?
					<List>
						<ListItem className={profileActiveClass ? classes.responsiveActive : ''} button onClick={() => this.redirectPage('/profile', true)}>
							<ListItemText primary="Profile" />
						</ListItem>
					</List>
					: <List>
						<ListItem button onClick={this.handleLoginModelOpen}>
							<ListItemText primary="Login" />
						</ListItem>
					</List>}
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
						{/* <li className={currentPage === '/aboutus' ? classes.responsiveActive : ''}>
							<Link to="/aboutus">About Us </Link>
						</li> */}
						<li>
							<a href="mailto:admin@swimply.com">Contact US</a>
						</li>
						<li className={currentPage === '/termsandconditions' ? classes.responsiveActive : ''}>
							<Link to="/termsandconditions">Terms of use</Link>
						</li>
						<li className={currentPage === '/privacy' ? classes.responsiveActive : ''}>
							<Link to="/privacy">Privacy policy</Link>
						</li>
					</ul>
				</div>
			</div>
		);


		return (
			<Typography variant="body1" component="span">
				<div className={classes.headerGap + " headerGapTut"}></div>
				<div className={classes.root} >
					<AppBar position="static" className={classes.headerMain} id="header"   >
						<Toolbar className={classes.header}>
							<Typography variant="h6" color="inherit" className={classes.logoImage}>
								<Link to="/"> <img src={LOGO_IMAGE} alt="" /> </Link>
							</Typography>
							<div className={classes.menuMain}>
								<Button className={findPoolActiveClass ? classes.active : classes.inActive + ' ' + classes.buttonHead} color="inherit" onClick={() => this.redirectPage('/', false)}>Find a pool</Button>
								{userRole !== null && userRole === 'Host' ?
									<Button className={reservationActiveClass ? classes.active : classes.inActive + ' ' + classes.buttonHead} color="inherit" onClick={() => this.redirectPage('/host-reservation', true)}>Reservations</Button> :
									<Button className={reservationActiveClass ? classes.active : classes.inActive + ' ' + classes.buttonHead} color="inherit" onClick={() => this.redirectPage('/my-reservation', true)}>Reservations</Button>
								}
								{userRole === 'Host' ? <Button className={hostActiveClass ? classes.active : classes.inActive + ' ' + classes.buttonHead} color="inherit" onClick={() => this.redirectPage('/host', true)}>Pool</Button> : ""}
								{userRole === 'Host'
									? <Button
										className={calendarActiveClass ? classes.active : classes.inActive + ' ' + classes.buttonHead}
										color='inherit'
										onClick={() => this.redirectPage(`/daily-calendar-management/${lastPoolId}`, true)}>
										Calendar
								</Button> : ''}
								<Button className={messagesActiveClass ? classes.active : classes.inActive + ' ' + classes.buttonHead} color="inherit" onClick={() => this.redirectPage('/messages', true)}>{unreadMessage === true ? <span ><small className={classes.msgUnred}></small></span> : ""}Inbox</Button>

								{accessToken !== "" && accessToken !== null ?
									<Button className={(profileActiveClass ? classes.active : classes.inActive) + ' ' + classes.buttonHead} color="inherit" onClick={() => this.redirectPage('/profile', true)}>Profile</Button>
									: <Button className={classes.buttonHead} color="inherit" onClick={this.handleLoginModelOpen}>Login</Button>}
								{/*<ToggleRegion />*/}
							</div>

							<IconButton className={classes.mobileMenu} color="inherit" aria-label="Menu" onClick={this.toggleDrawer('left', true)}>
								<MenuIcon />
							</IconButton>
						</Toolbar>
					</AppBar>
					<SwipeableDrawer
						open={this.state.left}
						onClose={this.toggleDrawer('left', false)}
						onOpen={this.toggleDrawer('left', true)}
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
							openLoginDialog={this.openLoginDialog.bind(this)}
							handleSignupClose={this.handleSignupClose.bind(this)}
							handleSignUp={this.handleSignUp.bind(this)}
							handleSignUpScreen={this.handleSignUpScreen.bind(this)}
							handleOauthLogin={this.handleOauthLogin.bind(this)}
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
							image={this.state.signUpData.image}
							referralToken={this.state.referralToken}
							handleCreateProfileClose={this.handleCreateProfileClose.bind(this)}
							handleCreateProfile={this.handleCreateProfile.bind(this)}
						/>
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
							handleSignUpScreen={this.handleSignUpScreen.bind(this)}
							handleOauthLogin={this.handleOauthLogin.bind(this)}
						/>
					</Dialog>
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
			</Typography>
		)
	}

}



Header.propTypes = {
	classes: PropTypes.object.isRequired,
};

const enhance = compose(
	withStyles(styles),
	withRouter,
	withApollo
);

function HeaderContainer(props) {
	const context = useContext(UserContext)
	const appContext = useContext(AppContext)
	return <Header {...context} {...appContext} {...props} />
};

export default enhance(HeaderContainer);
