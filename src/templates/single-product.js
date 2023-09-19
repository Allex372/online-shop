import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import { Layout, Backet } from "../components";
import { useBacket } from "../context/BacketProvider";
import { navigate } from 'gatsby';
import { StaticImage } from "gatsby-plugin-image";

import * as styles from './single-product.module.css';

const SingleProduct = ({ data }) => {
    const productData = data?.rest?.products?.data?.[0]?.attributes;

    const id = data?.rest?.products?.data?.[0]?.id;

    const {
        name,
        description,
        cultures,
        img,
        // chemistry,
        // size,
        Active_substance,
        price
    } = productData

    const productImg = img?.data?.attributes?.url;

    const backetContext = useBacket();
    const { addItemToBacket, items, handleOpenBacket } = backetContext ? backetContext : {};

    const [isInBacket, setIsInBacket] = useState(null);

    const handleAddItem = (currentProduct, id) => {
        currentProduct.id = id;
        addItemToBacket(currentProduct);
    }

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        setIsInBacket(items.some((item) => item.id === id));
    }, [items]);

    const handleClickButtonBuy = () => {
        handleClick();
        handleOpenBacket();
    }


    return (
        <Layout>
            <Backet />
            <div className={styles.wrapper}>
                <div className={styles.menuIcon} onClick={() => navigate('/products')}>
                    <StaticImage height={20} width={20} alt="back" src='../images/arrow-left.png' />
                </div>
                <div className={styles.infoWrapper}>
                    <div className={styles.imgWrapper}>
                        <p className={styles.productName}>{name}</p>
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

                        {/* <p className={styles.descriptionText}>Препаративна форма:
                            <span>Текучий концентрат для обробки насіння</span>
                        </p> */}

                        <p className={styles.descriptionText}>Ціна:
                            <span>{price}₴</span>
                        </p>

                        <p className={styles.descriptionText}>Типи культур:
                            {cultures?.data?.map((el) => (
                                <span key={el}>{el?.attributes?.name}</span>
                            ))}
                        </p>
                    </div>



                </div>

                <div className={styles.advantages}>
                    <p>Переваги товару </p>
                    <ul>
                        <li>Ефективно знищує як однорічні, так і багаторічні бур'яни.</li>
                        <li>Менша норма витрати.</li>
                        <li> Істотно знижує загальну забур'яненість полів і зводить до мінімуму. Кількість агротехнічних заходів направлених на боротьбу з бур'янами.</li>
                        <li>Не має ґрунтової активності.</li>
                    </ul>
                </div>

            </div >
        </Layout>
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
                }
            }
        }
      }
    }
`;