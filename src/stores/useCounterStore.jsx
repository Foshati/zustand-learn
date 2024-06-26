import { create } from "zustand";
import { persist } from "zustand/middleware";

const encrypt = (text) => {
  return window.btoa(unescape(encodeURIComponent(text)));
};

const decrypt = (encodedText) => {
  return decodeURIComponent(escape(window.atob(encodedText)));
};

export const useCounterStore = create(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
      reset: () => set({ count: 0 }),
    }),
    {
      name: "count-storage",
      getStorage: () => localStorage,
      serialize: (state) => encrypt(JSON.stringify(state)),
      deserialize: (str) => JSON.parse(decrypt(str)),
    }
  )
);
