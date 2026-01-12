import LinkA from 'next/link';

export default function Link({ variant= 'backdrop', href, children }) {
    const variants = {
        backdrop: 'text-white-500 p-4 bg-blue-600 rounded-lg hover:text-white-500 hover:bg-blue-700 transition-colors duration-200',
        primary: 'text-base leading-relaxed opacity-80 text-gray-300 hover:text-gray-100 transition-colors duration-200 font-sans',
        secondary: 'text-white-500 p-4 bg-blue-600 rounded-lg hover:text-white-500 hover:bg-blue-700 transition-colors duration-200',
    };
    return (
        <LinkA
            href={href} 
            className={variants[variant]}
        >
            {children}
        </LinkA>
    );
}