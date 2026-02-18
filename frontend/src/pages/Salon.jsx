import React from 'react';
import { motion } from 'framer-motion';
import {
    MessageCircle,
    Star,
    CheckCircle,
    Layout,
    Scissors,
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
    Layers,
    Monitor
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const Salon = () => {
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
        navigate(`/request-pos?service=${encodeURIComponent('Salon POS')}`);
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
                                Streamline Your Salon, Scale Your Success
                            </h1>
                            <p className="text-lg lg:text-xl text-gray-300 mb-8 leading-relaxed">
                                Manage your salon with precision using a POS built for speed and growth. From lightning-fast transactions to instant performance reporting and automated loyalty programs, we provide the tools you need to stay ahead of the competition.
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
                                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop"
                                alt="Salon Display"
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
                                title: "Save time",
                                desc: "Save up to 10 hours every month on business management and staff admin.",
                                icon: <Clock className="w-10 h-10 text-[#FF7A00]" />
                            },
                            {
                                title: "Efficient business",
                                desc: "81% of shoppers research products online. Showcase your inventory online.",
                                icon: <TrendingUp className="w-10 h-10 text-[#FF7A00]" />
                            },
                            {
                                title: "Quick transactions",
                                desc: "Put a gloss onto your day. Save over 4 hours per month with integrated payment solutions.",
                                icon: <Zap className="w-10 h-10 text-[#FF7A00]" />
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

            {/* Section 1: In a competitive industry */}
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
                                src="https://images.unsplash.com/photo-1559599101-f09722fb4948?q=80&w=800&auto=format&fit=crop"
                                alt="Salon POS"
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
                                <Scissors className="w-5 h-5" />
                                <span>CLIENT CONNECTION</span>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold mb-6">In a competitive industry, excellence is the baseline—connection is the differentiator</h2>
                            <p className="text-gray-600 mb-6 text-lg">
                                Treat every client like a VIP by tailoring your service to their unique needs and showing genuine appreciation for their loyalty.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    { title: "Curate Personal Profiles", desc: "Maintain detailed records of preferences and style choices to provide a bespoke experience every time." },
                                    { title: "Reward Devotion", desc: "Invite guests into an exclusive loyalty program that celebrates and incentivizes frequent visits." },
                                    { title: "Stay Connected", desc: "Use a curated mailing list to share beauty insights and seasonal promotions directly with your community." },
                                    { title: "Amplify Your Reputation", desc: "Encourage satisfied clients to share their experiences online, building a brand that speaks for itself." }
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

            {/* Section 2: Invest Only in What You Need */}
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
                                <Monitor className="w-5 h-5" />
                                <span>FLEXIBLE HARDWARE</span>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Invest Only in What You Need</h2>
                            <p className="text-gray-600 mb-6 text-lg">
                                Stop paying for bloated POS bundles designed for other industries. With Bloom Swift, you have the freedom to customize your setup—selecting only the hardware and software that actually serves your salon.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    { title: "Keep Your Gear", desc: "No need for a total overhaul; we offer the flexibility to integrate with your existing hardware." },
                                    { title: "Hardware Agnostic", desc: "Our software runs seamlessly across Apple, Windows, and Android devices." },
                                    { title: "Tablet or Desktop", desc: "Choose between a sleek tablet setup for mobility or a traditional computer system." },
                                    { title: "Browser-Based Control", desc: "Manage your Back Office instantly from any major web browser like Chrome." }
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
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="order-1 lg:order-2"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop"
                                alt="Flexible Hardware"
                                className="rounded-2xl shadow-xl w-full object-cover h-[500px]"
                            />
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
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Master your data with high-level salon analytics</h2>
                        <p className="text-gray-300 max-w-2xl mx-auto">
                            Gain a competitive edge by turning raw data into actionable insights. Our payment system automatically syncs analytics from every corner of your salon, generating comprehensive reports that provide a crystal-clear view of your performance.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: <MessageCircle />, title: "WhatsApp Integration", desc: "Connect with clients on their preferred platform." },
                            { icon: <Smartphone />, title: "Email Notifications", desc: "Stay updated with automated alerts." },
                            { icon: <Clock />, title: "Hourly Throughput", desc: "Identify your peak hours and weekend surges to optimize your staff scheduling." },
                            { icon: <RefreshCw />, title: "Churn Rates", desc: "Monitor your loyalty program health by tracking how many regulars are staying active." },
                            { icon: <Package />, title: "Inventory Integration", desc: "Master your margins by syncing POS sales data with product usage to monitor your exact costs." },
                            { icon: <WifiOff />, title: "Offline Mode", desc: "Keep the salon running; take payments and process bookings even if the internet goes down." },
                            { icon: <Server />, title: "24/7 Support", desc: "Get expert help whenever you need it—essential for businesses that stay busy through the weekends." },
                            { icon: <TrendingUp />, title: "Success Metrics", desc: "Set and hit clear growth targets, such as increasing your monthly memberships by 40% within your first 60 days." }
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
                            Join thousands of salons using BloomSwift to grow their business.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button
                                onClick={handleRequestClick}
                                className="bg-[#FF7A00] hover:bg-[#e66e00] text-white font-bold py-4 px-10 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg"
                            >
                                Get Started
                            </button>
                            <Link to="/contact" className="bg-transparent border-2 border-[#002044] text-[#002044] hover:bg-[#002044] hover:text-white font-bold py-4 px-10 rounded-full text-lg transition-all">
                                Contact Sales
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Salon;
