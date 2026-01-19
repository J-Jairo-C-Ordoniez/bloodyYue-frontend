import { useState } from 'react';
import roles from '../api/roles';

export default function useRoles() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [role, setRole] = useState(null);

    const getRoleById = async (roleId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await roles.rolesGetId({ rolId: roleId });
            if (response.error) {
                setError(response.message);
                return null;
            }
            setRole(response.data);
            return response.data;
        } catch (err) {
            setError(err.message || 'An error occurred fetching the role');
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        role,
        getRoleById
    };
}
