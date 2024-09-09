import { create } from 'zustand';

const useConversation = create((set) => ({
  selectedConversation: null,  // Holds the currently selected conversation
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }), // Updates selected conversation

  messages: [],  // Holds the messages of the selected conversation
  setMessages: (messages) => set({ messages }),  // Updates messages
}));

export default useConversation;
