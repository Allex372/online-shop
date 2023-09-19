import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useBacket } from '../../context/BacketProvider';
import { BacketItem } from './BacketItem/BacketItem';

import * as styles from './Backet.module.css';

import closeIcon from '../../images/close.png'

export const Backet = () => {
    const backetContext = useBacket();
    const { showBacket, handleOpenBacket, items, totalSum, itemsWithSum, clearBacket } = backetContext ? backetContext : {};
    const [isOffered, setIsOffered] = useState({
        preparedToOffer: true,
        readyToOffer: false,
        offered: false,
    });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    const [formDataValid, setFormDataValid] = useState(false);
    const [statusCode, setStatusCode] = useState(null);

    useEffect(() => {
        const newIsOffered = {
            preparedToOffer: true,
            readyToOffer: false,
            offered: false,
        };
        if (isOffered.offered && formDataValid) {
            const orderData = {
                fullName: formData.name,
                phoneNumber: formData.phone,
                email: formData.email,
                address: formData.address,
                products: [],
                totalAmount: 0,
            };


            itemsWithSum.forEach((item) => {
                const productItem = {
                    id: item.id,
                    productName: item.name,
                    quantity: item.count ? item.count : 1,
                    price: item.price,
                    totalAmount: item.sum,
                };
                orderData.products.push(productItem);
                orderData.totalAmount = totalSum;
            });

            // https://dry-tundra-95600-dbbf09fef1a1.herokuapp.com
            // const authToken = 'f2b4b4c902a5bfef18210081047d68b5adb75c6b5e429b980bf7f05177b50ab6901b328028c390978f35633cc68222d1a45d92b9cc4b9ec16c2fcfc1180cecd36a87af249a1391a2de880488bdce6054e9b98245e1843d55b757da78e76dd7bb9644ff49d9dfb2acf14d1cd67950b09466022064f4f1e3a20ca638ed6de1bbb1'
            // axios.post('http://localhost:1337/api/orders', orderData, {
            //     headers: {
            //         Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN_LOCAL}`,
            //     },
            // })
            axios.post('https://dry-tundra-95600-dbbf09fef1a1.herokuapp.com/api/orders', orderData, {
                headers: {
                    Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN_HEROKU}`,
                },
            })
                .then(response => {
                    // Обробити відповідь сервера, якщо потрібно
                    setStatusCode(response.data);
                    setIsOffered(newIsOffered);
                })
                .catch(error => {
                    // Обробити помилку, якщо потрібно
                    console.error('Помилка відправки на сервер Strapi:', error);
                    setIsOffered(newIsOffered);
                });
        }
    }, [isOffered]);

    useEffect(() => {
        statusCode == 200 && clearBacket();
    }, [statusCode])

    useEffect(() => {
        if (showBacket) {
            document.body.classList.add(styles.bodyNoScroll);
        } else {
            document.body.classList.remove(styles.bodyNoScroll);
        }
    }, [showBacket]);

    const handleOffered = (status) => {
        const newIsOffered = {
            preparedToOffer: false,
            readyToOffer: false,
            offered: false,
        };

        switch (status) {
            case 'preparedToOffer':
                newIsOffered.preparedToOffer = true;
                break;
            case 'readyToOffer':
                newIsOffered.readyToOffer = true;
                break;
            case 'offered':
                newIsOffered.offered = true;
                break;
            default:
                break;
        }

        if (status === 'offered') {
            const isFormValid = Object.values(formData).every((value) => value.trim() !== '');
            setFormDataValid(isFormValid);
            newIsOffered.readyToOffer = true;
        }

        setIsOffered(newIsOffered);
    };

    const handleChangeInput = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleClearStatusCode = () => {
        const modal = document.getElementById('modal');
        modal.scrollTo({ top: 0, behavior: 'smooth' })
        setStatusCode(null);
    }

    return (
        <>
            {showBacket && (
                <div className={`${styles.container} ${styles.open}`}>
                    <div className={styles.modal} id='modal'>
                        <div className={styles.backetHeaderWrapper}>
                            <p>Корзина</p>
                            <div className={styles.closeBntIconWrapper} onClick={() => handleOpenBacket()}>
                                <img src={closeIcon} alt='close' />
                            </div>
                        </div>
                        <div className={styles.itemWrapper}>
                            <BacketItem items={items} statusCode={statusCode} clearStatusCode={handleClearStatusCode} />
                        </div>
                        <div className={`${styles.offerFormWrapper} ${isOffered.readyToOffer && items?.length ? styles.openForm : ''}`}>
                            <p className={styles.offeredText}>Оформлення замовлення:</p>
                            <div className={`${isOffered.readyToOffer ? styles.formContainer : styles.displayNone}`}>
                                <div className={styles.inputsWrapper}>
                                    <div className={styles.inputWrapper}>
                                        <label className={styles.label}>Прізвище, і'мя, по батькові</label>
                                        <input
                                            className={styles.input}
                                            type="text"
                                            placeholder="ПІП"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChangeInput}
                                        />
                                    </div>
                                    <div className={styles.inputWrapper}>
                                        <label className={styles.label}>Електронна пошта</label>
                                        <input
                                            className={styles.input}
                                            type="text"
                                            placeholder="Введіть електронну пошту"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChangeInput}
                                        />
                                    </div>
                                </div>

                                <div className={styles.inputsWrapper}>
                                    <div className={styles.inputWrapper}>
                                        <label className={styles.label}>Номер телефону</label>
                                        <input
                                            className={styles.input}
                                            type="text"
                                            placeholder="Введіть номер телефону"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChangeInput}
                                        />
                                    </div>
                                    <div className={styles.inputWrapper}>
                                        <label className={styles.label}>Адреса доставки</label>
                                        <input
                                            className={styles.input}
                                            type="text"
                                            placeholder="Введіть вашу адресу"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChangeInput}
                                        />
                                    </div>
                                </div>

                            </div>

                            {(isOffered.offered && !formDataValid) && (<p className={styles.warningText}>Всі поля повинні бути заповнені</p>)}

                        </div>
                        {
                            items?.length ?

                                <div className={styles.summBlockWrapper}>
                                    <div className={styles.summBlock}>
                                        <p className={styles.sumText}>{totalSum}₴</p>
                                        {
                                            isOffered.preparedToOffer &&
                                            <button className={styles.orderBtn} onClick={() => handleOffered('readyToOffer')}>
                                                Оформити замовлення
                                            </button>
                                        }
                                        {
                                            isOffered.readyToOffer &&
                                            <button className={styles.orderBtn} onClick={() => handleOffered('offered')}>
                                                {isOffered.offered ? <div className={styles.spinner} /> : 'Замовити'}
                                            </button>
                                        }

                                    </div>
                                </div>
                                :
                                <></>
                        }
                    </div>
                </div>
            )
            }
        </>
    );
};
