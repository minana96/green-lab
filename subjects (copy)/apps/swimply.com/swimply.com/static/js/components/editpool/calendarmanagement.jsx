import React, { useContext } from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { withApollo } from "react-apollo";
import Pageloader from '../commons/pageloader';
import { Link } from 'react-router-dom';
import mobiscroll from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import moment from 'moment';
import Moment from 'react-moment';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Switch from '@material-ui/core/Switch';
import cloneDeep from 'lodash/cloneDeep';
import { loader } from 'graphql.macro';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { IS_SHVIMPLY } from '../../config'
import * as commonFunctions from './../utilities/commonFunctions';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UserUtils from "../utilities/UserUtils";
import './tutorial.css';

// contexts
import UserContext from '../../contexts/UserContext'

const pooldetailsQuery = loader('./../../graphql/findpool/pooldetailsQuery.graphql');
const savePoolUnAvailability = loader('./../../graphql/host/savepoolunavailability.graphql');
const savePoolInstaBooking = loader('./../../graphql/host/savepoolinstabooking.graphql');

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
			zIndex: '23',
			height: '100%',
			overflow: 'auto',
		}
	},
	containerTut: {
		maxWidth: '1170px',
		margin: '0 auto',
		width: '100%',
		padding: '0 15px',
		'@media (max-width:1279px)': {
			padding: '0px 0px',
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
		},
		'@media (max-width:767px)': {
			width: '25px',
			height: '25px',
			overflow: 'hidden',
			color: theme.palette.common.black,
			marginBottom: "10px",
			position: 'absolute',
			top: '12px',
			'& a': {
				color: theme.palette.common.black,
			},
			"& i": {
				fontSize: "30px",
			}
		}
	},
	ContentContainer: {
		paddingTop: '0',
		'& h3': {
			fontSize: '20px',
			marginBottom: '12px',
			paddingTop: '15px'
		},
		'& p': {
			fontWeight: '100',
			fontSize: '14px',
			margin: '2px 0 0',
		},
		'@media (max-width:767px)': {
			'& h3': {
				fontSize: '14px',
				marginBottom: '0px',
				padding: '20px 20px 15px',
				textAlign: 'center',
				boxShadow: 'none',
				margin: ' 0px',
				textTransform: 'uppercase'
			}
		}
	},
	formContainer: {
		maxWidth: '380px',
		paddingTop: '0',
	},

	editPoolcontainer: {
		padding: '60px 0',
		'@media(max-width:767px)': {
			padding: '0 0 20px 0'
		}
	},
	calenderBlueText: {
		padding: '10px 15px',
		color: theme.palette.common.blue,
		background: '#edf6fa',
		fontSize: '12px',
	},
	instantBookings: {
		textTransform: 'uppercase',
		fontWeight: '500',
		fontSize: "13px",
		color: theme.palette.common.black,
		marginTop: '20px',
		'@media(max-width:479px)': {
			fontSize: "12px",
		},
		'& img': {
			verticalAlign: 'middle',
			marginTop: '-2px',
			width: '19px',
			marginRight: '5px',
		},
		'& li': {
			'textTransform': 'none'
		}
	},
	blueBookings: {
		float: 'right',
		color: theme.palette.common.blue,
		letterSpacing: '0',
		cursor: 'pointer'
	},
	instantBookingsContainer: {
		marginTop: '15px',
		paddingBottom: '15px',
		'& label': {
			letterSpacing: '1px',
		},

		'& ul': {
			paddingLeft: '6px',
			listStyle: 'none',
			'& li': {
				padding: '6px 0'
			}
		}
	},
	devider: {
		borderTop: '1px solid #efefef',
	},
	calenderManegemetPop: {
		padding: '0 0 10px',
		minHeight: '480px',
		width: '380px',

		'& h3': {
			fontSize: '16px',
			padding: '0 15px',
			'& span': {
				cursor: 'pointer',
				fontSize: '13px',
				float: 'right',
				border: '2px solid #00b0e4',
				padding: '5px 10px',
				fontWeight: '100',
				marginTop: '-6px',
				borderRadius: '5px',
			},
			'@media(max-width:767px)': {
				fontSize: '18px',
			}
		},
		'@media(max-width:767px)': {
			width: '340px',
		}
	},
	weekView: {
		marginTop: '0px',
		position: 'relative',
		display: 'table',
		width: '100%',
		'& h3': {
			fontSize: '13px',
			fontWeight: '500',
			color: theme.palette.common.black,
			textTransform: 'uppercase',
			letterSpacing: '1px',
		},
		'& ul': {
			padding: '0 0px',
			listStyle: 'none',
			display: 'flex',
		},
		'& li': {
			cursor: 'pointer',
			width: '15%',
			border: '1px solid #ccc',
			height: '40px',
			textAlign: 'center',
			marginRight: '5px',
			fontSize: '12px',
			fontWeight: '100',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			color: theme.palette.common.black,
		},
		'& > div:last-child': {
			position: 'relative',
		}
	},
	formInputBox: {
		padding: '0px 0px',
		'& label + div ': {
			marginTop: '0',
			marginBottom: '0',
			width: '50%'
		},

		position: "relative",
		marginBottom: "15px",
		'& fieldset': {
			opacity: 0,
		},

		'& label': {
			textTransform: "uppercase",
			fontSize: '12px',
			letterSpacing: '0.6px',
			marginBottom: '3px',
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
	manageButtons: {
		padding: '0 15px',
		marginTop: '17px',
		'& span': {
			display: 'inline-block',
			padding: '4px 24px',
			fontWeight: '400',
			'@media(max-width:479px)': {
				width: '100%',
				padding: '4px 0px',
			}
		},
		'& span:last-child': {
			background: 'transparent',
			color: theme.palette.common.blue,
			paddingRight: '0',
			'&:hover': {
				background: 'transparent',
			}

		},
		'@media(max-width:767px)': {
			'& span': {
				marginBottom: '0px'
			},
			'& span:first-child': {
				marginBottom: '10px'
			}
		},
	},
	switchBox: {
		position: 'absolute',
		right: '0',
		top: 0,
	},
	activeWeek: {
		border: '1px solid #20a3e0 !important',
		background: '#f3f5f5',
	},
	dayUnavailable: {
		background: '#f3f5f5',
		color: '#c2c2c2 !important',
		borderColor: ' #e6e3e3  !important'
	},
	dayInsta: {
		background: 'url(/img/time.png)',
		color: '#c2c2c2',
		border: '1px solid #eef0f1',
		backgroundRepeat: ' no-repeat',
		backgroundPosition: 'right 5px bottom 5px',
		backgroundSize: '16px',
	},
	isInsta: {
		background: 'url(/img/time.png)',
		color: '#c2c2c2',
		backgroundRepeat: ' no-repeat',
		backgroundPosition: 'right 5px bottom 5px',
		backgroundSize: '16px',
	},
	defaultReservationBtn: {
		'& span:first-child': {
			background: '#ccc',
			display: 'inline-block',
			padding: '4px 28px',
			fontWeight: '400',
			color: "#a7a3a3",

		},
		'& span:first-child:hover': {
			background: '#ccc',
			cursor: 'default'
		},
		'@media (max-width:767px)': {
			'& span:first-child': {
				padding: '6px 8px',
				display: 'block',
				marginBottom: '15px'
			}
		}
	},
	addOpacity: {
		opacity: '0.5'
	},
	markAsUnavial: {
		padding: '4px 45px !important',
	},
	dateButton: {
		background: '#f3f5f5',
		padding: '11px 15px',
		boxShadow: 'none',
		border: 'none',
		fontSize: '15px',
		marginBottom: '6px',
		outline: 'none'
	},
	calenderManegemetPopMain: {
		'@media (max-width:767px)': {
			'& > div > div': {
				margin: '0',
			}
		}
	},
	// tutorial start here
	availabilityTooltip: {
		position: 'fixed',
		background: 'rgba(0,0,0,0.8)',
		top: '0',
		minHeight: '100vh',
		width: '100%',
		zIndex: '11',
		paddingTop: '95px',
		//overflowY: 'scroll',
		maxHeight: '100vh',
		'@media (max-width:767px)': {
			paddingTop: '45px',
			overflowY: 'scroll',
		}
	},
	tutorialContainer: {
		maxWidth: '310px',
		'@media (max-width:479px)': {
			maxWidth: '100%',
			padding: '0px 30px',
		},
		'@media (min-width:480px) and (max-width:1279px)': {
			padding: '0px 30px',
		},
		'& ul': {
			listStyle: 'none',
			padding: '0',
			color: theme.palette.common.white,
			paddingBottom: '180px',
			'& li': {
				marginTop: '20px',
			},
			'& h6': {
				margin: '0 0 5px',
				fontSize: '14px',
				fontWeight: '500',
				'& img': {
					maxWidth: '17px',
					verticalAlign: 'middle',
					filter: 'brightness(0) invert(1)',
					marginRight: '5px'
				}
			},
			'& p': {
				margin: '0',
				fontSize: '13px',
				fontWeight: '300',

			}
		}
	},
	paddingLeftIndent: {
		paddingLeft: '26px'
	},
	contentTutBox: {
		background: theme.palette.common.blue,
		color: theme.palette.common.white,
		padding: '1px 35px',
		borderRadius: '10px',
		textAlign: 'center',
		'@media (max-width:767px)': {
			padding: '1px 55px',
		}
	},
	tutorialFooter: {
		position: 'fixed',
		width: '100%',
		background: theme.palette.common.blue,
		bottom: '0',
		right: '0',
		padding: '15px 15px',
		color: '#fff',
		zIndex: '9999',
		'@media (max-width: 767px)': {
			background: theme.palette.common.transparent,
		},
		'& span': {
			padding: '10px 55px',
			float: 'right',
			borderRadius: '5px',
			fontWeight: '500',
			cursor: 'pointer',
			textTransform: 'uppercase',
			'&:hover': {
				opacity: '0.8'
			}
		},
		'& span:first-child': {
			background: theme.palette.common.white,
			color: theme.palette.common.blue,
			'@media (max-width:767px)': {
				background: theme.palette.common.blue,
				color: theme.palette.common.white,
			}
		},
		'@media (max-width:767px)': {
			'& span': {
				marginRight: '0px'
			}
		},
		'@media (min-width:768px) and (max-width:1279px)': {
			'& span': {
				marginRight: '15px'
			}
		},
	},
	calenderTimerPop: {
		position: 'absolute',
	},
	tutorialInfo: {
		cursor: 'pointer',
		'& img': {
			maxWidth: '22px',
			verticalAlign: 'middle',
			marginLeft: '10px',
		},
		'@media (max-width:767px)': {
			float: 'right',
			marginTop: '-2px'
		}
	},
	footerTabs: {
		textAlign: 'center',
	}
});

