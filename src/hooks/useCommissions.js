import { useEffect, useState, useCallback, useRef } from 'react';
import commissions from '../api/commissions/index';

/**
 * Custom hook for commission operations (CRUD + Fetching)
 * @param {Object} body - Parameters for the request
 * @param {string} variant - Operation variant ('list', 'getById', etc)
 */
export default function useCommissions(body = { id: 0 }, variant = 'list') {
  const [data, setData] = useState(variant === 'list' ? [] : null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadCommissions = useCallback(async (customBody, customVariant) => {
    const activeVariant = customVariant || variant;
    const activeBody = customBody || body;

    setLoading(true);
    setError(null);
    try {
      let res;
      switch (activeVariant) {
        case 'getById':
          res = await commissions.commissionByIdGet(activeBody);
          break;
        case 'filterLabel':
          res = await commissions.commissionFilterLabelGet(activeBody);
          break;
        case 'filterTitle':
          res = await commissions.commissionFilterTitleGet(activeBody);
          break;
        case 'filterPrice':
          res = await commissions.commissionFilterPriceGet(activeBody);
          break;
        case 'list':
        default:
          res = await commissions.commissionListGet(activeBody);
          break;
      }

      if (res.error) {
        setError(res.message);
      } else {
        setData(res.data);
      }
      return { success: !res.error, data: res.data, error: res.message };
    } catch (err) {
      const msg = err.message || 'Error loading commissions';
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  }, [body, variant]);

  useEffect(() => {
    if (variant !== 'none') {
      loadCommissions();
    }
  }, []);

  const createCommission = useCallback(async (commissionData) => {
    setLoading(true);
    try {
      const res = await commissions.commissionPost({ data: commissionData });
      if (res.error) throw new Error(res.message);
      await loadCommissions();
      return { success: true, data: res.data };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [loadCommissions]);

  const updateCommission = useCallback(async (id, commissionData) => {
    setLoading(true);
    try {
      const res = await commissions.commissionPut({ id, data: commissionData });
      if (res.error) throw new Error(res.message);
      await loadCommissions();
      return { success: true, data: res.data };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [loadCommissions]);

  const refreshCommissions = useCallback(() => loadCommissions(), [loadCommissions]);

  return {
    commissions: data,
    loading,
    error,
    createCommission,
    updateCommission,
    refreshCommissions
  };
}