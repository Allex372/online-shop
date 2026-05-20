import React, { useState } from 'react'
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image'
import { graphql } from 'gatsby'
import * as styles from './StrapiImage.module.css'

const PRODUCT_PLACEHOLDER = '/images/product-placeholder.svg'

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

const ImageFallback = ({
  alt,
  className,
  variant,
}: {
  alt: string
  className?: string
  variant: 'card' | 'detail'
}) => (
  <div
    className={`${styles.fallback} ${variant === 'detail' ? styles.fallbackDetail : ''} ${className || ''}`}
    role="img"
    aria-label={alt || 'Зображення товару відсутнє'}
  >
    <img
      src={PRODUCT_PLACEHOLDER}
      alt=""
      className={styles.fallbackImg}
      aria-hidden="true"
    />
    <p className={styles.fallbackText}>Фото товару<br />незабаром</p>
  </div>
)

export const StrapiImage = ({
  attributes,
  alt,
  className,
  variant = 'card',
}: StrapiImageProps) => {
  const [remoteFailed, setRemoteFailed] = useState(false)
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

  if (attributes?.url && !remoteFailed) {
    return (
      <img
        src={attributes.url}
        alt={alt}
        className={className}
        loading={variant === 'detail' ? 'eager' : 'lazy'}
        decoding="async"
        style={variant === 'detail' ? { objectFit: 'contain' } : undefined}
        onError={() => setRemoteFailed(true)}
      />
    )
  }

  return <ImageFallback alt={alt} className={className} variant={variant} />
}
