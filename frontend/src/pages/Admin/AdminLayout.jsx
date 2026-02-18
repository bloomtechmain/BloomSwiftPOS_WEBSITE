import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, ClipboardList, LogOut, Menu, X, MonitorSmartphone, Ticket } from 'lucide-react';
import logo from '../../assets/BLOOM_SWIFT_POS_LOGO_TEXT__XXL-removebg-preview.png';
import API_URL from '../../config/api';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [unreadCount, setUnreadCount] = useState(0);
    const [pendingRequestsCount, setPendingRequestsCount] = useState(0);
    const [pendingTicketsCount, setPendingTicketsCount] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchCounts = async () => {
            // Fetch chat unread count
            try {
                const chatRes = await fetch(`${API_URL}/api/chat/unread-count?role=admin`);
                const chatData = await chatRes.json();
                if (chatData.success) setUnreadCount(chatData.count);
            } catch (error) {
                console.error('Error fetching chat count:', error);
            }

            // Fetch pending service requests count
            try {
                const requestsRes = await fetch(`${API_URL}/api/service-requests/count/pending`);
                const requestsData = await requestsRes.json();
                if (requestsData.success) setPendingRequestsCount(requestsData.count);
            } catch (error) {
                console.error('Error fetching requests count:', error);
            }

            // Fetch pending tickets count
            try {
                const ticketsRes = await fetch(`${API_URL}/api/tickets/count/pending`);
                const ticketsData = await ticketsRes.json();
                if (ticketsData.success) setPendingTicketsCount(ticketsData.count);
            } catch (error) {
                console.error('Error fetching tickets count:', error);
            }
        };

        fetchCounts();
        const interval = setInterval(fetchCounts, 5000); // Poll every 5s

        return () => clearInterval(interval);
    }, []);

    console.log('AdminLayout render:', { unreadCount, pendingRequestsCount, pendingTicketsCount });

    const handleLogout = () => {
        try {
            localStorage.removeItem('bloom_user');
        } catch { }
        navigate('/');
        window.location.reload(); // To update Navbar state
    };

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
        { name: 'Live Chat', icon: MessageSquare, path: '/admin/live-chat', badge: unreadCount },
        { name: 'Tickets', icon: Ticket, path: '/admin/tickets' },
        { name: 'Project Requests', icon: ClipboardList, path: '/admin/project-requests' },
        { name: 'Hardware', icon: MonitorSmartphone, path: '/admin/hardware' },
    ];

    return (
        <div className="flex h-screen bg-[#F5F7FB] font-['Poppins']">
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 text-gray-600 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0 lg:static lg:inset-auto shadow-lg lg:shadow-none`}
            >
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-[#002044] flex items-center justify-center overflow-hidden shadow-md">
                            <img src={logo} alt="Bloom Swift POS logo" className="h-8 w-8 object-contain brightness-0 invert" />
                        </div>
                        <div>
                            <div className="text-xs font-semibold text-[#FF7A00] tracking-wide uppercase">
                                Bloom Swift
                            </div>
                            <div className="text-sm font-bold text-[#002044]">
                                Admin Console
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-[#002044]">
                        <X size={24} />
                    </button>
                </div>

                <nav className="px-3 py-4 space-y-1 text-sm">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-[#002044] text-white shadow-md shadow-blue-900/20'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-[#002044]'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon size={20} className={isActive ? 'text-[#FF7A00]' : 'text-gray-400 group-hover:text-[#002044]'} />
                                    <span className="font-medium">{item.name}</span>
                                </div>
                                {item.badge > 0 && (
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-[#FF7A00] text-white' : 'bg-red-100 text-red-600'
                                        }`}>
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors text-sm font-medium"
                    >
                        <LogOut size={20} />
                        <span>Log Out</span>
                    </button>
                </div>
            </aside>

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-20 bg-white border-b border-gray-200 flex items-center px-4 lg:px-8 justify-between shadow-sm z-10">
                    <div className="flex items-center gap-3 lg:hidden">
                        <button onClick={() => setIsSidebarOpen(true)} className="text-gray-600 hover:text-[#002044]">
                            <Menu size={24} />
                        </button>
                        <span className="text-sm font-semibold text-[#002044]">
                            Bloom Swift Admin
                        </span>
                    </div>
                    <div className="hidden lg:flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-500">
                            Welcome back, Admin
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full border border-green-100">
                            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs font-semibold">System Online</span>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-[#002044] font-bold">
                            A
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-auto bg-[#F5F7FB] p-4 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