const time_array = [
	{ 'time': '7AM', 'activeClass': '', 'instaBookingClass': '', 'disable': false, 'time_insert': '07:00:00' },
	{ 'time': '8AM', 'activeClass': '', 'instaBookingClass': '', 'disable': false, 'time_insert': '08:00:00' },
	{ 'time': '9AM', 'activeClass': '', 'instaBookingClass': '', 'disable': false, 'time_insert': '09:00:00' },
	{ 'time': '10AM', 'activeClass': '', 'instaBookingClass': '', 'disable': false, 'time_insert': '10:00:00' },
	{ 'time': '11AM', 'activeClass': '', 'instaBookingClass': '', 'disable': false, 'time_insert': '11:00:00' },
	{ 'time': '12PM', 'activeClass': '', 'instaBookingClass': '', 'disable': false, 'time_insert': '12:00:00' },
	{ 'time': '1PM', 'activeClass': '', 'instaBookingClass': '', 'disable': false, 'time_insert': '13:00:00' },
	{ 'time': '2PM', 'activeClass': '', 'instaBookingClass': '', 'disable': false, 'time_insert': '14:00:00' },
	{ 'time': '3PM', 'activeClass': '', 'instaBookingClass': '', 'disable': false, 'time_insert': '15:00:00' },
	{ 'time': '4PM', 'activeClass': '', 'instaBookingClass': '', 'disable': false, 'time_insert': '16:00:00' },
	{ 'time': '5PM', 'activeClass': '', 'instaBookingClass': '', 'disable': false, 'time_insert': '17:00:00' },
	{ 'time': '6PM', 'activeClass': '', 'instaBookingClass': '', 'disable': false, 'time_insert': '18:00:00' },
	{ 'time': '7PM', 'activeClass': '', 'instaBookingClass': '', 'disable': false, 'time_insert': '19:00:00' },
	{ 'time': '8PM', 'activeClass': '', 'instaBookingClass': '', 'disable': false, 'time_insert': '20:00:00' },
	{ 'time': '9PM', 'activeClass': '', 'instaBookingClass': '', 'disable': false, 'time_insert': '21:00:00' },
	{ 'time': '10PM', 'activeClass': '', 'instaBookingClass': '', 'disable': false, 'time_insert': '22:00:00' },
	{ 'time': '11PM', 'activeClass': '', 'instaBookingClass': '', 'disable': false, 'time_insert': '23:00:00' },
	{ 'time': '12AM', 'activeClass': '', 'instaBookingClass': '', 'disable': false, 'time_insert': '00:00:00' }
]

