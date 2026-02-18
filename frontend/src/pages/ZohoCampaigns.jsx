import React from 'react';
import { motion } from 'framer-motion';

const ZohoCampaigns = () => {
    return (
        <div className="pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <h1 className="text-4xl font-bold text-[#002044] mb-4">Zoho Campaigns Integration</h1>
                    <p className="text-xl text-gray-600">Connect your POS with Zoho Campaigns for powerful email marketing.</p>
                </motion.div>
            </div>
        </div>
    );
};

export default ZohoCampaigns;
