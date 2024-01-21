import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import { Layout, Backet } from "../components";
import { useBacket } from "../context/BacketProvider";
import { navigate } from 'gatsby';
import { StaticImage } from "gatsby-plugin-image";
import { ImageModal } from "../components";

import Seo from "../components/Seo/seo";
import closeIcon from '../images/close.png';

import * as styles from './single-product.module.css';

const CultureArray = [
    {
        id: 1,
        name: 'зернові (пшениця, ячмінь)',
    },
    {
        id: 2,
        name: 'соняшник',
    },
    {
        id: 3,
        name: 'соя',
    },
    {
        id: 4,
        name: 'сади, ягоди',
    },
    {
        id: 5,
        name: 'ріпак',
    },
    {
        id: 6,
        name: "овочі",
    },
    {
        id: 7,
        name: 'картопля',
    },
    {
        id: 8,
        name: 'кукурудза',
    },
    {
        id: 9,
        name: 'буряки цукрові',
    }
]

const SingleProduct = ({ data }) => {
    const productData = data?.rest?.products?.data?.[0]?.attributes;

    const id = data?.rest?.products?.data?.[0]?.id;

    const {
        name,
        description,
        cultures,
        img,
        isAvailable,
        Active_substance,
        price,
        chemistries,
        Table
    } = productData

    const chemistry = chemistries?.data[0]?.attributes?.name;

    const productImg = img?.data?.attributes?.url;

    const backetContext = useBacket();
    const { addItemToBacket, items, handleOpenBacket } = backetContext ? backetContext : {};

    const [isInBacket, setIsInBacket] = useState(null);
    const [openImageModal, setOpenImageModal] = useState(null);

    const Currencie = data?.rest?.currencies?.data[0]?.attributes.value;

    const handleAddItem = (currentProduct, id) => {
        currentProduct.id = id;
        addItemToBacket(currentProduct);
    }

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        setIsInBacket(items.some((item) => item.id === id));
    }, [items, id]);

    const handleClickButtonBuy = () => {
        handleClick();
        handleOpenBacket();
    }

    const selectedCultures = cultures?.data?.map(el => el?.attributes?.name.toLowerCase()) || [];

    const isAllCultures = CultureArray.every(culture => selectedCultures.includes(culture.name.toLowerCase()));

    return (
        <>
            <Seo title={name} description={chemistry} />
            <Layout>
                <Backet />
                <div className={styles.wrapper}>
                    <div className={styles.menuIcon} onClick={() => navigate('/products')}>
                        <StaticImage height={20} width={20} alt="back" src='../images/arrow-left.png' />
                    </div>
                    <div className={styles.infoWrapper}>
                        <div className={styles.imgWrapper}>
                            <div className={styles.titleWrapper}>
                                <p className={styles.productName}>{name}</p>
                                {!isAvailable && <p className={styles.notAvailable}>Під замовлення (до 3-ох робочих днів)</p>}
                            </div>
                            <img src={productImg} alt='bottle' />
                            {isInBacket ?
                                <button className={styles.buyButtonAdded} onClick={() => handleClickButtonBuy()}>В корзині</button>
                                :
                                <button className={styles.buyButton} onClick={() => handleAddItem(productData, id)}>Купити</button>
                            }
                        </div>

                        <div className={styles.description}>
                            <p className={styles.descriptionText}>Тара:
                                <span>{description}</span>
                            </p>

                            <p className={styles.descriptionText}>Діюча речовина:
                                <span>{Active_substance}</span>
                            </p>

                            <p className={styles.descriptionText}>Ціна:
                                <span>{(+price * Currencie).toFixed(2)} грн/л(кг)</span>
                            </p>

                            <p className={styles.descriptionText}>Типи культур:</p>
                            <div className={styles.listWrapper}>
                                {isAllCultures ? (
                                    <span className={styles.listElem}>Всі культури</span>
                                ) : (
                                    selectedCultures.map((name, index) => (
                                        <span className={styles.listElem} key={index}>
                                            {name}
                                            {index < selectedCultures.length - 1 ? ',' : ''}
                                            {' '}
                                        </span>
                                    ))
                                )}
                            </div>

                        </div>



                    </div>

                    {/* <div className={styles.advantages}>
                    <p>Переваги товару </p>
                    <ul>
                        <li>Ефективно знищує як однорічні, так і багаторічні бур'яни.</li>
                        <li>Менша норма витрати.</li>
                        <li> Істотно знижує загальну забур'яненість полів і зводить до мінімуму. Кількість агротехнічних заходів направлених на боротьбу з бур'янами.</li>
                        <li>Не має ґрунтової активності.</li>
                    </ul>
                </div> */}

                    {
                        Table?.data &&
                        <div className={styles.use}>
                            <p className={styles.useTitle}>Регламент застосування</p>
                            <img
                                src={Table?.data?.attributes?.url}
                                alt='Регламент застосування'
                                className={styles.tableImg}
                                onClick={() => setOpenImageModal(true)} />
                        </div>
                    }

                </div >
                <ImageModal isOpen={openImageModal} data={Table?.data?.attributes?.url}>
                    <div className={styles.closeBtnWrapper} onClick={() => setOpenImageModal(false)}>
                        <img src={closeIcon} alt='Закрити' className={styles.closeIcon} />
                    </div>
                </ImageModal >
            </Layout>
        </>
    )
}

// const SingleServiceWithContext = (props) => (
//     <LanguageProvider>
//         <SingleService {...props} />
//     </LanguageProvider>
// );

export default SingleProduct;

export const query = graphql`
  query($url: String) {
        rest {
                currencies {
                    data {
                        attributes {
                            value
                        }
                    }
                }
            }
      rest {
        products(filters: {url: {eq: $url}}) {
            data {
                id
                attributes {
                url
                name
                Active_substance
                chemistries
                    {
                        data {
                            attributes {
                                name
                            }
                        }
                    }
                createdAt
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
                            url
                        }
                    }
                }
                isAvailable
                price
                sizes
                    {
                        data {
                            attributes {
                                name
                            }
                        }
                    }
                updatedAt
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
`;