import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const computeItemsWithSum = (items) => {
  const itemsWithSum = items.map((item) => {
    const countValue = item.count || 1
    const sum = item.price * countValue
    return { ...item, sum }
  })

  const totalSum = itemsWithSum.reduce((acc, item) => acc + item.sum, 0)

  return { itemsWithSum, totalSum }
}

export const useCartStore = create(
  persist(
    (set, get) => ({
      showBacket: false,
      items: [],
      itemsWithSum: [],
      totalSum: 0,

      handleOpenBacket: () =>
        set((state) => ({ showBacket: !state.showBacket })),

      addItemToBacket: (item) => {
        const items = [...get().items, item]
        const totals = computeItemsWithSum(items)
        set({ items, ...totals })
      },

      clearBacket: () =>
        set({ items: [], itemsWithSum: [], totalSum: 0 }),

      removeItemFromBacket: (url) => {
        const items = get().items.filter((item) => item.url !== url)
        const totals = computeItemsWithSum(items)
        set({ items, ...totals })
      },

      updateItemCount: (itemId, newCount) => {
        const count = Math.max(1, newCount)
        const items = get().items.map((item) =>
          item.id === itemId ? { ...item, count } : item
        )
        const totals = computeItemsWithSum(items)
        set({ items, ...totals })
      },
    }),
    {
      name: 'backetProducts',
      partialize: (state) => ({ items: state.items }),
      merge: (persisted, current) => {
        const items = persisted?.items ?? current.items
        return { ...current, items, ...computeItemsWithSum(items) }
      },
    }
  )
)

export const useBacket = () => {
  const showBacket = useCartStore((s) => s.showBacket)
  const items = useCartStore((s) => s.items)
  const itemsWithSum = useCartStore((s) => s.itemsWithSum)
  const totalSum = useCartStore((s) => s.totalSum)
  const handleOpenBacket = useCartStore((s) => s.handleOpenBacket)
  const addItemToBacket = useCartStore((s) => s.addItemToBacket)
  const updateItemCount = useCartStore((s) => s.updateItemCount)
  const removeItemFromBacket = useCartStore((s) => s.removeItemFromBacket)
  const clearBacket = useCartStore((s) => s.clearBacket)

  return {
    showBacket,
    items,
    itemsWithSum,
    totalSum,
    handleOpenBacket,
    addItemToBacket,
    updateItemCount,
    removeItemFromBacket,
    clearBacket,
  }
}
