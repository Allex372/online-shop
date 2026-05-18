/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */

import { useCatalogStore } from './src/features/catalog'

export const onClientEntry = () => {
  useCatalogStore.getState().changeGridView('grid')
}
