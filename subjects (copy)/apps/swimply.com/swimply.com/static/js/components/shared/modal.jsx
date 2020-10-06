import React from 'react';
import { Modal, Typography } from '@material-ui/core/index';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ( {
  bannerWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerContent: {
    width: '90%',
    position: 'relative',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    borderRadius: '4px',
  },
  close: {
    position: 'absolute',
    top: '0',
    right: '0',
    padding: '15px',
    zIndex: 3,
  },
  closeIcon: {
    cursor: 'pointer',
    color: '#fff',
  },
} );

function CustomModal( { children, classes, open, onClose } ) {
  return (
    <Modal open={open}>
      <div className={classes.bannerWrapper}>
        <div className={classes.bannerContent}>
          <span className={classes.close} onClick={onClose}>
            <Typography variant="h5" className={classes.closeIcon}>x</Typography>
          </span>
          {children}
        </div>
      </div>
    </Modal>
  )
}

const enhance = compose(
  withStyles( styles ),
);

CustomModal.propTypes = {
  children: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
};

export default enhance( CustomModal );
