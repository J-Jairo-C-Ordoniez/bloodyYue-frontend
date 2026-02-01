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
            const chatId = String(newMessage.chatId);
            setData(prev => {
                const chatIndex = prev.findIndex(c => String(c.chatId) === chatId);
                if (chatIndex > -1) {
                    const updatedChat = {
                        ...prev[chatIndex],
                        lastMessage: newMessage.content,
                        updatedAt: new Date()
                    };
                    const newChats = [...prev];
                    newChats.splice(chatIndex, 1);
                    newChats.unshift(updatedChat);
                    return newChats;
                }

                // If the chat is not in the list, we refresh to get its details
                // We do it outside the functional update or using a side effect
                return prev;
            });

            // Trigger refresh if chat was not in the list
            setData(prev => {
                if (!prev.some(c => String(c.chatId) === chatId)) {
                    fetchChats();
                }
                return prev;
            });
        }

        socket.on('newMessage', onMessage);

        return () => {
            socket.off('newMessage', onMessage);
        };
    }, []);

    const createChat = async (body) => {
        try {
            const res = await chat.chatPost(body);
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
