import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Star, Wrench, Clock, Users, Settings, Database, Activity, CheckCircle, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const GarageShops = () => {
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
        navigate(`/request-pos?service=${encodeURIComponent('Garage Shops POS')}`);
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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
                            Maximize Shop Output, Not Your Workload.
                        </h1>
                        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                            Stop juggling administrative paperwork and start focusing on the vehicles in your bays. Our integrated Garage POS automates your shop operations, bringing every work order, inventory check, and payment into one seamless platform so you can deliver expert-level service without the stress.
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

                        {/* Image 1: Mechanic working */}
                        <img
                            src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=800&auto=format&fit=crop"
                            alt="Mechanic working on car engine"
                            className="absolute top-0 right-1/3 w-72 h-96 object-cover rounded-2xl shadow-lg z-10 border-4 border-white"
                        />

                        {/* Image 2: Garage interior/tools */}
                        <img
                            src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800&auto=format&fit=crop"
                            alt="Garage workshop interior"
                            className="absolute top-24 right-0 w-72 h-96 object-cover rounded-2xl shadow-lg z-20 border-4 border-white"
                        />
                    </motion.div>
                </div>
            </div>
            </section>

            {/* Three Quick View Section */}
            <div className="bg-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Clock,
                                title: "Rapid Service Turnaround",
                                desc: "Our POS and payment terminal integration can save you over 4 hours per month during invoice processing and customer checkout."
                            },
                            {
                                icon: Users,
                                title: "Customer Retention Program",
                                desc: "Keep your clients coming back by offering tailor-made maintenance promotions specific to their vehicle history."
                            },
                            {
                                icon: Settings,
                                title: "Easy Shop Automation",
                                desc: "Save up to 10 hours every month on parts management, work orders, and staff administrative tasks."
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

            {/* Section 1: Engineered for the Modern Garage */}
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
                                src="https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?q=80&w=1200&auto=format&fit=crop"
                                alt="Modern Garage Engineering"
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
                                <Wrench className="w-5 h-5" />
                                <span>EFFICIENCY</span>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-[#002044] mb-6">
                                Engineered for the Modern Garage
                            </h2>
                            <p className="text-lg text-gray-600 mb-6">
                                Drive customer loyalty and peak performance with a POS engineered for the modern mechanics shop. From the service bay to the front desk, we provide the tools to keep your shop running smoothly and engines purring.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    { title: "Precision Inventory Tracking", desc: "Monitor your stock in real-time, from high-value parts down to the milliliter of specialized fluids and oils." },
                                    { title: "Custom Service Programs", desc: "Turn one-time repairs into \"Lifetime Maintenance\" regulars with automated service reminders and membership perks." },
                                    { title: "Seamless Ecosystem", desc: "Connect effortlessly with your favorite diagnostic tools and thirdparty apps to centralize your entire shop workflow." },
                                    { title: "Cloud-Powered Freedom", desc: "Manage your garage, view diagnostic reports, and update labor rates from any device, whether you're under a hood or on the go." },
                                    { title: "The Total Package", desc: "Our comprehensive solution arrives ready for the shop floor, featuring professional-grade software, a high-speed terminal, an integrated receipt printer, and a secure payment interface." }
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
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Section 2: Cultivate Lasting Client Trust */}
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
                                <ShieldCheck className="w-5 h-5" />
                                <span>TRUST</span>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                                Cultivate Lasting Client Trust
                            </h2>
                            <p className="text-lg text-gray-300 mb-6">
                                Today’s vehicle owners look for a frictionless, transparent, and personalized experience every time they book a service. Demonstrate your commitment to excellence by using a POS system designed to put the driver first.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    { title: "Launch Dynamic Loyalty Programs", desc: "Drive repeat business by rewarding frequent clients with automated discounts on oil changes or complimentary vehicle inspections." },
                                    { title: "Actionable Customer Insights", desc: "Build comprehensive vehicle profiles to track service history and preferences, allowing you to tailor every repair recommendation." },
                                    { title: "Precision Marketing", desc: "Sync with email platforms to deliver service reminders at the right time (like 3,000-mile alerts), turning quiet days into busy ones." },
                                    { title: "Multi-Location Fluidity", desc: "Provide a consistent brand experience by allowing customers to earn and redeem service rewards at any of your garage locations." }
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
                        </motion.div>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="order-1 lg:order-2"
                        >
                            <img
                                src="/Assets/Garage/sten-rademaker-UZUzvJEvKnI-unsplash.jpg"
                                alt="Client Trust"
                                className="rounded-2xl shadow-xl w-full border-4 border-white/10"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Section 3: Master Your Shop with Data-Driven Insights */}
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
                                alt="Data Insights"
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
                                <Database className="w-5 h-5" />
                                <span>ANALYTICS</span>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-[#002044] mb-6">
                                Master Your Shop with Data-Driven Insights
                            </h2>
                            <p className="text-lg text-gray-600 mb-6">
                                In the automotive repair industry, the difference between growth and stagnation is found in the data. Leverage powerful reporting tools to transform raw numbers into a clear roadmap for your garage's future.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    { title: "Instant Financial Clarity", desc: "Generate comprehensive reports on parts margins, labor revenue, and overall profitability in seconds." },
                                    { title: "Real-Time Performance Dashboards", desc: "Monitor high-level KPIs and shop trends through an intuitive interface designed for quick decision-making." },
                                    { title: "Identify Profit Drivers", desc: "Pinpoint exactly which service packages and parts add-ons are fueling your growth to optimize your service menu for maximum ROI." },
                                    { title: "Optimize Your Workforce", desc: "Use performance metrics to identify your most efficient technicians, allowing you to reward excellence and refine your shop training." }
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
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Shop Performance Summary */}
            <div className="bg-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#002044] mb-6">
                            Shop Performance Summary
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Activity,
                                title: "Bay Throughput",
                                desc: "See exactly when the shop is busiest to optimize technician scheduling."
                            },
                            {
                                icon: Users,
                                title: "Retention Rates",
                                desc: "Track how many customers are returning for scheduled maintenance vs. one-off repairs."
                            },
                            {
                                icon: Settings,
                                title: "Consumables Integration",
                                desc: "Monitor your cost-per-repair by syncing POS data with fluid and parts usage."
                            },
                            {
                                icon: Zap,
                                title: "Offline Mode",
                                desc: "The shop keeps running and invoices can still be processed even if the internet goes down."
                            },
                            {
                                icon: MessageCircle,
                                title: "24/7 Support",
                                desc: "Crucial for a business that handles emergency repairs and weekend pickups."
                            },
                            {
                                icon: TrendingUp,
                                title: "Success Metrics",
                                desc: "Increase recurring service appointments by 40% in the first 60 days."
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                            >
                                <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                    <item.icon className="text-[#0055D4]" size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-[#002044] mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default GarageShops;
