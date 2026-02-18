import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Star, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const CarWash = () => {
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
        navigate(`/request-pos?service=${encodeURIComponent('Car Wash POS')}`);
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
                            A car wash POS designed for speed, not stress.
                        </h1>
                        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                            Get new staff up to speed in just 15 minutes. Our intuitive system eliminates technical headaches and service delays, so you can focus on the perfect shine and smooth sales.
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

                        {/* Image 1: Man washing car */}
                        <img
                            src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=800&auto=format&fit=crop"
                            alt="Man washing car manually"
                            className="absolute top-0 right-1/3 w-72 h-96 object-cover rounded-2xl shadow-lg z-10 border-4 border-white"
                        />

                        {/* Image 2: Automatic car wash */}
                        <img
                            src="https://images.unsplash.com/photo-1552930294-6b595f4c2974?q=80&w=800&auto=format&fit=crop"
                            alt="Automatic car wash brushes"
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
                                title: "Streamlined Operations",
                                desc: "Manage every promotion from a centralized payment system to attract and retain your local community."
                            },
                            {
                                title: "One-Tap Service",
                                desc: "Instantly toggle between basic and premium packages to ensure speed and order accuracy."
                            },
                            {
                                title: "Automated Customer Loyalty",
                                desc: "Turn regulars into VIPs with our automated loyalty system—automatically tracking visits and purchases to boost your bottom line."
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

            {/* Section 1: Maximum Speed */}
            <div className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1605152276897-4f618f831968?q=80&w=800&auto=format&fit=crop"
                                alt="Car Wash POS System"
                                className="rounded-2xl shadow-xl w-full"
                            />
                        </div>
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-[#002044] mb-6">
                                Maximum Speed, Minimal Friction
                            </h2>
                            <p className="text-lg text-gray-600 mb-6">
                                Keep the weekend rush moving with an intuitive interface designed for rapid order processing.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    { title: "One-Touch Precision", desc: "Simplify complex orders and streamline every transaction with a single tap." },
                                    { title: "Visual Service Guides", desc: "Ensure consistency by storing service checklists and photos directly on the touchscreen for your team." },
                                    { title: "Synchronized Service", desc: "Connect your front-of-house to the wash bay via a dedicated display screen to eliminate errors." },
                                    { title: "Queue-Busting Performance", desc: "Slash wait times and keep sales flowing, even during your busiest peak hours." }
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

            {/* Section 2: Master Your Inventory */}
            <div className="bg-[#002044] text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                                Master Your Inventory with Total Precision
                            </h2>
                            <p className="text-lg text-gray-300 mb-8">
                                Take the guesswork out of your stockroom with a system designed for high-volume car washes.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    { title: "Real-Time Depletion", desc: "Every wash or wax sold is instantly deducted from your master stock levels for a perfect count." },
                                    { title: "Waste Reduction", desc: "Protect your margins by identifying slow-moving products and avoiding unnecessary overspending." },
                                    { title: "Multi-Location Control", desc: "Manage and monitor stock levels across all your car wash locations from a single, unified device." },
                                    { title: "Smart Replenishment", desc: "Eliminate the risk of running out of essentials with automated reordering that keeps you fully stocked." }
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
                                src="https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=800&auto=format&fit=crop"
                                alt="Car Wash Inventory"
                                className="rounded-2xl shadow-xl w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3: Complete Control */}
            <div className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop"
                                alt="Business Control"
                                className="rounded-2xl shadow-xl w-full"
                            />
                        </div>
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-[#002044] mb-6">
                                Complete Control, Anytime, Anywhere
                            </h2>
                            <p className="text-lg text-gray-600 mb-6">
                                Harness the power of the cloud to oversee your business operations without being tied to the counter.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    { title: "Remote Oversight", desc: "Securely monitor your car wash’s performance from home, another branch, or while traveling." },
                                    { title: "Advanced Security", desc: "Maintain strict access control by assigning unique PINs for every team member." },
                                    { title: "Performance Tracking", desc: "Gain full visibility into customer service by tracking which staff members handle specific transactions." },
                                    { title: "Integrated Time-Tracking", desc: "Ensure payroll precision with a built-in clock-in/out system for all employees." },
                                    { title: "Instant Menu Agility", desc: "Refresh your offerings or adjust pricing across your system with just a few taps." }
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

            {/* Section 4: Customer Loyalty */}
            <div className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <h2 className="text-3xl lg:text-4xl font-bold text-[#002044] mb-6">
                                Cultivate Loyalty and Drive Repeat Business
                            </h2>
                            <p className="text-lg text-gray-600 mb-6">
                                Retaining a guest is five times more cost-effective than acquiring a new one. Prioritize satisfaction and value to turn first-time visitors into lifelong regulars.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    { title: "Custom Reward Programs", desc: "Build a tailored loyalty scheme that incentivizes frequent visits and rewards your best customers." },
                                    { title: "Multi-Channel Outreach", desc: "Reach your audience instantly with targeted discounts and time-sensitive offers via SMS, email, and push notifications." },
                                    { title: "Exclusive Member Perks", desc: "Drive engagement with member-only wash clubs and specialized experiences." },
                                    { title: "Feedback Loops", desc: "Enhance service quality and your online reputation by integrating digital receipts with automated customer surveys." }
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
                                src="https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=800&auto=format&fit=crop"
                                alt="Happy Loyal Customers"
                                className="rounded-2xl shadow-xl w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 5: Unified Management */}
            <div className="bg-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop"
                                alt="Unified Management"
                                className="rounded-2xl shadow-xl w-full"
                            />
                        </div>
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-[#002044] mb-6">
                                Unified Car Wash Management
                            </h2>
                            <ul className="space-y-4">
                                {[
                                    { title: "Centralized Marketing", desc: "Manage every promotion through a single payment system to attract—and retain—your local community." },
                                    { title: "Seamless Dynamic Pricing", desc: "Instantly toggle between service rates to ensure speed and billing accuracy." },
                                    { title: "Automated Growth", desc: "Turn regulars into VIPs with automated tracking of visits and purchases through integrated loyalty features." }
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
                            Master your data with high-level car wash analytics
                        </h2>
                        <p className="text-lg text-gray-600">
                            Gain a competitive edge by turning raw data into actionable insights.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "WhatsApp Integration", desc: "Connect with customers directly." },
                            { title: "Email Notifications", desc: "Stay updated with automated alerts." },
                            { title: "Hourly Throughput", desc: "Identify your peak morning rushes and weekend surges to optimize your wash schedule and staffing." },
                            { title: "Churn Rates", desc: "Monitor your loyalty program health by tracking how many regulars are staying active." },
                            { title: "Inventory & Ingredient Integration", desc: "Master your margins by syncing POS sales data with chemical usage to monitor your exact cost-per-wash." },
                            { title: "Offline Mode", desc: "Keep the flow moving; your car wash keeps taking payments even if the internet goes down." },
                            { title: "24/7 Support", desc: "Get expert help whenever you need it—essential for businesses that start early." },
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

export default CarWash;
