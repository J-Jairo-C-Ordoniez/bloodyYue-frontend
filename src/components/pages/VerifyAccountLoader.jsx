'use client';

import usePosts from '../../hooks/usePosts';
import VerifyAccountPage from './VerifyAccountPage';
import Loader from '../molecules/Loader';
import Error from '../molecules/Error';

export default function VerifyAccountLoader() {
    const { posts, loading, error } = usePosts(null, 'random');

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <Error message={error} />;
    }

    return <VerifyAccountPage data={posts} />;
}