const path = require('path');

exports.createPages = async ({ actions, graphql }) => {
    const { data } = await graphql(`
        query {
            rest {
                products (pagination: {limit: 300}){
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
};
