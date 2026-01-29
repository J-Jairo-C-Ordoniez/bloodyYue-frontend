import { useEffect, useState, useCallback } from 'react';
import labels from '@/api/labels/index';

export default function useLabels(body = null, variant = 'labelsGet') {
  const [data, setData] = useState(variant === 'labelsGet' ? [] : null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLabels = useCallback(async (customBody, customVariant) => {
    const activeVariant = customVariant || variant;
    const activeBody = customBody || body;

    if (activeVariant === 'none') return;

    setLoading(true);
    setError(null);
    try {
      const res = await labels[activeVariant](activeBody);
      if (res.error) {
        setError(res.message);
      } else {
        setData(res.data);
      }
      return res;
    } catch (err) {
      const msg = err?.message || 'Error loading labels';
      setError(msg);
      return { error: true, message: msg };
    } finally {
      setLoading(false);
    }
  }, [body, variant]);

  useEffect(() => {
    if (variant !== 'none') {
      fetchLabels();
    }
  }, []);

  const createLabel = async (data) => {
    return await labels.labelsPost(data);
  };

  const updateLabel = async (id, data) => {
    return await labels.labelsPut({ id, data });
  };

  const deleteLabel = async (id) => {
    return await labels.labelsDelete({ id });
  };

  return {
    labels: data,
    loading,
    error,
    refreshLabels: fetchLabels,
    createLabel,
    updateLabel,
    deleteLabel
  };
}