const { createRemoteFileNode } = require('gatsby-source-filesystem')

exports.createStrapiImageResolvers = ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions

  createResolvers({
    REST_UploadFile: {
      localFile: {
        type: `File`,
        resolve: async (source, _args, context) => {
          const imageUrl = source?.url

          if (!imageUrl || typeof imageUrl !== 'string') {
            return null
          }

          const cacheKey = `strapi-remote-file-${imageUrl}`

          try {
            const { nodeModel } = context
            const cachedId = await cache.get(cacheKey)

            if (cachedId) {
              const cachedNode = nodeModel.getNodeById({ id: cachedId })
              if (cachedNode) {
                return cachedNode
              }
            }

            const { entries: graphqlSourceNodes } = await nodeModel.findAll({
              type: `GraphQLSource`,
            })
            const parentNode = graphqlSourceNodes?.[0]

            if (!parentNode) {
              return null
            }

            const fileNode = await createRemoteFileNode({
              url: imageUrl,
              parentNode,
              store,
              cache,
              createNode,
              createNodeId,
            })

            if (fileNode?.id) {
              await cache.set(cacheKey, fileNode.id)
            }

            return fileNode
          } catch (error) {
            reporter.warn(
              `createStrapiImageResolvers: failed for ${imageUrl} — ${error.message}`
            )
            return null
          }
        },
      },
    },
  })
}
