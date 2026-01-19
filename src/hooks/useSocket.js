import { useEffect, useState } from 'react';
import { socket } from '../utils/socket';
import useAuthStore from '../store/auth.store';

export default function useSocket() {
    const { token } = useAuthStore();
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

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            // Optional: disconnect on unmount if needed, but usually we keep it open for the session
            // socket.disconnect(); 
        };
    }, [token]);

    return { socket, isConnected };
}
