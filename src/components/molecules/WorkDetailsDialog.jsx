import usePost from '../../hooks/usePosts';
import Dialog from '../atoms/Dialog';
import Image from '../atoms/Image';
import Video from '../atoms/Video';
import Icon from '../atoms/Icon';
import Label from '../atoms/Label';
import LoaderCard from '../molecules/LoaderCard';
import ErrorCard from '../molecules/ErrorCard';
import Typography from '../atoms/Typography';

export default function WorkDetailsDialog({ isOpen, onClose, postId, likes, isLiked, onLike }) {
    const { post, isLoadingPost, errorPost, } = usePost({ id: postId }, 'getId');

    return (
        <Dialog isOpen={isOpen} onClose={onClose} className="bg-zinc-900 m-auto! max-h-[90vh] flex flex-col">
            <div className="space-y-6">
                {isLoadingPost && (
                    <LoaderCard variant="card" />
                )}

                {errorPost || post?.error && (
                    <div className="col-span-full">
                        <ErrorCard message={post?.message || errorPost} variant="default" />
                    </div>
                )}

                {!isLoadingPost && !errorPost && post?.data && (
                    <>
                        <div className="rounded-xl overflow-hidden bg-zinc-800 flex justify-center border border-zinc-700 max-h-[60vh]">
                            {post?.data.typePost === 'short' ? (
                                <Video
                                    src={post?.data.content}
                                    alt={post?.data.title}
                                    controls
                                    width={800}
                                    height={600}
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <Image
                                    src={post?.data.content}
                                    alt={post?.data.title}
                                    width={800}
                                    height={600}
                                    className="w-full h-full object-contain"
                                />
                            )}
                        </div>

                        {post?.data.labels && (
                            <div className="flex items-center gap-2">
                                {post?.data.labels.map((label) => (
                                    <Label key={label.labelId} color={label.color}>
                                        {label.name}
                                    </Label>
                                ))}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <p className="text-xs text-zinc-500">{new Date(post?.data.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <button
                                onClick={onLike}
                                className={`flex items-center cursor-pointer gap-1.5 transition-colors ${isLiked ? 'text-red-500' : 'text-zinc-500 hover:text-red-500'}`}
                            >
                                <Icon name="Heart" size={24} fill={isLiked ? "currentColor" : "none"} />
                                <span className="font-semibold">{likes}</span>
                            </button>

                            <Typography variant="subtitle" className="text-zinc-300 leading-relaxed">
                                {post?.data.description}
                            </Typography>
                        </div>
                    </>
                )}
            </div>
        </Dialog>
    );
}
