import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Target, Zap, BarChart3, Users, TrendingUp } from 'lucide-react';

const AboutBloomSwiftPOS = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-white font-['Poppins']">
      {/* Hero Section */}
      <div className="bg-[#002044] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#FF7A00] mb-3">
              ABOUT US
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Empowering Sri Lankan Businesses
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              From our very first line of code to becoming a trusted partner for hundreds of merchants, 
              we're committed to transforming how businesses operate across Sri Lanka.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Section 1: Our Story */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <img
                src="/Assets/frabpos-team-aCkaR5G4Zd4-unsplash.jpg"
                alt="Bloom Swift POS in action"
                className="rounded-2xl shadow-xl w-full h-auto object-cover"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="flex items-center gap-2 text-[#FF7A00] font-semibold mb-4">
                <Target className="w-5 h-5" />
                <span className="uppercase tracking-wide text-sm">Our Story</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#002044] mb-6">
                From Solving Challenges to Building Solutions
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Bloom Swift POS was born out of a simple mission: to solve the everyday operational hurdles faced by small and growing businesses. From our very first line of code, we realized that merchants were spending too much time battling outdated technology and not enough time connecting with their customers.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We set out to change that by building a reliable, intuitive, and efficient POS ecosystem. What began as a focused idea to simplify checkout has grown into a comprehensive platform designed for the modern Sri Lankan entrepreneur.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Today, we empower businesses to manage sales, inventory, staff, and customer relationships seamlessly in one unified place.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section 2: Why Sri Lanka */}
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
              <div className="flex items-center gap-2 text-[#FF7A00] font-semibold mb-4">
                <Users className="w-5 h-5" />
                <span className="uppercase tracking-wide text-sm">Local Focus</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#002044] mb-6">
                Why Sri Lanka?
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At Bloom Swift POS, we understand the heartbeat of the local market—from the bustling streets of Colombo to the growing retail hubs across the island. We believe that Sri Lankan businesses deserve world-class technology tailored to their unique needs.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Whether you are a local boutique, a growing restaurant chain, or a neighborhood pharmacy, our platform is built to handle the complexities of your daily operations while providing the data-driven insights you need to scale.
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
                src="/Assets/korie-cull-IzIME1jwjCY-unsplash.jpg"
                alt="Sri Lankan retail business"
                className="rounded-2xl shadow-xl w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section 3: What We Bring */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <img
                src="/Assets/christiann-koepke-XersifI0JCk-unsplash.jpg"
                alt="Modern POS technology"
                className="rounded-2xl shadow-xl w-full h-auto object-cover"
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
                <span className="uppercase tracking-wide text-sm">Our Platform</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#002044] mb-6">
                What We Bring to Your Business
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We don't just offer software; we provide a foundation for growth. Our platform is continuously evolving to bring modern tools to businesses of every size:
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="shrink-0">
                    <div className="w-12 h-12 bg-[#002044] rounded-lg flex items-center justify-center">
                      <CheckCircle className="text-white w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#002044] mb-2">Reliability First</h3>
                    <p className="text-gray-600">
                      A system that works as hard as you do, ensuring your doors stay open and your sales keep moving.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0">
                    <div className="w-12 h-12 bg-[#002044] rounded-lg flex items-center justify-center">
                      <Target className="text-white w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#002044] mb-2">Simplicity by Design</h3>
                    <p className="text-gray-600">
                      Easy-to-use interfaces that reduce training time for your staff and minimize errors.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0">
                    <div className="w-12 h-12 bg-[#002044] rounded-lg flex items-center justify-center">
                      <Users className="text-white w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#002044] mb-2">Comprehensive Management</h3>
                    <p className="text-gray-600">
                      Total control over your inventory, employees, and customer loyalty programs from a single dashboard.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0">
                    <div className="w-12 h-12 bg-[#002044] rounded-lg flex items-center justify-center">
                      <BarChart3 className="text-white w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#002044] mb-2">Data-Driven Insights</h3>
                    <p className="text-gray-600">
                      Modern analytics that help you understand your best-selling products and busiest hours.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section 4: Our Vision */}
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
                <TrendingUp className="w-5 h-5" />
                <span className="uppercase tracking-wide text-sm">The Future</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Our Vision for the Future
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                As part of the Bloom Tech (PVT) LTD family, Bloom Swift POS is committed to leading the digital transformation of Sri Lanka's retail and hospitality sectors. We are more than a service provider—we are your partner in success.
              </p>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                As your business grows, we evolve alongside you, ensuring you always have the best tools to serve your customers and build your legacy.
              </p>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mt-8">
                <p className="text-xl font-bold text-white mb-2">
                  Join the hundreds of merchants who are blooming with Swift POS.
                </p>
                <p className="text-gray-300">
                  Ready to transform your business? Let's grow together.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="order-1 lg:order-2"
            >
              <img
                src="/Assets/simon-kadula--gkndM1GvSA-unsplash.jpg"
                alt="Growing business success"
                className="rounded-2xl shadow-xl w-full h-auto object-cover border-4 border-white/10"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutBloomSwiftPOS;
