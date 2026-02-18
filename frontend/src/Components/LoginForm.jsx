import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import API_URL from '../config/api';

const LoginForm = ({ isOpen, onClose, onLogin }) => {
    const toast = useToast();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setMessage('');

        // Debug logging
        console.log('='.repeat(60));
        console.log('[LOGIN] Attempting login...');
        console.log('[LOGIN] Email:', formData.email);
        console.log('[LOGIN] API URL:', API_URL);
        console.log('[LOGIN] Full endpoint:', `${API_URL}/api/auth/login`);

        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            console.log('[LOGIN] Response status:', response.status);
            console.log('[LOGIN] Response OK:', response.ok);

            const data = await response.json();
            console.log('[LOGIN] Response data:', data);

            if (response.ok && data.success) {
                setStatus('success');
                console.log('[LOGIN] ✓ Login successful!');
                toast.success('Login successful');
                
                if (data.user) {
                    localStorage.setItem('bloom_user', JSON.stringify(data.user));
                    console.log('[LOGIN] User stored in localStorage:', data.user.email);
                    
                    if (onLogin) {
                        onLogin(data.user);
                    }

                    // Redirect logic
                    setTimeout(() => {
                        onClose();
                        setStatus('idle');
                        setMessage('');
                        setFormData({ email: '', password: '' });

                        if (data.user.role === 'admin') {
                            console.log('[LOGIN] Redirecting to admin dashboard...');
                            navigate('/admin/dashboard');
                        }
                    }, 800);
                }
            } else {
                setStatus('idle');
                const errorMessage = data.message || 'Login failed. Please try again.';
                console.error('[LOGIN] ✗ Login failed:', errorMessage);
                console.error('[LOGIN] Error code:', data.errorCode);
                
                // More specific error messages
                let userMessage = errorMessage;
                if (data.errorCode === 'MISSING_CREDENTIALS') {
                    userMessage = 'Please fill in both email and password';
                } else if (data.errorCode === 'INVALID_CREDENTIALS') {
                    userMessage = 'Invalid email or password. Please try again.';
                } else if (data.errorCode === 'SERVER_ERROR') {
                    userMessage = 'Server error. Please try again later.';
                }
                
                toast.error(userMessage);
            }
        } catch (error) {
            setStatus('idle');
            console.error('[LOGIN] ✗ Network/CORS error:', error);
            console.error('[LOGIN] Error details:', error.message);
            
            let errorMessage = 'Network error. Please check:';
            let details = [];
            
            if (error.message.includes('Failed to fetch')) {
                details.push('• Backend server might be down');
                details.push(`• Check if ${API_URL} is accessible`);
                details.push('• CORS may be blocking the request');
            } else if (error.message.includes('CORS')) {
                details.push('• CORS policy is blocking the request');
                details.push('• Backend needs to allow your origin');
            } else {
                details.push('• Check your internet connection');
                details.push('• Backend server might be unreachable');
            }
            
            console.error('[LOGIN] Troubleshooting:', details.join('\n'));
            toast.error(`${errorMessage}\n${details.join('\n')}`);
        }
        
        console.log('='.repeat(60));
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
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md pointer-events-auto overflow-hidden">
                            <div className="bg-[#002044] p-6 text-white flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold font-['Poppins']">Welcome back</h2>
                                    <p className="text-blue-200 text-sm mt-1">Log in to your BloomSwift account</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-8">
                                {status === 'success' ? (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <User size={32} />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#002044] mb-2">You are logged in</h3>
                                        <p className="text-gray-600">{message}</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent outline-none transition-all"
                                                        placeholder="you@example.com"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        required
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent outline-none transition-all"
                                                        placeholder="••••••••"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="w-full bg-[#0055D4] text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors mt-6 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                                        >
                                            {status === 'loading' ? (
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                'Log in'
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default LoginForm;

