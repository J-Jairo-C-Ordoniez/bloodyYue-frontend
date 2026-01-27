import { useState, useEffect, useCallback } from 'react';
import notifications from '../api/notifications/index';

export default function useNotifications(variant = 'notificationsGet', body = null) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchNotifications = useCallback(async (customBody, customVariant) => {
        const activeVariant = customVariant || variant;
        const activeBody = customBody || body;

        if (activeVariant === 'none') return;

        setLoading(true);
        setError(null);
        try {
            const res = await notifications[activeVariant](activeBody);
            if (res.error) {
                setError(res.message);
            } else {
                setData(res.data || []);
            }
            return res;
        } catch (err) {
            const msg = err?.message || 'Error loading notifications';
            setError(msg);
            return { error: true, message: msg };
        } finally {
            setLoading(false);
        }
    }, [body, variant]);

    useEffect(() => {
        if (variant !== 'none' && variant === 'notificationsGet') {
            fetchNotifications();
        }
    }, []);

    return {
        notifications: data,
        loading,
        error,
        refreshNotifications: fetchNotifications
    };
}
