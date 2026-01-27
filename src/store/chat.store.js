import { create } from 'zustand';

export const useChatStore = create((set) => ({
    activeChatId: null,
    isOpen: false,
    minimized: false,
    participantName: '',

    openChat: (chatId, participantName = 'Chat') => set({
        activeChatId: chatId,
        isOpen: true,
        minimized: false,
        participantName
    }),

    closeChat: () => set({
        isOpen: false,
        activeChatId: null
    }),

    toggleMinimize: () => set((state) => ({
        minimized: !state.minimized
    })),

    setMinimized: (minimized) => set({ minimized })
}));
