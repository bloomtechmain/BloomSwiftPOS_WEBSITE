import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({ toast, onDismiss }) => {
  const { id, type, message, duration = 3000 } = toast;

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onDismiss(id);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onDismiss]);

  const variants = {
    initial: { opacity: 0, y: -20, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
  };

  const icons = {
    success: <CheckCircle className="w-6 h-6 text-green-500" />,
    error: <XCircle className="w-6 h-6 text-red-500" />,
    warning: <AlertCircle className="w-6 h-6 text-brand-orange-dark" />,
    info: <Info className="w-6 h-6 text-navy" />
  };

  const bgColors = {
    success: 'bg-green-50 border-green-100',
    error: 'bg-red-50 border-red-100',
    warning: 'bg-grey-light border-gray-200',
    info: 'bg-grey-light border-gray-200'
  };

  return (
    <motion.div
      layout
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`pointer-events-auto w-full max-w-md rounded-lg border shadow-lg p-4 flex items-start gap-3 ${bgColors[type] || 'bg-white'}`}
    >
      <div className="flex-shrink-0 mt-0.5">
        {icons[type] || icons.info}
      </div>
      <div className="flex-1 w-0">
        <p className="text-sm font-medium text-gray-900">
          {message}
        </p>
      </div>
      <div className="flex-shrink-0 ml-4 flex">
        <button
          className="bg-transparent rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy"
          onClick={() => onDismiss(id)}
        >
          <span className="sr-only">Close</span>
          <X className="h-5 w-5" />
        </button>
      </div>
    </motion.div>
  );
};

const ToastContainer = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4 pointer-events-none flex flex-col items-center gap-2 sm:items-end sm:p-6">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
