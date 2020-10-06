import React, { useContext } from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { withApollo } from "react-apollo";
import Pageloader from '../commons/pageloader';
import { Link, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { loader } from 'graphql.macro';
import * as commonFunctions from './../utilities/commonFunctions';
import UserUtils from './../utilities/UserUtils';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { PAUSE_POOL_REASONS } from "../../constants";
import TextField from "@material-ui/core/TextField";

// contexts
import UserContext from '../../contexts/UserContext'

// graphql
const myPooldetailsQuery = loader('./../../graphql/findpool/pooldetailsQuery.graphql');
const deleteHostMutation = loader('./../../graphql/host/deletehostmutation.graphql');

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
		}
	},
	addPoolContainer: {
		'& p': {
			fontWeight: '100',
		}
	},
	backStep: {
		marginBottom: '10px',

		'& a': {
			color: theme.palette.common.blue,
			fontWeight: '500',
		},
		'& i': {
			fontSize: '22px',
			verticalAlign: ' text-bottom',
			marginRight: '3px',
			marginTop: '-1px',
		}

	},
	ContentContainer: {
		paddingTop: '0',
		'& h3': {
			fontSize: '25px',
			marginBottom: '12px',
		},
		'& p': {
			fontWeight: '100',
			fontSize: '14px',
			margin: '2px 0 0',
		}
	},
	formContainer: {
		maxWidth: '500px',
		paddingTop: '20px',
	},
	nextButton: {
		marginTop: '35px',
	},
	editPoolcontainer: {
		padding: '60px 0'
	},
	toggleBox: {
		listStyle: 'none',
		display: 'flex',
		paddingLeft: '0',
		margin: '0',
		'& li': {
			padding: '8px 30px',
			cursor: 'pointer',
			border: '1px solid #ccc',
			'&:first-child': {
				borderRadius: '5px 0px 0px 5px',
			},
			'&:last-child': {
				marginLeft: '-1px',
				borderRadius: '0px 5px 5px 0px',
			}
		}
	},
	active: {
		border: '1px solid #22bfea !important',
		color: theme.palette.common.blue,
		zIndex: '1',
		cursor: 'text !important',
	},

	formInputBox: {
		position: "relative",
		marginBottom: "20px",
		'& fieldset': {
			opacity: 0,
		},
		'& label': {
			textTransform: "uppercase",
			fontSize: '12px',
			marginBottom: '5px',
			letterSpacing: '1px'
		},
	},
	editPoolList: {
		listStyle: 'none',
		paddingLeft: '0',
		marginTop: '15px',
		cursor: 'pointer',
		'& li': {
			padding: '13px 15px',
			fontWeight: '300',
			background: 'url(img/Arrow-Right.png)',
			border: '1px solid #d2dddd',
			borderBottom: '0',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'right 10px center',
			backgroundSize: '20px',
			'&:last-child': {
				borderBottom: '1px solid #d2dddd',
			}
		},
		'@media (max-width:767px)': {
			margin: '15px -15px',
			'& li': {
				borderLeft: 0,
				borderRight: 0,
			}
		}

	},
	waitingCertiBtn: {
		background: '#2bb67f',
		border: '2px solid #2bb67f',
		padding: '3px 15px',
		fontSize: '13px',
		marginTop: '15px',
		fontWeight: '300',
		textTransform: 'uppercase',
		'& span': {
			color: '#fff',
		},
		'&:hover': {
			background: '#2bb67f',
			'& span': {
				color: theme.palette.common.white,
			}

		},
	},
	managePaymentBtn: {
		background: 'transparent',
		border: '2px solid #22bfea',
		padding: '6px 45px',
		fontSize: '13px',
		fontWeight: '500',
		textTransform: 'uppercase',
		'@media(max-width:767px)': {
			width: '100%',
		},
		'& span': {
			color: theme.palette.common.black,
		},
		'&:hover': {
			background: theme.palette.common.blue,
			'& span': {
				color: theme.palette.common.white,

			},
		}

	},
	deletePopup: {
		'& span': {
			padding: '3px 20px'
		},
		'@media (max-width:767px)': {
			'& > div > div ': {
				margin: '15px'
			}
		}
	},
	editPoolPopupText: {

		maxWidth: "350px",
		'& h3': {
			marginBottom: '15px',
		},
		'& p': {
			color: theme.palette.common.black,
			fontSize: "12px"
		}

	},
	deactivateBtn: {
		display: 'block',
		padding: '0 15px',
		'& span': {
			marginBottom: '10px',
			padding: '10px 20px',
		},
		'& span:last-child': {
			background: 'transparent',
			color: theme.palette.common.blue,
		}
	},
	continueText: {
		background: '#fdece2',
		color: '#f99f6c !important',
		textAlign: 'center',
		padding: '10px',
		marginTop: '35px'
	},
	divider: {
		borderBottom: '1px solid #ccc',
		paddingTop: '20px',
		margin: "0 -24px"


	},
	greenBtn: {
		background: '#008000',
		borderColor: '#008000'
	},
	redBtn: {
		background: '#ff0000',
		borderColor: '#ff0000'
	},
	selectReason: {
		width: '100%'
	},
	selectItem: {
		whiteSpace: 'pre-wrap',
		'@media (max-width:500px)': {
			fontSize: '14px'
		}
	},
	mainButton: {
		display: 'block',
		width: '100%',
		maxWidth: '300px',
		height: '44px',
		padding: '9px 20px',
		margin: '0 auto',
		'& span:last-child, span:first-child': {
			padding: '0',
			fontSize: '14px',
			color: '#fff'
		},
		'&:disabled': {
			opacity: '0.6'
		}
	},
	disableBtn: {
		background: "#ccc",
		width: "100%",
		padding: "10px 15px",
		cursor: "default",
		marginTop: "22px",
		"&:hover": {
			background: "#ccc"
		}
	},
});

