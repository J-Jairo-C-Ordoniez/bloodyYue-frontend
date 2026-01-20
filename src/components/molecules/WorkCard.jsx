import { useEffect, useState } from 'react';
import WorkDetailsDialog from './WorkDetailsDialog';
import AuthRequiredDialog from './AuthRequiredDialog';
import Label from '../atoms/Label';
import useReactions from '../../hooks/useReactions';
import useAuthStore from '../../store/auth.store';
import Button from '../atoms/Button';
import Image from '../atoms/Image';
import Video from '../atoms/Video';
import Icon from '../atoms/Icon';
import Typography from '../atoms/Typography';
import likesCount from '../../utils/likesCount';
import posts from '../../api/posts/index';

export default function WorkCard({ postId, title, description, content, typePost = 'image', createdAt }) {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const { reactions } = useReactions({ id: postId });
    const [reaction, setReaction] = useState(likesCount(reactions?.data));
    const [isLiked, setIsLiked] = useState(reactions?.data?.some(r => r.userId === useAuthStore.getState().user?.userId) || false);

    useEffect(() => {
        setReaction(likesCount(reactions?.data));
        setIsLiked(reactions?.data?.some(r => r.userId === useAuthStore.getState().user?.userId) || false);
    }, [reactions]);

    const handleLike = async () => {
        const user = useAuthStore.getState().user;
        if (!user) {
            setIsAuthOpen(true);
            return;
        }

        if (isLiked) {
            let res = await posts.postReactionsDelete({ postId })
            if (res.error) return
            setIsLiked(false)
            return setReaction(reaction - 1)
        }

        if (!isLiked) {
            let res = await posts.postReactionsPost({ postId })
            if (res.error) return
            setIsLiked(true)
            return setReaction(reaction + 1)
        }
    };

    const handleOpenDetails = () => setIsDetailsOpen(true);
    const handleCloseDetails = () => setIsDetailsOpen(false);

    return (
        <>
            <article id={postId} className="group relative bg-zinc-900 rounded-3xl overflow-hidden shadow-[0_10px_30px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6)] hover:shadow-2xl transition-all duration-300 border border-zinc-800">
                <header className="px-4 py-3 flex items-center justify-between bg-zinc-800/30">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center">
                            <Icon name="User" size={24} />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-purple-900/20 text-purple-500 text-[10px] font-bold uppercase tracking-wider border border-purple-800/50">
                            Post
                        </span>
                    </div>
                </header>

                <div className="relative aspect-square w-full bg-zinc-800 overflow-hidden cursor-pointer" onClick={handleOpenDetails}>
                    {typePost === 'short' ? (
                        <div className="w-full h-full">
                            <Video
                                src={content}
                                alt={title}
                                controls={false}
                                width={500}
                                height={500}
                            />
                        </div>
                    ) : (
                        <div className="w-full h-full">
                            <Image
                                src={content}
                                alt={title}
                                width={500}
                                height={500}
                            />
                        </div>
                    )}
                </div>

                <footer className="px-4 pt-3 pb-4">
                    <article className="flex items-center justify-between mb-3">
                        <button
                            onClick={handleLike}
                            className={`flex items-center cursor-pointer gap-1.5 group/like transition-colors ${isLiked ? 'text-red-500' : 'text-zinc-500 hover:text-red-500'}`}
                        >
                            <div className={`p-2 rounded-full transition-colors ${isLiked ? 'bg-red-50 dark:bg-red-900/20' : 'group-hover/like:bg-red-50 dark:group-hover/like:bg-red-900/20'}`}>
                                <Icon name="Heart" size={22} fill={isLiked ? "currentColor" : "none"} />
                            </div>
                            <Typography variant="small" className="font-semibold text-zinc-100">
                                {reaction}
                            </Typography>
                        </button>
                    </article>

                    <div className="space-y-1">
                        <Typography variant="subtitle" className="text-sm">
                            <span className="font-bold text-zinc-200 mr-2">{title}</span>
                            <span className="text-zinc-400 line-clamp-2">{description}</span>
                        </Typography>
                        <Typography variant="body">
                            {new Date(createdAt).toLocaleDateString()}
                        </Typography>
                    </div>
                </footer>
            </article>

            <WorkDetailsDialog
                isOpen={isDetailsOpen}
                onClose={handleCloseDetails}
                likes={reaction}
                isLiked={isLiked}
                onLike={handleLike}
                postId={postId}
            />

            <AuthRequiredDialog
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
            />
        </>
    );
}
