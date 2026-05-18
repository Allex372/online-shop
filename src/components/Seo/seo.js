import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, getSiteUrl, toAbsoluteUrl } from '../../lib/seo';

function Seo({
  title,
  description,
  canonical,
  image,
  type = 'website',
  noindex = false,
  children,
}) {
  const { site } = useStaticQuery(
    graphql`
      query SeoSiteMetadata {
        site {
          siteMetadata {
            title
            description
            siteUrl
            defaultImage
            phone
          }
        }
      }
    `
  );

  const meta = site.siteMetadata;
  const siteUrl = meta.siteUrl || getSiteUrl();
  const metaTitle = title || meta.title;
  const metaDescription = description || meta.description || DEFAULT_DESCRIPTION;
  const canonicalUrl = canonical || siteUrl;
  const ogImage = toAbsoluteUrl(image || meta.defaultImage || DEFAULT_OG_IMAGE, siteUrl);

  return (
    <>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      <meta property="og:site_name" content={meta.title} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="uk_UA" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta
        name="google-site-verification"
        content="GX76Vmu52eYhLwznKwTeLd-q_o9tu_O9aUOT2E7K76A"
      />
      <link rel="icon" href="/icons/icon-48x48.png" type="image/png" />
      {children}
    </>
  );
}

export default Seo;
