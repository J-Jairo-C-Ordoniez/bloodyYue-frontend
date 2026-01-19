import Icon from '../atoms/Icon';
import Typography from '../atoms/Typography';
import Button from '../atoms/Button';

export default function NotificationDropdown({ isOpen, onClose, notifications = [], onRead, onReadAll }) {
    if (!isOpen) return null;

    const getIcon = (type) => {
        switch (type) {
            case 'reaction': return 'Heart';
            case 'message': return 'MessageCircle';
            case 'sale': return 'ShoppingBag';
            case 'commission': return 'Briefcase';
            default: return 'Bell';
        }
    };

    const getIconColor = (type) => {
        switch (type) {
            case 'reaction': return 'bg-red-100 dark:bg-red-950/50 text-red-600';
            case 'message': return 'bg-blue-100 dark:bg-blue-950/50 text-blue-600';
            case 'sale': return 'bg-green-100 dark:bg-green-950/50 text-green-600';
            default: return 'bg-purple-100 dark:bg-purple-950/50 text-purple-600';
        }
    };

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
                            Notificaciones
                        </Typography>
                        <Button variant="ghost" size="small" onClick={onReadAll}>
                            <Typography variant="small" className="text-purple-600">
                                Marcar todas como leídas
                            </Typography>
                        </Button>
                    </div>
                </header>

                <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                        <div className="p-6 text-center text-zinc-500">
                            No tienes notificaciones
                        </div>
                    ) : (
                        notifications.map((notification) => (
                            <article
                                key={notification.notificationId}
                                onClick={() => !notification.isRead && onRead(notification.notificationId)}
                                className={`px-6 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer border-b border-zinc-100 dark:border-zinc-800 last:border-b-0 ${!notification.isRead ? 'bg-purple-50 dark:bg-purple-950/20' : ''
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getIconColor(notification.type)}`}>
                                        <Icon name={getIcon(notification.type)} size={20} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <Typography variant="small" className="text-zinc-900 dark:text-zinc-100">
                                            <span className="text-zinc-600 dark:text-zinc-400">
                                                {notification.message}
                                            </span>
                                        </Typography>
                                        <Typography variant="small" className="text-zinc-500 dark:text-zinc-500 text-xs mt-1">
                                            {new Date(notification.createdAt).toLocaleDateString()}
                                        </Typography>
                                    </div>
                                    {!notification.isRead && (
                                        <div className="w-2 h-2 rounded-full bg-purple-600" />
                                    )}
                                </div>
                            </article>
                        ))
                    )}
                </div>

                <footer className="px-6 py-3 border-t border-zinc-200 dark:border-zinc-800">
                    <Button
                        variant="ghost"
                        className="w-full justify-center text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/20"
                    >
                        Ver todas las notificaciones
                    </Button>
                </footer>
            </div>
        </>
    );
}
