/* global FB */
import { FB_APP_ID } from '../config'; // eslint-disable-line

export default class FacebookService {
  static initialization() {
    window.fbAsyncInit = () => {
      FB.init( {
        appId: FB_APP_ID,
        xfbml: true,
        cookie: true,
        version: 'v5.0',
      } );
      FB.AppEvents.logPageView();
    };
    ( function ( d, s, id ) {
      const element = d.getElementsByTagName( s )[0];
      const fjs = element;
      let js = element;
      if ( d.getElementById( id ) ) { return; }
      js = d.createElement( s );
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore( js, fjs );
    }( document, 'script', 'facebook-jssdk' ) );
  }
}
