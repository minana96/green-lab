import UserUtils from '../components/utilities/UserUtils';

export default class AuthService {
  static handleLogin( data, props ) {
    const role = data.role[0].name;
    UserUtils.removeReferralId();
    UserUtils.removeReferralToken();
    UserUtils.setEmail( data.email );
    UserUtils.setAccessToken( data.access_token );
    UserUtils.setRefreshToken(data.refresh_token);
    UserUtils.setUserRole( role );
    UserUtils.setLastPoolId( data.last_pool_id );
    UserUtils.setUserCountry( data.country_code );
    UserUtils.setSwimmerCountry( data.country_code_swimmer );

    const currentPage = props.match.path;
    if ( currentPage === '/payment/:id' && typeof window.setAccessToken === 'function' ) {
      window.setAccessToken();
    } else {
      const url = UserUtils.getPreviousUrl();
      const isUrl = UserUtils.getIsPreviousUrl();
      const searchUrl = UserUtils.getPreviousSearchUrl();
      if ( isUrl === 'yes' && url ) {
        UserUtils.removePreviousUrl();
        UserUtils.removeIsPreviousUrl();
        UserUtils.removePreviousSearchUrl();
        if ( url === 'home_top' ) {
          window.scrollTo( 0, 0 );
        } else {
          const redirect = {};
          redirect.pathname = url;
          if ( searchUrl ) {
            redirect.search = searchUrl;
          }
          props.history.push( redirect );
        }
      }
    }
  }

  static handleSignUp( data, props ) {
    const role = data.role[0].name;
    UserUtils.removeReferralId();
    UserUtils.removeReferralToken();
    UserUtils.setEmail( data.email );
    UserUtils.setAccessToken( data.access_token );
    UserUtils.setRefreshToken(data.refresh_token);
    UserUtils.setUserRole( role );
    UserUtils.setUserCountry( data.country_code );
    UserUtils.setSwimmerCountry( data.country_code_swimmer );
    if ( role.toLowerCase() === 'swimmer' ) {
      const currentPage = props.match.path;
      if ( currentPage === '/payment/:id' && typeof window.setAccessToken === 'function' ) {
        window.setAccessToken();
      }
    }
  }
}
