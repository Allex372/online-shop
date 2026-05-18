import { SITE_NAME, getSiteUrl, toAbsoluteUrl, availabilitySchema } from '../../lib/seo';

export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: getSiteUrl(),
  logo: toAbsoluteUrl('/icons/icon-512x512.png'),
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+380674711434',
    contactType: 'customer service',
    areaServed: 'UA',
    availableLanguage: 'Ukrainian',
  },
  sameAs: [
    'https://t.me/+380674711434',
    'https://wa.me/380674711434',
  ],
});

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: getSiteUrl(),
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${getSiteUrl()}/products/?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

export const productSchema = ({
  name,
  description,
  imageUrl,
  price,
  isAvailable,
  sku,
  urlPath,
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name,
  description,
  image: imageUrl ? [imageUrl] : undefined,
  sku: String(sku),
  brand: {
    '@type': 'Brand',
    name: SITE_NAME,
  },
  offers: {
    '@type': 'Offer',
    url: toAbsoluteUrl(urlPath),
    priceCurrency: 'UAH',
    price: price ? String(price) : undefined,
    availability: availabilitySchema(isAvailable),
    seller: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
  },
});

export const localBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE_NAME,
  url: getSiteUrl(),
  telephone: '+380674711434',
  email: 'agrozakhyst.vovk@gmail.com',
  image: toAbsoluteUrl('/icons/icon-512x512.png'),
  areaServed: {
    '@type': 'Country',
    name: 'Україна',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  sameAs: [
    'https://t.me/+380674711434',
    'https://wa.me/380674711434',
  ],
});

export const faqSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: answer,
    },
  })),
});

export const itemListSchema = ({ name, items }) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name,
  numberOfItems: items.length,
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: toAbsoluteUrl(item.url),
    name: item.name,
  })),
});

export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url ? toAbsoluteUrl(item.url) : undefined,
  })),
});
