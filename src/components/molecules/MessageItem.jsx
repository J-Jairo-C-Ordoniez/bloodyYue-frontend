import Image from '../atoms/Image';
import Icon from '../atoms/Icon';

export default function MessageItem({ user, avatar, isOnline = false, onClick }) {
    return (
        <div
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-800/50 transition-colors cursor-pointer group"
            onClick={onClick}
        >
            <div className="relative">
                <div className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden border border-zinc-800 bg-zinc-800">
                    {avatar
                        ? <Image
                            src={avatar}
                            alt={user}
                            width={40}
                            height={40}
                        />
                        : <Icon name="User" size={18} color="white" />
                    }
                </div>
                {isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-black" />
                )}
            </div>
        </div>
    );
}
