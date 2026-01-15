import Link from 'next/link';

export default function ActivityItem({ icon, user, action, time, href = '#' }) {
    return (
        <div className="flex gap-3 relative pl-4 pb-6 last:pb-0 border-l border-zinc-100 dark:border-zinc-800 ml-2">
            <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-purple-500 ring-4 ring-white dark:ring-black" />

            <div className="flex flex-col -mt-1.5">
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100 mr-1">{user}</span>
                    {action}
                </div>
                <span className="text-xs text-zinc-500 mt-1">{time}</span>
            </div>
        </div>
    );
}
