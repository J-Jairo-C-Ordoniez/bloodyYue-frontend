import Typography from '../atoms/Typography';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import CartItemSmall from '../molecules/CartItemSmall';
import ActivityItem from '../molecules/ActivityItem';
import MessageItem from '../molecules/MessageItem';

export default function ProfileSidebarRight() {
    return (
        <aside className="w-80 shrink-0 sticky top-24 self-start space-y-6 hidden xl:block">

            {/* Shopping Cart */}
            <section className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <Typography variant="h6" className="text-sm font-bold">Shopping Cart</Typography>
                    <span className="bg-purple-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">2 items</span>
                </div>

                <div className="space-y-2 mb-4">
                    <CartItemSmall
                        image="https://res.cloudinary.com/del3gtz5i/image/upload/v1768341080/64435445-a1f2-48bf-9973-b031bba0c7ff_cvlhut.webp" // Placeholder
                        title="Neon Portrait Print (A4)"
                        price="25.00"
                    />
                    <CartItemSmall
                        image="https://res.cloudinary.com/del3gtz5i/image/upload/v1768341080/64435445-a1f2-48bf-9973-b031bba0c7ff_cvlhut.webp" // Placeholder
                        title="Sticker Pack Vol. 1"
                        price="12.00"
                    />
                </div>

                <div className="flex items-center justify-between mb-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    <span className="text-sm text-zinc-500">Total</span>
                    <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">$37.00</span>
                </div>

                <Button variant="primary" className="w-full bg-white text-black hover:bg-zinc-200 border-none">
                    Checkout
                </Button>
            </section>

            {/* Recent Activity */}
            <section>
                <Typography variant="h6" className="px-1 mb-4 text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Recent Activity
                </Typography>
                <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <ActivityItem
                        icon="Heart"
                        user="kpop_fan_99"
                        action="liked your comment"
                        time="5m ago"
                    />
                    <ActivityItem
                        icon="ShoppingBag"
                        user="Mina Shop"
                        action="Cyberpunk Collection is now live"
                        time="2h ago"
                    />
                    <ActivityItem
                        icon="MessageCircle"
                        user="ArtLover22"
                        action="commented: 'Amazing work!'"
                        time="5h ago"
                    />
                </div>
            </section>

            {/* Messages */}
            <section>
                <div className="flex items-center justify-between px-1 mb-4">
                    <Typography variant="h6" className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Messages</Typography>
                    <button className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
                        <Icon name="Edit" size={16} />
                    </button>
                </div>

                <div className="bg-white dark:bg-zinc-900 rounded-2xl p-2 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-1">
                    <MessageItem
                        user="Commission Client"
                        avatar="https://res.cloudinary.com/del3gtz5i/image/upload/v1768341080/64435445-a1f2-48bf-9973-b031bba0c7ff_cvlhut.webp"
                        message="Is the sketch ready?"
                        time="10m"
                        isOnline={true}
                        unread={true}
                    />
                    <MessageItem
                        user="Sarah J."
                        avatar="https://res.cloudinary.com/del3gtz5i/image/upload/v1768341080/64435445-a1f2-48bf-9973-b031bba0c7ff_cvlhut.webp"
                        message="Love the new prints!"
                        time="1h"
                    />
                </div>
            </section>

        </aside>
    );
}
