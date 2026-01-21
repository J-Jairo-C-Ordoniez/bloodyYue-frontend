export default function ProfileStats({ stats }) {
    return (
        <div className="flex items-center gap-6 py-4">
            {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center">
                    <span className="text-xl font-bold text-white tracking-tight">{stat.value}</span>
                    <span className="text-xs text-zinc-500 uppercase tracking-widest font-medium">{stat.label}</span>
                </div>
            ))}
        </div>
    );
}
