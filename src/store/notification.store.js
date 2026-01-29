import { create } from 'zustand';
import notifications from '../api/notifications/index';

export const useNotificationStore = create((set, get) => ({
    notifications: [],
    loading: false,
    error: null,

    fetchNotifications: async () => {
        set({ loading: true, error: null });
        try {
            const res = await notifications.notificationsGet();
            if (res.error) {
                set({ error: res.message, loading: false });
            } else {
                set({ notifications: res.data || [], loading: false });
            }
        } catch (err) {
            set({ error: err.message || 'Error loading notifications', loading: false });
        }
    },

    addNotification: (notification) => {
        set((state) => ({
            notifications: [notification, ...state.notifications]
        }));
    },

    markAsRead: async (notificationId) => {
        try {
            const res = await notifications.notificationReadPut({ notificationId });
            if (!res.error) {
                await get().fetchNotifications();
            }
            return res;
        } catch (err) {
            return { error: true, message: err.message };
        }
    },

    markAllAsRead: async () => {
        try {
            const res = await notifications.notificationReadAllPut();
            if (!res.error) {
                await get().fetchNotifications();
            }
            return res;
        } catch (err) {
            return { error: true, message: err.message };
        }
    }
}));
