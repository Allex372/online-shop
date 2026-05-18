/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

require('dotenv').config()

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Вікторія Захід Трейд`,
    // description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    siteUrl: `https://viktoria-zahidtrade.com/`,
  },
  plugins: [
    `gatsby-plugin-netlify`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        output: '/sitemap.xml',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'REST',
        fieldName: 'rest',
        url: process.env.STRAPI_GRAPHQL_URL || 'https://dry-tundra-95600-dbbf09fef1a1.herokuapp.com/graphql',
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      },
    },
    // {
    //   resolve: 'gatsby-source-graphql',
    //   options: {
    //     typeName: 'REST',
    //     fieldName: 'rest',
    //     url: 'http://localhost:1337/graphql',
    //     headers: {
    //       Authorization: `Bearer f2b4b4c902a5bfef18210081047d68b5adb75c6b5e429b980bf7f05177b50ab6901b328028c390978f35633cc68222d1a45d92b9cc4b9ec16c2fcfc1180cecd36a87af249a1391a2de880488bdce6054e9b98245e1843d55b757da78e76dd7bb9644ff49d9dfb2acf14d1cd67950b09466022064f4f1e3a20ca638ed6de1bbb1`,
    //     },
    //   },
    // },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/newLogo.png`, // This path is relative to the root of the site.
      },
    },
  ],
}
