import Image from '../atoms/Image';

export default function StoryCircle({ image, username, isLive = false, hasStory = true }) {
    return (
        <div className="flex flex-col items-center space-y-2 cursor-pointer group">
            <div className={`relative p-[3px] rounded-full ${hasStory || isLive
                ? 'bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-500'
                : 'bg-zinc-200 dark:bg-zinc-800'
                }`}>
                <div className="p-[2px] bg-white dark:bg-black rounded-full">
                    <div className="w-14 h-14 relative rounded-full overflow-hidden">
                        <Image
                            src={image}
                            alt={username}
                            width={56}
                            height={56}
                            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </div>
                {isLive && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm border-2 border-white dark:border-black">
                        LIVE
                    </div>
                )}
            </div>
            <span className="text-xs text-zinc-600 dark:text-zinc-400 font-medium truncate w-16 text-center">
                {username}
            </span>
        </div>
    );
}
