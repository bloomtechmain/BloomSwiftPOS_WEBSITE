import React, { useState, useEffect } from 'react';
import API_URL from '../config/api';
import { motion } from 'framer-motion';
import { Ticket, Plus, Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import TicketFormModal from '../Components/TicketFormModal';

const MyTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
    const toast = useToast();

    const fetchTickets = async () => {
        let user = null;
        try {
            const stored = localStorage.getItem('bloom_user');
            user = stored ? JSON.parse(stored) : null;
        } catch { }

        if (!user) {
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/tickets/user/${user.id || user.username}`);
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

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'replied':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-['Poppins'] pt-24 pb-20">
            <TicketFormModal
                isOpen={isTicketModalOpen}
                onClose={() => setIsTicketModalOpen(false)}
                onSuccess={fetchTickets}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-[#002044]">My Tickets</h1>
                        <p className="text-gray-600 mt-2">Track your support requests and inquiries</p>
                    </div>
                    <button
                        onClick={() => setIsTicketModalOpen(true)}
                        className="bg-[#0055D4] hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
                    >
                        <Plus size={20} />
                        Submit a Ticket
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-10 h-10 border-4 border-[#0055D4]/30 border-t-[#0055D4] rounded-full animate-spin"></div>
                    </div>
                ) : tickets.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center"
                    >
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                            <Ticket size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-[#002044] mb-2">No tickets found</h3>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            You haven't submitted any support tickets yet. Need help? Submit a ticket and our team will get back to you.
                        </p>
                        <button
                            onClick={() => setIsTicketModalOpen(true)}
                            className="text-[#0055D4] font-semibold hover:underline"
                        >
                            Create your first ticket
                        </button>
                    </motion.div>
                ) : (
                    <div className="grid gap-6">
                        {tickets.map((ticket, index) => (
                            <motion.div
                                key={ticket.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                            >
                                <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-bold text-[#002044]">{ticket.project_name}</h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(ticket.status)}`}>
                                                {ticket.status}
                                            </span>
                                        </div>
                                        <p className="text-gray-500 text-sm flex items-center gap-2">
                                            <Calendar size={14} />
                                            {new Date(ticket.created_at).toLocaleDateString()}
                                            <span className="mx-1">•</span>
                                            <Clock size={14} />
                                            {new Date(ticket.created_at).toLocaleTimeString()}
                                        </p>
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        ID: #{ticket.id}
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                                    <p className="text-gray-700 whitespace-pre-wrap">{ticket.message}</p>
                                </div>

                                {ticket.status === 'Replied' && (
                                    <div className="mt-4 flex items-center gap-2 text-green-600 text-sm font-medium">
                                        <CheckCircle size={16} />
                                        <span>Our team has replied to this ticket via email.</span>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyTickets;
