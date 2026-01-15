import NavItem from '../molecules/NavItem';
import TrendingTag from '../molecules/TrendingTag';
import Typography from '../atoms/Typography';

export default function ProfileSidebarLeft() {
    const navItems = [
        { icon: 'Compass', label: 'For You', href: '#', isActive: true },
        { icon: 'Users', label: 'Following', href: '#' },
        { icon: 'Star', label: 'Favorites', href: '#' },
        { icon: 'Clock', label: 'History', href: '#' },
    ];

    const trendingTags = [
        'reset', 'digitalart', 'oc', 'sketch', 'commission'
    ];

    return (
        <aside className="w-64 shrink-0 sticky top-24 self-start space-y-8 hidden lg:block">
            {/* Navigation */}
            <nav className="space-y-2">
                {navItems.map((item) => (
                    <NavItem key={item.label} {...item} />
                ))}
            </nav>

            {/* Trending Tags */}
            <div>
                <Typography variant="h6" className="px-4 mb-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                    Trending Tags
                </Typography>
                <div className="flex flex-wrap gap-2 px-2">
                    {trendingTags.map((tag) => (
                        <div key={tag} className="grow">
                            <TrendingTag label={tag} />
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
}
