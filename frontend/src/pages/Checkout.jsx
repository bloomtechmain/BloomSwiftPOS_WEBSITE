import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { ShoppingBag, CreditCard, Check, ArrowLeft, Loader } from 'lucide-react';
import API_URL from '../config/api';

const lkrFormatter = new Intl.NumberFormat('en-LK', {
  style: 'currency',
  currency: 'LKR'
});

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: ''
  });

  useEffect(() => {
    // Load user data if logged in
    try {
      const stored = localStorage.getItem('bloom_user');
      if (stored) {
        const user = JSON.parse(stored);
        setCurrentUser(user);
        setFormData(prev => ({
          ...prev,
          fullName: user.fullName || '',
          email: user.email || '',
          phone: user.phone || ''
        }));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }, []);

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0 && step === 1) {
      toast.error('Your cart is empty!');
      navigate('/hardware');
    }
  }, [cart.length, navigate, toast, step]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateStep1 = () => {
    if (!formData.fullName.trim()) {
      toast.error('Please enter your full name');
      return false;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error('Please enter your phone number');
      return false;
    }
    if (!formData.address.trim()) {
      toast.error('Please enter your shipping address');
      return false;
    }
    if (!formData.city.trim()) {
      toast.error('Please enter your city');
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handlePaymentMethodSelect = (method) => {
    setFormData(prev => ({ ...prev, paymentMethod: method }));
  };

  const handlePlaceOrder = async () => {
    if (!formData.paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }

    setLoading(true);

    try {
      // Create order
      const orderData = {
        userId: currentUser?.id || null,
        customerName: formData.fullName,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        paymentMethod: formData.paymentMethod,
        totalAmount: getCartTotal(),
        items: cart.map(item => ({
          hardwareId: item.id,
          hardwareName: item.hardware_name,
          quantity: item.quantity,
          price: item.price
        }))
      };

      const response = await fetch(`${API_URL}/api/orders/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to create order');
      }

      const orderId = data.orderId;

      // Handle payment based on selected method
      if (formData.paymentMethod === 'stripe') {
        await handleStripePayment(orderId);
      } else if (formData.paymentMethod === 'paypal') {
        await handlePayPalPayment(orderId);
      } else if (formData.paymentMethod === 'payhere') {
        await handlePayHerePayment(orderId);
      }

    } catch (error) {
      console.error('Order creation error:', error);
      toast.error(error.message || 'Failed to create order. Please try again.');
      setLoading(false);
    }
  };

  const handleStripePayment = async (orderId) => {
    try {
      const response = await fetch(`${API_URL}/api/orders/${orderId}/payment/stripe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.success && data.clientSecret) {
        // Redirect to Stripe Checkout or handle client secret
        toast.success('Redirecting to Stripe payment...');
        // For now, simulate success
        setTimeout(() => {
          handlePaymentSuccess(orderId);
        }, 2000);
      } else {
        throw new Error(data.message || 'Stripe payment initialization failed');
      }
    } catch (error) {
      console.error('Stripe payment error:', error);
      toast.error('Payment initialization failed');
      setLoading(false);
    }
  };

  const handlePayPalPayment = async (orderId) => {
    try {
      const response = await fetch(`${API_URL}/api/orders/${orderId}/payment/paypal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.success && data.approvalUrl) {
        toast.success('Redirecting to PayPal...');
        // Redirect to PayPal
        window.location.href = data.approvalUrl;
      } else {
        throw new Error(data.message || 'PayPal payment initialization failed');
      }
    } catch (error) {
      console.error('PayPal payment error:', error);
      toast.error('Payment initialization failed');
      setLoading(false);
    }
  };

  const handlePayHerePayment = async (orderId) => {
    try {
      const response = await fetch(`${API_URL}/api/orders/${orderId}/payment/payhere`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.success && data.payment) {
        toast.success('Redirecting to PayHere...');
        // Initialize PayHere payment
        // This would typically open PayHere payment modal
        setTimeout(() => {
          handlePaymentSuccess(orderId);
        }, 2000);
      } else {
        throw new Error(data.message || 'PayHere payment initialization failed');
      }
    } catch (error) {
      console.error('PayHere payment error:', error);
      toast.error('Payment initialization failed');
      setLoading(false);
    }
  };

  const handlePaymentSuccess = (orderId) => {
    clearCart();
    navigate(`/order-confirmation/${orderId}`);
  };

  const cartTotal = getCartTotal();
  const shippingFee = 500; // Fixed shipping fee
  const grandTotal = cartTotal + shippingFee;

  return (
    <div className="min-h-screen bg-grey-light py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/hardware')}
            className="flex items-center gap-2 text-navy hover:text-brand-orange transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            <span>Back to Shop</span>
          </button>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-brand-orange' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-brand-orange text-white' : 'bg-gray-300 text-white'}`}>
                  {step > 1 ? <Check size={18} /> : '1'}
                </div>
                <span className="font-semibold hidden sm:inline">Shipping</span>
              </div>
              <div className={`w-16 h-1 ${step >= 2 ? 'bg-brand-orange' : 'bg-gray-300'}`} />
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-brand-orange' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-brand-orange text-white' : 'bg-gray-300 text-white'}`}>
                  2
                </div>
                <span className="font-semibold hidden sm:inline">Payment</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-navy mb-6">Shipping Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-transparent bg-grey-light rounded-xl focus:bg-white focus:ring-2 focus:ring-navy"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-transparent bg-grey-light rounded-xl focus:bg-white focus:ring-2 focus:ring-navy"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-transparent bg-grey-light rounded-xl focus:bg-white focus:ring-2 focus:ring-navy"
                        placeholder="+94 77 123 4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Shipping Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-3 border border-transparent bg-grey-light rounded-xl focus:bg-white focus:ring-2 focus:ring-navy"
                      placeholder="123 Main Street, Apartment 4B"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-transparent bg-grey-light rounded-xl focus:bg-white focus:ring-2 focus:ring-navy"
                        placeholder="Colombo"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-transparent bg-grey-light rounded-xl focus:bg-white focus:ring-2 focus:ring-navy"
                        placeholder="00100"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    onClick={handleNextStep}
                    className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-navy mb-6">Payment Method</h2>
                
                <div className="space-y-4 mb-8">
                  {/* Stripe */}
                  <div
                    onClick={() => handlePaymentMethodSelect('stripe')}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      formData.paymentMethod === 'stripe'
                        ? 'border-brand-orange bg-grey-light'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        formData.paymentMethod === 'stripe' ? 'border-brand-orange' : 'border-gray-300'
                      }`}>
                        {formData.paymentMethod === 'stripe' && (
                          <div className="w-3 h-3 rounded-full bg-brand-orange" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-navy">Credit/Debit Card (Stripe)</h3>
                        <p className="text-sm text-gray-600">Pay securely with Stripe</p>
                      </div>
                      <CreditCard className="text-gray-400" size={24} />
                    </div>
                  </div>

                  {/* PayPal */}
                  <div
                    onClick={() => handlePaymentMethodSelect('paypal')}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      formData.paymentMethod === 'paypal'
                        ? 'border-brand-orange bg-grey-light'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        formData.paymentMethod === 'paypal' ? 'border-brand-orange' : 'border-gray-300'
                      }`}>
                        {formData.paymentMethod === 'paypal' && (
                          <div className="w-3 h-3 rounded-full bg-brand-orange" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-navy">PayPal</h3>
                        <p className="text-sm text-gray-600">Pay with your PayPal account</p>
                      </div>
                      <div className="text-2xl font-bold text-[#0070BA]">PayPal</div>
                    </div>
                  </div>

                  {/* PayHere */}
                  <div
                    onClick={() => handlePaymentMethodSelect('payhere')}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      formData.paymentMethod === 'payhere'
                        ? 'border-brand-orange bg-grey-light'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        formData.paymentMethod === 'payhere' ? 'border-brand-orange' : 'border-gray-300'
                      }`}>
                        {formData.paymentMethod === 'payhere' && (
                          <div className="w-3 h-3 rounded-full bg-brand-orange" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-navy">PayHere (Sri Lanka)</h3>
                        <p className="text-sm text-gray-600">Local payment gateway for LKR</p>
                      </div>
                      <div className="text-xl font-bold text-[#F15A29]">PayHere</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handlePreviousStep}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="flex-1 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader className="animate-spin" size={20} />
                        Processing...
                      </>
                    ) : (
                      'Place Order'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
                <ShoppingBag size={24} />
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0">
                      {(item.images?.[0] || item.image) && (
                        <img
                          src={item.images?.[0] || item.image}
                          alt={item.hardware_name}
                          className="w-full h-full object-contain rounded"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-navy truncate">
                        {item.hardware_name}
                      </h3>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm font-bold text-navy">
                        {lkrFormatter.format(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">{lkrFormatter.format(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">{lkrFormatter.format(shippingFee)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-navy pt-2 border-t">
                  <span>Total</span>
                  <span>{lkrFormatter.format(grandTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
