import SectionHeader from '../molecules/SectionHeader';
import usePosts from '../../hooks/usePosts';
import WorkCard from '../molecules/WorkCard';
import LoaderCard from '../molecules/LoaderCard';
import ErrorCard from '../molecules/ErrorCard';

export default function WorkSection() {
    const { post, isLoadingPost, errorPost } = usePosts({ id: 0 }, 'list');

    return (
        <section className="py-20 px-4 bg-[#0B0B0E]">
            <div className="max-w-7xl mx-auto">
                <SectionHeader
                    title="Mí Trabajo"
                    subtitle="Proyectos y experiencia profesional."
                    align="left"
                    className="mb-12"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {isLoadingPost && (
                        <>
                            <LoaderCard variant="card" />
                            <LoaderCard variant="card" />
                            <LoaderCard variant="card" />
                        </>
                    )}
                    
                    {(errorPost || post?.error) && (
                        <div className="col-span-full">
                            <ErrorCard message={errorPost || post?.message || 'Error al cargar los trabajos'} />
                        </div>
                    )}

                    {!isLoadingPost && !errorPost && !post?.error && post?.data?.map((item) => (
                        <WorkCard
                            key={item.postId}
                            postId={item.postId}
                            userId={item.userId}
                            title={item.title}
                            description={item.description}
                            content={item.content}
                            typePost={item.typePost}
                            createdAt={item.createdAt}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};