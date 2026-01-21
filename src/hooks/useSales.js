import { useState } from 'react';
import salesPost from '../api/sales/sales.post';
import salesStatusPatch from '../api/sales/salesStatus.patch';
import salesMeGet from '../api/sales/salesMe.get';

export default function useSales() {
    const [isLoadingSales, setIsLoadingSales] = useState(false);
    const [errorSales, setErrorSales] = useState(null);
    const [salesData, setSalesData] = useState(null);

    const createSale = async (data) => {
        setIsLoadingSales(true);
        setErrorSales(null);
        try {
            const res = await salesPost({ data });
            if (res.error) throw new Error(res.message);
            return res;
        } catch (err) {
            setErrorSales(err.message);
            return { error: true, message: err.message };
        } finally {
            setIsLoadingSales(false);
        }
    };

    const updateSaleStatus = async (id, status) => {
        setIsLoadingSales(true);
        setErrorSales(null);
        try {
            const res = await salesStatusPatch({ id, status });
            if (res.error) throw new Error(res.message);
            return res;
        } catch (err) {
            setErrorSales(err.message);
            return { error: true, message: err.message };
        } finally {
            setIsLoadingSales(false);
        }
    };

    const getMySales = async () => {
        setIsLoadingSales(true);
        setErrorSales(null);
        try {
            const res = await salesMeGet();
            if (res.error) throw new Error(res.message);
            setSalesData(res.data);
            return res;
        } catch (err) {
            setErrorSales(err.message);
            return { error: true, message: err.message };
        } finally {
            setIsLoadingSales(false);
        }
    };

    return {
        createSale,
        updateSaleStatus,
        getMySales,
        salesData,
        isLoadingSales,
        errorSales
    };
}
