import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCartShopping,
    faXmark,
    faLeaf,
    faTruck,
    faHeadset,
    faShieldHalved,
    faLock,
    faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { useBacket } from '../../features/cart';
import { useModalTransition } from '../../hooks/useModalTransition';
import { useCurrencyRate } from '../../hooks/useCurrencyRate';
import { submitOrder } from '../../lib/api/submitOrder';
import { BacketItem } from './BacketItem/BacketItem';
import * as styles from './Backet.module.css';

const FREE_SHIPPING_THRESHOLD = 2000;

const itemsLabel = (count) => {
    if (count === 1) return '1 товар';
    if (count >= 2 && count <= 4) return `${count} товари`;
    return `${count} товарів`;
};

export const Backet = () => {
    const {
        showBacket,
        handleOpenBacket,
        items,
        totalSum,
        itemsWithSum,
        clearBacket,
    } = useBacket() || {};

    const currencyRate = useCurrencyRate();
    const [mounted, setMounted] = useState(false);
    const { shouldRender, phase } = useModalTransition(showBacket, 300);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });
    const [formError, setFormError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusCode, setStatusCode] = useState(null);

    const itemCount = items?.length || 0;
    const totalUah = +(totalSum * currencyRate).toFixed(2);
    const shippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - totalUah);
    const hasFreeShipping = totalUah >= FREE_SHIPPING_THRESHOLD;
    const shippingProgress = Math.min(100, (totalUah / FREE_SHIPPING_THRESHOLD) * 100);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (statusCode === 200) clearBacket();
    }, [statusCode, clearBacket]);

    useEffect(() => {
        if (!shouldRender) return undefined;

        const onEscape = (e) => {
            if (e.key === 'Escape') handleOpenBacket();
        };
        document.addEventListener('keydown', onEscape);

        const scrollY = window.scrollY;
        const { style } = document.body;
        const prev = {
            position: style.position,
            top: style.top,
            width: style.width,
            overflow: style.overflow,
        };

        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', onEscape);
            document.body.style.position = prev.position;
            document.body.style.top = prev.top;
            document.body.style.width = prev.width;
            document.body.style.overflow = prev.overflow;
            window.scrollTo(0, scrollY);
        };
    }, [shouldRender, handleOpenBacket]);

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormError(false);
    };

    const handleSubmit = async () => {
        if (!items?.length) return;

        const isValid = Object.values(formData).every((v) => v.trim() !== '');
        if (!isValid) {
            setFormError(true);
            return;
        }

        setIsSubmitting(true);

        const orderData = {
            fullName: formData.name,
            phoneNumber: formData.phone,
            email: formData.email,
            address: formData.address,
            products: [],
            totalAmount: totalUah,
        };

        itemsWithSum.forEach((item) => {
            orderData.products.push({
                id: +item.id,
                productName: item.name,
                quantity: item.count || 1,
                price: +(item.price * currencyRate).toFixed(2),
                totalAmount: +(item.sum * currencyRate).toFixed(2),
            });
        });

        try {
            const { data } = await submitOrder(orderData);
            setStatusCode(+data);
            setFormData({ name: '', email: '', phone: '', address: '' });
        } catch (error) {
            console.error('Помилка відправки замовлення:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeCart = () => handleOpenBacket();

    const handleClearStatusCode = () => {
        document.getElementById('cart-modal-body')?.scrollTo({ top: 0, behavior: 'smooth' });
        setStatusCode(null);
    };

    if (!mounted || !shouldRender) return null;

    const isClosing = phase === 'closing';
    const isOpenAnim = phase === 'open';

    return createPortal(
        <div
            className={`${styles.overlay} ${isOpenAnim ? styles.overlayOpen : ''} ${isClosing ? styles.overlayClosing : ''}`}
            role="presentation"
            onClick={closeCart}
        >
            <div
                className={`${styles.modal} ${isOpenAnim ? styles.modalOpen : ''} ${isClosing ? styles.modalClosing : ''} ${itemCount === 0 ? styles.modalEmpty : ''}`}
                role="dialog"
                aria-modal="true"
                aria-label="Кошик"
                onClick={(e) => e.stopPropagation()}
            >
                <header className={styles.header}>
                    <div className={styles.headerTitle}>
                        <FontAwesomeIcon icon={faCartShopping} className={styles.headerIcon} />
                        <h2>Кошик</h2>
                        {itemCount > 0 && (
                            <span className={styles.badge}>{itemsLabel(itemCount)}</span>
                        )}
                    </div>
                    <button
                        type="button"
                        className={styles.closeBtn}
                        onClick={closeCart}
                        aria-label="Закрити кошик"
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </header>

                <div
                    className={`${styles.body} ${itemCount === 0 ? styles.bodyEmpty : ''}`}
                    id="cart-modal-body"
                >
                <div
                    className={`${styles.layout} ${itemCount === 0 ? styles.layoutEmpty : ''}`}
                >
                    <div className={styles.mainCol}>
                        <BacketItem
                            items={items}
                            statusCode={statusCode}
                            clearStatusCode={handleClearStatusCode}
                            currencie={currencyRate}
                        />

                        {itemCount > 0 && (
                            <>
                                <div className={styles.shippingBar}>
                                    <div className={styles.shippingTop}>
                                        <FontAwesomeIcon icon={faLeaf} />
                                        <div>
                                            <p className={styles.shippingTitle}>
                                                {hasFreeShipping
                                                    ? 'Безкоштовна доставка'
                                                    : 'Безкоштовна доставка'}
                                            </p>
                                            <p className={styles.shippingHint}>
                                                {hasFreeShipping
                                                    ? 'Вітаємо! Доставка для вашого замовлення безкоштовна.'
                                                    : `Додайте товарів на ${shippingRemaining.toFixed(0)} ₴ і отримайте безкоштовну доставку`}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={styles.progressTrack}>
                                        <div
                                            className={styles.progressFill}
                                            style={{ width: `${shippingProgress}%` }}
                                        />
                                    </div>
                                </div>

                                <section className={styles.checkoutSection}>
                                    <h3>Оформлення замовлення</h3>
                                    <div className={styles.formGrid}>
                                        <label className={styles.field}>
                                            <span>Прізвище, ім&apos;я, по батькові</span>
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="ПІБ"
                                                value={formData.name}
                                                onChange={handleChangeInput}
                                            />
                                        </label>
                                        <label className={styles.field}>
                                            <span>Електронна пошта</span>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="email@example.com"
                                                value={formData.email}
                                                onChange={handleChangeInput}
                                            />
                                        </label>
                                        <label className={styles.field}>
                                            <span>Номер телефону</span>
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder="+380 (__) ___ __ __"
                                                value={formData.phone}
                                                onChange={handleChangeInput}
                                            />
                                        </label>
                                        <label className={styles.field}>
                                            <span>Адреса доставки</span>
                                            <input
                                                type="text"
                                                name="address"
                                                placeholder="Місто, вулиця, будинок"
                                                value={formData.address}
                                                onChange={handleChangeInput}
                                            />
                                        </label>
                                    </div>
                                    {formError && (
                                        <p className={styles.formError}>
                                            Заповніть усі поля форми
                                        </p>
                                    )}
                                </section>
                            </>
                        )}
                    </div>

                    {itemCount > 0 && (
                        <aside className={styles.sidebar}>
                            <div className={styles.summaryCard}>
                                <h3>Ваше замовлення</h3>
                                <dl className={styles.summaryLines}>
                                    <div>
                                        <dt>{itemsLabel(itemCount)}</dt>
                                        <dd>{totalUah.toFixed(2)} ₴</dd>
                                    </div>
                                    <div>
                                        <dt>Сума товарів</dt>
                                        <dd>{totalUah.toFixed(2)} ₴</dd>
                                    </div>
                                    <div>
                                        <dt>Доставка</dt>
                                        <dd className={styles.freeDelivery}>
                                            {hasFreeShipping ? 'Безкоштовно' : 'За тарифами'}
                                        </dd>
                                    </div>
                                </dl>
                                <div className={styles.totalBox}>
                                    <span>До сплати</span>
                                    <strong>{totalUah.toFixed(2)} ₴</strong>
                                </div>
                            </div>

                            <button
                                type="button"
                                className={styles.primaryBtn}
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className={styles.spinner} />
                                ) : (
                                    <>
                                        Оформити замовлення
                                        <FontAwesomeIcon icon={faArrowRight} />
                                    </>
                                )}
                            </button>

                            <Link to="/products" className={styles.secondaryBtn} onClick={closeCart}>
                                Продовжити покупки
                            </Link>

                            <p className={styles.trustNote}>
                                <FontAwesomeIcon icon={faLock} />
                                Ваші дані під захистом
                            </p>
                        </aside>
                    )}
                </div>
                </div>

                {itemCount > 0 && (
                    <aside className={styles.mobileBar} aria-label="Підсумок замовлення">
                        <div className={styles.mobileTotal}>
                            <div>
                                <span className={styles.mobileTotalLabel}>До сплати</span>
                                <span className={styles.mobileTotalMeta}>
                                    {itemsLabel(itemCount)} ·{' '}
                                    {hasFreeShipping ? 'доставка безкоштовно' : 'доставка за тарифами'}
                                </span>
                            </div>
                            <strong>{totalUah.toFixed(2)} ₴</strong>
                        </div>
                        <button
                            type="button"
                            className={styles.primaryBtn}
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <span className={styles.spinner} />
                            ) : (
                                <>
                                    Оформити замовлення
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </>
                            )}
                        </button>
                        <Link to="/products" className={styles.secondaryBtn} onClick={closeCart}>
                            Продовжити покупки
                        </Link>
                        <p className={styles.trustNoteMobile}>
                            <FontAwesomeIcon icon={faLock} />
                            Ваші дані під захистом
                        </p>
                    </aside>
                )}

                <footer className={styles.trustFooter}>
                    <div>
                        <FontAwesomeIcon icon={faShieldHalved} />
                        <span>Якісна продукція</span>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faTruck} />
                        <span>Швидка доставка</span>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faHeadset} />
                        <span>Професійна підтримка</span>
                    </div>
                </footer>
            </div>
        </div>,
        document.body
    );
};
