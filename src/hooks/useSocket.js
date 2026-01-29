import { useEffect, useState } from 'react';
import { socket } from '../utils/socket';
import useAuthStore from '../store/auth.store';
import { useNotificationStore } from '../store/notification.store';
import { toast } from 'sonner';

export default function useSocket() {
    const { token } = useAuthStore();
    const { addNotification } = useNotificationStore();
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        if (token) {
            socket.auth = { token };
            socket.connect();
        } else {
            socket.disconnect();
        }

        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onNotification(data) {
            addNotification(data);
            toast.info(data.title || 'Nueva notificación', {
                description: data.message || data.description,
            });
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('notification', onNotification);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('notification', onNotification);
        };
    }, [token, addNotification]);

    return { socket, isConnected };
}

