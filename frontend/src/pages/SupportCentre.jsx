import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Ticket } from 'lucide-react';
import TicketFormModal from '../Components/TicketFormModal';

const SupportCentre = () => {
  const navigate = useNavigate();
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  const handleLoginClick = () => {
    navigate('/support-centre?login=1');
  };

  return (
    <div className="bg-white min-h-screen font-['Poppins']">
      <TicketFormModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-sm font-semibold text-[#D6005D] mb-4">
          Help and support
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#002044] mb-6">
          How can we help?
        </h1>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-3xl mx-auto mb-6">
          Get in touch with the right people at Bloom Swift POS. Talk to a member of our
          sales team, get support with using our products, or message a member of
          our partnership team.
        </p>
        <p className="text-sm sm:text-base text-gray-800">
          <span className="font-semibold">Need to speak with someone? Call our helpline: </span>
          <a
            href="tel:0770262675"
            className="font-semibold text-[#0055D4] hover:underline"
          >
            0770262675
          </a>
        </p>
      </div>

      {/* Support Options Cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Us Directly Card */}
          <div className="bg-white border border-gray-100 rounded-lg shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-[#002044] rounded-full flex items-center justify-center mb-6 text-white">
              <Phone size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-[#002044] mb-4">Contact us directly</h3>
            <p className="text-gray-600 mb-8 flex-grow">
              +94 077 026 2675
            </p>
            <a
              href="https://wa.me/94770262675"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0055D4] text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition-colors w-full sm:w-auto"
            >
              Get in touch
            </a>
          </div>

          {/* Submit Your Ticket Card */}
          <div className="bg-white border border-gray-100 rounded-lg shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-[#002044] rounded-full flex items-center justify-center mb-6 text-white">
              <Ticket size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-[#002044] mb-4">Submit your ticket</h3>
            <p className="text-gray-600 mb-8 flex-grow">
              Connect to a live text chat with a support team member anytime between 9am-6pm.
            </p>
            <button
              onClick={() => setIsTicketModalOpen(true)}
              className="bg-[#0055D4] text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition-colors w-full sm:w-auto"
            >
              Get in touch
            </button>
          </div>
        </div>
      </div>

      {/* Login Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#002044] mb-6">
          Log in for the best support
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
          Already a customer? In need of support or advice? Login to Bloom Swift POS and
          select "support" to take advantage of our award-winning support team, who are
          always happy to help you with all your POS problems:
        </p>
        <button
          onClick={handleLoginClick}
          className="bg-[#0055D4] text-white font-bold py-3 px-8 rounded-md hover:bg-blue-700 transition-colors text-lg"
        >
          Login to Bloom Swift POS
        </button>
      </div>
    </div>
  );
};

export default SupportCentre;
