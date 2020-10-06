import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import UserUtils from '../utilities/UserUtils';

const styles = theme => ({
 
});


class verifyEmail extends React.Component {
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
    let id = this.props.match.params.token;
    if(id !== '') {
      UserUtils.logout();
      UserUtils.setVerifyEmailId(id);
      history.push('/');  
    }
    
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


verifyEmail.propTypes = {
  classes: PropTypes.object.isRequired,
};

const enhance = compose(
  withStyles(styles),
  withRouter,
);

export default enhance(verifyEmail);
