import React, {useContext} from 'react';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PoolDetailsReviews from './pooldetailsreviews';
import Slider from "react-slick";
import Hidden from "@material-ui/core/Hidden";
import UserUtils from '../utilities/UserUtils';

// import StarRatings from 'react-star-ratings';

import {IS_US, IS_SHVIMPLY} from "../../config";
// import PoolAvailabilities from '../results/poolAvailabilities';
import PaymentForm from '../payment/paymentform';
import UserContext from '../../contexts/UserContext';
import UserAvatar from "./avatar";
import SocialIcons from "../shared/social-icons";

function SampleNextArrow(props) {
	const { className, onClick } = props
	return (
		<div
			className={className}
			style={{
				'position': 'absolute',
				'top': '50%',
				'right': '0',
				'width': '32px',
				'height': '32px',
				'background': 'url(../img/next.png)',
				'backgroundSize': '25px',
				'zIndex': '7',
				'cursor': 'pointer',
				'opacity': '0.8',
				'fontSize': '25px',
				'backgroundPosition': 'center',
				'backgroundRepeat': 'no-repeat',
			}}
			onClick={onClick}
		></div>
	);
}

function SamplePrevArrow(props) {
	const { className, onClick } = props
	return (
		<div
			className={className}
			style={{
				'position': 'absolute',
				'top': '50%',
				'left': '0',
				'width': '32px',
				'height': '32px',
				'background': 'url(../img/prev.png)',
				'backgroundSize': '25px',
				'zIndex': '7',
				'cursor': 'pointer',
				'opacity': '0.8',
				'fontSize': '25px',
				'backgroundPosition': 'center',
				'backgroundRepeat': 'no-repeat',
			}}
			onClick={onClick}
		></div>
	);
}

