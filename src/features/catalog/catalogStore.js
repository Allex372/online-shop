import { create } from 'zustand'

const defaultSortOptions = {
  alphabet: false,
  reverseAlphabet: false,
  priceHighToLow: false,
  priceLowToHigh: false,
  availability: false,
}

const defaultViewOptions = {
  gridView: true,
  listView: false,
}

export const useCatalogStore = create((set) => ({
  openFilterModal: false,
  cultureFilter: null,
  chemistryFilter: null,
  typeFilter: null,
  sortOptions: { ...defaultSortOptions },
  searchResult: null,
  viewOptions: { ...defaultViewOptions },
  menuStatus: false,
  filterMenuStatus: false,

  handleOpenFilterModal: (boolean) => set({ openFilterModal: boolean }),

  changeCultureFilter: (result) => set({ cultureFilter: result }),
  changeChemistryFilter: (result) => set({ chemistryFilter: result }),
  changeTypeFilter: (result) => set({ typeFilter: result }),

  changeSearchResult: (result) => set({ searchResult: result }),

  handleSideBar: () => set((state) => ({ menuStatus: !state.menuStatus })),
  setMenuStatus: (menuStatus) => set({ menuStatus }),
  handleFilterMenu: () =>
    set((state) => ({ filterMenuStatus: !state.filterMenuStatus })),
  setFilterMenuStatus: (filterMenuStatus) => set({ filterMenuStatus }),

  handleSortOptionChange: (option) => {
    const resetOptions = { ...defaultSortOptions }

    switch (option) {
      case 'alphabet':
        set({ sortOptions: { ...resetOptions, alphabet: true } })
        localStorage.setItem('sortOption', JSON.stringify('alphabet'))
        break
      case 'reverseAlphabet':
        set({ sortOptions: { ...resetOptions, reverseAlphabet: true } })
        localStorage.setItem('sortOption', JSON.stringify('reverseAlphabet'))
        break
      case 'priceHighToLow':
        set({ sortOptions: { ...resetOptions, priceHighToLow: true } })
        localStorage.setItem('sortOption', JSON.stringify('priceHighToLow'))
        break
      case 'priceLowToHigh':
        set({ sortOptions: { ...resetOptions, priceLowToHigh: true } })
        localStorage.setItem('sortOption', JSON.stringify('priceLowToHigh'))
        break
      case 'availability':
        set({ sortOptions: { ...resetOptions, availability: true } })
        localStorage.setItem('sortOption', JSON.stringify('availability'))
        break
      default:
        set((state) => ({
          sortOptions: {
            ...state.sortOptions,
            [option]: !state.sortOptions[option],
          },
        }))
        break
    }
  },

  changeGridView: (option) => {
    const resetOptions = { gridView: false, listView: false }

    switch (option) {
      case 'grid':
        set({ viewOptions: { ...resetOptions, gridView: true } })
        localStorage.setItem('viewOption', JSON.stringify('grid'))
        break
      case 'list':
        set({ viewOptions: { ...resetOptions, listView: true } })
        localStorage.setItem('viewOption', JSON.stringify('list'))
        break
      default:
        set((state) => ({
          viewOptions: {
            ...state.viewOptions,
            [option]: !state.viewOptions[option],
          },
        }))
        break
    }
  },
}))

export const useFilter = () => {
  const openFilterModal = useCatalogStore((s) => s.openFilterModal)
  const cultureFilter = useCatalogStore((s) => s.cultureFilter)
  const chemistryFilter = useCatalogStore((s) => s.chemistryFilter)
  const typeFilter = useCatalogStore((s) => s.typeFilter)
  const sortOptions = useCatalogStore((s) => s.sortOptions)
  const handleSortOptionChange = useCatalogStore((s) => s.handleSortOptionChange)
  const changeCultureFilter = useCatalogStore((s) => s.changeCultureFilter)
  const changeChemistryFilter = useCatalogStore((s) => s.changeChemistryFilter)
  const changeTypeFilter = useCatalogStore((s) => s.changeTypeFilter)
  const handleOpenFilterModal = useCatalogStore((s) => s.handleOpenFilterModal)

  return {
    openFilterModal,
    cultureFilter,
    chemistryFilter,
    typeFilter,
    sortOptions,
    handleSortOptionChange,
    changeCultureFilter,
    changeChemistryFilter,
    changeTypeFilter,
    handleOpenFilterModal,
  }
}

export const useResult = () => {
  const searchResult = useCatalogStore((s) => s.searchResult)
  const changeSearchResult = useCatalogStore((s) => s.changeSearchResult)
  return { searchResult, changeSearchResult }
}

export const useView = () => {
  const viewOptions = useCatalogStore((s) => s.viewOptions)
  const changeGridView = useCatalogStore((s) => s.changeGridView)
  return { viewOptions, changeGridView }
}

export const useSideBar = () => {
  const menuStatus = useCatalogStore((s) => s.menuStatus)
  const filterMenuStatus = useCatalogStore((s) => s.filterMenuStatus)
  const handleSideBar = useCatalogStore((s) => s.handleSideBar)
  const setMenuStatus = useCatalogStore((s) => s.setMenuStatus)
  const handleFilterMenu = useCatalogStore((s) => s.handleFilterMenu)
  const setFilterMenuStatus = useCatalogStore((s) => s.setFilterMenuStatus)

  return {
    menuStatus,
    filterMenuStatus,
    handleSideBar,
    setMenuStatus,
    handleFilterMenu,
    setFilterMenuStatus,
  }
}
