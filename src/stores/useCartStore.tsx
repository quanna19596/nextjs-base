import { create } from "zustand";
import { TProduct } from "@/services/sample/products/types";

type TCartStore = {
  cartItems: TProduct[];
  addCartItem: (item: TProduct) => void;
  removeCartItem: (itemId: number) => void;
  updateCartItem: (itemId: number, item: TProduct) => void;
};

const useCartStore = create<TCartStore>((set) => ({
  cartItems: [],
  addCartItem: (item) => set((state) => ({ cartItems: [...state.cartItems, item] })),

  removeCartItem: (itemId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((cartItem) => cartItem.id !== itemId),
    })),

  updateCartItem: (itemId, item) =>
    set((state) => ({
      cartItems: state.cartItems.map((cartItem) =>
        cartItem.id === itemId ? { ...cartItem, ...item } : cartItem,
      ),
    })),
}));

export default useCartStore;
