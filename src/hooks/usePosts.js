import { useEffect, useState, useCallback } from 'react';
import posts from '../api/posts/index';

export default function usePosts(body = { id: 0 }, variant = 'list') {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadPosts = useCallback(async (customBody, customVariant) => {
    const activeVariant = customVariant || variant;
    const activeBody = customBody || body;

    if (activeVariant === 'none') return;

    setLoading(true);
    setError(null);
    try {
      let res;
      switch (activeVariant) {
        case 'random':
          res = await posts.postRandomGet();
          break;
        case 'getById':
          res = await posts.postGetIdGet(activeBody);
          break;
        case 'filterLabel':
          res = await posts.postFilterLabelGet(activeBody);
          break;
        case 'filterTitle':
          res = await posts.postFilterTitleGet(activeBody);
          break;
        case 'list':
        default:
          res = await posts.postListGet(activeBody);
          break;
      }

      if (res.error) {
        setError(res.message);
      } else {
        setData(res.data);
      }
      return res;
    } catch (err) {
      setError(err.message || 'Error loading posts');
      return { error: true, message: err.message };
    } finally {
      setLoading(false);
    }
  }, [body, variant]);

  useEffect(() => {
    if (variant !== 'none') {
      loadPosts();
    }
  }, []);

  const createPost = useCallback(async (postData) => {
    setLoading(true);
    try {
      const res = await posts.postPost({ data: postData });
      if (res.error) throw new Error(res.message);
      await loadPosts();
      return { success: true, data: res.data };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [loadPosts]);

  const updatePost = useCallback(async (id, postData) => {
    setLoading(true);
    try {
      const res = await posts.postPut({ id, data: postData });
      if (res.error) throw new Error(res.message);
      await loadPosts();
      return { success: true, data: res.data };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [loadPosts]);

  const deletePost = useCallback(async (id) => {
    setLoading(true);
    try {
      const res = await posts.postDelete({ id });
      if (res.error) throw new Error(res.message);
      await loadPosts();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [loadPosts]);

  const refreshPosts = useCallback(() => loadPosts(), [loadPosts]);

  return {
    posts: data,
    loading,
    error,
    createPost,
    updatePost,
    deletePost,
    refreshPosts
  };
}