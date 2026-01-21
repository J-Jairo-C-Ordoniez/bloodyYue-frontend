'use client';

import Link from 'next/link';
import Icon from '../atoms/Icon';
import Typography from '../atoms/Typography';
import Image from '../atoms/Image';

export default function ProfileDropdown({ isOpen, onClose, user, onLogout }) {
    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 z-40"
                onClick={onClose}
            />

            <div className="absolute top-full right-0 mt-2 w-72 bg-[#0B0B0E] border border-zinc-800 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                {/* User Info Section */}
                <div className="p-4 border-b border-zinc-800/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-800 shrink-0">
                            {user?.avatar ? (
                                <Image src={user.avatar} alt={user.username} width={40} height={40} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Icon name="User" size={20} className="text-zinc-500" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <Typography variant="body" className="font-medium text-zinc-200 truncate leading-none mb-1">
                                {user?.username}
                            </Typography>
                            <Typography variant="small" className="text-zinc-500 truncate text-xs">
                                {user?.email || 'User Account'}
                            </Typography>
                        </div>
                    </div>
                </div>

                {/* Navigation Menu */}
                <div className="p-2">
                    <Link
                        href="/profile/home"
                        onClick={onClose}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 transition-all group"
                    >
                        <Icon name="User" size={18} className="group-hover:text-purple-500 transition-colors" />
                        <span className="font-medium">Ver Perfil</span>
                    </Link>

                    <Link
                        href="/profile/edit"
                        onClick={onClose}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 transition-all group"
                    >
                        <Icon name="Settings" size={18} className="group-hover:text-blue-500 transition-colors" />
                        <span className="font-medium">Editar Perfil</span>
                    </Link>
                </div>

                <div className="h-px bg-zinc-800/50 mx-2" />

                <div className="p-2">
                    <button
                        onClick={() => {
                            onLogout();
                            onClose();
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all group text-left"
                    >
                        <Icon name="LogOut" size={18} className="group-hover:text-red-500 transition-colors" />
                        <span className="font-medium">Cerrar Sesión</span>
                    </button>
                </div>
            </div>
        </>
    );
}

