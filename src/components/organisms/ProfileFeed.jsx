import StoryTray from '../molecules/StoryTray';
import FeedPost from './FeedPost';
import Form from '../molecules/Form';
import usePosts from '../../hooks/usePosts';
import LoaderCard from '../molecules/LoaderCard';
import ErrorCard from '../molecules/ErrorCard';
import WorkCard from '../molecules/WorkCard';

export default function ProfileFeed() {
    const { post, isLoadingPost, errorPost } = usePosts({ id: 0 }, 'list');

    return (
        <div className="flex flex-col space-y-6 max-w-2xl mx-auto w-full">
            {isLoadingPost && (
                <>
                    <LoaderCard variant="card" />
                    <LoaderCard variant="card" />
                    <LoaderCard variant="card" />
                </>
            )}
            {(errorPost || post?.error) && (
                <ErrorCard message={errorPost || post?.message || 'Error al cargar el feed'} />
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
    );
}
