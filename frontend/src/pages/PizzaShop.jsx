import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import {
  MessageCircle,
  Star,
  CheckCircle,
  Clock,
  TrendingUp,
  Zap,
  ShieldCheck,
  BarChart3,
  WifiOff,
  Smartphone,
  RefreshCw,
  Server,
  Utensils,
  Flame,
  ShoppingBag
} from 'lucide-react';

const PizzaShop = () => {
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
    navigate(`/request-pos?service=${encodeURIComponent('Pizza Shop POS')}`);
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
                Accelerate your service.
              </h1>
              <p className="text-lg lg:text-xl text-gray-300 mb-8 leading-relaxed">
                Experience a Pizza Shop POS that works as fast as you do. Take full control of your pizzeria with professional inventory tools and employee oversight—all in one lightning-fast interface.
              </p>
              <button
                onClick={handleRequestClick}
                className="bg-[#FF7A00] hover:bg-[#e66e00] text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg transform hover:-translate-y-1 text-lg"
              >
                Get Started
              </button>
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
                src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800&auto=format&fit=crop"
                alt="Pizza Shop POS"
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
              { title: "Save time", desc: "Save up to 10 hours every month on business management and staff admin.", icon: <Clock className="w-10 h-10 text-[#FF7A00]" /> },
              { title: "Efficient business", desc: "81% of customers check menus online. Showcase your pizzas online and be ahead of the curve.", icon: <TrendingUp className="w-10 h-10 text-[#FF7A00]" /> },
              { title: "Quick transactions", desc: "Put a gloss onto your day. Save over 4 hours per month with integrated payment solutions.", icon: <Zap className="w-10 h-10 text-[#FF7A00]" /> }
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

      {/* Section 1: Real-time inventory */}
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
                src="https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=800&auto=format&fit=crop"
                alt="Pizza Inventory"
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
                <CheckCircle className="w-5 h-5" />
                <span>INVENTORY CONTROL</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Real-time inventory control for fast-moving pizzerias.</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Managing complex toppings and dough shouldn't be a headache. Our intelligent POS provides minute-by-minute updates so your kitchen is always in the loop.
              </p>
              <ul className="space-y-4">
                {[
                  { title: "Never Miss an Order", desc: "Automated low-stock alerts for cheese, flour, and toppings keep your kitchen stocked." },
                  { title: "Effortless Updates", desc: "Modify menu availability across all platforms in just a few clicks." },
                  { title: "Precision Tracking", desc: "Track ingredient usage per pizza for improved cost accuracy." },
                  { title: "Remote Visibility", desc: "Monitor your live inventory levels from anywhere, at any time." }
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

      {/* Section 2: Smart POS */}
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
                <span>SMART ANALYTICS</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Smart POS software designed to scale your pizza business.</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Take the guesswork out of food service. Our advanced payment solution doesn't just process sales—it collects the "smart data" you need to make informed, profitable decisions.
              </p>
              <ul className="space-y-4">
                {[
                  { title: "Spot Winning Pizzas", desc: "Use advanced reporting to identify your best-selling pies and combos." },
                  { title: "Instant Intelligence", desc: "Get a complete pulse check on your delivery and dine-in operations at the tap of a button." },
                  { title: "Forecast with Precision", desc: "Use past performance data to plan dough prep and staffing for the weekend rush." }
                ].map((item, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="mt-1 bg-blue-100 p-1 rounded-full h-fit">
                      <Star className="w-4 h-4 text-[#0055D4]" />
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
                src="/Assets/Pizza/christiann-koepke-dQyS2pMYtok-unsplash.jpg"
                alt="Smart Pizza Analytics"
                className="rounded-2xl shadow-xl w-full object-cover h-[500px]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: Security */}
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
                src="/Assets/Pizza/wonderlane-a9632QgPKQM-unsplash.jpg"
                alt="Secure POS"
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
                <span>ENTERPRISE SECURITY</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Fortify your pizza shop with enterprise-grade security.</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Protect your bottom line with a cloud-based system that ensures every cent is accounted for. From data encryption to granular staff controls, we help you eliminate shrinkage and protect your sensitive information.
              </p>
              <ul className="space-y-4">
                {[
                  { title: "Granular User Permissions", desc: "Control who can perform voids, comps, and discounts by setting custom access levels." },
                  { title: "Secure Staff Authentication", desc: "Maintain a clear audit trail with individual passcodes for every shift." },
                  { title: "Encrypted Cloud Access", desc: "Securely monitor your shop's financial health from any device, anywhere in the world." }
                ].map((item, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="mt-1 bg-blue-100 p-1 rounded-full h-fit">
                      <ShieldCheck className="w-4 h-4 text-[#0055D4]" />
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

      {/* Section 4: Waste to Profit */}
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
                <RefreshCw className="w-5 h-5" />
                <span>WASTE MANAGEMENT</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Turn potential waste into pure profit.</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Food waste and mistakes are a major drain on pizzeria margins. Our sophisticated tracking tools help you minimize losses and maximize your bottom line.
              </p>
              <ul className="space-y-4">
                {[
                  { title: "Instant Visibility", desc: "Know your exact ingredient levels in seconds with just a few clicks." },
                  { title: "Granular Precision", desc: "Track every single item—from pepperoni slices to flour sacks—with advanced inventory controls." },
                  { title: "Real-Time Syncing", desc: "Eliminate human error with stock levels that update automatically with every order." }
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
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <img
                src="https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?q=80&w=800&auto=format&fit=crop"
                alt="Waste Management"
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
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Everything you need to run a successful pizza shop</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              From the kitchen to the customer, BloomSwift POS has you covered with powerful features designed for modern pizzerias.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <MessageCircle />, title: "WhatsApp Integration", desc: "Send automated order updates and receipts directly to customers." },
              { icon: <Smartphone />, title: "Email Notifications", desc: "Keep customers informed about their delivery status and special offers." },
              { icon: <Clock />, title: "Hourly Throughput", desc: "Identify your peak dinner rushes and weekend surges to optimize your oven schedule and staffing." },
              { icon: <RefreshCw />, title: "Churn Rates", desc: "Monitor your loyalty program health by tracking regular customers vs. one-time visitors." },
              { icon: <Utensils />, title: "Ingredient Integration", desc: "Master your margins by syncing POS sales data with ingredient usage to monitor your exact cost-per-pizza." },
              { icon: <WifiOff />, title: "Offline Mode", desc: "Keep the oven-to-counter flow moving; your shop keeps taking payments even if the internet goes down." },
              { icon: <Server />, title: "24/7 Support", desc: "Get expert help whenever you need it—essential for businesses that stay open late." },
              { icon: <TrendingUp />, title: "Success Metrics", desc: "Set and hit clear growth targets, such as increasing your monthly pizza subscription members by 40%." }
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
              Join thousands of pizzerias using BloomSwift to grow their business.
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

export default PizzaShop;
