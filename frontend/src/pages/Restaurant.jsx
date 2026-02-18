import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import {
  Layout,
  Clock,
  Zap,
  Monitor,
  CheckCircle,
  Utensils,
  ChefHat,
  TrendingUp,
  Package,
  BarChart3,
  MessageCircle,
  Smartphone,
  RefreshCw,
  Server,
  WifiOff
} from 'lucide-react';

const Restaurant = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const handleRequestClick = () => {
    let user = null;
    try {
      const stored = localStorage.getItem('bloom_user');
      user = stored ? JSON.parse(stored) : null;
    } catch {
      user = null;
    }
    if (!user) {
      toast.error('Please log in to submit a POS request.');
      return;
    }
    navigate(`/request-pos?service=${encodeURIComponent('Restaurant POS')}`);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="bg-gray-50 font-poppins text-[#002044]">

      {/* Hero Section */}
      <section className="relative bg-[#002044] text-white py-20 lg:py-28 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="max-w-2xl"
            >
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Run a smoother floor with our intuitive restaurant POS.
              </h1>
              <p className="text-lg lg:text-xl text-gray-300 mb-8 leading-relaxed">
                Elevate your service and simplify your workflow. Our system integrates powerful guest management with effortless table service so you can focus on the food.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleRequestClick}
                  className="bg-[#FF7A00] hover:bg-[#e66e00] text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg transform hover:-translate-y-1 text-lg"
                >
                  Get Started
                </button>
                <Link to="/contact" className="bg-transparent border-2 border-white hover:bg-white hover:text-[#002044] text-white font-bold py-4 px-8 rounded-full transition-all duration-300 text-lg text-center">
                  Contact Sales
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative hidden lg:block"
            >
              <div className="absolute top-0 right-0 w-full h-full bg-[#FF7A00] opacity-10 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop"
                alt="Restaurant Interior"
                className="relative z-10 rounded-2xl shadow-2xl border-4 border-white/10 w-full max-w-md mx-auto transform rotate-2 hover:rotate-0 transition-transform duration-500"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick View Section */}
      <section className="py-16 bg-white -mt-10 relative z-20 rounded-t-[3rem]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Full-Spectrum Visibility", desc: "Design custom floorplans and track every table, order, and tab at a glance.", icon: <Layout className="w-10 h-10 text-[#FF7A00]" /> },
              { title: "Precision Service", desc: "Eliminate kitchen chaos with course-firing tools that guarantee \"table-perfect\" timing for every guest.", icon: <ChefHat className="w-10 h-10 text-[#FF7A00]" /> },
              { title: "Increased Throughput", desc: "Capture more bookings and turn tables faster with a POS built to keep your service in constant motion.", icon: <Zap className="w-10 h-10 text-[#FF7A00]" /> }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 1: KDS */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop"
                alt="Kitchen Display System"
                className="rounded-2xl shadow-xl w-full object-cover h-[500px]"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="flex items-center gap-2 text-[#FF7A00] font-semibold mb-4">
                <Monitor className="w-5 h-5" />
                <span>HIGH-PERFORMANCE KDS</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Unify Your Service with a High-Performance KDS.</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Bridge the gap between front-of-house and the kitchen with a real-time display system designed for speed and precision.
              </p>
              <ul className="space-y-4">
                {[
                  { title: "Real-Time Synchronization", desc: "Receive in-house and online orders instantly, ensuring your kitchen starts prep the moment a guest hits \"order.\"" },
                  { title: "Precision Timing", desc: "Boost turnaround times and eliminate the lag of manual entry with automated order routing." },
                  { title: "Paperless Accuracy", desc: "Replace messy paper tickets with a digital \"single source of truth\" that updates instantly for last-minute changes." },
                  { title: "Error-Free Operations", desc: "Reduce costly mistakes with a clear, organized view of every modification and special request." }
                ].map((item, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="mt-1 bg-blue-100 p-1 rounded-full h-fit">
                      <CheckCircle className="w-4 h-4 text-[#0055D4]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#002044]">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Smart POS / Throughput */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="order-2 lg:order-1"
            >
              <div className="flex items-center gap-2 text-[#FF7A00] font-semibold mb-4">
                <Utensils className="w-5 h-5" />
                <span>SMARTER POS</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Maximize Throughput with a Smarter Restaurant POS.</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Elevate your service standards and strip away the complexity of order management with a platform built for speed.
              </p>
              <ul className="space-y-4">
                {[
                  { title: "Master the Floor", desc: "Track table occupancy and manage layouts in real time to optimize seating and maximize turnover." },
                  { title: "Guarantee Accuracy", desc: "Eliminate manual mistakes with automated ordering that ensures the kitchen gets it right the first time." },
                  { title: "Sync the Kitchen", desc: "Unite your back-of-house with a comprehensive KDS that keeps every station in perfect rhythm." },
                  { title: "Intelligent Prep", desc: "Group tickets by course or order type to shave minutes off prep time and get food to guests faster." }
                ].map((item, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="mt-1 bg-blue-100 p-1 rounded-full h-fit">
                      <CheckCircle className="w-4 h-4 text-[#0055D4]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#002044]">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <img
                src="https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=800&auto=format&fit=crop"
                alt="Restaurant Service"
                className="rounded-2xl shadow-xl w-full object-cover h-[500px]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: Stock Control */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=800&auto=format&fit=crop"
                alt="Stock Control"
                className="rounded-2xl shadow-xl w-full object-cover h-[500px]"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="flex items-center gap-2 text-[#FF7A00] font-semibold mb-4">
                <Package className="w-5 h-5" />
                <span>INVENTORY CONTROL</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Maximize Profitability with Precision Stock Control.</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Stop losing hours to manual spreadsheets. Our intelligent inventory software gives you total control over your margins in just minutes a day.
              </p>
              <ul className="space-y-4">
                {[
                  { title: "Granular Ingredient Tracking", desc: "Manage your stock at the ingredient level for hyperaccurate food costing and waste reduction." },
                  { title: "Proactive Reordering", desc: "Stay ahead of the rush with automated purchase orders and lowstock alerts that ensure you never 86 a best-seller." },
                  { title: "Bottom-Line Protection", desc: "Prevent shrinkage and over-portioning with airtight stock oversight that turns data into profit." },
                  { title: "Multi-Site Oversight", desc: "Effortlessly sync and monitor inventory levels across every location from a single, centralized dashboard." }
                ].map((item, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="mt-1 bg-blue-100 p-1 rounded-full h-fit">
                      <TrendingUp className="w-4 h-4 text-[#0055D4]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#002044]">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4: Insights */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="order-2 lg:order-1"
            >
              <div className="flex items-center gap-2 text-[#FF7A00] font-semibold mb-4">
                <BarChart3 className="w-5 h-5" />
                <span>INTELLIGENT INSIGHTS</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Transform Data into Growth with Intelligent Insights.</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Turn your sales history into a roadmap for profit. Use advanced analytics to refine your menu and master your margins.
              </p>
              <ul className="space-y-4">
                {[
                  { title: "Custom Performance Dashboards", desc: "Visualize your success with tailored reports that highlight key trends at a glance." },
                  { title: "Menu Engineering", desc: "Identify your \"stars\" and \"dogs\" by tracking exactly which dishes drive revenue and which are taking up space." },
                  { title: "Margin Optimization", desc: "Analyze individual dish performance to adjust pricing or ingredients for maximum profitability." },
                  { title: "Waste & Variance Analysis", desc: "Compare actual vs. expected stock levels to pinpoint discrepancies and plan for high-volume periods." },
                  { title: "Seamless Accounting", desc: "Bridge the gap between front-of-house and finance with instant sync for Sage, Xero, and QuickBooks." }
                ].map((item, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="mt-1 bg-blue-100 p-1 rounded-full h-fit">
                      <CheckCircle className="w-4 h-4 text-[#0055D4]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#002044]">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
                alt="Data Insights"
                className="rounded-2xl shadow-xl w-full object-cover h-[500px]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Page Summary Section */}
      <section className="py-20 bg-[#002044] text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Everything you need to run a successful restaurant</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              From the kitchen to the customer, BloomSwift POS has you covered with powerful features designed for modern restaurants.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <MessageCircle />, title: "WhatsApp Integration", desc: "Send automated order updates and receipts directly to customers." },
              { icon: <Smartphone />, title: "Email Notifications", desc: "Keep customers informed about their booking status and special offers." },
              { icon: <Clock />, title: "Hourly Throughput", desc: "Identify your peak dinner rushes and weekend surges to optimize your kitchen schedule and front-of-house staffing." },
              { icon: <RefreshCw />, title: "Churn Rates", desc: "Monitor your loyalty program health by tracking regular customers vs. one-time visitors." },
              { icon: <Utensils />, title: "Ingredient Integration", desc: "Master your margins by syncing POS sales data with ingredient usage to monitor your exact cost-per-dish." },
              { icon: <WifiOff />, title: "Offline Mode", desc: "Keep the kitchen-to-table flow moving; your restaurant keeps taking payments even if the internet goes down." },
              { icon: <Server />, title: "24/7 Support", desc: "Get expert help whenever you need it—essential for businesses that stay open late." },
              { icon: <TrendingUp />, title: "Success Metrics", desc: "Set and hit clear growth targets, such as increasing your monthly loyalty members by 40% within your first 60 days." }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors border border-white/10"
              >
                <div className="mb-4 text-[#FF7A00]">{item.icon}</div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto bg-white p-12 rounded-[2.5rem] shadow-xl border border-gray-100"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-[#002044] mb-6">Ready to get started?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of restaurants using BloomSwift to grow their business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleRequestClick}
                className="bg-[#0055D4] hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-lg transform hover:-translate-y-1 text-lg"
              >
                Request Demo
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="bg-white text-[#002044] font-bold py-4 px-10 rounded-full border-2 border-[#002044] hover:bg-gray-50 transition-all duration-300 text-lg"
              >
                Contact Sales
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Restaurant;
