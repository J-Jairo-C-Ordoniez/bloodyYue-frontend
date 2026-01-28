'use client';

import { useState } from 'react';
import ProfileHeader from '../organisms/ProfileHeader';
import ProfileFeed from '../organisms/ProfileFeed';
import CartSection from '../organisms/CartSection';
import ExploreSection from '../organisms/ExploreSection';
import PurchasesList from '../molecules/PurchasesList';
import CommissionApp from '../organisms/CommissionApp';
import ProfileTabs from '../molecules/ProfileTabs';
import Image from '../atoms/Image';
import Button from '../atoms/Button';
import Typography from '../atoms/Typography';
import Icon from '../atoms/Icon';
import ProfileSidebarRight from '../organisms/ProfileSidebarRight';
import useAuthStore from '../../store/auth.store';

export default function HomePage({ setError, initialTab = 'home' }) {
    const { user } = useAuthStore();
    const [viewMode, setViewMode] = useState('grid');
    const [activeTab, setActiveTab] = useState(initialTab);

    const tabs = [
        { id: 'home', label: 'Inicio' },
        { id: 'purchases', label: 'Compras' },
        { id: 'commissions', label: 'Comisiones' },
        { id: 'explore', label: 'Explorar' },
        { id: 'cart', label: 'Carrito' },
    ];

    const renderMainContent = () => {
        switch (activeTab) {
            /* case 'home':
                return <ProfileFeed viewMode={viewMode} setViewMode={setViewMode} />;
            case 'purchases':
                return <PurchasesList />;
            case 'commissions':
                return <CommissionApp viewMode={viewMode} setViewMode={setViewMode} />;
            case 'explore':
                return <ExploreSection setActiveTab={setActiveTab} />;
            case 'cart':
                return <CartSection />;
            default:
                return <ProfileFeed />; */
        }
    };

    return (
        <div className="bg-[#0B0B0E] min-h-screen pb-20">
            <ProfileHeader user={user} />

            <section className="relative h-64 w-full bg-[#0B0B0E]">
                <div className="container mx-auto px-6 h-full flex items-end pb-8">
                    <article className="flex items-center gap-8 w-full translate-y-12">
                        <div className="relative group">
                            <div className="w-40 h-40 flex items-center justify-center rounded-full overflow-hidden ring-4 ring-[#0B0B0E] bg-zinc-900 shadow-2xl relative z-10">
                                {user?.avatar
                                    ? <Image src={user.avatar} alt={user.username} fill className="object-cover" />
                                    : <Icon name="User" size={100} className="text-zinc-600" />
                                }
                            </div>
                            <Button
                                size='small'
                                variant="secondary"
                                className="absolute bottom-2 right-2 z-20 rounded-full bg-black/50 backdrop-blur text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-all">
                                <Icon name="Camera" size={24} />
                            </Button>
                        </div>

                        <div className="pb-2">
                            <Typography variant="h2" className="text-4xl font-bold text-white tracking-tight mb-1">
                                {user?.name || 'Usuario'}
                            </Typography>
                            <Typography variant="body" className="text-zinc-500 font-medium text-lg">
                                {user?.email || 'No email'}
                            </Typography>
                        </div>
                    </article>
                </div>
            </section>

            <main className="container mx-auto px-6 mt-16">
                <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8">
                    <div className="lg:col-span-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {renderMainContent()}
                    </div>

                    <div className="hidden lg:block lg:col-span-4">
                        <ProfileSidebarRight setActiveTab={setActiveTab} />
                    </div>
                </div>
            </main>
        </div>
    );
}
