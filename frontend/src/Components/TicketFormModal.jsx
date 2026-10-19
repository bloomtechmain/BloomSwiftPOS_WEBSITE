import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, CheckCircle, Send } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import API_URL from '../config/api';

const TicketFormModal = ({ isOpen, onClose, onSuccess }) => {
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        project_name: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let user = null;
        try {
            const stored = localStorage.getItem('bloom_user');
            user = stored ? JSON.parse(stored) : null;
        } catch { }

        if (!user) {
            toast.error('Please log in to submit a ticket');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/tickets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    user_id: user.id || user.username, // Fallback if ID is missing
                    email: user.email
                })
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Ticket submitted successfully!');
                setFormData({ name: '', project_name: '', message: '' });
                if (onSuccess) onSuccess();
                onClose();
            } else {
                toast.error(data.message || 'Failed to submit ticket');
            }
        } catch (error) {
            console.error('Error submitting ticket:', error);
            toast.error('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-y-auto max-h-[calc(100dvh-2rem)]"
                    >
                        <div className="bg-navy p-6 text-white flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-bold">Submit a Ticket</h3>
                                <p className="text-white/60 text-sm mt-1">We're here to help you</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-transparent bg-grey-light rounded-xl focus:bg-white focus:ring-2 focus:ring-navy outline-none transition-all"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                                <input
                                    type="text"
                                    name="project_name"
                                    value={formData.project_name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-transparent bg-grey-light rounded-xl focus:bg-white focus:ring-2 focus:ring-navy outline-none transition-all"
                                    placeholder="e.g. Retail POS Setup"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="w-full px-4 py-2 border border-transparent bg-grey-light rounded-xl focus:bg-white focus:ring-2 focus:ring-navy outline-none transition-all resize-none"
                                    placeholder="Describe your issue or question..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-navy hover:bg-navy-mid text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                            >
                                {loading ? (
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Send size={18} />
                                        Submit Ticket
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default TicketFormModal;
