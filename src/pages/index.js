import * as React from "react"
import Seo from "../components/Seo/seo"
import { LinkPictures, Layout, ChemistryElements, Cultures, Backet, Footer } from '../components';
import "../components/index.css"

const IndexPage = () => (
  <>
    <Layout>
      <Backet />
      <ChemistryElements />
      <LinkPictures />
      <Cultures />
      {/* <footer>
      footer
    </footer> */}
    </Layout>
    <Footer />
  </>
)

export const Head = () => <Seo title="Home" />

export default IndexPage
