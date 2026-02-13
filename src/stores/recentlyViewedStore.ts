import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface RecentItem {
  handle: string;
  title: string;
  imageUrl: string;
  price: string;
  currencyCode: string;
}

interface RecentlyViewedStore {
  items: RecentItem[];
  add: (item: RecentItem) => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) => {
        const filtered = get().items.filter((i) => i.handle !== item.handle);
        set({ items: [item, ...filtered].slice(0, 10) });
      },
    }),
    {
      name: 'datavault-recently-viewed',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
