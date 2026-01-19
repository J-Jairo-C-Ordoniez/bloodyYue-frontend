import { useState } from 'react';
import cart from '../../api/cart/index';
import Typography from '../atoms/Typography';
import Image from '../atoms/Image';
import Icon from '../atoms/Icon';
import Button from '../atoms/Button';
import Dialog from '../atoms/Dialog';
import Label from '../atoms/Label';
import useAuthStore from '../../store/auth.store';

export default function CommissionCard({ commissionId, title, price, content, status, description, terms }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);

    // Mock labels for now - normally passed via props or fetched
    const labels = [
        { labelId: 1, name: 'Digital', color: '#A855F7' },
        { labelId: 2, name: 'Portrait', color: '#EC4899' }
    ];

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            alert("Debes iniciar sesión para agregar al carrito");
            return;
        }

        try {
            setIsLoading(true);
            const res = await cart.cartItemsPost({
                data: { commissionId, quantity: 1 }
            });

            if (res.error) {
                alert("Error al agregar al carrito: " + res.message);
            } else {
                alert("Agregado al carrito exitosamente");
                handleClose(); // Close dialog on success if it was open
            }
        } catch (error) {
            console.error(error);
            alert("Error desconocido");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
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

                <div
                    className="relative w-full aspect-square bg-zinc-50 dark:bg-zinc-800/30 overflow-hidden flex items-center justify-center p-6 cursor-pointer"
                    onClick={handleOpen}
                >
                    <div className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white dark:bg-zinc-800 shadow-lg flex items-center justify-center text-zinc-400 group-hover:text-purple-500 group-hover:scale-110 transition-all duration-300">
                        <Icon name="Maximize2" size={20} />
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
                        <div className="flex items-center justify-between mt-1">
                            <div className="flex gap-2">
                                {labels.map(l => (
                                    <Label key={l.labelId} color={l.color} variant="ghost" size="small">
                                        {l.name}
                                    </Label>
                                ))}
                            </div>
                            <Typography
                                variant="body"
                                className="text-zinc-500 dark:text-zinc-100 font-bold"
                            >
                                ${price}
                            </Typography>
                        </div>
                    </div>

                    <div>
                        <Button
                            variant="primary"
                            onClick={handleAddToCart}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="animate-spin mr-2">
                                    <Icon name="Loader2" size={18} />
                                </span>
                            ) : (
                                <Icon name="ShoppingCart" size={18} />
                            )}
                            {isLoading ? 'Agregando...' : 'Añadir al carrito'}
                        </Button>
                    </div>
                </footer>
            </article>

            <Dialog isOpen={isOpen} onClose={handleClose} title={title}>
                <div className="flex flex-col items-center text-center space-y-6">
                    <div className="w-full max-w-md rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex justify-center border border-zinc-200 dark:border-zinc-700 p-4">
                        <Image
                            src={content}
                            alt={title}
                            width={500}
                            height={500}
                            className="object-contain max-h-[50vh]"
                        />
                    </div>

                    <div className="space-y-4 w-full">
                        <div className="flex flex-wrap gap-2 justify-center">
                            {labels.map(l => (
                                <Label key={l.labelId} color={l.color} variant="default">
                                    {l.name}
                                </Label>
                            ))}
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-white">${price}</h3>
                            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-lg mx-auto">
                                {description || "Sin descripción disponible."}
                            </p>
                            {terms && (
                                <div className="mt-4 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg text-sm text-left">
                                    <p className="font-bold mb-1">Términos:</p>
                                    <p className="text-zinc-600 dark:text-zinc-400">{terms}</p>
                                </div>
                            )}
                        </div>

                        <Button
                            variant="primary"
                            className="w-full max-w-sm mx-auto"
                            onClick={handleAddToCart}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Procesando...' : 'Añadir al carrito'}
                        </Button>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
