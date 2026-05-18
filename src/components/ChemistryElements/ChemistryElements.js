import * as React from "react";
import { Link } from "gatsby";
import { useFilter } from "../../features/catalog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLeaf,
    faShieldHalved,
    faBug,
    faFlask,
    faSun,
    faDroplet,
    faSeedling,
    faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import {
    CHEMISTRY_CATEGORIES,
    getCategoryPath,
} from "../../lib/chemistryCategories";

import * as styles from './ChemistryElements.module.css';

const ICONS = {
    herbicydy: faLeaf,
    fungicydy: faShieldHalved,
    insekticydy: faBug,
    protrujnyky: faFlask,
    desikanty: faSun,
    'prylypachi-aduvanty': faDroplet,
    dobryva: faSeedling,
    'stymulyatory-rostu': faChartLine,
};

const ACCENTS = {
    herbicydy: '#15803d',
    fungicydy: '#0d9488',
    insekticydy: '#ca8a04',
    protrujnyky: '#7c3aed',
    desikanty: '#ea580c',
    'prylypachi-aduvanty': '#0284c7',
    dobryva: '#16a34a',
    'stymulyatory-rostu': '#059669',
};

const CATEGORIES = CHEMISTRY_CATEGORIES.map((cat) => ({
    ...cat,
    icon: ICONS[cat.slug],
    accent: ACCENTS[cat.slug],
}));

const matchesFilter = (activeFilter, filterValue) => {
    if (!activeFilter) return false;
    return activeFilter.toLowerCase().trim() === filterValue.toLowerCase().trim();
};

const CategoryCard = ({ item, isActive }) => (
    <Link
        to={getCategoryPath(item.slug)}
        className={`${styles.card} ${isActive ? styles.cardActive : ''}`}
        style={{ '--accent': item.accent }}
        aria-current={isActive ? 'true' : undefined}
    >
        <span className={styles.iconRing}>
            <FontAwesomeIcon icon={item.icon} className={styles.icon} />
        </span>
        <span className={styles.label}>{item.name}</span>
    </Link>
);

export const ChemistryElements = ({ variant = 'full', activeSlug = null }) => {
    const { chemistryFilter } = useFilter() || {};
    const isNav = variant === 'nav';

    return (
        <section
            className={`${styles.section} ${isNav ? styles.sectionNav : ''}`}
            aria-label="Категорії товарів"
        >
            <div className={styles.inner}>
                {!isNav && (
                    <div className={styles.header}>
                        <h2 className={styles.heading}>Каталог засобів захисту рослин</h2>
                        <p className={styles.subheading}>
                            Оберіть категорію — покажемо відповідні товари
                        </p>
                    </div>
                )}

                <div className={styles.grid} role="list">
                    {CATEGORIES.map((item) => (
                        <CategoryCard
                            key={item.id}
                            item={item}
                            isActive={
                                activeSlug
                                    ? activeSlug === item.slug
                                    : matchesFilter(chemistryFilter, item.filterValue)
                            }
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
