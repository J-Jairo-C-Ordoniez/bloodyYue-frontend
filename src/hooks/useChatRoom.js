import { useEffect, useState, useCallback } from 'react';
import chatApi from '@/api/chat';
import { socket } from '@/utils/socket';

export default function useChatRoom(chatId) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMessages = useCallback(async () => {
        if (!chatId) return;
        setLoading(true);
        setError(null);
        try {
            const res = await chatApi.chatByIdGet({ id: chatId });
            if (res?.error) {
                setError(res.message);
            } else {
                setMessages(res.data?.messages || res.data || []);
            }
        } catch (err) {
            setError(err?.message || 'Error loading messages');
        } finally {
            setLoading(false);
        }
    }, [chatId]);

    useEffect(() => {
        fetchMessages();

        if (chatId) {
            socket.connect();
            socket.emit('join_chat', chatId);

            const onReceiveMessage = (newMessage) => {
                if (newMessage.chatId === chatId) {
                    setMessages((prev) => [...prev, newMessage]);
                }
            };

            socket.on('receive_message', onReceiveMessage);

            return () => {
                socket.emit('leave_chat', chatId);
                socket.off('receive_message', onReceiveMessage);
            };
        }
    }, [chatId, fetchMessages]);

    const sendMessage = async (content) => {
        if (!content.trim() || !chatId) return;

        // This is a placeholder for sending a message. 
        // We might need an API call for persistence and/or just socket emit.
        // Assuming there might be a chatMessagePost or similar.
        // For now, let's emit via socket.
        const messageData = {
            chatId,
            content,
            createdAt: new Date().toISOString()
        };

        socket.emit('send_message', messageData);

        // Optimistic update (or Wait for server confirmation via socket)
        // Usually, the server emits back to 'receive_message' which includes the sender.
    };

    return {
        messages,
        loading,
        error,
        sendMessage,
        refreshMessages: fetchMessages
    };
}
