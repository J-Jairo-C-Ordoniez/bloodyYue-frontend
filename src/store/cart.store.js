import { create } from 'zustand';
import cart from '../api/cart/index';

export const useCartStore = create((set, get) => ({
    cartItems: [],
    loading: false,
    error: null,

    fetchCart: async () => {
        set({ loading: true, error: null });
        try {
            const res = await cart.cartItemsGet();
            if (res.error) {
                set({ error: res.message, loading: false });
            } else {
                set({ cartItems: res.data || [], loading: false });
            }
        } catch (err) {
            set({ error: err.message || 'Error loading cart', loading: false });
        }
    },

    addItem: async (itemData) => {
        set({ loading: true });
        try {
            const res = await cart.cartItemsPost({ data: itemData });
            if (!res.error) {
                await get().fetchCart();
            }
            set({ loading: false });
            return res;
        } catch (err) {
            set({ loading: false });
            return { error: true, message: err.message };
        }
    },

    discardItem: async (id) => {
        try {
            const res = await cart.cartItemDiscardedPatch({ id });
            if (!res.error) {
                await get().fetchCart();
            }
            return res;
        } catch (err) {
            return { error: true, message: err.message };
        }
    },

    updateItem: async (id, data) => {
        try {
            const res = await cart.cartItemPut({ id, data });
            if (!res.error) {
                await get().fetchCart();
            }
            return res;
        } catch (err) {
            return { error: true, message: err.message };
        }
    }
}));
