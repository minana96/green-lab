import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import { withApollo } from "react-apollo";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { LOGO_IMAGE } from '../../config';

const styles = theme => ({
	lpRoot: {
		background: theme.palette.common.transparent,
		boxShadow: "none",
		color: theme.palette.common.white,
		fontWeight: "normal",
		zIndex: 9,
		width: '100%',
		position: 'absolute'
	},
	lpHeaderMain: {
		background: theme.palette.common.transparent,
		boxShadow: "none",
		"& a": {
			color: theme.palette.common.white,
			textDecoration: "none",
		}
	},
	lpHeader: {
		width: "95%",
		maxWidth: "100%",

		margin: "0 auto",
		'@media (max-width:767px)': {
			width: '100%',
			boxSizing: 'border-box',
			'& h6': {
				display: 'table',
				width: 'calc(100% - 40px)',
				textAlign: 'center',
				left: 0,
				right: 0,
				margin: 'auto',
				marginTop: '50px',
			}
		}
	},

	logoImage: {
		'& img': {
			maxWidth: '140px',
			cursor: 'pointer'
		}
	}
});

class LandingHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
		this.redirectToMain = this.redirectToMain.bind(this);
	}

	redirectToMain() {
		let { history } = this.props;
		history.push('/');
	}

	render() {
		const { classes } = this.props;
		return (
			<Typography variant="body1" component="span">
				<div className={classes.lpRoot} >
					<AppBar position="static" className={classes.lpHeaderMain} >
						<Toolbar className={classes.lpHeader}>
							<Typography variant="h6" color="inherit" className={classes.logoImage}>
								<div onClick={this.redirectToMain}> <img src={LOGO_IMAGE} alt="" /> </div>
							</Typography>
						</Toolbar>
					</AppBar>
				</div>
			</Typography>
		)
	}
}

LandingHeader.propTypes = {
	classes: PropTypes.object.isRequired,
};

const enhance = compose(
	withStyles(styles),
	withRouter,
	withApollo
);

export default enhance(LandingHeader);
