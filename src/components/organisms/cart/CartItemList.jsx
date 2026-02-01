import CartItemSmall from '../../molecules/CartItemSmall';
import LoaderCard from '../../molecules/LoaderCard';
import ErrorCard from '../../molecules/ErrorCard';
import Typography from '../../atoms/Typography';
import Button from '../../atoms/Button';
import Icon from '../../atoms/Icon';

export default function CartItemList({
    items,
    loading,
    error,
    onDiscard
}) {
    if (loading && items.length === 0) {
        return (
            <div className="space-y-6">
                <LoaderCard variant="list" />
                <LoaderCard variant="list" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4">
                <ErrorCard message={error} />
            </div>
        );
    }

    if (items.length === 0) {
        return (
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
        );
    }

    return (
        <div className="space-y-6">
            {items.map((cartItem) => (
                <div className="flex-1" key={cartItem.cartItemId}>
                    <CartItemSmall
                        id={cartItem.cartItemId}
                        commissionId={cartItem.commissionId}
                        quantity={cartItem.quantity}
                        priceAtMoment={cartItem.priceAtMoment}
                        onDiscard={onDiscard}
                    />
                </div>
            ))}
        </div>
    );
}
