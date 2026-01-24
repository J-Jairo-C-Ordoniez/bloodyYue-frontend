export default function Label({ children, color = "#000000", variant = "default", className = "" }) {
    const baseStyles = "w-fit text-sm leading-relaxed flex items-center gap-2 px-4 py-2 transition-all duration-300";

    const getVariantClasses = () => {
        if (variant === 'pill') return "bg-white text-slate-950 font-bold rounded-lg shadow-xl px-4 py-2 flex items-center gap-2";
        if (variant === 'status') return `bg-green-500/10 text-green-400 border border-green-500/20 rounded-full px-4 py-1.5 font-medium uppercase text-xs tracking-wider`;
        if (variant === 'ghost') return `bg-[color-mix(in_oklch,var(--label-color),transparent_85%)] text-[var(--label-color)] border-[color-mix(in_oklch,var(--label-color),transparent_70%)] border rounded-full`;
        if (variant === 'solid') return `bg-zinc-900 text-white rounded-lg border-zinc-800 border`;
        if (variant === 'trending') return `bg-[color-mix(in_oklch,var(--label-color),transparent_85%)] text-[var(--label-color)] border-[color-mix(in_oklch,var(--label-color),transparent_80%)] border rounded-lg hover:bg-[color-mix(in_oklch,var(--label-color),transparent_75%)]`;

        return `bg-[color-mix(in_oklch,var(--label-color),transparent_85%)] text-[var(--label-color)] border-[color-mix(in_oklch,var(--label-color),transparent_70%)] border rounded-full`;
    };

    return (
        <span
            style={{ "--label-color": color }}
            className={`${baseStyles} ${getVariantClasses()} ${className}`}
        >
            {children}
        </span>
    );
}