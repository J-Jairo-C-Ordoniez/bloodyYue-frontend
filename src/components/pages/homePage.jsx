'use client';

import { useState } from 'react';
import ProfileHeader from '../organisms/ProfileHeader';
import ProfileSidebarLeft from '../organisms/ProfileSidebarLeft';
import ProfileSidebarRight from '../organisms/ProfileSidebarRight';
import ProfileFeed from '../organisms/ProfileFeed';

export default function HomePage({ setError }) {
    const [activeTab, setActiveTab] = useState('home');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="bg-foreground dark:bg-background min-h-screen">
            <ProfileHeader />
            <div className="container mx-auto px-4 py-8 flex justify-between gap-8">
                <ProfileSidebarLeft
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                    setError={setError}
                />

                <main className="flex-1 min-w-0">
                    <ProfileFeed />
                </main>

                <ProfileSidebarRight />
            </div>
        </div>
    );
}