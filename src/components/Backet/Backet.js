import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { graphql, useStaticQuery } from 'gatsby';
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

    const data = useStaticQuery(graphql`
        query {
            rest {
                currencies {
                    data {
                        attributes {
                            value
                        }
                    }
                }
            }
        }
    `);

    const Currencie = data?.rest?.currencies?.data[0]?.attributes.value;

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
                    id: +item.id,
                    productName: item.name,
                    quantity: item.count ? item.count : 1,
                    price: +(item.price * Currencie).toFixed(2),
                    totalAmount: +(item.sum * Currencie).toFixed(2),
                };
                orderData.products.push(productItem);
                orderData.totalAmount = +(totalSum * Currencie).toFixed(2);
            });

            axios.post('https://dry-tundra-95600-dbbf09fef1a1.herokuapp.com/api/orders', orderData, {
                headers: {
                    Authorization: `Bearer f98b10acb8958a3d9ba99650cbf0480ebd5e93222f49a844e98c560a8d178711d159d6e4ca8e7428b85d8967b94acf24e9dc31429b80eeadb4f0e08d5ef14564b8fa923ed239d233936f079f720f2796f94f50b9cc0f2bf90234b85be8220a96a8c92391deeccb98bf50cbb54018d81604da4315d23d020925ffff15e22167d4`,
                },
            })
                .then(response => {
                    setStatusCode(+response.data);
                    setIsOffered(newIsOffered);
                })
                .catch(error => {
                    console.error('Помилка відправки на сервер Strapi:', error);
                    setIsOffered(newIsOffered);
                });
        }
    }, [isOffered, Currencie, formData, formDataValid, itemsWithSum, totalSum]);

    useEffect(() => {
        statusCode === 200 && clearBacket();
    }, [statusCode, clearBacket])

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
                            <div
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        handleOpenBacket();
                                    }
                                }}
                                role="button"
                                tabIndex={0}
                                className={styles.closeBntIconWrapper} onClick={() => handleOpenBacket()}>
                                <img src={closeIcon} alt='close' />
                            </div>
                        </div>
                        <div className={styles.itemWrapper}>
                            <BacketItem items={items} statusCode={statusCode} clearStatusCode={handleClearStatusCode} currencie={Currencie} />
                        </div>
                        <div className={`${styles.offerFormWrapper} ${isOffered.readyToOffer && items?.length ? styles.openForm : ''}`}>
                            <p className={styles.offeredText}>Оформлення замовлення:</p>
                            <div className={`${isOffered.readyToOffer ? styles.formContainer : styles.displayNone}`}>
                                <div className={styles.inputsWrapper}>
                                    <div className={styles.inputWrapper}>
                                        <label htmlFor="name" className={styles.label}>Прізвище, і'мя, по батькові</label>
                                        <input
                                            id="name"
                                            className={styles.input}
                                            type="text"
                                            placeholder="ПІП"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChangeInput}
                                        />
                                    </div>
                                    <div className={styles.inputWrapper}>
                                        <label htmlFor="email" className={styles.label}>Електронна пошта</label>
                                        <input
                                            id="email"
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
                                        <label htmlFor="phone" className={styles.label}>Номер телефону</label>
                                        <input
                                            id="phone"
                                            className={styles.input}
                                            type="text"
                                            placeholder="Введіть номер телефону"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChangeInput}
                                        />
                                    </div>
                                    <div className={styles.inputWrapper}>
                                        <label htmlFor="address" className={styles.label}>Адреса доставки</label>
                                        <input
                                            id="address"
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
                                        <p className={styles.sumText}>{(totalSum * Currencie).toFixed(1)}₴</p>
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
