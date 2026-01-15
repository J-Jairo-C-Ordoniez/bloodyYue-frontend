import Image from '../atoms/Image';
import Icon from '../atoms/Icon';
import Typography from '../atoms/Typography';
import Button from '../atoms/Button';
import { useState } from 'react';

export default function FeedPost({ user, time, title, content, image, tags = [], stats = { likes: 0, comments: 0 } }) {
    const [isLiked, setIsLiked] = useState(false);

    return (
        <article className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm mb-6">
            {/* Header */}
            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-linear-to-tr from-purple-500 to-pink-500 p-[2px]">
                        <div className="w-full h-full rounded-full bg-white dark:bg-zinc-900 relative overflow-hidden">
                            <Image src={user.avatar} alt={user.name} width={40} height={40} className="object-cover w-full h-full" />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center space-x-1">
                            <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">{user.name}</span>
                            {user.isVerified && <Icon name="CheckCircle" size={14} className="text-blue-500 fill-blue-500" />}
                        </div>
                        <div className="text-xs text-zinc-500">{time} • {user.role || 'Digital Art'}</div>
                    </div>
                </div>
                <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
                    <Icon name="MoreHorizontal" size={20} />
                </button>
            </div>

            {/* Tags (optional) */}
            {tags.length > 0 && (
                <div className="px-4 pb-3 flex space-x-2">
                    {tags.map(tag => (
                        <span key={tag} className="px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/50 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                            #{tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Main Image */}
            <div className="relative aspect-4/5 bg-zinc-100 dark:bg-zinc-800">
                <Image
                    src={image}
                    alt={title}
                    width={800}
                    height={1000}
                    className="w-full h-full object-cover"
                />

                <button className="absolute bottom-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                    <Icon name="Maximize2" size={18} />
                </button>
            </div>

            {/* Action Bar */}
            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-6">
                    <button
                        onClick={() => setIsLiked(!isLiked)}
                        className="flex items-center space-x-2 group"
                    >
                        <Icon name="Heart" size={24} className={`transition-colors ${isLiked ? 'text-red-500 fill-red-500' : 'text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-100'}`} />
                        <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{stats.likes}</span>
                    </button>

                    <button className="flex items-center space-x-2 group">
                        <Icon name="MessageCircle" size={24} className="text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" />
                        <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{stats.comments}</span>
                    </button>

                    <button className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                        <Icon name="Share2" size={24} />
                    </button>
                </div>

                <Button variant="primary" className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 text-sm">
                    <Icon name="ShoppingBag" size={16} className="mr-2" />
                    Buy Print
                </Button>
            </div>

            {/* Footer Text */}
            <div className="px-4 pb-4">
                <Typography variant="p" className="text-sm text-zinc-600 dark:text-zinc-300">
                    <span className="font-bold text-zinc-900 dark:text-zinc-100 mr-2">{user.name}</span>
                    {content}
                    <span className="text-zinc-400 ml-1 cursor-pointer hover:underline">...more</span>
                </Typography>
                <button className="text-xs text-zinc-500 mt-2 hover:underline">
                    View all {stats.comments} comments
                </button>
            </div>
        </article>
    );
}
