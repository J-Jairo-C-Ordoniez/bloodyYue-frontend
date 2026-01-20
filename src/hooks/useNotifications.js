import notifications from '../api/notifications/index';

export default function useNotifications(variant = 'notificationsGet') {
    const variants = {
        notificationsGet: notifications.notificationsGet,
        notificationReadPut: notifications.notificationReadPut,
        notificationReadAllPut: notifications.notificationReadAllPut
    }

    return {
        notifications: variants[variant]
    }
}
