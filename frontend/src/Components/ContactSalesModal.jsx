import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Mail, X, ArrowRight } from 'lucide-react';

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
            className="fixed inset-0 bg-navy-dark/70 z-[60]"
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-sales-title"
          >
            <div className="bg-white rounded-2xl shadow-[8px_8px_0_0_#101D36] w-full max-w-md pointer-events-auto overflow-y-auto max-h-[calc(100dvh-2rem)]">
              <div className="bg-navy p-7 text-white relative">
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="absolute top-5 right-5 w-9 h-9 rounded-lg bg-white/10 hover:bg-white hover:text-navy inline-flex items-center justify-center transition-colors"
                >
                  <X size={18} />
                </button>
                <h2 id="contact-sales-title" className="text-2xl font-extrabold">Contact sales</h2>
                <p className="text-white/60 text-sm mt-1">
                  Choose how you want to connect with our team.
                </p>
                <span className="mt-5 block w-12 h-1 bg-brand-orange" aria-hidden="true" />
              </div>

              <div className="p-7 space-y-3">
                <button
                  type="button"
                  onClick={handleWhatsAppClick}
                  className="group w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-bold py-4 px-5 rounded-xl transition-colors flex items-center gap-3"
                >
                  <MessageCircle size={20} />
                  <span className="flex-1 text-left">Connect with WhatsApp</span>
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={handleEmailClick}
                  className="group w-full bg-grey-light hover:bg-navy hover:text-white text-navy font-bold py-4 px-5 rounded-xl transition-colors flex items-center gap-3"
                >
                  <Mail size={20} />
                  <span className="flex-1 text-left">Connect with Email</span>
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
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
