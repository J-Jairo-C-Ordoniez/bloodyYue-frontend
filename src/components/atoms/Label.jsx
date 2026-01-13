export default function Label({ children, color = "#000000", variant = "default", className = "" }) {
    const baseStyles = "w-fit text-sm leading-relaxed flex items-center gap-2 px-4 py-2";

    const getVariantClasses = () => {
        if (variant === 'pill') return "bg-white text-slate-800 font-bold rounded-lg shadow-xl px-4 py-2 flex items-center gap-2";
        if (variant === 'status') return `bg-green-100 text-green-700 border border-green-200 rounded-full px-4 py-1.5 font-medium uppercase text-xs tracking-wider`;
        if (variant === 'ghost') return `bg-[${color}20] text-[${color}] border-[${color}80] border rounded-full`;
        if (variant === 'solid') return `bg-slate-900 text-white rounded-lg border-slate-800 border`;
        return `bg-[${color}20] text-[${color}] border-[${color}80] border rounded-full`;
    };

    return (
        <span className={`${baseStyles} ${getVariantClasses()} ${className}`}>
            {children}
        </span>
    );
}