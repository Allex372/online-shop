require('dotenv').config()

const path = require('path')
const {
  handleSubmitOrderRequest,
  getClientIpFromRequest,
} = require('./lib/handle-submit-order')
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
        const clientIp = getClientIpFromRequest(req)
        const { statusCode, headers, body } = await handleSubmitOrderRequest({
          body: rawBody,
          clientIp,
        })

        if (headers?.['Content-Type']) {
          res.setHeader('Content-Type', headers['Content-Type'])
        }

        res.status(statusCode).send(body)
      } catch (error) {
        console.error('submit-order dev handler error:', error)
        res.status(500).json({ error: 'Помилка сервера. Спробуйте пізніше.' })
      }
    })
  })
}

const buildRelatedProductsByChemistry = (products) => {
    const byChemistry = new Map()

    products.forEach((product) => {
        if (product?.attributes?.showProduct === false) return

        const chemistryName =
            product?.attributes?.chemistries?.data?.[0]?.attributes?.name
        if (!chemistryName) return

        const key = chemistryName.toLowerCase()
        if (!byChemistry.has(key)) byChemistry.set(key, [])
        byChemistry.get(key).push(product)
    })

    return byChemistry
}

const getRelatedProducts = (byChemistry, product, limit = 4) => {
    const chemistryName =
        product?.attributes?.chemistries?.data?.[0]?.attributes?.name
    if (!chemistryName) return []

    const related = byChemistry.get(chemistryName.toLowerCase()) || []
    return related.filter((item) => item.id !== product.id).slice(0, limit)
}

exports.createPages = async ({ actions, graphql }) => {
    const { data } = await graphql(`
        query CreateProductPages {
            rest {
                products(pagination: { limit: 1000 }) {
                    data {
                        id
                        attributes {
                            name
                            url
                            showProduct
                            price
                            isAvailable
                            highPriority
                            chemistries {
                                data {
                                    attributes {
                                        name
                                    }
                                }
                            }
                            sizes {
                                data {
                                    attributes {
                                        name
                                    }
                                }
                            }
                            img {
                                data {
                                    attributes {
                                        url
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `)

    const products = data?.rest?.products?.data || []
    const relatedByChemistry = buildRelatedProductsByChemistry(products)

    products.forEach((node) => {
        const { url } = node.attributes

        actions.createPage({
            path: `products/${url}/${node.id}`,
            component: path.resolve('./src/templates/single-product.js'),
            context: {
                url,
                relatedProducts: getRelatedProducts(relatedByChemistry, node),
            },
        })
    })

    CHEMISTRY_CATEGORIES.forEach((category) => {
        actions.createPage({
            path: `kategoriya/${category.slug}`,
            component: path.resolve('./src/templates/category.js'),
            context: { slug: category.slug },
        });
    });
};

