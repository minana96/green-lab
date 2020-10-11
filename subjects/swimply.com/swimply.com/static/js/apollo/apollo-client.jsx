import { ApolloClient } from 'apollo-client';
import UserUtils from '../components/utilities/UserUtils';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { GRAPHQL_SERVER_BASE_URL } from '../config'

const httpLink = createHttpLink({
  uri: `${GRAPHQL_SERVER_BASE_URL}/graphql` || '',
});

const authLink = setContext((_, { headers }) => {
  const token = `Bearer ${UserUtils.getAccessToken()}`;
  return {
    headers: {
      authorization: token,
    }
  }
});

const client = new ApolloClient({
  credentials: 'include',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


export default client;
