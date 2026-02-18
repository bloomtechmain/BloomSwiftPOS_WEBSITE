import React from 'react';
import { motion } from 'framer-motion';
import { Gift, TrendingUp, Target, Heart, Settings, BarChart, Star, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Loyalty = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-white font-['Poppins']">
      {/* Hero Section */}
      <div className="relative text-white overflow-hidden">
        {/* Background Image - Faded */}
        <div className="absolute inset-0">
          <img 
            src="/Assets/Loyalty/hanny-naibaho-0YbeoQOX89k-unsplash.jpg" 
            alt="Loyalty Background" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#002044]/80 via-[#003366]/70 to-[#004080]/80"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 lg:pt-32 lg:pb-40">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-left"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                <Gift size={16} className="text-[#FF7A00]" />
                <span className="text-[#FF7A00] font-semibold tracking-wide text-sm uppercase">Membership system</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Loyalty Program
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
                Build lasting relationships and grow your bottom line with a fully customizable loyalty program that turns transactions into connections.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-[#FF7A00] hover:bg-[#E66E00] text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-orange-500/20">
                  Get Started
                </button>

              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              {/* Abstract decorative elements */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#FF7A00] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#0055D4] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"
                alt="Loyalty Program Dashboard"
                className="relative rounded-2xl shadow-2xl border border-white/10 z-10"
              />

              {/* Floating Cards */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl z-20 flex items-center gap-4 max-w-xs"
              >
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle className="text-green-600" size={24} />
                </div>
                <div>
                  <p className="text-[#002044] font-bold">Retention Rate</p>
                  <p className="text-green-600 font-bold">+45% Increase</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Three Quick View Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Gift,
                title: "Reward Your Customers",
                desc: "Foster long-term loyalty by awarding redeemable points for every purchase, giving customers a reason to choose you every time."
              },
              {
                icon: TrendingUp,
                title: "Maximize Revenue",
                desc: "Substantially increase your store’s earnings by driving repeat business through strategic rewards and exclusive special offers."
              },
              {
                icon: Target,
                title: "Targeted Advertising",
                desc: "Drive higher conversion rates with personalized ads tailored specifically to each customer’s unique purchase history."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-[#002044] rounded-lg flex items-center justify-center mb-6 text-white">
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#002044] mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 1: Cultivate Customer Loyalty */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <img
                src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200&auto=format&fit=crop"
                alt="Customer Loyalty"
                className="rounded-2xl shadow-xl w-full"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="flex items-center gap-2 text-[#0055D4] font-semibold mb-4">
                <Heart className="w-5 h-5" />
                <span>RETENTION</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#002044] mb-6">
                Cultivate Customer Loyalty
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Turn casual visitors into brand advocates. With our loyalty tools, you can offer meaningful rewards that make repeat shopping a no-brainer, ensuring your most frequent shoppers feel truly valued.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section 2: Complete Creative Control */}
      <div className="bg-[#002044] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="order-2 lg:order-1"
            >
              <div className="flex items-center gap-2 text-[#FF7A00] font-semibold mb-4">
                <Settings className="w-5 h-5" />
                <span>CUSTOMIZATION</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Complete Creative Control
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Tailor every aspect of your loyalty program to match your unique business goals. You define the point values, set the earning rules, and decide exactly when your customers unlock their rewards.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="order-1 lg:order-2"
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                alt="Creative Control"
                className="rounded-2xl shadow-xl w-full border-4 border-white/10"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section 3: Improve customer analytics */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
                alt="Customer Analytics"
                className="rounded-2xl shadow-xl w-full"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="flex items-center gap-2 text-[#0055D4] font-semibold mb-4">
                <BarChart className="w-5 h-5" />
                <span>INSIGHTS</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#002044] mb-6">
                Improve customer analytics
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Analyze shopper data on your Loyalty dashboard to understand what drives your customers. View how much shoppers spend, how many points they accrue, and how they like to redeem their rewards from a single POS system.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section 4: Scale Your Reputation */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="order-2 lg:order-1"
            >
              <div className="flex items-center gap-2 text-[#0055D4] font-semibold mb-4">
                <Star className="w-5 h-5" />
                <span>SOCIAL PROOF</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#002044] mb-6">
                Scale Your Reputation
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Automatically prompt customers for reviews to skyrocket your scores and showcase social proof. Turn feedback into fuel by analyzing customer sentiment to identify areas for improvement and growth.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="order-1 lg:order-2"
            >
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
                alt="Social Proof"
                className="rounded-2xl shadow-xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loyalty;
