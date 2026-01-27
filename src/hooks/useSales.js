import { useState } from 'react';
import salesPost from '../api/sales/sales.post';
import salesStatusPatch from '../api/sales/salesStatus.patch';
import salesMeGet from '../api/sales/salesMe.get';

export default function useSales(variant = 'salesMeGet') {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const fetchSales = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await salesMeGet();
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
    }, [variant]);

    useEffect(() => {
        if (variant !== 'none') {
            fetchSales();
        }
    }, []);

    const createSale = async (saleData) => {
        setLoading(true);
        try {
            return await salesPost({ data: saleData });
        } finally {
            setLoading(false);
        }
    };

    const updateSaleStatus = async (id, status) => {
        setLoading(true);
        try {
            return await salesStatusPatch({ id, status });
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
        updateSaleStatus
    };
}
