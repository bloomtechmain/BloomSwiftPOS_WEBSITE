import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, Filter, Mail, CheckCircle, Clock, RefreshCw } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import API_URL from '../../config/api';

const ProjectRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const toast = useToast();

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/registrations/project-requests`);
            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Failed to load project requests');
            }

            // Sort by newest first
            const sortedData = data.data.sort((a, b) => {
                const dateA = a.created_at ? new Date(a.created_at) : new Date(0);
                const dateB = b.created_at ? new Date(b.created_at) : new Date(0);
                return dateB - dateA;
            });

            setRequests(sortedData);
        } catch (err) {
            console.error('Error fetching requests:', err);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleReplyEmail = (email) => {
        if (!email) {
            toast.error('No email address available');
            return;
        }
        window.open(`https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${email}`, '_blank');
    };

    const handleMarkReplied = async (id) => {
        try {
            const response = await fetch(`${API_URL}/api/service-requests/${id}/reply`, {
                method: 'PUT'
            });

            if (response.ok) {
                setRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'Replied' } : req));
                toast.success('Marked as replied');
            } else {
                toast.error('Failed to update status');
            }
        } catch (err) {
            console.error('Error marking as replied:', err);
            toast.error('Error updating status');
        }
    };

    const filteredRequests = requests.filter(req => {
        const matchesFilter = filter === 'All' || (req.status || 'Pending') === filter;
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
            (req.clientName && req.clientName.toLowerCase().includes(searchLower)) ||
            (req.projectType && req.projectType.toLowerCase().includes(searchLower)) ||
            (req.email && req.email.toLowerCase().includes(searchLower)) ||
            (req.username && req.username.toLowerCase().includes(searchLower)) ||
            (req.id && req.id.toString().includes(searchLower));

        return matchesFilter && matchesSearch;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#002044]">Project Requests</h1>
                    <p className="text-gray-600">Manage incoming POS service requests</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search requests..."
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

                    <button
                        onClick={fetchRequests}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-[#002044] rounded-lg transition-colors border border-gray-200 shadow-sm"
                        title="Refresh Requests"
                    >
                        <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20 text-gray-500">Loading requests...</div>
            ) : filteredRequests.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <FileText size={32} />
                    </div>
                    <h3 className="text-lg font-medium text-[#002044] mb-2">No requests found</h3>
                    <p className="text-gray-500">Try adjusting your search or filters</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {filteredRequests.map((req) => (
                        <motion.div
                            key={req.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all shadow-sm"
                        >
                            <div className="flex flex-col lg:flex-row justify-between gap-6">
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${req.status === 'Replied'
                                            ? 'bg-green-100 text-green-700 border-green-200'
                                            : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                                            }`}>
                                            {req.status || 'Pending'}
                                        </span>
                                        <span className="text-gray-500 text-sm flex items-center gap-1">
                                            <Clock size={14} />
                                            {req.created_at ? new Date(req.created_at).toLocaleString() : 'Date N/A'}
                                        </span>
                                        <span className="text-gray-400 text-sm">#{req.id}</span>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-[#002044] mb-1">{req.projectType}</h3>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                                            <span className="text-gray-700 font-medium">{req.clientName}</span>
                                            {req.username && <span>@{req.username}</span>}
                                            {req.email && <span>{req.email}</span>}
                                            {req.contactnumber && <span>📞 {req.contactnumber}</span>}
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                                        <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Additional Information</p>
                                        <p className="text-gray-700 whitespace-pre-wrap">
                                            {req.additionalInformation || 'No additional information provided.'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-row lg:flex-col gap-3 justify-end lg:justify-start min-w-[140px]">
                                    <button
                                        onClick={() => handleReplyEmail(req.email)}
                                        className="flex items-center justify-center gap-2 px-4 py-2 bg-[#002044] hover:bg-[#003060] text-white rounded-lg transition-colors text-sm font-medium shadow-sm"
                                    >
                                        <Mail size={16} />
                                        Reply via Email
                                    </button>

                                    {req.status !== 'Replied' && (
                                        <button
                                            onClick={() => handleMarkReplied(req.id)}
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

export default ProjectRequests;
