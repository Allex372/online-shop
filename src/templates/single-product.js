import React, { useState, useEffect, useMemo } from "react"
import { graphql, Link } from "gatsby"
import { Layout, Backet } from "../components"
import "../components/StrapiImage/StrapiImage"
import { StrapiImage } from "../components/StrapiImage"
import { useBacket } from "../features/cart"
import { ConsultationBanner } from "../components/shared/ConsultationBanner"
import { RelatedProducts } from "../components/Product/RelatedProducts/RelatedProducts"
import { ImageModal } from "../components"
import Seo from "../components/Seo/seo"
import { StructuredData } from "../components/Seo/StructuredData"
import { productSchema, breadcrumbSchema } from "../components/Seo/schemas"
import {
  buildCanonical,
  buildProductTitle,
  buildProductDescription,
} from "../lib/seo"
import { getCategoryByFilterValue, getCategoryPath } from "../lib/chemistryCategories"
import * as styles from "./single-product.module.css"

const SingleProduct = ({ data }) => {
  const product = data?.rest?.products?.data?.[0]
  const attrs = product?.attributes
  const id = product?.id
  const currency = data?.rest?.currencies?.data?.[0]?.attributes?.value ?? 1

  const {
    name,
    description,
    cultures,
    img,
    isAvailable,
    Active_substance,
    price,
    chemistries,
    Table,
    highPriority,
    sizes,
  } = attrs || {}

  const chemistry = chemistries?.data?.[0]?.attributes?.name
  const category = getCategoryByFilterValue(chemistry)
  const sizeOptions = sizes?.data?.map((s) => s.attributes?.name).filter(Boolean) || []
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0] || description)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("desc")
  const [openImageModal, setOpenImageModal] = useState(false)

  const { addItemToBacket, items, handleOpenBacket } = useBacket() || {}
  const [isInBacket, setIsInBacket] = useState(false)

  const displayPrice = ((+price || 0) * currency).toFixed(2)

  useEffect(() => {
    setIsInBacket(items?.some((item) => item.id === id))
  }, [items, id])

  const handleAddToCart = () => {
    const payload = { ...attrs, id, count: quantity }
    addItemToBacket(payload)
  }

  const cultureNames =
    cultures?.data?.map((c) => c?.attributes?.name).filter(Boolean) || []

  const relatedProducts = useMemo(() => {
    const allProducts = data?.catalogProducts?.data || []
    if (!chemistry) return []
    return allProducts
      .filter((item) => {
        if (item.id === id) return false
        if (item.attributes?.showProduct === false) return false
        const cat =
          item.attributes?.chemistries?.data?.[0]?.attributes?.name?.toLowerCase()
        return cat === chemistry.toLowerCase()
      })
      .slice(0, 4)
  }, [data?.catalogProducts?.data, chemistry, id])

  const imageAlt = chemistry ? `${name}, ${chemistry}` : name

  return (
    <>
      <Layout>
        <Backet />
        <div className={styles.page}>
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <Link to="/">Головна</Link>
            <span>/</span>
            <Link to="/products">Каталог</Link>
            {chemistry && (
              <>
                <span>/</span>
                <Link to={category ? getCategoryPath(category.slug) : '/products/'}>
                  {chemistry}
                </Link>
              </>
            )}
            <span>/</span>
            <span>{name}</span>
          </nav>

          <div className={styles.grid}>
            <div className={styles.gallery}>
              {highPriority && <span className={styles.badgeHit}>Хіт продажів</span>}
              <StrapiImage
                attributes={img?.data?.attributes}
                alt={imageAlt || ""}
                variant="detail"
                className={styles.productImage}
              />
            </div>

            <div className={styles.info}>
              {chemistry && <p className={styles.category}>{chemistry}</p>}
              <h1 className={styles.title}>{name}</h1>
              <div className={styles.tags}>
                {highPriority && <span className={styles.tag}>Хіт</span>}
                {isAvailable ? (
                  <span className={styles.tagGreen}>Є в наявності</span>
                ) : (
                  <span className={styles.tagWarn}>Під замовлення</span>
                )}
              </div>
              {description && <p className={styles.lead}>{description}</p>}

              <div className={styles.specs}>
                {Active_substance && (
                  <div className={styles.spec}>
                    <span>Діюча речовина</span>
                    <strong>{Active_substance}</strong>
                  </div>
                )}
                {selectedSize && (
                  <div className={styles.spec}>
                    <span>Тара</span>
                    <strong>{selectedSize}</strong>
                  </div>
                )}
                {cultureNames.length > 0 && (
                  <div className={styles.spec}>
                    <span>Культури</span>
                    <strong>{cultureNames.slice(0, 3).join(", ")}</strong>
                  </div>
                )}
              </div>
            </div>

            <aside className={styles.purchase}>
              <p className={styles.price}>{displayPrice} грн</p>
              <p className={styles.priceNote}>Ціна за 1 л(кг)</p>
              <p className={styles.stock}>
                {isAvailable ? "● Є в наявності" : "● Під замовлення (1–3 дні)"}
              </p>

              {sizeOptions.length > 1 && (
                <div className={styles.packaging}>
                  <p>Фасування</p>
                  <div className={styles.sizeBtns}>
                    {sizeOptions.map((size) => (
                      <button
                        key={size}
                        type="button"
                        className={
                          selectedSize === size ? styles.sizeActive : styles.sizeBtn
                        }
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.qty}>
                <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  −
                </button>
                <span>{quantity}</span>
                <button type="button" onClick={() => setQuantity(quantity + 1)}>
                  +
                </button>
              </div>

              {isInBacket ? (
                <button type="button" className={styles.btnPrimary} onClick={handleOpenBacket}>
                  У кошику — переглянути
                </button>
              ) : (
                <button type="button" className={styles.btnPrimary} onClick={handleAddToCart}>
                  Додати в кошик
                </button>
              )}
              <button type="button" className={styles.btnSecondary} onClick={handleOpenBacket}>
                Купити в 1 клік
              </button>
            </aside>
          </div>

          <div className={styles.tabs}>
            <button
              type="button"
              className={activeTab === "desc" ? styles.tabActive : styles.tab}
              onClick={() => setActiveTab("desc")}
            >
              Опис
            </button>
            {Table?.data && (
              <button
                type="button"
                className={activeTab === "table" ? styles.tabActive : styles.tab}
                onClick={() => setActiveTab("table")}
              >
                Регламент
              </button>
            )}
          </div>

          {activeTab === "desc" && (
            <div className={styles.tabContent}>
              <h2>Опис товару</h2>
              <p>{description || "Детальний опис скоро буде додано."}</p>
              {Active_substance && (
                <ul className={styles.list}>
                  <li>Діюча речовина: {Active_substance}</li>
                  <li>Категорія: {chemistry}</li>
                </ul>
              )}
            </div>
          )}

          {activeTab === "table" && Table?.data && (
            <div className={styles.tabContent}>
              <button
                type="button"
                className={styles.tableBtn}
                onClick={() => setOpenImageModal(true)}
              >
                <img
                  src={Table.data.attributes.url}
                  alt={`Регламент застосування — ${name}`}
                />
              </button>
            </div>
          )}

          <RelatedProducts
            products={relatedProducts}
            chemistry={chemistry}
            currencyRate={currency}
          />

          <ConsultationBanner />
        </div>

        <ImageModal
          isOpen={openImageModal}
          data={Table?.data?.attributes?.url}
          onClose={() => setOpenImageModal(false)}
        />
      </Layout>
    </>
  )
}

export default SingleProduct

export const Head = ({ data, location }) => {
  const product = data?.rest?.products?.data?.[0]
  if (!product?.attributes) {
    return <Seo title="Товар | Вікторія Захід Трейд" noindex />
  }

  const attrs = product.attributes
  const id = product.id
  const currency = data?.rest?.currencies?.data?.[0]?.attributes?.value ?? 1
  const {
    name,
    description,
    isAvailable,
    Active_substance,
    price,
    chemistries,
    cultures,
    img,
    url,
  } = attrs

  const chemistry = chemistries?.data?.[0]?.attributes?.name
  const cultureNames =
    cultures?.data?.map((c) => c?.attributes?.name).filter(Boolean) || []
  const priceUah = ((+price || 0) * currency).toFixed(2)
  const imageUrl = img?.data?.attributes?.url
  const pathname =
    location?.pathname || `/products/${url}/${id}/`

  const seoTitle = buildProductTitle(name, chemistry)
  const seoDescription = buildProductDescription({
    name,
    chemistry,
    activeSubstance: Active_substance,
    cultures: cultureNames,
    priceUah,
    fallback: description,
  })

  const categoryMeta = getCategoryByFilterValue(chemistry)
  const breadcrumbs = breadcrumbSchema([
    { name: "Головна", url: "/" },
    { name: "Каталог", url: "/products/" },
    ...(chemistry
      ? [
          {
            name: chemistry,
            url: categoryMeta ? getCategoryPath(categoryMeta.slug) : "/products/",
          },
        ]
      : []),
    { name, url: pathname },
  ])

  const productJsonLd = productSchema({
    name,
    description: seoDescription,
    imageUrl,
    price: priceUah,
    isAvailable,
    sku: id,
    urlPath: pathname,
  })

  return (
    <>
      <Seo
        title={seoTitle}
        description={seoDescription}
        canonical={buildCanonical(pathname)}
        image={imageUrl}
        type="product"
      />
      <StructuredData data={[productJsonLd, breadcrumbs]} />
    </>
  )
}

export const query = graphql`
  query ($url: String) {
    rest {
      currencies {
        data {
          attributes {
            value
          }
        }
      }
      catalogProducts: products(pagination: { limit: 1000 }) {
        data {
          id
          attributes {
            url
            name
            showProduct
            price
            isAvailable
            highPriority
            chemistries {
              data {
                attributes {
                  name
                }
              }
            }
            sizes {
              data {
                attributes {
                  name
                }
              }
            }
            img {
              data {
                attributes {
                  ...StrapiUploadFile
                }
              }
            }
          }
        }
      }
      products(filters: { url: { eq: $url } }) {
        data {
          id
          attributes {
            url
            name
            Active_substance
            highPriority
            chemistries {
              data {
                attributes {
                  name
                }
              }
            }
            isAvailable
            cultures {
              data {
                attributes {
                  name
                }
              }
            }
            description
            img {
              data {
                attributes {
                  ...StrapiUploadFileDetail
                }
              }
            }
            price
            sizes {
              data {
                attributes {
                  name
                }
              }
            }
            Table {
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`
