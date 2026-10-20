import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, PackageSearch, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatLKR } from '../config/shop';

const CartSidebar = () => {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    getCartTotal,
    getCartCount,
  } = useCart();

  useEffect(() => {
    if (!isCartOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && closeCart();
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCartOpen]);

  const goTo = (path) => {
    closeCart();
    navigate(path);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            className="fixed inset-0 bg-navy-dark/50 z-40"
            onClick={closeCart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Drawer */}
          <motion.aside
            key="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-50 flex flex-col"
            initial={reduce ? { opacity: 0 } : { x: '100%' }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border-grey">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-navy" aria-hidden="true" />
                <h2 className="text-xl font-extrabold text-navy">
                  Your cart <span className="text-gray-400 font-semibold">({getCartCount()})</span>
                </h2>
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="p-2 hover:bg-grey-light rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" aria-hidden="true" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-card-grey mb-4" aria-hidden="true" />
                  <p className="text-navy text-lg font-bold mb-1">Your cart is empty</p>
                  <p className="text-gray-500 text-sm mb-6">Add some hardware to get started.</p>
                  <button
                    type="button"
                    onClick={() => goTo('/hardware')}
                    className="h-11 px-6 rounded-xl bg-brand-orange hover:bg-brand-orange-dark text-white font-bold transition-colors"
                  >
                    Shop hardware
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-border-grey">
                  {cart.map((item) => (
                    <li key={item.id} className="flex gap-4 py-4">
                      <div className="w-20 h-20 flex-shrink-0 rounded-lg bg-grey-light flex items-center justify-center overflow-hidden">
                        {item.image ? (
                          <img src={item.image} alt={item.hardware_name} className="w-full h-full object-contain p-1.5" />
                        ) : (
                          <PackageSearch className="w-8 h-8 text-card-grey" aria-hidden="true" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="text-sm font-bold text-navy leading-snug">{item.hardware_name}</h3>
                            {item.brand && <p className="text-xs text-gray-500 mt-0.5">{item.brand}</p>}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Remove ${item.hardware_name}`}
                            className="p-1.5 -mr-1.5 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" aria-hidden="true" />
                          </button>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center rounded-lg border border-border-grey">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                              className="w-8 h-8 flex items-center justify-center hover:bg-grey-light rounded-l-lg transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5 text-navy" aria-hidden="true" />
                            </button>
                            <span className="text-sm font-bold w-8 text-center tabular-nums">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                              className="w-8 h-8 flex items-center justify-center hover:bg-grey-light rounded-r-lg transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5 text-navy" aria-hidden="true" />
                            </button>
                          </div>
                          <p className="text-sm font-extrabold text-navy">
                            {formatLKR(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-border-grey px-6 py-5 space-y-4 bg-grey-light">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-lg font-extrabold text-navy">
                    <span>Subtotal</span>
                    <span>{formatLKR(getCartTotal())}</span>
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-1.5">
                    <Truck size={14} aria-hidden="true" /> Shipping calculated at checkout
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => goTo('/checkout')}
                  className="w-full h-12 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold rounded-xl transition-colors"
                >
                  Checkout
                </button>
                <button
                  type="button"
                  onClick={() => goTo('/cart')}
                  className="w-full h-12 border-2 border-navy text-navy hover:bg-navy hover:text-white font-bold rounded-xl transition-colors"
                >
                  View cart
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
