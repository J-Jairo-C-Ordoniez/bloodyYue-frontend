'use client';

import ProfileSidebarLeft from './ProfileSidebarLeft';
import ProfileSidebarRight from './ProfileSidebarRight';
import ProfileFeed from './ProfileFeed';

export default function HomePage() {
    return (
        <div className="bg-zinc-50 dark:bg-black min-h-screen">
            <div className="container mx-auto px-4 py-8 flex justify-between gap-8">
                {/* Left Sidebar - Navigation & Trends */}
                <ProfileSidebarLeft />

                {/* Main Content - Feed */}
                <main className="flex-1 min-w-0">
                    <ProfileFeed />
                </main>

                {/* Right Sidebar - Cart, Activity, Messages */}
                <ProfileSidebarRight />
            </div>
        </div>
    );
}