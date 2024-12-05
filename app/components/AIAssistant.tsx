'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SparkAPI } from '../utils/sparkApi';

const AIAssistant = () => {
  const [isActive, setIsActive] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isFollowingScroll, setIsFollowingScroll] = useState(true);
  const sparkApi = useRef<SparkAPI | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sparkApi.current = new SparkAPI();
    return () => {
      sparkApi.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!isActive && isFollowingScroll) {
        const floatingButton = document.getElementById('ai-assistant-button');
        if (floatingButton) {
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          floatingButton.style.top = `${Math.min(scrollY + windowHeight - 100, document.body.scrollHeight - 100)}px`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isActive, isFollowingScroll]);

  const handleActivate = () => {
    setIsActive(true);
    setIsFollowingScroll(false);
    if (!sparkApi.current) {
      sparkApi.current = new SparkAPI();
    }
    sparkApi.current.connect((message) => {
      setMessages(prev => [...prev, { role: 'assistant', content: message }]);
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    });
  };

  const handleClose = () => {
    setIsActive(false);
    setIsFollowingScroll(true);
    sparkApi.current?.disconnect();
    setMessages([]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = { role: 'user' as const, content: inputMessage };
    setMessages(prev => [...prev, newMessage]);
    sparkApi.current?.sendMessage(inputMessage);
    setInputMessage('');

    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  return (
    <>
      {!isActive ? (
        <button
          id="ai-assistant-button"
          onClick={handleActivate}
          className="fixed right-8 bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors z-50"
          style={{ bottom: '2rem' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      ) : (
        <div className="fixed bottom-8 right-8 w-96 h-[32rem] bg-white rounded-lg shadow-xl flex flex-col z-50">
          <div className="p-4 bg-green-500 text-white rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">AI 助手</h3>
            <button
              onClick={handleClose}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
          
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="输入您的问题..."
                className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                发送
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AIAssistant; 