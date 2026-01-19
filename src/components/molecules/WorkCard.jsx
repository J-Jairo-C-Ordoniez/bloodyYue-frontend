import { useEffect, useState } from 'react';
import Dialog from '../atoms/Dialog';
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
    const [isOpen, setIsOpen] = useState(false);
    const { reactions } = useReactions({ id: postId });
    const [reaction, setReaction] = useState(likesCount(reactions?.data));
    const [isLiked, setIsLiked] = useState(reactions?.data?.some(r => r.userId === useAuthStore.getState().user?.userId) || false);

    useEffect(() => {
        setReaction(likesCount(reactions?.data));
        setIsLiked(reactions?.data?.some(r => r.userId === useAuthStore.getState().user?.userId) || false);
    }, [reactions]);

    const handleLike = async () => {
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

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const labels = [
        { labelId: 1, name: 'Fanart', color: '#60A5FA' },
        { labelId: 2, name: 'Illustration', color: '#34D399' }
    ];

    return (
        <>
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

                <div className="relative aspect-square w-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden cursor-pointer" onClick={handleOpen}>
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
                            <Typography variant="small" className="font-semibold">
                                {reaction}
                            </Typography>
                        </button>
                    </article>

                    <div className="space-y-1">
                        <Typography variant="subtitle" className="text-sm">
                            <span className="font-bold text-zinc-900 dark:text-zinc-100 mr-2">{title}</span>
                            <span className="text-zinc-600 dark:text-zinc-400 line-clamp-2">{description}</span>
                        </Typography>
                        <Typography variant="body">
                            {new Date(createdAt).toLocaleDateString()}
                        </Typography>
                    </div>
                </footer>
            </article>

            <Dialog isOpen={isOpen} onClose={handleClose} title={title}>
                <div className="space-y-6">
                    <div className="rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex justify-center border border-zinc-200 dark:border-zinc-700">
                        {typePost === 'short' ? (
                            <Video
                                src={content}
                                alt={title}
                                controls
                                width={800}
                                height={600}
                            />
                        ) : (
                            <Image
                                src={content}
                                alt={title}
                                width={800}
                                height={600}
                            />
                        )}
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                                    <Icon name="User" size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-sm">Artist Name</p>
                                    <p className="text-xs text-zinc-500">{new Date(createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <button
                                onClick={handleLike}
                                className={`flex items-center cursor-pointer gap-1.5 transition-colors ${isLiked ? 'text-red-500' : 'text-zinc-500 hover:text-red-500'}`}
                            >
                                <Icon name="Heart" size={24} fill={isLiked ? "currentColor" : "none"} />
                                <span className="font-semibold">{reaction}</span>
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {labels.map(l => (
                                <Label key={l.labelId} color={l.color} variant="ghost" size="small">
                                    {l.name}
                                </Label>
                            ))}
                        </div>

                        <div>
                            <h3 className="text-lg font-bold mb-2">Description</h3>
                            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
