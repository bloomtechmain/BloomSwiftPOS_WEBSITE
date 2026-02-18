import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Star, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const Bar = () => {
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
        navigate(`/request-pos?service=${encodeURIComponent('Bar POS')}`);
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
                            Streamline your bar operations for peak performance
                        </h1>
                        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                            Eliminate friction during happy hour and busy weekends. Our comprehensive bar POS integrates multichannel sales and instant reporting, allowing your staff to focus on service rather than the screen.
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

                        {/* Image 1: Bar atmosphere */}
                        <img
                            src="https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?q=80&w=800&auto=format&fit=crop"
                            alt="Bar atmosphere"
                            className="absolute top-0 right-1/3 w-72 h-96 object-cover rounded-2xl shadow-lg z-10 border-4 border-white"
                        />

                        {/* Image 2: Cocktails */}
                        <img
                            src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop"
                            alt="Fresh cocktails"
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
                                title: "Safer sales",
                                desc: "Automatically prompt staff for ID on alcohol sales, so you can stay compliant without slowing down service"
                            },
                            {
                                title: "Customer convenience",
                                desc: "Create customer profiles and let your guests enjoy service-first experiences by settling up later with card pre-auths and bar tabs"
                            },
                            {
                                title: "Efficient trade",
                                desc: "Monitor drink usage down to the keg or bottle to stay stocked on your most in-demand brands and mixers"
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

            {/* Section 1: High-Performance POS */}
            <div className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=800&auto=format&fit=crop"
                                alt="Bar POS System"
                                className="rounded-2xl shadow-xl w-full"
                            />
                        </div>
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-[#002044] mb-6">
                                A High-Performance Bar POS Built for High-Demand Service
                            </h2>
                            <p className="text-lg text-gray-600 mb-6">
                                Your bartenders are the multi-tasking backbone of your business—give them the tools they deserve. Our POS is engineered for speed and reliability, ensuring your team stays ahead of the rush.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    { title: "Hardened for the Bar", desc: "Durable, water-resistant touchscreens built to survive spills and splashes." },
                                    { title: "Effortless Onboarding", desc: "An intuitive interface that gets new hires up to speed in minutes." },
                                    { title: "Dynamic Layouts", desc: "Tailor your floor plan with custom seating charts for better flow." },
                                    { title: "Cultivate Regulars", desc: "Boost retention with integrated loyalty programs and digital drink rewards." }
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

            {/* Section 2: Menu Control */}
            <div className="bg-[#002044] text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                                Total Menu Control that Moves at the Speed of Your Bar
                            </h2>
                            <p className="text-lg text-gray-300 mb-8">
                                From a tapped-out keg to a surprise kitchen special, your POS should stay in sync with your floor. We provide the agility you need to manage your offerings in real time without missing a beat.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    { title: "Smart Stock Alerts", desc: "Never get caught off guard. Get instant notifications the moment inventory hits a critical level." },
                                    { title: "One-Tap Dynamic Pricing", desc: "Launch happy hour specials or promotional pricing instantly while keeping a sharp eye on your margins." },
                                    { title: "Cloud-Based Management", desc: "Update your menu from anywhere, on any device, ensuring your staff always knows exactly what’s in stock." },
                                    { title: "Transparent Payments", desc: "Support every way your guests want to pay—no hidden fees, no frustrations." }
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
                                src="https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=800&auto=format&fit=crop"
                                alt="Bar Inventory"
                                className="rounded-2xl shadow-xl w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3: Customer Management */}
            <div className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=800&auto=format&fit=crop"
                                alt="Happy Customers"
                                className="rounded-2xl shadow-xl w-full"
                            />
                        </div>
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-[#002044] mb-6">
                                Drive repeat business with streamlined customer management
                            </h2>
                            <p className="text-lg text-gray-600 mb-8">
                                Loyalty is the key to a sustainable bar business. With integrated payment solution, you can manage customer relationships with ease and precision. Our complete solution empowers you to:
                            </p>
                            <ul className="space-y-4">
                                {[
                                    { title: "Understand Buying Habits", desc: "Track preferences to personalize the guest experience." },
                                    { title: "Reward Loyalty", desc: "Design unique schemes that keep your brand top-of-mind." },
                                    { title: "Targeted Outreach", desc: "Send time-sensitive marketing messages that drive foot traffic." },
                                    { title: "Build Profiles", desc: "Store essential customer data in one centralized, easy-to-access location." }
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
                            Master your data with high-level bar analytics
                        </h2>
                        <p className="text-lg text-gray-600">
                            Gain a competitive edge by turning raw data into actionable insights.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "WhatsApp Integration", desc: "Connect with customers directly." },
                            { title: "Email Notifications", desc: "Stay updated with automated alerts." },
                            { title: "Hourly Throughput", desc: "Identify your peak morning rushes and weekend surges to optimize your schedule and staffing." },
                            { title: "Churn Rates", desc: "Monitor your loyalty program health by tracking how many regulars are staying active." },
                            { title: "Inventory & Ingredient Integration", desc: "Master your margins by syncing POS sales data with ingredient usage to monitor your exact costs." },
                            { title: "Offline Mode", desc: "Keep the flow moving; your bar keeps taking payments even if the internet goes down." },
                            { title: "24/7 Support", desc: "Get expert help whenever you need it—essential for businesses that stay busy through the weekends." },
                            { title: "Success Metrics", desc: "Set and hit clear growth targets." }
                        ].map((item, index) => (
                            <div key={index} className="bg-white border border-gray-100 p-6 rounded-xl hover:shadow-lg transition-shadow">
                                <h3 className="text-lg font-bold text-[#002044] mb-3">{item.title}</h3>
                                <p className="text-gray-600 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Get Started Section */}
            <div className="bg-[#002044] py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8">
                        Ready to get started?
                    </h2>
                    <button
                        className="bg-[#FF7A00] hover:bg-[#E66E00] text-white font-bold py-4 px-10 rounded-full text-lg transition-all transform hover:scale-105"
                        onClick={handleRequestClick}
                    >
                        Get in touch
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Bar;
