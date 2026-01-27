import { useState, useEffect, useCallback } from 'react';
import users from '../api/users/index';
import mediaUserPost from '../api/media/mediaUser.post';

export default function useUsers(variant = 'meProfileGet', body = null) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUser = useCallback(async (customBody, customVariant) => {
        const activeVariant = customVariant || variant;
        const activeBody = customBody || body;

        if (activeVariant === 'none') return;

        setLoading(true);
        setError(null);
        try {
            const res = await users[activeVariant](activeBody);
            if (res.error) {
                setError(res.message);
            } else {
                setData(res.data);
            }
            return res;
        } catch (err) {
            const msg = err?.message || 'Error loading user data';
            setError(msg);
            return { error: true, message: msg };
        } finally {
            setLoading(false);
        }
    }, [body, variant]);

    useEffect(() => {
        if (variant !== 'none' && variant.endsWith('Get')) {
            fetchUser();
        }
    }, []);

    const updateProfile = async (profileData) => {
        setLoading(true);
        try {
            const res = await users.meProfilePut({ data: profileData });
            if (!res.error) await fetchUser();
            return res;
        } finally {
            setLoading(false);
        }
    }

    const uploadMedia = async ({ file, context }) => {
        return await mediaUserPost({ file, context });
    }

    return {
        userData: data,
        loading,
        error,
        refreshUser: fetchUser,
        updateProfile,
        uploadMedia,
    }
}
