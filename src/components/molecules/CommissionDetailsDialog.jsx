import Dialog from '../atoms/Dialog';
import Button from '../atoms/Button';
import Image from '../atoms/Image';
import Icon from '../atoms/Icon';

export default function CommissionDetailsDialog({ isOpen, onClose, title, content, price, description, terms, onAddToCart, isLoading }) {
    return (
        <Dialog isOpen={isOpen} onClose={onClose} title={title} className="bg-[#121212] m-auto! max-h-[90vh] flex flex-col">
            <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-full max-w-md rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex justify-center border border-zinc-200 dark:border-zinc-700 p-4">
                    <Image
                        src={content}
                        alt={title}
                        width={500}
                        height={500}
                        className="object-contain max-h-[40vh]"
                    />
                </div>

                <div className="space-y-4 w-full text-left">
                    <div>
                        <h3 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-white">${price}</h3>
                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mx-auto text-center">
                            {description || "Sin descripción disponible."}
                        </p>
                        {terms && (
                            <div className="mt-4 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg text-sm">
                                <p className="font-bold mb-1">Términos:</p>
                                <p className="text-zinc-600 dark:text-zinc-400">{terms}</p>
                            </div>
                        )}
                    </div>

                    <Button
                        variant="primary"
                        className="w-full max-w-sm mx-auto"
                        onClick={onAddToCart}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2 justify-center">
                                <Icon name="Loader2" size={18} className="animate-spin" />
                                Procesando...
                            </span>
                        ) : 'Añadir al carrito'}
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}
