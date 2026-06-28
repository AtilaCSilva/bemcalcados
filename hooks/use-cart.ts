import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartItem = {
  id: string
  name: string
  price: number
  size: string
  quantity: number
  image: string
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string, size: string) => void
}

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => set((state) => {
        const existingItem = state.items.find((i) => i.id === item.id && i.size === item.size)
        if (existingItem) {
          return {
            items: state.items.map((i) =>
              i.id === item.id && i.size === item.size
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          }
        }
        return { items: [...state.items, item] }
      }),
      removeItem: (id, size) => set((state) => ({
        items: state.items.filter((i) => !(i.id === id && i.size === size)),
      })),
    }),
    {
      name: 'bem-calcados-cart',
    }
  )
)