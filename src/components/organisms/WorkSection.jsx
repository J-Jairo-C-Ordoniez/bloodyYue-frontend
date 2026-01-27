import SectionHeader from '../molecules/SectionHeader';
import usePosts from '../../hooks/usePosts';
import WorkCard from '../molecules/WorkCard';
import LoaderCard from '../molecules/LoaderCard';
import ErrorCard from '../molecules/ErrorCard';

export default function WorkSection() {
    const { posts, loading, error } = usePosts();

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
                    {loading && (
                        <>
                            <LoaderCard variant="card" />
                            <LoaderCard variant="card" />
                            <LoaderCard variant="card" />
                        </>
                    )}

                    {error && (
                        <div className="col-span-full">
                            <ErrorCard message={error || 'Error al cargar los trabajos'} />
                        </div>
                    )}

                    {posts && posts.map((item) => (
                        <WorkCard
                            key={item.postId}
                            postId={item.postId}
                            userId={item.userId}
                            title={item.title}
                            description={item.description}
                            content={item.content}
                            typePost={item.typePost}
                            createdAt={item.createdAt}
                            labels={item.labels}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};