"use client"

import { useChatStore } from "../../store/chat.store";
import ChatWindow from "../molecules/ChatWindow";

export default function ChatFloating() {
    const { isOpen, activeChatId } = useChatStore();

    if (!isOpen || !activeChatId) return null;

    return (
        <div className="fixed bottom-0 right-4 z-9999 flex flex-col items-end">
            <ChatWindow />
        </div>
    );
}
