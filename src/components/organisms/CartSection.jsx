import useCart from '../../hooks/useCart';
import useSales from '../../hooks/useSales';
import CartItemSmall from '../molecules/CartItemSmall';
import LoaderCard from '../molecules/LoaderCard';
import ErrorCard from '../molecules/ErrorCard';
import Typography from '../atoms/Typography';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import PayPalCheckout from '../molecules/PayPalCheckout';
import { toast } from 'sonner';
import cart from '../../api/cart';

export default function CartSection() {
    const { cartItems, isLoadingCartItems, errorCartItems, refetch } = useCart();
    const { createSale, updateSaleStatus } = useSales();

    const filteredItems = cartItems?.data?.filter(item => item.status === 'selected') || [];

    const handleDiscard = async (id) => {
        try {
            const res = await cart.cartItemDiscardedPatch({ id });
            if (res.error) {
                toast.error(res.message || 'Error al descartar el item');
            } else {
                toast.success('Item descartado correctamente');
                refetch();
            }
        } catch (error) {
            console.error(error);
            toast.error('Ocurrió un error inesperado');
        }
    };

    const handlePaymentSuccess = async (details) => {
        if (filteredItems.length === 0) return;

        const promises = filteredItems.map(async (item) => {
            // 1. Create Sale (Initiated)
            const saleRes = await createSale({
                cartItemId: item.cartItemId,
                total: item.priceAtMoment,
                paymentMethod: 'paypal'
            });

            if (saleRes.error) {
                console.error(`Error creating sale for item ${item.cartItemId}:`, saleRes.message);
                throw new Error(saleRes.message);
            }

            const saleId = saleRes.data.insertId || saleRes.data.saleId; // Adjust based on actual API return

            // 2. Update Status (Paid) -> Triggers DetailsSale
            const updateRes = await updateSaleStatus(saleId, 'paid');

            if (updateRes.error) {
                console.error(`Error updating sale ${saleId}:`, updateRes.message);
                // Don't throw here to avoid failing everything if payment worked but update failed? 
                // Actually better to throw to catch below.
                throw new Error(updateRes.message);
            }
            return updateRes;
        });

        try {
            await Promise.all(promises);
            toast.success('Compra realizada con éxito!');
            // Reload page or force refresh cart (it should be empty in DB now if backend handles it, or we need to clear it?)
            // Usually sale creation might consume the cart item or we update cart item status?
            // "cartItems" table has status 'selected', 'discarded', 'purchased'.
            // The backend PROBABLY updates cartItem to 'purchased' when sale is paid.
            refetch();
        } catch (error) {
            toast.error('Hubo un problema al procesar algunos items.');
            console.error(error);
        }
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
                    {isLoadingCartItems && (
                        <>
                            <LoaderCard variant="list" />
                            <LoaderCard variant="list" />
                        </>
                    )}

                    {(errorCartItems || cartItems?.error) && (
                        <div className="p-4">
                            <ErrorCard message={errorCartItems || 'Error al cargar el carrito'} />
                        </div>
                    )}

                    {!isLoadingCartItems && !errorCartItems && filteredItems.length === 0 && (
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

                    {!isLoadingCartItems && !errorCartItems && filteredItems.map((cartItem) => (
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

                {cartItems?.data?.length > 0 && (
                    <footer className="mt-8 pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-right w-full md:w-auto">
                            <span className="text-zinc-400 mr-4 text-sm uppercase tracking-wider font-medium">Total Estimado</span>
                            <span className="text-3xl font-bold text-white tracking-tight">
                                ${totalAmount.toFixed(2)}
                            </span>
                        </div>

                        <div className="w-full md:w-64">
                            <PayPalCheckout
                                amount={totalAmount}
                                onSuccess={handlePaymentSuccess}
                                onError={(err) => toast.error('Error en el pago con PayPal')}
                            />
                        </div>
                    </footer>
                )}
            </div>
        </section>
    );
}
