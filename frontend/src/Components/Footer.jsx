import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#002044] text-white pt-12 pb-8 font-['Poppins']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4 mb-10">
          <div>
            <h2 className="text-2xl font-bold mb-3">Bloom Swift POS</h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              All-in-one POS solution for modern retail and hospitality businesses. Sell faster,
              stay in control and give your customers a better experience.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-300 mb-4">
              Solutions by industry
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/car-wash" className="text-gray-200 hover:text-white hover:underline">Car wash</Link></li>
              <li><Link to="/convenience-store" className="text-gray-200 hover:text-white hover:underline">Convenience store</Link></li>
              <li><Link to="/grocery-store" className="text-gray-200 hover:text-white hover:underline">Grocery store</Link></li>
              <li><Link to="/quick-service" className="text-gray-200 hover:text-white hover:underline">Quick service</Link></li>
              <li><Link to="/nail-salon" className="text-gray-200 hover:text-white hover:underline">Nail salon</Link></li>
              <li><Link to="/bakery" className="text-gray-200 hover:text-white hover:underline">Bakery</Link></li>
              <li><Link to="/cafe" className="text-gray-200 hover:text-white hover:underline">Cafe</Link></li>
              <li><Link to="/hotel" className="text-gray-200 hover:text-white hover:underline">Hotel</Link></li>
              <li><Link to="/pizza-shop" className="text-gray-200 hover:text-white hover:underline">Pizza shop</Link></li>
              <li><Link to="/bar" className="text-gray-200 hover:text-white hover:underline">Pub and bar</Link></li>
              <li><Link to="/restaurant" className="text-gray-200 hover:text-white hover:underline">Restaurant</Link></li>
              <li><Link to="/clothing-store" className="text-gray-200 hover:text-white hover:underline">Clothing store</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-300 mb-4">
              Solutions by need
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/retail-pos" className="text-gray-200 hover:text-white hover:underline">Retail POS</Link></li>
              <li><Link to="/hospitality-pos" className="text-gray-200 hover:text-white hover:underline">Hospitality POS</Link></li>
              <li><Link to="/software" className="text-gray-200 hover:text-white hover:underline">Software</Link></li>
              <li><Link to="/hardware" className="text-gray-200 hover:text-white hover:underline">POS hardware</Link></li>
            </ul>

            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-300 mt-6 mb-4">
              Integrations
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/integrations/loyalty" className="text-gray-200 hover:text-white hover:underline">Loyalty</Link></li>
              <li><Link to="/integrations/mailchimp" className="text-gray-200 hover:text-white hover:underline">Mailchimp</Link></li>
              <li><Link to="/integrations/whatsapp" className="text-gray-200 hover:text-white hover:underline">WhatsApp</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-300 mb-4">
              Help and support
            </h3>
            <ul className="space-y-2 text-sm mb-6">
              <li><Link to="/support-centre" className="text-gray-200 hover:text-white hover:underline">Support centre</Link></li>
              <li><Link to="/request-pos" className="text-gray-200 hover:text-white hover:underline">Request POS</Link></li>
              <li><a href="mailto:info@bloomswiftpos.com" className="text-gray-200 hover:text-white hover:underline">info@bloomswiftpos.com</a></li>
            </ul>

            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-300 mb-2">
              Admin
            </h3>
            <p className="text-xs text-gray-400">
              Admin access via dedicated login on the main site.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Bloom Swift POS. All rights reserved.
          </p>
          <p className="text-[11px] text-gray-500 max-w-xl text-center sm:text-right">
            Bloom Swift POS is designed to help you manage sales, stock, staff and customers from a single, powerful platform.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
