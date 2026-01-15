'use client';

import usePosts from '../../hooks/usePosts';
import LoginPage from './LoginPage';
import Loader from '../molecules/Loader';
import Error from '../molecules/Error';

export default function LoginLoader() {
    const { post, isLoadingPost, errorPost } = usePosts();

    if (isLoadingPost) {
        return <Loader />;
    }

    if (errorPost || post.error) {
        return <Error message={post?.message} typeError={post?.typeError} />;
    }

    return <LoginPage data={post.data} />;
};
