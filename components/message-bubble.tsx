'use client';

import React, { useEffect, useState } from 'react';

export type MessageBubbleProps = {
  message: string;
  sender: 'user' | 'bot';
  streaming?: boolean;
};

/**
 * MessageBubble displays a single chat message, aligned by sender, with avatars and HTML rendering for bot.
 * If streaming is true, animates the message word-by-word.
 */
export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, sender, streaming }) => {
  const isUser = sender === 'user';
  const [displayed, setDisplayed] = useState(isUser || !streaming ? message : '');

  useEffect(() => {
    if (!streaming || isUser) {
      setDisplayed(message);
      return;
    }
    // Animate word-by-word
    const words = message.split(/(\s+)/);
    let idx = 0;
    setDisplayed('');
    const interval = setInterval(() => {
      idx++;
      setDisplayed(words.slice(0, idx).join(''));
      if (idx >= words.length) clearInterval(interval);
    }, 60); // Adjust speed as needed
    return () => clearInterval(interval);
  }, [message, streaming, isUser]);

  return (
    <div className={`flex items-end ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center mr-2">
          <span className="text-white font-bold">🤖</span>
        </div>
      )}
      <div
        className={`relative max-w-[75%] px-4 py-2 rounded-2xl shadow-md text-base break-words whitespace-pre-wrap
          ${isUser
            ? 'bg-blue-600 text-white rounded-br-none ml-auto'
            : 'bg-white dark:bg-gray-100 text-gray-900 rounded-bl-none mr-auto border border-gray-200'}
        `}
        data-testid={`message-bubble-${sender}`}
        {...(!isUser
          ? { dangerouslySetInnerHTML: { __html: displayed } }
          : { children: displayed })}
      />
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-700 flex items-center justify-center ml-2">
          <span className="text-white font-bold">🧑</span>
        </div>
      )}
    </div>
  );
};

export default MessageBubble; 