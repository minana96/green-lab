import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import styles from '../home/style';

function DownloadBanner( { classes } ) {
  const redirectToPlayStore = () => {
    window.open(
      'https://play.google.com/store/apps/details?id=com.swimply.android',
    );
  };
  const redirectToAppStore = () => {
    window.open(
      'https://apps.apple.com/us/app/swimply-book-beautiful-pools/id1472785554',
    );
  };

  return <div className={classes.appDownload}>
    <div className={classes.container}>
      <div className={classes.appDownloadFlex}>
        <div className={classes.appDownloadContent}>
          <Typography variant="h2">Download. Wind down.</Typography>
          <Typography component="p">
            Use the Swimply app to find pools faster, communicate easier,
            and get the best deals in your area
          </Typography>
          <div className={classes.playStoreBlock}>
            <img
              alt=""
              src={window.location.origin + "/img/appstore.png"}
              onClick={redirectToAppStore}
            />
            <img
              alt=""
              src={window.location.origin + "/img/playstore.png"}
              onClick={redirectToPlayStore}
            />
          </div>
        </div>
        <div className={classes.imageBlock}>
          <img
            alt=""
            src={window.location.origin + "/img/phones-img.png"}
          />
        </div>
      </div>
    </div>
  </div>
}

const enhance = compose(
  withStyles( styles ),
);

DownloadBanner.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default enhance( DownloadBanner );