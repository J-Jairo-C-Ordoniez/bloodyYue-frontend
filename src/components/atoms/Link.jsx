import LinkA from 'next/link';

export default function Link({ variant = 'backdrop', href, children, size = 'medium' }) {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        default: 'text-gray-500 hover:text-white focus:ring-white',
        primary: 'bg-white text-black hover:bg-gray-200 focus:ring-white px-4 py-2',
        secondary: 'bg-transparent border-2 border-white/20 text-white hover:bg-white/10 focus:ring-white/50 backdrop-blur-sm px-4 py-2',
        ghost: 'bg-transparent text-white hover:bg-white/10 hover:text-white',
        danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
        link: 'text-blue-400 hover:text-blue-600 focus:ring-blue-500',
    };

    const sizes = {
        small: 'px-4 py-1.5 text-sm',
        medium: 'px-6 py-2.5 text-base',
        large: 'px-8 py-3.5 text-lg',
        default: 'px-1 text-sm',
    };

    return (
        <LinkA
            href={href}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]}`}
        >
            {children}
        </LinkA>
    );
}