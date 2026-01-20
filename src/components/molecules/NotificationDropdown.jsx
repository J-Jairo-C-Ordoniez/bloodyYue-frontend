import Icon from '../atoms/Icon';
import Typography from '../atoms/Typography';
import Button from '../atoms/Button';

export default function NotificationDropdown({ isOpen, onClose, notifications = [], onRead, onReadAll }) {
    if (!isOpen) return null;

    const getIcon = (type) => {
        switch (type) {
            case 'reaction': return 'Heart';
            case 'sale': return 'ShoppingBag';
            case 'message': return 'MessageCircle';
            case 'post': return 'FileText';
            case 'commission': return 'Briefcase';
            default: return 'Bell';
        }
    };

    const getIconColor = (type) => {
        switch (type) {
            case 'reaction': return 'bg-red-950/50 text-red-600';
            case 'sale': return 'bg-green-950/50 text-green-600';
            case 'message': return 'bg-blue-950/50 text-blue-600';
            case 'post': return 'bg-green-950/50 text-green-600';
            case 'commission': return 'bg-red-950/50 text-red-600';
            default: return 'bg-purple-950/50 text-purple-600';
        }
    };

    return (
        <>
            <div
                className="fixed inset-0 z-40"
                onClick={onClose}
            />

            <section className="absolute top-full right-0 mt-2 w-96 bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-800 z-50 overflow-hidden">
                <header className="px-6 py-4 border-b border-zinc-800">
                    <div className="container flex items-center justify-between">
                        <Typography variant="h6" className="font-bold text-zinc-200">
                            Notificaciones
                        </Typography>
                        <Button
                            variant="ghost"
                            size="small"
                            onClick={onReadAll}
                        >
                            <span
                                className="text-purple-600"
                            >
                                Marcar todas como leídas
                            </span>
                        </Button>
                    </div>
                </header>

                <section className="max-h-96 scrollbar overflow-y-auto">
                    {notifications.length === 0 ? (
                        <Typography variant="small" className="p-6 text-center text-zinc-500">
                            No tienes notificaciones
                        </Typography>
                    ) : (
                        notifications.map((notification) => (
                            <article
                                key={notification.notificationId}
                                onClick={() => onRead(notification.notificationId)}
                                className='px-6 py-4 hover:bg-zinc-800 transition-colors cursor-pointer last:border-b-0'
                            >
                                <div className="flex items-start gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getIconColor(notification.type)}`}>
                                        <Icon name={getIcon(notification.type)} size={20} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <Typography variant="small" className="text-zinc-100">
                                            {notification.message}
                                        </Typography>
                                        <Typography variant="small" className="text-zinc-500 text-xs mt-1">
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
                </section>
            </section>
        </>
    );
}
