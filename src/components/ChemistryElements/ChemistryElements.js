import * as React from "react";
import { Link } from "gatsby";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import insect from '../../images/chemistry-elements/insect.svg';
import gerb from '../../images/chemistry-elements/gerb.svg';

import * as styles from './ChemistryElements.module.css';

const ChemistryArray = [
    {
        id: 1,
        name: 'Гербіциди',
        linkTo: 'gerbicydy',
        img: insect,
    },
    {
        id: 2,
        name: 'Фунгіциди',
        linkTo: 'fungicydy',
        img: gerb,
    },
    {
        id: 3,
        name: 'Інсектециди',
        linkTo: 'inectecydy',
        img: insect,
    },
    {
        id: 4,
        name: 'Протруйники',
        linkTo: 'protruinyky',
        img: insect,
    },
    {
        id: 5,
        name: 'Десиканти',
        linkTo: 'desucanty',
        img: insect,
    },
    {
        id: 6,
        name: "Ад'юванти",
        linkTo: 'adiuvanty',
        img: insect,
    },
    {
        id: 7,
        name: 'Добрива',
        linkTo: 'dobryva',
        img: insect,
    },
]

export const ChemistryElements = () => (
    <>
        <div className={styles.wrapper}>
            {
                ChemistryArray.map((el) => {
                    return (
                        <Link
                            className={styles.elemWrapper}
                            key={el.id}
                            to={`/products/${encodeURIComponent(el.linkTo)}`}
                        >
                            <img alt='chemistry' className={styles.bankImg} src={el.img} />
                            <p className={styles.text}>{el.name}</p>
                        </Link>
                    )
                })
            }
        </div>
        <Swiper
            style={{
                '--swiper-pagination-color': '#742021',
            }}
            slidesPerView={3}
            spaceBetween={30}

            pagination={{
                clickable: true,
            }}
            modules={[Pagination]}
            className={styles.swiper}
        >

            {
                ChemistryArray.map((el) => (
                    <>
                        <SwiperSlide className={styles.swiperSlide} key={el.id} >
                            <Link
                                className={styles.elemWrapper}
                                key={el.id}
                                to={`/products/${encodeURIComponent(el.linkTo)}`}
                            >
                                <div className={styles.elemWrapper} key={el.id}>
                                    <div className={styles.imageWrapper}>
                                        <img alt='chemistry' className={styles.bankImg} src={el.img} />
                                    </div>
                                    <p className={styles.text}>{el.name}</p>
                                </div>
                            </Link>
                        </SwiperSlide>
                    </>

                ))
            }
        </Swiper>
    </>
)