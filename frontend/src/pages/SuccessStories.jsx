import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Users, CheckCircle, Award, BarChart3 } from 'lucide-react';
import ContactSalesModal from '../Components/ContactSalesModal';

const SuccessStories = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-white font-['Poppins']">
      {/* Section 1: Hero Section */}
      <div className="bg-[#002044] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#FF7A00] mb-3">
                SUCCESS STORIES
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                Real Growth, Real Results
              </h1>
              <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-[#FF7A00]">
                Empowering Sri Lankan Businesses to Bloom
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                At Bloom Swift POS, our success is measured by the growth of the merchants we serve. 
                From streamlining kitchen operations to managing complex memberships, see how businesses 
                across the island are using our technology to scale.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <img
                src="/Assets/Success Stories/chris-liverani-9cd8qOgeNIY-unsplash.jpg"
                alt="Sri Lankan business success"
                className="rounded-2xl shadow-xl w-full h-auto object-cover border-4 border-white/10"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section 2: Featured Stories */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#FF7A00] mb-3">
              CASE STUDIES
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#002044] mb-4">
              Featured Stories
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Story 1: Scaling the Flavor */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <div className="h-56 w-full overflow-hidden">
                <img
                  src="/Assets/Pizza/christiann-koepke-dQyS2pMYtok-unsplash.jpg"
                  alt="Restaurant kitchen operations"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-[#0055D4] mb-3">
                  <Target className="w-5 h-5" />
                  <h3 className="text-xl font-bold">Scaling the Flavor</h3>
                </div>
                
                <div className="space-y-4 text-gray-600">
                  <div>
                    <p className="font-semibold text-[#002044] mb-1">The Challenge:</p>
                    <p className="text-sm leading-relaxed">
                      As a fast-paced, multi-location food chain, needed a way to sync kitchen orders 
                      with front-of-house sales while maintaining speed during peak hours.
                    </p>
                  </div>
                  
                  <div>
                    <p className="font-semibold text-[#002044] mb-1">The Solution:</p>
                    <p className="text-sm leading-relaxed">
                      We implemented a comprehensive Restaurant Management System that bridged the gap 
                      between the grill and the register.
                    </p>
                  </div>
                  
                  <div>
                    <p className="font-semibold text-[#002044] mb-1">The Result:</p>
                    <p className="text-sm leading-relaxed">
                      Reduced wait times by <span className="font-bold text-[#FF7A00]">20%</span> and 
                      gained real-time inventory tracking across all branches, ensuring they never run 
                      out of the ingredients their customers love.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Story 2: Sarath Communications */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <div className="h-56 w-full overflow-hidden">
                <img
                  src="/Assets/Clothing store/blake-wisz-q3o_8MteFM0-unsplash.jpg"
                  alt="Retail electronics store"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-[#0055D4] mb-3">
                  <BarChart3 className="w-5 h-5" />
                  <h3 className="text-xl font-bold">Sarath Communications</h3>
                </div>
                <p className="text-sm font-semibold text-[#D6005D] mb-3">Beyond the Counter</p>
                
                <div className="space-y-4 text-gray-600">
                  <div>
                    <p className="font-semibold text-[#002044] mb-1">The Challenge:</p>
                    <p className="text-sm leading-relaxed">
                      Managing a diverse inventory of electronics alongside complex payroll and 
                      financial reporting was becoming a manual bottleneck.
                    </p>
                  </div>
                  
                  <div>
                    <p className="font-semibold text-[#002044] mb-1">The Solution:</p>
                    <p className="text-sm leading-relaxed">
                      Bloom Swift deployed an Integrated Business Management System that combined 
                      sales, salary management, and deep financial reporting into one dashboard.
                    </p>
                  </div>
                  
                  <div>
                    <p className="font-semibold text-[#002044] mb-1">The Record:</p>
                    <p className="text-sm leading-relaxed">
                      Sarath Communications now saves over <span className="font-bold text-[#FF7A00]">10 hours a week</span> on 
                      administrative tasks, allowing the leadership to focus on expanding their product lines.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Story 3: Premium Golf Club */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <div className="h-56 w-full overflow-hidden">
                <img
                  src="/Assets/simon-kadula--gkndM1GvSA-unsplash.jpg"
                  alt="Premium golf club facility"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-[#0055D4] mb-3">
                  <Award className="w-5 h-5" />
                  <h3 className="text-xl font-bold">Premium Golf Club</h3>
                </div>
                <p className="text-sm font-semibold text-[#D6005D] mb-3">Modernizing Tradition</p>
                
                <div className="space-y-4 text-gray-600">
                  <div>
                    <p className="font-semibold text-[#002044] mb-1">The Challenge:</p>
                    <p className="text-sm leading-relaxed">
                      A prestigious institution required a sophisticated way to manage high-end 
                      memberships, facility bookings, and on-site pro-shop sales.
                    </p>
                  </div>
                  
                  <div>
                    <p className="font-semibold text-[#002044] mb-1">The Solution:</p>
                    <p className="text-sm leading-relaxed">
                      A custom Cloud-Based ERP System tailored for the unique needs of a sports club, 
                      integrating HR, Finance, and POS.
                    </p>
                  </div>
                  
                  <div>
                    <p className="font-semibold text-[#002044] mb-1">The Result:</p>
                    <p className="text-sm leading-relaxed">
                      A seamless experience for members and a "birds-eye view" for management, with 
                      all financial and member data accessible securely from anywhere in the world.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section 3: What Our Partners Are Saying */}
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
                <span className="uppercase tracking-wide text-sm">Testimonials</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#002044] mb-6">
                What Our Partners Are Saying
              </h2>
              
              <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-[#FF7A00]">
                <div className="mb-4">
                  <svg className="w-10 h-10 text-[#FF7A00] opacity-50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6 italic">
                  "Switching to Bloom Swift was the best decision for our expansion. The data-driven 
                  insights allowed us to see exactly where our waste was happening, and the local 
                  support team understands our business environment perfectly."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#002044] to-[#0055D4] rounded-full flex items-center justify-center text-white font-bold">
                    M
                  </div>
                  <div>
                    <p className="font-semibold text-[#002044]">Merchant Partner</p>
                    <p className="text-sm text-gray-500">Multi-location Business Owner</p>
                  </div>
                </div>
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
                src="/Assets/Success Stories/nik-z1d-LP8sjuI-unsplash.jpg"
                alt="Happy business owner"
                className="rounded-2xl shadow-xl w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section 4: Ready to write your success story? */}
      <div className="bg-[#002044] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <img
                src="/Assets/Success Stories/joshua-earle-9idqIGrLuTE-unsplash.jpg"
                alt="Start your success journey"
                className="rounded-2xl shadow-xl w-full h-auto object-cover border-4 border-white/10"
              />
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="flex items-center gap-2 text-[#FF7A00] font-semibold mb-4">
                <TrendingUp className="w-5 h-5" />
                <span className="uppercase tracking-wide text-sm">Get Started</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Ready to write your success story?
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Every business is unique, and we're here to help yours reach its full potential. 
                Join the Bloom Swift family today.
              </p>
              
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="bg-[#FF7A00] text-white font-bold px-8 py-4 rounded-lg hover:bg-[#e56d00] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
              >
                <span>Contact Sales</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Contact Sales Modal */}
      <ContactSalesModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
};

export default SuccessStories;
