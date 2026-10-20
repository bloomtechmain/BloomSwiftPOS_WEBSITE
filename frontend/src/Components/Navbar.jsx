import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../context/ToastContext';
import { useUI } from '../context/UIContext';
import {
    Car, Shirt, ShoppingBasket, Store,
    UtensilsCrossed, Scissors, Coffee, Hotel, Beer,
    Pizza, Headset, Info, Award, Wrench, Ticket, ClipboardList, Croissant, ChevronDown, Cloud, ArrowRight, Menu, X
} from 'lucide-react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import LiveChatModal from './LiveChatModal';
import ContactSalesModal from './ContactSalesModal';
import API_URL from '../config/api';

export const Logo = ({ dark = false }) => (
    <span className="flex items-center gap-3">
        <span className="w-14 h-14 sm:w-16 sm:h-16 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16 rounded-xl bg-white inline-flex items-center justify-center shrink-0">
            <img src="/images/logo-mark-tight.png" alt="Bloom Swift POS logo" className="w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] xl:w-[52px] xl:h-[52px] 2xl:w-[60px] 2xl:h-[60px] object-contain" />
        </span>
        <span className={`text-[1.65rem] sm:text-[2rem] xl:text-2xl 2xl:text-[2rem] font-extrabold tracking-tight leading-none whitespace-nowrap ${dark ? 'text-white' : 'text-navy'}`}>
            Bloom Swift <span className="text-brand-orange">POS</span>
        </span>
    </span>
);

const DropdownLink = ({ to, icon: Icon, title, text, onClick }) => (
    <Link to={to} onClick={onClick} className="group flex items-start gap-3 rounded-xl p-3 -m-3 hover:bg-grey-light transition-colors">
        <span className="w-10 h-10 rounded-lg bg-grey-light group-hover:bg-navy group-hover:text-white text-navy-mid inline-flex items-center justify-center shrink-0 transition-colors">
            <Icon size={20} strokeWidth={1.75} />
        </span>
        <span>
            <span className="block font-bold text-navy">{title}</span>
            {text && <span className="block text-sm text-gray-500 mt-0.5">{text}</span>}
        </span>
    </Link>
);

const MobileGroupTitle = ({ children }) => (
    <h3 className="font-mono text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">{children}</h3>
);

