import Icon from "../atoms/Icon";
import Typography from "../atoms/Typography";

export default function NotContent({ title, description }) {
    return (
        <article className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-6 text-zinc-400">
                <Icon name="Inbox" size={40} />
            </div>
            <Typography variant="h3" className="text-zinc-900 dark:text-zinc-100 font-bold mb-2">
                {title}
            </Typography>
            <Typography variant="body" className="text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto">
                {description}
            </Typography>
        </article>
    );
}
