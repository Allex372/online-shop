import React from 'react';
import Seo from '../components/Seo/seo';
import { buildCanonical } from '../lib/seo';
import { CatalogPage } from '../components/Catalog/CatalogPage';

const ProductsPage = () => <CatalogPage />;

export const Head = ({ location }) => (
  <Seo
    title="Каталог засобів захисту рослин — гербіциди, фунгіциди | Вікторія Захід Трейд"
    description="Каталог ЗЗР та добрив: гербіциди, фунгіциди, інсектициди, протруйники, ад'юванти. Ціни, наявність, доставка по Україні. Консультація та підбір препаратів."
    canonical={buildCanonical(location?.pathname || '/products/')}
  />
);

export default ProductsPage;
