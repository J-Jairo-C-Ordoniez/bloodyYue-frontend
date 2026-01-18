'use client';

import FeaturedWorkSidePanel from '../organisms/FeaturedWorkSidePanel';
import VerifyAccountPanel from '../organisms/VerifyAccountPanel';

export default function VerifyAccountPage({ data }) {
    return (
        <main className="flex h-screen w-full bg-[#0B0B0E]">
            <FeaturedWorkSidePanel post={data} />
            <VerifyAccountPanel />
        </main>
    );
}