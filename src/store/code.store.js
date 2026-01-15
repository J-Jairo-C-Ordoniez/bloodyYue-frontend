import { create } from "zustand";

const useCodeStore = create((set) => ({
    email: null,
    setEmail: (email) => set({ email }),
    clearEmail: () => set({ email: null }),
}));

export default useCodeStore;