import { loader } from 'graphql.macro';

const sendAnalyticsMutation = loader( './../../graphql/analytics/sendAnalytics.graphql' );

// eslint-disable-next-line import/prefer-default-export
export const sendAnalytics = ( client, data ) => {
  client.mutate( {
    mutation: sendAnalyticsMutation,
    variables: {
      data,
    },
  } );
};
