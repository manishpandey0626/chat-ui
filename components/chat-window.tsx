'use client';

import React, { useRef, useEffect } from 'react';
import { useChat } from './chat-context';
import MessageBubble from './message-bubble';
import Loader from './loader';

/**
 * ChatWindow displays the chat history and typing indicator.
 */
export const ChatWindow: React.FC = () => {
  const { messages, isLoading } = useChat();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto" style={{ minHeight: 0 }}>
      <div className="flex flex-col gap-1 max-w-2xl mx-auto px-2 sm:px-0">
        {messages.map(msg => (
          <MessageBubble key={msg.id} message={msg.message} sender={msg.sender} streaming={msg.streaming} />
        ))}
        {isLoading && <Loader />}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ChatWindow; 