import { useState, useEffect, useRef } from "react";
import { useChatStore } from "@/store/chat.store";
import useChatRoom from "@/hooks/useChatRoom";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
import { IconX, IconMinus, IconSend } from "@tabler/icons-react";
import ChatMessage from "./ChatMessage";
import Typography from "../atoms/Typography";
import useAuthStore from "@/store/auth.store";
import Loader from "./Loader";

export default function ChatWindow() {
    const { activeChatId, minimized, toggleMinimize, closeChat, participantName } = useChatStore();
    const { user } = useAuthStore();
    const { messages, loading, sendMessage } = useChatRoom(activeChatId);
    const [inputValue, setInputValue] = useState("");
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, minimized]);

    const handleSend = () => {
        if (!inputValue.trim()) return;
        sendMessage(inputValue);
        setInputValue("");
    };

    if (!activeChatId) return null;

    return (
        <div className={`
            flex flex-col bg-zinc-950 border border-zinc-800 rounded-t-2xl shadow-2xl transition-all duration-300
            w-80 sm:w-96 overflow-hidden
            ${minimized ? 'h-14' : 'h-[500px]'}
        `}>
            <header className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800 cursor-pointer" onClick={toggleMinimize}>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <Typography variant="span" className="font-bold text-sm text-zinc-100">
                        {participantName}
                    </Typography>
                </div>
                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white" onClick={toggleMinimize}>
                        <IconMinus size={18} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-red-400" onClick={closeChat}>
                        <IconX size={18} />
                    </Button>
                </div>
            </header>

            {!minimized && (
                <>
                    {/* Messages Area */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-2 bg-zinc-950/50">
                        {loading && messages.length === 0 ? (
                            <div className="h-full flex items-center justify-center">
                                <Loader size="sm" />
                            </div>
                        ) : (
                            messages.map((msg, idx) => (
                                <ChatMessage
                                    key={idx}
                                    message={msg}
                                    isOwn={String(msg.userId) === String(user?.userId)}
                                />
                            ))
                        )}
                        {messages.length === 0 && !loading && (
                            <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-2">
                                <div className="p-4 bg-zinc-900 rounded-full">
                                    <IconSend size={32} stroke={1} />
                                </div>
                                <Typography variant="caption">Inicia la conversación</Typography>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-zinc-900/80 border-t border-zinc-800">
                        <div className="flex gap-2">
                            <Input
                                placeholder="Escribe un mensaje..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                className="bg-zinc-800 border-zinc-700 h-10 text-sm focus:ring-purple-500/50"
                            />
                            <Button
                                size="icon"
                                className="bg-purple-600 hover:bg-purple-500 h-10 w-10 shrink-0"
                                onClick={handleSend}
                            >
                                <IconSend size={18} />
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
