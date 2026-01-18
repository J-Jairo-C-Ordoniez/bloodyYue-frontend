'use client';

import { useState } from 'react';
import Icon from '../atoms/Icon';
import Typography from '../atoms/Typography';
import Button from '../atoms/Button';

export default function NotificationDropdown({ isOpen, onClose }) {
    // Static notifications data (will be replaced with real API later)
    const [notifications] = useState([
        {
            id: 1,
            icon: 'Heart',
            user: 'kpop_fan_99',
            action: 'liked your post',
            time: '5m ago',
            isRead: false
        },
        {
            id: 2,
            icon: 'MessageCircle',
            user: 'ArtLover22',
            action: 'commented: "Amazing work!"',
            time: '2h ago',
            isRead: false
        },
        {
            id: 3,
            icon: 'ShoppingBag',
            user: 'Mina Shop',
            action: 'purchased your commission',
            time: '5h ago',
            isRead: true
        },
        {
            id: 4,
            icon: 'UserPlus',
            user: 'new_artist_2024',
            action: 'started following you',
            time: '1d ago',
            isRead: true
        }
    ]);

    if (!isOpen) return null;

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
                        <Button variant="ghost" size="small">
                            <Typography variant="small" className="text-purple-600">
                                Marcar todas como leídas
                            </Typography>
                        </Button>
                    </div>
                </header>

                <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                        <article
                            key={notification.id}
                            className={`px-6 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer border-b border-zinc-100 dark:border-zinc-800 last:border-b-0 ${!notification.isRead ? 'bg-purple-50 dark:bg-purple-950/20' : ''
                                }`}
                        >
                            <div className="flex items-start gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${notification.icon === 'Heart' ? 'bg-red-100 dark:bg-red-950/50 text-red-600' :
                                        notification.icon === 'MessageCircle' ? 'bg-blue-100 dark:bg-blue-950/50 text-blue-600' :
                                            notification.icon === 'ShoppingBag' ? 'bg-green-100 dark:bg-green-950/50 text-green-600' :
                                                'bg-purple-100 dark:bg-purple-950/50 text-purple-600'
                                    }`}>
                                    <Icon name={notification.icon} size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <Typography variant="small" className="text-zinc-900 dark:text-zinc-100">
                                        <span className="font-semibold">{notification.user}</span>
                                        {' '}
                                        <span className="text-zinc-600 dark:text-zinc-400">
                                            {notification.action}
                                        </span>
                                    </Typography>
                                    <Typography variant="small" className="text-zinc-500 dark:text-zinc-500 text-xs mt-1">
                                        {notification.time}
                                    </Typography>
                                </div>
                                {!notification.isRead && (
                                    <div className="w-2 h-2 rounded-full bg-purple-600" />
                                )}
                            </div>
                        </article>
                    ))}
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
