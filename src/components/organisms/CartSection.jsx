import { useState } from 'react';
import useCart from '../../hooks/useCart';
import useSales from '../../hooks/useSales';
import CartItemSmall from '../molecules/CartItemSmall';
import LoaderCard from '../molecules/LoaderCard';
import ErrorCard from '../molecules/ErrorCard';
import Typography from '../atoms/Typography';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import PayPalCheckout from '../molecules/PayPalCheckout';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from '../molecules/Dialog';
import Loader from '../molecules/Loader';
import { toast } from 'sonner';

export default function CartSection() {
    const { cartItems, loading: cartLoading, error: cartError, refreshCart, discardItem } = useCart();
    const { createSale, updateSaleStatus, loading: salesLoading } = useSales();

    const [isRegistering, setIsRegistering] = useState(false);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [eduDialogOpen, setEduDialogOpen] = useState(false);
    const [currentSaleIds, setCurrentSaleIds] = useState([]);

    const loading = cartLoading || isRegistering || salesLoading;
    const error = cartError;

    const filteredItems = cartItems?.filter(item => item.status === 'selected') || [];

    const handleDiscard = async (id) => {
        try {
            const res = await discardItem(id);
            if (res.error) {
                toast.error(res.message || 'Error al descartar el item');
            } else {
                toast.success('Item descartado correctamente');
            }
        } catch (error) {
            console.error(error);
            toast.error('Ocurrió un error inesperado');
        }
    };

    const handleBuyNow = async () => {
        if (filteredItems.length === 0) return;

        setIsRegistering(true);
        const saleIds = [];

        try {
            for (const item of filteredItems) {
                const res = await createSale({
                    cartItemId: item.cartItemId,
                    total: item.priceAtMoment,
                    paymentMethod: 'paypal' 
                });
                if (res.error) throw new Error(res.message);
                saleIds.push(res.data.insertId || res.data.saleId);
            }
            setCurrentSaleIds(saleIds);
            setConfirmDialogOpen(true);
        } catch (err) {
            toast.error('Error al registrar la compra: ' + err.message);
        } finally {
            setIsRegistering(false);
        }
    };

    const handleCancelSale = async () => {
        setIsRegistering(true);
        try {
            const promises = currentSaleIds.map(id => updateSaleStatus(id, 'cancelled'));
            await Promise.all(promises);
            toast.info('Venta cancelada');
        } catch (err) {
            toast.error('Error al cancelar la venta');
        } finally {
            setIsRegistering(false);
            setConfirmDialogOpen(false);
            setCurrentSaleIds([]);
        }
    };

    const handleContinueToPayment = () => {
        setConfirmDialogOpen(false);
        setEduDialogOpen(true);
    };

    const handleSimulatePayment = async () => {
        setIsRegistering(true);
        try {
            const promises = currentSaleIds.map(id => updateSaleStatus(id, 'paid'));
            await Promise.all(promises);
            toast.success('¡Compra simulada con éxito!');
            refreshCart();
        } catch (err) {
            toast.error('Error al procesar el pago');
        } finally {
            setIsRegistering(false);
            setEduDialogOpen(false);
            setCurrentSaleIds([]);
        }
    };

    const handlePaymentSuccess = async (details) => {
        // ... (preserved logic if they use direct Paypal bypass)
        // For now, let's keep it but focus on the new flow
        // I will comment it out or adapt it if needed, but the user wants the "Buy Now" button flow.
    };

    const totalAmount = filteredItems.reduce((total, item) => total + parseFloat(item.priceAtMoment) * item.quantity, 0) || 0;

    return (
        <section className="py-8 px-4 w-full min-h-full">
            <div className="container max-w-4xl mx-auto p-4 md:p-8  rounded-3xl backdrop-blur-sm">
                <header className="mb-8 flex items-center justify-between">
                    <Typography variant="subtitle" className="text-zinc-100 font-bold flex items-center gap-2">
                        <Icon name="ShoppingCart" size={24} className="text-zinc-300" />
                        Tu Carrito
                    </Typography>
                    <Typography variant="body" className="text-zinc-300">
                        {filteredItems.length} items
                    </Typography>
                </header>

                <div className="space-y-6">
                    {loading && (
                        <>
                            <LoaderCard variant="list" />
                            <LoaderCard variant="list" />
                        </>
                    )}

                    {error && (
                        <div className="p-4">
                            <ErrorCard message={error} />
                        </div>
                    )}

                    {!loading && !error && filteredItems.length === 0 && (
                        <div className="text-center py-20 bg-zinc-800/20 rounded-2xl border border-zinc-800/50">
                            <Icon name="ShoppingCart" size={48} className="mx-auto text-zinc-500 mb-4" />
                            <Typography variant="h5" className="text-zinc-300 mb-2 font-semibold">
                                Tu carrito está vacío
                            </Typography>
                            <p className="text-zinc-500 mb-6">Parece que aún no has agregado comisiones.</p>

                            <Button variant="ghost" className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/20" onClick={() => window.location.href = '/profile/home'}>
                                Explorar Comisiones
                            </Button>
                        </div>
                    )}

                    {!loading && !error && filteredItems.map((cartItem) => (
                        <div className="flex-1" key={cartItem.cartItemId}>
                            <CartItemSmall
                                id={cartItem.cartItemId}
                                commissionId={cartItem.commissionId}
                                quantity={cartItem.quantity}
                                priceAtMoment={cartItem.priceAtMoment}
                                onDiscard={handleDiscard}
                            />
                        </div>
                    ))}
                </div>

                {cartItems?.length > 0 && (
                    <footer className="mt-8 pt-8 border-t border-zinc-800 flex flex-col items-center gap-6">
                        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6">
                            <div className="text-right w-full md:w-auto">
                                <span className="text-zinc-400 mr-4 text-sm uppercase tracking-wider font-medium">Total Estimado</span>
                                <span className="text-3xl font-bold text-white tracking-tight">
                                    ${totalAmount.toFixed(2)}
                                </span>
                            </div>

                            <div className="flex flex-col gap-3 w-full md:w-auto">
                                <Button
                                    variant="primary"
                                    className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-purple-900/20 transition-all active:scale-95 disabled:opacity-50"
                                    onClick={handleBuyNow}
                                    disabled={filteredItems.length === 0 || loading}
                                >
                                    {isRegistering ? (
                                        <Loader className="h-5 w-5 border-white" size="xs" />
                                    ) : (
                                        'Comprar ahora'
                                    )}
                                </Button>

                                <div className="w-full md:w-64 opacity-50 grayscale pointer-events-none">
                                    <PayPalCheckout
                                        amount={totalAmount}
                                        onSuccess={handlePaymentSuccess}
                                        onError={(err) => toast.error('Error en el pago con PayPal')}
                                    />
                                </div>
                            </div>
                        </div>
                    </footer>
                )}
            </div>

            {/* Diálogo de Confirmación */}
            <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
                <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
                    <DialogHeader>
                        <DialogTitle>Confirmar Compra</DialogTitle>
                        <DialogDescription className="text-zinc-400">
                            Se han registrado tus items para la compra. ¿Deseas continuar con el pago o cancelar el proceso?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-6 gap-3">
                        <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-zinc-800" onClick={handleCancelSale} disabled={isRegistering}>
                            Cancelar
                        </Button>
                        <Button variant="primary" className="bg-purple-600 hover:bg-purple-500" onClick={handleContinueToPayment} disabled={isRegistering}>
                            Continuar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Diálogo Educativo / Simulación PayPal */}
            <Dialog open={eduDialogOpen} onOpenChange={setEduDialogOpen}>
                <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Icon name="Info" className="text-blue-400" />
                            Proyecto Educativo
                        </DialogTitle>
                        <DialogDescription className="text-zinc-400">
                            Este es un proyecto educativo y la opción de pago real vía PayPal no está disponible en este momento.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-6 space-y-4">
                        <div className="p-4 bg-blue-900/20 border border-blue-800/50 rounded-lg text-sm text-blue-200">
                            Sin embargo, puedes simular el flujo completo de la plataforma haciendo clic en el botón de abajo. Esto marcará tu compra como <strong>pagada</strong> en el sistema.
                        </div>

                        {/* Simulación de PayPal desactivada */}
                        <div className="opacity-30 grayscale pointer-events-none">
                            <div className="bg-[#ffc439] h-10 rounded-md flex items-center justify-center font-bold text-[#003087] italic">
                                PayPal
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="primary"
                            className="w-full bg-green-600 hover:bg-green-500 text-white font-bold"
                            onClick={handleSimulatePayment}
                            disabled={isRegistering}
                        >
                            {isRegistering ? <Loader className="border-white" size="xs" /> : 'Pagar para simular compra'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    );
}
