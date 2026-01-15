import { create } from "zustand";

const useLoginStore = create((set) => ({
    userAuth: null,
    setLoginData: (userAuth) => set({ userAuth }),
    clearLoginData: () => set({ userAuth: null }),
}));

export default useLoginStore;