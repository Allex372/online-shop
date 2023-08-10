import React, { useState, useEffect } from "react";
import { Layout, Backet } from "../components";
import { useBacket } from "../context/BacketProvider";
import { navigate } from 'gatsby';
import { StaticImage } from "gatsby-plugin-image";

import big from '../images/bigBotltle.png';

import * as styles from './single-product.module.css';

const SingleProduct = ({ pageContext }) => {
    const { productData } = pageContext;

    const {
        id,
        name,
        description,
        culture,
        // chemistry,
        // size,
        activeIng,
        price
    } = productData

    const backetContext = useBacket();
    const { addItemToBacket, items, handleOpenBacket } = backetContext ? backetContext : {};

    const [isInBacket, setIsInBacket] = useState(null);

    const handleAddItem = (currentProduct) => {
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
            {/* <Seo title={isFetchedServiceNew ? fetchedServices?.attributes?.title : seoTitle} description={isFetchedServiceNew ? fetchedServices?.attributes?.description : seoDescription} /> */}
            <div className={styles.wrapper}>
                <div className={styles.menuIcon} onClick={() => navigate(-1)}>
                    <StaticImage height={20} width={20} alt="back" src='../images/arrow-left.png' />
                </div>
                <div className={styles.infoWrapper}>
                    <div className={styles.imgWrapper}>
                        <p className={styles.productName}>{name}</p>
                        <img src={big} alt='bottle' />
                        {isInBacket ?
                            <button className={styles.buyButtonAdded} onClick={() => handleClickButtonBuy()}>В корзині</button>
                            :
                            <button className={styles.buyButton} onClick={() => handleAddItem(productData)}>Купити</button>
                        }
                    </div>

                    <div className={styles.description}>
                        <p className={styles.descriptionText}>{description}</p>

                        <p className={styles.descriptionText}>Діюча речовина:
                            <span>{activeIng}</span>
                        </p>

                        <p className={styles.descriptionText}>Препаративна форма:
                            <span>Текучий концентрат для обробки насіння</span>
                        </p>

                        <p className={styles.descriptionText}>Ціна:
                            <span>{price}₴</span>
                        </p>

                        <p className={styles.descriptionText}>Типи культур:
                            {culture.map((el) => (
                                <span key={el}> {el} </span>
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