const styles = theme => ({
	poolInfoInner: {

		'& img': {
			'@media (max-width:850px)': {
				width: '100%',
			}
		},
		'& div > div > div:before': {
			display: 'none'
		}
	},
	poolInfoInnerImg: {
		maxHeight: '510px',
		overflow: 'hidden'
	},
	pageContent: {
		display: 'flex',
		flexDirection: 'row',
		marginTop: 40
	},
	contentContainer: {
		width: '58%',
		'& h2': {
			fontSize: 27
		},
		'& p': {
			color: theme.palette.common.black,
			'&.gray': {
				color: theme.palette.common.darkgray
			}
		},
		'& span': {
			color: theme.palette.common.black,
		},
		'& .row': {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',
			maxWidth: 300
		},
		'& .column': {
			display: 'flex',
			flexDirection: 'column',
		},
		'& .hosted-by-container': {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			margin: '15px 0',
			padding: '20px 10px 20px 0',
			borderTop: '1px solid #f2f2f2',
			borderBottom: '1px solid #f2f2f2',
			cursor: 'pointer',
			transition: 'all 0.2s ease-in-out',
			'&:hover': {
				opacity: '0.8',
			}
		},
		'& .left': {
			alignItems: 'center',
			justifyContent: 'flex-start',
			'&.host': {
				color: theme.palette.common.black,
				fontSize: 16,
			}
		},
		'& .bold': {
			margin: '0 5px',
			fontWeight: 600
		},
		'& h4': {
			fontSize: 13,
			fontWeight: 600,
			textTransform: 'uppercase'
		},
		'& .heading': {
			display: 'flex',
			justifyContent: 'space-between'
		},
		'@media (max-width: 1100px)': {
			width: '55%',
		},
		'@media (max-width: 680px)': {
			width: '90%',
		},
		'@media (max-width: 500px)': {
			width: '100%',
		},

	},
	formContainer: {
		width: '42%',
		paddingLeft: '25px',
		boxSizing: 'border-box',
		'@media (max-width: 1100px)': {
			width: '45%',
			paddingLeft: '15px',
		},
		'@media (min-width: 850px)': {
			overflowX: 'hidden',
			'&.fixed': {
				position: 'fixed',
				top: '0',
				height: '100vh',
				marginBottom: '50px',
				'& .scroll-container': {
					width: 'calc(100% + 10px)',
					height: '100vh',
					paddingRight: '30px',
					overflowY: 'scroll',
				},
				'& .inner-container': {
					margin: '75px 12px 20px 0'
				}
			}
		},
	},
	poolInfoPara: {
		// marginTop: '10px',
		display: 'inline-block',
		paddingRight: '45px',
		textTransform: 'uppercase',
		fontSize: 14,
		fontWeight: 300,
		'& p': {
			textTransform: 'none',
			color: theme.palette.common.black,
			fontSize: '16px',
			fontWeight: '500',
			margin: '0 0 10px',
		}
	},
	divider: {
		borderTop: '1px solid #f2f2f2',
		margin: '25px 0'
	},
	amenities: {
		'& .amenities-list': {
			display: 'flex',
			flexWrap: 'wrap',
			'@media (max-width: 375px)': {
				justifyContent: 'space-between'
			},
			'& div': {
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'flex-start',
				alignItems: 'center',
				width: 115,
				textAlign: 'center',
				'@media (max-width: 375px)': {
					width: 96
				},
				'& i, img': {
					padding: 15,
					display: 'flex',
					alignItems: 'center',
					border: '1px solid #22bfea',
					borderRadius: '50%',
					color: '#22bfea',
					height: 30,
					width: 30,
					fontSize: 23,
					justifyContent: 'center',
					margin: '20px 0 7px'
				}
			}
		},
	},
	additionalAmenities: {
		'& span': {
			fontSize: 16,
			fontWeight: 600,
			color: '#22bfea',
			margin: '0 5px'
		},
		'& p': {
			color: theme.palette.common.darkgray,
		}
	},
	guests: {
		'& ul': {
			paddingLeft: "0",
			columns: "1",
			listStyle: 'none',
			webkitColumns: "2",
			mozColumns: "2",
			'& li': {
				padding: '5px',
				'& span': {
					color: theme.palette.common.black,
					fontWeight: '500',
					display: 'inline-block',
					minWidth: '60px',
				}
			}
		},
		'& .instant': {
			border: '2px solid #00c8f0',
			display: 'inline-block',
			margin: '20px 0 10px',
			'& p': {
				color: theme.palette.common.black,
				margin: '14px',
				display: 'flex',
				fontSize: 15
			},
			'& img': {
				marginRight: 10
			}
		},
		'& .info-list': {
			display: 'flex',
			flexWrap: 'wrap',
			justifyContent: 'space-between',
			maxWidth: 500,
			'& > span': {
				color: theme.palette.common.darkgray,
				display: 'inline-flex',
				margin: '10px 0',
				width: 180
			},
			'& img': {
				marginRight: 5
			},
			'& .wider': {
				width: 300
			}
		}
	},
	privacy: {
		'& h4': {
			marginBottom: '15px',
		},
		'& p': {
			marginTop: '0',
			marginBottom: '0',
			color: theme.palette.common.darkgray,
			fontSize: 14
		},
		// '& p:last-child': {
		// 	fontSize: '12px'
		// }
	},
	contactHostInfo: {
		'& .advise': {
			padding: '5px 10px',
			border: '2px solid #00c8f0',
			display: 'inline-block',
			margin: '30px 0 0',
			'& .title': {
				color: theme.palette.common.black,
				margin: '14px',
				display: 'flex',
				fontSize: 15,
				fontWeight: 500
			},
			'& p': {
				color: theme.palette.common.darkgray,
				margin: '5px 14px 14px',
				display: 'flex',
				fontSize: 15
			},
			'& img': {
				width: 16,
				height: 21,
				margin: '0 10px -5px 0'
			}
		},
	},
	profileIcon: {
		borderRadius: '50%',
		width: 55,
		height: 55,
	},
	locationMap: {
		'& h4': {
			marginBottom: '10px'
		},

	},
	reviewsSection: {
		'& h4': {
			'& span': {
				letterSpacing: 2,
				fontWeight: 400
			},
			'& img': {
				verticalAlign: 'middle',
				paddingLeft: '15px',
			},
			'& div': {
				paddingLeft: '10px'
			}
		}
	},
	coverImage: {
		width: '100%',
		display: 'block'
	},
	rules: {
		'& .rules-list': {
			display: 'flex',
			flexWrap: 'wrap',
			'@media (max-width: 375px)': {
				justifyContent: 'space-between'
			},
			'& > div': {
				display: 'flex',
				marginTop: 20,
				flexDirection: 'column',
				justifyContent: 'flex-start',
				alignItems: 'center',
				width: 115,
				textAlign: 'center',
				'@media (max-width: 375px)': {
					width: 96
				},
				'& img': {
					height: 30,
					width: 30,
				},
				'& i': {
					height: 30,
					width: 30,
					color: '#fc5622',
					fontSize: 25
				}
			}
		},
	},
	rulesItem: {
		padding: 15,
		border: '1px solid #fc5622',
    borderRadius: '50%',
		marginBottom: 10,
		display: 'flex',
		flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
	},
	additionalRules: {
		// '& label': {
		// 	color: '#ccc',
		// },
		'& p': {
			fontSize: '14px',
			marginTop: '5px',
			color: theme.palette.common.darkgray,
			overflowWrap: 'break-word',
		},
		'& img': {
			margin: '0 5px -5px 0',
			width: 20,
			height: 20
		}
	},
	contactHost: {
		'& p': {
			color: '#22bfea',
			cursor: 'pointer',
			fontSize: '15px',
			fontWeight: 600,
			textTransform: 'none',
			display:'inline-block',
			margin:'0px'
		}
	},
	breakWord: {
		overflowWrap: 'break-word',
	},
	rightBlueArrow: {
		fontSize: '26px',
		color: theme.palette.common.blue,
	},
	mobileHide: {
		'@media (max-width: 850px)': {
			display: 'none'
		}
	},
});

