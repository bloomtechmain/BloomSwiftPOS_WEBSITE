import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, FileText, Zap, Globe, Smartphone, Heart, Share2, MessageSquare } from 'lucide-react';

const WhatsApp = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="bg-white min-h-screen font-['Poppins']">
      {/* Hero Section */}
      <div className="relative text-white overflow-hidden" style={{
        backgroundImage: "url('/Assets/Whatsapp/lonely-blue-z3jCMSm4Rrc-unsplash.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}>
        {/* Background Overlay for opacity control */}
        <div className="absolute inset-0 bg-[#002044] opacity-40"></div>
        {/* Background Elements */}
        <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-[#25D366]/20 blur-3xl" />
        <div className="absolute -left-24 -top-24 w-72 h-72 rounded-full bg-[#0055D4]/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 lg:pt-32 lg:pb-40">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-left"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                <MessageCircle size={16} className="text-[#25D366]" />
                <span className="text-[#25D366] font-semibold tracking-wide text-sm uppercase">WhatsApp Messaging</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Receipts that meet your customers where they are.
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
                Enhance the checkout experience by sending beautiful, detailed invoices straight to WhatsApp the moment a sale is finalized.
              </p>

            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <img
                src="/Assets/Whatsapp/nathana-reboucas-KnDM23QuRMI-unsplash.jpg"
                alt="WhatsApp Integration"
                className="relative rounded-2xl shadow-2xl border border-white/10 z-10 w-full max-w-md mx-auto"
              />

              {/* Floating Card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl z-20 flex items-center gap-4 max-w-xs"
              >
                <div className="bg-green-100 p-3 rounded-full">
                  <MessageCircle className="text-[#25D366]" size={24} />
                </div>
                <div>
                  <p className="text-[#002044] font-bold">Message Sent</p>
                  <p className="text-green-600 font-bold">Instant Delivery</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Three Quick View Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Smartphone,
                title: "Seamless Customer Convenience",
                desc: "Forget lost paper receipts and cluttered wallets. By delivering invoices directly to WhatsApp, you provide customers with a permanent, searchable digital record of their purchase that they can access anytime, anywhere, without needing to check their email."
              },
              {
                icon: Globe,
                title: "Modern Brand Engagement",
                desc: "Turn a simple transaction into a lasting connection. Sending a digital invoice allows you to leave a professional, branded impression in your customer’s chat history, making it effortless for them to reach back out, reorder, or refer your business to others with a single tap."
              },
              {
                icon: Zap,
                title: "Operational Efficiency & Sustainability",
                desc: "Streamline your checkout process while cutting costs. Digital invoicing eliminates the need for expensive thermal paper and printers, reducing both your overhead and your environmental impact while ensuring receipts are delivered instantly and accurately every time."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all border-t-4 border-[#25D366]"
              >
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-6 text-[#25D366]">
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#002044] mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 1: Personalized Rewards */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="inline-flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full mb-6">
                <Heart size={14} className="text-[#0055D4]" />
                <span className="text-[#0055D4] font-bold text-xs uppercase tracking-wider">LOYALTY</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#002044] mb-6">
                Personalized Rewards, Delivered Instantly
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Turn casual visitors into brand advocates by meeting them where they already are. Our loyalty tools integrate seamlessly with WhatsApp, ensuring your most frequent shoppers feel valued with meaningful rewards sent straight to their favorite app.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl transform rotate-2"></div>
              <img
                src="/Assets/Whatsapp/my-profit-tutor-8CL8KDg8oAs-unsplash.jpg"
                alt="Personalized Rewards"
                className="relative rounded-xl shadow-xl w-full transform -rotate-2 hover:rotate-0 transition-transform duration-500"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section 2: Meet your customers where they already are */}
      <div className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#002044] mb-6">
              Meet your customers where they already are.
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              By integrating your POS system with WhatsApp, you replace fragile paper receipts with a modern, eco-friendly experience. Our platform automatically sends professional, searchable invoices and personalized rewards directly to your customers' favorite messaging app.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Instant Digital Records",
                desc: "Eliminate the hassle of lost paper receipts and cluttered wallets by providing customers with a permanent, searchable digital record delivered straight to their phones."
              },
              {
                title: "Frictionless Accessibility",
                desc: "Give your customers the freedom to access their transaction history anytime and anywhere, without the need to dig through an overflowing email inbox."
              },
              {
                title: "Personalized Loyalty",
                desc: "Turn every transaction into a relationship by sending meaningful rewards and updates directly through WhatsApp, making repeat shopping an effortless choice."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
              >
                <h3 className="text-xl font-bold text-[#002044] mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 3: Seamless WhatsApp POS Integration */}
      <div className="py-24 bg-[#002044] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="order-2 lg:order-1"
            >
              <img
                src="/Assets/Whatsapp/sumup-IIcjlBm610M-unsplash.jpg"
                alt="POS Integration"
                className="rounded-2xl shadow-2xl border-4 border-white/10"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="order-1 lg:order-2"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full mb-6 border border-white/20">
                <Share2 size={14} className="text-[#25D366]" />
                <span className="text-[#25D366] font-bold text-xs uppercase tracking-wider">INTEGRATION</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Seamless WhatsApp POS Integration
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Transform your point-of-sale from a final transaction into an ongoing relationship. By delivering automated digital invoices directly to WhatsApp, you place your brand where your customers spend their time.
              </p>
              <div className="space-y-6">
                {[
                  {
                    title: "Build Lasting Brand Recall",
                    desc: "Move beyond paper receipts by leaving a high-quality, branded digital footprint in your customer’s most-used chat app."
                  },
                  {
                    title: "Drive Frictionless Reorders",
                    desc: "Empower customers to ask questions, request support, or reorder products instantly through their existing chat history."
                  },
                  {
                    title: "Simplify Word-of-Mouth",
                    desc: "Make your business inherently \"shareable\" by allowing customers to forward your contact details and invoices to friends and family with a single click."
                  }
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="mt-1 bg-white/10 p-2 rounded-lg h-fit">
                      <MessageSquare size={20} className="text-[#25D366]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">{item.title}</h4>
                      <p className="text-gray-400 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsApp;
