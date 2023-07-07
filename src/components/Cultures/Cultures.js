import * as React from "react";
import * as styles from './Culture.module.css';
import помідор from '../../images/cultures/Помідор.svg';
import пшениця from '../../images/cultures/пшениця.svg';
import ріпак from '../../images/cultures/ріпак_1.svg';
import соняшник from '../../images/cultures/соняшник.svg';
import соя from '../../images/cultures/соя.svg';
import яблуко from '../../images/cultures/яблуко_1.svg';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';

const CultureArray = [
    {
        id: 1,
        name: 'пшениця',
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
        name: 'яблуня',
        img: яблуко,
    },
    {
        id: 5,
        name: 'ріпак',
        img: ріпак,
    },
    {
        id: 6,
        name: "томати",
        img: помідор,
    },
]

const inlineStyles = {
    btnStyles: {
        color: '#67461F',
    }
}

export const Cultures = () => (
    <div className={styles.wrapper}>

        {
            CultureArray.map((el) => (
                <div key={el.id} className={styles.cardWrapper}>
                    <div className={styles.imageWrapper}>
                        <img alt={el.name} src={el.img} />
                    </div>
                    <p className={styles.text}>{el.name}</p>
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
                                <div className={styles.imageWrapper}>
                                    <img alt={el.name} src={el.img} />
                                </div>
                                <p className={styles.text}>{el.name}</p>
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