import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useModalTransition } from '../../hooks/useModalTransition';
import * as styles from './ImageModal.module.css';

export const ImageModal = ({ isOpen, data, onClose, title = 'Регламент застосування' }) => {
    const [mounted, setMounted] = useState(false);
    const { shouldRender, phase } = useModalTransition(isOpen, 280);
    const isClosing = phase === 'closing';
    const isOpenAnim = phase === 'open';

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!shouldRender) return undefined;

        document.body.classList.add(styles.bodyNoScroll);

        const onEscape = (e) => {
            if (e.key === 'Escape') onClose?.();
        };
        document.addEventListener('keydown', onEscape);

        return () => {
            document.body.classList.remove(styles.bodyNoScroll);
            document.removeEventListener('keydown', onEscape);
        };
    }, [shouldRender, onClose]);

    if (!mounted || !shouldRender || !data) return null;

    return createPortal(
        <div
            className={`${styles.overlay} ${isOpenAnim ? styles.overlayOpen : ''} ${isClosing ? styles.overlayClosing : ''}`}
            role="presentation"
            onClick={onClose}
        >
            <div
                className={`${styles.modal} ${isOpenAnim ? styles.modalOpen : ''} ${isClosing ? styles.modalClosing : ''}`}
                role="dialog"
                aria-modal="true"
                aria-label={title}
                onClick={(e) => e.stopPropagation()}
            >
                <header className={styles.header}>
                    <h2 className={styles.title}>{title}</h2>
                    <button
                        type="button"
                        className={styles.closeBtn}
                        onClick={onClose}
                        aria-label="Закрити"
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </header>
                <div className={styles.imgWrapper}>
                    <img src={data} alt={title} className={styles.imgTable} />
                </div>
                <p className={styles.hint}>
                    На мобільному можна збільшити зображення подвійним дотиком
                </p>
            </div>
        </div>,
        document.body
    );
};
