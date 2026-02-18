import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Star, CheckCircle, Cloud, Server, BarChart3, Lock, WifiOff, Smartphone, RefreshCw } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const CloudBasedPOS = () => {
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
        navigate(`/request-pos?service=${encodeURIComponent('Cloud Based POS')}`);
    };

    return (
        <div className="min-h-screen bg-white font-['Poppins']">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 lg:pt-24">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl"
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-[#002044] leading-tight mb-6">
                            Break free from the counter with a powerful cloud-based system.
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Manage sales, track inventory, and serve customers from any device, anywhere in the world. Our system goes wherever your business takes you.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                className="bg-[#0055D4] hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md transition-colors duration-200"
                                onClick={handleRequestClick}
                            >
                                Request for POS
                            </button>
                            <Link to="/support-centre" className="text-[#0055D4] font-bold py-3 px-6 hover:underline">
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

                        {/* Image 1: Cloud/Tablet POS */}
                        <img
                            src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=800&auto=format&fit=crop"
                            alt="Cloud POS Tablet"
                            className="absolute top-0 right-1/3 w-72 h-96 object-cover rounded-2xl shadow-lg z-10 border-4 border-white"
                        />

                        {/* Image 2: Remote Management */}
                        <img
                            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop"
                            alt="Remote Management"
                            className="absolute top-24 right-0 w-72 h-96 object-cover rounded-2xl shadow-lg z-20 border-4 border-white"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Quick View Section */}
            <div className="bg-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: RefreshCw,
                                title: "Real-Time Access",
                                desc: "Manage your entire business from any device with a live dashboard that syncs your sales and inventory instantly."
                            },
                            {
                                icon: Server,
                                title: "Seamless Scalability",
                                desc: "Easily add new locations, registers, or users as your business grows without the need for complex hardware installations."
                            },
                            {
                                icon: Lock,
                                title: "Secure Data Backups",
                                desc: "Protect your business information with automatic cloud encryption that ensures your records are always safe and recoverable."
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border-t-4 border-[#0055D4]">
                                <div className="mb-4 text-[#0055D4]">
                                    <item.icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-[#002044] mb-4">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Section 1: Hardware Independence */}
            <div className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
                                alt="Work From Anywhere"
                                className="rounded-2xl shadow-xl w-full"
                            />
                        </div>
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-[#002044] mb-6">
                                Freedom from traditional hardware barriers.
                            </h2>
                            <p className="text-lg text-gray-600 mb-6">
                                Our cloud-based POS system removes the traditional barriers of hardware, allowing you to manage every aspect of your business from any device, anywhere. By leveraging the power of the cloud, you gain a scalable solution that evolves alongside your storefront while keeping your data synchronized in real time.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    { title: "Work From Anywhere", desc: "Access your management dashboard and sales reports from your phone, tablet, or laptop, whether you are at home or on the go." },
                                    { title: "Scale in Seconds", desc: "Instantly add new branch locations or extra checkout terminals during peak seasons without the need for expensive on-site server setups." },
                                    { title: "Hardware Independence", desc: "Run your business on the devices you already own, from iPads to desktop browsers, ensuring a setup that fits your specific space." },
                                    { title: "Automatic Updates", desc: "Enjoy the latest features and security enhancements delivered through the cloud, ensuring your system never becomes outdated." }
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

            {/* Section 2: Hardware Agnostic */}
            <div className="bg-[#002044] text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                                Designed to be hardware-agnostic.
                            </h2>
                            <p className="text-lg text-gray-300 mb-8">
                                Our platform gives you the freedom to choose the physical setup that best matches your budget and operational needs. Whether you want to leverage your current devices or upgrade to a professional suite, we provide the path that works for you.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    { title: "Bring Your Own Device", desc: "Save on initial costs by running our software on the hardware you already own, including existing tablets, laptops, or smartphones." },
                                    { title: "Premium Hardware Purchases", desc: "Invest in your future with high-performance, industry-standard equipment designed for durability and high-volume transactions." },
                                    { title: "Flexible Rental Plans", desc: "Keep your capital liquid with affordable rental options that allow you to use professional-grade registers and scanners without a large upfront investment." },
                                    { title: "Plug-and-Play Integration", desc: "Easily connect essential peripherals like receipt printers, barcode scanners, and card readers for a fully customized checkout experience." }
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
                                src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=800&auto=format&fit=crop"
                                alt="Hardware Options"
                                className="rounded-2xl shadow-xl w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3: Stock Control */}
            <div className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1580596803208-1671f9a5360c?q=80&w=800&auto=format&fit=crop"
                                alt="Stock Control"
                                className="rounded-2xl shadow-xl w-full"
                            />
                        </div>
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-[#002044] mb-6">
                                Maximize Profitability with Precision Stock Control.
                            </h2>
                            <p className="text-lg text-gray-600 mb-6">
                                Stop losing hours to manual spreadsheets. Our intelligent inventory software gives you total control over your margins in just minutes a day.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    { title: "Granular Ingredient Tracking", desc: "Manage your stock at the ingredient level for hyper-accurate food costing and waste reduction." },
                                    { title: "Proactive Reordering", desc: "Stay ahead of the rush with automated purchase orders and low-stock alerts that ensure you never 86 a best-seller." },
                                    { title: "Bottom-Line Protection", desc: "Prevent shrinkage and over-portioning with airtight stock oversight that turns data into profit." },
                                    { title: "Multi-Site Oversight", desc: "Effortlessly sync and monitor inventory levels across every location from a single, centralized dashboard." }
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

            {/* Section 4: Insights */}
            <div className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <h2 className="text-3xl lg:text-4xl font-bold text-[#002044] mb-6">
                                Transform Data into Growth with Intelligent Insights.
                            </h2>
                            <p className="text-lg text-gray-600 mb-6">
                                Turn your sales history into a roadmap for profit. Use advanced analytics to refine your menu and master your margins.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    { title: "Custom Performance Dashboards", desc: "Visualize your success with tailored reports that highlight key trends at a glance." },
                                    { title: "Menu Engineering", desc: "Identify your \"stars\" and \"dogs\" by tracking exactly which dishes drive revenue and which are taking up space." },
                                    { title: "Margin Optimization", desc: "Analyze individual dish performance to adjust pricing or ingredients for maximum profitability." },
                                    { title: "Waste & Variance Analysis", desc: "Compare actual vs. expected stock levels to pinpoint discrepancies and plan for high-volume periods." },
                                    { title: "Seamless Accounting", desc: "Bridge the gap between front-of-house and finance with instant sync for Sage, Xero, and QuickBooks." }
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
                        <div className="order-1 lg:order-2">
                            <img
                                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
                                alt="Data Insights"
                                className="rounded-2xl shadow-xl w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Page Summary / Analytics */}
            <div className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#002044] mb-6">
                            Everything you need in one package
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: MessageCircle,
                                title: "WhatsApp Integration",
                                desc: "Send digital receipts and marketing updates directly to your customers' favorite app."
                            },
                            {
                                icon: MessageCircle,
                                title: "Email Notifications",
                                desc: "Automate purchase confirmations and low-stock alerts to keep everything running smoothly."
                            },
                            {
                                icon: BarChart3,
                                title: "Hourly Throughput",
                                desc: "Identify your peak morning rushes and weekend surges to optimize your baking schedule and front-of-house staffing."
                            },
                            {
                                icon: RefreshCw,
                                title: "Churn Rates",
                                desc: "Monitor your loyalty program health by tracking how many regulars are staying active versus those who haven't visited in a while."
                            },
                            {
                                icon: Server,
                                title: "Inventory & Ingredient Integration",
                                desc: "Master your margins by syncing POS sales data with ingredient usage to monitor your exact cost-per-pastry."
                            },
                            {
                                icon: WifiOff,
                                title: "Offline Mode",
                                desc: "Keep the oven-to-counter flow moving; your bakery keeps taking payments and processing orders even if the internet goes down."
                            },
                            {
                                icon: CheckCircle,
                                title: "24/7 Support",
                                desc: "Get expert help whenever you need it—essential for businesses that start pre-dawn and stay busy through the weekends."
                            },
                            {
                                icon: Star,
                                title: "Success Metrics",
                                desc: "Set and hit clear growth targets, such as increasing your monthly bread subscription members by 40% within your first 60 days."
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                    <item.icon className="text-[#0055D4]" size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-[#002044] mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-[#002044] py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8">
                        Ready to get started?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Join thousands of businesses growing with Bloom Swift POS.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            className="bg-[#00b67a] hover:bg-[#009f6b] text-white font-bold py-4 px-8 rounded-md transition-colors duration-200 text-lg"
                            onClick={handleRequestClick}
                        >
                            Get Started Now
                        </button>
                        <Link to="/contact" className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-md transition-colors duration-200 text-lg backdrop-blur-sm">
                            Contact Sales
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CloudBasedPOS;
