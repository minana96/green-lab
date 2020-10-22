import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
	notFound: {
		display: 'flex',
    minHeight: 'calc(100vh - 100px)',
    alignItems: 'center',
    justifyContent: 'center',
		fontSize: '25px',
		'& strong':{
			paddingRight: '16px',
			fontSize: '35px',
			color: theme.palette.common.blue,
	}
		}

	
});

class NotFound extends React.Component {
	
	render() {
		const { classes } = this.props;
		return (
			<Typography variant="body1" component="span">
				<div className={classes.notFound}><strong>404</strong> Page Not found</div>
			</Typography>
		)
	}
}
NotFound.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotFound);
