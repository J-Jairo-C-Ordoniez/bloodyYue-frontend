import { useEffect } from 'react';
import { useNotificationStore } from '../store/notification.store';

export default function useNotifications() {
    const {
        notifications,
        loading,
        error,
        fetchNotifications,
        markAsRead,
        markAllAsRead
    } = useNotificationStore();

    useEffect(() => {
        if (notifications.length === 0 && !loading && !error) {
            fetchNotifications();
        }
    }, [fetchNotifications]);

    return {
        notifications,
        loading,
        error,
        refreshNotifications: fetchNotifications,
        markAsRead,
        markAllAsRead
    };
}

