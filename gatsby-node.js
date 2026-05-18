require('dotenv').config()

const path = require('path')
const { submitOrder } = require('./lib/submit-order-handler')
const { createStrapiImageResolvers } = require('./lib/create-strapi-image-resolvers')
const { CHEMISTRY_CATEGORIES } = require('./src/lib/chemistryCategories')

exports.createResolvers = (helpers) => {
  createStrapiImageResolvers(helpers)
}

exports.onCreateDevServer = ({ app }) => {
  app.post('/api/submit-order', (req, res) => {
    let rawBody = ''

    req.on('data', (chunk) => {
      rawBody += chunk
    })

    req.on('end', async () => {
      try {
        const orderData = JSON.parse(rawBody || '{}')
        const { statusCode, body } = await submitOrder(orderData)
        res.status(statusCode).send(body)
      } catch (error) {
        console.error('submit-order dev handler error:', error)
        res.status(500).json({ error: 'Failed to submit order' })
      }
    })
  })
}

exports.createPages = async ({ actions, graphql }) => {
    const { data } = await graphql(`
        query {
            rest {
                products (pagination: {limit: 1000}){
                    data {
                        attributes {
                            name
                            url
                        }
                        id
                    }
                }
            }
        }
      `)


    data?.rest?.products?.data?.forEach(node => {
        const { url } = node.attributes;
        actions.createPage({
            path: `products/${url}/${node.id}`,
            component: path.resolve('./src/templates/single-product.js'),
            context: { url }
        })
    });

    CHEMISTRY_CATEGORIES.forEach((category) => {
        actions.createPage({
            path: `kategoriya/${category.slug}`,
            component: path.resolve('./src/templates/category.js'),
            context: { slug: category.slug },
        });
    });
};

