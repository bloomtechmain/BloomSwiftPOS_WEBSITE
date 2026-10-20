import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatLKR } from '../config/shop';

const FloatingCart = () => {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();
  const { isCartOpen, openCart, getCartCount, getCartTotal } = useCart();
  const count = getCartCount();

  // Briefly bump the button whenever the item count goes up
  const [bump, setBump] = useState(0);
  const [prevCount, setPrevCount] = useState(count);
  if (count !== prevCount) {
    setPrevCount(count);
    if (count > prevCount) setBump(bump + 1);
  }

  // Only shown on the shop page
  const visible = !isCartOpen && pathname.startsWith('/hardware');

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="floating-cart"
          className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-30"
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        >
          <motion.button
            key={bump}
            type="button"
            onClick={openCart}
            aria-label={`Open cart, ${count} ${count === 1 ? 'item' : 'items'}`}
            animate={reduce || bump === 0 ? undefined : { scale: [1, 1.15, 1] }}
            transition={{ duration: 0.35 }}
            className="group relative flex items-center gap-3 h-14 pl-4 pr-4 sm:pr-5 rounded-full bg-navy hover:bg-navy-mid text-white shadow-[0_10px_30px_-8px_rgba(16,29,54,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-orange transition-colors"
          >
            <span className="relative">
              <ShoppingCart size={24} aria-hidden="true" />
              {count > 0 && (
                <span className="absolute -top-2.5 -right-2.5 min-w-[20px] h-5 px-1 rounded-full bg-brand-orange text-white text-[11px] font-bold flex items-center justify-center ring-2 ring-navy group-hover:ring-navy-mid">
                  {count > 99 ? '99+' : count}
                </span>
              )}
            </span>
            <span className={`text-sm font-bold whitespace-nowrap ${count > 0 ? '' : 'hidden sm:inline'}`}>
              {count > 0 ? formatLKR(getCartTotal()) : 'Cart'}
            </span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCart;
