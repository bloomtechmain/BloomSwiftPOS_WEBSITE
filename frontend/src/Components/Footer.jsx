import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Navbar';

const FooterTitle = ({ children }) => (
  <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-white/45 mb-5">{children}</h3>
);

const FooterLink = ({ to, href, children }) => {
  const cls = 'text-white/75 hover:text-white transition-colors';
  return <li>{to ? <Link to={to} className={cls}>{children}</Link> : <a href={href} className={`${cls} break-all`}>{children}</a>}</li>;
};

const Footer = () => {
  return (
    <footer className="bg-navy-dark text-white pt-16 pb-8">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 pb-12 border-b border-white/10">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block"><Logo dark /></Link>
            <p className="mt-6 text-white/60 leading-relaxed max-w-sm">
              All-in-one POS solution for modern retail and hospitality businesses. Sell faster,
              stay in control and give your customers a better experience.
            </p>
            <span className="mt-6 block w-12 h-1 bg-brand-orange" aria-hidden="true" />
          </div>

          <div className="lg:col-span-4">
            <FooterTitle>Solutions by industry</FooterTitle>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <FooterLink to="/retail-pos">Retail</FooterLink>
              <FooterLink to="/grocery-store">Grocery store</FooterLink>
              <FooterLink to="/bakery">Bakery</FooterLink>
              <FooterLink to="/cafe">Cafe</FooterLink>
              <FooterLink to="/pizza-shop">Pizza shop</FooterLink>
              <FooterLink to="/restaurant">Restaurant</FooterLink>
              <FooterLink to="/hotel">Hotel</FooterLink>
              <FooterLink to="/bar">Pub and bar</FooterLink>
              <FooterLink to="/clothing-store">Clothing store</FooterLink>
              <FooterLink to="/salon">Salon Store</FooterLink>
              <FooterLink to="/car-wash">Car wash</FooterLink>
              <FooterLink to="/garage-shops">Garage shops</FooterLink>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <FooterTitle>Integrations</FooterTitle>
            <ul className="space-y-3 text-sm">
              <FooterLink to="/integrations/loyalty">Loyalty</FooterLink>
              <FooterLink to="/integrations/mailchimp">Mailchimp</FooterLink>
              <FooterLink to="/integrations/whatsapp">WhatsApp</FooterLink>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <FooterTitle>Help and support</FooterTitle>
            <ul className="space-y-3 text-sm">
              <FooterLink to="/support-centre">Support centre</FooterLink>
              <FooterLink to="/request-pos">Request POS</FooterLink>
              <FooterLink to="/pricing">Pricing</FooterLink>
              <FooterLink href="mailto:info@bloomswiftpos.com">info@bloomswiftpos.com</FooterLink>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} Bloom Swift POS. All rights reserved. Powered by BloomTech
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
