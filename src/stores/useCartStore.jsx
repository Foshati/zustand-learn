import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cart: [],
  addToCart: (product) => set((state) => ({ cart: [...state.cart, product] })),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),
  clearCart: () => set({ cart: [] }),
  getTotalPrice: () => {
    return get().cart.reduce((sum, item) => sum + item.price, 0);
  },
}));
