import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import UserUtils from '../utilities/UserUtils';


const styles = theme => ({
 
});


class ReferaFriend extends React.Component {
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
    let id = this.props.match.params.id;
    if(id !== '') {
      UserUtils.logout();
      UserUtils.setReferralId(id);
      UserUtils.setReferralIdStatus('referred');
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


ReferaFriend.propTypes = {
  classes: PropTypes.object.isRequired,
};

const enhance = compose(
  withStyles(styles),
  withRouter,
);

export default enhance(ReferaFriend);
