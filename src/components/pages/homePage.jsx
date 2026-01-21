'use client';

import { useState } from 'react';
import ProfileHeader from '../organisms/ProfileHeader';
import ProfileFeed from '../organisms/ProfileFeed';
import CartSection from '../organisms/CartSection';
import ExploreSection from '../organisms/ExploreSection';
import PurchasesList from '../molecules/PurchasesList';
import CommissionApp from '../organisms/CommissionApp';
import ProfileTabs from '../molecules/ProfileTabs';
import ProfileStats from '../molecules/ProfileStats';
import Image from '../atoms/Image';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';

export default function HomePage({ setError, user, initialTab = 'home' }) {
    const [viewMode, setViewMode] = useState('grid');
    const [activeTab, setActiveTab] = useState(initialTab);

    const tabs = [
        { id: 'home', label: 'Overview' },
        { id: 'purchases', label: 'Purchases' },
        { id: 'commissions', label: 'Commissions' },
        { id: 'explore', label: 'Explore' },
        { id: 'cart', label: 'Cart' },
    ];

    const stats = [
        { label: 'Followers', value: '12.5k' },
        { label: 'Following', value: '243' },
        { label: 'Likes', value: '840k' },
    ];

    const renderMainContent = () => {
        switch (activeTab) {
            case 'home':
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
                return <ProfileFeed />;
        }
    };

    return (
        <div className="bg-[#0B0B0E] min-h-screen pb-20">
            <ProfileHeader user={user} />

            {/* Hero Profile Section */}
            <div className="relative h-64 w-full bg-gradient-to-bottom from-purple-900/20 to-[#0B0B0E]">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20 pointer-events-none" />
                <div className="container mx-auto px-6 h-full flex items-end pb-8">
                    <div className="flex items-end gap-8 w-full translate-y-12">
                        <div className="relative group">
                            <div className="w-40 h-40 rounded-3xl overflow-hidden ring-4 ring-[#0B0B0E] bg-zinc-800 shadow-2xl relative z-10">
                                {user?.avatar
                                    ? <Image src={user.avatar} alt={user.username} fill className="object-cover" />
                                    : <div className="w-full h-full flex items-center justify-center bg-zinc-900 dark:bg-zinc-800"><Icon name="User" size={48} className="text-zinc-600" /></div>
                                }
                            </div>
                            <Button size='icon' className="absolute bottom-2 right-2 z-20 rounded-full bg-black/50 backdrop-blur text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-all">
                                <Icon name="Camera" size={18} />
                            </Button>
                        </div>

                        <div className="flex-1 pb-2">
                            <h2 className="text-4xl font-bold text-white tracking-tight mb-1">{user?.username || 'Unknown Artist'}</h2>
                            <p className="text-zinc-400 font-medium text-lg">Digital Artist & Illustrator</p>

                            <ProfileStats stats={stats} />
                        </div>

                        <div className="flex gap-3 pb-4">
                            <Button variant="outline" className="rounded-full px-6 border-zinc-700 hover:bg-zinc-800 text-white">
                                Edit Profile
                            </Button>
                            <Button size='icon' variant="outline" className="rounded-full border-zinc-700 hover:bg-zinc-800 text-white">
                                <Icon name="Share2" size={18} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <main className="container mx-auto px-6 mt-16">
                <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs} />

                <div className="min-h-[500px] animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {renderMainContent()}
                </div>
            </main>
        </div>
    );
}
