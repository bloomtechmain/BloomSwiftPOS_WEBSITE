import React, { useState, useEffect } from 'react';
import API_URL from '../config/api';
import { motion } from 'framer-motion';
import { ClipboardList, Plus, Calendar, Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const MyPOSRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const toast = useToast();

    const fetchRequests = async () => {
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
            const response = await fetch(`${API_URL}/api/service-requests/user/${user.id}`);
            const data = await response.json();

            if (data.success) {
                setRequests(data.data);
            } else {
                console.error('Failed to load requests:', data.message);
                // Only show toast if it's a critical error, but for now we suppress it if it's just no data or handled error
                if (data.message !== 'Failed to fetch requests') {
                    toast.error(data.message || 'Failed to load requests');
                }
            }
        } catch (error) {
            console.error('Error fetching requests:', error);
            // toast.error('Error loading requests'); // Suppressed as per user request if no critical failure
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-[#002044]">My POS Requests</h1>
                        <p className="text-gray-600 mt-2">Track your POS system requests and status</p>
                    </div>
                    <button
                        onClick={() => navigate('/request-pos')}
                        className="bg-[#0055D4] hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
                    >
                        <Plus size={20} />
                        Submit a Request
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-10 h-10 border-4 border-[#0055D4]/30 border-t-[#0055D4] rounded-full animate-spin"></div>
                    </div>
                ) : requests.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center"
                    >
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                            <ClipboardList size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-[#002044] mb-2">No requests found</h3>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            You haven't submitted any POS requests yet. Ready to get started?
                        </p>
                        <button
                            onClick={() => navigate('/request-pos')}
                            className="text-[#0055D4] font-semibold hover:underline"
                        >
                            Create your first request
                        </button>
                    </motion.div>
                ) : (
                    <div className="grid gap-6">
                        {requests.map((req, index) => (
                            <motion.div
                                key={req.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                            >
                                <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-bold text-[#002044]">{req.servicetype}</h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(req.status || 'Pending')}`}>
                                                {req.status || 'Pending'}
                                            </span>
                                        </div>
                                        <p className="text-gray-500 text-sm flex items-center gap-2">
                                            <Calendar size={14} />
                                            {new Date(req.created_at).toLocaleDateString()}
                                            <span className="mx-1">•</span>
                                            <Clock size={14} />
                                            {new Date(req.created_at).toLocaleTimeString()}
                                        </p>
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        ID: #{req.id}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4 border border-gray-100">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Company</p>
                                        <p className="text-gray-700">{req.company_name || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Contact</p>
                                        <p className="text-gray-700">{req.contactnumber}</p>
                                    </div>
                                    {req.additional_information && (
                                        <div className="md:col-span-2">
                                            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Additional Information</p>
                                            <p className="text-gray-700 whitespace-pre-wrap">{req.additional_information}</p>
                                        </div>
                                    )}
                                </div>

                                {req.status === 'Replied' && (
                                    <div className="mt-4 flex items-center gap-2 text-green-600 text-sm font-medium">
                                        <CheckCircle size={16} />
                                        <span>Our team has replied to this request via email.</span>
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

export default MyPOSRequests;
