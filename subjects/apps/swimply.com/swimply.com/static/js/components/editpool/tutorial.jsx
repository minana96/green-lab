import React from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { withApollo } from "react-apollo";
import { withRouter } from 'react-router-dom';
import UserUtils from "../utilities/UserUtils";
import { IS_SHVIMPLY } from '../../config'
import { loader } from "graphql.macro";
const completeTutorial = loader("./../../graphql/host/completeTutorial.graphql");

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
			background: theme.palette.common.blue,
			minHeight: '100vh',
			zIndex: '9999',
			color: ' #fff',

		}
	},
	editPoolcontainer: {
		padding: '60px 0 90px',
		maxWidth: '380px',
		'@media(max-width:767px)': {
			padding: '30px 15px 20px'
		}
	},
	headTutorial: {
		display: 'flex',
		alignItems: 'center',
		'& figure': {
			margin: '0 15px 0 0'
		},
		'& h3': {
			fontSize: '20px'
		},
		'@media (max-width:767px)': {
			display: 'block',
			textAlign: 'center',
			'& figure': {
				filter: 'brightness(0) invert(1)',
				margin: '0 0 5px 0',
			},
			'& h3': {
				color: theme.palette.common.white,
				textAlign: 'center'
			},
		}
	},
	ContentTutorial: {
		paddingTop: '25px',
		'& h5': {
			lineHeight: '21px',
			fontSize: '16px',
			fontWeight: '400',
			'@media (max-width:767px)': {
				color: theme.palette.common.white,
				textAlign: 'center'
			}
		},
		'& p': {
			'@media (max-width:767px)': {
				color: theme.palette.common.white,
				textAlign: 'center'
			}
		}
	},
	footerTut: {
		background: theme.palette.common.blue,
		padding: '20px 35px',
		position: 'fixed',
		bottom: '0',
		width: '100%',
		right: '0',
		zIndex: '9999',
		'& span': {
			display: 'inline-block',
			padding: '10px 20px',
			textTransform: 'uppercase',
			fontWeight: '500',
			float: 'right',
			cursor: 'pointer',
			'@media (max-width:767px)': {
				width: '25%',
				textAlign: 'center'
			}
		}
	},
	skip: {
		color: theme.palette.common.white,
		marginRight: '55px',
		'&:hover': {
			opacity: '0.8'
		}
	},
	startTut: {
		background: theme.palette.common.white,
		color: theme.palette.common.blue,
		borderRadius: '5px',
		'&:hover': {
			opacity: '0.8'
		}
	}

});


class Tutorial extends React.Component {
	constructor(props) {


		super(props);
		this.state = {
			poolId: ''
		}
	}

	componentDidMount() {
		window.scrollTo(0, 0);
		let { history } = this.props;
		let poolId = parseInt(this.props.match.params.id);
		let accessToken = UserUtils.getAccessToken();
		if (accessToken !== undefined && accessToken !== null && accessToken !== '') {
			if (isNaN(poolId)) {
				history.push('/host');
			} else {
				this.setState({
					pool_id: poolId
				})
			}
		} else {
			UserUtils.setPreviousUrl(this.props.location.pathname);
			UserUtils.setPreviousSearchUrl(this.props.location.search);
			UserUtils.setIsPreviousUrl('yes');
			history.push('/');
		}

	}

	startTutorial = (status) => {
		let { history } = this.props;
		let { pool_id } = this.state;
		this.props.client.mutate({
			mutation: completeTutorial,
			variables: {
				data: {
					'tutorial_status': true
				}
			}
		})
			.then((res) => {

			}).catch((error) => {

			});

		if (status === 'start') {
			UserUtils.setStartTutorial('start');
		} else {
			UserUtils.removeStartTutorial();
		}
		history.push('/calendar-management/' + pool_id);
	}


	render() {
		const { classes } = this.props;

		return (
			<Typography variant="body1" component="div">
				<div className={classes.container}>
					<div className={classes.editPoolcontainer}>
						<div className={classes.headTutorial}>
							<figure><img alt="" src={window.location.origin + "/img/Date-Active.png"} /></figure>
							<div className={classes.figurCaption}>
								<Typography variant='h3'>Welcome to the<br></br> {IS_SHVIMPLY ? 'Shvimply' : 'Swimply'} calendar!</Typography>
							</div>
						</div>
						<div className={classes.ContentTutorial}>
							<Typography variant='h5'>Here's a quick tutorial so you can make the most out of your pool's availability.</Typography>

						</div>
					</div>
				</div>
				<div className={classes.footerTut}>
					<div className={classes.containerTwo}>
						<span className={classes.startTut} onClick={(e) => this.startTutorial('start')}>Start</span>
						<span className={classes.skip} onClick={(e) => this.startTutorial('skip')}>Skip</span>
					</div>
				</div>
			</Typography>
		)
	}
}
Tutorial.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};


const enhance = compose(
	withStyles(styles, { withTheme: true }),
	withRouter,
	withApollo
);
export default enhance(Tutorial);
