import React from "react";
import compose from "recompose/compose";
import PropTypes from "prop-types";
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import AppBar from "../shared/landingheader";

const styles = {
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width:767px)": {
      display: "inherit"
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.common.white,
    minHeight: "90vh"
  }
};

const LandingHeader = ({ classes, component: Component, loggedInUser }) => (
  <MuiThemeProvider theme={theme}>
    <AppBar loggedInUser={loggedInUser} />
    <div className={classes.root}>
      <main className={classes.content}>
        <Component />
      </main>
    </div>
  </MuiThemeProvider>
);

LandingHeader.defaultProps = {
  loggedInUser: null
};

LandingHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired,
  loggedInUser: PropTypes.object
};

const enhance = compose(withStyles(styles));

export default enhance(LandingHeader);
