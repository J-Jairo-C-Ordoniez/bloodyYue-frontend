import { useState, useEffect, useCallback } from 'react';
import roles from '../api/roles';

export default function useRoles(roleId = null, variant = 'rolesGetId') {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRole = useCallback(async (customId) => {
        const activeId = customId || roleId;
        if (!activeId) return;

        setLoading(true);
        setError(null);
        try {
            const response = await roles.rolesGetId({ rolId: activeId });
            if (response.error) {
                setError(response.message);
            } else {
                setData(response.data);
            }
            return response;
        } catch (err) {
            const msg = err.message || 'An error occurred fetching the role';
            setError(msg);
            return { error: true, message: msg };
        } finally {
            setLoading(false);
        }
    }, [roleId]);

    useEffect(() => {
        if (roleId) {
            fetchRole();
        }
    }, []);

    const getAllRoles = async () => {
        return await roles.rolesGet();
    }

    return {
        role: data,
        loading,
        error,
        getRoleById: fetchRole,
        getAllRoles
    };
}
