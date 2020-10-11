import React, {useContext} from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
// import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PoolDetailsInfo from '../commons/pooldetailsinfo';
import { withApollo } from "react-apollo";
import StarRatings from 'react-star-ratings';
import { loader } from 'graphql.macro';
import Pageloader from './../commons/pageloader';
import UserUtils from '../utilities/UserUtils';
import TagManager from 'react-gtm-module';
import PoolAvailabilities from '../results/poolAvailabilities';
import moment from 'moment';
import { IS_US } from '../../config';
import { sendAnalytics } from '../utilities/analyticsUtils';
import SwimmerPlaceholder from '../shared/swimmer-placeholder';
import { RouterContext } from '../router/router-context';

// constants
import { US_REGION_REGEXP } from '../../constants'

// contexts
import RegionContext from '../../contexts/RegionContext'
import UserContext from "../../contexts/UserContext";

const pooldetailsQuery = loader( './../../graphql/findpool/pooldetailsQuery.graphql' );
const countryCode = loader( '../../graphql/findpool/getPoolHostCountryCode.graphql' );
const serviceChargeQuery = loader('./../../graphql/findpool/serviceChargeQuery.graphql');

const styles = theme => ({
	container: {
		maxWidth: '1170px',
		margin: '0 auto',
		width: '100%',
		padding: '0 25px',
		boxSizing: 'border-box',
		'@media (max-width:400px)': {
			padding: '0 15px',
		}
	},
	perHour: {
		float: 'right',
		padding: '0px',
		'& span': {
			fontWeight: '500',
			fontSize: '20px',
			color: theme.palette.common.black,
			verticalAlign: 'middle',
			paddingRight: '10px',

		},
		'& p': {
			marginTop: '0'
		},
		'& img': {
			paddingTop: '7px'
		},
		'@media (max-width:850px)': {
			width: '100%',
			'& p': {
				marginBottom: '0'
			}
		}
	},
	rightPoolDetails: {
		display: 'none',
		fontSize: '20px',
		lineHeight: '35px',
		paddingLeft: '15px',
		'@media(max-width:850px)': {
			display: 'block',
		},
		'& font': {
			'& span': {
				color: '#232323',
				fontSize: '30px',
				fontWeight: '500',
				paddingRight: '15px',
				verticalAlign: 'middle',
			},
			'@media(max-width:850px)': {
				fontSize: '14px',
				'& span': {
					color: ' #232323',
					fontSize: '20px',
					fontWeight: '500',
					paddingRight: '6px',
					verticalAlign: 'middle',
				}
			}
		},
		'& p': {
			marginTop: '0px',
			marginBottom: '15px',
		},
		'& p:last-child': {
			fontSize: '14px',
			textTransform: 'uppercase',
			color: theme.palette.common.blue,
			cursor: 'pointer'
		},
		'& > span': {
			fontSize: '30px',
			fontWeight: '500',
			paddingRight: '15px',
			color: theme.palette.common.black,
			verticalAlign: 'middle',
		},
		'& > div span': {
			width: 'auto',
			display: 'inline-block',
			padding: '8px 25px',
			marginBottom: '10px',
			borderRadius: '5px',
			textTransform: 'inherit',
		},
		loderdiv: {
			width: '100%',
			height: '100%',
			position: 'fixed',
			background: '#fbfbfb',
			zIndex: '99',
			top: '0',
			display: 'flex',
			alignItems: 'center',
			'& div': {
				margin: '0 auto'
			},
		},
		'@media (max-width:850px)': {
			width: '100%',
			bottom: 0,
			zIndex: 999,
			position: 'fixed',
			overflow: 'hidden',
			boxShadow: '0 0 5px #ccc',
			background: '#fff',
			padding: '15px 15px 35px',
			boxSizing: 'border-box',
			left: 0,
			'& > div span': {
				position: 'absolute',
				top: '20px',
				right: '26px',
			},
			'& p': {
				marginBottom: '0',
			},
		}
	},
	poolDetailsMainNew: {
		padding: '40px 0 120px',
	},
	additionalFees: {
		fontSize: '14px',
		'& p': {
			marginBottom: '8px'
		},
		'& p:last-child': {
			color: 'inherit',
			fontSize: '14px',
			textTransform: 'none',
			cursor: 'auto'
		}
	},
	additionalFeesPrice: {
		fontSize: '14px !important',
		paddingRight: '6px !important'
	}
});

class PoolDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			poolDetails: {},
			loading: false,
			hourlyPrice: 0,
			serviceCharge: 0,
			referralDiscount: 0,
			selecetedDate: new Date(),
			instantBook: false,
			accessToken: '',
			isFixed: false,
			showSwimmerPlaceholder: false,
			currentPoolId: '',
			poolCountryCode: 'US',
			userRole: '',
		}
		this.handleRequestBooking = this.handleRequestBooking.bind(this);
		this.fixedSiderBar = this.fixedSiderBar.bind(this);
		this.checkSwitchNeeded = this.checkSwitchNeeded.bind(this);
		this.removeOnMouseLeave = this.removeOnMouseLeave.bind(this)
		this.showEmailCapturePopup = this.showEmailCapturePopup.bind(this)
	}
	static contextType = RouterContext;

	fixedSiderBar() {
		let scrollpos = window.scrollY;
		scrollpos = window.scrollY;
		if (scrollpos > 140) {
			this.setState({
				isFixed: true
			})
		} else {
			this.setState({
				isFixed: false
			})
		}
	}

	componentDidMount() {
		document.body.addEventListener("mouseleave", this.removeOnMouseLeave)

		setTimeout(() => {
      this.showEmailCapturePopup()
    }, 10000)

		let id = this.props.match.params.id;

		let data = {
			timestamp: new Date().toISOString(),
			'event_type': 'visit-pool-page',
			poolId: id,
			platform: 'web',
			location: IS_US ? 'US' : 'AU',
			userId: UserUtils.getUserID(),
			userRole: 'swimmer'
		}

		this.checkSwitchNeeded(id)

		sendAnalytics(this.props.client, data)
		UserUtils.removePaymentReason()
		let { history } = this.props;
		window.scrollTo(0, 0);

		window.addEventListener('scroll', this.fixedSiderBar, false);

		let selecetedDate = UserUtils.getAvailableDate();
		let instantBook = UserUtils.getInstantBooking();
		let startTime = UserUtils.getStartTime();
		let endTime = UserUtils.getEndTime();
		let accessToken = UserUtils.getAccessToken();

		let poolId = parseInt(id);
		if (isNaN(poolId)) {
			history.push('/');
		} else {
			UserUtils.setPoolId(poolId);
			this.setState({ loading: true, accessToken: accessToken });
			this.props.client.query({
				query: pooldetailsQuery,
				variables: {
					"id": poolId
				},
				fetchPolicy: "network-only"
			})
			.then((res) => {
				if (res.data.pool !== null) {
					if (!(res.data.pool.status === 1 || res.data.pool.status === 5)) {
						history.push('/');
					}
					const userRole = UserUtils.getUserRole() || 'Swimmer'
					const updatedPool = { ...res.data.pool }
					updatedPool.isFavorite = this.props.user && this.props.user.favorites.indexOf(+updatedPool.id) >= 0
					this.setState({
						poolDetails: updatedPool,
						hourlyPrice: res.data.pool.hourly_price,
						loading: false,
						selecetedDate: selecetedDate,
						instantBook: instantBook,
						startTime: startTime,
						endTime: endTime,
						userRole
					}, () => {
						this.handleServiceCharge()
					})
				} else {
					history.push('/');
				}
			}).catch((error) => {
				this.setState({ loading: false })
			});
		}
	}

	handleServiceCharge = async () => {
		try {
			const { data: { serviceCharge }} = await this.props.client.query({
				query: serviceChargeQuery,
				variables: {
					id: parseInt(this.state.poolDetails.id),
					percentage: this.state.hourlyPrice
				},
				fetchPolicy: 'network-only'
			})
			this.setState({
				serviceCharge: serviceCharge.find(x => x.name === 'service_fee').percentage,
				referralDiscount: serviceCharge.find(x => x.name === 'referral_credit').percentage,
			})
		} catch (e) {
			this.setState({ loading: false })
		}
	}

	showEmailCapturePopup () {
		if (!UserUtils.getAccessToken() && !localStorage.getItem('popupShowed')) {
			// UserUtils.showDiscountPopup(true)
			this.context.showPopupCallback()
			document.body.removeEventListener("mouseleave", this.removeOnMouseLeave)
		}
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.fixedSiderBar, false);
    document.body.removeEventListener("mouseleave", this.removeOnMouseLeave)
		this.showEmailCapturePopup()
	}

	removeOnMouseLeave () {
		this.showEmailCapturePopup()
  }


  checkSwitchNeeded(poolId) {
    this.props.client.query({
      query: countryCode,
      variables: {
        pool_id: poolId
      }
    })
    .then((res)=>{
			let poolCountryCode = res.data.countryCode.country_code || ''
			let poolCountryCodeIsUS = US_REGION_REGEXP.test(poolCountryCode)
				let locationMatch = poolCountryCodeIsUS === IS_US
				if (!locationMatch) {
					this.setState({
						showSwimmerPlaceholder: true,
						currentPoolId: poolId,
						poolCountryCode: poolCountryCode
					})
				}
    })
    .catch((err)=>{
      console.error(err)
    })
  }


	redirectToBack() {
		let { history } = this.props;
		let backBtnlink = UserUtils.getBackBtnLink();
		let link = "";
		if (backBtnlink === "messages") {
			link = "/conversations";
			UserUtils.setBackBtnLink('pool-details')
		} else if (backBtnlink === "reservation") {
			if (UserUtils.getUserRole() === 'Host') {
				link = "/host-reservation";
			} else {
				link = "/my-reservation";
			}
		} else if(backBtnlink === 'home'){
			link = "/";
		} else if(backBtnlink === 'au/search'){
			link = "/au/search";
		} else {
			link = "/search";
		}
		history.push(link);
	}


	handleRequestBooking(id) {
		let { history } = this.props;
		let { poolDetails } = this.state;
		let date = UserUtils.getAvailableDate();
		if(date !== null && date !== undefined) {
			date = moment(date).format('YYYY-MM-DD')
		} else {
			date = '';
		}
		TagManager.dataLayer({
			dataLayer: {
				poolID: poolDetails.id,
				date: date,
				address:(poolDetails.street_number !== 'long_name')?poolDetails.street_number:'',
				city:poolDetails.city,
				state:poolDetails.state,
				zipcode:poolDetails.zip_code,
				hourlyPrice: poolDetails.hourly_price,
				amenities: poolDetails.amenities,
				rules: poolDetails.rules,
				basic: {
					size: poolDetails.shallow_end,
					depth:  poolDetails.deep_end,
					privacy: poolDetails.privacy_policy
				}
			},
			events: {
				poolPageView: 'poolPageView'
			}
		});
		history.push("/payment/" + id);
	}

	handleRequestReservation = () => {
		this.props.history.push('/reservation-success')
	}

	render() {
		let { classes } = this.props;
		let { poolDetails, loading, hourlyPrice, startTime, endTime, referralDiscount, serviceCharge /* isFixed */ } = this.state;
		let status = "";

		if (!poolDetails.default_instant_booking) {
      if (startTime !== '' && endTime !== '') {
        status = 'pool_availability';
      } else {
        status = 'Check Availability';
      }
    } else {
      status = 'Book Now';
    }

		if (this.state.showSwimmerPlaceholder) {
      return (
			<SwimmerPlaceholder poolCountryCode={this.state.poolCountryCode} currentPoolId={this.state.currentPoolId} user='swimmer' />
      )
		}

		return (
			<Typography variant="body1" component="span">
				{loading === true ? <Pageloader loading={loading} /> : ''}
				<div>
					<div className={classes.container}>
								<div className={classes.poolDetailsMainNew}>
									<PoolDetailsInfo
										poolDetails={poolDetails}
										handleRequestBooking={this.handleRequestBooking}
										handleRequestReservation={this.handleRequestReservation}
										status={status}
										userRole={this.state.userRole}
										paymentForm
										hourlyPrice={hourlyPrice}
										referalDiscount={referralDiscount}
										serviceCharge={serviceCharge}
									/>
								</div>
								<div className={classes.rightPoolDetails}>
									<font>
										<span>${hourlyPrice} </span>per hour
											<Typography component="div">
											{(poolDetails.rating!==null && poolDetails.rating !== '' && poolDetails.rating !== 0) ?(
												<StarRatings
													rating={(poolDetails.rating === null || poolDetails.rating === '') ? 0 : poolDetails.rating}
													changeRating={this.changeRating}
													numberOfStars={5}
													name='rating'
													starRatedColor="#00ade2"
													starDimension="18px"
													starSpacing="1px"
												/>
												):''}
											</Typography>
									</font>
									<div className={classes.dropDownSelectBlue}>
										{(status === 'pool_availability' && poolDetails.id !== undefined) ? (
											<PoolAvailabilities
												from="pool_details"
												poolDetails={poolDetails}
												isDefaultInstantBooking={poolDetails.default_instant_booking}
												handleRequestBooking={this.handleRequestBooking}/>
										) : (
												<Typography variant="button" onClick={()=>this.handleRequestBooking(poolDetails.id)}>
													{status === 'pool_availability' ? ('Request to Book') : status}
												</Typography>
										)}
									</div>
								</div>
					</div>
				</div>
			</Typography>
		)
	}
}
PoolDetails.propTypes = {
	classes: PropTypes.object.isRequired,
};

const enhance = compose(
	withStyles(styles),
	withRouter,
	withApollo
);

function PoolDetailsContainer (props) {
	const { region } = useContext(RegionContext)
	const context = useContext(UserContext)
	return <PoolDetails region={region} {...context} {...props} />
}

export default enhance(PoolDetailsContainer);