const hardcodedAmenities = {
  'BBQ Grill': 'outdoor_grill',
  'Dining Table': 'restaurant_menu',
  'Lounge Chairs': 'weekend',
  'Large Pool area': 'waves',
  'Night Lighting': 'wb_incandescent',
  'Deck': 'deck',
  'Very sunny': 'brightness_5',
  'Swimming Lesson Friendly': 'pool',
  'WiFi': 'wifi',
  'Lunch Table': 'restaurant',
  'Handicap Access': 'accessible_forward',
  'Alcohol Friendly': 'local_bar',
  'Pet Friendly': 'pets',
  'Kiddie Pool': 'child_care',
  'Basketball Court': 'sports_basketball',
  'Large Shallow Area': 'waves',
  'Sitting area': 'event_seat',
  'Pool Party Friendly': 'cake',
  'Shade': 'beach_access',
  'Heated Pool': 'whatshot',
  'Sauna': 'spa',
  'TV': 'tv'
}

const HardcodedAmenitiesCustomIcons = {
  'Water Slide': 'water-slide'
}

const hardcodedRules = {
  'No Smoking': 'no-smoking',
  'No Loud Music': 'no-loud-music',
  'No Parties': 'no-parties',
  'No Pets': 'no-pets',
  'No Alcohol': 'no-alcohol',
  'No Food': 'no-food',
  'No Glass': 'no-glass',
  'No Diving': 'no-diving'
}

/**
 * Pool details info Form
 */
class PoolDetailsInfo extends React.Component {
	/**
	 * @param {*} props
	 */
	constructor(props) {
		super(props);
		this.state = {
			zoom: 5,
			init:true,
			paymentFormIsFixed: false,
			isFavorite: this.props.poolDetails.isFavorite || false
		};
		this.map = React.createRef();
    this.circle = React.createRef();
		this.handleMapIdle = this.handleMapIdle.bind(this);
		this.chlorCheck = this.chlorCheck.bind(this);
    this.idleCalled = false;
		this.paymentForm = null
		this.scrollContainer = null
	}

