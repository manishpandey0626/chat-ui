'use client';

import React from 'react';

/**
 * Loader displays a typing indicator for the bot.
 */
export const Loader: React.FC = () => (
  <div className="flex items-center space-x-2 text-gray-500 text-sm pl-2" data-testid="bot-typing-loader">
    <span className="animate-bounce">•</span>
    <span className="animate-bounce delay-150">•</span>
    <span className="animate-bounce delay-300">•</span>
    <span>Bot is typing...</span>
  </div>
);

export default Loader; 