import Typography from '../atoms/Typography';
import Label from '../atoms/Label';
import Button from '../atoms/Button';
import CartItemSmall from '../molecules/CartItemSmall';
import LoaderCard from '../molecules/LoaderCard';
import ErrorCard from '../molecules/ErrorCard';
import MessageItem from '../molecules/MessageItem';
import useCart from '../../hooks/useCart';
import useChats from '../../hooks/useChats';

export default function ProfileSidebarRight({ setActiveTab }) {
    const { cartItems, isLoadingCartItems, errorCartItems } = useCart();
    const { chats, isLoadingChats, errorChats } = useChats();

    return (
        <aside className="w-80 sticky top-24">
            <section className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800 shadow-sm">
                <header className="flex items-center justify-between mb-4 pb-4 border-b border-zinc-800">
                    <Typography
                        variant="small"
                        className="uppercase w-fit text-white"
                    >
                        Items en el carrito
                    </Typography>
                    <Label
                        variant="ghost"
                        color='#FF00FF'
                    >
                        {cartItems?.data?.length || 0} Items
                    </Label>
                </header>

                <article className="space-y-2 mb-4">
                    {isLoadingCartItems && (
                        <div className="space-y-2">
                            <LoaderCard variant="list" />
                            <LoaderCard variant="list" />
                            <LoaderCard variant="list" />
                        </div>
                    )}
                    {errorCartItems || cartItems?.error && (
                        <div className="flex flex-col items-center justify-center">
                            <ErrorCard message={errorCartItems || 'No hay items en el carrito'} />
                        </div>
                    )}
                    {!isLoadingCartItems && !errorCartItems && cartItems?.data && cartItems?.data?.length > 0 && cartItems?.data?.map((cartItem) => (
                        <CartItemSmall
                            key={cartItem.cartItemId}
                            id={cartItem.cartItemId}
                            commissionId={cartItem.commissionId}
                            quantity={cartItem.quantity}
                            status={cartItem.status}
                            priceAtMoment={cartItem.priceAtMoment}
                        />
                    ))}
                </article>


                <div className="flex items-center justify-between mb-4 pt-4 border-t border-zinc-800">
                    <Typography variant="body" className="text-sm text-zinc-500">Total</Typography>
                    <Typography variant="body" className="text-sm font-bold text-zinc-100">
                        ${cartItems?.data &&
                            cartItems?.data?.length > 0 &&
                            cartItems?.data?.reduce((total, cartItem) => total + cartItem.priceAtMoment * cartItem.quantity, 0).toFixed(2)}
                    </Typography>
                </div>

                <Button
                    variant="primary"
                    className="w-full bg-white text-black hover:bg-zinc-200 border-none"
                    onClick={() => setActiveTab('cart')}
                >
                    Ver Todo
                </Button>
            </section>

            <section className='mt-80'>
                <div className="flex items-center justify-between px-1 mb-4">
                    <Typography variant="subtitle" className="text-sm font-bold text-zinc-100">Chats</Typography>
                </div>

                <div className="bg-zinc-900 rounded-2xl p-2 border border-zinc-800 shadow-sm space-y-1">
                    {isLoadingChats ? (
                        <div className="p-4 text-center text-sm text-zinc-500">Cargando chats...</div>
                    ) : errorChats ? (
                        <div className="p-4 text-center text-sm text-red-500">Error: {errorChats}</div>
                    ) : chats?.length === 0 ? (
                        <div className="p-4 text-center text-sm text-zinc-500">No tienes mensajes.</div>
                    ) : (
                        chats?.map(chat => (
                            <MessageItem
                                key={chat.chatId}
                                user={chat.name}
                                avatar={chat.avatar}
                                isOnline={false}
                            />
                        ))
                    )}
                </div>
            </section>

        </aside>
    );
}
