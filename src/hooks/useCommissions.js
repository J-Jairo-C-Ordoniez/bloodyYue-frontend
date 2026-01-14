import { useEffect, useState } from 'react';
import commissions from '../api/commissions/index';

export default function useCommissions(body = null, variant = 'list') {
  const [commission, setCommission] = useState(null);
  const [isLoadingCommission, setIsLoadingCommission] = useState(true);
  const [errorCommission, setErrorCommission] = useState(false);

  const variants = {
    list: commissions.commissionListGet,
  }

  useEffect(() => {
    (async () => {
        try {
            const data = await variants[variant](body ?? body)
            setCommission(data)
        } catch (err) {
            setErrorCommission(true)
        } finally {
            setIsLoadingCommission(false)
        }
    })()
  }, [variant]);

  return {
    commission,
    isLoadingCommission,
    errorCommission,
  };
}