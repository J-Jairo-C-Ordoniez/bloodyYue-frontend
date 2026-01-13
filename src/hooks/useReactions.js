import { useEffect, useState } from 'react';
import posts from '../api/posts/index';

export default function useReactions(body = null, variant = 'getReactions') {
  const [reactions, setReactions] = useState(null);
  const [isLoadingReactions, setIsLoadingReactions] = useState(true);
  const [errorReactions, setErrorReactions] = useState(false);

  const variants = {
    getReactions: posts.getPostReactions,
  }

  useEffect(() => {
    (async () => {
        try {
            const data = await variants[variant](body ?? body)
            setReactions(data)
        } catch (err) {
            setErrorReactions(true)
        } finally {
            setIsLoadingReactions(false)
        }
    })()
  }, [variant]);

  return {
    reactions,
    isLoadingReactions,
    errorReactions,
  };
}