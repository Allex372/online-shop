import * as React from "react";
import { Link } from 'gatsby';
import { useFilter } from "../../features/catalog";

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
    { id: 3, name: 'соя', img: соя },
    { id: 1, name: 'зернові (пшениця, ячмінь)', img: пшениця },
    { id: 4, name: 'сади, ягоди', img: яблуко },
    { id: 2, name: 'соняшник', img: соняшник },
    { id: 5, name: 'ріпак', img: ріпак },
    { id: 6, name: 'овочі', img: помідор },
    { id: 7, name: 'картопля', img: картопля },
    { id: 8, name: 'кукурудза', img: кукурудза },
    { id: 9, name: 'буряки цукрові', img: буряк },
];

export const Cultures = () => {
    const { changeCultureFilter } = useFilter() || {};

    return (
        <div className={styles.grid}>
            {CultureArray.map((el) => (
                <article key={el.id} className={styles.card}>
                    <Link
                        className={styles.link}
                        to="/products/"
                        onClick={() => changeCultureFilter?.(el.name)}
                    >
                        <div className={styles.imageWrapper}>
                            <img alt={el.name} src={el.img} loading="lazy" />
                        </div>
                        <p className={styles.text}>{el.name}</p>
                    </Link>
                </article>
            ))}
        </div>
    );
};
