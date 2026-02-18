import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Eye, Calendar, CreditCard, ArrowLeft } from 'lucide-react';
import API_URL from '../config/api';

const lkrFormatter = new Intl.NumberFormat('en-LK', {
  style: 'currency',
  currency: 'LKR'
});

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    try {
      const stored = localStorage.getItem('bloom_user');
      if (!stored) {
        navigate('/?login=1');
        return;
      }
      const user = JSON.parse(stored);
      setCurrentUser(user);
    } catch (error) {
      console.error('Error loading user data:', error);
      navigate('/?login=1');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) return;

      try {
        const response = await fetch(`${API_URL}/api/orders/user/${currentUser.id}`);
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Failed to load orders');
        }

        setOrders(data.orders || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  const getStatusColor = (status) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPaymentStatusColor = (status) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-gray-100 text-gray-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  const paymentMethodLabels = {
    stripe: 'Stripe',
    paypal: 'PayPal',
    payhere: 'PayHere'
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 font-['Poppins'] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-['Poppins'] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/hardware')}
            className="flex items-center gap-2 text-[#002044] hover:text-[#FF7A00] transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            <span>Back to Shop</span>
          </button>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#002044] mb-2">My Orders</h1>
          <p className="text-gray-600">View and track your hardware orders</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {orders.length === 0 && !loading && !error && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-[#002044] mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
            <button
              onClick={() => navigate('/hardware')}
              className="bg-[#FF7A00] hover:bg-[#E66D00] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Shop Hardware
            </button>
          </div>
        )}

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Order Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Order ID</p>
                      <p className="font-semibold text-[#002044]">#{order.id}</p>
                    </div>
                    <div className="hidden sm:block w-px h-8 bg-gray-300"></div>
                    <div className="hidden sm:block">
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-semibold text-[#002044] flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(order.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.order_status)}`}>
                      {order.order_status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(order.payment_status)}`}>
                      {order.payment_status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <div className="space-y-4 mb-4">
                  {order.items && order.items.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#002044] mb-1">{item.hardware_name}</h3>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#002044]">
                          {lkrFormatter.format(item.price * item.quantity)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {lkrFormatter.format(item.price)} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CreditCard size={16} />
                    <span>{paymentMethodLabels[order.payment_method] || order.payment_method}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="text-xl font-bold text-[#002044]">
                        {lkrFormatter.format(order.total_amount + 500)}
                      </p>
                    </div>
                    <button
                      onClick={() => navigate(`/order-confirmation/${order.id}`)}
                      className="bg-[#002044] hover:bg-[#003366] text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Eye size={18} />
                      <span className="hidden sm:inline">View Details</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
