import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router-dom';
import { withApollo } from "react-apollo";
import compose from 'recompose/compose';
import { loader } from 'graphql.macro';
import UserUtils from '../utilities/UserUtils';
import * as commonFunctions from '../utilities/commonFunctions';
import Pageloader from '../commons/pageloader';
import Button from '@material-ui/core/Button';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import HelperService from '../../services/helper'
import HostPlaceholder from '../shared/host-placeholder'

// contexts
import UserContext from '../../contexts/UserContext'
const getProfileDetails = loader('./../../graphql/user/me.graphql');
const inviteReferralQuery = loader('./../../graphql/auth/inviterefferalquery.graphql');

const styles = theme => ({
	container: {
		maxWidth: '1170px',
		margin: '0 auto',
		width: '100%',
		padding: '0 15px',
		'@media (max-width:1170px)': {
			maxWidth: '992px',
		},
		'@media (max-width:1000px)': {
			maxWidth: '750px',
		},
		'@media (max-width:767px)': {
			width: 'calc(100% - 30px)',
			position: 'fixed',
    top: '0',
    background: '#fff',
		zIndex:' 9',
		height: '100vh',
    overflow: 'auto',
		},
		'& > a': {
			display: 'block',
			color: theme.palette.common.blue,
			marginBottom: '7px',
			textDecoration: 'none',
		}
	},
	profileMain: {
		paddingTop: '40px',
		paddingBottom: '40px',
		'& h2': {
			marginBottom: '10px',
			fontSize:'35px',
		},
		'& h2 + p': {
			marginTop: '0',
		},
		'@media (max-width:767px)':{
			paddingTop: '20px',
			'& h2': {
				marginTop: '15px',
				fontSize:'25px',
			},
		}
	},
	formInputBox: {
		'& label + div ': {
			marginTop: '0',
			marginBottom: '0',
			width: '100%'
		},
		'& > div > div':{
			background:'#f3f5f5',
			padding:'12px 15px',
			marginTop:'5px',
			borderRadius:'8px'
		},
		'& textarea':{
			fontSize:'14px',
		},
		position: "relative",
		marginBottom: "20px",
		'& fieldset': {
			opacity: 0,
		},
		'& p': {
			fontSize: '14px',
		},

		'& label': {
			textTransform: "uppercase",
			fontSize: '14px',
			marginBottom: '3px',
			letterSpacing: '1px'
		},
		'& input': {
			background: theme.palette.common.gray,
			position: "relative",
			width: "100%",
			padding: "10px 15px ",
			fontWeight: "normal",
			border: '1px solid #f3f5f5',
			fontSize: '14px',
			borderRadius: '5px',
			maxWidth: '300px',
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
				maxWidth: '20px'
			}
		},
	},
	profileMainLeftBox: {
		width: '100%',
		maxWidth: '450px',
		'& span': {
			display: 'inline-block',
			marginTop: '25px',
			minWidth: '210px',
			fontSize: '18px',
			fontWeight: '400',
		},
		'@media (max-width:767px)':{
			'& span': {
				width:'calc(100% - 50px)',
				marginBottom:'35px',
			}
		}
	},
	backButton: {
		color: theme.palette.common.blue,
		cursor: 'pointer',
		textTransform: 'uppercase',
		fontWeight: '500',
		paddingBottom: '5px',
		'& i': {
			fontSize: '18px',
			verticalAlign: 'middle',
			paddingRight: '2px',
			marginTop: '-2px',
		},
		'@media(max-width:767px)':{
			color: theme.palette.common.black,
			width:'20px',
			height:'20px',
			overflow:'hidden',
			'& i': {
				fontSize: '22px',
			}
		}
	},
	referalCode: {
		margin: '30px 0',
		"& label": {
			color: theme.palette.common.black,
			textTransform: 'uppercase',
			fontWeight: '500',
			letterSpacing: '1px',
		},
		"& p": {
			margin: '0'
		},

	},
	managePaymentBtn: {
		background: 'transparent',
		border: '2px solid #22bfea',
		padding: '4px 25px',
		fontSize: '13px',
		marginTop: '10px',
		fontWeight: '500',
		textTransform: 'inherit',
		'& span': {
			color: theme.palette.common.black,
		},
		'&:hover': {
			background: theme.palette.common.white,
			'& span': {
				color: theme.palette.common.blue,
			},
		}
	},
	inviteMessage:{
		background:'#edf6fa',
		padding: '15px',
		fontSize: '13px',
		marginTop:'35px',
		'& p':{
			marginTop:'0',
			color:theme.palette.common.blue,
			fontWeight:'normal'
		}
	},
	copiedText: {
		color: 'green',
		paddingTop: '5px',
		paddingLeft: '5px',
		display: 'inline-block',
		marginBottom: '5px',
		position: 'relative',
		bottom: '-6px'
	},
	errorMessage:{
		'& > div > div':{
			border:'1px solid red'
		}
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
		cursor:'pointer'
	},
	messageClass:{
		position: 'relative',
		maxWidth: '400px',
		padding: '10px 25px',
	}
});

