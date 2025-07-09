'use client';

import React, { useCallback } from 'react';
import { ChatProvider, useChat } from '../../components/chat-context';
import ChatWindow from '../../components/chat-window';
import ChatInput from '../../components/chat-input';
import { v4 as uuidv4 } from 'uuid';

const API_URL = 'http://localhost:8000/api/chatbot/request/v1';
const USER_ID = 'manish.pandey3@soprasteria.com';
const CONVERSATION_ID = 'c33eb7a0-a997-4ac8-b889-ed67478b4cb0';

function ChatPageInner() {
  const { addMessage, setLoading, setError, isLoading, error } = useChat();

  const handleSend = useCallback(async (text: string) => {
    const userMsg = { id: uuidv4(), sender: 'user' as const, message: text };
    addMessage(userMsg);
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': '',
        },
        body: JSON.stringify({
          query: text,
          user_id: USER_ID,
          conversationid: CONVERSATION_ID,
        }),
      });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      const botMsg = {
        id: uuidv4(),
        sender: 'bot' as const,
        message: data.response || 'No response',
        streaming: true,
      };
      addMessage(botMsg);
      // After a short delay, mark streaming as false (handled in MessageBubble for animation)
      // No need to update context here; MessageBubble will animate
    } catch (e: any) {
      setError('Failed to get response from bot.');
    } finally {
      setLoading(false);
    }
  }, [addMessage, setLoading, setError]);

  return (
    <div className="flex flex-col h-screen w-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      {/* Personalized Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-blue-600 to-pink-500 dark:from-gray-800 dark:to-gray-700 shadow-md z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-700 flex items-center justify-center text-2xl font-bold text-white shadow">
            🧑
          </div>
          <div className="flex flex-col">
            <span className="text-white font-semibold text-lg drop-shadow">Hi, Manish 👋</span>
            <span className="text-xs text-white/80">Welcome back!</span>
          </div>
        </div>
        <DarkModeToggle />
      </header>
      {/* Chat Area */}
      <main className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 flex flex-col justify-end max-w-2xl w-full mx-auto px-2 sm:px-0 py-2">
          <div className="flex-1 flex flex-col min-h-0">
            <ChatWindow />
            {error && <div className="text-red-500 text-center p-2 font-medium">{error}</div>}
          </div>
        </div>
      </main>
      {/* Chat Input fixed at bottom */}
      <footer className="w-full max-w-2xl mx-auto px-2 sm:px-0 pb-2 sticky bottom-0 z-20">
        <div className="rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90">
          <ChatInput onSend={handleSend} isLoading={isLoading} />
        </div>
      </footer>
    </div>
  );
}

function DarkModeToggle() {
  // Simple dark mode toggle using Tailwind's dark class
  const [dark, setDark] = React.useState(false);
  React.useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);
  return (
    <button
      className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
      onClick={() => setDark(d => !d)}
      aria-label="Toggle dark mode"
    >
      {dark ? '🌙' : '☀️'}
    </button>
  );
}

export default function ChatPage() {
  return (
    <ChatProvider>
      <ChatPageInner />
    </ChatProvider>
  );
} 