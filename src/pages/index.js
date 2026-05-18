import * as React from "react"
import Seo from "../components/Seo/seo"
import { StructuredData } from "../components/Seo/StructuredData"
import { organizationSchema, websiteSchema } from "../components/Seo/schemas"
import { buildCanonical, DEFAULT_DESCRIPTION } from "../lib/seo"
import { Layout, ChemistryElements, Cultures, Backet } from '../components'
import { HeroSection } from '../components/Home/HeroSection'
import { AudienceToggle } from '../components/Home/AudienceToggle'
import { TrustBar } from '../components/Home/TrustBar'
import { HomeSeoContent } from '../components/Home/HomeSeoContent/HomeSeoContent'
import "../components/index.css"
import * as styles from './index.module.css'

const IndexPage = () => (
  <>
    <Layout>
      <Backet />
      <ChemistryElements />
      <div className={styles.page}>
        <HeroSection />
        <AudienceToggle />
        <section className={styles.culturesSection}>
          <h2 className={styles.sectionTitle}>Культури</h2>
          <Cultures />
        </section>
        <TrustBar />
        <HomeSeoContent />
      </div>
    </Layout>
  </>
)

export const Head = ({ location }) => (
  <>
    <Seo
      title="Вікторія Захід Трейд — засоби захисту рослин та добрива в Україні"
      description={DEFAULT_DESCRIPTION}
      canonical={buildCanonical(location?.pathname || "/")}
    />
    <StructuredData data={[organizationSchema(), websiteSchema()]} />
  </>
)

export default IndexPage
