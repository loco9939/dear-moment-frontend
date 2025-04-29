import { create } from 'zustand';

interface productIdStoreTypes {
  productId: number;
  setProductId: (productId: number) => void;
}

export const productIdStore = create<productIdStoreTypes>(set => ({
  productId: 0,
  setProductId: (newProductoId: number) => set({ productId: newProductoId }),
}));
