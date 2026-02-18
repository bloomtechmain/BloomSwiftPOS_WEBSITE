import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../context/ToastContext';
import { useUI } from '../context/UIContext';
import { useCart } from '../context/CartContext';
import {
    Car, Shirt, ShoppingBasket, Store,
    UtensilsCrossed, Scissors, Coffee, Hotel, Beer,
    Pizza, MonitorSmartphone, CreditCard, LayoutGrid,
    FileText, LayoutTemplate, Headset, Info, Award, MessageCircle, Wrench, Ticket, ClipboardList, Croissant, ChevronDown, ShoppingCart
} from 'lucide-react';
// Using public folder asset - Vite will resolve this correctly during build
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import LiveChatModal from './LiveChatModal';
import ContactSalesModal from './ContactSalesModal';
import API_URL from '../config/api';

const Navbar = () => {
    const toast = useToast();
    const { isContactSalesOpen, setIsContactSalesOpen } = useUI();
    const { getCartCount, toggleCart } = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const [currentUser, setCurrentUser] = useState(() => {
        try {
            const stored = localStorage.getItem('bloom_user');
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });

    // Poll for unread messages
    useEffect(() => {
        if (!currentUser) return;

        const fetchUnreadCount = async () => {
            try {
                const response = await fetch(`${API_URL}/api/chat/unread-count?role=user&username=${currentUser.username}`);
                const data = await response.json();
                if (data.success) {
                    setUnreadCount(data.count);
                }
            } catch (error) {
                console.error('Error fetching unread count:', error);
            }
        };

        fetchUnreadCount();
        const interval = setInterval(fetchUnreadCount, 5000); // Poll every 5 seconds
        return () => clearInterval(interval);
    }, [currentUser]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get('login') === '1') {
            setIsLoginOpen(true);
        }
    }, [location.search]);

    const handleLoggedIn = (user) => {
        setCurrentUser(user || null);
    };

    const handleLogout = () => {
        try {
            localStorage.removeItem('bloom_user');
        } catch {
        }
        setCurrentUser(null);
        setIsLoginOpen(false);

        // Redirect to home page if user is on restricted pages
        const restrictedPaths = ['/my-tickets', '/my-pos-requests', '/account'];
        if (restrictedPaths.some(path => location.pathname.startsWith(path))) {
            navigate('/');
        }
    };

    const navItems = [
        'Solutions',
        'Integrations',
        'Resources',
        'Shop Hardware'
    ];

    const solutionsData = {
        byIndustry: [
            { name: 'Retail', icon: ShoppingBasket, path: '/retail-pos' },
            { name: 'Grocery store', icon: Store, path: '/grocery-store' },
            { name: 'Bakery', icon: Croissant, path: '/bakery' },
            { name: 'Cafe', icon: Coffee, path: '/cafe' },
            { name: 'Pizza shop', icon: Pizza, path: '/pizza-shop' },
            { name: 'Restaurant', icon: UtensilsCrossed, path: '/restaurant' },
            { name: 'Hotel', icon: Hotel, path: '/hotel' },
            { name: 'Pub & Bar', icon: Beer, path: '/bar' },
            { name: 'Clothing store', icon: Shirt, path: '/clothing-store' },
            { name: 'Salon Store', icon: Scissors, path: '/salon' },
            { name: 'Car Wash', icon: Car, path: '/car-wash' },
            { name: 'Garage shops', icon: Wrench, path: '/garage-shops' },
        ]
    };

    const integrationsData = {
        retail: [
            { name: 'Loyalty Program', path: '/integrations/loyalty' },
            { name: 'Whatsapp', path: '/integrations/whatsapp' },
            { name: 'Custom Email Campaign', path: '/integrations/email-campaign' },
        ],
    };

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-sm w-full font-['Poppins']">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo - Left side */}
                    <div className="flex-shrink-0 z-20">
                        <Link
                            to="/"
                            className="flex items-center gap-3"
                        >
                            <img
                                src="/BLOOM_SWIFT_POS_LOGO_XS_T.png"
                                alt="Bloom Swift POS logo"
                                className="h-10 w-10 object-contain"
                            />
                            <span className="text-2xl font-semibold tracking-tight text-[#0b2240] leading-tight" style={{ fontFamily: "'ITC Avant Garde Gothic Demi Condensed', sans-serif" }}>
                                Bloom Swift POS
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation - Center/Right */}
                    <div className="hidden lg:flex items-center flex-1 ml-8 h-full">
                        <ul className="flex space-x-8 h-full items-center flex-1 justify-center">
                            {navItems.map((item) => (
                                <li
                                    key={item}
                                    className="h-full flex items-center relative"
                                    onMouseEnter={() =>
                                        (item === 'Solutions' || item === 'Integrations' || item === 'Resources')
                                            ? setActiveDropdown(item)
                                            : setActiveDropdown(null)
                                    }
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            if (item === 'Live Chat') {
                                                e.preventDefault();
                                                if (!currentUser) {
                                                    toast.error("Logging is required for live chat!");
                                                } else {
                                                    setIsLiveChatOpen(true);
                                                }
                                            } else if (item === 'Shop Hardware') {
                                                e.preventDefault();
                                                navigate('/hardware');
                                            }
                                        }}
                                        className={`text-xs font-bold transition-colors duration-200 flex items-center gap-2 ${activeDropdown === item ? 'text-orange-500' : 'text-[#002044] hover:text-orange-500'
                                            }`}
                                        style={{ fontFamily: "'Poppins', sans-serif" }}
                                    >
                                        {item}
                                        {item === 'Live Chat' && unreadCount > 0 && (
                                            <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center animate-pulse">
                                                {unreadCount}
                                            </span>
                                        )}
                                    </a>

                                    {/* Dropdown Menus */}
                                    <AnimatePresence>
                                        {item === 'Solutions' && activeDropdown === 'Solutions' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-full left-0 w-[900px] -ml-10 bg-white shadow-xl rounded-b-xl border-t border-gray-100 overflow-hidden"
                                            >
                                                <div className="grid grid-cols-12 p-8 gap-8">

                                                    {/* Column: By Industry */}
                                                    <div className="col-span-8 border-r border-gray-100 pr-4">
                                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">By Industry</h3>
                                                        <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                                                            {solutionsData.byIndustry.map((subItem, idx) => (
                                                                <Link key={idx} to={subItem.path} className="flex items-center gap-3 group">
                                                                    <subItem.icon className="text-[#002044] group-hover:text-[#FF7A00] transition-colors" size={24} strokeWidth={1.5} />
                                                                    <span className="text-[#002044] font-semibold group-hover:text-[#FF7A00] transition-colors">{subItem.name}</span>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Column: Cloud Based POS Button */}
                                                    <div className="col-span-4">
                                                        <Link to="/cloud-based-pos" className="block bg-white p-6 h-full flex flex-col justify-center relative overflow-hidden group hover:bg-gray-50 transition-colors rounded-lg border border-gray-200">
                                                            <div className="relative z-10">
                                                                <h4 className="font-bold text-[#002044] mb-2 group-hover:text-[#FF7A00] transition-colors text-lg">Cloud Based POS</h4>
                                                                <p className="text-sm text-gray-600">Bring your company to the future</p>
                                                            </div>
                                                            <img
                                                                src="https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=200&auto=format&fit=crop"
                                                                alt="POS Device"
                                                                className="absolute -bottom-4 -right-4 w-32 h-auto opacity-20 transform rotate-12"
                                                            />
                                                        </Link>
                                                    </div>
                                                </div>

                                                {/* Dropdown Footer - Full Width Orange Section */}
                                                <button 
                                                    type="button"
                                                    onClick={() => setIsContactSalesOpen(true)}
                                                    className="w-full bg-[#e14504] p-6 flex flex-col justify-center border-t border-gray-100 hover:bg-[#c93d04] transition-colors cursor-pointer text-left"
                                                >
                                                    <h4 className="font-bold text-[#0b2240] mb-1">Lets get Started</h4>
                                                    <p className="text-sm text-[#0b2240]">Come Find the Bloom difference, A POS system that works for you</p>
                                                </button>

                                            </motion.div>
                                        )}
                                        {item === 'Integrations' && activeDropdown === 'Integrations' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-full left-0 w-[500px] -ml-10 bg-white shadow-xl rounded-b-xl border-t border-gray-100 overflow-hidden"
                                            >
                                                <div className="grid grid-cols-1 gap-4 p-8">
                                                    <div>
                                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">
                                                            Popular integrations
                                                        </h3>
                                                        <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                                            {integrationsData.retail.map((item) => (
                                                                item.path && item.path !== '#' ? (
                                                                    <Link
                                                                        key={item.name}
                                                                        to={item.path}
                                                                        className="text-[#002044] font-semibold hover:text-[#FF7A00] transition-colors"
                                                                    >
                                                                        {item.name}
                                                                    </Link>
                                                                ) : (
                                                                    <a
                                                                        key={item.name}
                                                                        href="#"
                                                                        className="text-[#002044] font-semibold hover:text-[#FF7A00] transition-colors"
                                                                    >
                                                                        {item.name}
                                                                    </a>
                                                                )
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                            </motion.div>
                                        )}
                                        {item === 'Resources' && activeDropdown === 'Resources' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-full left-0 w-[640px] -ml-10 bg-white shadow-xl rounded-b-xl border-t border-gray-100 overflow-hidden"
                                            >
                                                <div className="grid grid-cols-2 gap-8 p-8">
                                                    <div>
                                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">
                                                            Knowledge base
                                                        </h3>
                                                        <div className="space-y-4">
                                                            <Link to="/support-centre" className="flex items-start gap-3 group">
                                                                <div className="mt-1">
                                                                    <Headset className="text-[#002044] group-hover:text-[#FF7A00] transition-colors" size={22} />
                                                                </div>
                                                                <div className="text-left">
                                                                    <div className="text-[#002044] font-semibold group-hover:text-[#FF7A00] transition-colors">
                                                                        Support centre
                                                                    </div>
                                                                    <div className="text-sm text-gray-600">
                                                                        Get help for all your Bloom Swift POS needs
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">
                                                            About Bloom Swift POS
                                                        </h3>
                                                        <div className="space-y-4">
                                                            <Link to="/about-bloom-swift-pos" className="flex items-start gap-3 group">
                                                                <div className="mt-1">
                                                                    <Info className="text-[#002044] group-hover:text-[#FF7A00] transition-colors" size={22} />
                                                                </div>
                                                                <div className="text-left">
                                                                    <div className="text-[#002044] font-semibold group-hover:text-[#FF7A00] transition-colors">
                                                                        About Bloom Swift POS
                                                                    </div>
                                                                    <div className="text-sm text-gray-600">
                                                                        Learn more about our story and mission
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                            <Link to="/success-stories" className="flex items-start gap-3 group">
                                                                <div className="mt-1">
                                                                    <Award className="text-[#002044] group-hover:text-[#FF7A00] transition-colors" size={22} />
                                                                </div>
                                                                <div className="text-left">
                                                                    <div className="text-[#002044] font-semibold group-hover:text-[#FF7A00] transition-colors">
                                                                        Success stories
                                                                    </div>
                                                                    <div className="text-sm text-gray-600">
                                                                        See how businesses grow with Bloom Swift POS
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </li>
                            ))}
                        </ul>

                        <div className="flex items-center space-x-4">
                            {/* Cart Icon */}
                            <button
                                type="button"
                                onClick={toggleCart}
                                className="relative p-2 text-[#002044] hover:text-orange-500 transition-colors"
                                aria-label="Shopping Cart"
                            >
                                <ShoppingCart size={24} />
                                {getCartCount() > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                        {getCartCount()}
                                    </span>
                                )}
                            </button>
                            
                            <button
                                type="button"
                                onClick={() => setIsContactSalesOpen(true)}
                                className="px-6 py-2.5 text-xs font-bold transition-colors duration-200 hover:text-orange-500"
                                style={{
                                    color: '#002044',
                                    fontFamily: "'Poppins', sans-serif"
                                }}
                            >
                                Contact Sales
                            </button>
                            {!currentUser && (
                                <>
                                    <button
                                        onClick={() => setIsSignupOpen(true)}
                                        className="px-8 py-2.5 rounded-md text-sm font-medium transition-colors duration-200"
                                        style={{
                                            backgroundColor: '#0055D4',
                                            color: 'white',
                                            fontFamily: "'Poppins', sans-serif",
                                            fontWeight: 600
                                        }}
                                    >
                                        Sign up
                                    </button>
                                    <button
                                        onClick={() => setIsLoginOpen(true)}
                                        className="px-8 py-2.5 rounded-md text-sm font-medium transition-colors duration-200"
                                        style={{
                                            backgroundColor: '#FF7A00',
                                            color: 'white',
                                            fontFamily: "'Poppins', sans-serif",
                                            fontWeight: 600
                                        }}
                                    >
                                        Log in
                                    </button>
                                </>
                            )}
                            {currentUser && (
                                <div className="flex items-center space-x-3">
                                    <Link
                                        to="/my-pos-requests"
                                        className="text-xs font-bold text-[#002044] hover:underline flex items-center gap-1"
                                    >
                                        <ClipboardList size={16} />
                                        My POS Requests
                                    </Link>
                                    <Link
                                        to="/my-tickets"
                                        className="text-xs font-bold text-[#002044] hover:underline flex items-center gap-1"
                                    >
                                        <Ticket size={16} />
                                        My Tickets
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => navigate('/account')}
                                        className="text-xs font-bold text-[#002044] hover:underline"
                                    >
                                        {currentUser.fullName || currentUser.username}
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="px-4 py-2 rounded-md text-xs font-bold transition-colors duration-200"
                                        style={{
                                            backgroundColor: '#FF7A00',
                                            color: 'white',
                                            fontFamily: "'Poppins', sans-serif"
                                        }}
                                    >
                                        Log out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile cart icon and menu button */}
                    <div className="lg:hidden flex items-center space-x-3">
                        <button
                            type="button"
                            onClick={toggleCart}
                            className="relative p-2 text-[#002044]"
                            aria-label="Shopping Cart"
                        >
                            <ShoppingCart size={24} />
                            {getCartCount() > 0 && (
                                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {getCartCount()}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md"
                            style={{ color: '#002044' }}
                            aria-label="Toggle menu"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="lg:hidden">
                        <div className="pt-2 pb-3 space-y-1">
                            {navItems.map((item) => (
                                <div key={item}>
                                    <button
                                        type="button"
                                        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors duration-200 hover:text-orange-500 hover:bg-gray-50 rounded-lg"
                                        style={{
                                            color: activeDropdown === item ? '#FF7A00' : '#002044',
                                            fontFamily: "'Poppins', sans-serif",
                                            fontWeight: 600
                                        }}
                                        onClick={(e) => {
                                            if (item === 'Solutions' || item === 'Integrations' || item === 'Resources') {
                                                e.preventDefault();
                                                setActiveDropdown(activeDropdown === item ? null : item);
                                            } else if (item === 'Shop Hardware') {
                                                e.preventDefault();
                                                navigate('/hardware');
                                                setIsMenuOpen(false);
                                            } else {
                                                if (item === 'Live Chat') {
                                                    e.preventDefault();
                                                    if (!currentUser) {
                                                        toast.error("Logging is required for live chat!");
                                                    } else {
                                                        setIsLiveChatOpen(true);
                                                    }
                                                }
                                                setIsMenuOpen(false);
                                            }
                                        }}
                                    >
                                        <span className="flex items-center gap-2">
                                            {item}
                                            {item === 'Live Chat' && unreadCount > 0 && (
                                                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center animate-pulse">
                                                    {unreadCount}
                                                </span>
                                            )}
                                        </span>
                                        {(item === 'Solutions' || item === 'Integrations' || item === 'Resources') && (
                                            <ChevronDown 
                                                className={`transition-transform duration-200 ${activeDropdown === item ? 'rotate-180' : ''}`}
                                                size={20}
                                            />
                                        )}
                                    </button>

                                    {/* Mobile Dropdown Content */}
                                    <AnimatePresence>
                                        {item === 'Solutions' && activeDropdown === 'Solutions' && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden bg-gray-50 rounded-lg mx-2 mb-2"
                                            >
                                                <div className="p-4 space-y-3">
                                                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">By Industry</h3>
                                                    {solutionsData.byIndustry.map((subItem, idx) => (
                                                        <Link 
                                                            key={idx} 
                                                            to={subItem.path} 
                                                            className="flex items-center gap-3 py-2 px-2 rounded hover:bg-white transition-colors"
                                                            onClick={() => setIsMenuOpen(false)}
                                                        >
                                                            <subItem.icon className="text-[#002044]" size={20} strokeWidth={1.5} />
                                                            <span className="text-[#002044] text-sm font-medium">{subItem.name}</span>
                                                        </Link>
                                                    ))}
                                                    <Link 
                                                        to="/cloud-based-pos" 
                                                        className="block bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg mt-4 hover:from-orange-600 hover:to-orange-700 transition-all"
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        <h4 className="font-bold text-sm mb-1">Cloud Based POS</h4>
                                                        <p className="text-xs opacity-90">Bring your company to the future</p>
                                                    </Link>
                                                </div>
                                            </motion.div>
                                        )}

                                        {item === 'Integrations' && activeDropdown === 'Integrations' && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden bg-gray-50 rounded-lg mx-2 mb-2"
                                            >
                                                <div className="p-4 space-y-3">
                                                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Popular integrations</h3>
                                                    {integrationsData.retail.map((integration) => (
                                                        <Link 
                                                            key={integration.name} 
                                                            to={integration.path} 
                                                            className="block py-2 px-2 text-[#002044] text-sm font-medium hover:bg-white rounded transition-colors"
                                                            onClick={() => setIsMenuOpen(false)}
                                                        >
                                                            {integration.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}

                                        {item === 'Resources' && activeDropdown === 'Resources' && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden bg-gray-50 rounded-lg mx-2 mb-2"
                                            >
                                                <div className="p-4 space-y-4">
                                                    <div>
                                                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Knowledge base</h3>
                                                        <Link 
                                                            to="/support-centre" 
                                                            className="flex items-start gap-3 py-2 px-2 rounded hover:bg-white transition-colors"
                                                            onClick={() => setIsMenuOpen(false)}
                                                        >
                                                            <Headset className="text-[#002044] mt-0.5" size={20} />
                                                            <div>
                                                                <div className="text-[#002044] text-sm font-semibold">Support centre</div>
                                                                <div className="text-xs text-gray-600">Get help for all your needs</div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">About Us</h3>
                                                        <Link 
                                                            to="/about-bloom-swift-pos" 
                                                            className="flex items-start gap-3 py-2 px-2 rounded hover:bg-white transition-colors mb-2"
                                                            onClick={() => setIsMenuOpen(false)}
                                                        >
                                                            <Info className="text-[#002044] mt-0.5" size={20} />
                                                            <div>
                                                                <div className="text-[#002044] text-sm font-semibold">About Bloom Swift POS</div>
                                                                <div className="text-xs text-gray-600">Learn our story</div>
                                                            </div>
                                                        </Link>
                                                        <Link 
                                                            to="/success-stories" 
                                                            className="flex items-start gap-3 py-2 px-2 rounded hover:bg-white transition-colors"
                                                            onClick={() => setIsMenuOpen(false)}
                                                        >
                                                            <Award className="text-[#002044] mt-0.5" size={20} />
                                                            <div>
                                                                <div className="text-[#002044] text-sm font-semibold">Success stories</div>
                                                                <div className="text-xs text-gray-600">See how businesses grow</div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}

                            <div className="pt-4 pb-3 border-t border-gray-200">
                                <div className="space-y-3 px-4">
                                    <button
                                        type="button"
                                        className="w-full block py-3 text-sm font-medium transition-colors duration-200 hover:text-orange-500 text-center"
                                        style={{
                                            color: '#002044',
                                            fontFamily: "'Poppins', sans-serif",
                                            fontWeight: 600
                                        }}
                                        onClick={() => {
                                            setIsContactSalesOpen(true);
                                            setIsMenuOpen(false);
                                        }}
                                    >
                                        Contact Sales
                                    </button>
                                    {!currentUser && (
                                        <>
                                            <button
                                                onClick={() => {
                                                    setIsSignupOpen(true);
                                                    setIsMenuOpen(false);
                                                }}
                                                className="w-full py-3 rounded-md font-medium transition-colors duration-200"
                                                style={{
                                                    backgroundColor: '#0055D4',
                                                    color: 'white',
                                                    fontFamily: "'Poppins', sans-serif",
                                                    fontWeight: 600
                                                }}
                                            >
                                                Sign up
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setIsLoginOpen(true);
                                                    setIsMenuOpen(false);
                                                }}
                                                className="w-full py-3 rounded-md font-medium transition-colors duration-200"
                                                style={{
                                                    backgroundColor: '#FF7A00',
                                                    color: 'white',
                                                    fontFamily: "'Poppins', sans-serif",
                                                    fontWeight: 600
                                                }}
                                            >
                                                Log in
                                            </button>
                                        </>
                                    )}
                                    {currentUser && (
                                        <>
                                            <Link
                                                to="/my-tickets"
                                                onClick={() => setIsMenuOpen(false)}
                                                className="w-full block py-3 text-sm font-medium transition-colors duration-200 hover:text-orange-500 text-center"
                                                style={{
                                                    color: '#002044',
                                                    fontFamily: "'Poppins', sans-serif",
                                                    fontWeight: 600
                                                }}
                                            >
                                                My Tickets
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    handleLogout();
                                                    setIsMenuOpen(false);
                                                }}
                                                className="w-full py-3 rounded-md font-medium transition-colors duration-200"
                                                style={{
                                                    backgroundColor: '#FF7A00',
                                                    color: 'white',
                                                    fontFamily: "'Poppins', sans-serif",
                                                    fontWeight: 600
                                                }}
                                            >
                                                Log out
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <SignupForm isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
            <LoginForm
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onLogin={handleLoggedIn}
            />
            <LiveChatModal isOpen={isLiveChatOpen} onClose={() => setIsLiveChatOpen(false)} currentUser={currentUser} />
            <ContactSalesModal
                isOpen={isContactSalesOpen}
                onClose={() => setIsContactSalesOpen(false)}
            />
        </nav>
    );
};

export default Navbar;
