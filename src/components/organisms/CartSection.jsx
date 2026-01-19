import useCart from '../../hooks/useCart';
import CartItemSmall from '../molecules/CartItemSmall';
import LoaderCard from '../molecules/LoaderCard';
import ErrorCard from '../molecules/ErrorCard';
import Typography from '../atoms/Typography';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';

export default function CartSection() {
    const { cartItems, isLoadingCartItems, errorCartItems } = useCart();

    const handleComparar = () => {
        alert("Funcionalidad de comparar próximamente");
    };

    const handleContactar = () => {
        alert("Contactando con el vendedor...");
        // Logic to open chat or email
    };

    return (
        <section className="py-8 px-4 bg-[#0B0B0E] min-h-full">
            <div className="max-w-4xl mx-auto p-4 md:p-8">
                <header className="mb-8 flex items-center justify-between">
                    <Typography variant="h2" className="text-zinc-900 dark:text-zinc-100 font-bold">
                        Tu Carrito
                    </Typography>
                    <Typography variant="body" className="text-zinc-500">
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
                        <div className="text-center py-20">
                            <Icon name="ShoppingCart" size={48} className="mx-auto text-zinc-300 mb-4" />
                            <Typography variant="h5" className="text-zinc-500 mb-4">
                                Tu carrito está vacío
                            </Typography>
                            <Button variant="primary" onClick={() => window.location.href = '/profile/home'}>
                                Explorar Comisiones
                            </Button>
                        </div>
                    )}

                    {!isLoadingCartItems && !errorCartItems && cartItems?.data?.map((cartItem) => (
                        <div key={cartItem.cartItemId} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
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
                                <Button variant="secondary" size="small" onClick={handleComparar} title="Comparar">
                                    <Icon name="GitCompare" size={18} />
                                    <span className="ml-2 hidden sm:inline">Comparar</span>
                                </Button>
                                <Button variant="primary" size="small" onClick={handleContactar} title="Contactar">
                                    <Icon name="MessageCircle" size={18} />
                                    <span className="ml-2 hidden sm:inline">Contactar</span>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                {cartItems?.data?.length > 0 && (
                    <footer className="mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-right w-full md:w-auto">
                            <span className="text-zinc-500 mr-4">Total Estimado</span>
                            <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                                ${cartItems.data.reduce((total, item) => total + item.priceAtMoment * item.quantity, 0).toFixed(2)}
                            </span>
                        </div>
                        <Button variant="primary" className="w-full md:w-auto px-8">
                            Proceder al Pago
                        </Button>
                    </footer>
                )}
            </div>
        </section>
    );
}
