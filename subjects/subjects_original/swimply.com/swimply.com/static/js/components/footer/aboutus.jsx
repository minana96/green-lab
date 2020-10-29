import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import compose from "recompose/compose";
import Footer from "./footer";
import { IS_SHVIMPLY } from '../../config'

const styles = theme => ({
  container: {
    maxWidth: "1170px",
    margin: "0 auto",
    width: "100%",
    padding: "0 15px",
    "@media (max-width:1170px)": {
      maxWidth: "992px"
    },
    "@media (max-width:1000px)": {
      maxWidth: "750px"
    },
    "@media (max-width:980px)": {
      maxWidth: "700px"
    },
    "@media (max-width:767px)": {
      width: "calc(100% - 30px)"
    }
  },
  hostCommunity: {
    padding: "60px 0 60px",
    "@media (max-width:767px)": {
      padding: "20px 0 0"
    },
    "& img": {
      width: "100%",
      "@media (max-width:767px)": {
        margin: "0 -15px -7px",
        width: "calc(100% + 30px)"
      }
    },
    "& h2": {
      lineHeight: "35px",
      fontSize: "30px",
      marginBottom: "10px",
      '@media (max-width:767px)': {
        maxWidth: '240px',
        marginBottom: '15px'
      }
    },
    "& h4": {
      color: theme.palette.common.darkgray,
      fontWeight: "300",
      fontSize: "18px",
      marginBottom: "10px",
      '@media (max-width:767px)': {
        paddingRight: '45px',
        lineHeight: '27px'
      }
    },
    "& h5": {
      fontWeight: "bold",
      marginBottom: "6px",
      marginTop: "10px"
    },
    "& p": {
      color: theme.palette.common.black,
      paddingRight: "55px",
      "@media (max-width:767px)": {
        paddingRight: "0"
      }
    },
    "& span": {
      display: "inline-block",
      padding: "7px 35px",
      marginTop: "8px",
      fontWeight: "500"
    }
  },
  aboutBg: {
    background: "#f3f5f5",
    "& img": {
      maxWidth: "300px",
      "@media (max-width:767px)": {
        maxWidth: "260px",
        margin: "0 auto 25px",
        display: "block"
      }
    }
  },
  ourMisson: {
    "@media (max-width:767px)": {
      padding: "50px 0 30px",
      "& h4": {
        padding: "0"
      }
    },
    "& h4": {
      fontSize: "15px",
      color: theme.palette.common.black,
      '@media (max-width:767px)': {
        fontSize: "18px",
        paddingRight: '45px'
      }
    }
  }
});

class TermsAndConditions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.redirectToFondPool = this.redirectToFondPool.bind(this);
  }

  redirectToFondPool() {
    let { history } = this.props;
    history.push("findpool");
  }

  render() {
    const { classes } = this.props;
    return (
      <Typography variant="body1" component={"span"}>
        <div className={classes.hostCommunity}>
          <div className={classes.container}>
            <Grid container className={classes.root} spacing={24}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h2">
                  Welcome! <br />A bit about {IS_SHVIMPLY ? 'Shvimply' : 'Swimply'}
                </Typography>
                <Typography variant="h4">
                  The first online marketplace for pool sharing.
                </Typography>
                <p>
                  {IS_SHVIMPLY ? 'Shvimply' : 'Swimply'} is an online platform for pool sharing that connects owners of private pools with people looking to get their hands on one. {IS_SHVIMPLY ? 'Shvimply' : 'Swimply'} allows non-pool owners affordable access to an otherwise inaccessible luxury, while allowing pool owners to earn an effortless, substantial income from their underutilized pools.
                </p>
                <Typography
                  variant="button"
                  className={classes.button}
                  onClick={this.redirectToFondPool}
                >
                  Find A Pool
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <div>
                  <img src={window.location.origin + "/img/About-Photo.png"} alt="" />
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
        <div className={classes.hostCommunity + " " + classes.aboutBg}>
          <div className={classes.container}>
            <Grid container className={classes.root} spacing={24}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h2">Why do hosts use {IS_SHVIMPLY ? 'Shvimply' : 'Swimply'}?</Typography>

                <p>
                  The extra income earned from renting a pool on {IS_SHVIMPLY ? 'Shvimply' : 'Swimply'} can be used to help cover costs and even turn a profit while helping out the community at the same time. It's a win-win for everyone. Pool owners simply list their pools, customize their accounts and decide when exactly they are available for rent.
                </p>
                <p>
                  Non-pool owners can read all about the pools, see user reviews, and book directly on {IS_SHVIMPLY ? 'Shvimply' : 'Swimply'}. If anyone needs assistance, our support team ensures that the entire process of listing, reserving and payment is as smooth as possible for all involved.
                </p>
              </Grid>

              <Grid item xs={12} sm={6}>
                <div>
                  <img src={window.location.origin + "/img/About-Photo2.png"} alt="" />
                </div>
              </Grid>
            </Grid>
          </div>
        </div>

        <div className={classes.hostCommunity + " " + classes.ourMisson}>
          <div className={classes.container}>
            <Grid container className={classes.root} spacing={24}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h2">Our Mission</Typography>
                <Typography variant="h4">
                  To make awesome places the new "cafe."
                </Typography>

                <p>
                  Whether you're stuck at home with the kids, tired from a long day of work (or homework), or just bored, we want you to be able to teleport somewhere awesome with a few clicks of a button.
                </p>
                <p>
                  We want mini-escapes to be as ordinary as visiting a cafe or a
                  good nap. Wherever you are, whatever you're doing, it should only take a moment from the time you want to be somewhere happier until the time you actually are.
                </p>
                <Typography variant="h5">{IS_SHVIMPLY ? 'Shvimply' : 'Swimply'}.</Typography>
                <Typography variant="h4" className={classes.ourMisson}>
                  Be Somewhere Happier.
                </Typography>
              </Grid>
            </Grid>
          </div>
        </div>
        <Footer />
      </Typography>
    );
  }
}

TermsAndConditions.propTypes = {
  classes: PropTypes.object.isRequired
};

const enhance = compose(
  withStyles(styles),
  withRouter
);

export default enhance(TermsAndConditions);
