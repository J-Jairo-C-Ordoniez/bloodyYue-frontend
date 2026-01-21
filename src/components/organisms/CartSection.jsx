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

export default function CartSection() {
    const { cartItems, isLoadingCartItems, errorCartItems } = useCart();
    const { createSale, updateSaleStatus } = useSales();

    const handleComparar = () => {
        alert("Funcionalidad de comparar próximamente");
    };

    const handleContactar = () => {
        alert("Contactando con el vendedor...");
    };

    const handlePaymentSuccess = async (details) => {
        if (!cartItems?.data) return;

        const promises = cartItems.data.map(async (item) => {
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
            setTimeout(() => window.location.reload(), 1500);
        } catch (error) {
            toast.error('Hubo un problema al procesar algunos items.');
            console.error(error);
        }
    };

    const totalAmount = cartItems?.data?.reduce((total, item) => total + parseFloat(item.priceAtMoment) * item.quantity, 0) || 0;

    return (
        <section className="py-8 px-4 w-full min-h-full">
            <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-900/50 border border-zinc-800 rounded-3xl backdrop-blur-sm">
                <header className="mb-8 flex items-center justify-between">
                    <Typography variant="h2" className="text-zinc-100 font-bold">
                        Tu Carrito
                    </Typography>
                    <Typography variant="body" className="text-zinc-300">
                        {cartItems?.data?.length || 0} items
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

                    {!isLoadingCartItems && !errorCartItems && (!cartItems?.data || cartItems?.data.length === 0) && (
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

                    {!isLoadingCartItems && !errorCartItems && cartItems?.data?.map((cartItem) => (
                        <div key={cartItem.cartItemId} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-xl bg-zinc-950 border border-zinc-800/50 hover:border-zinc-700 transition-colors">
                            <div className="flex-1">
                                <CartItemSmall
                                    id={cartItem.cartItemId}
                                    commissionId={cartItem.commissionId}
                                    quantity={cartItem.quantity}
                                    status={cartItem.status}
                                    priceAtMoment={cartItem.priceAtMoment}
                                />
                            </div>
                            <div className="flex gap-2 shrink-0 mt-2 md:mt-0">
                                <Button variant="secondary" size="small" onClick={handleComparar} title="Comparar" className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300">
                                    <Icon name="GitCompare" size={18} />
                                </Button>
                                <Button variant="primary" size="small" onClick={handleContactar} title="Contactar" className="bg-purple-600 hover:bg-purple-700">
                                    <Icon name="MessageCircle" size={18} />
                                </Button>
                            </div>
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
