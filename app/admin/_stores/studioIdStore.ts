import { create } from 'zustand';

interface studioIdStoreTypes {
  id: number;
  setStudioId: (studioId: number) => void;
}

export const studioIdStore = create<studioIdStoreTypes>(set => ({
  id: 0,
  setStudioId: (newStudioId: number) => set({ id: newStudioId }),
}));
