import { useState, useEffect, useCallback, useMemo } from 'react';
import salesApi from '../api/sales/index';

export default function useSales(variant = 'salesMeGet', options = {}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const activeOptions = useMemo(() => options, [JSON.stringify(options)]);

    const fetchSales = useCallback(async (customVariant, customParams) => {
        const activeVariant = customVariant || variant;
        const activeParams = customParams || activeOptions;

        if (activeVariant === 'none') return;

        setLoading(true);
        setError(null);
        try {
            const apiFunc = salesApi[activeVariant];
            if (!apiFunc) {
                setError(`API function ${activeVariant} not found in salesApi`);
                return { error: true, message: `API function ${activeVariant} not found` };
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
    }, [variant, activeOptions]);

    useEffect(() => {
        if (variant !== 'none' && variant.endsWith('Get')) {
            fetchSales();
        }
    }, [fetchSales, variant]);

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
