import useReactions from '../../hooks/useReactions';
import Image from '../atoms/Image';
import formatDate from '../../utils/formatDate';
import Icon from '../atoms/Icon';
import Button from '../atoms/Button';
import Typography from '../atoms/Typography';
import likesCount from '../../utils/likesCount';

export default function WorkCard({ postId, userId, title, description, content, typePost = 'image', createdAt }) {
    const { reactions, isLoadingReactions, errorReactions } = useReactions({ id: postId }, 'getReactions');

    const handleLike = (e) => {
        e.stopPropagation();
    };

    if (typePost === 'short') {
        return (
            <article className="group relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col justify-between h-full min-h-[200px]">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-linear-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                                {userId ? userId.toString().charAt(0) : 'U'}
                            </div>
                            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">User {userId}</span>
                        </div>
                        <span className="text-xs text-zinc-500">{formatDate(createdAt)}</span>
                    </div>
                    <div>
                        <Typography variant="h4" className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                            {title}
                        </Typography>
                        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed line-clamp-4">
                            {description || content}
                        </p>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-zinc-500">
                    <button
                        onClick={handleLike}
                        className={`flex items-center space-x-1.5 text-sm transition-colors ${isLiked ? 'text-red-500' : 'hover:text-red-500'}`}
                    >
                        <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
                        <span>{likesCount}</span>
                    </button>
                    <button className="hover:text-blue-500 transition-colors">
                        <Share2 size={18} />
                    </button>
                </div>
            </article>
        );
    }

    return (
        <article id={postId} className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="relative aspect-square w-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                <Image
                    src={content}
                    alt={title}
                    width={500}
                    height={500}
                />
            </div>

            <footer className="px-4 pt-3 pb-2">
                <div>
                    <div className="flex items-center justify-between">
                        <Button
                            onClick={handleLike}
                            variant='ghost'
                        >
                            <Icon name="Heart" size={24} />
                        </Button>

                        <Button
                            onClick={handleLike}
                            variant='ghost'
                        >
                            <Icon name="Share2" size={24} />
                        </Button>
                    </div>
                </div>

                <div className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 mb-1 px-4">
                    {reactions?.data ? likesCount(reactions?.data) : 0} likes
                </div>

                <div className="space-y-1 px-4">
                    <Typography variant="small" className="text-sm text-zinc-700 dark:text-zinc-300">
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100 mr-2">{title}</span>
                        {description}
                    </Typography>
                </div>
            </footer>
        </article>
    );
}
