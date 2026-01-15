import Link from 'next/link';
import Icon from '../atoms/Icon';
import Typography from '../atoms/Typography';

export default function NavItem({ icon, label, href = '#', isActive = false }) {
    return (
        <Link
            href={href}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors duration-200 ${isActive
                    ? 'bg-purple-500/10 text-purple-500'
                    : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
        >
            <Icon name={icon} size={20} className={isActive ? 'text-purple-500' : 'currentColor'} />
            <span className={`text-sm font-medium ${isActive ? 'font-semibold' : ''}`}>{label}</span>
        </Link>
    );
}
