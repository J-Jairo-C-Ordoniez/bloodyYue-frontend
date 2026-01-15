'use client';

import usePosts from '../../hooks/usePosts';
import VerifyAccountPage from './VerifyAccountPage';
import Loader from '../molecules/Loader';
import Error from '../molecules/Error';

export default function VerifyAccountLoader() {
    const { post, isLoadingPost, errorPost } = usePosts();

    if (isLoadingPost) {
        return <Loader />;
    }

    if (errorPost || post.error) {
        return <Error message={post?.message} typeError={post?.typeError} />;
    }

    return <VerifyAccountPage data={post.data} />;
}