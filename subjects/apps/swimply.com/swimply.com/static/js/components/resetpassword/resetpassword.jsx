import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import UserUtils from '../utilities/UserUtils';

const styles = theme => ({
 
});


class ResetPassword extends React.Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    let { history } = this.props;   
    let path = window.location.pathname;
		let token = path.split('/').pop();
    UserUtils.setAccessTokenForgotPassword(token);
    UserUtils.setResetPassword('reset_password');
    history.push('/findpool');
  }

  /**
   * render
   */
  render() {
    return (
      <div>
    
      </div>
  
    );
  }
}


ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};

const enhance = compose(
  withStyles(styles),
  withRouter,
);

export default enhance(ResetPassword);
