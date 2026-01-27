import { cn } from "@/lib/utils";
import Typography from "../atoms/Typography";

export default function ChatMessage({ message, isOwn }) {
    return (
        <div className={cn(
            "flex w-full mb-2 px-3",
            isOwn ? "justify-end" : "justify-start"
        )}>
            <div className={cn(
                "max-w-[80%] rounded-2xl px-4 py-2 shadow-sm",
                isOwn
                    ? "bg-purple-600 text-white rounded-tr-none"
                    : "bg-zinc-800 text-zinc-200 rounded-tl-none border border-zinc-700"
            )}>
                <Typography variant="body" className="text-sm leading-relaxed">
                    {message.content}
                </Typography>
                <div className={cn(
                    "text-[10px] mt-1 opacity-50",
                    isOwn ? "text-right" : "text-left"
                )}>
                    {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>
        </div>
    );
}
