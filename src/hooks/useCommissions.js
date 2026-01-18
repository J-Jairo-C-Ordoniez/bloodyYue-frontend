import { useEffect, useState } from 'react';
import commissions from '../api/commissions/index';
import useErrorTokenStore from '../store/errorToken.store';

/**
 * Custom hook para manejar operaciones de comisiones
 * @param {Object|null} body - Parámetros para la petición de comisiones
 * @param {string} variant - Variante de operación ('list', 'getById')
 * @returns {Object} Estado de comisiones con data, loading y error
 */
export default function useCommissions(body = null, variant = 'list') {
  const [commission, setCommission] = useState(null);
  const [isLoadingCommission, setIsLoadingCommission] = useState(true);
  const [errorCommission, setErrorCommission] = useState(null);

  const variants = {
    post: commissions.commissionPost,
    list: commissions.commissionListGet,
    getById: commissions.commissionByIdGet,
    filterLabel: commissions.commissionFilterLabelGet,
    filterTitle: commissions.commissionFilterTitleGet,
    filterPrice: commissions.commissionFilterPriceGet,
    put: commissions.commissionPut,
    labelsPut: commissions.commissionLabelsPut,
  }

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        setIsLoadingCommission(true);
        setErrorCommission(null);
        const data = await variants[variant](body);

        if (isMounted) {
          if (data?.error === 401) {
            useErrorTokenStore.getState().setErrorToken(true);
            setErrorCommission('Sesión expirada. Por favor, inicia sesión nuevamente.');
          } else {
            setCommission(data);
          }
        }
      } catch (err) {
        if (isMounted) {
          setErrorCommission(err?.message || 'Error al cargar las comisiones');
        }
      } finally {
        if (isMounted) {
          setIsLoadingCommission(false);
        }
      }
    })()

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    commission,
    isLoadingCommission,
    errorCommission,
  };
}