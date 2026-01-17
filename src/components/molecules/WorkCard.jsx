import useReactions from '../../hooks/useReactions';
import Image from '../atoms/Image';
import Video from '../atoms/Video';
import Icon from '../atoms/Icon';
import Button from '../atoms/Button';
import Typography from '../atoms/Typography';
import likesCount from '../../utils/likesCount';

export default function WorkCard({ postId, userId, title, description, content, typePost = 'image', createdAt, isLiked = false }) {
    const { reactions, isLoadingReactions, errorReactions } = useReactions({ id: postId });

    console.log(reactions);

    const handleLike = (e) => {
        e.stopPropagation();
    };

    return (
        <article id={postId} className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
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

            <footer className="px-4 pt-3 pb-2">
                <div>
                    <article className="flex items-center justify-between mb-2">
                        <div className='flex items-center gap-1'>
                            <Button
                                onClick={handleLike}
                                variant='ghost'
                                size='small'
                            >
                                <Icon name="Heart" size={24} />
                            </Button>
                            <Typography variant="small">
                                {!isLoadingReactions && !errorReactions && likesCount(reactions?.data)}
                            </Typography>
                        </div>

                        <Button
                            onClick={handleLike}
                            variant='ghost'
                        >
                            <Icon name="Share2" size={24} />
                        </Button>
                    </article>
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
