import * as React from "react"
import { useStaticQuery, graphql } from "gatsby";

function Seo({ description, title, children }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={site.siteMetadata?.author || ``} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="google-site-verification" content="ifSgDQ23bhVcvvaevOLkHuNiME68d2gcW23tptIhpBA" />
      <link rel="icon" href="../../images/logo.png" type="image/jpg" />
      {children}
    </>
  )
}

export default Seo
