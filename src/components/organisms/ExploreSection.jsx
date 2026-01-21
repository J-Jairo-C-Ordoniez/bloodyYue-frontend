import usePosts from '../../hooks/usePosts';
import useCommissions from '../../hooks/useCommissions';
import useTestimonies from '../../hooks/useTestimonies';
import LoaderCard from '../molecules/LoaderCard';
import WorkCard from '../molecules/WorkCard';
import CommissionCard from '../molecules/CommissionCard';
import TestimonyCard from '../molecules/TestimonyCard';
import Typography from '../atoms/Typography';
import Button from '../atoms/Button';
import SectionHeader from '../molecules/SectionHeader';

export default function ExploreSection({ setActiveTab }) {
    const { post, isLoadingPost } = usePosts({ id: 0 }, 'list');
    const { commission, isLoadingCommission } = useCommissions({ id: 0 }, 'list');
    const { testimony, isLoadingTestimonies } = useTestimonies();

    return (
        <div className="space-y-16 pb-20">
            <section className="px-4">
                <SectionHeader
                    title="Destacados"
                    subtitle="Lo mejor de la semana"
                    align="left"
                    className="mb-6"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {isLoadingPost ? (
                        <>
                            <LoaderCard variant="card" />
                            <LoaderCard variant="card" />
                        </>
                    ) : post?.data?.map(item => (
                        <WorkCard
                            key={'featured-' + item.postId}
                            {...item}
                        />
                    ))}
                </div>
            </section>

            <section className="px-4 bg-zinc-900/50 py-12 rounded-3xl mx-4">
                <SectionHeader
                    title="Comisiones Abiertas"
                    subtitle="Solicita tu diseño personalizado"
                    align="center"
                    className="mb-8"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {isLoadingCommission ? (
                        <Typography
                            variant="body"
                            className="text-center text-zinc-500 col-span-full"
                        >
                            Cargando comisiones...
                        </Typography>
                    ) : commission?.data?.map(item => (
                        <CommissionCard
                            key={item.commissionId}
                            status={true}
                            {...item}
                        />
                    ))}
                </div>
                <div className="flex justify-center mt-8">
                    <Button
                        variant="secondary"
                        onClick={() => setActiveTab('commissions')}
                    >
                        <span className="text-zinc-500">Ver todas las comisiones</span>
                    </Button>
                </div>
            </section>


            <section className="px-4">
                <SectionHeader
                    title="Lo que dicen los clientes"
                    subtitle="Experiencias reales"
                    align="left"
                    className="mb-6"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {isLoadingTestimonies ? (
                        <Typography
                            variant="body"
                            className="text-center text-zinc-500 col-span-full"
                        >
                            Cargando testimonios...
                        </Typography>
                    ) : testimony?.data?.map(item => (
                        <TestimonyCard
                            key={item.testimonyId}
                            {...item}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}