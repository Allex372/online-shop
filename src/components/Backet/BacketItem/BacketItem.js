import React from 'react';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrash,
    faCircleCheck,
    faCartShopping,
    faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { useBacket } from '../../../features/cart';
import * as styles from './BacketItem.module.css';

const chemistryLabel = (name) => {
    if (!name) return null;
    if (name === 'Гербіциди') return 'Гербіцид';
    if (name === 'Фунгіциди') return 'Фунгіцид';
    if (name === 'Інсектициди') return 'Інсектицид';
    if (name === 'Протруйники') return 'Протруйник';
    if (name === 'Десиканти') return 'Десикант';
    if (name === "Прилипачі (ад'юванти)") return "Прилипач";
    return name;
};

export const BacketItem = ({ items, statusCode, clearStatusCode, currencie }) => {
    const { updateItemCount, removeItemFromBacket, handleOpenBacket } = useBacket() || {};

    const handleIncrement = (id, count) => {
        updateItemCount(id, Math.min((count || 1) + 1, 10));
    };

    const handleDecrement = (id, count) => {
        updateItemCount(id, Math.max((count || 1) - 1, 1));
    };

    if (!items?.length && statusCode !== 200) {
        return (
            <div className={styles.empty}>
                <div className={styles.emptyVisual}>
                    <div className={styles.emptyIconRing}>
                        <FontAwesomeIcon icon={faCartShopping} />
                    </div>
                </div>
                <h3 className={styles.emptyTitle}>Кошик порожній</h3>
                <p className={styles.emptyText}>
                    Додайте товари з каталогу — вони збережуться тут до оформлення замовлення.
                </p>
                <div className={styles.emptyActions}>
                    <Link
                        to="/products"
                        className={styles.emptyBtnPrimary}
                        onClick={() => handleOpenBacket()}
                    >
                        Переглянути каталог
                        <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                    <button
                        type="button"
                        className={styles.emptyBtnGhost}
                        onClick={() => handleOpenBacket()}
                    >
                        Закрити
                    </button>
                </div>
            </div>
        );
    }

    if (!items?.length && statusCode === 200) {
        return (
            <div className={`${styles.empty} ${styles.emptySuccess}`}>
                <div className={styles.emptyVisual}>
                    <div className={`${styles.emptyIconRing} ${styles.emptyIconRingSuccess}`}>
                        <FontAwesomeIcon icon={faCircleCheck} />
                    </div>
                </div>
                <h3 className={styles.emptyTitle}>Дякуємо за замовлення!</h3>
                <p className={styles.emptyText}>
                    Заявку отримано. Ми зателефонуємо найближчим часом для підтвердження.
                </p>
                <div className={styles.emptyActions}>
                    <Link
                        to="/products"
                        className={styles.emptyBtnPrimary}
                        onClick={() => {
                            clearStatusCode();
                            handleOpenBacket();
                        }}
                    >
                        Продовжити покупки
                        <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <ul className={styles.list}>
            {items.map((item) => {
                const {
                    img,
                    name,
                    price,
                    id,
                    count,
                    url,
                    isAvailable,
                    Active_substance,
                    chemistries,
                    sizes,
                } = item;

                const qty = count || 1;
                const lineTotal = (price * currencie * qty).toFixed(2);
                const unitPrice = (price * currencie).toFixed(2);
                const chemistry = chemistryLabel(
                    chemistries?.data?.[0]?.attributes?.name
                );
                const sizeLabel = sizes?.data?.[0]?.attributes?.name;

                return (
                    <li className={styles.row} key={id}>
                        <button
                            type="button"
                            className={styles.removeBtn}
                            onClick={() => removeItemFromBacket(url)}
                            aria-label={`Видалити ${name}`}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>

                        <div className={styles.imageBox}>
                            <img
                                src={img?.data?.attributes?.url}
                                alt={name}
                            />
                        </div>

                        <div className={styles.info}>
                            <p className={styles.name}>{name}</p>
                            {chemistry && <p className={styles.type}>{chemistry}</p>}
                            <div className={styles.tags}>
                                {sizeLabel && (
                                    <span className={styles.sizeTag}>{sizeLabel}</span>
                                )}
                                <span
                                    className={`${styles.stockTag} ${isAvailable ? styles.inStock : ''}`}
                                >
                                    {isAvailable ? (
                                        <>
                                            <FontAwesomeIcon icon={faCircleCheck} />
                                            В наявності
                                        </>
                                    ) : (
                                        'Під замовлення'
                                    )}
                                </span>
                            </div>
                            {Active_substance && (
                                <p className={styles.substance}>
                                    Діюча речовина: {Active_substance}
                                </p>
                            )}
                        </div>

                        <div className={styles.actions}>
                            <div className={styles.qty}>
                                <button
                                    type="button"
                                    onClick={() => handleDecrement(id, qty)}
                                    aria-label="Зменшити кількість"
                                >
                                    −
                                </button>
                                <span>{qty}</span>
                                <button
                                    type="button"
                                    onClick={() => handleIncrement(id, qty)}
                                    aria-label="Збільшити кількість"
                                >
                                    +
                                </button>
                            </div>
                            <div className={styles.prices}>
                                <p className={styles.lineTotal}>{lineTotal} ₴</p>
                                <p className={styles.unitPrice}>{unitPrice} ₴ / од.</p>
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};
