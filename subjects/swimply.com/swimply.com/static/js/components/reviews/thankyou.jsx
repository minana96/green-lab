import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import UserUtils from "../utilities/UserUtils";

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
    "@media (max-width:767px)": {
      width: "calc(100% - 30px)"
    },
    "& > a": {
      display: "block",
      color: theme.palette.common.blue,
      marginBottom: "7px",
      textDecoration: "none"
    }
  },
  profileMain: {
    paddingTop: "40px",
    "& h2": {
      marginBottom: "15px",
      "@media (max-width:767px)": {
        textAlign: "center",
        display: "none"
      }
    }
  },
  bigAvatar: {
    margin: 0,
    width: 120,
    height: 120,
    "@media (max-width:767px)": {
      margin: "0 auto",
      width: '150px',
      height: '150px',
    }
  },
  profileMainLeft: {
    display: "flex",
    alignItems: "center",
    "@media (max-width:767px)": {
      display: "block"
    }
  },
  profileMainLeftBox: {
    paddingLeft: "25px",
    width: "100%",
    maxWidth: "100%",
    paddingTop: "35px",
    "& span": {
      color: theme.palette.common.black
    },
    "& p": {
      marginTop: "5px",
      marginBottom: "0",
      color: theme.palette.common.blue,
      cursor: "pointer",
      fontSize: "13px",
      textTransform: "uppercase"
    },
    "@media (max-width:767px)": {
      paddingTop: "28vh",
      textAlign: "center",
      paddingLeft: "0"
    }
  },
  mobileHeading: {
    display: "none",
    "@media (max-width:767px)": {
      display: "block",
      textAlign: "center",
      paddingTop: " 15px",
      fontSize: "25px"
    }
  }
});

class Thankyou extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      left: false,
      openDrop: false
    };
    this.redirectToFindPool = this.redirectToFindPool.bind(this);
    this.redirectToReservations = this.redirectToReservations.bind(this);
  }
  redirectToFindPool() {
    let { history } = this.props;
    history.push("/findpool");
  }
  redirectToReservations() {
    let { history } = this.props;
    history.push("/host-reservation");
  }
  render() {
    let { classes } = this.props;
    let userRole = UserUtils.getReviewType();
    return (
      <Typography variant="body1" component="span">
        <div className={classes.container}>
          <div className={classes.profileMain}>
            <Typography variant="h2">Thank You! </Typography>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={12} md={8}>
                <div className={classes.profileMainLeft}>
                  <Avatar
                    alt=""
                    src={window.location.origin + "/img/review_thanku.png"}
                    className={classes.bigAvatar}
                  />
                  <Typography variant="h3" className={classes.mobileHeading}>
                    Thank You!
                  </Typography>
                  <div className={classes.profileMainLeftBox}>
                    <Typography variant="p">Thanks for your Review!</Typography>
                    {userRole === "Host" ? (
                      <p onClick={this.redirectToReservations}>
                        MANAGE YOUR RESERVATIONS
                      </p>
                    ) : (
                      <p onClick={this.redirectToFindPool}>
                        BOOK YOUR NEXT SWIM
                      </p>
                    )}
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </Typography>
    );
  }
}
Thankyou.propTypes = {
  classes: PropTypes.object.isRequired
};

const enhance = compose(
  withStyles(styles),
  withRouter
);

export default enhance(Thankyou);
