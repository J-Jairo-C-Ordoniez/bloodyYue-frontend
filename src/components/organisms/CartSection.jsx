import { useState } from 'react';
import useCart from '../../hooks/useCart';
import useSales from '../../hooks/useSales';
import { toast } from 'sonner';
import CartHeader from './cart/CartHeader';
import CartItemList from './cart/CartItemList';
import CartFooter from './cart/CartFooter';
import CartDialogs from './cart/CartDialogs';

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
            toast.error("Error al procesar la compra");
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

    const totalAmount = filteredItems.reduce((total, item) => total + parseFloat(item.priceAtMoment) * item.quantity, 0) || 0;

    return (
        <section className="py-8 px-4 w-full min-h-full">
            <div className="container max-w-4xl mx-auto p-4 md:p-8 rounded-3xl backdrop-blur-sm">
                <CartHeader itemCount={filteredItems.length} />

                <CartItemList
                    items={filteredItems}
                    loading={loading}
                    error={error}
                    onDiscard={handleDiscard}
                />

                {(cartItems?.length > 0) && (
                    <CartFooter
                        totalAmount={totalAmount}
                        onBuyNow={handleBuyNow}
                        isRegistering={isRegistering}
                        isDisabled={filteredItems.length === 0 || loading}
                    />
                )}
            </div>

            <CartDialogs
                confirmOpen={confirmDialogOpen}
                setConfirmOpen={setConfirmDialogOpen}
                eduOpen={eduDialogOpen}
                setEduOpen={setEduDialogOpen}
                onCancelSale={handleCancelSale}
                onContinueToPayment={handleContinueToPayment}
                onSimulatePayment={handleSimulatePayment}
                isProcessing={isRegistering}
            />
        </section>
    );
}
