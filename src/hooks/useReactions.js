import { useEffect, useState, useCallback } from 'react';
import posts from '../api/posts/index';

export default function useReactions(body = null, variant = 'getReactions') {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReactions = useCallback(async (customBody, customVariant) => {
    const activeVariant = customVariant || variant;
    const activeBody = customBody || body;

    setLoading(true);
    setError(null);
    try {
      const variants = {
        getReactions: posts.postReactionsGet,
        postReactions: posts.postReactionsPost,
      }

      const res = await variants[activeVariant](activeBody);
      if (res.error) {
        setError(res.message);
      } else {
        setData(res.data);
      }
      return res;
    } catch (err) {
      const msg = err?.message || 'Error loading reactions';
      setError(msg);
      return { error: true, message: msg };
    } finally {
      setLoading(false);
    }
  }, [body, variant]);

  useEffect(() => {
    if (variant !== 'none') {
      fetchReactions();
    }
  }, []);

  const addReaction = async (reactionData) => {
    return await posts.postReactionsPost(reactionData);
  }

  const removeReaction = async (reactionData) => {
    return await posts.postReactionsDelete(reactionData);
  }

  return {
    reactions: data,
    loading,
    error,
    refreshReactions: fetchReactions,
    addReaction,
    removeReaction
  };
}