import { create } from "zustand";

const useErrorTokenStore = create((set) => ({
    errorToken: false,
    setErrorToken: (errorToken) => set({ errorToken }),
}));

export default useErrorTokenStore;