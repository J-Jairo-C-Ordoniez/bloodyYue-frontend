import { cn } from "../../lib/utils";
import Typography from "../atoms/Typography";

export default function ChatMessage({ message, isOwn }) {
    return (
        <div className={cn(
            "flex w-full mb-2",
            isOwn ? "justify-end" : "justify-start"
        )}>
            <div className={cn(
                "max-w-[85%] rounded-2xl px-4 py-2.5 shadow-sm text-[13px]",
                isOwn
                    ? "bg-white text-black"
                    : "bg-zinc-900 text-zinc-300"
            )}>
                <Typography variant="body" className={cn(
                    "text-sm leading-relaxed",
                    isOwn ? "text-zinc-900" : "text-zinc-300"
                )}>
                    {message.content}
                </Typography>
                <div className={cn(
                    "text-[10px] mt-1 opacity-40",
                    isOwn ? "text-right text-black" : "text-left text-zinc-400"
                )}>
                    {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                </div>
            </div>
        </div>
    );
}
