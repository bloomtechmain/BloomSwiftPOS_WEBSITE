import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, LogOut, Ticket, ClipboardList, LifeBuoy, ShieldCheck, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem('bloom_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const UserProfile = () => {
  const navigate = useNavigate();
  const user = getStoredUser();

  const handleLogout = () => {
    try {
      localStorage.removeItem('bloom_user');
    } catch { }
    window.location.href = '/';
  };

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-grey-light flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <User size={40} className="text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-navy mb-3">
            Guest Access
          </h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Please log in to manage your account, view tickets, and track requests.
          </p>
          <button
            onClick={() => navigate('/?login=1')}
            className="w-full bg-brand-orange text-white font-bold py-3.5 rounded-xl hover:bg-brand-orange-dark transition-all shadow-lg shadow-gray-200"
          >
            Log in now
          </button>
        </motion.div>
      </div>
    );
  }

  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'U';
  };

  const menuItems = [
    {
      title: 'My Tickets',
      desc: 'View and track support tickets',
      icon: Ticket,
      path: '/my-tickets',
      color: 'bg-grey-light text-navy'
    },
    {
      title: 'POS Requests',
      desc: 'Manage service requests',
      icon: ClipboardList,
      path: '/my-pos-requests',
      color: 'bg-grey-light text-brand-orange-dark'
    },
    {
      title: 'Support Centre',
      desc: 'Get help and documentation',
      icon: LifeBuoy,
      path: '/support-centre',
      color: 'bg-green-50 text-green-600'
    }
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-grey-light py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column - Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
              <div className="bg-navy h-32 relative">
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
                  <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-lg rotate-3">
                    <div className="w-full h-full bg-gradient-to-br from-brand-orange to-brand-orange-dark rounded-xl flex items-center justify-center text-white text-3xl font-bold shadow-inner">
                      {getInitials(user.fullName)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-14 pb-8 px-6 text-center">
                <h2 className="text-xl font-bold text-navy mb-1">
                  {user.fullName}
                </h2>
                <p className="text-sm text-gray-500 font-medium mb-6">
                  @{user.username}
                </p>

                <div className="space-y-4 text-left">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-grey-light border border-gray-100">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm text-navy">
                      <Mail size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Email Address</p>
                      <p className="text-sm font-medium text-navy truncate" title={user.email}>
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-grey-light border border-gray-100">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm text-green-600">
                      <ShieldCheck size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Account Type</p>
                      <p className="text-sm font-medium text-navy">
                        Standard User
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full mt-8 flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-navy to-navy-mid rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-2">Welcome back, {user.fullName.split(' ')[0]}! 👋</h2>
                <p className="text-white/60 max-w-lg">
                  Manage your POS systems, track support tickets, and access your account settings all in one place.
                </p>
              </div>
              <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-10 translate-y-10">
                <CreditCard size={200} />
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div>
              <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -4 }}
                    onClick={() => navigate(item.path)}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all group"
                  >
                    <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <item.icon size={24} />
                    </div>
                    <h4 className="text-lg font-bold text-navy mb-1 group-hover:text-brand-orange transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;