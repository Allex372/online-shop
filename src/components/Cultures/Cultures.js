import * as React from "react";
import { Link } from 'gatsby';
import { useFilter } from "../../context/FilterProvider";

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';

import помідор from '../../images/cultures/Помідор.png';
import пшениця from '../../images/cultures/пшениця.svg';
import ріпак from '../../images/cultures/ріпак_1.svg';
import соняшник from '../../images/cultures/соняшник.svg';
import соя from '../../images/cultures/соя.svg';
import яблуко from '../../images/cultures/яблуко_1.svg';
import буряк from '../../images/cultures/Буряк.svg';
import картопля from '../../images/cultures/картопля.svg';
import кукурудза from '../../images/cultures/кукурудза.svg';

import * as styles from './Culture.module.css';



const CultureArray = [
    {
        id: 1,
        name: 'зернові (пшениця, ячмінь)',
        img: пшениця,
    },
    {
        id: 2,
        name: 'соняшник',
        img: соняшник,
    },
    {
        id: 3,
        name: 'соя',
        img: соя,
    },
    {
        id: 4,
        name: 'cади, ягоди',
        img: яблуко,
    },
    {
        id: 5,
        name: 'ріпак',
        img: ріпак,
    },
    {
        id: 6,
        name: "овочі",
        img: помідор,
    },
    {
        id: 7,
        name: 'картопля',
        img: картопля,
    },
    {
        id: 8,
        name: 'кукурудза',
        img: кукурудза,
    },
    {
        id: 9,
        name: 'буряки цукрові',
        img: буряк,
    }
]

const inlineStyles = {
    btnStyles: {
        color: '#0d8041',
    }
}

export const Cultures = () => {
    const resultContext = useFilter();
    const { changeCultureFilter } = resultContext ? resultContext : {};
    const handleViewMore = (filter) => {
        // Виконуємо необхідні дії при кліку на "Дивитися детальніше"
        // Наприклад, можна відправити фільтр в gatsby-node.js

        // Виконуємо дії для фільтра filter
    };
    return (
        <div className={styles.wrapper}>

            {
                CultureArray.map((el) => (
                    <div key={el.id} className={styles.cardWrapper}>
                        <Link
                            className={styles.linkedText}
                            to={`/products/`}
                            onClick={() => changeCultureFilter(el.name)}
                        >
                            <div className={styles.imageWrapper}>
                                <img alt={el.name} src={el.img} />
                            </div>
                            <p className={styles.text}>{el.name}</p>
                        </Link>
                    </div>

                ))
            }

            <Swiper navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                clickable: true,
            }}
                modules={[Navigation]}
                className={styles.swiper}
            >

                {
                    CultureArray.map((el) => (
                        <>
                            <SwiperSlide className={styles.swiperSlide} key={el.id} >
                                <div className={styles.swiperCardWrapper}>
                                    <Link
                                        className={styles.linkedText}
                                        to={`/products/`}
                                        onClick={() => changeCultureFilter(el.name)}
                                    >
                                        <div className={styles.imageWrapper}>
                                            <img alt={el.name} src={el.img} />
                                        </div>
                                        <p className={styles.text}>{el.name}</p>
                                    </Link>
                                </div>
                            </SwiperSlide>
                        </>

                    ))
                }
                <div>
                    <div className="swiper-button-prev" style={inlineStyles.btnStyles}></div>
                    <div className="swiper-button-next" style={inlineStyles.btnStyles}></div>
                </div>
            </Swiper>

        </div>
    )
}