import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Mail, Phone, MapPin, CreditCard } from 'lucide-react';
import API_URL from '../config/api';

const lkrFormatter = new Intl.NumberFormat('en-LK', {
  style: 'currency',
  currency: 'LKR'
});

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`${API_URL}/api/orders/${orderId}`);
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Failed to load order details');
        }

        setOrder(data.order);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-grey-light flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange mb-4"></div>
          <p className="text-gray-600 font-medium">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-grey-light flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Order not found'}</p>
          <button
            onClick={() => navigate('/hardware')}
            className="bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const paymentMethodLabels = {
    stripe: 'Credit/Debit Card (Stripe)',
    paypal: 'PayPal',
    payhere: 'PayHere'
  };

  return (
    <div className="min-h-screen bg-grey-light py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-2">
            Order Confirmed!
          </h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been received.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Order ID: <span className="font-semibold">#{order.id}</span>
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-bold text-navy mb-6 flex items-center gap-2">
            <Package size={24} />
            Order Details
          </h2>

          <div className="space-y-4 mb-6">
            {order.items && order.items.map((item) => (
              <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
                <div className="flex-1">
                  <h3 className="font-semibold text-navy">{item.hardware_name}</h3>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-navy">
                    {lkrFormatter.format(item.price * item.quantity)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {lkrFormatter.format(item.price)} each
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">{lkrFormatter.format(order.total_amount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="font-semibold">{lkrFormatter.format(500)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-navy pt-2 border-t">
              <span>Total</span>
              <span>{lkrFormatter.format(order.total_amount + 500)}</span>
            </div>
          </div>
        </div>

        {/* Shipping & Payment Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Shipping Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
              <MapPin size={20} />
              Shipping Address
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p className="font-semibold text-navy">{order.customer_name}</p>
              <p>{order.shipping_address}</p>
              <p>{order.city} {order.postal_code}</p>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t">
                <Mail size={16} />
                <span>{order.customer_email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>{order.customer_phone}</span>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
              <CreditCard size={20} />
              Payment Method
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p className="font-semibold text-navy">
                {paymentMethodLabels[order.payment_method] || order.payment_method}
              </p>
              <p className="text-xs">
                Payment Status: <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                  {order.payment_status || 'Pending'}
                </span>
              </p>
              <p className="text-xs">
                Order Status: <span className="inline-block px-2 py-1 bg-grey-light text-navy rounded">
                  {order.order_status || 'Processing'}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Confirmation Message */}
        <div className="bg-grey-light border border-gray-200 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-navy mb-2">What's Next?</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-brand-orange">•</span>
              <span>You will receive an order confirmation email at <strong>{order.customer_email}</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-orange">•</span>
              <span>We'll send you shipping updates as your order is processed</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-orange">•</span>
              <span>Expected delivery: 3-5 business days</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate('/hardware')}
            className="flex-1 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate('/my-orders')}
            className="flex-1 bg-white hover:bg-grey-light text-navy border-2 border-navy font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
