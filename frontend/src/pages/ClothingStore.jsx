import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Star, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const ClothingStore = () => {
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
    navigate(`/request-pos?service=${encodeURIComponent('Clothing Store POS')}`);
  };

  return (
    <div className="min-h-screen bg-white font-['Poppins']">
      {/* Hero Section */}
      <section className="relative bg-[#002044] text-white py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-white leading-tight mb-6">
              The perfect fit for your fashion business.
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Bloom Swift POS automates your inventory and powers lightning-fast sales, making it easier than ever to manage your shop and impress your style-conscious clientele.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="bg-[#FF7A00] hover:bg-[#e66e00] text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg transform hover:-translate-y-1"
                onClick={handleRequestClick}
              >
                Get Started
              </button>
              <Link to="/support-centre" className="text-white font-bold py-3 px-6 hover:underline">
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

            {/* Image 1: Woman shopping */}
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop"
              alt="Woman shopping for clothes"
              className="absolute top-0 right-1/3 w-72 h-96 object-cover rounded-2xl shadow-lg z-10 border-4 border-white"
            />

            {/* Image 2: Store interior */}
            <img
              src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=800&auto=format&fit=crop"
              alt="Clothing store interior"
              className="absolute top-24 right-0 w-72 h-96 object-cover rounded-2xl shadow-lg z-20 border-4 border-white"
            />
          </motion.div>
        </div>
      </div>
      </section>

      {/* Quick View Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Secure Permissions",
                desc: "Automatically prompt staff for manager approval on refunds or discounts, so you can stay secure without slowing down service."
              },
              {
                title: "Seamless Returns",
                desc: "Create customer profiles and let your guests enjoy service-first experiences by handling exchanges and returns instantly."
              },
              {
                title: "Smart Inventory",
                desc: "Monitor stock levels down to the size and color to stay stocked on your most in-demand trends and seasonal favorites."
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-[#002044] mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 1: Stock Management */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/Assets/Clothing store/blake-wisz-q3o_8MteFM0-unsplash.jpg"
                alt="Stock Management"
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#002044] mb-6">
                Take the stress out of stock management
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Keep your shelves stocked with seasonal favorites your customers love:
              </p>
              <ul className="space-y-4">
                {[
                  { title: "Reclaim Your Time", desc: "Spend less time counting boxes and more time selling with lightning-fast stocktakes." },
                  { title: "Data-Driven Buying", desc: "Use item-level tracking to know exactly what will sell next season." },
                  { title: "Low-Stock Protection", desc: "Stay one step ahead with instant notifications before you run out of bestsellers." },
                  { title: "Continuous Selling", desc: "Automatically generate purchase orders so you never have to say \"out of stock\" again." }
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

      {/* Section 2: Loyalty */}
      <div className="bg-[#002044] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Leverage data to stay in style with your customers
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Knowing what your customers love is the key to repeat business. Use dedicated retail insights to make loyalty feel effortless:
              </p>
              <ul className="space-y-4">
                {[
                  { title: "Instant Profiling", desc: "Seamlessly add new customers to your database during the sale." },
                  { title: "Data-Driven Marketing", desc: "Design high-impact campaigns based on real shopper behavior." },
                  { title: "Strategic Incentives", desc: "Build custom loyalty schemes and seasonal promotions in a few clicks." },
                  { title: "Professional Branding", desc: "Boost your brand's image with reusable loyalty cards and easy-to-manage store credit." }
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
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop"
                alt="Fashion Loyalty"
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Scale */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
                alt="Retail Analytics"
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#002044] mb-6">
                Scale your style with real-time retail intelligence
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Stay ahead of the trend cycle with powerful analytics that reveal exactly what your customers are craving.
              </p>
              <ul className="space-y-4">
                {[
                  { title: "Live Trend Tracking", desc: "Monitor sales and shopper behavior as it happens." },
                  { title: "Cloud-Powered Freedom", desc: "Access your business data securely from any device, anywhere in the world." },
                  { title: "Remote Management", desc: "Stay connected to your shop’s performance via mobile or tablet while you're on the move." },
                  { title: "Stress-Free Accounting", desc: "Sync seamlessly with Xero, Sage, or QuickBooks to automate your bookkeeping." }
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

      {/* Page Summary / Analytics */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#002044] mb-6">
              Master your data with high-level retail analytics
            </h2>
            <p className="text-lg text-gray-600">
              Gain a competitive edge by turning raw data into actionable insights.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="bg-green-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="text-[#00b67a]" size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#002044] mb-2">WhatsApp Integration</h3>
              <p className="text-gray-600">
                Send digital receipts and marketing updates directly to your customers' favorite app.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="text-[#0055D4]" size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#002044] mb-2">Email Notifications</h3>
              <p className="text-gray-600">
                Automate purchase confirmations and low-stock alerts to keep everything running smoothly.
              </p>
            </div>

            {[
              {
                title: "Peak Shopping Hours",
                desc: "Identify your peak weekend rushes and lunch hour surges to optimize your floor staffing."
              },
              {
                title: "Loyalty Health",
                desc: "Monitor your loyalty program health by tracking how many regulars are staying active versus those who haven't visited in a while."
              },
              {
                title: "Profit Margin Tracking",
                desc: "Master your margins by syncing POS sales data with purchase costs to monitor your exact profit-per-item."
              },
              {
                title: "Offline Reliability",
                desc: "Keep the checkout moving; your store keeps taking payments and processing orders even if the internet goes down."
              },
              {
                title: "24/7 Support",
                desc: "Get expert help whenever you need it—essential for businesses that stay open late and through the weekends."
              },
              {
                title: "Growth Targets",
                desc: "Set and hit clear growth targets, such as increasing your monthly loyalty sign-ups by 40% within your first 60 days."
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="bg-gray-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="text-[#002044]" size={24} />
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
            Join thousands of retailers growing their business with Bloom Swift POS.
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

export default ClothingStore;