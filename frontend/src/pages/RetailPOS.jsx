import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Package, 
  TrendingUp, 
  BarChart3, 
  ShieldCheck, 
  Lock,
  DollarSign,
  Wifi,
  Clock,
  Headphones,
  Zap,
  Store,
  CreditCard
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const RetailPOS = () => {
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
    navigate(`/request-pos?service=${encodeURIComponent('Retail POS')}`);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="bg-gray-50 font-poppins text-[#002044]">
      {/* Hero Section */}
      <section className="relative bg-[#002044] text-white py-20 lg:py-28 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/Assets/retail/Hero section backgroud.jpg"
            alt="Retail Background"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002044]/95 via-[#002044]/85 to-[#002044]/75"></div>
        </div>

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
                Bloom Swift POS: The Ultimate Retail Command Center
              </h1>
              <div className="mb-6">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#FF7A00] mb-4">
                  Accelerate Your Growth
                </h2>
                <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
                  Experience a retail POS that works as fast as you do. Take full control of your storefront with professional inventory tools and comprehensive employee oversight—all integrated into one lightning-fast interface.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleRequestClick}
                  className="bg-[#FF7A00] hover:bg-[#e66e00] text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg transform hover:-translate-y-1 text-lg"
                >
                  Request for POS
                </button>
                <Link to="/support-centre" className="bg-transparent border-2 border-white hover:bg-white hover:text-[#002044] text-white font-bold py-4 px-8 rounded-full transition-all duration-300 text-lg text-center">
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
                src="/Assets/retail/hero section foreground.jpg"
                alt="Retail POS System"
                className="relative z-10 rounded-2xl shadow-2xl border-4 border-white/10 w-full max-w-md mx-auto transform rotate-2 hover:rotate-0 transition-transform duration-500"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick View Section - Efficiency at a Glance */}
      <section className="py-16 bg-white -mt-10 relative z-20 rounded-t-[3rem]">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Efficiency at a Glance</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Reclaim Your Time",
                desc: "Save up to 10 hours every month by automating business management and staff administration tasks.",
                icon: <Clock className="w-10 h-10 text-[#FF7A00]" />
              },
              {
                title: "Modern Commerce",
                desc: "With 81% of shoppers researching products online, our system helps you showcase your inventory digitally to stay ahead of the curve.",
                icon: <Store className="w-10 h-10 text-[#FF7A00]" />
              },
              {
                title: "Rapid Transactions",
                desc: "Enhance your customer experience and save over 4 hours per month with seamless, integrated payment solutions.",
                icon: <CreditCard className="w-10 h-10 text-[#FF7A00]" />
              }
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

      {/* Section 1: Intelligent Inventory Management */}
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
                src="/Assets/retail/Intelligent Inventory Management.jpg"
                alt="Intelligent Inventory Management"
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
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Intelligent Inventory Management</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Real-time control for fast-moving retail environments. Managing a diverse product catalog shouldn't be a headache. Our intelligent system provides minute-by-minute updates so your team is always informed.
              </p>
              <ul className="space-y-4">
                {[
                  { title: "Never Miss a Sale", desc: "Stay stocked with automated low-stock alerts and smart purchase orders." },
                  { title: "Effortless Catalog Updates", desc: "Modify stock levels across your entire store in just a few clicks." },
                  { title: "Precision Labeling", desc: "Generate custom barcodes for faster checkout scanning and improved data accuracy." },
                  { title: "Remote Visibility", desc: "Monitor live inventory levels from any device, anywhere, at any time." }
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

      {/* Section 2: Data-Driven Decisions */}
      <section className="py-20 bg-[#002044] text-white">
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
                <span>SMART ANALYTICS</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Data-Driven Decisions</h2>
              <p className="text-gray-300 mb-8 text-lg">
                Smart software designed to scale your business. Take the guesswork out of retail. Our advanced payment solution collects "smart data" to help you make informed, profitable decisions.
              </p>
              <ul className="space-y-4">
                {[
                  { title: "Spot Winning Products", desc: "Utilize advanced reporting to identify exactly which items are driving your revenue." },
                  { title: "Instant Intelligence", desc: "Get a complete pulse check on your daily operations at the tap of a button." },
                  { title: "Forecast with Precision", desc: "Use historical performance data to plan inventory and staffing for the months ahead." }
                ].map((item, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="mt-1 bg-white/10 p-1 rounded-full h-fit">
                      <CheckCircle className="w-4 h-4 text-[#FF7A00]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{item.title}</h4>
                      <p className="text-gray-300 text-sm">{item.desc}</p>
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
                src="/Assets/retail/Data-Driven Decisions.jpg"
                alt="Data-Driven Decisions"
                className="rounded-2xl shadow-xl w-full object-cover h-[500px]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: Enterprise-Grade Security */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="/Assets/retail/Enterprise-Grade Security.jpg"
                alt="Enterprise-Grade Security"
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
                <ShieldCheck className="w-5 h-5" />
                <span>SECURITY FIRST</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Enterprise-Grade Security</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Fortify your store and protect your bottom line. Our cloud-based system ensures every cent is accounted for, from advanced data encryption to granular staff controls.
              </p>
              <ul className="space-y-4">
                {[
                  { title: "Custom Permissions", desc: "Control sensitive actions like refunds, voids, and discounts by setting specific access levels for your staff." },
                  { title: "Secure Authentication", desc: "Maintain a clear audit trail with individual passcodes or swipe-card logins for every shift." },
                  { title: "Encrypted Cloud Access", desc: "Securely monitor your financial health from any device in the world." }
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

      {/* Section 4: Maximize Your Margins */}
      <section className="py-20 bg-gray-50">
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
                <DollarSign className="w-5 h-5" />
                <span>PROFIT OPTIMIZATION</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Maximize Your Margins</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Turn potential loss into pure profit. Eliminate the drain of shrinkage and inventory errors. Our sophisticated tracking tools help you minimize losses and maximize your bottom line.
              </p>
              <ul className="space-y-4">
                {[
                  { title: "Total Visibility", desc: "Know your exact stock levels in seconds." },
                  { title: "Granular Precision", desc: "Track every single item down to the smallest unit with advanced controls." },
                  { title: "Real-Time Syncing", desc: "Eliminate human error with stock levels that update automatically with every transaction." }
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
                src="/Assets/retail/Maximize Your Margins.jpg"
                alt="Maximize Your Margins"
                className="rounded-2xl shadow-xl w-full object-cover h-[500px]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 5: Advanced Connectivity & Support */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="/Assets/retail/Advanced Connectivity & Support.jpg"
                alt="Advanced Connectivity & Support"
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
                <Zap className="w-5 h-5" />
                <span>ALWAYS CONNECTED</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Advanced Connectivity & Support</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Stay operational and informed with enterprise-level features designed for modern retail.
              </p>
              <ul className="space-y-4">
                {[
                  { 
                    title: "Offline Mode", 
                    desc: "Keep the sales moving even if the internet goes down; our system continues to process orders without interruption.",
                    icon: <Wifi className="w-5 h-5 text-[#FF7A00]" />
                  },
                  { 
                    title: "Hourly Throughput", 
                    desc: "Identify peak shopping hours to optimize your staffing and floor coverage.",
                    icon: <TrendingUp className="w-5 h-5 text-[#FF7A00]" />
                  },
                  { 
                    title: "24/7 Expert Support", 
                    desc: "Get help whenever you need it—essential for retail businesses that operate early mornings through late weekends.",
                    icon: <Headphones className="w-5 h-5 text-[#FF7A00]" />
                  }
                ].map((item, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="mt-1 bg-orange-100 p-2 rounded-full h-fit">
                      {item.icon}
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

      {/* CTA Section */}
      <section className="py-20 bg-[#002044] text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">Ready to transform your retail business?</h2>
            <p className="text-lg text-gray-300 mb-8">
              Join thousands of retailers using Bloom Swift POS to accelerate their growth and maximize profits.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleRequestClick}
                className="bg-[#FF7A00] hover:bg-[#e66e00] text-white font-bold py-4 px-10 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Contact Bloom Tech Today
              </button>
              <Link to="/support-centre" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#002044] font-bold py-4 px-10 rounded-full transition-all duration-300 text-lg">
                Talk to Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default RetailPOS;
