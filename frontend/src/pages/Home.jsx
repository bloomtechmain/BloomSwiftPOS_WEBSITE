import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import LazyImage from '../Components/LazyImage';

const Home = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const navigate = useNavigate();
  const toast = useToast();

  const handleGetStartedClick = () => {
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

    navigate('/request-pos');
  };

  const faqData = [
    {
      question: "What is Bloom Swift POS?",
      answer: (
        <>
          <p className="mb-4">Bloom Swift POS is an integrated Electronic Point of Sale system that combines specialized hardware (like a touchscreen terminal) with intuitive software to streamline your business operations.</p>
          <p>While a traditional cash register simply logs transactions, Bloom Swift POS goes a step further. It captures every detail of your sales data and transforms it into comprehensive reports, giving you the insights needed to manage your business more efficiently.</p>
        </>
      )
    },
    {
      question: "Choosing the Ideal Bloom Swift POS System for your needs?",
      answer: (
        <>
          <p className="mb-4">The best Bloom Swift POS system is one that is specifically tailored to your industry and unique operational needs. Rather than a one-size-fits-all approach, the ideal setup provides the exact tools required to scale your business—such as customizable analytics, real-time inventory tracking, and seamless app integrations.</p>
          <p className="mb-4">For example, specialized configurations are available to meet the demands of different sectors:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Retail & Hospitality:</strong> Can include integrated scales, kitchen display systems (KDS), and handheld ordering devices.</li>
            <li><strong>Service Industries (like Nail Salons):</strong> Focuses on appointment scheduling and client management.</li>
            <li><strong>Hotel Dining:</strong> Features support for room service syncing and custom seating charts.</li>
          </ul>
        </>
      )
    },
    {
      question: "whats the power of Bloom Swift POS?",
      answer: (
        <>
          <p className="mb-4">More than just a tool for processing transactions, Bloom Swift POS serves as the central nervous system of your business. Unlike basic cash registers, it automates and integrates multiple core operations into one seamless interface:</p>
          <ul className="space-y-3">
            <li><strong>Inventory & Sales:</strong> Track stock levels in real-time and generate deep-dive sales reports.</li>
            <li><strong>Operational Control:</strong> Manage staff schedules and permissions with ease.</li>
            <li><strong>Customer Engagement:</strong> Use built-in CRM tools and barcoding to speed up service and build loyalty.</li>
            <li><strong>Unified Payments:</strong> Process transactions securely while syncing all data instantly to your backend.</li>
          </ul>
        </>
      )
    },
    {
      question: "How does Bloom Swift POS Operates?",
      answer: (
        <>
          <p className="mb-4">Bloom Swift POS works by integrating directly into your existing workflow, utilizing either a secure cloud-based internet connection or a dedicated local host. As you process transactions, the system automatically captures and organizes your data in real-time.</p>
          <p className="mb-3">By centralizing this information in a secure environment, Bloom Swift POS allows you to:</p>
          <ul className="space-y-3">
            <li><strong>Access Insights Instantly:</strong> Retrieve data from anywhere to generate detailed performance reports.</li>
            <li><strong>Enhance Customer Service:</strong> Use stored history to assist customers quickly and accurately.</li>
            <li><strong>Sync Operations:</strong> Ensure your front-end sales and back-end records are always perfectly aligned.</li>
          </ul>
        </>
      )
    },
    {
      question: "Bloom Swift POS Pricing",
      answer: (
        <>
          <p className="mb-4">The investment for a Bloom Swift POS system is flexible, as it is tailored to the specific scale and complexity of your business. Because every setup—from hardware configurations to specialized software modules—is unique, we provide customized pricing to ensure you only pay for the features you need.</p>
          <p>For a solution that includes custom app integrations or specific hardware bundles, please contact us directly for a personalized quote. Our team will help you build a package that aligns with your budget and growth goals.</p>
        </>
      )
    }
  ];

  return (
    <div className="font-poppins">
      {/* Hero Section */}
      <div className="relative min-h-screen bg-[#002044] overflow-hidden flex flex-col justify-center">
        {/* Background Image Overlay - Using img for better LCP */}
        <div className="absolute inset-0 z-0 w-full h-full opacity-20">
          <LazyImage
            src="/Assets/blake-wisz-tE6th1h6Bfk-unsplash.jpg"
            alt="POS Background"
            className="w-full h-full object-cover"
            priority={true}
            sizes="100vw"
            width="1920"
            height="1080"
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12 lg:mb-0"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                The Complete <span className="text-[#FF7A00]">Bloom Swift POS Solution</span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-lg">
                Simplify your sales, track your stock, and grow your business faster.
                Get everything you need to sell faster, serve better, and grow stronger with our all-in-one Bloom Swift POS solution.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-[#FF7A00] text-white font-bold rounded-lg shadow-lg hover:bg-[#e66e00] transition-colors duration-300 flex items-center justify-center gap-2"
                  onClick={handleGetStartedClick}
                >
                  Get Started
                  <ArrowRight size={20} />
                </motion.button>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-[#FF7A00]" size={20} />
                  <span>Inventory Management</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-[#FF7A00]" size={20} />
                  <span>Real-time Analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-[#FF7A00]" size={20} />
                  <span>Multi-store Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-[#FF7A00]" size={20} />
                  <span>24/7 Support</span>
                </div>
              </div>
            </motion.div>

            {/* Hero Image/Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mt-12 lg:mt-0"
            >
              <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-[#FF7A00]/20 bg-white/5 w-3/4 mx-auto">
                <LazyImage
                  src="/Assets/frabpos-team-aCkaR5G4Zd4-unsplash.jpg"
                  alt="Bloom Swift POS Machine"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                  priority={true}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  width="1024"
                  height="768"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Solutions Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Retail Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="p-8 flex-1">
                <span className="text-xs font-bold tracking-wider text-gray-500 uppercase">All-in-one Retail POS</span>
                <h2 className="text-3xl font-bold text-[#002044] mt-2 mb-4">Retail</h2>
                <p className="text-gray-600 mb-6">Streamline operations, automate inventory, and elevate your marketing to help your retail business thrive.</p>

                <ul className="space-y-3 mb-8">
                  {['Clothing store', 'Convenience and grocery stores', 'Gift shops and more!'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="text-[#002044] mt-1 shrink-0" size={18} />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="h-6" />
              </div>
              <div className="h-64 overflow-hidden">
                <LazyImage
                  src="/Assets/korie-cull-IzIME1jwjCY-unsplash.jpg"
                  alt="Retail Store"
                  className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-700"
                  width="640"
                  height="256"
                />
              </div>
            </motion.div>

            {/* Hospitality Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="p-8 flex-1">
                <span className="text-xs font-bold tracking-wider text-gray-500 uppercase">POS made for an exceptional experience</span>
                <h2 className="text-3xl font-bold text-[#002044] mt-2 mb-4">Hospitality</h2>
                <p className="text-gray-600 mb-6">Sync front and back of house, boost sales and integrate with delivery apps —all while accepting payments quickly.</p>

                <ul className="space-y-3 mb-8">
                  {['Pubs and Bars', 'Restaurants & fine dining', 'Cafe shops and more'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="text-[#002044] mt-1 shrink-0" size={18} />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="h-6" />
              </div>
              <div className="h-64 overflow-hidden">
                <LazyImage
                  src="/Assets/jay-wennington-N_Y88TWmGwA-unsplash.jpg"
                  alt="Hospitality Service"
                  className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-700"
                  width="640"
                  height="256"
                />
              </div>
            </motion.div>

            {/* Enterprise Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="p-8 flex-1">
                <span className="text-xs font-bold tracking-wider text-gray-500 uppercase">Multisite POS Solution</span>
                <h2 className="text-3xl font-bold text-[#002044] mt-2 mb-4">Enterprise</h2>
                <p className="text-gray-600 mb-6">Cloud Based or On Premise solution for complex business needs needing to operate multiple POS systems in one location or mutlitple locations</p>

                <ul className="space-y-3 mb-8">
                  {['Centralized platform', 'Staff and business management', '24/7 support'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="text-[#002044] mt-1 shrink-0" size={18} />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="h-6" />
              </div>
              <div className="h-64 overflow-hidden">
                <LazyImage
                  src="/Assets/yanhao-fang-9qdAqkJYTPg-unsplash.jpg"
                  alt="Enterprise Restaurant"
                  className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-700"
                  width="640"
                  height="256"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Everything in One Package Section */}
      <div className="py-24 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">

            {/* Left: Image with Badge */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative mb-12 lg:mb-0"
            >
              <div className="relative flex justify-center">
                <LazyImage
                  src="/Assets/christiann-koepke-XersifI0JCk-unsplash.jpg"
                  alt="Complete POS Package"
                  className="w-full max-w-md h-auto object-cover drop-shadow-2xl rounded-xl"
                  width="640"
                  height="480"
                />
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-[#002044] mb-6">
                The Complete All-in-One Solution
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Bloom Swift POS is designed to be the only tool you need to scale your business, increase profitability, and stay ahead of the curve. Our platform provides a future-proof foundation that adapts as your business evolves.
              </p>

              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-[#002044] mb-2">Rapid Deployment:</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Get up and running immediately with intuitive onboarding that lets you train staff in minutes.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#002044] mb-2">Omnichannel Ready:</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Seamlessly manage in-store sales, online orders, deliveries, and collections from a single interface.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#002044] mb-2">Hardware Flexibility:</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Choose a standalone setup for small-scale deployments or a full hardware suite—including a high-speed printer, scanner, and secure cash drawer.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#002044] mb-2">Comprehensive Insights:</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Access your business data anytime, anywhere.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#002044] mb-2">Real-Time Analytics:</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Monitor performance with live reporting on sales margins, stock levels, staff productivity, and customer trends.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <LazyImage
                src="/Assets/simon-kadula--gkndM1GvSA-unsplash.jpg"
                alt="Business Owner Support"
                className="w-full h-auto object-cover rounded-lg shadow-none"
                width="800"
                height="600"
              />
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-[#002044] mb-6">
                Support Without Compromise
              </h2>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                We are committed to your success with round-the-clock technical support and a dedicated partnership model. From your first day, you'll receive personalized, one-on-one onboarding to ensure your system is configured perfectly for your workflow.
              </p>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Our commitment doesn't end after setup; we offer unlimited training and coaching to help you and your team master every feature and maximize your business potential.
              </p>

            </motion.div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">

            {/* Left Column: Title */}
            <div className="lg:col-span-5">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#002044] mb-6">
                Have More Questions?
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                If you're looking for more details on how Bloom Swift POS can transform your operations, we're here to help. You can explore our Frequently Asked Questions for quick answers or request a callback to speak with one of our specialists.
              </p>
            </div>

            {/* Right Column: Accordion */}
            <div className="lg:col-span-7">
              <div className="flex flex-col gap-4">
                {faqData.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`bg-white rounded-lg overflow-hidden border transition-all duration-300 ${openIndex === index ? 'shadow-md border-gray-200' : 'border-transparent shadow-sm hover:shadow-md'
                      }`}
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      className="w-full flex items-center justify-between p-6 text-left focus:outline-none bg-white"
                    >
                      <span className="text-lg font-bold text-[#002044] pr-8">
                        {item.question}
                      </span>
                      {openIndex === index ? (
                        <ChevronUp className="text-[#002044] shrink-0" size={24} />
                      ) : (
                        <ChevronDown className="text-[#002044] shrink-0" size={24} />
                      )}
                    </button>

                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#002044] mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Don't just take our word for it—hear from businesses that have transformed their operations with Bloom Swift POS.
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1: Heaven Bakers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 flex flex-col"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-[#002044] mb-3">Heaven Bakers (PVT) Ltd</h3>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-[#FF7A00] fill-[#FF7A00]" size={20} />
                  ))}
                </div>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                "The new POS system has been a total game-changer, making our bakery's checkout process incredibly smooth and intuitive even during the morning rush. The installation was seamless, and the streamlined interface allows our team to focus more on our customers and less on the screen."
              </p>
              
              <div className="pt-4 border-t border-gray-100">
                <p className="text-[#002044] font-semibold text-sm">
                  Best Customer Service, amazing response
                </p>
              </div>
            </motion.div>

            {/* Testimonial 2: Weerasingha Hardware */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 flex flex-col"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-[#002044] mb-3">Weerasingha Hardware</h3>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-[#FF7A00] fill-[#FF7A00]" size={20} />
                  ))}
                </div>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                "The new POS system has completely transformed how we manage our heavy foot traffic and complex inventory. It handles bulk hardware scanning and special orders with ease, making our daily operations significantly more efficient."
              </p>
              
              <div className="pt-4 border-t border-gray-100">
                <p className="text-[#002044] font-semibold text-sm">
                  Amazing Software exactly what we needed
                </p>
              </div>
            </motion.div>

            {/* Testimonial 3: Disna Fashion House */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 flex flex-col"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-[#002044] mb-3">Disna Fashion House</h3>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-[#FF7A00] fill-[#FF7A00]" size={20} />
                  ))}
                </div>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                "The new POS system has elevated our boutique's shopping experience, making everything from size exchanges to style lookups effortless for our staff. Its sleek interface fits perfectly with our store's aesthetic while providing the robust reporting we need to stay on top of seasonal trends."
              </p>
              
              <div className="pt-4 border-t border-gray-100">
                <p className="text-[#002044] font-semibold text-sm">
                  The report system increased our profits by 40% and lower our losses by 30%
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
