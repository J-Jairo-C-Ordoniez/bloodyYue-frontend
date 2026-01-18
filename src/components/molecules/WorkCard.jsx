import useReactions from '../../hooks/useReactions';
import Image from '../atoms/Image';
import Video from '../atoms/Video';
import Icon from '../atoms/Icon';
import Typography from '../atoms/Typography';
import likesCount from '../../utils/likesCount';
import posts from '../../api/posts/index';

export default function WorkCard({ postId, userId, title, description, content, typePost = 'image', createdAt }) {
    const { reactions, isLoadingReactions, errorReactions } = useReactions({ id: postId });
    const isLiked = reactions?.data?.some(r => r.userId === userId);

    const handleLike = async () => {
        if (isLiked) {

        } else {
            await posts.postReactions({ postId })
        }
    };

    return (
        <article id={postId} className="group relative bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-[0_10px_30px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6)] hover:shadow-2xl transition-all duration-300 border border-zinc-100 dark:border-zinc-800">
            <header className="px-4 py-3 flex items-center justify-between bg-zinc-50 dark:bg-zinc-800/30">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 flex items-center justify-center">
                        <Icon name="User" size={24} />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-500 text-[10px] font-bold uppercase tracking-wider border border-purple-100 dark:border-purple-800/50">
                        Post
                    </span>
                </div>
            </header>

            <div className="relative aspect-square w-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                {typePost === 'short' ? (
                    <Video
                        src={content}
                        alt={title}
                        controls
                        width={500}
                        height={500}
                    />
                ) : (
                    <Image
                        src={content}
                        alt={title}
                        width={500}
                        height={500}
                    />
                )}
            </div>

            <footer className="px-4 pt-3 pb-4">
                <article className="flex items-center justify-between mb-3">
                    <button
                        onClick={handleLike}
                        className={`flex items-center gap-1.5 group/like transition-colors ${isLiked ? 'text-red-500' : 'text-zinc-500 hover:text-red-500'}`}
                    >
                        <div className={`p-2 rounded-full transition-colors ${isLiked ? 'bg-red-50 dark:bg-red-900/20' : 'group-hover/like:bg-red-50 dark:group-hover/like:bg-red-900/20'}`}>
                            <Icon name="Heart" size={22} fill={isLiked ? "currentColor" : "none"} />
                        </div>
                        <Typography variant="small" className="font-semibold">
                            {!isLoadingReactions && !errorReactions && likesCount(reactions?.data)}
                        </Typography>
                    </button>
                </article>

                <div className="space-y-1">
                    <Typography variant="subtitle" className="text-sm">
                        <span className="font-bold text-zinc-900 dark:text-zinc-100 mr-2">{title}</span>
                        <span className="text-zinc-600 dark:text-zinc-400">{description}</span>
                    </Typography>
                    <Typography variant="body">
                        {new Date(createdAt).toLocaleDateString()}
                    </Typography>
                </div>
            </footer>
        </article>
    );
}
