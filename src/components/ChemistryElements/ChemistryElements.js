import * as React from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import required modules
import { Pagination, Navigation } from 'swiper/modules';

import insect from '../../images/chemistry-elements/insect.svg';
import gerb from '../../images/chemistry-elements/gerb.svg';

import * as styles from './ChemistryElements.module.css';


const ChemistryArray = [
    {
        id: 1,
        name: 'гербіциди',
        img: insect,
    },
    {
        id: 2,
        name: 'фунгіциди',
        img: gerb,
    },
    {
        id: 3,
        name: 'інсектициди',
        img: insect,
    },
    {
        id: 4,
        name: 'протруйники',
        img: insect,
    },
    {
        id: 5,
        name: 'десиканти',
        img: insect,
    },
    {
        id: 6,
        name: "ад'юванти",
        img: insect,
    },
    {
        id: 7,
        name: 'добрива',
        img: insect,
    },
]

const inlineStyles = {
    btnStyles: {
        color: '#67461F',
    }
}

export const ChemistryElements = () => (
    <>
        <div className={styles.wrapper}>
            {
                ChemistryArray.map((el) => (
                    <div className={styles.elemWrapper} key={el.id}>
                        <img alt='chemistry' className={styles.bankImg} src={el.img} />
                        <p className={styles.text}>{el.name}</p>
                    </div>
                ))
            }
        </div>
        <Swiper
            style={{
                '--swiper-navigation-color': '#67461F',
                '--swiper-pagination-color': '#67461F',
            }}
            slidesPerView={3}
            spaceBetween={30}

            pagination={{
                clickable: true,
            }}
            navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                clickable: true,
            }}
            modules={[Pagination, Navigation]}
            className={styles.swiper}
        >

            {
                ChemistryArray.map((el) => (
                    <>
                        <SwiperSlide className={styles.swiperSlide} key={el.id} >
                            <div className={styles.elemWrapper} key={el.id}>
                                <div className={styles.imageWrapper}>
                                    <img alt='chemistry' className={styles.bankImg} src={el.img} />
                                </div>
                                <p className={styles.text}>{el.name}</p>
                            </div>
                        </SwiperSlide>
                    </>

                ))
            }
        </Swiper>
    </>
)