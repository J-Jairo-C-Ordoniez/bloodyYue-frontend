export default function Button({
    children,
    variant = 'primary',
    size = 'medium',
    onClick,
    className = '',
    type = 'button'
}) {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-white text-black hover:bg-gray-200 focus:ring-white',
        secondary: 'bg-transparent border-2 border-white/20 text-white hover:bg-white/10 focus:ring-white/50 backdrop-blur-sm',
        ghost: 'bg-transparent text-white hover:bg-white/10 hover:text-white',
        danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    };

    const sizes = {
        small: 'px-4 py-1.5 text-sm',
        medium: 'px-6 py-2.5 text-base',
        large: 'px-8 py-3.5 text-lg',
    };

    return (
        <button
            type={type}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
