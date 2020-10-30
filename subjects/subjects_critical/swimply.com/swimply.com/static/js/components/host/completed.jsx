import React from "react";
import compose from "recompose/compose";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { withApollo } from "react-apollo";
import Button from "@material-ui/core/Button";
import { withRouter, Link } from "react-router-dom";
// import UserUtils from "./../utilities/UserUtils";
import Pageloader from "../commons/pageloader";

const styles = theme => ({
  ContentContainer: {
    paddingTop: "15px",
    "& p": {
      fontWeight: "100",
      fontSize: "13px"
    }
  },
  managePaymentBtn: {
    background: "transparent",
    border: "2px solid #22bfea",
    padding: "6px 15px",
    fontSize: "13px",
    fontWeight: "500",
    textTransform: "inherit",
    "& span": {
      color: theme.palette.common.black
    },
    "&:hover": {
      background: theme.palette.common.blue,
      "& span": {
        color: theme.palette.common.white
      }
    }
  }
});

class Completed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // let poolID = UserUtils.getHostPoolID();
    const { classes } = this.props;
    const { loading } = this.state;
    return (
      <Typography variant="body1" component="div">
        {loading === true ? <Pageloader loading={loading} /> : ""}
        <div className={classes.ContentContainer}>
          <Typography variant="h3">
            Congratulations! Your pool has been submitted for review.
          </Typography>
          <p>
            Our team reviews every pool application before approving it to go live. 
            This can take up to 24 hours (but usually a lot less). 
            We may reach back out with a few tips and recommendations for your listing as well so look out for an email from us!{" "}
          </p>
        </div>

        <Link to='/host'>
          <Button className={classes.managePaymentBtn}>
            MY POOLS
          </Button>
        </Link>

        {/*{tutorial_status === true?(*/}
        {/*  <Link to={"/calendar-management/" + poolID}>*/}
        {/*  {" "}*/}
        {/*  <Button className={classes.managePaymentBtn}>*/}
        {/*    {" "}*/}
        {/*    MANAGE POOL CALENDAR*/}
        {/*  </Button>*/}
        {/*  </Link>*/}

        {/*):(*/}
        {/*  <Link to={"/tutorial/" + poolID}>*/}
        {/*  {" "}*/}
        {/*  <Button className={classes.managePaymentBtn}>*/}
        {/*    {" "}*/}
        {/*    MANAGE POOL CALENDAR*/}
        {/*  </Button>*/}
        {/*  </Link>*/}
        {/*)}*/}

      </Typography>
    );
  }
}
Completed.propTypes = {
  classes: PropTypes.object.isRequired
};

const enhance = compose(
  withStyles(styles),
  withApollo,
  withRouter
);

export default enhance(Completed);
