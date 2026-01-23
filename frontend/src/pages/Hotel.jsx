import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const Hotel = () => {
    const navigate = useNavigate();
    const toast = useToast();

    const handleRequestClick = () => {
        let user = null;
        try {
            const stored = localStorage.getItem('bloom_user');
            user = stored ? JSON.parse(stored) : null;
        } catch {
            user = null;
        }
        if (!user) {
            toast.error('Please log in to submit a POS request.');
            return;
        }
        navigate(`/request-pos?service=${encodeURIComponent('Hotel POS')}`);
    };

    return (
        <div className="min-h-screen bg-white font-['Poppins']">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 lg:pt-24">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl"
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-[#002044] leading-tight mb-6">
                            Hotel POS system that provides excellent hosting services
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Focus less on admin and more on guest satisfaction. Automate and integrate hotel operations, and bring all your processes together in one hotel point of sale system.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                className="bg-[#0055D4] hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md transition-colors duration-200"
                                onClick={handleRequestClick}
                            >
                                Request for POS
                            </button>
                            <Link to="/support-centre" className="text-[#0055D4] font-bold py-3 px-6 hover:underline">
                                Talk to sales
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right Images */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[500px] hidden lg:block"
                    >
                        {/* Background Shape */}
                        <div className="absolute top-1/4 right-0 w-3/4 h-3/4 bg-blue-50/50 rounded-tl-[100px] -z-10"></div>

                        {/* Image 1: Receptionist */}
                        <img
                            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop"
                            alt="Hotel receptionist smiling"
                            className="absolute top-0 right-1/3 w-72 h-96 object-cover rounded-2xl shadow-lg z-10 border-4 border-white"
                        />

                        {/* Image 2: Guests at reception */}
                        <img
                            src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800&auto=format&fit=crop"
                            alt="Guests at hotel reception"
                            className="absolute top-24 right-0 w-72 h-96 object-cover rounded-2xl shadow-lg z-20 border-4 border-white"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Chat Widget Button (Bottom Right) */}
            <div className="fixed bottom-6 right-6 z-50">
                <button className="bg-[#002044] text-white p-4 rounded-full shadow-lg hover:bg-opacity-90 transition-all">
                    <MessageCircle size={28} />
                </button>
            </div>
        </div>
    );
};

export default Hotel;