const defaultDays = [
	{ 'day': 'SU', 'active': false, 'day_name': 'Sun' },
	{ 'day': 'M', 'active': false, 'day_name': 'Mon' },
	{ 'day': 'T', 'active': false, 'day_name': 'Tue' },
	{ 'day': 'W', 'active': false, 'day_name': 'Wed' },
	{ 'day': 'TH', 'active': false, 'day_name': 'Thu' },
	{ 'day': 'F', 'active': false, 'day_name': 'Fri' },
	{ 'day': 'SA', 'active': false, 'day_name': 'Sat' },
]


class CalendarManagement extends React.Component {
	constructor(props) {
		let isMobile = false;
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
			isMobile = true;
		}

		super(props);
		this.state = {
			selectedDate: new Date(),
			popupStatus: false,
			timeDetails: cloneDeep(time_array),
			days: cloneDeep(defaultDays),
			checkedA: true,
			repeat: false,
			loading: false,
			poolDetails: {},
			instaTimes: [],
			poolUnavailabilities: [],
			popupType: '',
			endDate: new Date(),
			isMobile: isMobile,
			isOpen: false,
			showDate: '',
			tutorial: UserUtils.getStartTutorial(),
			tutorialStep: 1,
			popupError: ''
		}
		this.handleCalender = this.handleCalender.bind(this);
		this.manageInstaBooking = this.manageInstaBooking.bind(this);
		this.manageUnAvailities = this.manageUnAvailities.bind(this);
		this.closePopup = this.closePopup.bind(this);
		this.selectAll = this.selectAll.bind(this);
		this.selectTime = this.selectTime.bind(this);
		this.clickDay = this.clickDay.bind(this);
		this.makeUnavailabel = this.makeUnavailabel.bind(this);
		this.addInstaBooking = this.addInstaBooking.bind(this);

