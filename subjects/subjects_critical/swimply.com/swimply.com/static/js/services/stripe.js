import { loader } from 'graphql.macro'

// graphql
const stripeExpressDashboard = loader('../graphql/user/stripeExpressDashboard.graphql')

export default class StripeService {
  static init ({ client }) {
    this.client = client
  }

  static async redirectToStripeDashboard () {
    const windowReference = window.open() // used this solution to cover issue with safari
    const { data: { getStripeExpressLink: data }} = await this.client.query({
      query: stripeExpressDashboard,
      fetchPolicy: 'network-only'
    })
    if (data.url) {
      windowReference.location = data.url // used this solution to cover issue with safari
    }
  }
}