class InviteFriends extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			referral: "",
			loading: false,
			copied: false,
			referalLink: "",
			description: "",
			showEmailError:false,
			submitForm:false,
			successMessage:'',
			inviteFrndLink : window.location.origin+'/referral?code=',
			showHostPlaceholder: HelperService.handleHostPlaceholder()
		}
		this.handleBackBtn = this.handleBackBtn.bind(this);
		this.handleInputs = this.handleInputs.bind(this);
		this.submitInviteRefers = this.submitInviteRefers.bind(this);
		this.handleCloseSuccess = this.handleCloseSuccess.bind(this);
	}
	componentDidMount() {
		let accessToken = UserUtils.getAccessToken();
		let { history } = this.props;
		if (accessToken !== null && accessToken !== '') {
			this.setState({ loading: true })
			this.props.client.query({
				query: getProfileDetails,
				fetchPolicy: "network-only"
			})
				.then((res) => {
					this.setState({
						referral: res.data.me.referral || "",
						loading: false
					});
					UserUtils.setUserID(res.data.me.id)
					UserUtils.setUserCountry(res.data.me.country_code);
					UserUtils.setSwimmerCountry(res.data.me.country_code_swimmer);
					UserUtils.setLastPoolId(res.data.me.last_pool_id);
				}).catch(async (error) => {
					let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
					this.setState({ loading: false });
					if (errorMsg === "Unauthenticated.") {
            await this.props.refreshToken(this.props.history)
					}
				});
		} else {
			history.push('/');
		}
	}

	handleCloseSuccess() {
		this.setState({
			successMessage:''
		})
	}

	handleInputs(e) {
		if(e.target.value === '') {
			this.setState({
				showEmailError:true
			})
		} else {
			this.setState({
				showEmailError:false
			})
		}
		this.setState({ description: e.target.value });
	}
	submitInviteRefers() {
		let { referral, description, inviteFrndLink } = this.state;
		if(description === '' ) {
			this.setState({
				showEmailError:true,
				submitForm:true,
			})
		} else {
			this.setState({
				showEmailError:false,
				submitForm:false,
				loading: true
			})
			let emailID = description.split(' ');
			this.props.client.query({
				query: inviteReferralQuery,
				variables: {
					data: {
						"referral": inviteFrndLink+''+referral,
						"to": emailID
					}
				},
			})
			.then((res) => {
				this.setState({
					successMessage:'Referral link sent successfully.',
					description:'',
					loading: false
				})
			}).catch(async (error) => {
				let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
				this.setState({
					profileFailError: errorMsg,
					loading: false
				});
				if (errorMsg === "Unauthenticated.") {
					const status = await this.props.refreshToken(this.props.history)
					if (status === 'ok') {
						this.submitInviteRefers()
					}
				}
			});
		}

	}
	handleBackBtn() {
		this.props.history.goBack()
	}
	render() {
		let { classes } = this.props;
		let { loading, description, referral, inviteFrndLink, copied, showEmailError, submitForm, successMessage } = this.state;
		let link = inviteFrndLink+''+referral;

		if (this.state.showHostPlaceholder) {
			return <HostPlaceholder />
		}

		return (
			<Typography variant="body1" component="span">

				{loading === true ? <Pageloader loading={loading} /> : ''}
				<div className={classes.container}>
					<div className={classes.profileMain}>
						<div className={classes.backButton} onClick={this.handleBackBtn}>
							<i className="fa fa-angle-left"></i> back
					</div>

						<Typography variant="h2" >Invite friends! </Typography>
						{successMessage === "" ? "" : <Typography variant="overline" component="p" className={classes.errorMsgClose+' '+classes.messageClass}>{successMessage}<i className={"fa fa-close " + classes.closeBtn } onClick={this.handleCloseSuccess}></i></Typography>}
						<div className={classes.referalCode}>

							<label>Referral Link</label>
							<p>{link}</p>
							<CopyToClipboard text={link}
								onCopy={() => this.setState({copied: true})}>
								<Button className={classes.managePaymentBtn} >Copy</Button>
							</CopyToClipboard>  {copied === true ? <span className={classes.copiedText}>Copied!</span> : ""}

						</div>
						<Grid container spacing={24}>
							<Grid item xs={12} sm={12} md={8}>
								<div className={classes.profileMainLeft}>
									<div className={classes.profileMainLeftBox}>


										<div className={(showEmailError === true && submitForm === true ? classes.errorMessage:'') +' '+classes.formInputBox}>
											<Typography variant="subtitle2" component="label">Invite your friends by email</Typography>
											<TextField
												id="outlined-email-input"
												className={classes.textFieldTwo}
												placeholder=""
												type="text"
												name="description"
												autoComplete=""
												margin="normal"
												variant="outlined"
												multiline={true}
												rows={8}
												rowsMax={8}
												value={description}
												onChange={this.handleInputs}
											/>
											<p>Enter one email address per line</p>
										</div>
										<div className={classes.inviteMessage}>
												<p>Share a link with your friends and we will give them their first $5 on the house.
												</p>
												<p>Invite a host and you will both get a $50 bonus after their first booking!</p>
										</div>
										<Typography variant="button" onClick={this.submitInviteRefers}>
											Send Invites!
										</Typography>


									</div>
								</div>
							</Grid>
						</Grid>
					</div>
				</div>
			</Typography>
		)
	}
}
InviteFriends.propTypes = {
	classes: PropTypes.object.isRequired,
};
const enhance = compose(
	withStyles(styles),
	withRouter,
	withApollo
);

function InviteFriendsContainer (props) {
  const userContext = useContext(UserContext)
  return <InviteFriends {...userContext} {...props} />
}

export default enhance( InviteFriendsContainer );
