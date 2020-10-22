import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ( {
  badgeContainer: {
    position: 'absolute',
    top: '-10px',
    right: '0',
    background: '#fcd681',
    '& span': {
      padding: '2px 5px',
      fontSize: '9px !important',
      '@media (max-width:767px)': {
        fontSize: '13px !important',
      },
    },
  },
} );

const Badge = ( { style, badgeText, classes } ) => (
  // eslint-disable-next-line react/jsx-filename-extension
  <div style={style} className={classes.badgeContainer}>
    <Typography variant="inline">
      {badgeText}
    </Typography>
  </div>
);

Badge.propTypes = {
  classes: PropTypes.object.isRequired,
  style: PropTypes.object,
  badgeText: PropTypes.string.isRequired,
};

Badge.defaultProps = {
  style: {},
};

const enhance = compose(
  withStyles( styles ),
);

export default enhance( Badge );
