import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Hotel as HotelIcon, 
  TrendingUp, 
  BarChart3, 
  ShieldCheck,
  DollarSign,
  Wifi,
  Clock,
  Headphones,
  Zap,
  Bed,
  CreditCard
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const Hotel = () => {
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
    navigate(`/request-pos?service=${encodeURIComponent('Hotel POS')}`);
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
            src="/Assets/Hotel/hero section background.jpg"
            alt="Hotel Background"
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
                The Premier Hospitality Management Suite
              </h1>
              <div className="mb-6">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#FF7A00] mb-4">
                  Elevate Your Guest Experience
                </h2>
                <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
                  Transform your hotel operations with a comprehensive POS system designed for modern hospitality. Streamline front desk operations, manage amenities effortlessly, and deliver exceptional guest experiences that drive loyalty and revenue.
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
                src="/Assets/Hotel/hero section frontend.jpg"
                alt="Hotel POS System"
                className="relative z-10 rounded-2xl shadow-2xl border-4 border-white/10 w-full max-w-md mx-auto transform rotate-2 hover:rotate-0 transition-transform duration-500"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick View Section - Operational Efficiency at a Glance */}
      <section className="py-16 bg-white -mt-10 relative z-20 rounded-t-[3rem]">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Operational Efficiency at a Glance</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Streamlined Operations",
                desc: "Save up to 15 hours every month by automating check-in/check-out, housekeeping coordination, and guest service management.",
                icon: <Clock className="w-10 h-10 text-[#FF7A00]" />
              },
              {
                title: "Enhanced Guest Services",
                desc: "Modern guests expect seamless digital experiences. Our system helps you manage bookings, amenities, and special requests in real-time.",
                icon: <HotelIcon className="w-10 h-10 text-[#FF7A00]" />
              },
              {
                title: "Integrated Payments",
                desc: "Process room charges, minibar purchases, and amenity fees instantly with our unified payment system that saves hours in reconciliation.",
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

      {/* Section 1: Intelligent Property & Amenity Management */}
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
                src="/Assets/Hotel/ Intelligent Property & Amenity Management.jpg"
                alt="Intelligent Property & Amenity Management"
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
                <Bed className="w-5 h-5" />
                <span>PROPERTY MANAGEMENT</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Intelligent Property & Amenity Management</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Complete control for dynamic hospitality environments. Managing rooms, amenities, and guest services shouldn't be complicated. Our intelligent system provides real-time updates across all departments.
              </p>
              <ul className="space-y-4">
                {[
                  { title: "Smart Room Management", desc: "Track room status, housekeeping progress, and maintenance requests in real-time with automated notifications." },
                  { title: "Amenity Inventory Control", desc: "Monitor minibar stock, linens, toiletries, and supplies with automatic reordering alerts." },
                  { title: "Guest Preference Tracking", desc: "Store and recall guest preferences for personalized service that builds loyalty and drives repeat bookings." },
                  { title: "Multi-Property Dashboard", desc: "Manage multiple locations from a single interface with consolidated reporting and oversight." }
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

      {/* Section 2: Data-Driven Hospitality Decisions */}
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
                <span>HOSPITALITY ANALYTICS</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Data-Driven Hospitality Decisions</h2>
              <p className="text-gray-300 mb-8 text-lg">
                Intelligent insights designed to maximize occupancy and revenue. Take the guesswork out of hotel management with comprehensive analytics that reveal guest patterns, revenue opportunities, and operational efficiencies.
              </p>
              <ul className="space-y-4">
                {[
                  { title: "Occupancy Intelligence", desc: "Track room utilization patterns and identify peak seasons to optimize pricing strategies and staffing levels." },
                  { title: "Revenue Performance", desc: "Monitor ADR (Average Daily Rate), RevPAR, and ancillary revenue streams in real-time dashboards." },
                  { title: "Guest Behavior Analytics", desc: "Understand booking patterns, service preferences, and spending habits to create targeted upsell opportunities." }
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
                src="/Assets/Hotel/Data-Driven Hospitality Decisions.jpg"
                alt="Data-Driven Hospitality Decisions"
                className="rounded-2xl shadow-xl w-full object-cover h-[500px]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: Enterprise-Grade Hospitality Security */}
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
                src="/Assets/Hotel/Enterprise-Grade Hospitality Security.jpg"
                alt="Enterprise-Grade Hospitality Security"
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
                <span>SECURITY & COMPLIANCE</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Enterprise-Grade Hospitality Security</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Protect your property and guest data with confidence. Our PCI-compliant system ensures every transaction is secure, guest information is protected, and your staff has appropriate access controls.
              </p>
              <ul className="space-y-4">
                {[
                  { title: "Role-Based Access Control", desc: "Set granular permissions for front desk, housekeeping, management, and accounting teams to protect sensitive operations." },
                  { title: "Guest Data Protection", desc: "Bank-level encryption safeguards payment information, personal details, and booking history in compliance with privacy regulations." },
                  { title: "Audit Trail & Reporting", desc: "Track every transaction, modification, and access point with detailed logs for complete operational transparency." }
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

      {/* Section 4: Maximize Your RevPAR */}
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
                <TrendingUp className="w-5 h-5" />
                <span>REVENUE OPTIMIZATION</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Maximize Your RevPAR</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Turn every guest interaction into revenue opportunity. Our system helps you optimize pricing, reduce no-shows, and increase ancillary revenue through intelligent upselling and cross-selling features.
              </p>
              <ul className="space-y-4">
                {[
                  { title: "Dynamic Pricing Intelligence", desc: "Adjust room rates based on demand, seasonality, and competitor analysis to maximize revenue per available room." },
                  { title: "Ancillary Revenue Tracking", desc: "Monitor spa bookings, restaurant charges, minibar sales, and other services to identify growth opportunities." },
                  { title: "Automated Upselling", desc: "Present room upgrades and amenity packages at optimal touchpoints throughout the guest journey." }
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
                src="/Assets/Hotel/Maximize Your RevPAR.jpg"
                alt="Maximize Your RevPAR"
                className="rounded-2xl shadow-xl w-full object-cover h-[500px]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 5: Advanced Connectivity & Global Support */}
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
                src="/Assets/Hotel/Advanced Connectivity & Global Support.jpg"
                alt="Advanced Connectivity & Global Support"
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
                <span>ALWAYS OPERATIONAL</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Advanced Connectivity & Global Support</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Keep your hotel running smoothly with enterprise-grade infrastructure and round-the-clock support designed for the hospitality industry.
              </p>
              <ul className="space-y-4">
                {[
                  { 
                    title: "Offline Resilience", 
                    desc: "Continue processing check-ins, checkouts, and guest charges even during internet outages with automatic sync when connection is restored.",
                    icon: <Wifi className="w-5 h-5 text-[#FF7A00]" />
                  },
                  { 
                    title: "24/7/365 Support", 
                    desc: "Access expert hospitality support any time, day or night—because guest experiences can't wait for business hours.",
                    icon: <Headphones className="w-5 h-5 text-[#FF7A00]" />
                  },
                  { 
                    title: "Global Accessibility", 
                    desc: "Manage your property from anywhere in the world with secure cloud access and real-time synchronization across all devices.",
                    icon: <Clock className="w-5 h-5 text-[#FF7A00]" />
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
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">Ready to transform your hotel business?</h2>
            <p className="text-lg text-gray-300 mb-8">
              Join leading hotels using Bloom Swift POS to elevate guest experiences, streamline operations, and maximize revenue.
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

export default Hotel;
