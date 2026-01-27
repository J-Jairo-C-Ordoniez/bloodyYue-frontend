import { useState, useEffect, useCallback } from 'react';
import salesApi from '../api/sales/index';

export default function useSales(variant = 'salesMeGet', options = {}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const fetchSales = useCallback(async (customVariant, customParams) => {
        const activeVariant = customVariant || variant;
        const activeParams = customParams || options;

        if (activeVariant === 'none') return;

        setLoading(true);
        setError(null);
        try {
            const apiFunc = salesApi[activeVariant];
            if (!apiFunc) {
                throw new Error(`API function ${activeVariant} not found in salesApi`);
            }

            const res = await apiFunc(activeParams);
            if (res.error) {
                setError(res.message);
            } else {
                setData(res.data);
            }
            return res;
        } catch (err) {
            const msg = err.message || 'Error loading sales';
            setError(msg);
            return { error: true, message: msg };
        } finally {
            setLoading(false);
        }
    }, [variant, options]);

    useEffect(() => {
        if (variant !== 'none' && variant.endsWith('Get')) {
            fetchSales();
        }
    }, []);

    const createSale = async (saleData) => {
        setLoading(true);
        setError(null);
        try {
            return await salesApi.salesPost({ data: saleData });
        } finally {
            setLoading(false);
        }
    };

    const updateSaleStatus = async (id, status) => {
        setLoading(true);
        try {
            const res = await salesApi.salesStatusPatch({ id, status });
            if (!res.error) {
                // Optionally refresh or update local state
                if (Array.isArray(data)) {
                    setData(prev => prev.map(s => s.saleId === id ? { ...s, status } : s));
                }
            }
            return res;
        } finally {
            setLoading(false);
        }
    };

    const fetchSaleDetails = async (saleId) => {
        setLoading(true);
        try {
            return await salesApi.salesDetailsGet({ id: saleId });
        } finally {
            setLoading(false);
        }
    };

    const updateDetailsStatus = async (detailsId, status) => {
        setLoading(true);
        try {
            return await salesApi.salesDetailsStatusPatch({ id: detailsId, status });
        } finally {
            setLoading(false);
        }
    };

    return {
        sales: data,
        loading,
        error,
        refreshSales: fetchSales,
        createSale,
        updateSaleStatus,
        fetchSaleDetails,
        updateDetailsStatus
    };
}
