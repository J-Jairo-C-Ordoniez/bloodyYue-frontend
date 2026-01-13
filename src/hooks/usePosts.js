import { useEffect, useState } from 'react';
import posts from '../api/posts/index';

export default function usePosts(body = null, variant = 'random') {
  const [post, setPost] = useState(null);
  const [isLoadingPost, setIsLoadingPost] = useState(true);
  const [errorPost, setErrorPost] = useState(false);

  const variants = {
    random: posts.getPostRandom,
  }

  useEffect(() => {
    (async () => {
        try {
            const data = await variants[variant](body ?? body)
            setPost(data)
        } catch (err) {
            setErrorPost(true)
        } finally {
            setIsLoadingPost(false)
        }
    })()
  }, [variant]);

  return {
    post,
    isLoadingPost,
    errorPost,
  };
}