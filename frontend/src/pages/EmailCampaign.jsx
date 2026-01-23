import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, Users, BarChart3, RefreshCw, Zap, Search, Share2, Layers, MousePointerClick, Heart } from 'lucide-react';
import { useUI } from '../context/UIContext';

const EmailCampaign = () => {
    const { setIsContactSalesOpen } = useUI();
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="font-['Poppins']">
            {/* Hero Section */}
            <div className="bg-[#002044] text-white min-h-[calc(100vh-80px)] flex items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557200199-354d850295e2?q=80&w=2000&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-20">
                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        Custom Email Campaign
                    </motion.h1>
                    <motion.h2
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        transition={{ delay: 0.2 }}
                        className="text-2xl md:text-3xl font-semibold text-[#FF7A00] mb-8"
                    >
                        Turn Transactions into Relationships
                    </motion.h2>
                    <motion.p
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        transition={{ delay: 0.4 }}
                        className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed"
                    >
                        Our platform bridges the gap between your sales counter and your customer’s inbox by
                        automatically transforming daily transaction data into actionable marketing insights. By syncing
                        your POS directly with industry-leading email tools, you can effortlessly nurture shopper loyalty
                        through highly personalized, data-driven communication.
                    </motion.p>
                </div>
            </div>

            {/* Quick View Section */}
            <div className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: RefreshCw,
                                title: "Synchronized Customer Insights",
                                desc: "Eliminate manual data entry by automatically syncing purchase history and customer profiles directly from your POS to your favorite email platform. Whether you use MailChimp, Zoho, or manual exports, your marketing lists stay fresh and accurate without the extra workload."
                            },
                            {
                                icon: Users,
                                title: "Precision-Targeted Campaigns",
                                desc: "Stop sending generic blasts and start sending what your customers actually want. Use real-time data to segment your audience based on what they buy, how much they spend, or how long it’s been since their last visit, ensuring every email feels personal and relevant."
                            },
                            {
                                icon: BarChart3,
                                title: "Boosted Retention and ROI",
                                desc: "Drive repeat business by automating the \"heavy lifting.\" Set up automated \"Thank You\" notes, birthday rewards, or win-back campaigns that trigger based on POS activity, turning one-time shoppers into loyal brand advocates with minimal effort."
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#FF7A00]"
                            >
                                <div className="bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                    <item.icon className="text-[#FF7A00]" size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-[#002044] mb-4">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Integration Logos */}
            <div className="py-16 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-8">Seamlessly Integrates With</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                        <img src="https://logo.clearbit.com/mailchimp.com" alt="MailChimp" className="h-12 object-contain" />
                        <img src="https://logo.clearbit.com/zoho.com" alt="Zoho Campaigns" className="h-12 object-contain" />
                        <img src="https://logo.clearbit.com/mailerlite.com" alt="MailerLite" className="h-12 object-contain" />
                        <img src="https://logo.clearbit.com/moosend.com" alt="Moosend" className="h-12 object-contain" />
                    </div>
                </div>
            </div>

            {/* Section 1: Precision-Targeted Campaigns */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2">
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="text-3xl font-bold text-[#002044] mb-6"
                            >
                                Precision-Targeted Campaigns
                            </motion.h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Generic marketing often goes ignored, but data-driven outreach captures attention by meeting
                                customers exactly where they are in their journey. By leveraging the specific purchase behaviors
                                captured at your POS, you can move beyond broad messaging and deliver content that truly resonates.
                            </p>
                            <div className="space-y-6">
                                {[
                                    {
                                        title: "Behavior-Based Segmentation",
                                        desc: "Group customers automatically based on their actual spending habits, such as \"high-spenders,\" \"frequent coffee buyers,\" or \"seasonal shoppers,\" for laser-focused messaging."
                                    },
                                    {
                                        title: "Reduced Marketing Waste",
                                        desc: "Save time and resources by only sending offers to the people most likely to redeem them, increasing your conversion rates while keeping your brand out of the spam folder."
                                    },
                                    {
                                        title: "Dynamic Personalization",
                                        desc: "Use specific POS data points—like the date of a last visit or a favorite product category—to trigger timely, relevant emails that make customers feel seen and valued."
                                    }
                                ].map((item, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="mt-1">
                                            <CheckCircle className="text-[#0055D4]" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#002044] text-lg">{item.title}</h4>
                                            <p className="text-gray-600 mt-1">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <img
                                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop"
                                alt="Precision Targeted Campaigns"
                                className="rounded-2xl shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 2: Reach your customers exactly where they engage most */}
            <div className="py-20 bg-[#F8FAFC]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
                        <div className="lg:w-1/2">
                            <motion.h2
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="text-3xl font-bold text-[#002044] mb-6"
                            >
                                Reach your customers exactly where they engage most
                            </motion.h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                By bridging the gap between your POS and their inbox, you replace fleeting transactions with a
                                high-impact digital experience. Our platform automatically synchronizes checkout data to deliver
                                professional, searchable invoices and personalized rewards directly to your customers’ primary
                                email accounts.
                            </p>
                            <div className="space-y-6">
                                {[
                                    {
                                        icon: Layers,
                                        title: "Reliable Digital Records",
                                        desc: "Eliminate the frustration of lost paper receipts by providing customers with a permanent, searchable archive of their purchases, accessible from any device at any time."
                                    },
                                    {
                                        icon: Search,
                                        title: "Seamless Information Access",
                                        desc: "Empower your customers with the convenience of a dedicated digital history, allowing them to track orders and verify transactions without the clutter of physical paperwork."
                                    },
                                    {
                                        icon: Heart,
                                        title: "Automated Loyalty Growth",
                                        desc: "Convert every sale into a lasting relationship by triggering tailored rewards and exclusive updates based on shopping habits, making their next visit the obvious choice."
                                    }
                                ].map((item, index) => (
                                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                        <div className="flex items-start gap-4">
                                            <div className="bg-blue-50 p-3 rounded-lg">
                                                <item.icon className="text-[#0055D4]" size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-[#002044] text-lg mb-2">{item.title}</h4>
                                                <p className="text-gray-600">{item.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <img
                                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop"
                                alt="Digital Engagement"
                                className="rounded-2xl shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3: Seamless email marketing integrations */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-[#002044] mb-6">
                            Seamless email marketing integrations (like Mailchimp, Zoho, and MailerLite) POS Integration
                        </h2>
                        <p className="text-lg text-gray-600">
                            Transform your point-of-sale from a final transaction into a long-term connection by turning
                            every receipt into a gateway for your email marketing funnel. By automatically capturing
                            customer data at checkout, you transition from one-off sales to consistent, professional
                            engagement that keeps your brand top-of-mind in your customer's inbox.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Zap,
                                title: "Build Lasting Brand Recall",
                                desc: "Move beyond discarded paper receipts by establishing a permanent, branded presence in your customer’s inbox with beautiful, automated follow-ups."
                            },
                            {
                                icon: MousePointerClick,
                                title: "Drive Frictionless Reorders",
                                desc: "Insert direct \"Buy Again\" links and personalized product recommendations into your emails based on past POS history, making the next purchase just one click away."
                            },
                            {
                                icon: Share2,
                                title: "Simplify Word-of-Mouth",
                                desc: "Increase your reach by including easy \"Forward to a Friend\" rewards and social sharing buttons in every digital touchpoint, turning your loyal customers into active advocates."
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -5 }}
                                className="bg-[#002044] text-white p-8 rounded-2xl relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:bg-white/10 transition-colors"></div>
                                <div className="relative z-10">
                                    <item.icon className="text-[#FF7A00] mb-6" size={40} />
                                    <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                                    <p className="text-gray-300 leading-relaxed">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Featured Platforms Section */}
            <div className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-[#002044] mb-6">
                            Supported Platforms
                        </h2>
                        <p className="text-lg text-gray-600">
                            We integrate seamlessly with the world's leading email marketing platforms to help you stay connected with your customers.
                        </p>
                    </div>

                    <div className="space-y-20">
                        {/* Mailchimp */}
                        <div className="flex flex-col lg:flex-row items-center gap-12">
                            <div className="lg:w-1/2">
                                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFE01B]/20 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                                    <img src="https://logo.clearbit.com/mailchimp.com" alt="Mailchimp Logo" className="h-12 mb-6" />
                                    <h3 className="text-2xl font-bold text-[#002044] mb-4">Mailchimp</h3>
                                    <p className="text-gray-600 leading-relaxed mb-6">
                                        The all-in-one marketing platform that helps you grow your business. With our integration, sync your POS contacts to Mailchimp instantly, segment them based on purchase history, and send personalized campaigns that drive revenue.
                                    </p>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-3 text-gray-700">
                                            <div className="w-2 h-2 rounded-full bg-[#FFE01B]"></div>
                                            Advanced behavioral targeting
                                        </li>
                                        <li className="flex items-center gap-3 text-gray-700">
                                            <div className="w-2 h-2 rounded-full bg-[#FFE01B]"></div>
                                            Automated customer journeys
                                        </li>
                                        <li className="flex items-center gap-3 text-gray-700">
                                            <div className="w-2 h-2 rounded-full bg-[#FFE01B]"></div>
                                            Detailed revenue reporting
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="lg:w-1/2">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="rounded-2xl overflow-hidden shadow-2xl"
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=1000&auto=format&fit=crop"
                                        alt="Mailchimp Integration"
                                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                    />
                                </motion.div>
                            </div>
                        </div>

                        {/* Zoho Campaigns */}
                        <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
                            <div className="lg:w-1/2">
                                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                                    <div className="absolute top-0 left-0 w-32 h-32 bg-[#199928]/10 rounded-br-full -ml-8 -mt-8 transition-transform group-hover:scale-110"></div>
                                    <img src="https://logo.clearbit.com/zoho.com" alt="Zoho Campaigns Logo" className="h-12 mb-6" />
                                    <h3 className="text-2xl font-bold text-[#002044] mb-4">Zoho Campaigns</h3>
                                    <p className="text-gray-600 leading-relaxed mb-6">
                                        Part of the Zoho ecosystem, this platform is perfect for businesses needing deep CRM integration. Create responsive emails and automate workflows to engage your audience at the right time.
                                    </p>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-3 text-gray-700">
                                            <div className="w-2 h-2 rounded-full bg-[#199928]"></div>
                                            Seamless CRM synchronization
                                        </li>
                                        <li className="flex items-center gap-3 text-gray-700">
                                            <div className="w-2 h-2 rounded-full bg-[#199928]"></div>
                                            A/B testing capabilities
                                        </li>
                                        <li className="flex items-center gap-3 text-gray-700">
                                            <div className="w-2 h-2 rounded-full bg-[#199928]"></div>
                                            Dynamic content personalization
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="lg:w-1/2">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="rounded-2xl overflow-hidden shadow-2xl"
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop"
                                        alt="Zoho Campaigns Integration"
                                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                    />
                                </motion.div>
                            </div>
                        </div>

                        {/* MailerLite */}
                        <div className="flex flex-col lg:flex-row items-center gap-12">
                            <div className="lg:w-1/2">
                                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#00A154]/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                                    <img src="https://logo.clearbit.com/mailerlite.com" alt="MailerLite Logo" className="h-12 mb-6" />
                                    <h3 className="text-2xl font-bold text-[#002044] mb-4">MailerLite</h3>
                                    <p className="text-gray-600 leading-relaxed mb-6">
                                        Advanced email marketing made simple. Connect your POS to MailerLite to automate your welcome emails, reward loyal customers, and design beautiful newsletters with an intuitive drag-and-drop editor.
                                    </p>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-3 text-gray-700">
                                            <div className="w-2 h-2 rounded-full bg-[#00A154]"></div>
                                            Intuitive drag-and-drop builder
                                        </li>
                                        <li className="flex items-center gap-3 text-gray-700">
                                            <div className="w-2 h-2 rounded-full bg-[#00A154]"></div>
                                            Landing page integration
                                        </li>
                                        <li className="flex items-center gap-3 text-gray-700">
                                            <div className="w-2 h-2 rounded-full bg-[#00A154]"></div>
                                            Subscriber management
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="lg:w-1/2">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="rounded-2xl overflow-hidden shadow-2xl"
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop"
                                        alt="MailerLite Integration"
                                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-[#002044] mb-6">Ready to transform your customer relationships?</h2>
                    <p className="text-gray-600 mb-8 text-lg">Start syncing your POS data with your favorite email marketing tools today.</p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => setIsContactSalesOpen(true)}
                            className="px-8 py-3 bg-white text-[#002044] font-bold border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Contact Sales
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailCampaign;
