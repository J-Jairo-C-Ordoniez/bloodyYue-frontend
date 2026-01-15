'use client';

import FeaturedWorkSidePanel from '../organisms/FeaturedWorkSidePanel';
import VerifyAccountPanel from '../organisms/VerifyAccountPanel';

export default function VerifyAccountPage({ data }) {
    return (
        <main className="flex h-screen w-full bg-foreground dark:bg-background">
            <FeaturedWorkSidePanel post={data} />
            <VerifyAccountPanel />
        </main>
    );
}