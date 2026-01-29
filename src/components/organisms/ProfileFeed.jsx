'use client';

import { useMemo } from 'react';
import usePosts from '../../hooks/usePosts';
import useCommissions from '../../hooks/useCommissions';
import NotContent from '../molecules/NotContent';
import LoaderCard from '../molecules/LoaderCard';
import ErrorCard from '../molecules/ErrorCard';
import WorkCard from '../molecules/WorkCard';
import CommissionCard from '../molecules/CommissionCard';
import formatDataHomeSection from '../../utils/formatDataHomeSection';

export default function ProfileFeed() {
    const { posts, loading, error } = usePosts();
    const { commissions, loading: isLoadingCommission, error: errorCommission } = useCommissions();
    const allContent = useMemo(() => formatDataHomeSection(posts, commissions), [posts, commissions]);

    const isLoading = loading || isLoadingCommission;
    const hasError = error || errorCommission;

    return (
        <section className="flex flex-col space-y-6 w-full">
            {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <LoaderCard key={i} variant="card" />
                    ))}
                </div>
            )}

            {!isLoading && hasError && (
                <div className="py-12">
                    <ErrorCard message={errorPost || errorCommission || 'Error al cargar el contenido'} />
                </div>
            )}

            {allContent && allContent.length === 0 && (
                <NotContent
                    title="No hay contenido disponible"
                    description="Vuelve más tarde para ver nuevas creaciones."
                />
            )}

            {!isLoading && !hasError && (
                <div className='grid gap-8 grid-cols-1 max-w-2xl mx-auto'>
                    {allContent.map((item) => (
                        item.feedType === 'commission' ? (
                            <CommissionCard
                                key={`commission-${item.commissionId}`}
                                commissionId={item.commissionId}
                                title={item.title}
                                price={item.price}
                                content={item.content}
                                status
                            />
                        ) : (
                            <WorkCard
                                key={`post-${item.postId}`}
                                postId={item.postId}
                                userId={item.userId}
                                title={item.title}
                                description={item.description}
                                content={item.content}
                                typePost={item.typePost}
                                createdAt={item.createdAt}
                            />
                        )
                    ))}

                </div>
            )}
        </section>
    );
}

