import { useState, useEffect, useRef } from "react";
import { useChatStore } from "../../store/chat.store";
import useChatRoom from "../../hooks/useChatRoom";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
import { IconX, IconMinus, IconSend } from "@tabler/icons-react";
import ChatMessage from "./ChatMessage";
import Typography from "../atoms/Typography";
import useAuthStore from "../../store/auth.store";
import Loader from "./Loader";

export default function ChatWindow() {
    const { activeChatId, minimized, toggleMinimize, closeChat, participantName } = useChatStore();
    const user = useAuthStore.getState().user;
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
            flex flex-col bg-zinc-950 rounded-t-2xl shadow-2xl transition-all duration-300
            w-80 sm:w-96 overflow-hidden scrollbar ring-1 ring-white/5
            ${minimized ? 'h-14' : 'h-[500px]'}
        `}>
            <header className="flex items-center justify-between px-4 py-3 bg-zinc-900/50 cursor-pointer backdrop-blur-sm" onClick={toggleMinimize}>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                    <Typography variant="span" className="font-bold text-sm text-zinc-100">
                        {participantName}
                    </Typography>
                </div>
                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-white/5" onClick={toggleMinimize}>
                        <IconMinus size={18} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-red-400 hover:bg-red-500/10" onClick={closeChat}>
                        <IconX size={18} />
                    </Button>
                </div>
            </header>

            {!minimized && (
                <>
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-950">
                        {loading && messages.length === 0 ? (
                            <div className="h-full flex items-center justify-center">
                                <Loader size="sm" />
                            </div>
                        ) : (
                            messages.map((msg) => (
                                <ChatMessage
                                    key={msg.messageId}
                                    message={msg}
                                    isOwn={msg.senderId === user.userId}
                                />
                            ))
                        )}
                        {messages.length === 0 && !loading && (
                            <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-2">
                                <div className="p-4 bg-zinc-900/50 rounded-full">
                                    <IconSend size={32} stroke={1} />
                                </div>
                                <Typography variant="caption">Inicia la conversación</Typography>
                            </div>
                        )}
                    </div>

                    <div className="p-3 bg-zinc-950 pt-0">
                        <div className="flex justify-between gap-2 items-end bg-zinc-900/50 p-1.5 rounded-3xl ring-1 ring-white/5 focus-within:ring-white/10 transition-all">
                            <Input
                                placeholder="Escribe un mensaje..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                className="bg-transparent border-none h-9 text-sm focus-visible:ring-0 shadow-none px-4 placeholder:text-zinc-600"
                            />
                            <Button
                                size="icon"
                                className="bg-white text-black hover:bg-zinc-200 h-9 w-9 shrink-0 rounded-full shadow-lg"
                                onClick={handleSend}
                            >
                                <IconSend size={16} className="ml-0.5" />
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
