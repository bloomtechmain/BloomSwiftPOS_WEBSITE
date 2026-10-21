import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Plus, Minus, Trash2, ArrowLeft, PackageSearch, Truck, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SHIPPING_FEE, formatLKR } from '../config/shop';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, clearCart, getCartTotal, getCartCount } = useCart();
  const subtotal = getCartTotal();

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] bg-grey-light flex items-center justify-center px-4 py-20">
        <div className="text-center">
          <ShoppingBag className="w-20 h-20 text-card-grey mx-auto mb-6" aria-hidden="true" />
          <h1 className="text-3xl font-extrabold text-navy">Your cart is empty</h1>
          <p className="text-gray-500 mt-2 mb-8">Looks like you haven't added any hardware yet.</p>
          <Link
            to="/hardware"
            className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-brand-orange hover:bg-brand-orange-dark text-white font-bold transition-colors"
          >
            Browse hardware
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-grey-light py-10 lg:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/hardware"
          className="inline-flex items-center gap-2 text-navy hover:text-brand-orange-dark transition-colors mb-4 font-semibold"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Continue shopping
        </Link>
        <div className="flex items-end justify-between gap-4 mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy">
            Shopping cart <span className="text-gray-400 font-semibold text-2xl">({getCartCount()})</span>
          </h1>
          <button
            type="button"
            onClick={clearCart}
            className="text-sm font-bold text-gray-500 hover:text-red-600 transition-colors whitespace-nowrap"
          >
            Clear cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Line items */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
            <div className="hidden sm:grid grid-cols-[1fr_140px_120px_40px] gap-4 px-6 py-4 border-b border-border-grey text-xs font-bold uppercase tracking-wider text-gray-400">
              <span>Product</span>
              <span className="text-center">Quantity</span>
              <span className="text-right">Total</span>
              <span />
            </div>
            <ul className="divide-y divide-border-grey">
              {cart.map((item) => (
                <li key={item.id} className="grid grid-cols-[80px_1fr] sm:grid-cols-[1fr_140px_120px_40px] gap-x-3 gap-y-3 sm:gap-4 px-4 sm:px-6 py-5 items-center">
                  <div className="contents sm:flex sm:items-center sm:gap-4 sm:min-w-0">
                    <div className="w-20 h-20 flex-shrink-0 rounded-lg bg-grey-light flex items-center justify-center overflow-hidden">
                      {item.image ? (
                        <img src={item.image} alt={item.hardware_name} className="w-full h-full object-contain p-1.5" />
                      ) : (
                        <PackageSearch className="w-8 h-8 text-card-grey" aria-hidden="true" />
                      )}
                    </div>
                    <div className="min-w-0">
                      {item.category && (
                        <p className="font-mono text-[10px] font-bold tracking-widest uppercase text-gray-400">{item.category}</p>
                      )}
                      <h2 className="font-bold text-navy leading-snug">{item.hardware_name}</h2>
                      <p className="text-sm text-gray-600 mt-1">{formatLKR(item.price)} each</p>
                    </div>
                  </div>

                  <div className="col-start-2 sm:col-start-auto flex flex-wrap items-center justify-between sm:justify-center gap-x-3 gap-y-2 min-w-0">
                    <div className="flex items-center rounded-lg border border-border-grey">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                        className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center hover:bg-grey-light rounded-l-lg transition-colors"
                      >
                        <Minus className="w-4 h-4 text-navy" aria-hidden="true" />
                      </button>
                      <span className="w-8 sm:w-10 text-center font-bold tabular-nums">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                        className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center hover:bg-grey-light rounded-r-lg transition-colors"
                      >
                        <Plus className="w-4 h-4 text-navy" aria-hidden="true" />
                      </button>
                    </div>
                    <span className="sm:hidden text-sm font-extrabold text-navy whitespace-nowrap">{formatLKR(item.price * item.quantity)}</span>
                  </div>

                  <p className="hidden sm:block text-right font-extrabold text-navy">
                    {formatLKR(item.price * item.quantity)}
                  </p>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.hardware_name}`}
                    className="col-start-2 sm:col-start-auto justify-self-start sm:justify-self-end text-sm sm:p-2 flex items-center gap-1.5 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                    <span className="sm:hidden">Remove</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6 lg:sticky lg:top-28">
            <h2 className="text-xl font-extrabold text-navy mb-5">Order summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold text-navy">{formatLKR(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 flex items-center gap-1.5">
                  <Truck size={14} aria-hidden="true" /> Shipping
                </span>
                <span className="font-semibold text-navy">{formatLKR(SHIPPING_FEE)}</span>
              </div>
            </div>
            <div className="flex justify-between text-lg font-extrabold text-navy pt-4 mt-4 border-t border-border-grey">
              <span>Total</span>
              <span>{formatLKR(subtotal + SHIPPING_FEE)}</span>
            </div>
            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="mt-6 w-full h-12 rounded-xl bg-brand-orange hover:bg-brand-orange-dark text-white font-bold transition-colors flex items-center justify-center gap-2"
            >
              <Lock size={16} aria-hidden="true" />
              Proceed to checkout
            </button>
            <p className="mt-3 text-xs text-gray-500 text-center">Pay by card, PayPal or PayHere at the next step.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
