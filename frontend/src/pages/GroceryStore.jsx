import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Star, CheckCircle, Clock, TrendingUp, Zap, ShieldCheck, BarChart3, WifiOff, Smartphone, RefreshCw, Server } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const GroceryStore = () => {
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
    navigate(`/request-pos?service=${encodeURIComponent('Grocery Store POS')}`);
  };

  return (
    <div className="min-h-screen bg-white font-['Poppins']">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 lg:pt-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-[#002044] leading-tight mb-6">
              Accelerate your checkout.
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Experience a convenience store POS that works as fast as you do. Take full control of your store with professional inventory tools and employee oversight—all in one lightning-fast interface.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="bg-[#0055D4] hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md transition-colors duration-200"
                onClick={handleRequestClick}
              >
                Request for POS
              </button>
              <Link to="/support-centre" className="text-[#0055D4] font-bold py-3 px-6 hover:underline">
                Talk to sales
              </Link>
            </div>
          </motion.div>

          {/* Right Images */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] hidden lg:block"
          >
            {/* Background Shape */}
            <div className="absolute top-1/4 right-0 w-3/4 h-3/4 bg-blue-50/50 rounded-tl-[100px] -z-10"></div>

            {/* Image 1: Grocery Shopping */}
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop"
              alt="Grocery Shopping"
              className="absolute top-0 right-1/3 w-72 h-96 object-cover rounded-2xl shadow-lg z-10 border-4 border-white"
            />

            {/* Image 2: Checkout */}
            <img
              src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=800&auto=format&fit=crop"
              alt="Grocery Checkout"
              className="absolute top-24 right-0 w-72 h-96 object-cover rounded-2xl shadow-lg z-20 border-4 border-white"
            />
          </motion.div>
        </div>
      </div>

      {/* Trustpilot Strip */}
      <div className="bg-[#002044] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center gap-4 text-white">
          <span className="text-xl font-medium underline">Excellent</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <div key={star} className="bg-[#00b67a] p-1 rounded-sm">
                <Star className="text-white fill-white" size={20} />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <Star className="text-[#00b67a] fill-[#00b67a]" size={24} />
            <span className="font-bold">Trustpilot</span>
          </div>
        </div>
      </div>

      {/* Quick View Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "Save time",
                desc: "Save up to 10 hours every month on business management and staff admin."
              },
              {
                icon: TrendingUp,
                title: "Efficient business",
                desc: "81% of shoppers research products online. Showcase your inventory online with be ahead of the curve"
              },
              {
                icon: Zap,
                title: "Quick transactions",
                desc: "Put a gloss onto your day. Save over 4 hours per month with integrated payment solutions."
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border-t-4 border-[#0055D4]">
                <div className="mb-4 text-[#0055D4]">
                  <item.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#002044] mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 1: Real-time inventory control */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?q=80&w=800&auto=format&fit=crop"
                alt="Real-time inventory"
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#002044] mb-6">
                Real-time inventory control for fast-moving grocery environments.
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Managing a diverse catalog shouldn't be a headache. Our intelligent POS provides minute-by-minute updates so your team is always in the loop.
              </p>
              <ul className="space-y-4">
                {[
                  { title: "Never Miss a Sale", desc: "Automated low-stock alerts and smart purchase orders keep your shelves full." },
                  { title: "Effortless Updates", desc: "Modify stock levels across your entire catalog in just a few clicks." },
                  { title: "Precision Labeling", desc: "Generate custom barcodes for faster scanning and improved data accuracy." },
                  { title: "Remote Visibility", desc: "Monitor your live inventory levels from anywhere, at any time." }
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-[#00b67a] mt-1 flex-shrink-0" size={20} />
                    <div>
                      <span className="font-bold text-[#002044]">{item.title}:</span>
                      <span className="text-gray-600 ml-2">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Smart POS software */}
      <div className="bg-[#002044] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Smart POS software designed to scale your grocery business.
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Take the guesswork out of retail. Our advanced payment solution doesn't just process sales—it collects the "smart data" you need to make informed, profitable decisions.
              </p>
              <ul className="space-y-4">
                {[
                  { title: "Spot Winning Products", desc: "Use advanced reporting to identify what’s driving your revenue." },
                  { title: "Instant Intelligence", desc: "Get a complete pulse check on your operations at the tap of a button." },
                  { title: "Forecast with Precision", desc: "Use past performance data to plan inventory and staffing for the months ahead." }
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-[#00b67a] mt-1 flex-shrink-0" size={20} />
                    <div>
                      <span className="font-bold text-white">{item.title}:</span>
                      <span className="text-gray-300 ml-2">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=800&auto=format&fit=crop"
                alt="Smart POS Data"
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Security */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop"
                alt="POS Security"
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#002044] mb-6">
                Fortify your grocery store with enterprise-grade POS security.
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Protect your bottom line with a cloud-based system that ensures every cent is accounted for. From data encryption to granular staff controls, we help you eliminate shrinkage and protect your sensitive information.
              </p>
              <ul className="space-y-4">
                {[
                  { title: "Granular User Permissions", desc: "Control who can perform refunds, voids, and discounts by setting custom access levels for trusted staff." },
                  { title: "Secure Staff Authentication", desc: "Maintain a clear audit trail with individual passcodes or swipe-card logins for every shift." },
                  { title: "Encrypted Cloud Access", desc: "Securely monitor your store’s financial health from any device, anywhere in the world." }
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ShieldCheck className="text-[#00b67a] mt-1 flex-shrink-0" size={20} />
                    <div>
                      <span className="font-bold text-[#002044]">{item.title}:</span>
                      <span className="text-gray-600 ml-2">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Waste to Profit */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#002044] mb-6">
                Turn potential waste into pure profit.
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Shrinkage and expired goods are a major drain on grocery margins. Our sophisticated pricing and tracking tools help you minimize losses and maximize your bottom line.
              </p>
              <ul className="space-y-4">
                {[
                  { title: "Instant Visibility", desc: "Know your exact stock levels in seconds with just a few clicks." },
                  { title: "Granular Precision", desc: "Track every single item—down to the smallest unit—with advanced inventory controls." },
                  { title: "Real-Time Syncing", desc: "Eliminate human error with stock levels that update automatically with every transaction." }
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-[#00b67a] mt-1 flex-shrink-0" size={20} />
                    <div>
                      <span className="font-bold text-[#002044]">{item.title}:</span>
                      <span className="text-gray-600 ml-2">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=800&auto=format&fit=crop"
                alt="Fresh Produce Waste Reduction"
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Page Summary / Analytics */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#002044] mb-6">
              Everything you need in one package
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: MessageCircle,
                title: "WhatsApp Integration",
                desc: "Send digital receipts and marketing updates directly to your customers' favorite app."
              },
              {
                icon: MessageCircle,
                title: "Email Notifications",
                desc: "Automate purchase confirmations and low-stock alerts to keep everything running smoothly."
              },
              {
                icon: BarChart3,
                title: "Hourly Throughput",
                desc: "Identify your peak morning rushes and weekend surges to optimize your baking schedule and front-of-house staffing."
              },
              {
                icon: RefreshCw,
                title: "Churn Rates",
                desc: "Monitor your loyalty program health by tracking how many regulars are staying active versus those who haven't visited in a while."
              },
              {
                icon: Server,
                title: "Inventory & Ingredient Integration",
                desc: "Master your margins by syncing POS sales data with ingredient usage to monitor your exact cost-per-pastry."
              },
              {
                icon: WifiOff,
                title: "Offline Mode",
                desc: "Keep the oven-to-counter flow moving; your bakery keeps taking payments and processing orders even if the internet goes down."
              },
              {
                icon: CheckCircle,
                title: "24/7 Support",
                desc: "Get expert help whenever you need it—essential for businesses that start pre-dawn and stay busy through the weekends."
              },
              {
                icon: Star,
                title: "Success Metrics",
                desc: "Set and hit clear growth targets, such as increasing your monthly bread subscription members by 40% within your first 60 days."
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="text-[#0055D4]" size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#002044] mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#002044] py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8">
            Ready to get started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of businesses growing with Bloom Swift POS.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="bg-[#00b67a] hover:bg-[#009f6b] text-white font-bold py-4 px-8 rounded-md transition-colors duration-200 text-lg"
              onClick={handleRequestClick}
            >
              Get Started Now
            </button>
            <Link to="/contact" className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-md transition-colors duration-200 text-lg backdrop-blur-sm">
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroceryStore;
