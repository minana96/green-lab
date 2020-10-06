import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
// import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { ClipLoader } from 'react-spinners';


const styles = theme => ({
  loderdiv: {
		'& div': {
			margin: '0 auto'
		},
		width: '100%',
		height: '100%',
		position: 'fixed',
		background: 'rgba(0,0,0,0.8)',
		zIndex: '9999',
		top: '0',
		left:'0',
		display: 'flex',
		alignItems: 'center',
	}
});


class Pageloader extends React.Component {
  /**
  * @param {*} props
  */
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    let { classes, loading } = this.props;
    return (
      <div className={classes.loderdiv}>
					<ClipLoader
						sizeUnit={"px"}
						size={50}
						color={'#00ADE2'}
						loading={loading}
					/>
				</div>
    )
  }
}

Pageloader.propTypes = {
  classes: PropTypes.object.isRequired,
};

const enhance = compose(
  withStyles(styles),
  // withRouter,
);

export default enhance(Pageloader);

