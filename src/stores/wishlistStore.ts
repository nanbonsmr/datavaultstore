import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface WishlistStore {
  handles: string[];
  toggle: (handle: string) => void;
  has: (handle: string) => boolean;
  clear: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      handles: [],
      toggle: (handle) => {
        const current = get().handles;
        set({
          handles: current.includes(handle)
            ? current.filter((h) => h !== handle)
            : [...current, handle],
        });
      },
      has: (handle) => get().handles.includes(handle),
      clear: () => set({ handles: [] }),
    }),
    {
      name: 'datavault-wishlist',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
