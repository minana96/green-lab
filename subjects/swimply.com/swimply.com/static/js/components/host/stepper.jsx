import React from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withApollo } from "react-apollo";
import Progress from 'react-progressbar';


const styles = theme => ({
	stepperNew: {
		padding: '0',
		maxWidth: '375px',
		background: '#f3f5f5',
		'& div': {
			height: '5px !important'
		},
		'@media(max-width:767px)':{
			position: 'fixed',
			bottom: '0',
			left: '0',
			right: '0',
			zIndex:'99',
			maxWidth: 'initial'
		}
	}
});

class Stepper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	render() {
		const { classes, activeStep } = this.props;
		return (
			<Progress completed={activeStep} className={classes.stepperNew} color="#22bfea" />
		)
	}
}
Stepper.propTypes = {
	classes: PropTypes.object.isRequired,
};


const enhance = compose(
	withStyles(styles),
	withApollo
);

export default enhance(Stepper);
