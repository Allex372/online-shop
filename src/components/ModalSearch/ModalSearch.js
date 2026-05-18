import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useResult } from "../../features/catalog";
import { navigate } from "gatsby";
import { useModalTransition } from "../../hooks/useModalTransition";
import * as styles from './ModalSearch.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import searchIcon from '../../images/search.svg';

export const ModalSearch = ({ isOpen, onClose }) => {
    const resultContext = useResult();
    const { changeSearchResult, searchResult } = resultContext ? resultContext : {};
    const { shouldRender, phase } = useModalTransition(isOpen, 280);
    const [mounted, setMounted] = useState(false);
    const isClosing = phase === 'closing';
    const isOpenAnim = phase === 'open';

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (shouldRender) {
            document.body.classList.add(styles.bodyNoScroll);
        } else {
            document.body.classList.remove(styles.bodyNoScroll);
        }
        return () => document.body.classList.remove(styles.bodyNoScroll);
    }, [shouldRender]);

    const handleSearch = (e) => {
        changeSearchResult(e.target.value);
    };

    const handleClearSearch = () => {
        changeSearchResult('');
    };

    const handleSetResult = () => {
        if (searchResult.length) {
            navigate('/products');
            onClose();
        }
    };

    if (!mounted || !shouldRender) return null;

    return createPortal(
        <div
            className={`${styles.overlay} ${isOpenAnim ? styles.overlayOpen : ''} ${isClosing ? styles.overlayClosing : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label="Пошук"
        >
            <button
                type="button"
                className={styles.backdrop}
                aria-label="Закрити пошук"
                onClick={onClose}
            />
            <div
                className={`${styles.panel} ${isOpenAnim ? styles.panelOpen : ''} ${isClosing ? styles.panelClosing : ''}`}
            >
                <div className={styles.wrapper}>
                    <p className={styles.title}>Пошук</p>
                    <button
                        type="button"
                        className={styles.closeModal}
                        onClick={onClose}
                        aria-label="Закрити пошук"
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Шукати"
                        onChange={(e) => handleSearch(e)}
                        value={searchResult}
                        // eslint-disable-next-line jsx-a11y/no-autofocus -- focus search field when modal opens
                        autoFocus
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSetResult();
                            }
                            if (e.key === "Escape") {
                                onClose();
                            }
                        }}
                    />
                    {searchResult?.length > 0 ? (
                        <button
                            type="button"
                            className={styles.clearIcon}
                            onClick={() => handleClearSearch()}
                            aria-label="Очистити пошук"
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    ) : (
                        <img
                            src={searchIcon}
                            className={styles.searchIcon}
                            alt=""
                        />
                    )}
                </div>

                {searchResult?.length > 0 && (
                    <button type="button" className={styles.searchButton} onClick={() => handleSetResult()}>
                        <p>Шукати</p>
                    </button>
                )}
            </div>
        </div>,
        document.body
    );
};
