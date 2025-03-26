import * as React from "react"
import Seo from "../components/Seo/seo"
import { LinkPictures, Layout, ChemistryElements, Cultures, Backet } from '../components';
import "../components/index.css"

const IndexPage = () => (
  <>
    <Layout>
      <Backet />
      <ChemistryElements />
      <LinkPictures />
      <Cultures />
    </Layout>
    {/* <Footer /> */}
  </>
)

export const Head = () => <Seo title="Вікторія Захід Трейд" />

export default IndexPage
