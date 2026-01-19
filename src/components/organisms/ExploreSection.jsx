import { useState } from 'react';
import useLabels from '../../hooks/useLabels';
import usePosts from '../../hooks/usePosts';
import useCommissions from '../../hooks/useCommissions';
import useTestimonies from '../../hooks/useTestimonies';
import Label from '../atoms/Label';
import LoaderCard from '../molecules/LoaderCard';
import ErrorCard from '../molecules/ErrorCard';
import WorkCard from '../molecules/WorkCard';
import CommissionCard from '../molecules/CommissionCard';
import TestimonyCard from '../molecules/TestimonyCard';
import Typography from '../atoms/Typography';
import Button from '../atoms/Button';
import SectionHeader from '../molecules/SectionHeader';

export default function ExploreSection() {
    const { label, isLoadingLabel } = useLabels();
    const { post, isLoadingPost } = usePosts({ id: 0 }, 'list'); // Fetch all posts
    const { commission, isLoadingCommission } = useCommissions();
    const { testimonies, isLoadingTestimonies } = useTestimonies();

    const [selectedLabel, setSelectedLabel] = useState(null);

    // Filter logic if needed, or backend filtering
    const filteredPosts = post?.data?.filter(p => !selectedLabel || p.labels?.includes(selectedLabel)) || [];
    // Note: Assuming post object structure. If not available, client side filtering might be limited.

    return (
        <div className="space-y-16 pb-20">
            {/* Labels Cloud */}
            <section className="px-4">
                <Typography variant="h5" className="font-bold mb-4 text-zinc-900 dark:text-zinc-100">Explorar por Etiquetas</Typography>
                <div className="flex flex-wrap gap-2">
                    {isLoadingLabel ? (
                        <Typography variant="small" className="text-zinc-500">Cargando etiquetas...</Typography>
                    ) : (
                        <>
                            <Button
                                variant={selectedLabel === null ? "primary" : "ghost"}
                                size="small"
                                onClick={() => setSelectedLabel(null)}
                                className={selectedLabel === null ? "" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"}
                            >
                                Todo
                            </Button>
                            {label?.data?.slice(0, 15).map(l => (
                                <Button
                                    key={l.labelId}
                                    variant={selectedLabel === l.labelId ? "primary" : "ghost"}
                                    size="small"
                                    onClick={() => setSelectedLabel(l.labelId)}
                                    className={selectedLabel === l.labelId ? "" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"}
                                >
                                    <Label color={l.color} variant="trending" size="small">{l.name}</Label>
                                </Button>
                            ))}
                        </>
                    )}
                </div>
            </section>

            {/* Featured / Best Content (Mocked logic: take first 3 posts) */}
            <section className="px-4">
                <SectionHeader title="Destacados" subtitle="Lo mejor de la semana" align="left" className="mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {isLoadingPost ? (
                        <>
                            <LoaderCard variant="card" />
                            <LoaderCard variant="card" />
                            <LoaderCard variant="card" />
                        </>
                    ) : post?.data?.slice(0, 3).map(item => (
                        <WorkCard
                            key={'featured-' + item.postId}
                            {...item}
                        />
                    ))}
                </div>
            </section>

            {/* Commissions Preview */}
            <section className="px-4 bg-zinc-50 dark:bg-zinc-900/50 py-12 rounded-3xl mx-4">
                <SectionHeader title="Comisiones Abiertas" subtitle="Solicita tu diseño personalizado" align="center" className="mb-8" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {isLoadingCommission ? (
                        <Typography variant="body" className="text-center text-zinc-500 col-span-full">Cargando comisiones...</Typography>
                    ) : commission?.data?.slice(0, 4).map(item => (
                        <CommissionCard
                            key={item.commissionId}
                            {...item}
                        />
                    ))}
                </div>
                <div className="flex justify-center mt-8">
                    <Button variant="outline" onClick={() => window.location.href = '/profile/home?tab=commissions'}>Ver todas las comisiones</Button>
                </div>
            </section>


            {/* Testimonials */}
            {testimonies?.data?.length > 0 && (
                <section className="px-4">
                    <SectionHeader title="Lo que dicen los clientes" subtitle="Experiencias reales" align="left" className="mb-6" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {testimonies?.data?.slice(0, 3).map(testimony => (
                            <TestimonyCard
                                key={testimony.testimonyId}
                                {...testimony}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* All Posts Grid */}
            <section className="px-4">
                <SectionHeader title="Descubre más" align="left" className="mb-6" />
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {isLoadingPost ? (
                        <div className="text-center">Cargando...</div>
                    ) : post?.data?.map(item => (
                        <div key={item.postId} className="break-inside-avoid">
                            <WorkCard {...item} />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