const Navbar = () => {
    const toast = useToast();
    const { isContactSalesOpen, setIsContactSalesOpen } = useUI();
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

    // Close menus on navigation
    useEffect(() => {
        setActiveDropdown(null);
        setIsMenuOpen(false);
    }, [location.pathname]);

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
        'Pricing',
        'Shop Hardware'
    ];
    const dropdownItems = ['Solutions', 'Integrations', 'Resources'];
    const linkItems = { 'Pricing': '/pricing', 'Shop Hardware': '/hardware' };

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

    const isActive = (item) =>
        activeDropdown === item || (linkItems[item] && location.pathname.startsWith(linkItems[item]));

    return (
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border-grey w-full">
            <div className="w-full px-4 sm:px-8 lg:px-12">
                <div className="flex justify-between items-center h-20 gap-4 2xl:gap-6">

                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 z-20 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy">
                        <Logo />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden xl:flex items-center flex-1 h-full">
                        <ul className="flex gap-1 h-full items-center flex-1 justify-center">
                            {navItems.map((item) => (
                                <li
                                    key={item}
                                    className="h-full flex items-center relative"
                                    onMouseEnter={() => dropdownItems.includes(item) ? setActiveDropdown(item) : setActiveDropdown(null)}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    {linkItems[item] ? (
                                        <Link
                                            to={linkItems[item]}
                                            className={`relative px-3 2xl:px-4 py-2 text-sm font-bold whitespace-nowrap rounded-lg transition-colors ${isActive(item) ? 'text-navy bg-grey-light' : 'text-navy-mid hover:text-navy hover:bg-grey-light'}`}
                                        >
                                            {item}
                                        </Link>
                                    ) : (
                                        <button
                                            type="button"
                                            aria-expanded={activeDropdown === item}
                                            onClick={() => setActiveDropdown(activeDropdown === item ? null : item)}
                                            onFocus={() => setActiveDropdown(item)}
                                            className={`px-3 2xl:px-4 py-2 text-sm font-bold whitespace-nowrap rounded-lg transition-colors flex items-center gap-1.5 ${isActive(item) ? 'text-navy bg-grey-light' : 'text-navy-mid hover:text-navy hover:bg-grey-light'}`}
                                        >
                                            {item}
                                            <ChevronDown size={15} className={`transition-transform ${activeDropdown === item ? 'rotate-180' : ''}`} />
                                        </button>
                                    )}
                                    {isActive(item) && <span className="absolute bottom-0 left-3 right-3 2xl:left-4 2xl:right-4 h-0.5 bg-brand-orange" aria-hidden="true" />}

                                    {/* Dropdown Menus */}
                                    <AnimatePresence>
                                        {item === 'Solutions' && activeDropdown === 'Solutions' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 8 }}
                                                transition={{ duration: 0.18 }}
                                                className="absolute top-full left-1/2 -translate-x-1/2 w-[880px] bg-white rounded-b-2xl shadow-[8px_8px_0_0_#101D36] overflow-hidden"
                                            >
                                                <div className="grid grid-cols-12 p-8 gap-8">
                                                    <div className="col-span-8">
                                                        <MobileGroupTitle>By Industry</MobileGroupTitle>
                                                        <div className="grid grid-cols-2 gap-1">
                                                            {solutionsData.byIndustry.map((subItem, idx) => (
                                                                <Link key={idx} to={subItem.path} className="flex items-center gap-3 group rounded-lg px-3 py-2.5 hover:bg-grey-light transition-colors">
                                                                    <span className="w-9 h-9 rounded-lg bg-grey-light group-hover:bg-navy group-hover:text-white text-navy-mid inline-flex items-center justify-center transition-colors">
                                                                        <subItem.icon size={18} strokeWidth={1.75} />
                                                                    </span>
                                                                    <span className="text-navy font-semibold">{subItem.name}</span>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Cloud Based POS */}
                                                    <div className="col-span-4">
                                                        <Link to="/cloud-based-pos" className="group relative block h-full rounded-xl overflow-hidden bg-navy text-white">
                                                            <img src="/images/general/pos-stand-2.webp" alt="Tablet point of sale on a shop counter" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-[1200ms]" />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
                                                            <div className="relative h-full p-6 flex flex-col justify-end">
                                                                <Cloud size={22} className="mb-3" />
                                                                <h4 className="font-extrabold text-lg">Cloud Based POS</h4>
                                                                <p className="text-sm text-white/70 mt-1">Bring your company to the future</p>
                                                                <span className="mt-4 w-12 h-1 bg-brand-orange" />
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>

                                                {/* Dropdown Footer */}
                                                <button
                                                    type="button"
                                                    onClick={() => setIsContactSalesOpen(true)}
                                                    className="group w-full bg-grey-light hover:bg-grey-hover px-8 py-5 flex items-center justify-between gap-6 transition-colors cursor-pointer text-left"
                                                >
                                                    <span>
                                                        <span className="block font-extrabold text-navy">Lets get Started</span>
                                                        <span className="block text-sm text-gray-600">Come Find the Bloom difference, A POS system that works for you</span>
                                                    </span>
                                                    <ArrowRight size={20} className="text-brand-orange transition-transform group-hover:translate-x-1" />
                                                </button>
                                            </motion.div>
                                        )}
                                        {item === 'Integrations' && activeDropdown === 'Integrations' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 8 }}
                                                transition={{ duration: 0.18 }}
                                                className="absolute top-full left-0 w-[420px] bg-white rounded-b-2xl shadow-[8px_8px_0_0_#101D36] overflow-hidden"
                                            >
                                                <div className="p-8">
                                                    <MobileGroupTitle>Popular integrations</MobileGroupTitle>
                                                    <div className="flex flex-col">
                                                        {integrationsData.retail.map((integration, i) => (
                                                            <Link
                                                                key={integration.name}
                                                                to={integration.path}
                                                                className="group flex items-center gap-4 py-3.5 border-b border-border-grey last:border-b-0 text-navy font-bold"
                                                            >
                                                                <span className="font-mono text-xs text-brand-orange">{String(i + 1).padStart(2, '0')}</span>
                                                                <span className="flex-1">{integration.name}</span>
                                                                <ArrowRight size={16} className="text-gray-300 group-hover:text-brand-orange group-hover:translate-x-1 transition-all" />
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                        {item === 'Resources' && activeDropdown === 'Resources' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 8 }}
                                                transition={{ duration: 0.18 }}
                                                className="absolute top-full left-0 w-[640px] bg-white rounded-b-2xl shadow-[8px_8px_0_0_#101D36] overflow-hidden"
                                            >
                                                <div className="grid grid-cols-2 gap-8 p-8">
                                                    <div>
                                                        <MobileGroupTitle>Knowledge base</MobileGroupTitle>
                                                        <DropdownLink to="/support-centre" icon={Headset} title="Support centre" text="Get help for all your Bloom Swift POS needs" />
                                                    </div>
                                                    <div>
                                                        <MobileGroupTitle>About Bloom Swift POS</MobileGroupTitle>
                                                        <div className="space-y-6">
                                                            <DropdownLink to="/about-bloom-swift-pos" icon={Info} title="About Bloom Swift POS" text="Learn more about our story and mission" />
                                                            <DropdownLink to="/success-stories" icon={Award} title="Success stories" text="See how businesses grow with Bloom Swift POS" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </li>
                            ))}
                        </ul>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setIsContactSalesOpen(true)}
                                className="px-4 py-2.5 text-sm font-bold text-navy hover:bg-grey-light rounded-lg transition-colors whitespace-nowrap"
                            >
                                Contact Sales
                            </button>
                            {!currentUser && (
                                <>
                                    <button
                                        onClick={() => setIsSignupOpen(true)}
                                        className="px-5 py-2.5 rounded-xl text-sm font-bold bg-navy text-white hover:bg-navy-mid transition-colors whitespace-nowrap"
                                    >
                                        Sign up
                                    </button>
                                    <button
                                        onClick={() => setIsLoginOpen(true)}
                                        className="px-5 py-2.5 rounded-xl text-sm font-bold bg-brand-orange text-white hover:bg-brand-orange-dark transition-colors whitespace-nowrap"
                                    >
                                        Log in
                                    </button>
                                </>
                            )}
                            {currentUser && (
                                <div className="flex items-center gap-1">
                                    <Link
                                        to="/my-pos-requests"
                                        className="px-3 py-2 rounded-lg text-xs font-bold text-navy hover:bg-grey-light flex items-center gap-1.5 whitespace-nowrap"
                                    >
                                        <ClipboardList size={16} />
                                        My POS Requests
                                    </Link>
                                    <Link
                                        to="/my-tickets"
                                        className="px-3 py-2 rounded-lg text-xs font-bold text-navy hover:bg-grey-light flex items-center gap-1.5 whitespace-nowrap"
                                    >
                                        <Ticket size={16} />
                                        My Tickets
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => navigate('/account')}
                                        className="px-3 py-2 rounded-lg text-xs font-bold text-navy hover:bg-grey-light whitespace-nowrap"
                                    >
                                        {currentUser.fullName || currentUser.username}
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="ml-1 px-4 py-2 rounded-xl text-xs font-bold bg-navy text-white hover:bg-navy-mid transition-colors whitespace-nowrap"
                                    >
                                        Log out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="xl:hidden flex items-center gap-1">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="w-11 h-11 rounded-xl inline-flex items-center justify-center text-navy hover:bg-grey-light"
                            aria-label="Toggle menu"
                            aria-expanded={isMenuOpen}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="xl:hidden max-h-[calc(100vh-5rem)] overflow-y-auto pb-6">
                        <div className="pt-2 border-t border-border-grey">
                            {navItems.map((item) => (
                                <div key={item} className="border-b border-border-grey">
                                    <button
                                        type="button"
                                        className={`w-full flex items-center justify-between py-4 text-base font-bold transition-colors ${activeDropdown === item ? 'text-navy' : 'text-navy-mid'}`}
                                        onClick={(e) => {
                                            if (dropdownItems.includes(item)) {
                                                e.preventDefault();
                                                setActiveDropdown(activeDropdown === item ? null : item);
                                            } else {
                                                e.preventDefault();
                                                navigate(linkItems[item]);
                                                setIsMenuOpen(false);
                                            }
                                        }}
                                    >
                                        <span>{item}</span>
                                        {dropdownItems.includes(item) ? (
                                            <ChevronDown className={`transition-transform duration-200 ${activeDropdown === item ? 'rotate-180' : ''}`} size={20} />
                                        ) : (
                                            <ArrowRight size={18} className="text-brand-orange" />
                                        )}
                                    </button>

                                    {/* Mobile Dropdown Content */}
                                    <AnimatePresence>
                                        {item === 'Solutions' && activeDropdown === 'Solutions' && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pb-5">
                                                    <MobileGroupTitle>By Industry</MobileGroupTitle>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {solutionsData.byIndustry.map((subItem, idx) => (
                                                            <Link
                                                                key={idx}
                                                                to={subItem.path}
                                                                className="flex items-center gap-2.5 py-2.5 px-3 rounded-lg bg-grey-light hover:bg-grey-hover transition-colors"
                                                                onClick={() => setIsMenuOpen(false)}
                                                            >
                                                                <subItem.icon className="text-navy-mid shrink-0" size={18} strokeWidth={1.75} />
                                                                <span className="text-navy text-sm font-semibold">{subItem.name}</span>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                    <Link
                                                        to="/cloud-based-pos"
                                                        className="flex items-center justify-between bg-navy text-white p-4 rounded-xl mt-3"
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        <span>
                                                            <span className="block font-bold text-sm">Cloud Based POS</span>
                                                            <span className="block text-xs text-white/70">Bring your company to the future</span>
                                                        </span>
                                                        <ArrowRight size={18} className="text-brand-orange" />
                                                    </Link>
                                                </div>
                                            </motion.div>
                                        )}

                                        {item === 'Integrations' && activeDropdown === 'Integrations' && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pb-5">
                                                    <MobileGroupTitle>Popular integrations</MobileGroupTitle>
                                                    {integrationsData.retail.map((integration) => (
                                                        <Link
                                                            key={integration.name}
                                                            to={integration.path}
                                                            className="block py-2.5 px-3 text-navy text-sm font-semibold rounded-lg hover:bg-grey-light transition-colors"
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
                                                transition={{ duration: 0.25 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pb-5 space-y-5">
                                                    <div>
                                                        <MobileGroupTitle>Knowledge base</MobileGroupTitle>
                                                        <Link to="/support-centre" className="flex items-start gap-3 py-2 px-3 rounded-lg hover:bg-grey-light" onClick={() => setIsMenuOpen(false)}>
                                                            <Headset className="text-navy-mid mt-0.5" size={20} />
                                                            <div>
                                                                <div className="text-navy text-sm font-semibold">Support centre</div>
                                                                <div className="text-xs text-gray-500">Get help for all your needs</div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                    <div>
                                                        <MobileGroupTitle>About Us</MobileGroupTitle>
                                                        <Link to="/about-bloom-swift-pos" className="flex items-start gap-3 py-2 px-3 rounded-lg hover:bg-grey-light" onClick={() => setIsMenuOpen(false)}>
                                                            <Info className="text-navy-mid mt-0.5" size={20} />
                                                            <div>
                                                                <div className="text-navy text-sm font-semibold">About Bloom Swift POS</div>
                                                                <div className="text-xs text-gray-500">Learn our story</div>
                                                            </div>
                                                        </Link>
                                                        <Link to="/success-stories" className="flex items-start gap-3 py-2 px-3 rounded-lg hover:bg-grey-light" onClick={() => setIsMenuOpen(false)}>
                                                            <Award className="text-navy-mid mt-0.5" size={20} />
                                                            <div>
                                                                <div className="text-navy text-sm font-semibold">Success stories</div>
                                                                <div className="text-xs text-gray-500">See how businesses grow</div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}

                            <div className="pt-5 space-y-3">
                                <button
                                    type="button"
                                    className="w-full py-3 rounded-xl text-sm font-bold text-navy bg-grey-light"
                                    onClick={() => {
                                        setIsContactSalesOpen(true);
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    Contact Sales
                                </button>
                                {!currentUser && (
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => {
                                                setIsSignupOpen(true);
                                                setIsMenuOpen(false);
                                            }}
                                            className="w-full py-3 rounded-xl font-bold bg-navy text-white"
                                        >
                                            Sign up
                                        </button>
                                        <button
                                            onClick={() => {
                                                setIsLoginOpen(true);
                                                setIsMenuOpen(false);
                                            }}
                                            className="w-full py-3 rounded-xl font-bold bg-brand-orange text-white"
                                        >
                                            Log in
                                        </button>
                                    </div>
                                )}
                                {currentUser && (
                                    <div className="grid grid-cols-2 gap-3">
                                        <Link
                                            to="/my-tickets"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="w-full py-3 rounded-xl text-sm font-bold text-navy bg-grey-light text-center"
                                        >
                                            My Tickets
                                        </Link>
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setIsMenuOpen(false);
                                            }}
                                            className="w-full py-3 rounded-xl font-bold bg-navy text-white"
                                        >
                                            Log out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* Portalled to <body>: the nav's backdrop-blur would otherwise become the containing block for these fixed modals. */}
            {typeof document !== 'undefined' && createPortal(
                <>
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
                </>,
                document.body
            )}
        </nav>
    );
};

export default Navbar;
