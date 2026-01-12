export default function Typography({
    variant = 'body',
    children,
    className = '',
}) {
    const baseStyles = 'transition-colors duration-300';

    const variants = {
        h1: 'text-4xl md:text-3xl font-bold tracking-tight text-black dark:text-gray-200',
        h2: 'text-3xl md:text-5xl font-bold tracking-tight text-black dark:text-white',
        h3: 'text-2xl md:text-3xl font-bold text-gray-500 dark:text-gray-400',
        subtitle: 'text-lg md:text-xl font-medium opacity-90 text-black dark:text-white',
        body: 'text-base leading-relaxed opacity-80 text-gray-500 dark:text-gray-300',
        small: 'text-sm opacity-70 text-black dark:text-white',
        caption: 'text-xs uppercase tracking-widest font-semibold'
    };

    const Component =
        variant === 'h1' ? 'h1' :
            variant === 'h2' ? 'h2' :
                variant === 'h3' ? 'h3' :
                    variant === 'subtitle' ? 'p' :
                        variant === 'caption' ? 'span' :
                            'p';

    return (
        <Component className={`${baseStyles} ${variants[variant]} ${className} font-sans`}>
            {children}
        </Component>
    );
};
