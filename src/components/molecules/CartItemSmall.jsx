import Image from '../atoms/Image';
import Typography from '../atoms/Typography';

export default function CartItemSmall({ image, title, price }) {
    return (
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer group">
            <div className="h-10 w-10 relative rounded-lg overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-800">
                <Image
                    src={image}
                    alt={title}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                    {title}
                </span>
                <span className="text-xs text-zinc-500 font-medium">
                    ${price}
                </span>
            </div>
        </div>
    );
}
