/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */

// You can delete this file if you're not using it

import React from "react"
import SearchResultProvider from "./src/context/SearchResultProvider"

export const wrapRootElement = ({ element }) => (
    <SearchResultProvider>{element}</SearchResultProvider>
)