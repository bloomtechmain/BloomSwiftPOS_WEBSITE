import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Software = () => {
  return (
    <div className="h-[calc(100vh-80px)] overflow-hidden bg-gradient-to-br from-[#F0F4F8] to-white relative font-['Poppins']">
      <div className="absolute top-20 right-20 w-4 h-4 bg-blue-200 rounded-full opacity-50 blur-sm"></div>
      <div className="absolute bottom-40 left-1/3 w-6 h-6 bg-blue-100 rounded-full opacity-50 blur-sm"></div>
      <div className="absolute top-1/4 right-1/3 w-3 h-3 bg-blue-200 rounded-full opacity-30 blur-sm"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full items-center">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl z-10"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-[#002044] leading-tight mb-6">
              Our award-winning POS system
            </h1>
            <p className="text-base text-gray-600 mb-8 leading-relaxed">
              Simple, secure, and powerful. Take control of your business with our award-winning POS systems.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <button className="bg-[#0055D4] hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md transition-colors duration-200 text-lg w-full sm:w-auto">
                Request for POS
              </button>
              <Link to="/support-centre" className="text-[#0055D4] font-bold py-3 px-6 hover:underline text-lg flex items-center justify-center w-full sm:w-auto">
                Talk to sales
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-full flex items-center justify-center"
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] z-0 pointer-events-none opacity-10">
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <pattern id="pattern-snow-soft" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="#002044" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#pattern-snow-soft)" />
              </svg>
            </div>

            <div className="relative z-10 w-full max-w-lg">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
                alt="POS dashboard software on monitor"
                className="w-full h-auto object-contain drop-shadow-2xl rounded-lg border-4 border-white"
              />

              <motion.img
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400&auto=format&fit=crop"
                alt="Mobile POS software"
                className="absolute -bottom-10 -left-10 w-32 h-32 object-cover rounded-xl shadow-lg border-4 border-white"
              />
            </div>

            <div className="absolute top-1/4 left-0 text-blue-200 text-6xl opacity-50 select-none">❄</div>
            <div className="absolute bottom-1/4 right-0 text-blue-200 text-4xl opacity-50 select-none">❄</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Software;
