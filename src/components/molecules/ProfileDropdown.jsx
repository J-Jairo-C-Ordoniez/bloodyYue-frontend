'use client';

import Link from '../atoms/Link';
import Icon from '../atoms/Icon';
import Button from '../atoms/Button';
import Typography from '../atoms/Typography';
import Image from '../atoms/Image';

export default function ProfileDropdown({ isOpen, onClose, user, onLogout }) {
    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 z-40 w-[99vw] h-screen overflow-hidden"
                onClick={onClose}
            />

            <section className="absolute top-full right-0 mt-2 w-72 bg-[#0B0B0E] border border-zinc-800 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                <header className="p-4 border-b border-zinc-800/50">
                    <div className="container flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-800 shrink-0">
                            {user?.avatar ? (
                                <Image src={user.avatar} alt={user.name} width={40} height={40} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Icon name="User" size={20} className="text-zinc-500" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <Typography variant="body" className="font-medium text-zinc-200 truncate leading-none mb-1">
                                {user?.name}
                            </Typography>
                        </div>
                    </div>
                </header>


                <nav className="p-2">
                    <Link
                        href="/profile/home"
                        variant='default'
                        onClick={onClose}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 transition-all group"
                    >
                        <Icon name="User" size={18} />
                        <span className="font-medium">Ver Perfil</span>
                    </Link>

                    <Link
                        href="/profile/edit"
                        variant='default'
                        onClick={onClose}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 transition-all group"
                    >
                        <Icon name="Settings" size={18} />
                        <span className="font-medium">Editar Perfil</span>
                    </Link>
                </nav>

                <div className="h-px bg-zinc-800/50 mx-2" />

                <div className="p-2">
                    <Button
                        onClick={() => {
                            onLogout();
                            onClose();
                        }}
                        variant='default'
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all group text-left"
                    >
                        <Icon name="LogOut" size={18} />
                        <span className="font-medium">Cerrar Sesión</span>
                    </Button>
                </div>
            </section>
        </>
    );
}

