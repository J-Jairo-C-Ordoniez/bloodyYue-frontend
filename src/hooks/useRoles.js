import { useState, useEffect, useCallback } from 'react';
import roles from '../api/roles';

export default function useRoles(roleId = null, variant = 'rolesGetId') {
    const [data, setData] = useState(variant === 'rolesGet' ? [] : null);
    const [permits, setPermits] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRoles = useCallback(async (customId, customVariant) => {
        const activeVariant = customVariant || variant;
        const activeId = customId || roleId;

        setLoading(true);
        setError(null);
        try {
            let response;
            if (activeVariant === 'rolesGetId' && activeId) {
                response = await roles.rolesGetId({ rolId: activeId });
            } else {
                response = await roles.rolesGet();
            }

            if (response.error) {
                setError(response.message);
            } else {
                setData(response.data);
            }
            return response;
        } catch (err) {
            const msg = err.message || 'An error occurred fetching roles';
            setError(msg);
            return { error: true, message: msg };
        } finally {
            setLoading(false);
        }
    }, [roleId, variant]);

    const fetchAllPermits = useCallback(async () => {
        setLoading(true);
        try {
            const res = await roles.rolesGetAllPermitsGet();
            if (!res.error) setPermits(res.data);
            return res;
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (variant === 'rolesGet' || (variant === 'rolesGetId' && roleId)) {
            fetchRoles();
        }
    }, []);

    const createRole = async (newRole) => {
        setLoading(true);
        try {
            const res = await roles.rolesPost({ data: newRole });
            if (!res.error) await fetchRoles();
            return res;
        } finally {
            setLoading(false);
        }
    };

    const assignPermit = async (rolId, permitId) => {
        setLoading(true);
        try {
            const res = await roles.rolesAssignPermitPost({ data: { rolId, permitId } });
            return res;
        } finally {
            setLoading(false);
        }
    };

    const removePermit = async (rolId, permitId) => {
        setLoading(true);
        try {
            const res = await roles.rolesRemovePermitDelete({ data: { rolId, permitId } });
            return res;
        } finally {
            setLoading(false);
        }
    };

    const fetchRoleDetails = useCallback(async (id) => {
        setLoading(true);
        try {
            const response = await roles.rolesGetId({ rolId: id });
            return response;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        roles: data,
        permits,
        loading,
        error,
        refreshRoles: fetchRoles,
        fetchAllPermits,
        fetchRoleDetails,
        createRole,
        assignPermit,
        removePermit
    };
}
