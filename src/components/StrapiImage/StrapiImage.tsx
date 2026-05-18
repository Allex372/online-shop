import React from 'react'
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image'
import { graphql } from 'gatsby'

export const strapiUploadFileFragment = graphql`
  fragment StrapiUploadFile on REST_UploadFile {
    url
    localFile {
      childImageSharp {
        gatsbyImageData(
          width: 480
          layout: CONSTRAINED
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
  }
`

export const strapiUploadFileDetailFragment = graphql`
  fragment StrapiUploadFileDetail on REST_UploadFile {
    url
    localFile {
      childImageSharp {
        gatsbyImageData(
          width: 560
          layout: CONSTRAINED
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
  }
`

type StrapiUploadFileAttributes = {
  url?: string | null
  localFile?: {
    childImageSharp?: {
      gatsbyImageData?: IGatsbyImageData | null
    } | null
  } | null
}

type StrapiImageProps = {
  attributes?: StrapiUploadFileAttributes | null
  alt: string
  className?: string
  /** Larger hero image on product detail page */
  variant?: 'card' | 'detail'
}

export const StrapiImage = ({
  attributes,
  alt,
  className,
  variant = 'card',
}: StrapiImageProps) => {
  const gatsbyImage = getImage(attributes?.localFile)

  if (gatsbyImage) {
    return (
      <GatsbyImage
        image={gatsbyImage}
        alt={alt}
        className={className}
        loading={variant === 'detail' ? 'eager' : 'lazy'}
      />
    )
  }

  if (attributes?.url) {
    return (
      <img
        src={attributes.url}
        alt={alt}
        className={className}
        loading={variant === 'detail' ? 'eager' : 'lazy'}
        decoding="async"
        style={variant === 'detail' ? { objectFit: 'contain' } : undefined}
      />
    )
  }

  return null
}
