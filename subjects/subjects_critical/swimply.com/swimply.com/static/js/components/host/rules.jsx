import React from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { withApollo } from "react-apollo";
import { withRouter } from 'react-router-dom';
import Pageloader from '../commons/pageloader';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Stepper from './stepper';
import { loader } from 'graphql.macro';
import * as commonFunctions from './../utilities/commonFunctions';
import UserUtils from './../utilities/UserUtils';
import TagManager from 'react-gtm-module';
const rulesMutation = loader('./../../graphql/host/rulesmutation.graphql');
const pooldetailsQuery = loader('./../../graphql/findpool/pooldetailsQuery.graphql');
const getRulesQuery = loader('./../../graphql/host/getrulesquery.graphql');

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
			padding: "10px 15px ",
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
			left: "50px",
			zIndex: '1',
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
	contentContainer: {
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
		},
		'& > div > div': {

			'& span': {
				padding: '3px 3px',
				fontSize: '13px',
			},
		}
	},
	checkedImg: {
		maxWidth: '20px'
	},

	nextButton: {
		marginTop: '35px',
	},
	amentiesContainer: {
		marginBottom: '15px',
		'& > div ': {
			padding: '0px 0 0 18px !important',
		}
	}

});

class Rules extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeStep: 66.43,
			rules: [],
			rulesdata: [],
			additionalRules: '',
			hostError: '',
			loading: false
		}
		this.handleAdditionalRules = this.handleAdditionalRules.bind(this);
		this.redirectToImages = this.redirectToImages.bind(this);
		this.handleBackBtn = this.handleBackBtn.bind(this);
	}
	componentDidMount() {
		let poolID = UserUtils.getHostPoolID();
		if (poolID) {
			this.setState({ loading: true });
			this.props.client.query({
				query: getRulesQuery,
				fetchPolicy: "network-only"
			})
				.then((res) => {
					if (res.data.rules !== null) {
						this.setState({
							rules: res.data.rules,
							loading: false,
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

			this.props.client.query({
				query: pooldetailsQuery,
				variables: {
					"id": poolID
				},
				fetchPolicy: "network-only"
			})
				.then((res) => {
					if (res.data.pool !== null) {
						let rulesdata = res.data.pool.rules;
						let selectedRules = [];
						let rules = this.state.rules.map((data) => {
							let ruleIndex = rulesdata.findIndex(x => (x.id === data.id));		
							if(ruleIndex >= 0) {
								data.checked = true;
							} else {
								data.checked = false;
							}
							return data;
						}) 
						let data = rules.filter(item => item.checked);
						data.map((data) => { return selectedRules.push(data.id) }).join(', ');
						const regex = /(<([^>]+)>)/ig;
						if(res.data.pool.additional_rules !== null && res.data.pool.additional_rules !== '') {
							res.data.pool.additional_rules = res.data.pool.additional_rules.replace(regex, '');
						}
						this.setState({ 
							rules: rules,
							rulesdata: selectedRules,
							additionalRules: res.data.pool.additional_rules,
							loading: false,
							poolID: poolID
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
		}
	}
	handleCheckbox(index, e) {
		let ame = [];
		let newItems = this.state.rules.slice();
		newItems[index].checked = !newItems[index].checked
		let data = newItems.filter(item => item.checked)
		data.map((data) => { return ame.push(data.id) }).join(', ')
		this.setState({
			rulesdata: ame
		})
	}
	handleAdditionalRules(e) {
		this.setState({ additionalRules: e.target.value });
	}
	redirectToImages() {
		let { rulesdata, additionalRules, poolID } = this.state;
		let { backBtnChange, history } = this.props;

		let newItems = this.state.rules;
		let gtmRules = newItems.filter(item => item.checked);
		

		this.setState({ loading: true });
		let data = {
			pool_rules_id: rulesdata || "",
			additional_rules: additionalRules || "",
			pool_id: parseInt(poolID) || ""
		}
		this.props.client.mutate({
			mutation: rulesMutation,
			variables: {
				data: data
			}
		})
		.then((res) => {
			//Step 7 Save
	          TagManager.dataLayer({ 
	            dataLayer: {
	              poolId: poolID,
	              rules: gtmRules,
	              additionalRules:additionalRules
	            },
	            events: {
	              RegistrationStep7: 'RegistrationStep7'
	            } 
	          });

			if (backBtnChange === true) {
				history.push('editpool');
			} else {
				let imagesStatus = true;
				this.props.redirectToImages(imagesStatus);
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
		if (status === 'rules') {
			history.push('editpool');
		} else {
			let imagesStatus = false;
			this.props.redirectToPrivacy(imagesStatus);
		}
	}


	render() {
		const { classes, backBtnChange } = this.props;
		const { loading, activeStep, hostError, rules, additionalRules } = this.state;
		return (
			<Typography variant="body1" component="div">
				{loading === true ? <Pageloader loading={loading} /> : ''}
				<div className={classes.locationMain}>
					<div className={classes.backStep} onClick={this.handleBackBtn}>
						<font><i className="fa fa-angle-left" aria-hidden="true"></i> BACK</font>
					</div>

					{backBtnChange === true ? "" : <Stepper activeStep={activeStep} />}
					<div className={classes.contentContainer}>
						<Typography variant="h3">Pool Rules</Typography>
						<p>Select any of the following that apply:</p>
					</div>
					{hostError === "" ? "" : <Typography variant="caption" component="p">{hostError}</Typography>}
					<div className={classes.formContainer}>
						<Grid container spacing={24} className={classes.amentiesContainer}>
							{rules.map((ame, i) => {
								return (
									<Grid item xs={6} sm={6} md={6} >
										<FormControlLabel
											control={
												<Checkbox 
													checked={ame.checked === true ? true : false}
													onChange={this.handleCheckbox.bind(this, i)}
													value={ame.id}
													color="primary"
													disableRipple={true}
													icon={<img alt="" src={window.location.origin + "/img/Check-Unchecked.png"} className={classes.checkedImg} />}
													checkedIcon={<img alt="" src={window.location.origin + "/img/Check-Checked.png"} className={classes.checkedImg} />}
												/>
											}
											label={ame.name}
										/>
									</Grid>
								)
							})
							}
						</Grid>
						<div className={classes.formInputBox}>
							<Typography variant="subtitle2" component="label">Additional rules</Typography>
							<TextField
								id="outlined-email-input"
								placeholder="e.g. Please throw your trash in the trashbin"
								type="text"
								name="email"
								autoComplete=""
								margin="normal"
								variant="outlined"
								fullWidth={true}
								multiline={true}
								rowsMax={6}
								rows={6}
								value={additionalRules}
								onChange={this.handleAdditionalRules}
								onInput={(e) => {
									e.target.value = e.target.value.slice(0, 500)
								}}
							/>
						</div>
						<div className={classes.nextButton} >


							<Typography variant="button" onClick={this.redirectToImages}>
								{backBtnChange === true ? 'Save' : 'Next'}
							</Typography>
						</div>
					</div>
				</div>
			</Typography>
		)
	}
}
Rules.propTypes = {
	classes: PropTypes.object.isRequired,
};


const enhance = compose(
	withStyles(styles),
	withApollo,
	withRouter
);

export default enhance(Rules);
