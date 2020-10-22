import React from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { withApollo } from "react-apollo";
import Pageloader from '../commons/pageloader';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import Stepper from './stepper';
import { loader } from 'graphql.macro';
import * as commonFunctions from './../utilities/commonFunctions';
import UserUtils from './../utilities/UserUtils';
import _ from "lodash";
import TagManager from 'react-gtm-module';
const privacyMutation = loader('./../../graphql/host/privacymutation.graphql');
const pooldetailsQuery = loader('./../../graphql/findpool/pooldetailsQuery.graphql');
const getPrivacyQuery = loader('./../../graphql/host/getpoolprivacyquery.graphql');

const styles = theme => ({
	stepperNew: {
		padding: '0',
		maxWidth: '350px',
		'& > div': {
			background: theme.palette.common.blue,
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
		'@media (max-width:767px)':{
      width:'25px',
      height:'25px',
      overflow:'hidden',
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
	checkedImg: {
		maxWidth: '20px'
	},
	PrivacyBox: {
		paddingLeft: '0',
		'& li': {
			display: 'flex',
			background: '#f3f5f5',
			marginBottom: '10px',
			padding: '20px 15px',
			'& span': {
				paddingTop: '0'
			}
		}

	},
	PrivacyBoxLabel: {
		color: theme.palette.common.black,
		fontWeight: '500',
		marginLeft: '-13px',
		'& span': {
			display: 'block',
			color: '#7b858b',
			fontSize: '12px',
			fontWeight: 'normal',
		}
	},
	checkboxBtn: {
		'& > div > label': {
			background: ' #f4f5f5',
			border: '1px solid #f4f5f5 ',
			marginBottom: '10px',
			padding: '25px 15px',
			width: 'calc(100% - 0px)',
			margin: '5px 0',
			'& > span:first-child': {
				marginTop: '-15px',
				paddingLeft: '0'
			}
		},
		'@media (max-width:767px)':{
			'& > div > label': {
			width: 'calc(100% - 30px)',
			}
		}
	},
	privacyTittle: {
		'& > div': {
			fontSize: '12px',
			color: '#7b858b'
		},
		'& > span': {
			fontWeight: '500'
		},
		'& > img': {
			marginTop: '-10px'
		}
	},
	activeCheckbox: {
		background: '#fff !important',
		border: '1px solid #60bfed !important',

	},
	disableBtn: {
		background: '#ccc',
		width: '100%',
		padding: '10px 15px',
		cursor: 'default',
		'&:hover': {
			background: '#ccc',
		},
		'@media (max-width:767px)':{
			marginTop:'35px'
		}
	},

});

class Privacy extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeStep: 58.1,
			privacyData: [],
			poolPrivacyID: '',
			loading: false,
			hostError: '',
			poolID: '',
		}
		this.handleCheckbox = this.handleCheckbox.bind(this);
		this.redirectToRules = this.redirectToRules.bind(this);
		this.handleBackBtn = this.handleBackBtn.bind(this);
	}

	componentDidMount() {
		let poolID = UserUtils.getHostPoolID();
		this.setState({ poolID: poolID, loading: true });
		this.props.client.query({
			query: getPrivacyQuery,
			fetchPolicy: "network-only"
		})
			.then((res) => {
				if (res.data.poolPrivacy !== null) {
					this.setState({
						privacyData: res.data.poolPrivacy
					});
				}
			}).catch((error) => {
				let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
				this.setState({
					loading: false,
					hostError: errorMsg,
				})
			});
		if (poolID) {
			this.props.client.query({
				query: pooldetailsQuery,
				variables: {
					"id": poolID
				},
				fetchPolicy: "network-only"
			})
				.then((res) => {
					if (res.data.pool !== null) {
						let amenitiesdata = res.data.pool.privacy_policy;
						let amenities = this.state.privacyData.map((data) => {
							if (amenitiesdata && amenitiesdata.id === data.id) {
								data.checked = true;
							} else {
								data.checked = false;
							}
							return data;
						})
						this.setState({
							privacyData: amenities,
							loading: false,
							poolID: poolID,
							poolPrivacyID: amenitiesdata.id
						});

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
		} else {
			this.setState({ loading: false });
		}
	}
	handleCheckbox(e) {
		let { privacyData } = this.state;
		let amenities = privacyData.map((data) => {
			if (e.target.value === data.id) {
				data.checked = true;
			} else {
				data.checked = false;
			}
			return data;
		})
		this.setState({
			privacyData: amenities,
			poolPrivacyID: e.target.value,
		});
	}
	redirectToRules() {
		let { poolPrivacyID, poolID, privacyData } = this.state;
		privacyData = _.filter(privacyData, {'checked':true});
		let { backBtnChange, history } = this.props;
		this.setState({ loading: true });
		let data = {
			pool_id: parseInt(poolID) || "",
			pool_privacy_id: poolPrivacyID || ""
		}
		this.props.client.mutate({
			mutation: privacyMutation,
			variables: {
				data: data
			}
		})
			.then((res) => {
				//Step 6 Save
				TagManager.dataLayer({
					dataLayer: {
						poolId: poolID,
						privacyData: privacyData
					},
					events: {
						RegistrationStep6: 'RegistrationStep6'
					}
				});

				if (backBtnChange === true ) {
					history.push('editpool');
				} else {
					let rulesStatus = true;
					this.props.redirectToRules(rulesStatus);
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
		if (status === 'privacy') {
			history.push('editpool');
		} else {
			let rulesStatus = false;
			this.props.redirectToDimensions(rulesStatus);
		}
	}

	render() {
		const { classes, backBtnChange } = this.props;
		const { loading, activeStep, privacyData, poolPrivacyID } = this.state;
		return (
			<Typography variant="body1" component="div">
				{loading === true ? <Pageloader loading={loading} /> : ''}
				<div className={classes.locationMain}>
					<div className={classes.backStep} onClick={this.handleBackBtn}>
						<font><i className="fa fa-angle-left" aria-hidden="true"></i> BACK</font>
					</div>

					{backBtnChange === true ? "" : <Stepper activeStep={activeStep} />}
					<div className={classes.ContentContainer}>
						<Typography variant="h3">Pool privacy</Typography>
						<p>How private is your pool and swimming area?</p>
					</div>
					<div className={classes.formContainer}>
						<div className={classes.formInputBox}>
							<Typography variant="subtitle2" component="label">Pool's Privacy</Typography>

							<FormControl component="fieldset" className={classes.formControl + " " + classes.checkboxBtn}>

								<RadioGroup
									aria-label="Gender"
									name="gender1"
									className={classes.group}
									value={poolPrivacyID}
									onChange={this.handleCheckbox}
								>
									{privacyData.map((privacy, i) =>
										<FormControlLabel
											value={privacy.id}
											className={privacy.checked ? classes.activeCheckbox : ""}
											key={`privacy-${privacy.id}`}
											control={
												<Radio
													checked={privacy.checked}
													disableRipple={true}
													icon={<img alt="" src={window.location.origin +  "/img/Check-Unchecked.png"} className={classes.checkedImg} />}
													checkedIcon={<img alt="" src={window.location.origin + "/img/Check-Checked.png"} className={classes.checkedImg} />}
												/>
											}
											label={
												<div className={classes.privacyTittle}>
													<span>{privacy.title}</span>
													<div>{privacy.description}</div>
												</div>
											} />
									)
									}
								</RadioGroup>
							</FormControl>

						</div>


						{poolPrivacyID !== "" ?	<div className={classes.nextButton} >

							<Typography variant="button" onClick={this.redirectToRules}>
								{ backBtnChange === true ? 'Save' : 'Next' }
							</Typography>

						</div> :
						<Button variant="button" className={classes.disableBtn}>
								Next
					</Button> }

					</div>
				</div>
			</Typography>
		)
	}
}
Privacy.propTypes = {
	classes: PropTypes.object.isRequired,
};


const enhance = compose(
	withStyles(styles, { withTheme: true }),
	withApollo,
	withRouter,
);

export default enhance(Privacy);