		this.handleChangeDate = this.handleChangeDate.bind(this);
		this.toggleCalendar = this.toggleCalendar.bind(this);
		this.updateDimensions = this.updateDimensions.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);

		UserUtils.removeStartTutorial()
	}

	componentDidMount() {
		window.scrollTo(0, 0);
		window.addEventListener("resize", this.updateDimensions);
		let { history } = this.props;
		let poolId = parseInt(this.props.match.params.id);
		if (isNaN(poolId)) {
			history.push('/host');
		} else {
			this.getPoolData();
		}
	}

	updateDimensions() {
		let isMobile = false;
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
			isMobile = true;
		}
		this.setState({ isMobile: isMobile })
	}


	// handleing Change date
	handleChangeDate(date) {
		this.setState({ endDate: date })
		this.toggleCalendar()
	}

	//Toggle calander
	toggleCalendar(e) {
		let { repeat } = this.state;
		if (this.state.isMobile) {
			e && e.preventDefault()
			if (this.state.isOpen === true || (repeat === true && this.state.isOpen === false)) {
				this.setState({ isOpen: !this.state.isOpen })
			}

		}
	}

	getPoolData() {
		let poolId = parseInt(this.props.match.params.id);
		let access_token = UserUtils.getAccessToken();
		let currentUserId = UserUtils.getUserID();
		let { history } = this.props;
		if (access_token !== undefined && access_token !== null && access_token !== '') {
			this.setState({
				loading: true,
				poolId: poolId
			})
			this.props.client.query({
				query: pooldetailsQuery,
				variables: {
					"id": poolId
				},
				fetchPolicy: "network-only"
			})
				.then((res) => {
					if (!res.data.pool) {
						history.push('/host');
					} else if (res.data.pool.createdBy && res.data.pool.createdBy.id === currentUserId) {
						this.setState({
							loading: false,
							poolDetails: res.data.pool,
							hourlyPrice: res.data.pool.hourly_price,
						}, () => {
							this.handleCalender(this.state.selectedDate, 'init')
						});
					} else {
						history.push('/host');
					}
				}).catch(async (error) => {
					let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
					if (errorMsg === "Unauthenticated.") {
						const status = await this.props.refreshToken(this.props.history)
						if (status === 'ok') {
							this.getPoolData()
						}
					}
					this.setState({
						loading: false
					});
				});
		} else {
			UserUtils.logout();
			UserUtils.setPreviousUrl(this.props.location.pathname);
			UserUtils.setPreviousSearchUrl(this.props.location.search);
			UserUtils.setIsPreviousUrl('yes');
			history.push('/');
		}

	}

	handleChange = name => event => {
		if (name === 'repeat') {
			if (event.target.checked === false) {
				this.setState({ [name]: event.target.checked, days: cloneDeep(defaultDays) });
			} else {
				let days = cloneDeep(defaultDays)
				let date = new Date(this.state.selectedDate);
				let day = date.getDay();
				days[day].active = true;
				date = date.setDate(date.getDate() + 7);
				date = new Date(date);
				this.setState({ [name]: event.target.checked, endDate: date, days: days });
			}
		} else {
			this.setState({ [name]: event.target.checked });
		}
	};

	handleDateChange(event) {
		if (typeof event.target !== 'undefined' && event.target !== '') {
			this.setState({ [event.target.name]: event.target.value });
		} else {
			this.setState({ endDate: event, 'isOpen': false });
		}
	}

	handleCalender(event, from) {
		let { poolDetails } = this.state;
		let date = '';
		if (from === 'init') {
			date = new Date(event);
		} else {
			date = new Date(event.date);
		}
		this.setState({
			selectedDate: date
		})
		let serviceDate = moment(date).format('YYYY-MM-DD');
		let selectedDateUnvalibilities = _.filter(poolDetails.pool_unavailabilities, { 'date': serviceDate });
		let selectedDateInsta = _.filter(poolDetails.pool_instant, { 'date': serviceDate });
		selectedDateUnvalibilities = this.setTimeOrder(selectedDateUnvalibilities);
		selectedDateInsta = this.setTimeOrder(selectedDateInsta);
		this.setState({
			instaTimes: selectedDateInsta,
			poolUnavailabilities: selectedDateUnvalibilities,
		})
	}

	// For dispalying the Insta bookings and Unavalabilities
	setTimeOrder(data) {
		data = _.orderBy(data, ['time'], ['asc']);
		let times = [];
		let start = '';
		let end = '';
		let startEnd = '';
		for (let i = 0; i <= time_array.length; i++) {
			let searchTime = '';
			if (i > 9) {
				searchTime = i + ':00:00';
			} else {
				searchTime = '0' + i + ':00:00';
			}
			// Search time is in array or not
			let index = data.findIndex(x => (x.time === searchTime));
			if (index >= 0) {
				/*
					If start time is empty add time to start time
					else replace the end by current loop time
				*/
				if (start === '') {
					start = moment(data[index].date + ' ' + data[index].time).format('h:mma');
					startEnd = moment(data[index].date + ' ' + data[index].time).add(1, 'hours').format('h:mma');
				} else {
					end = moment(data[index].date + ' ' + data[index].time).add(1, 'hours').format('h:mma');
				}
			} else {
				/*
					If Loop time not in the array
				*/
				if (start !== '') {
					/*If end time is not equal to empty concat end time with start time
						if End time id empty just put only start time

						then push start time to array and return final array after completion of loop.
					*/
					if (end !== '') {
						start = start + ' - ' + end;
					} else {
						start = start + ' - ' + startEnd;
					}
					times.push(start);
					end = '';
					start = '';
					startEnd = '';
				}
			}
		}
		return times;
	}

	closePopup = function () {
		this.setState({
			popupStatus: false,
			repeat: false
		})
	}

	manageInstaBooking(from) {
		let { selectedDate, poolDetails } = this.state;
		let date = moment(selectedDate).format('YYYY-MM-DD');
		let unvalibilities = _.filter(poolDetails.pool_unavailabilities, { 'date': date });
		let instaBooking = _.filter(poolDetails.pool_instant, { 'date': date });
		let times = cloneDeep(time_array);
		if (from !== undefined && from !== '' && from === 'tutorial') {
			times[7].activeClass = 'active';
			times[8].activeClass = 'active';
			times[16].activeClass = 'active';
			times[17].activeClass = 'active';
		} else {
			for (let i = 0; i < time_array.length; i++) {
				let unvalibilityIndex = _.filter(unvalibilities, { 'time': times[i]['time_insert'] });
				if (unvalibilityIndex.length >= 1) {
					times[i].disable = true;
				}
				let instaBookingIndex = _.filter(instaBooking, { 'time': times[i]['time_insert'] });
				if (unvalibilityIndex.length === 0 && instaBookingIndex.length >= 1) {
					times[i].activeClass = 'active';
				}
			}
		}


		let endDate = new Date(this.state.selectedDate);
		endDate = endDate.setDate(endDate.getDate() + 7);
		endDate = new Date(endDate);

		this.setState({
			popupStatus: true,
			popupType: 'insta',
			repeat: false,
			days: cloneDeep(defaultDays),
			timeDetails: times,
			endDate: endDate,
			popupError: ''
		})
	}

	addInstaBooking() {
		let { selectedDate, timeDetails, days, repeat, poolDetails, endDate } = this.state;
		let date = moment(selectedDate).format('YYYY-MM-DD');
		endDate = moment(endDate).format('YYYY-MM-DD');
		let pool_id = poolDetails.id;
		let instaBooking = _.filter(timeDetails, { 'activeClass': 'active' });
		instaBooking = _.map(instaBooking, 'time_insert');
		let repeatDays = _.filter(days, { 'active': true });
		repeatDays = _.map(repeatDays, 'day_name');
		if ((repeat === false) || (repeat === true && repeatDays.length >= 1 && endDate !== '')) {
			let data = {
				"pool_id": pool_id,
				"available_date": date,
				"available_time": instaBooking,
				"repeat_availablitlity": repeat,
				"end_date": endDate,
				"days": repeatDays
			}
			this.setState({ loading: true });
			this.props.client.mutate({
				mutation: savePoolInstaBooking,
				variables: {
					data: data
				}
			})
				.then((res) => {
					if (res.data.savePoolInstants.status === 'true') {
						this.setState({
							popupStatus: false
						})
						this.getPoolData();
					} else {
						this.setState({
							loading: false
						});
					}
				}).catch(async (error) => {
					let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
					if (errorMsg === "Unauthenticated.") {
						const status = await this.props.refreshToken(this.props.history)
						if (status === 'ok') {
							this.addInstaBooking()
						}
						errorMsg =''
					}
					this.setState({
						loading: false,
						popupError: errorMsg
					});
				});

		}
	}

	manageUnAvailities(from) {
		let { selectedDate, poolDetails } = this.state;
		selectedDate = moment(selectedDate).format('YYYY-MM-DD');
		let unvalibilities = _.filter(poolDetails.pool_unavailabilities, { 'date': selectedDate });

		let instaBooking = _.filter(poolDetails.pool_instant, { 'date': selectedDate });

		let timeDetails = cloneDeep(time_array);
		if (from !== undefined && from !== '' && from === 'tutorial') {
			timeDetails[0].activeClass = 'active';
			timeDetails[1].activeClass = 'active';
			timeDetails[2].activeClass = 'active';
			timeDetails[3].activeClass = 'active';
			timeDetails[16].activeClass = 'active';
			timeDetails[17].disable = true;
			timeDetails[8].disable = true;
			timeDetails[9].disable = true;
		} else {
			for (let i = 0; i < time_array.length; i++) {
				let instaIndex = _.filter(instaBooking, { 'time': timeDetails[i]['time_insert'] });
				if (instaIndex.length >= 1) {
					timeDetails[i].disable = true;
				}

				let unvalibilityIndex = _.filter(unvalibilities, { 'time': timeDetails[i]['time_insert'] });
				if (instaIndex.length === 0 && unvalibilityIndex.length >= 1) {
					timeDetails[i].activeClass = 'active';
				}
			}
		}


		let endDate = new Date(this.state.selectedDate);
		endDate = endDate.setDate(endDate.getDate() + 7);
		endDate = new Date(endDate);

		this.setState({
			popupStatus: true,
			popupType: 'unavailities',
			timeDetails: timeDetails,
			repeat: false,
			days: cloneDeep(defaultDays),
			endDate: endDate,
			popupError: ''
		})
	}

	makeUnavailabel() {
		let { selectedDate, timeDetails, days, repeat, poolDetails, endDate } = this.state;
		let date = moment(selectedDate).format('YYYY-MM-DD');
		endDate = moment(endDate).format('YYYY-MM-DD');
		let pool_id = poolDetails.id;
		let unvalibilities = _.filter(timeDetails, { 'activeClass': 'active' });
		unvalibilities = _.map(unvalibilities, 'time_insert');
		let repeatDays = _.filter(days, { 'active': true });
		repeatDays = _.map(repeatDays, 'day_name');
		if ((repeat === false) || (repeat === true && repeatDays.length >= 1 && endDate !== '')) {
			let data = {
				"pool_id": pool_id,
				"available_date": date,
				"available_time": unvalibilities,
				"repeat_availablitlity": repeat,
				"end_date": endDate,
				"days": repeatDays
			}

			this.setState({ loading: true });
			this.props.client.mutate({
				mutation: savePoolUnAvailability,
				variables: {
					data: data
				}
			})
				.then((res) => {
					if (res.data.savePoolUnAvailability.status === 'true') {
						this.setState({
							popupStatus: false
						})
						this.getPoolData();
					} else {
						this.setState({
							loading: false
						});
					}
				}).catch(async (error) => {
					let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
					if (errorMsg === "Unauthenticated.") {
						const status = await this.props.refreshToken(this.props.history)
						if (status === 'ok') {
							this.makeUnavailabel()
						}
						errorMsg = ''
					}
					this.setState({
						loading: false,
						popupError: errorMsg
					});
				});

		}
	}

	clickDay(event, index) {
		let { days, repeat } = this.state;
		if (repeat === true) {
			if (days[index].active === false) {
				days[index].active = true;
			} else {
				days[index].active = false;
			}
			this.setState({
				days: days
			})
		}
	}

	selectAll() {
		let { timeDetails } = this.state;

		for (let i = 0; i < time_array.length; i++) {
			if (timeDetails[i].disable === false) {
				timeDetails[i].activeClass = 'active';
			}
			if (i === time_array.length - 1) {
				this.setState({
					timeDetails: timeDetails
				})
			}
		}
	}

	selectTime(event, index) {
		let { timeDetails } = this.state;
		if (timeDetails[index].disable === false) {
			if (timeDetails[index].activeClass !== '') {
				timeDetails[index].activeClass = '';
			} else {
				timeDetails[index].activeClass = 'active';
			}
			this.setState({
				timeDetails: timeDetails
			})
		}
	}

	forwaredTutorial = (step, tutorial) => {
		if (step === 11) {
			step = '';
			tutorial = '';
		}
		this.setState({
			tutorialStep: step,
			tutorial
		})
		let body = document.getElementById("body");
		if (tutorial === '') {
			body.classList.remove('calendar_tutorial');
		} else {
			body.classList.add('calendar_tutorial');
		}

		switch (step) {
			case 5:
				this.manageInstaBooking('tutorial');
				break;
			case 6:
				let days = cloneDeep(defaultDays)
				let date = new Date(this.state.selectedDate);
				let day = date.getDay();
				days[day].active = true;
				date = date.setDate(date.getDate() + 7);
				date = new Date(date);
				this.setState({ repeat: true, endDate: date, days: days });
				break;
			case 7:
				break;
			case 9:
				this.manageUnAvailities('tutorial');
				break;
			default:
				this.setState({
					popupStatus: false
				})
				break;
		}
	}

	render() {
		const { classes } = this.props;
		const { loading, poolDetails, popupError, selectedDate, timeDetails, poolUnavailabilities,
			instaTimes, popupType, days, endDate, repeat, tutorial, tutorialStep } = this.state;
		let tomorrow = new Date(new Date().setDate(new Date().getDate()));
		const timeItems = timeDetails.map((time, index) =>
			<li key={index} className={(time.activeClass !== '' && popupType === 'unavailities' ? (classes.dayUnavailable) : (time.disable && classes.isInsta)) || (time.activeClass !== '' && popupType === 'insta' && (classes.dayInsta))} onClick={(e) => this.selectTime(e, index)} disabled={popupType === 'insta' && time.disable}>
				{time.time}
			</li>
		)
		const daysItems = days.map((day, index) =>
			<li key={index} className={(day.active === true && (classes.activeWeek))} onClick={(e) => this.clickDay(e, index)}>
				{day.day}
			</li>
		)

		let repeatDays = _.filter(days, { 'active': true });
		repeatDays = _.map(repeatDays, 'day_name');

		let buttonDisable = true;
		if (((repeat === false) || (repeat === true && repeatDays.length >= 1 && endDate !== ''))) {
			buttonDisable = false;
		}
		return (
			<Typography variant="body1" className={tutorialStep !== '' ? 'tutorialStepContainer' : ''} component="div" >
				{loading === true ? <Pageloader loading={loading} /> : ''}
				<div className={classes.container}>
					<div className={classes.editPoolcontainer}>
						<div className={classes.backStep}>
							<Link to="/host" >
								<font><i className="fa fa-angle-left" aria-hidden="true"></i> BACK</font>
							</Link>
						</div>
						<div className={classes.formContainer} >
							<div className={(tutorialStep === 3 ? 'popShowTut' : '') + ' manageCalender poolTimeManagements'}>
								<div className={classes.ContentContainer}>
									<Typography variant="h3" className={tutorialStep === 3 ? 'popShowTut' : ''}>
										Manage Availability
										<span className={(tutorialStep === 10 ? 'tutorialLastStep' : '') + ' ' + classes.tutorialInfo}>
											<Link to={'/tutorial/' + poolDetails.id}>
												<img src="/img/tutorial_info.png" alt="" onClick={(e) => this.forwaredTutorial(1, 'start')} />
											</Link>
											<span className='tutorialLastStepTooltip'>That's all! Tap here anytime to view this tutorial again.</span>
											<p className='tutorialLastPara'>Got a question or feedback? <span>Get in touch at <a href="mailto:hostcare@swimply.com">hostcare@swimply.com</a></span></p>
										</span>
									</Typography>
								</div>
								<mobiscroll.Form>
									<mobiscroll.FormGroup>
										<label>
											<mobiscroll.Calendar
												theme="bootstrap"
												layout="liquid"
												weeks={1}         // More info about weeks: https://docs.mobiscroll.com/4-6-2/react/calendar#opt-weeks
												display="inline"  // Specify display mode like: display="bottom" or omit setting to use default
												placeholder="Please Select..."
												value={selectedDate}
												onDayChange={this.handleCalender}
												min={tomorrow}
											>
												<input type="hidden" />
											</mobiscroll.Calendar>
										</label>
									</mobiscroll.FormGroup>
								</mobiscroll.Form>
							</div>
							<div className={classes.calenderContent}>
								<Typography variant="h3">
									<Moment format="MMMM DD">{selectedDate}</Moment>
								</Typography>
								<p className={classes.calenderBlueText}>Instant Booking slots are 80% more likely to get reserved than regular slots.</p>
								<div className={classes.instantBookings}>
									<div className={(tutorialStep === 4 ? 'popShowTutDiv' : '') + ' ' + classes.instantBookingsContainer}>
										<div className='instantRow'>
											<div className='instaBookTootip'>
												Tap <span className='plus'>+</span> to create instant booking time slots.
											</div>
											<div>
												<label>Instant Booking</label>
												<label className={classes.blueBookings} onClick={this.manageInstaBooking}><img alt="" src="/img/plus2.jpg" /> Manage timeslots</label>
											</div>
											{(instaTimes.length !== 0) ? (
												<ul>
													{instaTimes.map(data =>
														<li>{data}</li>
													)}
												</ul>
											) : ''}
										</div>
										<p className='instaBookPara'>Instant hours are 80% more likely to get booked and appear higher on search results.</p>
									</div>

									<div className={classes.devider}></div>

									<div className={(tutorialStep === 8 ? 'popShowUnavailable' : '') + ' ' + classes.instantBookingsContainer + " tutorailInsta"}>
										<div className='instantRow'>
											<div className='instaBookTootip'>
												Tap <span className='plus'>+</span> to create unavailable hours.
											</div>
											<div>
												<label>Unavailable</label>
												<label className={classes.blueBookings} onClick={this.manageUnAvailities}><img alt="" src="/img/plus2.jpg" /> Manage timeslots</label>
												{(poolUnavailabilities.length !== 0) ? (
													<ul>
														{poolUnavailabilities.map(data =>
															<li>{data}</li>
														)}
													</ul>
												) : ''}
											</div>
										</div>
										<p className='instaBookPara'>Hosts block out unavailable time slots to avoid having  to decline unwanted bookings (declining too many bookings results in lower ratings).</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Dialog
					className={classes.calenderManegemetPopMain + " " + classes.calenderTimerPop + ' ' + (tutorialStep !== '' ? 'tutorialStepPopup' : '')}
					open={this.state.popupStatus}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogContent className='calenderManegemetPop'>
						<DialogContentText id="alert-dialog-description" >
							<div className={((tutorialStep === 5 || tutorialStep === 9) ? 'step5Tutotial' : '') + ' ' + (tutorialStep === 9 ? 'step9Tutotial' : '')}  >
								<Typography variant="h3" className="selectDatetitle">
									<Moment format="MMMM DD">{selectedDate}</Moment> <span onClick={this.selectAll}>Select all</span>
								</Typography>

								<ul className="time_block time_block_manage">
									{timeItems}
									{tutorialStep === 5 && <div className='instaBookTootipninth instaBookTootipFifthNew'>
										Tap on the hours you would like to make available for instant booking.
									</div>}
									{tutorialStep === 9 && <div className='instaBookTootipninth'>
										Same as before. Tap on the hours you would like to block and feel free to repeat the schedule.
									</div>}

								</ul>

							</div>
							<div>
								<div className={classes.weekView}>
									<div className={((tutorialStep === 6) ? 'step6Tutotial' : '') + ' ' + classes.instantstep6Tutotial}>
										<h3>Repeat this availability</h3>
										<Switch
											checked={this.state.repeat}
											onChange={this.handleChange('repeat')}
											value="repeat"
											color="primary"
											className={classes.switchBox}
										/>
										<div className={repeat === false ? classes.addOpacity : ''}>
											<ul>
												{daysItems}
											</ul>
											<div className={classes.formInputBox}>
												<Typography variant="subtitle2" component="label">End Date</Typography>
												{!this.state.isMobile && (
													<DatePicker
														fixedHeight
														customInput={<CustomInput repeat={repeat} value={this.state.endDate} />}
														selected={this.state.endDate}
														minDate={new Date(this.state.selectedDate)}
														dateFormat="MM/dd/yyyy"
														popperPlacement="top-start"
														onChange={this.handleDateChange} />
												)
												}
												{
													this.state.isMobile && (
														<div>
															<button className={classes.dateButton} onClick={this.toggleCalendar}>
																<Moment format="MM / DD / YY">{this.state.endDate}</Moment>
															</button>
														</div>
													)
												}
												{(this.state.isMobile && this.state.isOpen) && (
													<DatePicker
														selected={this.state.endDate}
														onChange={this.handleChangeDate}
														onSelect={this.handleChangeDate}
														minDate={new Date(this.state.selectedDate)}
														withPortal
														onClickOutside={this.toggleCalendar}
														inline
														fixedHeight
													/>
												)}
											</div>
											{popupError === "" ? "" : <Typography variant="caption" component="p">{popupError}</Typography>}
										</div>
										<div className='instaBookTootipSix'>
											Tap here if you would like to repeat this schedule on other days. Then select the days of the week on which to repeat and an end date.
										</div>
									</div>
									<div className={(tutorialStep === 7 ? 'step7Tutotial' : '') + ' ' + classes.manageButtons + ' ' + (buttonDisable ? (classes.defaultReservationBtn) : '')}>
										{popupType === 'insta' ? (
											<Typography variant="button" onClick={this.addInstaBooking}>
												Mark as instant booking
										</Typography>
										) : (
												<Typography variant="button" onClick={this.makeUnavailabel} className={classes.markAsUnavial}>
													Mark as UNAVAILABLE
									</Typography>
											)

										}

										<Typography variant="button" onClick={this.closePopup} className="cancelBtn">
											Cancel
										</Typography>
										<div className='instaBookTootipSeven'>
											Once you're all set, tap here to save your changes.
										</div>
									</div>
								</div>
							</div>
							<div className={(tutorialStep === 10 ? 'step10Tutotial' : '') + ' ' + classes.manageButtons + ' ' + (buttonDisable ? (classes.defaultReservationBtn) : '')}>
								<div className='instaBookTootipSeven'>
									Once youre all set top here to save your changes.
								</div>
							</div>
						</DialogContentText>
					</DialogContent>

				</Dialog>
				{
					tutorial !== undefined && tutorial !== null && tutorial === 'start' &&
					<div className={classes.availabilityTooltip + ' ' + (tutorialStep === 5 || tutorialStep === 6 || tutorialStep === 7 || tutorialStep === 9 ? 'availabilityTooltipHidden' : '')}>

						{tutorialStep === 1 && <div className={classes.availabilityTooltipOne}>
							<div className={classes.containerTut}>
								<div className={classes.tutorialContainer}>
									<div className={classes.contentTutBox}>
										<p>There are three types of availability on {IS_SHVIMPLY ? 'Shvimply' : 'Swimply'}:</p>
									</div>
									<ul>
										<li>
											<h6><img alt="" src="/img/verified.png" /> Available</h6>
											<p className={classes.paddingLeftIndent}>Guests can request a specific time slot which you will be able to accept or decline. Once you have accepted a booking request the swimmer can proceed to checkout.</p>
										</li>
										<li>
											<h6><img alt="" src="/img/time.png" /> Instant Booking Hours</h6>
											<p className={classes.paddingLeftIndent}>Swimmers can skip the approval process and instantly proceed to checkout for a seamless experience.</p>
										</li>
										<li>
											<h6><img alt="" src="/img/circle.png" /> Unavailable Hours</h6>
											<p className={classes.paddingLeftIndent}>Hours that swimmers can neither request nor book AKA Do Not Disturb. </p>
										</li>
									</ul>
								</div>
							</div>
							<div className={classes.tutorialFooter}>
								<div className={classes.containerTut}>
									<span onClick={(e) => this.forwaredTutorial(2, 'start')}>NEXT</span>
									<span onClick={(e) => this.forwaredTutorial('', '')}>SKIP</span>
								</div>
							</div>
						</div>
						}
						{tutorialStep === 2 &&
							<div>
								<div className={classes.availabilityTooltipTwo}>
									<div className={classes.containerTut}>
										<div className={classes.tutorialContainer}>
											<div className={classes.contentTutBox}>
												<p>By default, all hours are <strong>Available</strong> by request.</p>
											</div>
											<ul>
												<li>
													<p>Swimmers may request multiple pools. The faster you respond, the more likely the swimmers will confirm your booking.</p>
												</li>
											</ul>
										</div>
									</div>
									<div className={classes.tutorialFooter}>
										<div className={classes.containerTut}>
											<span onClick={(e) => this.forwaredTutorial(3, 'start')}>Next</span>
											<span onClick={(e) => this.forwaredTutorial('', '')}>Skip</span>
										</div>
									</div>
								</div>
								<div className={classes.availabilityTooltipTwo}></div>
							</div>
						}

						{tutorialStep !== '' && tutorialStep > 2 &&
							<div className={classes.tutorialFooter}>
								<div className={classes.containerTut + " " + classes.footerTabs}>
									{tutorialStep === 10 ? (
										<span className="finishTutorial" onClick={(e) => this.forwaredTutorial('', '')}>FINISH TUTORIAL</span>
									) : (
											<div>
												<span onClick={(e) => this.forwaredTutorial(tutorialStep + 1, 'start')}>Next</span>
												<span onClick={(e) => this.forwaredTutorial('', '')}>Skip</span>
											</div>
										)}
								</div>
							</div>
						}
					</div>
				}
			</Typography >
		)
	}
}
CalendarManagement.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};


const enhance = compose(
	withStyles(styles, { withTheme: true }),
	withRouter,
	withApollo
);

// Custome Input for desktop mobile
export class CustomInput extends React.Component {
	render() {
		return (
			<div>
				{this.props.repeat === false ? (
					<button className="date_button">
						<Moment format="MM / DD / YY">{this.props.value}</Moment>
					</button>
				) : (
						<button className="date_button" onClick={this.props.onClick}>
							<Moment format="MM / DD / YY">{this.props.value}</Moment>
						</button>
					)}
			</div>
		)
	}
}
CustomInput.propTypes = {
	onClick: PropTypes.func,
	value: PropTypes.any
};

function CalendarManagementContainer (props) {
  const userContext = useContext(UserContext)
  return <CalendarManagement {...userContext} {...props} />
}

export default enhance(CalendarManagementContainer);
