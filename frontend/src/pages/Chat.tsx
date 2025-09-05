import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { PaperAirplaneIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { ChatMessage } from '../types';

const Chat: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mock data
    const mockMessages: ChatMessage[] = [
      {
        id: 1,
        user_id: 1,
        message: 'Welcome to EduStream! How can I help you today?',
        created_at: '2024-01-15T10:00:00Z',
        user: { id: 1, name: 'Support Team', email: 'support@edustream.com' }
      },
      {
        id: 2,
        user_id: 2,
        message: 'Hi! I\'m having trouble accessing my course materials. Can you help?',
        created_at: '2024-01-15T10:05:00Z',
        user: { id: 2, name: 'John Doe', email: 'john@example.com' }
      },
      {
        id: 3,
        user_id: 1,
        message: 'Of course! Let me help you with that. Can you tell me which course you\'re trying to access?',
        created_at: '2024-01-15T10:06:00Z',
        user: { id: 1, name: 'Support Team', email: 'support@edustream.com' }
      },
      {
        id: 4,
        user_id: 3,
        message: 'I just completed the Web Development course. The content was excellent!',
        created_at: '2024-01-15T10:10:00Z',
        user: { id: 3, name: 'Sarah Wilson', email: 'sarah@example.com' }
      },
      {
        id: 5,
        user_id: 1,
        message: 'That\'s wonderful to hear, Sarah! Congratulations on completing the course. Don\'t forget to download your certificate.',
        created_at: '2024-01-15T10:11:00Z',
        user: { id: 1, name: 'Support Team', email: 'support@edustream.com' }
      }
    ];

    // Simulate API call
    setTimeout(() => {
      setMessages(mockMessages);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: messages.length + 1,
      user_id: user?.id || 0,
      message: newMessage,
      created_at: new Date().toISOString(),
      user: user || { id: 0, name: 'You', email: '' }
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate receiving a response
    setTimeout(() => {
      const response: ChatMessage = {
        id: messages.length + 2,
        user_id: 1,
        message: 'Thanks for your message! Our support team will get back to you soon.',
        created_at: new Date().toISOString(),
        user: { id: 1, name: 'Support Team', email: 'support@edustream.com' }
      };
      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-mint-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Chat</h1>
          <p className="text-gray-600">Connect with fellow learners and get support from our community</p>
        </div>

        <div className="bg-white rounded-xl shadow-mint-lg border border-mint-200 overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-mint-500 to-teal-500 px-6 py-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
                <span className="text-mint-600 font-bold text-lg">E</span>
              </div>
              <div>
                <h2 className="text-white font-semibold">EduStream Community</h2>
                <p className="text-mint-100 text-sm">Online now</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.user_id === user?.id ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-xs lg:max-w-md ${message.user_id === user?.id ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    message.user_id === user?.id ? 'ml-3 bg-mint-500' : 'bg-gray-300'
                  }`}>
                    {message.user_id === user?.id ? (
                      <UserCircleIcon className="w-6 h-6 text-white" />
                    ) : (
                      <UserCircleIcon className="w-6 h-6 text-gray-600" />
                    )}
                  </div>
                  <div className={`px-4 py-2 rounded-lg ${
                    message.user_id === user?.id
                      ? 'bg-mint-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <div className="text-sm font-medium mb-1">
                      {message.user?.name}
                    </div>
                    <div className="text-sm">
                      {message.message}
                    </div>
                    <div className={`text-xs mt-1 ${
                      message.user_id === user?.id ? 'text-mint-100' : 'text-gray-500'
                    }`}>
                      {formatTime(message.created_at || '')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 p-6">
            <form onSubmit={handleSendMessage} className="flex space-x-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-mint-500"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="bg-mint-500 hover:bg-mint-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Chat Guidelines */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-mint-lg border border-mint-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Be Respectful</h4>
              <p>Treat everyone with kindness and respect. No harassment or discrimination.</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Stay On Topic</h4>
              <p>Keep discussions related to learning, courses, and educational content.</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Share Knowledge</h4>
              <p>Help fellow learners by sharing your experiences and insights.</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">No Spam</h4>
              <p>Avoid posting promotional content or irrelevant messages.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
