'use client';

import { useState } from 'react';
import Icon from '../atoms/Icon';
import Input from '../atoms/Input';
import Typography from '../atoms/Typography';
import Button from '../atoms/Button';
import Image from '../atoms/Image';
import NotificationDropdown from '../molecules/NotificationDropdown';
import useNotifications from '../../hooks/useNotifications';
import useSocket from '../../hooks/useSocket';

export default function ProfileHeader({ user }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const { notifications: getNotifications } = useNotifications();
    const { notifications: readNotification } = useNotifications('notificationReadPut');
    const { notifications: readAllNotifications } = useNotifications('notificationReadAllPut');

    useSocket();

    const toggleNotifications = async () => {
        setIsNotificationOpen(!isNotificationOpen);
        const res = await getNotifications();
        if(res.error) return setNotifications([]);
        setNotifications(res.data);
    };

    const onRead = async (notificationId) => {
        const res = await readNotification({ notificationId });
        if(res.error) return;
        toggleNotifications();
    };

    const onReadAll = async () => {
        const res = await readAllNotifications();
        if(res.error) return;
        toggleNotifications();
    };

    return (
        <header className="sticky top-0 z-50 border-b bg-[#0B0B0E] border-white/5">
            <div className="container mx-auto px-6 py-3.5 flex justify-between items-center gap-8">
                <Typography variant="h1" className="text-white">BloodyYue</Typography>

                <article className="flex-1 max-w-md">
                    <Input
                        type="text"
                        placeholder="Search artists, tags, or prints..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        icon="Search"
                    />
                </article>

                <article className="flex items-center gap-1 relative">
                    <Button
                        variant="ghost"
                        size='small'
                        title="Ayuda"
                    >
                        <Icon name="HelpCircle" size={22} />
                    </Button>

                    <div className="relative">
                        <Button
                            variant="ghost"
                            size='small'
                            onClick={toggleNotifications}
                            title="Notificaciones"
                            className={isNotificationOpen ? 'bg-zinc-100 dark:bg-zinc-800' : ''}
                        >
                            <Icon name="Bell" size={22} />
                        </Button>
                        <NotificationDropdown
                            isOpen={isNotificationOpen}
                            onClose={() => setIsNotificationOpen(false)}
                            notifications={notifications}
                            onRead={onRead}
                            onReadAll={onReadAll}
                        />
                    </div>

                    <Button
                        variant="ghost"
                        size='xsmall'
                        className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-purple-600 hover:ring-purple-500 transition-all"
                        title="Perfil"
                    >
                        <div className="flex items-center justify-center">
                            {user?.avatar
                                ? <Image
                                    src={user.avatar}
                                    alt="Avatar"
                                    width={24}
                                    height={24}
                                />
                                : <Icon name="User" size={18} color="white" />
                            }
                        </div>
                    </Button>
                </article>
            </div>
        </header>
    );
}
