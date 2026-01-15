import Image from '../atoms/Image';

export default function MessageItem({ user, avatar, message, time, isOnline = false, unread = false }) {
    return (
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer group">
            <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800">
                    <Image
                        src={avatar}
                        alt={user}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                    />
                </div>
                {isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-black" />
                )}
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                    <span className={`text-sm ${unread ? 'font-bold text-zinc-900 dark:text-zinc-50' : 'font-semibold text-zinc-900 dark:text-zinc-200'}`}>
                        {user}
                    </span>
                </div>
                <p className={`text-xs truncate ${unread ? 'text-zinc-900 dark:text-zinc-100 font-medium' : 'text-zinc-500'}`}>
                    {message}
                </p>
            </div>
        </div>
    );
}
