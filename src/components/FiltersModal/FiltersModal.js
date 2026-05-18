import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useFilter } from '../../features/catalog';
import { FilterComponent } from '../FilterComponent';
import { useModalTransition } from '../../hooks/useModalTransition';
import * as styles from './FiltersModal.module.css';

export const FiltersModal = ({
    isOpen,
    result,
    chemistryFilter,
    cultureFilter,
    typeFilter,
    categoryPageSlug = null,
}) => {
    const { handleOpenFilterModal } = useFilter();
    const { shouldRender, phase } = useModalTransition(isOpen, 280);
    const isClosing = phase === 'closing';
    const isOpenAnim = phase === 'open';

    useEffect(() => {
        if (shouldRender) {
            document.body.classList.add(styles.bodyNoScroll);
        } else {
            document.body.classList.remove(styles.bodyNoScroll);
        }
        return () => document.body.classList.remove(styles.bodyNoScroll);
    }, [shouldRender]);

    if (!shouldRender) return null;

    const close = () => handleOpenFilterModal(false);

    return createPortal(
        <div
            className={`${styles.overlay} ${isOpenAnim ? styles.overlayOpen : ''} ${isClosing ? styles.overlayClosing : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label="Фільтри"
        >
            <button
                type="button"
                className={styles.backdrop}
                aria-label="Закрити фільтри"
                onClick={close}
            />
            <div className={`${styles.panel} ${isOpenAnim ? styles.panelOpen : ''} ${isClosing ? styles.panelClosing : ''}`}>
                <FilterComponent
                    result={result}
                    chemistryFilter={chemistryFilter}
                    cultureFilter={cultureFilter}
                    typeFilter={typeFilter}
                    categoryPageSlug={categoryPageSlug}
                />
            </div>
        </div>,
        document.body
    );
};
