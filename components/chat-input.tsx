'use client';

import React, { useState, KeyboardEvent, FormEvent } from 'react';

export type ChatInputProps = {
  onSend: (message: string) => void;
  isLoading: boolean;
};

/**
 * ChatInput provides a text input and send button for user messages.
 */
export const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSend = (e?: FormEvent | KeyboardEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    onSend(input.trim());
    setInput('');
  };

  return (
    <form
      className="flex items-center gap-2 p-2 bg-transparent"
      onSubmit={handleSend}
    >
      <input
        className="flex-1 px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring focus:border-blue-400 dark:bg-gray-800 dark:text-white shadow-sm"
        type="text"
        placeholder="Type your message..."
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSend(e)}
        disabled={isLoading}
        data-testid="chat-input"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow font-semibold disabled:opacity-50 transition-colors hover:bg-blue-700 focus:outline-none"
        disabled={isLoading || !input.trim()}
        data-testid="send-button"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput; 