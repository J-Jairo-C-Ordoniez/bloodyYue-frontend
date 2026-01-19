import { useEffect, useState } from 'react';
import notificationsApi from '../api/notifications/index';
import { socket } from '../utils/socket';
import useErrorTokenStore from '../store/errorToken.store';

/**
 * Custom hook to manage notifications
 * By default fetches all notifications (variant='list')
 */
export default function useNotifications() {
    const [notifications, setNotifications] = useState([]);
    const [isLoadingNotifications, setIsLoadingNotifications] = useState(true);
    const [errorNotifications, setErrorNotifications] = useState(null);
    const [unreadCount, setUnreadCount] = useState(0);

    const fetchNotifications = async () => {
        try {
            setIsLoadingNotifications(true);
            setErrorNotifications(null);

            const data = await notificationsApi.notificationsGet();

            if (data?.error === 401) {
                useErrorTokenStore.getState().setErrorToken(true);
                setErrorNotifications('Sesión expirada.');
            } else if (Array.isArray(data)) {
                setNotifications(data);
                const count = data.filter(n => !n.isRead).length;
                setUnreadCount(count);
            } else {
                // Handle unexpected response
                setNotifications([]);
            }
        } catch (err) {
            setErrorNotifications(err?.message || 'Error al cargar notificaciones');
        } finally {
            setIsLoadingNotifications(false);
        }
    };

    const markAsRead = async (notificationId) => {
        try {
            // Optimistic update
            setNotifications(prev => prev.map(n =>
                n.notificationId === notificationId ? { ...n, isRead: true } : n
            ));
            setUnreadCount(prev => Math.max(0, prev - 1));

            await notificationsApi.notificationReadPut({ notificationId });
        } catch (err) {
            // Revert if error? For now just log
            console.error('Error marking as read', err);
        }
    };

    const markAllAsRead = async () => {
        try {
            // Optimistic
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
            setUnreadCount(0);
            await notificationsApi.notificationReadAllPut({});
        } catch (err) {
            console.error('Error marking all as read', err);
        }
    };

    // Initial load
    useEffect(() => {
        fetchNotifications();
    }, []);

    // Socket listener for new notifications
    useEffect(() => {
        function onNotification(newNotification) {
            setNotifications(prev => [newNotification, ...prev]);
            setUnreadCount(prev => prev + 1);
        }

        socket.on('notification', onNotification); // Adjust event name based on backend

        return () => {
            socket.off('notification', onNotification);
        };
    }, []);

    return {
        notifications,
        isLoadingNotifications,
        errorNotifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        refetch: fetchNotifications
    };
}
