import * as React from "react";
import { Link } from "gatsby";
import { useFilter } from "../../context/FilterProvider";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, EffectCoverflow, Navigation } from 'swiper/modules';

import adiuvant from '../../images/chemistry-elements/adiuvant.svg';
import desuc from '../../images/chemistry-elements/desuc.svg';
import dobruv from '../../images/chemistry-elements/dobruv.svg';
import fung from '../../images/chemistry-elements/fung.svg';
import insect from '../../images/chemistry-elements/insect.svg';
import gerb from '../../images/chemistry-elements/gerb.svg';
import protrui from '../../images/chemistry-elements/protrui.svg';
import stimul from '../../images/chemistry-elements/Стимулятори-росту.svg';

import * as styles from './ChemistryElements.module.css';

const ChemistryArray = [
    {
        id: 1,
        name: 'Гербіциди',
        img: gerb,
    },
    {
        id: 2,
        name: 'Фунгіциди',
        img: fung,
    },
    {
        id: 3,
        name: 'Інсектициди',
        img: insect,
    },
    {
        id: 4,
        name: 'Протруйники',
        img: protrui,
    },
    {
        id: 5,
        name: 'Десиканти',
        img: desuc,
    },
    {
        id: 6,
        name: "Прилипачі (ад'юванти)",
        img: adiuvant,
    },
    {
        id: 7,
        name: 'Добрива',
        img: dobruv,
    },
    {
        id: 7,
        name: 'Стимулятори росту, мікродобрива',
        img: stimul,
    },
]

const inlineStyles = {
    btnStyles: {
        color: '#0d8041',
    }
}

export const ChemistryElements = () => {
    const resultContext = useFilter();
    const { changeChemistryFilter } = resultContext ? resultContext : {};
    return (
        <>
            <div className={styles.wrapper}>
                {
                    ChemistryArray.map((el) => {
                        return (
                            <Link
                                className={styles.elemWrapper}
                                key={el.id}
                                to={`/products`}
                                onClick={() => changeChemistryFilter(el.name)}
                            >
                                <img alt='chemistry' className={styles.bankImg} src={el.img} />
                                <p className={styles.text}>{el.name}</p>
                            </Link>
                        )
                    })
                }
            </div>
            <Swiper
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView="auto"
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    clickable: true,
                }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className={styles.swiperContainer}
            >
                {ChemistryArray?.map((el) => {
                    return (
                        <SwiperSlide key={el?.id} className={styles.swiperSlide}>
                            <Link
                                className={styles.elemWrapper}
                                key={el.id}
                                to={`/products/`}
                                onClick={() => changeChemistryFilter(el.name)}
                            >
                                <div className={styles.elemWrapper} key={el.id}>
                                    <div className={styles.imageWrapper}>
                                        <img alt='chemistry' className={styles.bankImg} src={el.img} />
                                    </div>
                                    <p className={styles.text}>{el.name}</p>
                                </div>
                            </Link>
                        </SwiperSlide>
                    );
                })}
                <div className={styles.sliderControler}>
                    <div className="swiper-button-prev" style={inlineStyles.btnStyles}>
                        <i class="fa-solid fa-chevron-left"></i>
                    </div>
                    <div className="swiper-button-next" style={inlineStyles.btnStyles}>
                        <i class="fa-solid fa-chevron-right"></i>
                    </div>
                </div>
            </Swiper>
        </>
    )
}