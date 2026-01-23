import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ContactSalesModal = ({ isOpen, onClose }) => {
  const handleWhatsAppClick = () => {
    const url = 'https://wa.me/94726700243';
    window.open(url, '_blank');
    if (onClose) {
      onClose();
    }
  };

  const handleEmailClick = () => {
    const url = 'https://mail.google.com/mail/u/0/?view=cm&fs=1&to=info@bloomtech.lk';
    window.open(url, '_blank');
    if (onClose) {
      onClose();
    }
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
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md pointer-events-auto overflow-hidden font-['Poppins']">
              <div className="bg-[#002044] p-6 text-white">
                <h2 className="text-2xl font-bold">Contact sales</h2>
                <p className="text-blue-200 text-sm mt-1">
                  Choose how you want to connect with our team.
                </p>
              </div>

              <div className="p-8 space-y-4">
                <button
                  type="button"
                  onClick={handleWhatsAppClick}
                  className="w-full bg-[#25D366] text-white font-bold py-3 rounded-lg hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2"
                >
                  <span>Connect with WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleEmailClick}
                  className="w-full bg-[#0055D4] text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Connect with Email</span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactSalesModal;

