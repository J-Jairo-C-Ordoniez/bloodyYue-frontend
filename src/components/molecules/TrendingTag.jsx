export default function TrendingTag({ label, href = '#' }) {
    return (
        <a
            href={href}
            className="block w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-medium transition-colors duration-200"
        >
            #{label}
        </a>
    );
}
