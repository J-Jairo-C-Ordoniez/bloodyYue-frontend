import { useState } from 'react';
import cart from '../../api/cart/index';
import Typography from '../atoms/Typography';
import Image from '../atoms/Image';
import Icon from '../atoms/Icon';
import Button from '../atoms/Button';
import useAuthStore from '../../store/auth.store';
import CommissionDetailsDialog from './CommissionDetailsDialog';
import CommissionOrderFormDialog from './CommissionOrderFormDialog';
import AuthRequiredDialog from './AuthRequiredDialog';

export default function CommissionCard({ commissionId, title, price, content, status }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [isOrderOpen, setIsOrderOpen] = useState(false);
    const user = useAuthStore.getState().user;

    const handleOpenDetails = () => setIsDetailsOpen(true);
    const handleCloseDetails = () => setIsDetailsOpen(false);

    const handleOpenOrder = () => setIsOrderOpen(true);
    const handleCloseOrder = () => setIsOrderOpen(false);

    const handleAddToCartClick = () => {
        if (!user) {
            setIsAuthOpen(true);
            return;
        }

        handleOpenOrder();
    };

    const handleConfirmOrder = async (formData) => {
        try {
            setIsLoading(true);
            const res = await cart.cartItemsPost({
                data: formData
            });

            if (res.error) {
                alert("Error al agregar al carrito: " + res.message);
            } else {
                alert("Agregado al carrito exitosamente");
                handleCloseOrder();
                handleCloseDetails();
            }
        } catch (error) {
            toast.error("Ocurrió un error al cargar la comisión");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <article className="group relative rounded-3xl overflow-hidden flex flex-col">
                <header className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center">
                            <Icon name="Briefcase" size={24} />
                        </div>
                        <Typography variant="small" className="font-bold text-zinc-100">
                            Servicio
                        </Typography>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${!status
                            ? 'bg-red-900/20 text-red-500 border-red-800/50'
                            : 'bg-green-900/20 text-green-500 border-green-800/50'
                            }`}>
                            {status === 'closed' ? 'Cerrado' : 'Abierto'}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-purple-900/20 text-purple-500 text-[10px] font-bold uppercase tracking-wider border border-purple-800/50">
                            Comisión
                        </span>
                    </div>
                </header>

                <div className="aspect-square w-full bg-zinc-900 flex justify-center items-center overflow-hidden">
                    <Button
                        variant="noneDetails"
                        size="none"
                        onClick={handleOpenDetails}
                        className="w-full h-full"
                    >

                        <Image
                            src={content}
                            alt={title}
                            width={500}
                            height={500}
                        />
                    </Button>
                </div>

                <footer className="p-5 space-y-4">
                    <div className="flex flex-col">
                        <Typography variant="subtitle" className="text-sm">
                            <span className="font-bold text-zinc-200 mr-2">{title}</span>
                        </Typography>
                        <Typography
                            variant="body"
                            className="text-zinc-100 font-semibold"
                        >
                            ${price}
                        </Typography>
                    </div>

                    <div>
                        <Button
                            variant="primary"
                            onClick={handleAddToCartClick}
                            disabled={isLoading}
                        >
                            <Icon name="ShoppingCart" size={18} />
                            Añadir al carrito
                        </Button>
                    </div>
                </footer>
            </article>

            <CommissionDetailsDialog
                commissionId={commissionId}
                isOpen={isDetailsOpen}
                onClose={handleCloseDetails}
                onAddToCart={() => {
                    handleCloseDetails();
                    handleAddToCartClick();
                }}
                isLoading={isLoading && isDetailsOpen}
            />

            <CommissionOrderFormDialog
                isOpen={isOrderOpen}
                onClose={handleCloseOrder}
                commissionId={commissionId}
                title={title}
                price={price}
                onSubmit={handleConfirmOrder}
                isLoading={isLoading}
            />

            <AuthRequiredDialog
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
            />
        </>
    );
}
