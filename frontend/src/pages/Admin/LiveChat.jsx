import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Send, User, Search, RefreshCw, MessageCircle } from 'lucide-react';

const LiveChat = () => {
    const [conversations, setConversations] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [replyText, setReplyText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const pollingIntervalRef = useRef(null);
    const location = useLocation();

    // Fetch list of conversations (users who have chatted)
    const fetchConversations = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/chat/conversations');
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setConversations(data.data);
                }
            }
        } catch (error) {
            console.error('Error fetching conversations:', error);
        }
    };

    // Fetch chat history for selected user
    const fetchHistory = async (username) => {
        try {
            const response = await fetch(`http://localhost:5000/api/chat/history/${username}`);
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setMessages(data.data);
                }
            }
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    };

    // Initial fetch and optional pre-selected user from query param
    useEffect(() => {
        fetchConversations();
        const params = new URLSearchParams(location.search);
        const initialUser = params.get('user');
        if (initialUser) {
            setSelectedUser(initialUser);
        }
        const interval = setInterval(fetchConversations, 10000); // Refresh list every 10s
        return () => clearInterval(interval);
    }, [location.search]);

    // Polling for active chat
    useEffect(() => {
        if (selectedUser) {
            fetchHistory(selectedUser);
            pollingIntervalRef.current = setInterval(() => {
                fetchHistory(selectedUser);
            }, 3000);
        }

        return () => {
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current);
            }
        };
    }, [selectedUser]);

    // Scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Mark messages as read
    const markAsRead = async (username) => {
        try {
            await fetch(`http://localhost:5000/api/chat/read/${username}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reader_role: 'admin' })
            });
            // Refresh conversations to update badge count
            fetchConversations();
        } catch (error) {
            console.error('Error marking as read:', error);
        }
    };

    const handleUserSelect = (username) => {
        setSelectedUser(username);
        markAsRead(username);
    };

    const handleSendReply = async (e) => {
        e.preventDefault();
        if (!replyText.trim() || !selectedUser) return;

        const text = replyText;
        setReplyText('');

        try {
            const response = await fetch('http://localhost:5000/api/chat/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: 'Admin', // Or logged in admin name
                    message: text,
                    sender_role: 'admin',
                    conversation_id: selectedUser
                })
            });

            if (response.ok) {
                fetchHistory(selectedUser);
                // Also refresh list to update last message time
                fetchConversations();
            }
        } catch (error) {
            console.error('Error sending reply:', error);
        }
    };

    // Format time for list
    const formatTime = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col">
            <h2 className="text-2xl font-bold text-[#002044] mb-6">Live Chat Support</h2>

            <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex">
                {/* Sidebar: User List */}
                <div className="w-1/3 border-r border-gray-100 flex flex-col bg-gray-50">
                    <div className="p-4 border-b border-gray-100 bg-white">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search users..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#002044] transition-colors"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {conversations.length === 0 ? (
                            <div className="p-8 text-center text-gray-400">
                                <MessageCircle size={32} className="mx-auto mb-2 opacity-50" />
                                <p>No conversations yet</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {conversations.map((conv, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleUserSelect(conv.username)}
                                        className={`w-full p-4 flex items-center gap-3 hover:bg-white transition-colors text-left ${selectedUser === conv.username ? 'bg-white border-l-4 border-[#FF7A00] shadow-sm' : 'border-l-4 border-transparent'
                                            }`}
                                    >
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 ${selectedUser === conv.username ? 'bg-[#FF7A00]' : 'bg-[#002044]'
                                            }`}>
                                            {conv.username.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-baseline mb-1">
                                                <div className="font-semibold text-[#002044] truncate">{conv.username}</div>
                                                <div className="text-[10px] text-gray-400 whitespace-nowrap ml-2">
                                                    {formatTime(conv.last_message_time)}
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="text-xs text-gray-500 truncate pr-2">
                                                    {conv.last_message || 'Click to view chat'}
                                                </div>
                                                {conv.unread_count > 0 && (
                                                    <span className="bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                                                        {conv.unread_count}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Main: Chat Area */}
                <div className="flex-1 flex flex-col bg-white">
                    {selectedUser ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#002044] flex items-center justify-center text-white font-bold">
                                        {selectedUser.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#002044]">{selectedUser}</h3>
                                        <div className="flex items-center gap-1 text-xs text-green-500">
                                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                            Active
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => fetchHistory(selectedUser)} className="p-2 text-gray-400 hover:text-[#002044] transition-colors">
                                    <RefreshCw size={18} />
                                </button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.sender_role === 'admin' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-[70%] rounded-2xl p-4 ${msg.sender_role === 'admin'
                                            ? 'bg-[#002044] text-white rounded-tr-none'
                                            : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
                                            }`}>
                                            <p className="text-sm">{msg.message}</p>
                                            <div className={`text-[10px] mt-1 text-right ${msg.sender_role === 'admin' ? 'text-gray-400' : 'text-gray-400'
                                                }`}>
                                                {msg.time && msg.time.slice(0, 5)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="p-4 border-t border-gray-100 bg-white">
                                <form onSubmit={handleSendReply} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        placeholder="Type your reply..."
                                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#002044] transition-colors"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!replyText.trim()}
                                        className="bg-[#FF7A00] text-white p-2 rounded-lg hover:bg-[#E66E00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Send size={20} />
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                            <MessageCircle size={48} className="mb-4 opacity-20" />
                            <p>Select a conversation to start chatting</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LiveChat;
