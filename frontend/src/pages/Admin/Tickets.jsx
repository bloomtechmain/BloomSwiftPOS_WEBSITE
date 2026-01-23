import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Ticket, Search, Filter, Mail, CheckCircle, Clock } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const Tickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const toast = useToast();

    const fetchTickets = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/tickets');
            const data = await response.json();

            if (data.success) {
                setTickets(data.data);
            } else {
                toast.error('Failed to load tickets');
            }
        } catch (error) {
            console.error('Error fetching tickets:', error);
            toast.error('Error loading tickets');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    const getGmailLink = (ticket) => {
        const subject = `Re: Support Ticket - ${ticket.project_name}`;
        const body = `Hi ${ticket.name},\n\nRegarding your ticket about: "${ticket.message}"\n\n`;
        return `https://mail.google.com/mail/?view=cm&fs=1&to=${ticket.email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const markAsReplied = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/tickets/${id}/reply`, {
                method: 'PUT'
            });
            const data = await response.json();

            if (data.success) {
                toast.success('Ticket marked as replied');
                // Update local state
                setTickets(prev => prev.map(t => t.id === id ? { ...t, status: 'Replied' } : t));
            }
        } catch (error) {
            console.error('Error updating ticket:', error);
        }
    };

    const filteredTickets = tickets.filter(ticket => {
        const matchesFilter = filter === 'All' || ticket.status === filter;
        const matchesSearch =
            ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.email.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#002044]">Support Tickets</h1>
                    <p className="text-gray-600">Manage customer inquiries and support requests</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search tickets..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#002044] w-full sm:w-64 shadow-sm"
                        />
                    </div>

                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:border-[#002044] shadow-sm"
                    >
                        <option value="All">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Replied">Replied</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20 text-gray-500">Loading tickets...</div>
            ) : filteredTickets.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <Ticket size={32} />
                    </div>
                    <h3 className="text-lg font-medium text-[#002044] mb-2">No tickets found</h3>
                    <p className="text-gray-500">Try adjusting your search or filters</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {filteredTickets.map((ticket) => (
                        <motion.div
                            key={ticket.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all shadow-sm"
                        >
                            <div className="flex flex-col lg:flex-row justify-between gap-6">
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${ticket.status === 'Replied'
                                            ? 'bg-green-100 text-green-700 border-green-200'
                                            : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                                            }`}>
                                            {ticket.status}
                                        </span>
                                        <span className="text-gray-500 text-sm flex items-center gap-1">
                                            <Clock size={14} />
                                            {new Date(ticket.created_at).toLocaleString()}
                                        </span>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-[#002044] mb-1">{ticket.project_name}</h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <span className="text-gray-700 font-medium">{ticket.name}</span>
                                            <span>•</span>
                                            <span>{ticket.email}</span>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                                        <p className="text-gray-700 whitespace-pre-wrap">{ticket.message}</p>
                                    </div>
                                </div>

                                <div className="flex flex-row lg:flex-col gap-3 justify-end lg:justify-start min-w-[140px]">
                                    <a
                                        href={getGmailLink(ticket)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 px-4 py-2 bg-[#002044] hover:bg-[#003060] text-white rounded-lg transition-colors text-sm font-medium shadow-sm"
                                    >
                                        <Mail size={16} />
                                        Reply via Gmail
                                    </a>

                                    {ticket.status !== 'Replied' && (
                                        <button
                                            onClick={() => markAsReplied(ticket.id)}
                                            className="flex items-center justify-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-600 hover:text-[#002044] rounded-lg transition-colors text-sm font-medium border border-gray-200 shadow-sm"
                                        >
                                            <CheckCircle size={16} />
                                            Mark Replied
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Tickets;
