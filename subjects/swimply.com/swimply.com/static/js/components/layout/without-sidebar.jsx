import React from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import AppBar from '../shared/headermain';
import Footer from '../footer/footer';


const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  content: {
    flexGrow: 1,
    minHeight: '90vh',
    overflow:"hidden",
  },
 
};

const LayoutWithSidebar = ( { classes, component: Component } ) => (
  <MuiThemeProvider theme={theme}>
    <AppBar />
    <div className={classes.root}>
      <main className={classes.content}>
        <Component />
      </main>
    </div>
    <Footer />
  </MuiThemeProvider>
);

LayoutWithSidebar.defaultProps = {
  loggedInUser: null,
};

LayoutWithSidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired,
};

const enhance = compose(
  withStyles( styles ),
);

export default enhance( LayoutWithSidebar );
