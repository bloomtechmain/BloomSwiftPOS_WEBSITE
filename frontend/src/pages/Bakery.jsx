import React from 'react';
import { motion } from 'framer-motion';
import {
    MessageCircle,
    Star,
    CheckCircle,
    Layout,
    ChefHat,
    Zap,
    Smartphone,
    Clock,
    RefreshCw,
    Utensils,
    WifiOff,
    Server,
    TrendingUp,
    Package,
    BarChart3,
    ShieldCheck,
    CreditCard,
    Layers
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const Bakery = () => {
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
        navigate(`/request-pos?service=${encodeURIComponent('Bakery POS')}`);
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
                                Bakery POS system for a smooth baking
                            </h1>
                            <p className="text-lg lg:text-xl text-gray-300 mb-8 leading-relaxed">
                                Sieve through your business data and bake the next batch better with Bloom Swift POS's advanced stock-control system, speedy checkout software, and real-time reports.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={handleRequestClick}
                                    className="bg-[#FF7A00] hover:bg-[#e66e00] text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg transform hover:-translate-y-1 text-lg"
                                >
                                    Get Started
                                </button>
                                <Link to="/contact" className="bg-transparent border-2 border-white hover:bg-white hover:text-[#002044] text-white font-bold py-4 px-8 rounded-full transition-all duration-300 text-lg text-center">
                                    Contact Sales
                                </Link>
                            </div>
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
                                src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=800&auto=format&fit=crop"
                                alt="Bakery Display"
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
                            {
                                title: "Safer Sales",
                                desc: "Automatically prompt staff for allergen checks on specific items, so you can stay compliant without slowing down service.",
                                icon: <ShieldCheck className="w-10 h-10 text-[#FF7A00]" />
                            },
                            {
                                title: "Customer Convenience",
                                desc: "Create customer profiles and let your guests enjoy service-first experiences by settling up later with house accounts.",
                                icon: <CreditCard className="w-10 h-10 text-[#FF7A00]" />
                            },
                            {
                                title: "Efficient Trade",
                                desc: "Monitor ingredient usage down to the gram to stay stocked on your most in-demand pastries and breads.",
                                icon: <Layers className="w-10 h-10 text-[#FF7A00]" />
                            }
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

            {/* Section 1: Maximize Potential */}
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
                                src="/Assets/Bakery/barbara-burgess-EEL5cUbbCfM-unsplash.jpg"
                                alt="Bakery POS"
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
                                <Zap className="w-5 h-5" />
                                <span>MARKET-LEADING POS</span>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Maximize your bakery’s potential with a market-leading POS</h2>
                            <p className="text-gray-600 mb-6 text-lg">
                                Don't let outdated tech hold your bakery back. Whether you're a boutique shop or a high-volume wholesaler, Bloom Swift POS provides a scalable POS solution designed to grow with you.
                            </p>
                            <p className="text-gray-600 text-lg">
                                Harness powerful features like custom-branded loyalty programs and real-time analytics to track your top-selling treats and customer trends. From deep-dive sales reports to instant performance tracking, Bloom Swift POS simplifies the complexities of hospitality management.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Section 2: Perfect Ingredients */}
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
                                <ChefHat className="w-5 h-5" />
                                <span>SCALABLE SOLUTION</span>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold mb-6">The perfect ingredients for your Point of Sale</h2>
                            <p className="text-gray-600 mb-6 text-lg">
                                Don't let outdated tech hold your bakery back. Whether you're a boutique shop or a high-volume wholesaler, Bloom Swift POS provides a scalable POS solution designed to grow with you.
                            </p>
                            <p className="text-gray-600 text-lg">
                                Our core system includes everything you need to get started—a sleek terminal and high-speed printer—but our award-winning add-ons truly set us apart. From seamless payment processing to interactive customer displays, we give you the tools to craft the exact experience your bakery needs.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="order-1 lg:order-2"
                        >
                            <img
                                src="/Assets/Bakery/jack-plant-ZUrUfh8W9TE-unsplash.jpg"
                                alt="Payment Solutions"
                                className="rounded-2xl shadow-xl w-full object-cover h-[500px]"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Section 3: Customer Management */}
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
                                src="/Assets/Bakery/waleed-derhem-34ETgfmsh84-unsplash.jpg"
                                alt="Customer Loyalty"
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
                                <MessageCircle className="w-5 h-5" />
                                <span>CUSTOMER LOYALTY</span>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Drive repeat business with streamlined customer management</h2>
                            <p className="text-gray-600 mb-8 text-lg">
                                Loyalty is the key to a sustainable bakery. With integrated payment solution, you can manage customer relationships with ease and precision. Our complete solution empowers you to:
                            </p>
                            <ul className="space-y-4">
                                {[
                                    { title: "Understand Buying Habits", desc: "Track preferences to personalize the guest experience." },
                                    { title: "Reward Loyalty", desc: "Design unique schemes that keep your brand top-of-mind." },
                                    { title: "Targeted Outreach", desc: "Send time-sensitive marketing messages that drive foot traffic." },
                                    { title: "Build Profiles", desc: "Store essential customer data in one centralized, easy-to-access location." }
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

            {/* Section 4: Analytics (Master your data) */}
            <section className="py-20 bg-[#002044] text-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Master your data with high-level bakery analytics</h2>
                        <p className="text-gray-300 max-w-2xl mx-auto">
                            Gain a competitive edge by turning raw data into actionable insights. Our payment system automatically syncs analytics from every corner of your bakery, generating comprehensive reports that provide a crystal-clear view of your performance.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: <BarChart3 />, title: "Custom Dashboards", desc: "Track personalized goals and KPIs at a glance." },
                            { icon: <Package />, title: "Omnichannel Inventory", desc: "Manage stock seamlessly across all sales channels." },
                            { icon: <TrendingUp />, title: "Performance Metrics", desc: "Evaluate employee productivity and identify your highest-margin products." },
                            { icon: <MessageCircle />, title: "WhatsApp Integration", desc: "Connect with customers on their preferred platform." },
                            { icon: <Smartphone />, title: "Email Notifications", desc: "Stay updated with automated alerts." },
                            { icon: <Clock />, title: "Hourly Throughput", desc: "Identify your peak morning rushes and weekend surges to optimize your baking schedule and front-of-house staffing." },
                            { icon: <RefreshCw />, title: "Churn Rates", desc: "Monitor your loyalty program health by tracking how many regulars are staying active versus those who haven't visited in a while." },
                            { icon: <Utensils />, title: "Inventory & Ingredient Integration", desc: "Master your margins by syncing POS sales data with ingredient usage to monitor your exact cost-per-pastry." },
                            { icon: <WifiOff />, title: "Offline Mode", desc: "Keep the oven-to-counter flow moving; your bakery keeps taking payments and processing orders even if the internet goes down." },
                            { icon: <Server />, title: "24/7 Support", desc: "Get expert help whenever you need it—essential for businesses that start pre-dawn and stay busy through the weekends." },
                            { icon: <TrendingUp />, title: "Success Metrics", desc: "Set and hit clear growth targets, such as increasing your monthly bread subscription members by 40% within your first 60 days." }
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
                            Join thousands of bakeries using BloomSwift to grow their business.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button
                                onClick={handleRequestClick}
                                className="bg-[#FF7A00] hover:bg-[#e66e00] text-white font-bold py-4 px-10 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg"
                            >
                                Get in touch
                            </button>
                            <Link to="/contact" className="bg-transparent border-2 border-[#002044] text-[#002044] hover:bg-[#002044] hover:text-white font-bold py-4 px-10 rounded-full transition-all duration-300 text-lg">
                                Contact Sales
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Bakery;
