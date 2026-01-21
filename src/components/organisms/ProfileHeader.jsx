'use client';

import { useState } from 'react';
import Icon from '../atoms/Icon';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Image from '../atoms/Image';
import NotificationDropdown from '../molecules/NotificationDropdown';
import useNotifications from '../../hooks/useNotifications';
import useSocket from '../../hooks/useSocket';
import useAuth from '../../hooks/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProfileDropdown from '../molecules/ProfileDropdown';

export default function ProfileHeader({ user }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const { notifications: getNotifications } = useNotifications();
    const { notifications: readNotification } = useNotifications('notificationReadPut');
    const { notifications: readAllNotifications } = useNotifications('notificationReadAllPut');
    const { auth: logout } = useAuth('logout');
    const router = useRouter();

    useSocket();

    const toggleNotifications = async () => {
        setIsNotificationOpen(!isNotificationOpen);
        const res = await getNotifications();
        if (res.error) return setNotifications([]);
        setNotifications(res.data);
    };

    const onRead = async (notificationId) => {
        const res = await readNotification({ notificationId });
        if (res.error) return;
        toggleNotifications();
    };

    const onReadAll = async () => {
        const res = await readAllNotifications();
        if (res.error) return;
        toggleNotifications();
    };

    return (
        <header className="sticky top-0 z-50 border-b bg-[#0B0B0E]/80 backdrop-blur-xl border-white/5 transition-all duration-300">
            <div className="container mx-auto px-6 h-[72px] flex justify-between items-center gap-8">
                <Link href="/" className="group">
                    <h1 className="text-xl font-bold text-white tracking-tighter group-hover:text-zinc-300 transition-colors">
                        Bloody<span className="text-zinc-500 font-light">Yue</span>
                    </h1>
                </Link>

                <div className="flex-1 max-w-sm hidden md:block group focus-within:max-w-md transition-all duration-500">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            icon="Search"
                            className="bg-zinc-900/50 border-transparent focus:bg-zinc-900 focus:border-zinc-800 transition-all rounded-xl pl-10"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size='icon' className="rounded-full hover:bg-white/5 text-zinc-400 hover:text-white">
                        <Icon name="HelpCircle" size={20} />
                    </Button>

                    <div className="relative">
                        <Button
                            variant="ghost"
                            size='icon'
                            onClick={toggleNotifications}
                            className={`rounded-full hover:bg-white/5 text-zinc-400 hover:text-white ${isNotificationOpen ? 'bg-white/10 text-white' : ''}`}
                        >
                            <Icon name="Bell" size={20} />
                        </Button>
                        <NotificationDropdown
                            isOpen={isNotificationOpen}
                            onClose={() => setIsNotificationOpen(false)}
                            notifications={notifications}
                            onRead={onRead}
                            onReadAll={onReadAll}
                        />
                    </div>

                    <div className="h-6 w-px bg-zinc-800 mx-2" />

                    <div className="relative">
                        <Button
                            variant="ghost"
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="rounded-full p-0.5 hover:ring-2 hover:ring-zinc-700 transition-all flex items-center gap-3 pl-1 pr-4 hover:bg-white/5 group"
                        >
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-zinc-800 flex items-center justify-center">
                                {user?.avatar ? (
                                    <Image src={user.avatar} alt="Avatar" width={32} height={32} />
                                ) : (
                                    <Icon name="User" size={16} className="text-zinc-500" />
                                )}
                            </div>
                            <span className="text-sm font-medium text-zinc-300 group-hover:text-white hidden sm:block">
                                {user?.username || 'Profile'}
                            </span>
                            <Icon name="ChevronDown" size={14} className={`text-zinc-500 group-hover:text-white transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                        </Button>
                        <ProfileDropdown
                            isOpen={isProfileOpen}
                            onClose={() => setIsProfileOpen(false)}
                            user={user}
                            onLogout={async () => {
                                await logout();
                                router.push('/users/login');
                            }}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}
