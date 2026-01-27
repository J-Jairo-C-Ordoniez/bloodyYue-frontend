import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from './Dialog';
import Image from '../atoms/Image';
import Video from '../atoms/Video';
import Icon from '../atoms/Icon';
import Label from '../atoms/Label';
import LoaderCard from '../molecules/LoaderCard';
import ErrorCard from '../molecules/ErrorCard';
import Typography from '../atoms/Typography';

export default function WorkDetailsDialog({ isOpen, onClose, postData, likes, isLiked, onLike }) {

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#0B0B0E] border-zinc-800 max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-white sr-only">{postData?.title || 'Detalles del Post'}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col space-y-6">
                    {postData && (
                        <>
                            <div className="rounded-xl overflow-hidden bg-zinc-900 flex justify-center border border-zinc-800 max-h-[60vh]">
                                {postData.typePost === 'short' ? (
                                    <Video
                                        src={postData.content}
                                        alt={postData.title}
                                        controls
                                        width={800}
                                        height={600}
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <Image
                                        src={postData.content}
                                        alt={postData.title}
                                        width={800}
                                        height={600}
                                        className="w-full h-full object-contain"
                                    />
                                )}
                            </div>

                            {postData.labels && (
                                <div className="flex items-center gap-2 flex-wrap">
                                    {postData.labels.map((label) => (
                                        <Label key={label.labelId} color={label.color}>
                                            {label.name}
                                        </Label>
                                    ))}
                                </div>
                            )}

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Typography variant="small" className="text-zinc-500">
                                            Publicado el {new Date(postData.createdAt).toLocaleDateString()}
                                        </Typography>
                                    </div>
                                    <button
                                        onClick={onLike}
                                        className={`flex items-center cursor-pointer gap-2 px-4 py-2 rounded-full transition-all ${isLiked ? 'bg-red-500/10 text-red-500' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200'}`}
                                    >
                                        <Icon name="Heart" size={20} fill={isLiked ? "currentColor" : "none"} />
                                        <span className="font-bold">{likes}</span>
                                    </button>
                                </div>

                                <Typography variant="title" className="text-xl font-bold text-white">
                                    {postData.title}
                                </Typography>

                                <Typography variant="body" className="text-zinc-400 leading-relaxed whitespace-pre-wrap">
                                    {postData.description || "Sin descripción."}
                                </Typography>
                            </div>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