	componentDidMount() {
		window.addEventListener('scroll', this.onScroll, false)
	}

	shouldComponentUpdate(nextProps, nextState) {
		let { init, isFavorite } = this.state;
		if (isFavorite !== nextState.isFavorite) {
			return  true
		}
		if (
			this.props.serviceCharge !== nextProps.serviceCharge
			|| this.props.referalDiscount !== nextProps.referalDiscount
			|| this.state.paymentFormIsFixed !== nextState.paymentFormIsFixed
		) {
			return true
		}
		if(init === true) {
			if(nextProps.poolDetails.id !== undefined) {
				this.setState({
					init: false
				})
			}
			return true;
		} else {
			return false;
		}
	}

	onScroll = () => {
		if (window.innerWidth > 850 && this.paymentForm) {
			if (window.scrollY > 580) {
				if (!this.state.paymentFormIsFixed) {
					this.paymentForm.style.maxWidth = this.paymentForm.offsetWidth + 'px'
					this.paymentForm.style.right = window.innerWidth - (this.paymentForm.offsetLeft + this.paymentForm.offsetWidth) + 'px'
					this.setState({ paymentFormIsFixed: true })
				}
			} else if (this.state.paymentFormIsFixed) {
				this.paymentForm.style.maxWidth = 'initial'
				this.paymentForm.style.right = 'initial'
				this.scrollContainer.scrollTop = 0
				this.setState({ paymentFormIsFixed: false })
			}
		}
	}

	goToHostInfo = () => {
		if (this.props.poolDetails && this.props.poolDetails.id) {
			this.props.history.push(`/host-info/${this.props.poolDetails.id}`)
		}
	}

	redirectToConversions() {
		let accessToken = UserUtils.getAccessToken()
		if (accessToken !== null && accessToken !== '') {
			let { poolDetails, history, user } = this.props
			if (user && user.accept_chat_rules) {
				history.push({
					pathname: `/contact-host/${poolDetails.createdBy.id}/pool/${poolDetails.id}`,
					state: {
						fromPage: '/pooldetails'
					}
				})
			} else {
				history.push({
					pathname: '/chat-rules',
					state: {
						replaceTo: `/contact-host/${poolDetails.createdBy.id}/pool/${poolDetails.id}`,
						fromPage: '/pooldetails'
					}
				})
			}
		} else {
			window.headerComponent.handleLoginModelOpen()
		}
	}

	handleMapIdle() {
    if (!this.idleCalled) {
      const bounds = this.circle.current.getBounds();
      this.map.current.fitBounds(bounds);
      this.idleCalled = true;
    }
	}
	
	chlorCheck() {
		let { poolDetails } = this.props
		let names = (poolDetails.amenities !== undefined && poolDetails.amenities.length > 0 && poolDetails.amenities.map(item => item.name.toLowerCase())) || []
		if (names.includes('salt water')) {
			return false
		} else {
			return true
		}
	}

	handleAmenityIcon = (amenity) => {
    if (Object.keys(hardcodedAmenities).includes(amenity.name)) {
      return <i className="material-icons" style={{fontSize: 29}}>{hardcodedAmenities[amenity.name]}</i>
    } else if (Object.keys(HardcodedAmenitiesCustomIcons).includes(amenity.name)) {
      return <img src={window.location.origin + "/img/icons/" + amenity.name.toLowerCase().split(' ').join('-') + '.svg'} alt="" />
    } else {
      return <i className={amenity.icon} style={{fontSize: 29}} />
    }
	}

