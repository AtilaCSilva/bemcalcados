import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoritesStore {
  favoriteIds: string[]
  toggleFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
}

export const useFavorites = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      toggleFavorite: (id) => set((state) => ({
        favoriteIds: state.favoriteIds.includes(id)
          ? state.favoriteIds.filter((favId) => favId !== id)
          : [...state.favoriteIds, id]
      })),
      isFavorite: (id) => get().favoriteIds.includes(id),
    }),
    {
      name: 'bem-calcados-favorites', // nome da chave no Local Storage
    }
  )
)