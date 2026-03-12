import { ProductTypes } from "@/types/product.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProductsState {
  cachedProducts: ProductTypes[];
  setCachedProducts: (products: ProductTypes[]) => void;
}

export const useProductsStore = create<ProductsState>()(
  persist(
    (set) => ({
      cachedProducts: [],
      setCachedProducts: (products) => set({ cachedProducts: products }),
    }),
    {
      name: "marketplace-products",
    },
  ),
);
