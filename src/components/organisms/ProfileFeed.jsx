'use client';

import { useState, useMemo } from 'react';
import usePosts from '../../hooks/usePosts';
import useCommissions from '../../hooks/useCommissions';
import LoaderCard from '../molecules/LoaderCard';
import ErrorCard from '../molecules/ErrorCard';
import WorkCard from '../molecules/WorkCard';
import CommissionCard from '../molecules/CommissionCard';
import Button from '../atoms/Button';
import Typography from '../atoms/Typography';
import Icon from '../atoms/Icon';

export default function ProfileFeed() {
    const { post, isLoadingPost, errorPost } = usePosts({ id: 0 }, 'list');
    const { commission, isLoadingCommission, errorCommission } = useCommissions({ id: 0 }, 'list');

    const allContent = useMemo(() => {
        const posts = (post?.data || []).map(p => ({
            ...p,
            feedType: 'post',
            importance: Math.random() * 10
        }));
        const commissions = (commission?.data || []).map(c => ({
            ...c,
            feedType: 'commission',
            importance: Math.random() * 10
        }));

        return [...posts, ...commissions].sort((a, b) => b.importance - a.importance);
    }, [post?.data, commission?.data]);

    const isLoading = isLoadingPost || isLoadingCommission;
    const hasError = errorPost || errorCommission || post?.error || commission?.error;

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

            {!isLoading && !hasError && (
                <>
                    {allContent.length === 0 && (
                        <article className="flex flex-col items-center justify-center py-24 text-center">
                            <div className="w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-6">
                                <Icon name="Inbox" size={40} className="text-zinc-400" />
                            </div>
                            <Typography variant="h3" className="text-zinc-900 dark:text-zinc-100 font-bold mb-2">
                                No hay contenido disponible
                            </Typography>
                            <Typography variant="body" className="text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto">
                                Vuelve más tarde para ver nuevas creaciones.
                            </Typography>
                        </article>
                    )}

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
                </>
            )}
        </section>
    );
}

