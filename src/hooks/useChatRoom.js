import { useEffect, useState, useCallback } from 'react';
import chatApi from '@/api/chat';
import { socket } from '@/utils/socket';
import useAuthStore from '@/store/auth.store';

export default function useChatRoom(chatId) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuthStore();

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

        if (chatId && user?.userId) {
            socket.auth = { userId: user.userId };
            socket.connect();

            socket.emit('joinChat', { chatId });

            const onNewMessage = (newMessage) => {
                if (String(newMessage.chatId) === String(chatId)) {
                    setMessages((prev) => [...prev, newMessage]);
                }
            };

            socket.on('newMessage', onNewMessage);

            return () => {
                // The backend doesn't have a leaveChat but it's good practice
                // However, I'll stick to what the backend handles or just disconnect/off
                socket.off('newMessage', onNewMessage);
            };
        }
    }, [chatId, user?.userId, fetchMessages]);

    const sendMessage = async (content) => {
        if (!content.trim() || !chatId) return;

        const messageData = {
            chatId,
            content,
            userId: user?.userId, // Include sender ID for correct styling
            createdAt: new Date().toISOString()
        };

        socket.emit('sendMessage', { chatId, content });

        // Optimistic update: add to state immediately
        setMessages((prev) => [...prev, messageData]);
    };

    return {
        messages,
        loading,
        error,
        sendMessage,
        refreshMessages: fetchMessages
    };
}
