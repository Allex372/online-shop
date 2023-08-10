/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */

// You can delete this file if you're not using it

import React from "react"
import SearchResultProvider from "./src/context/SearchResultProvider";
import BacketProvider from "./src/context/BacketProvider";
import FilterProvider from "./src/context/FilterProvider";
import ViewProvider from "./src/context/ViewProvider";

export const wrapRootElement = ({ element }) => (
    <FilterProvider>
        <BacketProvider>
            <SearchResultProvider>
                <ViewProvider>
                    {element}
                </ViewProvider>
            </SearchResultProvider>
        </BacketProvider>
    </FilterProvider>
)