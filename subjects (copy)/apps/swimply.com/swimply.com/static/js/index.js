import React from 'react';
import ReactDOM from 'react-dom';
import TagManager from 'react-gtm-module';
import App from './app';
import './components/layout/style/style.css';

const tagManagerArgs = {
  gtmId: 'GTM-5HNCNXB',
  dataLayerName: 'PageDataLayer',
};
TagManager.initialize( tagManagerArgs );

ReactDOM.render( <App />, document.getElementById( 'root' ) );
