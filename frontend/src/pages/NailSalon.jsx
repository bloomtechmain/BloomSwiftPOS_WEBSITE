import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const NailSalon = () => {
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
    navigate(`/request-pos?service=${encodeURIComponent('Nail Salon POS')}`);
  };

  return (
    <div className="bg-gray-50 h-[calc(100vh-80px)] font-poppins flex items-center overflow-hidden">

      {/* Hero Section */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-[3rem] font-bold text-[#002044] leading-tight mb-4">
              A nail salon POS system built for your business
            </h1>
            <p className="text-base text-gray-600 mb-6 leading-relaxed">
              Put a shine on your nail salon business with a <a href="#" className="underline font-bold text-[#002044]">POS system</a> that speeds up sales, builds real-time reports, and helps increase client loyalty.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="bg-[#0055D4] hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md transition-colors duration-200 text-lg"
                onClick={handleRequestClick}
              >
                Request for POS
              </button>
              <Link to="/support-centre" className="text-[#0055D4] font-bold py-3 px-6 hover:underline text-lg flex items-center justify-center">
                Talk to sales
              </Link>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-[450px] w-full hidden lg:block"
          >
            {/* Background Shape */}
            <div className="absolute top-10 right-10 w-[80%] h-[90%] bg-[#E8EFFB] rounded-3xl -z-10"></div>

            {/* Image 1: Nail samples/Hands */}
            <img
              src="https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=800&auto=format&fit=crop"
              alt="Nail polish samples"
              className="absolute top-0 left-0 w-64 h-72 object-cover rounded-2xl shadow-lg z-20"
            />

            {/* Image 2: Manicure session */}
            <img
              src="https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800&auto=format&fit=crop"
              alt="Manicure session"
              className="absolute bottom-0 right-0 w-64 h-80 object-cover rounded-2xl shadow-lg z-10 border-4 border-white"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NailSalon;
