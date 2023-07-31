import React, { useEffect, useState } from 'react';
import { useBacket } from '../../context/BacketProvider';
import { BacketItem } from './BacketItem/BacketItem';

import * as styles from './Backet.module.css';

import closeIcon from '../../images/close.png'

export const Backet = () => {
    const { showBacket, handleOpenBacket } = useBacket();
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

    useEffect(() => {
        if (isOffered.offered && formDataValid) {
            handleOffered('preparedToOffer');
            handleOpenBacket();
        }
    }, [isOffered]);

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

    return (
        <>
            {showBacket && (
                <div className={`${styles.container} ${styles.open}`}>
                    <div className={styles.modal}>
                        <div className={styles.backetHeaderWrapper}>
                            <p>Корзина</p>
                            <div className={styles.closeBntIconWrapper} onClick={() => handleOpenBacket()}>
                                <img src={closeIcon} alt='close' />
                            </div>
                        </div>
                        <div className={styles.itemWrapper}>
                            <BacketItem />
                        </div>
                        <div className={`${styles.offerFormWrapper} ${isOffered.readyToOffer ? styles.openForm : ''}`}>
                            <p className={styles.offeredText}>Оформлення замовлення:</p>
                            <div className={`${isOffered.readyToOffer ? styles.formContainer : styles.displayNone}`}>
                                <div className={styles.inputsWrapper}>
                                    <div className={styles.inputWrapper}>
                                        <label className={styles.label}>ПІП</label>
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
                        <div className={styles.summBlockWrapper}>
                            <div className={styles.summBlock}>
                                <p className={styles.sumText}>700₴</p>
                                {
                                    isOffered.preparedToOffer &&
                                    <button className={styles.orderBtn} onClick={() => handleOffered('readyToOffer')}>
                                        Оформити замовлення
                                    </button>
                                }
                                {
                                    isOffered.readyToOffer &&
                                    <button className={styles.orderBtn} onClick={() => handleOffered('offered')}>
                                        Замовити
                                    </button>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    );
};
