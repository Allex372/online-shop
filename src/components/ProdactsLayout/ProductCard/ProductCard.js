import React, { useState, useEffect } from "react";
import { Link } from 'gatsby';
import { useBacket } from "../../../features/cart";
import { StrapiImage } from "../../StrapiImage";
import * as styles from './ProductCard.module.css'

const DEFAULT_VIEW = { gridView: true, listView: false };

const chemistryLabel = (name) => {
    if (name === 'Гербіциди') return 'Гербіцид';
    if (name === 'Фунгіциди') return 'Фунгіцид';
    if (name === 'Інсектициди') return 'Інсектицид';
    if (name === 'Протруйники') return 'Протруйник';
    if (name === 'Десиканти') return 'Десикант';
    if (name === "Прилипачі (ад'юванти)") return "Прилипач (ад'юванти)";
    return name;
};

export const ProductCard = ({ product, viewStyle, currencyRate = 1 }) => {
    const view = viewStyle ?? DEFAULT_VIEW;
    const { addItemToBacket, items, handleOpenBacket } = useBacket() || {};
    const [isInBacket, setIsInBacket] = useState(false);

    const attrs = product?.attributes;
    const chemistryName = attrs?.chemistries?.data?.[0]?.attributes?.name;
    const sizeLabel = attrs?.sizes?.data?.[0]?.attributes?.name;
    const imageAttributes = attrs?.img?.data?.attributes;
    const price = (+attrs?.price * currencyRate).toFixed(2);

    const handleAddItem = () => {
        const payload = { ...attrs, id: product.id };
        addItemToBacket(payload);
    };

    useEffect(() => {
        setIsInBacket(items?.some((item) => item.url === attrs?.url));
    }, [items, attrs?.url]);

    if (!attrs?.showProduct) return null;

    const listMode = view?.listView;

    return (
        <article className={`${styles.card} ${listMode ? styles.cardList : ''}`}>
            <div className={styles.badges}>
                {attrs?.highPriority && <span className={styles.badgeHit}>Хіт</span>}
                {!attrs?.isAvailable && <span className={styles.badgeOrder}>Під замовлення</span>}
            </div>

            <Link to={`/products/${attrs.url}/${product.id}`} className={styles.imageLink}>
                <StrapiImage
                    attributes={imageAttributes}
                    alt={attrs.name || ''}
                    className={styles.productImg}
                />
            </Link>

            <div className={styles.body}>
                <Link to={`/products/${attrs.url}/${product.id}`} className={styles.titleLink}>
                    <h3 className={styles.title}>{attrs.name}</h3>
                </Link>
                <p className={styles.meta}>
                    {[sizeLabel, chemistryLabel(chemistryName)].filter(Boolean).join(' • ')}
                </p>
                {attrs.Active_substance && (
                    <p className={styles.substance}>
                        Діюча речовина: {attrs.Active_substance}
                    </p>
                )}
                <p className={styles.price}>{price} грн/л(кг)</p>
                <div className={styles.actions}>
                    {isInBacket ? (
                        <button type="button" className={styles.btnInCart} onClick={() => handleOpenBacket?.()}>
                            У кошику
                        </button>
                    ) : (
                        <button type="button" className={styles.btnCart} onClick={handleAddItem}>
                            🛒 У кошик
                        </button>
                    )}
                </div>
            </div>
        </article>
    );
};
