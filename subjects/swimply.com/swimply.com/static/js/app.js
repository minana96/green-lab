import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { SnackbarProvider } from 'notistack';
import { loader } from 'graphql.macro';
import io from 'socket.io-client';
import Echo from 'laravel-echo';
import update from 'immutability-helper';
import Modal from './components/shared/modal';
import client from './apollo/apollo-client';
import Router from './components/router';

import 'smartbanner.js';
import 'smartbanner.js/dist/smartbanner.min.css';

// services
import FacebookService from './services/facebook';
import AppleService from './services/apple';
import StripeService from './services/stripe';

// contexts
import UserContext from './contexts/UserContext';
import RegionContext from './contexts/RegionContext';
import AppContext from './contexts/AppContext';
import ChatContext from './contexts/ChatContext';

// utils
import * as commonFunctions from './components/utilities/commonFunctions';

// config
import { IS_US, HEADER_IMG, SOCKET_URL } from './config';
import UserUtils from './components/utilities/UserUtils';

import './themes/styles.css';
import DownloadBanner from './components/shared/download-banner';

const getProfileDetails = loader( './graphql/user/me.graphql' );
const refreshToken = loader( './graphql/auth/refresh-token.graphql' );

class App extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      user: null,
      region: IS_US ? 'us' : 'au',
      showJoyspaceBanner: false,
      echo: this.echo,
      newMessage: null,
      loading: true,
      chatDetails: null,
    };

    this.getUserContextValue = this.getUserContextValue.bind( this );
    this.setUser = this.setUser.bind( this );
    this.handleUser = this.handleUser.bind( this );
    this.getRegionContextValue = this.getRegionContextValue.bind( this );
    this.toggleJoyspaceModal = this.toggleJoyspaceModal.bind( this );
    this.updateUserFavorites = this.updateUserFavorites.bind( this );
    this.getChatContextValue = this.getChatContextValue.bind( this );
    this.handleChat = this.handleChat.bind( this );
  }

  // preloading header image
  // eslint-disable-next-line
  UNSAFE_componentWillMount() {
    new Image().src = HEADER_IMG;
  }

  componentDidMount() {
    AppleService.initialization();
    FacebookService.initialization();
    StripeService.init( { client } );
    this.handleUser();
  }

  setEcho( user ) {
    const token = UserUtils.getAccessToken();
    if ( token ) {
      const authHeader = `Bearer ${token}`;

      if ( ( this.echo
        && this.echo.connector
        && this.echo.connector.options
        && this.echo.connector.options.auth
        && this.echo.connector.options.auth.headers
        && this.echo.connector.options.auth.headers.authorization !== authHeader )
        || !this.echo
      ) {
        this.echo = new Echo( {
          host: SOCKET_URL,
          broadcaster: 'socket.io',
          client: io,
          rejectUnauthorized: false,
          auth: {
            headers: {
              authorization: authHeader,
            },
          },
        } );
        this.echo.connector.socket.on( 'connect', () => {
          this.setState( {
            loading: false,
            echo: this.echo,
          }, () => {
            this.setChatListener( user );
          } );
          console.log( 'Socket connected' );
        } );
        this.echo.connector.socket.on( 'disconnect', ( e ) => {
          console.log( 'disconnect', e );
        } );
        this.echo.connector.socket.on( 'connect_error', ( e ) => {
          console.log( 'connect_error', e );
        } );
        this.echo.connector.socket.on( 'connect_timeout', ( e ) => {
          console.log( 'connect_timeout', e );
        } );
      } else {
        this.setState( {
          loading: false,
        } );
      }
    } else {
      this.setState( {
        loading: false,
      } );
    }
  }

  setChatListener( user ) {
    const context = { ...this.getUserContextValue(), ...this.getContextValue() };
    UserUtils.init( context );
    this.channel = `chat.${user.id}`;
    const isListening = this.echo.private( this.channel ).events['message.created'];
    if ( !isListening ) {
      console.log( 'Creating new listener to chat ', this.channel );
      this.echo.private( this.channel )
        .listen( '.message.created', ( e ) => {
          console.log( 'root new message', e );
          this.setState( { newMessage: e.message } );
        } );
    }
  }

  getContextValue() {
    return {
      toggleJoyspaceModal: this.toggleJoyspaceModal,
      echo: this.state.echo,
    };
  }

  getUserContextValue() {
    return {
      user: this.state.user,
      handleUser: this.handleUser,
      refreshToken: this.refreshToken,
      updateUserFavorites: this.updateUserFavorites,
      newMessage: this.state.newMessage,
    };
  }

  getRegionContextValue() {
    return {
      region: this.state.region,
    };
  }

  getChatContextValue() {
    return {
      chatDetails: this.state.chatDetails,
      handleChat: this.handleChat,
    };
  }

  handleChat( chatDetails = {} ) {
    this.setState( {
      chatDetails,
    } );
  }

  setUser( user ) {
    this.setState( {
      user,
    } );
  }

  handleUser( user ) {
    if ( user ) {
      this.setUser( user );
      this.setEcho( user );
    } else {
      client
        .query( {
          query: getProfileDetails,
          fetchPolicy: 'network-only',
        } )
        .then( ( { data: { me } } ) => {
          if ( me ) {
            this.setUser( me );
          }
          this.setEcho( me );
        } )
        .catch( async ( error ) => {
          const errorMsg = commonFunctions.parseGraphQLErrorMessage( error );
          const accessToken = UserUtils.getAccessToken();
          if ( accessToken && errorMsg === 'Unauthenticated.' ) {
            await this.refreshToken();
          }
          this.setState( { loading: false } );
        } );
    }
  }

  updateUserFavorites( updatedFavorites ) {
    this.setState( prevState => ( {
      user: update( prevState.user, {
        favorites: { $set: updatedFavorites },
      } ),
    } ) );
  }

  async refreshToken( history ) {
    const token = UserUtils.getRefreshToken();
    if ( token ) {
      try {
        const { data: { refreshToken: data } } = await client.mutate( {
          mutation: refreshToken,
          variables: {
            data: {
              refresh_token: token,
            },
          },
        } );
        UserUtils.setAccessToken( data.access_token );
        UserUtils.setRefreshToken( data.refresh_token );
        this.handleUser();
        return 'ok';
      } catch ( error ) {
        console.log( 'Refresh token error: ', error.graphQLErrors );
        UserUtils.setAccessToken( '' );
        UserUtils.logout();
        if ( history ) {
          history.push( '/' );
        }
        return 'logout';
      }
    } else {
      UserUtils.setAccessToken( '' );
      UserUtils.logout();
      if ( history ) {
        history.push( '/' );
      }
      return 'logout';
    }
  }

  toggleJoyspaceModal( value ) {
    this.setState( { showJoyspaceBanner: value } );
  }

  render() {
    if ( this.state.loading ) {
      return (
        <div />
      );
    }

    return (
      <AppContext.Provider value={this.getContextValue()}>
        <UserContext.Provider value={this.getUserContextValue()}>
          <RegionContext.Provider value={this.getRegionContextValue()}>
            <ChatContext.Provider value={this.getChatContextValue()}>
              <ApolloProvider client={client}>
                <SnackbarProvider maxSnack={3}>
                  <>
                    <Modal
                      open={this.state.showJoyspaceBanner}
                      onClose={() => this.setState( { showJoyspaceBanner: false } )}
                    >
                      <DownloadBanner />
                    </Modal>
                    <Router />
                  </>
                </SnackbarProvider>
              </ApolloProvider>
            </ChatContext.Provider>
          </RegionContext.Provider>
        </UserContext.Provider>
      </AppContext.Provider>
    );
  }
}

export default App;
