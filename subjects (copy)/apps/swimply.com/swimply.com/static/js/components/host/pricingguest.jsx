import React, {useContext} from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { withApollo } from "react-apollo";
import { withRouter } from 'react-router-dom';
import Pageloader from '../commons/pageloader';
import TextField from '@material-ui/core/TextField';
import Stepper from './stepper';
import { loader } from 'graphql.macro';
import * as commonFunctions from './../utilities/commonFunctions';
import UserUtils from './../utilities/UserUtils';
import TagManager from 'react-gtm-module';
import Select from "@material-ui/core/Select"
import {PRICE_PER_GUEST, PRICE_PER_GUEST_MIN_CAPACITY, POOL_PRICE_LIST, POOL_PRICE_LIST_US, MAX_GUESTS} from "../../constants"
import MenuItem from "@material-ui/core/MenuItem"
import HelperService from "../../services/helper";
import RegionContext from "../../contexts/RegionContext";
const pricingGuestMutation = loader('./../../graphql/host/pricingguestmutation.graphql');
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
		'& div': {
			marginLeft: 0
		},
		'& > div > div ': {
			padding: '0',
		},
		'& label + div ': {
			marginTop: '0',
			marginBottom: '0',
			width: '100%'
		},
		'& .textField': {
			marginLeft: 10,
			marginTop: 0,
			height: 40,
			'& div': {
				marginTop: 0
			}
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
			maxWidth:'40px',
			textAlign:'right',
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
			top: "5px",
			bottom: "0",
			margin: "auto",
			height: "0px",
			left: "5px",
			color: theme.palette.common.black,
			zIndex:'1',
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
	ContentContainer: {
		paddingTop: '15px',
		'& p': {
			fontWeight: '100',
			fontSize: '13px',
		}
	},
	MiddleContainer: {
		marginTop: '-15px',
		'& p': {
			fontWeight: '100',
			fontSize: '14px',
		}
	},
	formContainer: {
		maxWidth: '350px',
		paddingTop:'10px',
		'@media (max-width:767px)': {
			maxWidth: "100%",
		}
	},
	nextButton: {
		marginTop: '35px',
		'@media (max-width:767px)':{
      marginBottom: "100px"
    }
	},
	toggleBox:{
		listStyle:'none',
		display:'flex',
		paddingLeft:'0',
		margin:'0',
		'& li':{
			padding:'8px 30px',
			border:'1px solid #ccc',
			cursor: 'pointer',
			'&:first-child':{
				borderRadius:'5px 0px 0px 5px',
			},
			'&:last-child':{
				marginLeft:'-1px',
				borderRadius:'0px 5px 5px 0px',
			}
		},

	},
	toggleContainer: {
    height: 56,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: `${theme.spacing.unit}px 0`,


	},
	perHourRight:{
		position:'relative',
		left: '90px',
    top: '-38px',
	},
	activeToggle: {
		border: '1px solid #12bfea !important',
		zIndex: 1,
		color:'#12bfea !important'
	},
	select: {
		margin: '0 10px !important'
	},

});

