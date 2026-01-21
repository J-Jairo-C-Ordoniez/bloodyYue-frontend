import { useEffect, useState, useCallback } from 'react';
import chat from '../api/chat/index';
import { socket } from '../utils/socket';
import useErrorTokenStore from '../store/errorToken.store';

export default function useChats() {
    const [chats, setChats] = useState([]);
    const [isLoadingChats, setIsLoadingChats] = useState(true);
    const [errorChats, setErrorChats] = useState(null);

    const fetchChats = async () => {
        try {
            setIsLoadingChats(true);
            setErrorChats(null);
            const data = await chat.chatGet();

            if (data?.error === 401) {
                useErrorTokenStore.getState().setErrorToken(true);
                setErrorChats('Sesión expirada.');
            }

            if (data?.error) {
                setErrorChats(data?.message);
            }

            setChats(data?.data);
        } catch (err) {
            setErrorChats(err?.message || 'Error al cargar chats');
        } finally {
            setIsLoadingChats(false);
        }
    };

    useEffect(() => {
        fetchChats();
    }, []);

    // Socket listeners for new messages
    useEffect(() => {
        function onMessage(newMessage) {
            // Logic to update chat list (re-ordering/updating snippet)
            // Ideally backend sends the full chat object or we manually construct it
            // For simplicity: refetch or update if we can match the chatId
            setChats(prev => {
                const chatIndex = prev.findIndex(c => c.chatId === newMessage.chatId);
                if (chatIndex > -1) {
                    const updatedChat = { ...prev[chatIndex], lastMessage: newMessage.content, updatedAt: new Date() }; // Mock update
                    const newChats = [...prev];
                    newChats.splice(chatIndex, 1);
                    newChats.unshift(updatedChat);
                    return newChats;
                }
                return prev; // Or refetch() if it's a new chat
            });
        }

        socket.on('receive_message', onMessage); // Adjust event name

        return () => {
            socket.off('receive_message', onMessage);
        };
    }, []);

    const createChat = async (userId) => {
        // Logic to create chat
        try {
            const res = await chatApi.chatPost({ userId });
            if (res && !res.error) {
                // Add to list or navigate
                fetchChats();
            }
            return res;
        } catch (e) {
            console.error(e);
        }
    };

    return {
        chats,
        isLoadingChats,
        errorChats,
        refetch: fetchChats,
        createChat
    };
}
