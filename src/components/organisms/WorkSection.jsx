import SectionHeader from '../molecules/SectionHeader';
import usePosts from '../../hooks/usePosts';
import WorkCard from '../molecules/WorkCard';

export default function WorkSection() {
    const { post, isLoadingPost, errorPost } = usePosts({ id: 0 }, 'list');

    return (
        <section className="py-20 px-4 bg-foreground dark:bg-background">
            <div className="max-w-7xl mx-auto">
                <SectionHeader
                    title="My Work"
                    subtitle="Projects and professional experience."
                    align="left"
                    className="mb-12"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {isLoadingPost && <p className="text-gray-400">Loading projects...</p>}
                    {errorPost && <p className="text-red-400">Error loading projects</p>}

                    {post?.data?.map((item) => (
                        <WorkCard
                            key={item.postId}
                            title={item.title}
                            description={item.subtitle || "Professional Project"}
                            image={item.content}
                            onClick={() => { }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};