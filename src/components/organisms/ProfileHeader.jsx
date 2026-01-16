'use client';

import { useState } from 'react';
import Icon from '../atoms/Icon';
import Typography from '../atoms/Typography';

export default function ProfileHeader() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <header className="sticky top-0 z-50 bg-[#0F0F0F] border-b border-white/5">
            <div className="container mx-auto px-6 py-3.5">
                <div className="flex items-center justify-between gap-8">
                    <div className="flex justify-between items-center py-4">
                        <Typography variant="h1">BloodyYue</Typography>
                    </div>


                    {/* Search Bar */}
                    <div className="flex-1 max-w-md">
                        <div className="relative">
                            <Icon
                                name="Search"
                                size={18}
                                color="#6B7280"
                            />
                            <input
                                type="text"
                                placeholder="Search artists, tags, or prints..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[#1A1A1D] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <Icon name="Search" size={18} color="#6B7280" />
                            </div>
                        </div>
                    </div>

                    {/* Navigation Icons */}
                    <div className="flex items-center gap-4">
                        {/* Home Icon */}
                        <button className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5">
                            <Icon name="Home" size={22} />
                        </button>

                        {/* Help Icon */}
                        <button className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5">
                            <Icon name="HelpCircle" size={22} />
                        </button>

                        {/* Notification Icon with Badge */}
                        <button className="relative text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5">
                            <Icon name="Bell" size={22} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        {/* Profile Avatar */}
                        <button className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-purple-600 hover:ring-purple-500 transition-all">
                            <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                                <Icon name="User" size={18} color="white" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
