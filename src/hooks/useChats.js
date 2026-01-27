import { useEffect, useState, useCallback } from 'react';
import chat from '../api/chat/index';
import { socket } from '../utils/socket';

export default function useChats(variant = 'list') {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchChats = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await chat.chatGet();
            if (res?.error) {
                setError(res.message);
            } else {
                setData(res.data);
            }
            return res;
        } catch (err) {
            const msg = err?.message || 'Error loading chats';
            setError(msg);
            return { error: true, message: msg };
        } finally {
            setLoading(false);
        }
    }, [variant]);

    useEffect(() => {
        if (variant !== 'none') {
            fetchChats();
        }
    }, []);

    useEffect(() => {
        function onMessage(newMessage) {
            setData(prev => {
                const chatIndex = prev.findIndex(c => c.chatId === newMessage.chatId);
                if (chatIndex > -1) {
                    const updatedChat = { ...prev[chatIndex], lastMessage: newMessage.content, updatedAt: new Date() };
                    const newChats = [...prev];
                    newChats.splice(chatIndex, 1);
                    newChats.unshift(updatedChat);
                    return newChats;
                }
                return prev;
            });
        }

        socket.on('receive_message', onMessage);

        return () => {
            socket.off('receive_message', onMessage);
        };
    }, []);

    const createChat = async (userId) => {
        try {
            const res = await chat.chatPost({ userId });
            if (res && !res.error) {
                fetchChats();
            }
            return res;
        } catch (e) {
            return { error: true, message: e.message };
        }
    };

    return {
        chats: data,
        loading,
        error,
        refreshChats: fetchChats,
        createChat
    };
}
