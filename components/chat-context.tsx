'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ChatMessage = {
  id: string;
  sender: 'user' | 'bot';
  message: string;
  streaming?: boolean; // If true, message is being animated
};

export type ChatContextType = {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  addMessage: (msg: ChatMessage) => void;
  setLoading: (loading: boolean) => void;
  setError: (err: string | null) => void;
  clearMessages: () => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addMessage = (msg: ChatMessage) => setMessages(prev => [...prev, msg]);
  const clearMessages = () => setMessages([]);

  return (
    <ChatContext.Provider value={{ messages, isLoading, error, addMessage, setLoading, setError, clearMessages }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within a ChatProvider');
  return ctx;
}; 