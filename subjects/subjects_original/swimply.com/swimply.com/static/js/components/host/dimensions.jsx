import React from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { withApollo } from "react-apollo";
import Pageloader from '../commons/pageloader';
import TextField from '@material-ui/core/TextField';
import Stepper from './stepper';
import { loader } from 'graphql.macro';
import { withRouter } from 'react-router-dom';
import * as commonFunctions from './../utilities/commonFunctions';
import UserUtils from './../utilities/UserUtils';
import TagManager from 'react-gtm-module';
import { IS_US } from '../../config'

const dimensionsMutation = loader('./../../graphql/host/dimensionsmutation.graphql');
const pooldetailsQuery = loader('./../../graphql/findpool/pooldetailsQuery.graphql');

const styles = theme => ({
	stepperNew: {
		padding: '0',
		maxWidth: '350px',
		'& > div': {
			background: theme.palette.common.blue,
		},
	},
	formInputBox: {
		'& > div > div ': {
			padding: '0',
		},
		'& label + div ': {
			marginTop: '0',
			marginBottom: '0',
			width: '100%'

		},

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
		'& input': {
			background: theme.palette.common.gray,
			position: "relative",
			width: "100%",
			padding: "10px 25px 10px 15px",
			fontWeight: "normal",
			border: '1px solid #f3f5f5',
			fontSize: '13px',
			borderRadius: '5px',
			maxWidth: '40px',
			textAlign: 'left',
			'&:focus': {
				border: '1px solid #00ade2'
			},
			"&::placeholder": {
				color: "#000",
				opacity: "0.5"
			},
		},
		'& textarea': {
			background: theme.palette.common.gray,
			padding: "10px 15px ",
			border: '1px solid #f3f5f5',
			fontSize: '13px',
			width: 'calc(100% - 30px)',
			borderRadius: '5px',
			'&:focus': {
				border: '1px solid #00ade2'
			},
			"&::placeholder": {
				color: "#000",
				opacity: "0.6"
			},
		},
		'& span': {
			position: "absolute",
			top: "3px",
			bottom: "0",
			margin: "auto",
			height: "0px",
			left: "60px",
			zIndex: '1',
			fontSize: '12px',
			fontWeight: 'normal',
			'& img': {
				maxWidth: '20px'
			}
		},

	},
	backStep: {
		marginBottom: '10px',
		color: theme.palette.common.blue,
		cursor: 'pointer',
		fontWeight: '500',
		'& i': {
			fontSize: '22px',
			verticalAlign: ' text-bottom',
			marginRight: '3px',
			marginTop: '-1px',
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
		paddingTop: '15px',
		'& p': {
			fontWeight: '100',
			fontSize: '13px',
		}
	},
	formContainer: {
		maxWidth: '350px',
		paddingTop: '10px',
		'@media (max-width:767px)': {
			maxWidth: "100%",
		}
	},
	nextButton: {
		marginTop: '35px',
	},
	perHourRight: {
		position: 'absolute',
		left: '92px',
		top: '35px',
		fontWeight: 'normal',
		fontSize: '12px'
	},
	perHourRightTwo: {
		top: '29px',
	},
	formInputBoxIcon: {
		marginTop: '-25px',
		'& span': {
			top: '-12px',
		}
	},
	errorMessage: {
		'& input': {
			border: '1px solid red',
			borderRadius: '5px',
		}
	},
});

class Dimensions extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeStep: 41.5,
			poolWidth: 0,
			poolLength: 0,
			shallowEnd: 0,
			deepEnd: 0,
			loading: false,
			hostError: '',
			showPoolWidthError: false,
			showPoolLengthError: false,
			showShallowEndError: false,
			showDeepEndError: false,
		}
		this.handlePoolWidth = this.handlePoolWidth.bind(this);
		this.handlePoolLength = this.handlePoolLength.bind(this);
		this.handleShallowEnd = this.handleShallowEnd.bind(this);
		this.handleDeepEnd = this.handleDeepEnd.bind(this);
		this.validatePoolWidth = this.validatePoolWidth.bind(this);
		this.validatePoolLength = this.validatePoolLength.bind(this);
		this.validateShallowEnd = this.validateShallowEnd.bind(this);
		this.validateDeepEnd = this.validateDeepEnd.bind(this);
		this.redirectToPrivacy = this.redirectToPrivacy.bind(this);
		this.handleBackBtn = this.handleBackBtn.bind(this);
	}
	componentDidMount() {
		let poolID = UserUtils.getHostPoolID();
		if (poolID) {
			this.setState({ loading: true });
			this.props.client.query({
				query: pooldetailsQuery,
				variables: {
					"id": poolID
				},
				fetchPolicy: "network-only"
			})
				.then((res) => {
					if (res.data.pool !== null) {
						this.setState({
							poolWidth: res.data.pool.pool_width === 0 ? "" : res.data.pool.pool_width,
							poolLength: res.data.pool.pool_length === 0 ? "" : res.data.pool.pool_length,
							shallowEnd: res.data.pool.shallow_end === 0 ? "" : res.data.pool.shallow_end,
							deepEnd: res.data.pool.deep_end === 0 ? "" : res.data.pool.deep_end,
							loading: false,
							poolID: poolID,
						})
					} else {
						this.setState({ loading: false });
					}
				}).catch((error) => {
					let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
					this.setState({
						loading: false,
						hostError: errorMsg,
					})
				});
		}
	}
	handlePoolWidth(e) {
		this.setState({ poolWidth: e.target.value });
	}
	handlePoolLength(e) {
		this.setState({ poolLength: e.target.value });
	}
	handleShallowEnd(e) {
		this.setState({ shallowEnd: e.target.value });
	}
	handleDeepEnd(e) {
		this.setState({ deepEnd: e.target.value });
	}
	validatePoolWidth() {

		let hasError = false;
		this.setState({
			showPoolWidthError: (hasError === true) ? true : false,
		});
		return (hasError === true) ? false : true;
	}
	validatePoolLength() {

		let hasError = false;
		this.setState({
			showPoolLengthError: (hasError === true) ? true : false,
		});
		return (hasError === true) ? false : true;
	}
	validateShallowEnd() {

		let hasError = false;

		this.setState({
			showShallowEndError: (hasError === true) ? true : false,
		});
		return (hasError === true) ? false : true;
	}
	validateDeepEnd() {

		let hasError = false;

		this.setState({
			showDeepEndError: (hasError === true) ? true : false,
		});
		return (hasError === true) ? false : true;
	}
	validateForm() {
		let hasError = false;
		if (!this.validatePoolWidth()) {
			hasError = true;
		}
		if (!this.validatePoolLength()) {
			hasError = true;
		}
		if (!this.validateShallowEnd()) {
			hasError = true;
		}
		if (!this.validateDeepEnd()) {
			hasError = true;
		}

		return (hasError === true) ? false : true;
	}
	redirectToPrivacy() {
		let { poolWidth, poolLength, shallowEnd, deepEnd, poolID } = this.state;
		let { backBtnChange, history } = this.props;
		this.setState({ loading: true });
		let data = {
			pool_id: parseInt(poolID) || "",
			pool_width: poolWidth || "",
			pool_length: poolLength || "",
			shallow_end: shallowEnd || "",
			deep_end: deepEnd || ""
		}
		this.props.client.mutate({
			mutation: dimensionsMutation,
			variables: {
				data: data
			}
		})
			.then((res) => {
				//Step 5 Save
		          TagManager.dataLayer({ 
		            dataLayer: {
		              poolId: poolID,
		              poolWidth: poolWidth,
		              poolLength: poolLength,
		              shallowEnd: shallowEnd,
		              deepEnd: deepEnd
		            },
		            events: {
		              RegistrationStep5: 'RegistrationStep5'
		            } 
		          });

				if (backBtnChange === true) {
					history.push('editpool');
				} else {
					let privacyStatus = true;
					this.props.redirectToPrivacy(privacyStatus);
				}


			}).catch((error) => {
				let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
				this.setState({
					hostError: errorMsg,
					loading: false
				});
			});
	}

	handleBackBtn() {
		let status = UserUtils.getEditPoolStatus();
		let { history } = this.props;
		if (status === 'dimension') {
			history.push('editpool');
		} else {
			let privacyStatus = false;
			this.props.redirectToAmenitiesAdditional(privacyStatus);
		}
	}

	render() {
		const { classes, backBtnChange } = this.props;
		const { loading, activeStep, hostError, poolWidth, poolLength, shallowEnd, deepEnd, showPoolWidthError, showPoolLengthError, showDeepEndError, showShallowEndError } = this.state;
		return (
			<Typography variant="body1" component="div">
				{loading === true ? <Pageloader loading={loading} /> : ''}
				<div className={classes.locationMain}>
					<div className={classes.backStep} onClick={this.handleBackBtn}>
						<font><i className="fa fa-angle-left" aria-hidden="true"></i> BACK</font>
					</div>

					{backBtnChange === true ? "" : <Stepper activeStep={activeStep} />}
					<div className={classes.ContentContainer}>
						<Typography variant="h3">How big is your pool?</Typography>
						<p>{`Enter your pool's dimensions and depth in ${IS_US ? 'feet' : 'meters'}`}</p>
					</div>
					{hostError === "" ? "" : <Typography variant="caption" component="p">{hostError}</Typography>}
					<div className={classes.formContainer}>
						<div className={classes.formInputBox}>
							<span className={classes.dollar}>{IS_US ? 'ft' : 'm'}.</span>
							<Typography variant="subtitle2" component="label">Pool Area</Typography>
							<TextField
								id="outlined-email-input"
								placeholder="0"
								type="number"
								name="email"
								autoComplete=""
								margin="normal"
								variant="outlined"
								fullWidth={true}
								className={showPoolLengthError === false ? "" : classes.errorMessage}
								value={poolLength}
								onChange={this.handlePoolLength}
								onBlur={this.validatePoolLength}
								onInput={(e) => {
									if (e.target.value < 0) {
										e.target.value = 0
									}
								}}
							/> <div className={classes.perHourRight}>Length</div>
						</div>
						<div className={classes.formInputBox + " " + classes.formInputBoxIcon}>
							<span className={classes.dollar}>{IS_US ? 'ft' : 'm'}.</span>
							<TextField
								id="outlined-email-input"
								placeholder="0"
								type="number"
								name="email"
								autoComplete=""
								margin="normal"
								variant="outlined"
								fullWidth={true}
								className={showPoolWidthError === false ? "" : classes.errorMessage}
								value={poolWidth}
								onChange={this.handlePoolWidth}
								onBlur={this.validatePoolWidth}
								onInput={(e) => {
									if (e.target.value < 0) {
										e.target.value = 0
									}
								}}
							/>
							<div className={classes.perHourRight + " " + classes.perHourRightTwo}>Width</div>
						</div>

						<div className={classes.formInputBox}>
							<span className={classes.dollar}>{IS_US ? 'ft' : 'm'}.</span>
							<Typography variant="subtitle2" component="label">Depth of Pool</Typography>
							<TextField
								id="outlined-email-input"
								placeholder="0"
								type="number"
								name="email"
								autoComplete=""
								margin="normal"
								variant="outlined"
								fullWidth={true}
								className={showShallowEndError === false ? "" : classes.errorMessage}
								value={shallowEnd}
								onChange={this.handleShallowEnd}
								onBlur={this.validateShallowEnd}
								onInput={(e) => {
									if (e.target.value < 0) {
										e.target.value = 0
									}
								}}
							/>
							<div className={classes.perHourRight}>Shallowest point</div>
						</div>
						<div className={classes.formInputBox + " " + classes.formInputBoxIcon}>
							<span className={classes.dollar}>{IS_US ? 'ft' : 'm'}.</span>
							<TextField
								id="outlined-email-input"
								placeholder="0"
								type="number"
								name="email"
								autoComplete=""
								margin="normal"
								variant="outlined"
								fullWidth={true}
								className={showDeepEndError === false ? "" : classes.errorMessage}
								value={deepEnd}
								onChange={this.handleDeepEnd}
								onBlur={this.validateDeepEnd}
								onInput={(e) => {
									if (e.target.value < 0) {
										e.target.value = 0
									}
								}}
							/>
							<div className={classes.perHourRight + " " + classes.perHourRightTwo}>Deepest point</div>
						</div>

						<div className={classes.nextButton} >


							<Typography variant="button" onClick={this.redirectToPrivacy}>
								{backBtnChange === true ? 'Save' : 'Next'}
							</Typography>

						</div>
					</div>
				</div>
			</Typography>
		)
	}
}
Dimensions.propTypes = {
	classes: PropTypes.object.isRequired,
};


const enhance = compose(
	withStyles(styles, { withTheme: true }),
	withApollo,
	withRouter,
);

export default enhance(Dimensions);
