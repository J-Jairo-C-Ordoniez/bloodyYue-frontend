'use client';

import usePosts from '../../hooks/usePosts';
import RegisterPage from './RegisterPage';
import Loader from '../molecules/Loader';
import Error from '../molecules/Error';

export default function RegisterLoader() {
    const { post, isLoadingPost, errorPost } = usePosts();

    if (isLoadingPost) {
        return <Loader />;
    }

    if (errorPost || post.error) {
        return <Error message={post?.message} typeError={post?.typeError} />;
    }

    return <RegisterPage data={post.data} />;
};
