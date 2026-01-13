export default function Label({ children, color = "#000000", variant = "default", className = "" }) {
    const baseStyles = "w-fit text-sm leading-relaxed flex items-center gap-2 px-4 py-2";

    /* const variants = {
        default: `bg-[${color}20] text-[${color}] border-[${color}80] border rounded-full`, 
        pill: `bg-white text-black font-semibold rounded-full shadow-lg px-6 py-3 cursor-pointer hover:scale-105 transition-transform`, 
        ghost: `bg-transparent text-[${color}] font-medium`,
        solid: `bg-[${color}] text-white rounded-full`,
    }; */

    const getVariantClasses = () => {
        if (variant === 'pill') return "bg-white text-slate-800 font-bold rounded-lg shadow-xl px-4 py-2 flex items-center gap-2";
        if (variant === 'status') return `bg-green-100 text-green-700 border border-green-200 rounded-full px-4 py-1.5 font-medium uppercase text-xs tracking-wider`;
        return `bg-[${color}20] text-[${color}] border-[${color}80] border rounded-full`;
    };

    return (
        <span className={`${baseStyles} ${getVariantClasses()} ${className}`}>
            {children}
        </span>
    );
}