class PricingGuest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			POOL_PRICE_LIST: [...POOL_PRICE_LIST],
			activeStep: 49.8,
			poolID: '',
			hourlyPrice: 15,
			maxNumberGuest: 30,
			childrenAllowed: true,
			infantAllowed: true,
			loading: false,
			hostError: '',
			pricePerGuestEnabled: false,
			pricePerGuest: 1,
			pricePerGuestMinCapacity: 10,
			showOtherField: false,
			maxNumberGuestOther: '',
			maxGuestsList: MAX_GUESTS,
		}
		this.handleHourlyPrice = this.handleHourlyPrice.bind(this);
		this.handleMaxNumberGuest = this.handleMaxNumberGuest.bind(this);
		this.handleMaxNumberGuestOther = this.handleMaxNumberGuestOther.bind(this);
		this.redirectToAmenitiesList = this.redirectToAmenitiesList.bind(this);
		this.handleBackBtn = this.handleBackBtn.bind(this);

	}
	componentDidMount() {
		let poolID = UserUtils.getHostPoolID();
		if(poolID){
			this.setState({ loading: true });
			this.props.client.query({
				query: pooldetailsQuery,
				variables: {
					"id": poolID
				},
				fetchPolicy:"network-only"
			})
			.then((res) => {
				if(res.data.pool !== null) {
					const isUs = HelperService.isUsRegion(this.props.region)
					let newPriceArray = isUs ? [...POOL_PRICE_LIST_US] : [...POOL_PRICE_LIST]
					let checkForDuplicatesArray = newPriceArray.filter(el => el.key === (res.data.pool.hourly_price || 15))

					if (!checkForDuplicatesArray.length) {
						let currentPoolPrice = {key: (res.data.pool.hourly_price || 15), value: (res.data.pool.hourly_price || 15) + ' - current price'}
						newPriceArray.unshift(currentPoolPrice)
					}

					let maxGuestsList = MAX_GUESTS.slice()
					const maxNumberGuest = res.data.pool.max_guests || 30
					if (maxNumberGuest && maxNumberGuest !== 'Other' && !maxGuestsList.includes(+maxNumberGuest)) {
						maxGuestsList = [maxNumberGuest, ...maxGuestsList]
					}
					
					this.setState({
						POOL_PRICE_LIST: newPriceArray,
						hourlyPrice: res.data.pool.hourly_price || 15,
						maxNumberGuest: maxNumberGuest,
						childrenAllowed: res.data.pool.guests_children_allowed,
						infantAllowed: res.data.pool.guests_infants_allowed,
						loading: false,
						poolID: poolID,
						pricePerGuestEnabled: res.data.pool.price_per_guest_enabled,
						pricePerGuest: res.data.pool.price_per_guest === 0 ? 1 : res.data.pool.price_per_guest,
						pricePerGuestMinCapacity: res.data.pool.price_per_guest_min_capacity === 0 ? 10 : res.data.pool.price_per_guest_min_capacity,
						maxGuestsList,
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
	handleHourlyPrice({ target: { value: hourlyPrice } }) {
		this.setState({
			hourlyPrice: hourlyPrice
		})
	}
	handleMaxNumberGuest(e) {
		const re = /^[0-9\b]+$/;
		if (e.target.value === '' || re.test(e.target.value) || e.target.value === "Other"){
			this.setState({
				maxNumberGuest: e.target.value,
				showOtherField: e.target.value === "Other" ? true : false,
				maxNumberGuestOther: ''
			});
		}
	}

	handleMaxNumberGuestOther(e) {
		const re = /^[0-9\b]+$/;
		if (e.target.value === '' || re.test(e.target.value)) {
			this.setState({
				maxNumberGuestOther: e.target.value
			})
		}
	}
	handleChildrenAllowed(val) {
		this.setState({ childrenAllowed: val === 'true' ? true : false });
	}
	handleInfantsAllowed(val) {
		this.setState({ infantAllowed: val === 'true' ? true : false });
	}
	handlepricePerGuestEnabled(val) {
		this.setState({ pricePerGuestEnabled: val === "true" ? true : false });
	}
	handlePricePerGuest({ target: { value: pricePerGuest } }) {
		this.setState({ pricePerGuest })
	}
	pricePerGuestMinCapacity({ target: { value: pricePerGuestMinCapacity } }) {
		this.setState({ pricePerGuestMinCapacity })
	}
	redirectToAmenitiesList() {
		let {
			hourlyPrice,
			maxNumberGuest,
			maxNumberGuestOther,
			childrenAllowed,
			infantAllowed,
			poolID,
			pricePerGuestEnabled,
			pricePerGuest,
			pricePerGuestMinCapacity
		} = this.state;
		if(maxNumberGuest !== '') {
			maxNumberGuest = parseInt(maxNumberGuest) || 0;
		}

		if(maxNumberGuestOther !== '') {
			maxNumberGuestOther = parseInt(maxNumberGuestOther) || 0;
		}

		let { backBtnChange, history } = this.props;
		this.setState({ loading: true });
		let data = {
			pool_id: parseInt(poolID) || "",
			hourly_price: hourlyPrice || 15,
			max_number_guest: maxNumberGuestOther || maxNumberGuest || 30,
			children_allowed: childrenAllowed || false,
			infant_allowed: infantAllowed || false,
			price_per_guest_enabled: pricePerGuestEnabled || false,
			price_per_guest: pricePerGuest || 1,
			price_per_guest_min_capacity: pricePerGuestMinCapacity || 10,
		}
		this.props.client.mutate({
			mutation: pricingGuestMutation,
			variables: {
				data: data
			}
		})
		.then((res) => {
			//Step 3 Save
	        TagManager.dataLayer({
	            dataLayer: {
	              poolId: poolID,
	              hourlyPrice: data.hourly_price,
	              maxNumberGuest: data.max_number_guest,
	              childrenAllowed: (data.children_allowed === true)?'Yes':'No',
	              infantAllowed: (data.infant_allowed === true)?'Yes':'No'
	            },
	            events: {
	              RegistrationStep3: 'RegistrationStep3'
	            }
	        });

			if(backBtnChange === true ){
				history.push('editpool');
			} else {
				let amenitiesListStatus = true ;
			this.props.redirectToAmenitiesList(amenitiesListStatus)
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
		if(status === 'pricing_guest') {
			history.push('editpool');
		} else {
			let amenitiesListStatus = false;
			this.props.redirectToListingInfo(amenitiesListStatus);
		}
	}


	render() {
		const { classes, backBtnChange } = this.props;
		const {
			loading,
			activeStep,
			hostError,
			hourlyPrice,
			maxNumberGuest,
			childrenAllowed,
			infantAllowed,
			pricePerGuestEnabled,
			pricePerGuest,
			pricePerGuestMinCapacity,
			showOtherField,
			maxNumberGuestOther
		} = this.state;

		return (
			<Typography variant="body1" component="div">
				{loading === true ? <Pageloader loading={loading} /> : ''}
				<div className={classes.locationMain}>
				 <div className={classes.backStep} onClick={this.handleBackBtn}>
							<font><i className="fa fa-angle-left" aria-hidden="true"></i> BACK</font>
					</div>

					{backBtnChange === true ? "" : <Stepper activeStep={activeStep} />}
					<div className={classes.ContentContainer}>
						<Typography variant="h3">Pricing & Guests</Typography>
						<p>Decide on your price per hour and guest rules.<br/>We recommend pricing your listing a bit lower at first,<br/>getting a few awesome reviews and raising your price later.</p>
					</div>
					{hostError === "" ? "" :<Typography variant="caption" component="p">{hostError}</Typography>}
					<div className={classes.formContainer}>
					<div className={classes.formInputBox}>
							<Typography variant="subtitle2" component="label">How much would you like to charge?</Typography>
							<Select
								className={classes.select}
								value={hourlyPrice}
								onChange={this.handleHourlyPrice}
								displayEmpty
							>
								{this.state.POOL_PRICE_LIST.map((price, index) => {
										return (
											<MenuItem value={price.key} key={`price-${index}`}>$ {price.value}</MenuItem>
										)
								})}
							</Select>
						</div>
						<div className={classes.formInputBox}>
							<Typography variant="subtitle2" component="label">
								Would you like to charge an additional fee for extra guests?
							</Typography>
							<ul className={classes.toggleBox}>
								<li
										className={
											pricePerGuestEnabled !== false ? classes.activeToggle : ""
										}
										onClick={this.handlepricePerGuestEnabled.bind(this, "true")}
								>
									Yes
								</li>
								<li
										className={
											pricePerGuestEnabled !== false ? "" : classes.activeToggle
										}
										onClick={this.handlepricePerGuestEnabled.bind(this, "false")}
								>
									No
								</li>
							</ul>
						</div>
						{pricePerGuestEnabled ? (
								<div className={classes.formInputBox}>
									<div>
										I would like to charge
										<Select
											className={classes.select}
											value={pricePerGuest}
											onChange={this.handlePricePerGuest.bind(this)}
											displayEmpty
										>
											{
												PRICE_PER_GUEST.map((price, index) => {
													return (
														<MenuItem value={price} key={`price-${index}`}>$ {price}</MenuItem>
													)
												})
												// (insert drop down with option for $1, $3, $5, $10 )
											}
										</Select>
										an hour
									</div>
									<div>
										for every guest after
										<Select
											className={classes.select}
											value={pricePerGuestMinCapacity}
											onChange={this.pricePerGuestMinCapacity.bind(this)}
											displayEmpty
										>
											{
												PRICE_PER_GUEST_MIN_CAPACITY.map((quests, index) => {
													return (
														<MenuItem value={quests} key={`quests-${index}`}>{quests} guests, per hour.</MenuItem>
													)
												})
											}
										</Select>
									</div>
								</div>
						) : (
								""
						)}
						<div className={classes.formInputBox}>
							<Typography variant="subtitle2" component="label">What is your pools maximum capacity?</Typography>
							<p>
								<Select
									className={classes.select}
									value={maxNumberGuest}
									defaultValue={maxNumberGuest}
									onChange={this.handleMaxNumberGuest}
									displayEmpty
								>
									{
										this.state.maxGuestsList.map((guests, index) => {
											return (
												<MenuItem value={guests} key={`quests-${index}`}>{guests}</MenuItem>
											)
										})
									}
									<MenuItem value='Other' key={`quests-other`}>Other</MenuItem>
								</Select>
								guests
							</p>
							{showOtherField
								?<div className='textField'>
									<TextField
										required
										id="outlined-number-input"
										type="tel"
										placeholder="30"
										name="number"
										autoComplete=""
										inputMode="numeric"
										// pattern="[0-9]*"
										margin="normal"
										variant="outlined"
										fullWidth={true}
										value={maxNumberGuestOther}
										onChange={this.handleMaxNumberGuestOther}
									/>
									<div className={classes.perHourRight}>guests</div>
								</div>
								: null
							}
						</div>
						<div className={classes.formInputBox}>
							<Typography variant="subtitle2" component="label">Are children allowed? (age 2-12)</Typography>
							<ul className={classes.toggleBox}>
								<li className={childrenAllowed !== false ? classes.activeToggle : ""} onClick={this.handleChildrenAllowed.bind(this, 'true')}>Yes</li>
								<li className={childrenAllowed !== false ? "" : classes.activeToggle} onClick={this.handleChildrenAllowed.bind(this, 'false')}>No</li>
							</ul>
						</div>
						<div className={classes.formInputBox}>
							<Typography variant="subtitle2" component="label">Are Infants allowed? (under 2)</Typography>
							<ul className={classes.toggleBox}>
								<li className={infantAllowed !== false ? classes.activeToggle : ""} onClick={this.handleInfantsAllowed.bind(this, 'true')}>Yes</li>
								<li className={infantAllowed !== false ? "" : classes.activeToggle} onClick={this.handleInfantsAllowed.bind(this, 'false')}>No</li>
							</ul>

						</div>
						<div className={classes.nextButton} >



							<Typography variant="button" onClick={this.redirectToAmenitiesList}>
							{ backBtnChange === true ? 'Save' : 'Next' }
							</Typography>
						</div>
					</div>
				</div>
			</Typography>
		)
	}
}
PricingGuest.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};


const enhance = compose(
	withStyles(styles, { withTheme: true }),
	withApollo,
	withRouter
);

function PricingGuestContainer (props) {
	const { region } = useContext(RegionContext)
	return <PricingGuest region={region} {...props} />
}

export default enhance(PricingGuestContainer)
