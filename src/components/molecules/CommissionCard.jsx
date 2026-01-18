import Typography from '../atoms/Typography';
import Image from '../atoms/Image';
import Icon from '../atoms/Icon';
import Button from '../atoms/Button';

export default function CommissionCard({ title, price, content, status }) {
    return (
        <article className="group relative bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-[0_10px_30px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6)] hover:shadow-2xl transition-all duration-300 border border-zinc-100 dark:border-zinc-800 flex flex-col">
            <header className="px-4 py-3 flex items-center justify-between bg-zinc-50 dark:bg-zinc-800/30">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 flex items-center justify-center">
                        <Icon name="Briefcase" size={24} />
                    </div>
                    <Typography variant="small" className="font-bold text-zinc-900 dark:text-zinc-100">
                        Servicio
                    </Typography>
                </div>
                <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${!status
                        ? 'bg-red-50 dark:bg-red-900/20 text-red-500 border-red-100 dark:border-red-800/50'
                        : 'bg-green-50 dark:bg-green-900/20 text-green-500 border-green-100 dark:border-green-800/50'
                        }`}>
                        {status === 'closed' ? 'Cerrado' : 'Abierto'}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-500 text-[10px] font-bold uppercase tracking-wider border border-purple-100 dark:border-purple-800/50">
                        Comisión
                    </span>
                </div>
            </header>

            <div className="relative w-full aspect-square bg-zinc-50 dark:bg-zinc-800/30 overflow-hidden flex items-center justify-center p-6">
                <div className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white dark:bg-zinc-800 shadow-lg flex items-center justify-center text-zinc-400 hover:text-purple-500 hover:scale-110 transition-all duration-300">
                    <Icon name="BadgeCheck" size={20} />
                </div>

                <div className="w-full h-full transition-transform duration-700 group-hover:scale-110">
                    <Image
                        src={content}
                        alt={title}
                        width={400}
                        height={400}
                        className="object-contain"
                    />
                </div>
            </div>

            <footer className="p-5 space-y-4 bg-zinc-50 dark:bg-zinc-800/30">
                <div className="flex flex-col">
                    <Typography
                        variant="subtitle"
                        className="uppercase text-zinc-900 dark:text-white font-bold"
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant="body"
                        className="text-zinc-500 dark:text-zinc-100"
                    >
                        ${price}
                    </Typography>
                </div>

                <div>
                    <Button variant="primary">
                        <Icon name="ShoppingCart" size={18} />
                        Añadir al carrito
                    </Button>
                </div>
            </footer>
        </article>
    );
}
