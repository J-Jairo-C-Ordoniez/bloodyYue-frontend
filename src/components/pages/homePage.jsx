'use client';

import { useState } from 'react';
import ProfileHeader from '../organisms/ProfileHeader';
import ProfileSidebarLeft from '../organisms/ProfileSidebarLeft';
import ProfileSidebarRight from '../organisms/ProfileSidebarRight';
import ProfileFeed from '../organisms/ProfileFeed';
import CommissionSection from '../organisms/CommisionSection';
import WorkSection from '../organisms/WorkSection';
import Typography from '../atoms/Typography';
import ActivityItem from '../molecules/ActivityItem';

export default function HomePage({ setError, user }) {
    const [viewMode, setViewMode] = useState('grid');
    const [activeTab, setActiveTab] = useState('home');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const renderMainContent = () => {
        switch (activeTab) {
            case 'home':
                return <ProfileFeed viewMode={viewMode} setViewMode={setViewMode} />;
            case 'commissions':
                return <CommissionSection viewMode={viewMode} setViewMode={setViewMode} />;

            case 'explore':
                return <WorkSection />;

            case 'notifications':
                return (
                    <article className="max-w-2xl mx-auto w-full bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800">
                        <Typography variant="h2" className="text-zinc-900 dark:text-zinc-100 font-bold mb-8">Notificaciones</Typography>
                        <div className="space-y-1">
                            {/* Reusing static ActivityItems for now as notifications view */}
                            <ActivityItem icon="Heart" user="kpop_fan_99" action="liked your post" time="5m ago" />
                            <ActivityItem icon="MessageCircle" user="ArtLover22" action="commented: 'Amazing work!'" time="2h ago" />
                            <ActivityItem icon="ShoppingBag" user="Mina Shop" action="purchased your commission" time="5h ago" />
                            <ActivityItem icon="UserPlus" user="new_artist_2024" action="started following you" time="1d ago" />
                            <ActivityItem icon="Heart" user="jessie_art" action="liked your collection" time="2d ago" />
                        </div>
                    </article>
                );
            default:
                return <ProfileFeed />;
        }
    };

    return (
        <div className="bg-[#0B0B0E] min-h-screen">
            <ProfileHeader user={user} />
            <div className="container mx-auto px-4 py-8 flex items-start justify-between gap-8">
                <ProfileSidebarLeft
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                    setError={setError}
                />

                <main className="flex-1 min-w-0 pb-20">
                    {renderMainContent()}
                </main>

                <ProfileSidebarRight user={user.userId} />
            </div>
        </div>
    );
}
