import { graphql, useStaticQuery } from 'gatsby'

export const CURRENCY_RATE_QUERY = graphql`
  query CurrencyRateQuery {
    rest {
      currencies {
        data {
          attributes {
            value
          }
        }
      }
    }
  }
`

export function useCurrencyRate() {
  const data = useStaticQuery(CURRENCY_RATE_QUERY)
  return data?.rest?.currencies?.data?.[0]?.attributes?.value ?? 1
}
