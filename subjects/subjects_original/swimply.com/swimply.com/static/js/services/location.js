/* global navigator */
import axios from 'axios';

export default class LocationService {
  static checkOnAuByLatLon( lat, lon ) {
    return ( lat < -9.1 && lat > -44.5 ) && ( lon > 112.1 && lon < 155.1 );
  }

  static async getUserLocation() {
    return new Promise( async ( resolve ) => {
      resolve( await this.getUserLocationByIp() );
      if ( 'geolocation' in navigator ) {
        navigator.geolocation.getCurrentPosition( () => {
          // resolve( this.checkOnAuByLatLon( coords.latitude, coords.longitude ) ? 'au' : 'us' );
        }, () => { // onError
          // resolve( await this.getUserLocationByIp() );
        } );
      }
    } );
  }

  static async getUserLocationByIp() {
    return new Promise( ( resolve ) => {
      axios
        .get( 'https://api.2ip.ua/geo.json?ip=' )
        .then( ( { data } ) => {
          resolve( data && data.country_code === 'AU' ? 'au' : 'us' );
        } )
        .catch( () => {
          axios
            .get( 'https://ipapi.co/json/' )
            .then( ( { data } ) => {
              resolve( data && data.country_code === 'AU' ? 'au' : 'us' );
            } )
            .catch( () => {
              axios
                .get( 'https://api.hostip.info' )
                .then( ( { data } ) => {
                  const countryCode = data && data.match( /<countryAbbrev>(.*)<\/countryAbbrev>/ )[1];
                  resolve( countryCode === 'AU' ? 'au' : 'us' );
                } )
                .catch( () => {
                  resolve( 'us' );
                } );
            } );
        } );
    } );
  }
}
