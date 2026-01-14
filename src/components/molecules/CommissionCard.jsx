import Typography from '../atoms/Typography';
import Image from '../atoms/Image';
import Icon from '../atoms/Icon';

export default function CommissionCard({ title, price, content }) {
    return (
        <article className="group cursor-pointer flex flex-col items-center">
            <header className="relative w-full aspect-4/5 mb-6 bg-zinc-50 dark:bg-zinc-900 rounded-3xl overflow-hidden transition-all duration-500 group-hover:shadow-2xl">
                <div className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white dark:bg-zinc-800 shadow-lg flex items-center justify-center text-zinc-400 hover:text-red-500 hover:scale-110 transition-all duration-300">
                    <Icon name="BadgeCheck" size={20} />
                </div>

                <div className="w-full h-full p-8 transition-transform duration-700 group-hover:scale-105">
                    <div className="relative w-full h-full">
                        <Image
                            src={content}
                            alt={title}
                            width={400}
                            height={400}
                        />
                    </div>
                </div>
            </header>

            <div className="text-center space-y-2">
                <Typography
                    variant="h4"
                    className="font-bold text-sm md:text-base uppercase tracking-wider text-zinc-900 dark:text-zinc-100"
                >
                    {title}
                </Typography>

                <Typography
                    variant="body"
                    className="text-zinc-500 dark:text-zinc-400 font-medium"
                >
                    ${price}
                </Typography>

                <div className="flex justify-center gap-2 pt-1 opacity-60 group-hover:opacity-100 transition-opacity">
                    <div className="w-5 h-5 rounded-full border border-zinc-300 dark:border-zinc-700 bg-black cursor-pointer ring-1 ring-offset-2 ring-transparent hover:ring-zinc-400 dark:ring-offset-black transition-all"></div>
                </div>
            </div>
        </article>
    );
}