class Results extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeStep: 0,
			poolInfo: {},
			loading: false,
			deleteAlert: false,
			deactiveAlert: false,
			activePool: true,
			activateAlert: false,
			reason: '',
			otherReason: ''
		}
		this.redirectToListingInfo = this.redirectToListingInfo.bind(this);
		this.handleDeletePoolAlert = this.handleDeletePoolAlert.bind(this);
		this.closePopup = this.closePopup.bind(this);
		this.handleDeletePool = this.handleDeletePool.bind(this);
		this.handleDeactiveAlert = this.handleDeactiveAlert.bind(this);
		this.handleActivatePoolAlert = this.handleActivatePoolAlert.bind(this);
		this.onSelectReason = this.onSelectReason.bind(this);
		this.checkOnSubmit = this.checkOnSubmit.bind(this);
		this.onReasonChange = this.onReasonChange.bind(this);
		this.handlePauseReason = this.handlePauseReason.bind(this);
		this.handlePauseReasonMessage = this.handlePauseReasonMessage.bind(this);
		this.handleOtherReason = this.handleOtherReason.bind(this);
	}
	componentDidMount() {
		this.getPoolDetails()
	}

	getPoolDetails = () => { // refactored
		this.setState({ loading: true }, async () => {
			try {
				let poolId = UserUtils.getHostPoolID()
				const { data: { pool }} = await this.props.client.query({
					query: myPooldetailsQuery,
					variables: { id: poolId },
					fetchPolicy: 'network-only'
				})

				if (pool) {
					let activePool = pool.status !== 3
					this.setState({
						poolInfo: pool,
						loading: false,
						poolID: poolId,
						activePool
					})
				} else {
					this.setState({ loading: false })
				}
			} catch (e) {
				let errorMsg = commonFunctions.parseGraphQLErrorMessage(e)
				this.setState({
					loading: false,
					hostError: errorMsg
				}, async () => {
					if (errorMsg === 'Unauthenticated.') {
						const status = await this.props.refreshToken(this.props.history)
						if (status === 'ok') {
							this.getPoolDetails()
						}
					}
				})
			}
		})
	}

	handleDeletePoolAlert() {
		this.setState({ deleteAlert: true });
	}

	handleActivatePoolAlert() {
		this.setState({ activateAlert: true });
	}

	closePopup() {
		this.setState({
			deleteAlert: false,
			deactiveAlert: false,
			activateAlert: false
		});
	}

	handleDeactiveAlert() {
		this.setState({ deactiveAlert: true });
	}
	handleDeletePool(index) {
		let { poolID } = this.state;
		let { history } = this.props;
		this.setState({ loading: true });
		let data = {
			pool_id: parseInt(poolID) || "",
			status: parseInt(index)
		}

		if (index === 3) { // pause pool
			data.pause_reason = this.handlePauseReason(this.state.reason)
			data.pause_reason_message = this.handlePauseReasonMessage(this.state.reason)
		}

		this.props.client.mutate({
			mutation: deleteHostMutation,
			variables: {
				data: data
			}
		})
			.then((res) => {
				history.push('host');
			}).catch(async (error) => {
				let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
				this.setState({
					hostError: errorMsg,
					loading: false
				});
				if (errorMsg === "Unauthenticated.") {
					const status = await this.props.refreshToken(this.props.history)
					if (status === 'ok') {
						this.handleDeletePool(index)
					}
				}
			});
	}
	redirectToListingInfo() {
		let locationStatus = true;
		this.props.redirectToListingInfo(locationStatus)
	}
	redirectToEditPool(val) {
		let { history } = this.props;
		UserUtils.setEditPoolStatus(val);
		history.push('addpool');
	}

	onSelectReason ({ target: { value: reason } }) {
		this.setState({ reason })
	}

	onReasonChange ({ target: { value: otherReason } }) {
		this.setState({ otherReason })
	}

	handleOtherReason (reason) {
		return reason.match(/Other/) ? this.state.otherReason : reason
	}

	checkOnSubmit () {
		return !this.state.reason || (this.state.reason.match(/Other|had a bad experience/) && this.state.otherReason.trim().length <= 15)
	}

	handlePauseReasonMessage (reason) {
		return reason.toLowerCase().match(/other|had a bad experience/) ? this.state.otherReason : reason
	}

	handlePauseReason (reason) {
		return reason.toLowerCase().match(/other/) ? this.state.otherReason : reason
	}

	render() {
		const { classes } = this.props;
		const { loading, poolInfo, deactiveAlert, activePool } = this.state;
		let status = "";
		if (poolInfo.status === 0) {
			status = "PENDING INSPECTION";
		} else if (poolInfo.status === 1 || poolInfo.status === 5) {
			status = "Active";
		} else if (poolInfo.status === 2 || poolInfo.status === 6) {
			status = "PENDING SWIMPLY APPROVAL";
		} else if (poolInfo.status === 3) {
			status = "INACTIVE";
		} else {
			status = "PENDING APPROVAL";
		}
		return (
			<Typography variant="body1" component="div">
				{loading === true ? <Pageloader loading={loading} /> : ''}
				<div className={classes.container}>
					<div className={classes.editPoolcontainer}>
						<div className={classes.backStep}>
							<Link to="/host" >
								<font><i className="fa fa-angle-left" aria-hidden="true"></i> BACK</font>
							</Link>
						</div>
						<div className={classes.ContentContainer}>
							<Typography variant="h3">
								Edit Pool Details
						</Typography>
							<Typography variant="h4">
								{poolInfo.title === "" ? "Lovely Pool with porch" : poolInfo.title}
							</Typography>
							<p>
								{poolInfo.full_address}
							</p>

						</div>
						<div className={classes.formContainer}>
							{(poolInfo.status === 0 || poolInfo.status === 2) ? (
								<Button className={(status === 'PENDING INSPECTION' || status === 'PENDING APPROVAL' || status === 'PENDING SWIMPLY APPROVAL') ? (classes.greenBtn + ' ' + classes.waitingCertiBtn) : (status === 'INACTIVE') ? (classes.redBtn + ' ' + classes.waitingCertiBtn) : classes.waitingCertiBtn}>{status}</Button>
							) : ''}


							<div className={classes.formInputBox}>
								<ul className={classes.editPoolList}>
									<li onClick={this.redirectToEditPool.bind(this, 'listing_info')}>Pool Name and Description</li>
									<li onClick={this.redirectToEditPool.bind(this, 'images')}>Pool Images</li>
									<li onClick={this.redirectToEditPool.bind(this, 'amenties')}>Amenities</li>
									<li onClick={this.redirectToEditPool.bind(this, 'additional_amenties')}>Additional Amenities </li>
									<li onClick={this.redirectToEditPool.bind(this, 'pricing_guest')}>Pricing & Guests</li>
									<li onClick={this.redirectToEditPool.bind(this, 'cancellation_policy')}>Cancellation Policy</li>
									<li onClick={this.redirectToEditPool.bind(this, 'rules')}>Pool Rules</li>
									<li onClick={this.redirectToEditPool.bind(this, 'privacy')}>Privacy</li>
									<li onClick={this.redirectToEditPool.bind(this, 'location')}>Location and Access Instructions</li>
									<li onClick={this.redirectToEditPool.bind(this, 'dimension')}>Pool Dimensions</li>
									<li onClick={this.redirectToEditPool.bind(this, 'availability')}>Availability</li>
								</ul>
							</div>

							{(status === 'Active' || status === 'INACTIVE') ? <div className={classes.formInputBox}>
								<Typography variant="subtitle2" component="label">LISTING STATUS</Typography>
								{activePool === true ? (
									<ul className={classes.toggleBox}>
										<li className={activePool === true ? classes.active : ''} >Active</li>
										<li className={activePool !== true ? classes.active : ''} onClick={this.handleDeactiveAlert}>Paused</li>
									</ul>
								) : (
									<ul className={classes.toggleBox}>
										<li className={activePool === true ? classes.active : ''} onClick={this.handleActivatePoolAlert}>Active</li>
										<li className={activePool !== true ? classes.active : ''}>Paused</li>
									</ul>
								)}
							</div> : ""}
							{/*<Button className={classes.managePaymentBtn} onClick={this.handleDeletePoolAlert}>Permanently Delete this pool</Button>*/}
						</div>
					</div>
				</div>

				<Dialog
					open={deactiveAlert}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
					className={classes.deletePopup}
				>
					<DialogContent className={classes.editPoolPopupText}>
						<DialogContentText id="alert-dialog-description" >
							<Typography variant="h3">
								Pause pool
							</Typography>
							<p>
								Pausing this pool will cancel all pending reservation requests and confirmed bookings for this pool.
							</p>
							<br />
							You may reactivate this pool later, but cancelled bookings will not return.
							<br />
							<Select
								className={classes.selectReason}
								value={this.state.reason}
								onChange={this.onSelectReason}
								displayEmpty
							>
								<MenuItem value='' className={classes.selectItem}>Select</MenuItem>
								{
									PAUSE_POOL_REASONS.map((reason, index) => {
										return (
											<MenuItem className={classes.selectItem} value={reason}>{reason}</MenuItem>
										)
									})
								}
							</Select>
							{this.state.reason.match(/Other|had a bad experience/) && <div>
								<TextField
									type='text'
									name='email'
									margin='normal'
									variant='outlined'
									onInput={(e) => { e.target.value = e.target.value.slice(0, 140) }}
									value={this.state.otherReason}
									onChange={this.onReasonChange}
									rowsMax={4}
									rows={4}
									fullWidth
									multiline
									placeholder='Pause Reason (min 15 characters)'
								/>
							</div>}
							<p className={classes.continueText}>Are you sure you want to continue?</p>
							<div className={classes.divider} />
						</DialogContentText>
					</DialogContent>
					<DialogActions className={classes.deactivateBtn}>
						<Button
							className={`${classes.mainButton} ${this.checkOnSubmit() ? classes.disableBtn : ''}`}
							disabled={this.checkOnSubmit()}
							onClick={() => this.handleDeletePool(3)}
						>
							PAUSE THIS POOL
						</Button>
						<Typography variant="button" onClick={this.closePopup}>
							CANCEL
						</Typography>
					</DialogActions>
				</Dialog>

				<Dialog
					open={this.state.deleteAlert}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
					className={classes.deletePopup}
				>
					<DialogContent className={classes.editPoolPopupText}>
						<DialogContentText id="alert-dialog-description" >
							<Typography variant="h3">
								Delete this pool
						</Typography>

							Deleting this pool will cancel all pending reservation requests and confirmed bookings for this pool.
							<br />
							Deleting this pool is a permanent action and cannot be undone later.
														<br />
							<p className={classes.continueText}>Are you sure you want to continue?</p>
							<div className={classes.divider}></div>
						</DialogContentText>
					</DialogContent>
					<DialogActions className={classes.deactivateBtn}>
						<Typography variant="button" onClick={() => this.handleDeletePool(6)} autoFocus>
							DELETE THIS POOL
					</Typography>
						<Typography variant="button" onClick={this.closePopup} >
							CANCEL
					</Typography>

					</DialogActions>
				</Dialog>

				<Dialog
					open={this.state.activateAlert}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
					className={classes.deletePopup}
				>
					<DialogContent className={classes.editPoolPopupText}>
						<DialogContentText id="alert-dialog-description" >
							<Typography variant="h3">
								Activate this pool
						</Typography>

							<p className={classes.continueText}>Are you sure you want to continue?</p>
							<div className={classes.divider}></div>
						</DialogContentText>
					</DialogContent>
					<DialogActions className={classes.deactivateBtn}>
						<Typography variant="button" onClick={() => this.handleDeletePool(1)} autoFocus>
							ACTIVATE THIS POOL
					</Typography>
						<Typography variant="button" onClick={this.closePopup} >
							CANCEL
					</Typography>

					</DialogActions>
				</Dialog>

			</Typography>
		)
	}
}
Results.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};


const enhance = compose(
	withStyles(styles, { withTheme: true }),
	withApollo,
	withRouter,
);

function ResultsContainer (props) {
  const userContext = useContext(UserContext)
  return <Results {...userContext} {...props} />
}

export default enhance(ResultsContainer);