	/**
	 * render
	 */
	render() {
		const {
			classes,
			poolDetails,
			hourlyPrice,
			serviceCharge,
			referalDiscount,
			handleRequestReservation } = this.props;
		// let latitude = 0;
		// if (poolDetails.latitude !== undefined) {
		// 	latitude = poolDetails.latitude;
		// }
		// let longitude = 0;
		// if (poolDetails.longitude !== undefined) {
		// 	longitude = poolDetails.longitude;
		// }

		const settings = {
			speed: 300,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			nextArrow: <SampleNextArrow />,
			prevArrow: <SamplePrevArrow />
		};

		let activeAmenities = poolDetails.amenities && poolDetails.amenities.filter(item => item.active)
		let activeRules = poolDetails.rules && poolDetails.rules.filter(item => item.active)

		// let center = {
		// 	latitude: latitude,
		// 	longitude: longitude
		// };

		// const distance = 201.168 // meters
 
		// const randomPoint = randomLocation.randomCircumferencePoint(center, distance);
		// const GoogleMapInstance = withGoogleMap(props => (
    //   <GoogleMap
    //     ref={this.map}
    //     defaultCenter={{
    //       lat: parseFloat(randomPoint.latitude),
    //       lng: parseFloat(randomPoint.longitude)
    //     }}
    //     defaultZoom={15}
    //     onIdle={this.handleMapIdle}
    //   >
    //     <Marker
    //       position={{
    //         lat: parseFloat(randomPoint.latitude),
    //       lng: parseFloat(randomPoint.longitude)
		// 			}}
		// 			icon={{
		// 				url: window.location.origin+'/img/map_arrow.png'
		// 			}}
    //     />
    //     <Circle
    //       ref={this.circle}
    //       center={{
    //         lat: parseFloat(randomPoint.latitude),
    //       lng: parseFloat(randomPoint.longitude)
    //       }}
    //       radius={parseFloat(804.672)}
    //       options={{ fillColor: "rgb(0, 175, 227)", strokeColor: "#23d1f2" }}
    //     />
    //   </GoogleMap>
		// ));

		const currentUserIsHost = this.props.user && poolDetails.createdBy && (poolDetails.createdBy.id === this.props.user.id)

		const sortedImages = poolDetails.images && poolDetails.images.slice().sort((prev) => {
			if (!prev.cover) {
				return -1
			} else {
				return 0
			}
		})

		return (
			<div className={classes.pooInfoContainer}>
				{/* <div className={classes.poolInfoInner}> */}
					<div className={classes.poolInfoInnerImg}>
						<div>
							<Slider {...settings}>
								{sortedImages && sortedImages.map((img, imgIndex) =>
									<div key={imgIndex}>
										<img src={img.url} alt="" />
										<Hidden smUp>
											<div className="social-icons-absolute top right">
												{poolDetails.id ? <SocialIcons
													isFavorite={poolDetails.isFavorite}
													poolId={poolDetails.id}
													userRole="swimmer"
												/> : null}
											</div>
										</Hidden>
									</div>
								)}

								{sortedImages && sortedImages.length <= 0 &&
									<div>
										<img alt="" src={window.location.origin + "/img/default-pool.png"} style={{maxHeight: 510}} />
										<Hidden smUp>
											<div className="social-icons-absolute top right">
												{poolDetails.id ? <SocialIcons
													isFavorite={poolDetails.isFavorite}
													poolId={poolDetails.id}
													userRole="swimmer"
												/> : null}
											</div>
										</Hidden>
									</div>
								}
							</Slider>
						</div>
					</div>
					<div className={classes.pageContent}>
						<div className={classes.contentContainer}>
							<div>
								<div className="heading">
									<Typography variant="h2">{poolDetails.title}</Typography>
									<Hidden xsDown>
										{poolDetails.id ? <SocialIcons
											isFavorite={poolDetails.isFavorite}
											poolId={poolDetails.id}
											userRole="swimmer"
											isBlue
										/> : null}
									</Hidden>
								</div>
								{poolDetails.id !== undefined ? (
									<p>{(poolDetails.city !== '' && poolDetails.city !== null) ? poolDetails.city + ', ' : ''} {(poolDetails.state !== '' && poolDetails.state !== null) ? poolDetails.state + ', ' : ''} {poolDetails.zip_code !== '00000' ? ('' + poolDetails.zip_code) : ''}</p>
								) : ''}
								<div className='row'>
									<span>
										<img src={`${window.location.origin}/img/icons/guests.png`} width={21} height={17} style={{marginBottom: -3}} alt="" />
										<span className='bold'>{poolDetails.max_guests || 'N/A'}</span>
										max guests
									</span>
									<span>
										{this.chlorCheck()
											? <span>
												<img src={`${window.location.origin}/img/icons/chlorine_pool.png`} width={21} height={17} alt="" />
												<span className='bold'>Chlorine pool</span>
											</span>
											: <span>
												<img src={`${window.location.origin}/img/icons/salt.png`} width={23} height={17} style={{marginBottom: -3}} alt="" />
												<span className='bold'>Salt water</span>
											</span>
										}
									</span>
								</div>
								<div onClick={this.goToHostInfo} className='hosted-by-container'>
									<div className='row left host'>
										<UserAvatar
											className={classes.profileIcon}
											src={poolDetails.createdBy && poolDetails.createdBy.img_url ? poolDetails.createdBy.img_url : window.location.origin + "/img/icons/large-duck-logo.png"}
											alt='Avatar'
											user={poolDetails && poolDetails.createdBy}
										/>
										<div className='column'>
											<span>
												Hosted by
												<span style={{textTransform: 'capitalize'}} className='bold'>{poolDetails.createdBy && poolDetails.createdBy.firstname ? poolDetails.createdBy.firstname : 'N/A'}</span>
											</span>
										</div>
									</div>
									<i className={`${classes.rightBlueArrow} fa fa-angle-right`} aria-hidden='true' />
								</div>
							</div>
							{/*<div className={classes.divider}></div>*/}
							{poolDetails.pool_length !== undefined && poolDetails.pool_length !== '' && poolDetails.pool_length !== 0 &&
								poolDetails.pool_width !== undefined && poolDetails.pool_width !== '' && poolDetails.pool_width !== 0 && <div className={classes.poolInfoPara}>Pool Dimension<p>{poolDetails.pool_length || 0} x {poolDetails.pool_width || 0} {IS_US ? 'ft' : 'm'}</p></div>}
							{poolDetails.shallow_end !== undefined && poolDetails.shallow_end !== '' && poolDetails.shallow_end !== 0 &&
								poolDetails.deep_end !== undefined && poolDetails.deep_end !== '' && poolDetails.deep_end !== 0 && <div className={classes.poolInfoPara}>Depth of Pool<p>{poolDetails.shallow_end || 0} - {poolDetails.deep_end || 0} {IS_US ? 'ft' : 'm'}</p></div>}
						{/* </div> */}

						<div>
							<p className={`${classes.breakWord} gray`} dangerouslySetInnerHTML={{ __html: poolDetails.description }} />
						</div>


							<div>
								<div className={classes.divider}></div>
								<div>
									<Typography variant="h4"><img src={`${window.location.origin}/img/icons/restroom_blue.png`} style={{margin: '0 5px -5px 0'}} width={20} height={22} alt="" />Restroom</Typography>
									<p className={classes.breakWord} dangerouslySetInnerHTML={{ __html: poolDetails.restroom_description || 'Rest room subject to availability, please contact me through ' + (IS_SHVIMPLY ? 'Shvimply' : 'Swimply') + ' chat' }} style={{color: '#7b858b'}} />
								</div>
							</div>

						<div className={classes.divider}></div>
						<div className={classes.guests}>
							<Typography variant="h4">Guests</Typography>
							{poolDetails && poolDetails.default_instant_booking &&
								<div className='instant'>
									<p>
										<img src={`${window.location.origin}/img/time.png`} width={19} height={19} alt='' />
										This pool is pre approved for all reservations with up to {poolDetails.instant_group_size} guests
									</p>
								</div>
							}
							<div className='info-list'>
								<span>
									<img src={`${window.location.origin}/img/icons/guests.png`} width={21} height={16} alt="" />
									Maximum guests
									<span className='bold'>{poolDetails.max_guests || 'N/A'}</span>
								</span>
								{poolDetails.price_per_guest_enabled && <span className='wider'>
									<img src={`${window.location.origin}/img/icons/additional_guest.png`} style={{marginRight: 0}} width={25} height={15} alt="" />
									<span className='bold'>${poolDetails.price_per_guest || '0'}</span>
									per guest per hour after {poolDetails.price_per_guest_min_capacity || '10'} guests
								</span>}
								<span>
									<img src={poolDetails.guests_children_allowed === true ? `${window.location.origin}/img/icons/allowed.png` : `${window.location.origin}/img/icons/not_allowed.png`} width={17} height={17} alt="" />
									{poolDetails.guests_children_allowed === true ? 'Children allowed' : 'Children not allowed'}
								</span>
								<span className='wider'>
									<img src={poolDetails.guests_infants_allowed === true ? `${window.location.origin}/img/icons/allowed.png` : `${window.location.origin}/img/icons/not_allowed.png`} width={17} height={17} alt="" />
									{poolDetails.guests_infants_allowed === true ? 'Infants allowed' : 'Infants not allowed'}
								</span>
							</div>
						</div>

						{activeAmenities && activeAmenities.length > 0 && (
							<div>
								<div className={classes.divider}></div>
								<div className={classes.amenities}>
									<Typography variant="h4">Amenities</Typography>
									<div className='amenities-list'>
										{activeAmenities && activeAmenities.map((ame, ameIndex) =>
											<div key={ameIndex}>
												{this.handleAmenityIcon(ame)}
												{ame.name}
											</div>
										)}

									</div>
								</div>
							</div>
						)}

						{activeAmenities && activeAmenities.length > 0 &&
							<div className={classes.additionalAmenities}>
								<div className={classes.divider}></div>
								<div>
									<Typography variant="h4">Amenities <span>+</span></Typography>
									<p className={classes.breakWord} dangerouslySetInnerHTML={{ __html: poolDetails.additional_amenities || 'N/A' }} />
								</div>
							</div>
						}
						
						{(activeRules && activeRules.length > 0) &&
							<div>
								<div className={classes.divider}></div>
								<div className={classes.rules}>
									<Typography variant="h4">Host Rules</Typography>
									{activeRules && activeRules.length > 0 && (
									<div className='rules-list'>
										{activeRules && activeRules.map((rule, ruleIndex) =>
											<div key={ruleIndex}>
												{Object.keys(hardcodedRules).includes(rule.name)
													? <div className={classes.rulesItem}><img src={window.location.origin + "/img/icons/" + rule.name.toLowerCase().split(' ').join('-') + '.svg'} alt="" /></div>
													: <div className={classes.rulesItem}><i className={rule.icon} /></div>
												}
												{rule.name}
											</div>
										)}
									</div>)}
								</div>
							</div>
						}

						{(poolDetails.additional_rules !== '' && poolDetails.additional_rules !== null && (
							<div>
								<div className={classes.divider}></div>
								<div className={classes.additionalRules}>
									<Typography variant="h4"><img src={window.location.origin + "/img/icons/additional_rules.png"} alt=""/>Additional rules</Typography>
									<p className={classes.breakWord} dangerouslySetInnerHTML={{ __html: poolDetails.additional_rules }} />
								</div>
							</div>
						))}
						
						{poolDetails.privacy_policy ? (
							<div>
								<div className={classes.divider}></div>
								<div className={classes.privacy}>
									<Typography variant="h4">Privacy</Typography>
									{/* <p>{poolDetails.privacy_policy.title}</p> */}
									<p dangerouslySetInnerHTML={{ __html: poolDetails.privacy_policy.description }} />
								</div>
							</div>
						) : ''}

						{/* {from !== 'payment' ? ( */}
						<div className={classes.contactHostInfo}>
							<div className={classes.divider}></div>
							<div className='row' style={{maxWidth: '100%', alignItems: 'center'}}>
								<div className='row' style={{alignItems: 'center'}}>
									<UserAvatar
										className={classes.profileIcon}
										src={poolDetails.createdBy && poolDetails.createdBy.img_url ? poolDetails.createdBy.img_url : window.location.origin + "/img/icons/large-duck-logo.png"}
										alt='Avatar'
										user={poolDetails && poolDetails.createdBy}
									/>
									<div className='column'>
										<span>
											Hosted by
											<span style={{textTransform: 'capitalize'}} className='bold'>{poolDetails.createdBy && poolDetails.createdBy.firstname ? poolDetails.createdBy.firstname : 'N/A'}</span>
										</span>
									</div>
								</div>
								{!currentUserIsHost && <div className={classes.contactHost}>
									<p onClick={this.redirectToConversions.bind(this)}>Contact host</p>
								</div>}
							</div>
							<div className='advise'>
								<span className='title'><img alt='' src={`${window.location.origin}/img/icons/light_bulb.png`} />Always communicate through {IS_SHVIMPLY ? 'Shvimply' : 'Swimply'}</span>
								<p>To protect your payment, never transfer money or communicate outside {IS_SHVIMPLY ? 'Shvimply' : 'Swimply'} website or app</p>
							</div>
						</div>
						{/* ):''} */}

						{/* <div className={classes.divider}></div>
						{
							(center.lat !== 0 || center.lng !== 0) ? (
								<div className={classes.locationMap}>
									<Typography variant="h4">Location</Typography>

									<div >
											<div>
												<GoogleMapInstance
													containerElement={<div style={{ height: "400px", width: "100%" }} />}
													mapElement={<div style={{ height: "100%" }} />}
												/>
											</div>
									</div>
								</div>
							) : ''
						} */}
						
						{(poolDetails.rating!==null && poolDetails.rating !== '' && poolDetails.rating !== 0) ?(
							<div>
								<div className={classes.divider}></div>
								<div className={classes.reviewsSection}>
									<Typography variant="h4"> Reviews <span> ({poolDetails.reviews && poolDetails.reviews.length})</span>
									{/* <StarRatings
											rating={(poolDetails.rating === null || poolDetails.rating === '') ? 0 : poolDetails.rating}
											changeRating={this.changeRating}
											numberOfStars={5}
											name='rating'
											starRatedColor="#00ade2"
											starDimension="18px"
											starSpacing="1px"
										/> */}
									</Typography>
									<PoolDetailsReviews poolDetails={poolDetails} />
								</div>
							</div>
						):<br/>}
					</div>
					{this.props.paymentForm && Object.keys(poolDetails).length
						? <div
							ref={r => this.paymentForm = r}
							className={`${classes.formContainer} ${classes.mobileHide} ${this.state.paymentFormIsFixed ? 'fixed' : ''}`}
						>
							<div ref={r => this.scrollContainer = r} className='scroll-container'>
								<div className='inner-container'>
									<PaymentForm
										poolDetails={poolDetails}
										hourlyPrice={hourlyPrice}
										serviceCharge={serviceCharge}
										referalDiscount={referalDiscount}
										poolId={poolDetails.id}
										handleRequestReservation={handleRequestReservation}
									/>
								</div>
							</div>
						</div>
						: null
					}
				</div>
			
			</div>
		);
	}
}

PoolDetailsInfo.propTypes = {
	classes: PropTypes.object.isRequired,
};


const enhance = compose(
	withStyles(styles),
	withRouter,
);

function PoolDetailsInfoContainer (props) {
	const context = useContext(UserContext)
	return <PoolDetailsInfo {...context} {...props} />
}

export default enhance(PoolDetailsInfoContainer);
