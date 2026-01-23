import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { useToast } from '../context/ToastContext';

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
      question: "What does Bloom Swift POS mean?",
      answer: (
        <>
          Electronic Point of Sale (Bloom Swift POS), is a combination of hardware such as a POS terminal and <a href="#" className="text-[#0055B8] underline">POS software</a> designed to help you run your business more effectively. Where traditional till systems record sales, Bloom Swift POS systems not only record this transactional information but can then generate detailed <a href="#" className="text-[#0055B8] underline">POS report</a> in response to the input data.
        </>
      )
    },
    {
      question: "What is the best Bloom Swift POS system?",
      answer: "When choosing an Bloom Swift POS system, it's important to get one that's tailored to your industry and business needs. The best Bloom Swift POS system will come with the tools you need to nurture and grow your business, such as customizable insights, inventory management, and integrations with many apps. Some electronic point of sale systems are designed for the hospitality and retail sectors, coming with scales, kitchen displays, and handheld devices."
    },
    {
      question: "What does an Bloom Swift POS system do?",
      answer: "Unlike traditional cash registers, Bloom Swift POS systems perform a wide range of functions, including inventory management, sales reporting, staff management, barcoding, customer relationship management, and payment processing."
    },
    {
      question: "How does an Bloom Swift POS system work?",
      answer: "An Bloom Swift POS system connects to the internet and integrates with payment providers to process cash and credit/debit transactions. It also stores all of your data securely in the cloud so that you can access it anywhere and from any device."
    },
    {
      question: "How to use an Bloom Swift POS System?",
      answer: "Electronic point of sale systems are easy to set up for the most part. If you can use a smartphone or tablet, then you will have no trouble operating an Bloom Swift POS system. When you choose a company like Bloom Swift POS, you can train your staff and be up and running within 15 minutes."
    },
    {
      question: "How much does an Bloom Swift POS system cost?",
      answer: "The cost of an Bloom Swift POS system varies between providers. Some companies will charge you nothing but take a percentage from each transaction. Others may charge you an upfront fee to buy the system outright. If you add app integrations, you could pay an added monthly fee. The Bloom Swift POS complete Electronic Point of Sale System starts from LKR 299"
    }
  ];

  return (
    <div className="font-poppins">
      {/* Hero Section */}
      <div className="relative min-h-screen bg-[#002044] overflow-hidden flex flex-col justify-center">
        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?q=80&w=2070&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay'
          }}
        />

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
              <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-[#FF7A00]/20 bg-white/5">
                <img
                  src="https://images.unsplash.com/photo-1556742111-a301076d9d18?q=80&w=1000&auto=format&fit=crop"
                  alt="Bloom Swift POS Machine"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Badge Animation */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute bottom-6 left-6 bg-white p-4 rounded-lg shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[#002044] font-bold">System Online</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">99.9% Uptime</div>
                </motion.div>
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
                <h3 className="text-3xl font-bold text-[#002044] mt-2 mb-4">Retail</h3>
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
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop"
                  alt="Retail Store"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
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
                <h3 className="text-3xl font-bold text-[#002044] mt-2 mb-4">Hospitality</h3>
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
                <img
                  src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000&auto=format&fit=crop"
                  alt="Hospitality Service"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
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
                <h3 className="text-3xl font-bold text-[#002044] mt-2 mb-4">Enterprise</h3>
                <p className="text-gray-600 mb-6">Flexible AI-driven solution for businesses operating several POS systems or opening additional locations.</p>

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
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop"
                  alt="Enterprise Restaurant"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">

            {/* Left Column: Title & Trustpilot */}
            <div className="lg:col-span-5">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#002044] mb-6">
                Frequently asked questions
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                If you'd like to know anything else about how Bloom Swift POS can help your business, request a callback or read our frequently asked questions.
              </p>

              {/* Trustpilot Widget Mock */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Star className="text-[#00b67a] fill-[#00b67a]" size={28} />
                  <span className="text-xl font-bold text-[#002044]">Trustpilot</span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="bg-[#00b67a] p-1 rounded-sm">
                      <Star className="text-white fill-white" size={20} />
                    </div>
                  ))}
                </div>
                <div className="text-sm font-medium text-gray-800 mt-1">
                  TrustScore 4.5 | <span className="font-bold underline decoration-gray-400">23,823 reviews</span>
                </div>
              </div>
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
                <img
                  src="https://images.unsplash.com/photo-1556742031-c6961e8560b0?q=80&w=1000&auto=format&fit=crop"
                  alt="Complete POS Package"
                  className="w-full max-w-md h-auto object-contain drop-shadow-2xl rounded-xl"
                />

                {/* TechRadar Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute bottom-10 left-0 sm:left-10 bg-white rounded-full p-6 shadow-xl border border-gray-100 w-32 h-32 flex flex-col items-center justify-center z-10"
                >
                  <div className="flex gap-0.5 mb-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} size={14} className="text-[#D6005D] fill-[#D6005D]" />
                    ))}
                  </div>
                  <span className="font-bold text-gray-900 text-sm tracking-tight">techradar</span>
                  <div className="w-8 h-8 rounded-full border-2 border-[#D6005D] mt-2 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D6005D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10z"></path>
                      <path d="M12 8v8"></path>
                      <path d="M8 12h8"></path>
                    </svg>
                  </div>
                </motion.div>
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
                Everything in one package
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Our <a href="#" className="text-[#0055B8] underline">POS system</a> enables you to adapt, gain new customers, increase profit and remain future proof.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  'Set up, onboard, and train staff in minutes',
                  'Online, delivery, collection, and multi-channel ready',
                  'Access your business insights through any device, on-the-go',
                  'Real-time reporting on staff, customers, sales, margin and stock',
                  'Use standalone, or connect to hundreds of apps including payment systems, accounting software and much more'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="text-[#002044] mt-1 shrink-0" size={20} />
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-gray-600 mb-8">
                Get everything you need to trade in one system, including POS terminal, built-in printer, and card machine.
              </p>
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
              <img
                src="https://images.unsplash.com/photo-1556742111-a301076d9d18?q=80&w=1000&auto=format&fit=crop"
                alt="Business Owner Support"
                className="w-full h-auto rounded-lg shadow-none"
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
                The support you need, whenever you need it
              </h2>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                We provide round-the-clock support, personalized, one-on-one onboarding and unlimited training and coaching.
              </p>

              {/* Trustpilot Widget */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Star className="text-[#00b67a] fill-[#00b67a]" size={24} />
                  <span className="text-xl font-bold text-[#002044]">Trustpilot</span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="bg-[#00b67a] p-1.5 rounded-sm">
                      <Star className="text-white fill-white" size={20} />
                    </div>
                  ))}
                </div>
                <div className="text-sm font-medium text-gray-800 mt-1">
                  TrustScore 4.5 | <span className="font-bold underline decoration-gray-400">23,823 reviews</span>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
