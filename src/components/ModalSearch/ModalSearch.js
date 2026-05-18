import React from "react";
import { useResult } from "../../features/catalog";
import { navigate } from "gatsby";
import * as styles from './ModalSearch.module.css';

import close from '../../images/close.png';
import searchIcon from '../../images/search.svg';

export const ModalSearch = ({ setMobileSearchModal }) => {
    // const [openModal, setOpenModal] = useState(false);
    const resultContext = useResult();
    const { changeSearchResult, searchResult } = resultContext ? resultContext : {};


    // useEffect(() => {
    //     isOpened && setOpenModal(true);
    // }, [isOpened]);

    // useEffect(() => {
    //     console.log(isOpened, 'isOpened');
    //     console.log(openModal, 'openModal');
    // }, [isOpened, openModal]);

    const handleSearch = (e) => {
        changeSearchResult(e.target.value);
    }

    const handleClearSearch = () => {
        changeSearchResult('');
    }

    const handleSetResult = () => {
        if (searchResult.length) {
            navigate('/products');
        }
    }

    return (
        <div className={`${styles.wrapperOpened}`}>

            <div className={styles.wrapper}>
                <p className={styles.title}>Пошук</p>
                <div>
                    <button
                        type="button"
                        className={styles.closeModal}
                        onClick={() => setMobileSearchModal(false)}
                        aria-label="Закрити пошук"
                    >
                        <img src={close} alt="" />
                    </button>
                </div>
            </div>
            <div className={styles.searchContainer}>

                <div>
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Шукати"
                        onChange={(e) => handleSearch(e)}
                        value={searchResult}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSetResult();
                            }
                        }}
                    />
                </div>

                {searchResult?.length > 0 ?
                    <>
                        <button
                            type="button"
                            className={styles.clearIcon}
                            onClick={() => handleClearSearch()}
                            aria-label="Очистити пошук"
                        >
                            <img src={close} alt="" />
                        </button>
                    </>
                    :
                    <img
                        src={searchIcon}
                        className={styles.searchIcon}
                        alt="Search Icon"
                    />
                }


            </div>

            {searchResult?.length > 0 &&
                <button type="button" className={styles.searchButton} onClick={() => handleSetResult()}>
                    <p>Шукати</p>
                </button>
            }
        </div>
    )
}