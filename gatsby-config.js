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
    description: `Засоби захисту рослин, добрива та агрохімія в Україні. Гербіциди, фунгіциди, інсектициди. Доставка та консультація. Тел. 067 471 14 34.`,
    author: `Вікторія Захід Трейд`,
    siteUrl: `https://viktoria-zahidtrade.com`,
    defaultImage: `/icons/icon-512x512.png`,
    phone: `+380674711434`,
  },
  plugins: [
    `gatsby-plugin-netlify`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        excludes: ['/dev-404-page/**', '/404'],
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
        name: `Вікторія Захід Трейд`,
        short_name: `ВЗ Трейд`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#15803d`,
        display: `minimal-ui`,
        icon: `src/images/newLogo.png`,
      },
    },
  ],
}
