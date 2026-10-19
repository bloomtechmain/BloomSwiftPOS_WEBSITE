import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle, User, Bot } from 'lucide-react';
import API_URL from '../config/api';

const LiveChatModal = ({ isOpen, onClose, currentUser }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const markAsRead = async () => {
        if (!currentUser) return;
        try {
            await fetch(`${API_URL}/api/chat/read/${currentUser.username}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reader_role: 'user' })
            });
        } catch (error) {
            console.error('Error marking as read:', error);
        }
    };

    useEffect(() => {
        if (isOpen && currentUser) {
            fetchMessages();
            markAsRead();
            const interval = setInterval(() => {
                fetchMessages();
                markAsRead();
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [isOpen, currentUser]);

    const fetchMessages = async () => {
        try {
            const response = await fetch(`${API_URL}/api/chat/history/${currentUser.username}`);
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    const formattedMessages = data.data.map(msg => ({
                        id: msg.id,
                        sender: msg.sender_role === 'admin' ? 'agent' : 'user',
                        text: msg.message,
                        time: msg.time ? msg.time.slice(0, 5) : ''
                    }));

                    // If no messages, show welcome message
                    if (formattedMessages.length === 0) {
                        setMessages([{ id: 0, sender: 'agent', text: 'Hello! Welcome to Bloom Swift POS support. How can I help you today?', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
                    } else {
                        setMessages(formattedMessages);
                    }
                }
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !currentUser) return;

        const msgText = newMessage;
        setNewMessage('');

        // Optimistic update
        const tempMsg = {
            id: Date.now(),
            sender: 'user',
            text: msgText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, tempMsg]);

        try {
            const response = await fetch(`${API_URL}/api/chat/send`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: currentUser.username,
                    message: msgText,
                    sender_role: 'user',
                    conversation_id: currentUser.username
                })
            });

            if (response.ok) {
                fetchMessages(); // Sync with server
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md pointer-events-auto overflow-hidden flex flex-col h-[600px] max-h-[80vh]">
                            {/* Header */}
                            <div className="bg-navy p-4 text-white flex justify-between items-center shadow-md">
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-500 p-2 rounded-full">
                                        <MessageCircle size={20} className="text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold">Live Chat</h2>
                                        <p className="text-white/60 text-xs flex items-center gap-1">
                                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                            Online
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Chat Area */}
                            <div className="flex-1 overflow-y-auto p-4 bg-grey-light space-y-4">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`flex items-end max-w-[80%] gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-brand-orange' : 'bg-navy'}`}>
                                                {msg.sender === 'user' ? <User size={14} className="text-white" /> : <Bot size={14} className="text-white" />}
                                            </div>
                                            <div
                                                className={`p-3 rounded-2xl text-sm ${msg.sender === 'user'
                                                    ? 'bg-navy text-white rounded-tr-none'
                                                    : 'bg-white text-gray-800 border border-gray-100 shadow-sm rounded-tl-none'
                                                    }`}
                                            >
                                                <p>{msg.text}</p>
                                                <p className={`text-[10px] mt-1 text-right ${msg.sender === 'user' ? 'text-gray-400' : 'text-gray-400'}`}>
                                                    {msg.time}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className="flex items-end gap-2">
                                            <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center flex-shrink-0">
                                                <Bot size={14} className="text-white" />
                                            </div>
                                            <div className="bg-white border border-gray-100 shadow-sm p-3 rounded-2xl rounded-tl-none">
                                                <div className="flex gap-1">
                                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100">
                                <div className="relative flex items-center">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type your message..."
                                        className="w-full pl-4 pr-12 py-3 bg-gray-100 border-none rounded-full focus:ring-2 focus:ring-navy outline-none transition-all"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!newMessage.trim()}
                                        className="absolute right-2 p-2 bg-navy text-white rounded-full hover:bg-navy-mid disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        <Send size={18} />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default LiveChatModal;
