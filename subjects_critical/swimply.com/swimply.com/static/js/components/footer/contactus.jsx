import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose';

// contexts
import UserContext from '../../contexts/UserContext'

// services
import HelperService from '../../services/helper'

const styles = theme => ({

});

class ContactUS extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		
		}
	
	}

	

	render() {
		const host = HelperService.isHost(this.props.user)
		return(
			<Typography variant="body1" component={'span'}>
				<p><a href={`mailto:​${host ? 'HostCare@swimply.com' : 'info@swimply.com'}?subject=Help me find a pool!`}>contactus</a></p>
			</Typography>
		)
	}

}



ContactUS.propTypes = {
	classes: PropTypes.object.isRequired,
};

const enhance = compose(
  withStyles(styles),
  withRouter
);

function ContactUsContainer (props) {
	const userContext = useContext(UserContext)
	return <ContactUS {...userContext} {...props} />
}

export default enhance(ContactUsContainer);
