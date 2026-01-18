'use client';

import Icon from '../atoms/Icon';
import Typography from '../atoms/Typography';
import Button from '../atoms/Button';
import CartItemSmall from './CartItemSmall';
import LoaderCard from './LoaderCard';
import ErrorCard from './ErrorCard';
import useCart from '../../hooks/useCart';

export default function CartDropdown({ isOpen, onClose }) {
    const { cartItems, isLoadingCartItems, errorCartItems } = useCart();

    if (!isOpen) return null;

    const total = cartItems?.data?.length > 0
        ? cartItems.data.reduce((sum, item) => sum + (item.priceAtMoment * item.quantity), 0).toFixed(2)
        : '0.00';

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40"
                onClick={onClose}
            />

            {/* Dropdown */}
            <div className="absolute top-full right-0 mt-2 w-96 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 z-50 overflow-hidden">
                <header className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center justify-between">
                        <Typography variant="h6" className="font-bold">
                            Carrito de Compras
                        </Typography>
                        <div className="flex items-center gap-2">
                            <Icon name="ShoppingCart" size={20} className="text-purple-600" />
                            <Typography variant="small" className="font-semibold text-purple-600">
                                {cartItems?.data?.length || 0} items
                            </Typography>
                        </div>
                    </div>
                </header>

                <div className="max-h-96 overflow-y-auto p-4">
                    {isLoadingCartItems && (
                        <div className="space-y-2">
                            <LoaderCard variant="list" />
                            <LoaderCard variant="list" />
                            <LoaderCard variant="list" />
                        </div>
                    )}

                    {(errorCartItems || cartItems?.error) && (
                        <div className="flex flex-col items-center justify-center py-8">
                            <ErrorCard message={errorCartItems || 'Error al cargar el carrito'} />
                        </div>
                    )}

                    {!isLoadingCartItems && !errorCartItems && cartItems?.data?.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                                <Icon name="ShoppingCart" size={40} className="text-zinc-400" />
                            </div>
                            <Typography variant="body" className="text-zinc-500 dark:text-zinc-400 text-center">
                                Tu carrito está vacío
                            </Typography>
                            <Typography variant="small" className="text-zinc-400 dark:text-zinc-500 text-center mt-2">
                                Agrega algunos productos para comenzar
                            </Typography>
                        </div>
                    )}

                    {!isLoadingCartItems && !errorCartItems && cartItems?.data?.length > 0 && (
                        <div className="space-y-3">
                            {cartItems.data.map((cartItem) => (
                                <CartItemSmall
                                    key={cartItem.cartItemId}
                                    id={cartItem.cartItemId}
                                    commissionId={cartItem.commissionId}
                                    quantity={cartItem.quantity}
                                    status={cartItem.status}
                                    priceAtMoment={cartItem.priceAtMoment}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {!isLoadingCartItems && !errorCartItems && cartItems?.data?.length > 0 && (
                    <>
                        <div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800">
                            <div className="flex items-center justify-between mb-4">
                                <Typography variant="body" className="font-semibold">
                                    Subtotal
                                </Typography>
                                <Typography variant="body" className="font-bold text-purple-600">
                                    ${total}
                                </Typography>
                            </div>
                            <div className="space-y-2">
                                <Button
                                    variant="primary"
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                                >
                                    Ir al Checkout
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                                >
                                    Ver Carrito Completo
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
