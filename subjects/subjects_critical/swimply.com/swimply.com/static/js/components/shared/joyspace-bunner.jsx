import React from 'react';
import Typography from '@material-ui/core/Typography';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { IS_SHVIMPLY } from '../../config';

const styles = theme => ( {
  joyspace: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    background: 'url(../img/Joyspace-bg-desktop.jpg) no-repeat center',
    backgroundPosition: 'center center',
    minHeight: '700px',
    backgroundSize: 'cover',
    position: 'relative',
    color: '#fff',
    '@media (max-width:590px)': {
      background: 'url(../img/Joyspace-bg-mobile.jpg) no-repeat',
      backgroundSize: 'cover',
      minHeight: '630px',
    },
    '& h3': {
      marginBottom: '10px !important',
    },
    '& p': {
      width: '100%',
      color: '#fff',
      maxWidth: '310px',
      fontSize: '15px',
      fontWeight: '300',
      '@media (max-width:590px)': {
        maxWidth: '250px',
        margin: 'auto',
        fontSize: '16px',
      },
    },
  },
  container: {
    maxWidth: '1170px',
    margin: '0 auto',
    width: '100%',
    padding: '0 15px',
    '@media (max-width:1170px)': {
      maxWidth: '992px',
    },
    '@media (max-width:1000px)': {
      maxWidth: '750px',
    },
    '@media (max-width:980px)': {
      maxWidth: '750px',
    },
    '@media (max-width:767px)': {
      width: 'calc(100% - 30px)',
    },
  },
  textContent: {
    '@media (max-width:590px)': {
      textAlign: 'center',
    },
  },
  joyspaceTitle: {
    marginBottom: '40px',
    color: '#F9007B',
    fontWeight: '800 !important',
    fontSize: '38px',
  },
  headTitle: {
    margin: '0 0 10px 10px !important',
    color: '#c7c7c7',
    fontWeight: '400 !important',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontSize: '16px',
  },
  subTitle: {
    fontWeight: '600 !important',
  },
  learnMoreBtn: {
    padding: '6px 25px',
    marginTop: '30px',
    display: 'inline-block',
    background: '#F9007B',
    textTransform: 'uppercase',
    fontSize: '15px',
    letterSpacing: '1px',
    color: '#fff',
    cursor: 'pointer',
    textAlign: 'center',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '500',
    lineHeight: '1.75',
    borderRadius: '5px',
    '&:hover': {
      background: '#F9007B',
    },
  },
} );

function JoyspaceBanner( { classes } ) {
  const handleLearnMore = () => {
    window.open(
      'http://joyspaceapp.com',
    );
  };

  return IS_SHVIMPLY ? null
    : (
      <div id="joyspace" className={classes.joyspace}>
        <div className={classes.container}>
          <div className={classes.textContent}>
            <Typography variant="h4" className={classes.headTitle}>coming soon...</Typography>
            <Typography variant="h1" className={classes.joyspaceTitle}>Joyspace</Typography>
            <Typography variant="h3" className={classes.subTitle} color="inherit">Beyond pools</Typography>
            <Typography component="p" color="inherit">
              JoySpace is a platform for renting or sharing all kind of unique private spaces from Tennis and
              Basketball courts to Home gyms and decked out backyard.
            </Typography>
            <Typography variant="button" className={classes.learnMoreBtn} onClick={handleLearnMore}>
              Learn more
            </Typography>
          </div>
        </div>
      </div>
    )
}

const enhance = compose(
  withStyles( styles ),
);

JoyspaceBanner.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default enhance( JoyspaceBanner );
