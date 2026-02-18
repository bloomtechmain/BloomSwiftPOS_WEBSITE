import React, { useEffect, useState } from 'react';
import { Users, Ticket, ClipboardList, Edit, Trash2, X, Save } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import API_URL from '../../config/api';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const toast = useToast();

    const fetchData = async () => {
        try {
            const [statsRes, usersRes] = await Promise.all([
                fetch(`${API_URL}/api/registrations/stats`),
                fetch(`${API_URL}/api/registrations/users`)
            ]);

            const statsData = await statsRes.json();
            const usersData = await usersRes.json();

            if (!statsData.success || !usersData.success) {
                throw new Error('Failed to load data');
            }

            setStats(statsData.data);
            setUsers(usersData.data);
        } catch (err) {
            setError(err.message);
            // toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            const res = await fetch(`${API_URL}/api/registrations/users/${userId}`, {
                method: 'DELETE'
            });
            const data = await res.json();

            if (data.success) {
                toast.success('User deleted successfully');
                setUsers(users.filter(u => u.id !== userId));
                // Update stats locally or refetch
                setStats(prev => ({ ...prev, totalUsers: prev.totalUsers - 1 }));
            } else {
                toast.error(data.message || 'Failed to delete user');
            }
        } catch (err) {
            toast.error('Error deleting user');
        }
    };

    const handleEditUser = (user) => {
        setEditingUser({ ...user });
        setIsEditModalOpen(true);
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/api/registrations/users/${editingUser.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingUser)
            });
            const data = await res.json();

            if (data.success) {
                toast.success('User updated successfully');
                setUsers(users.map(u => u.id === editingUser.id ? data.data : u));
                setIsEditModalOpen(false);
                setEditingUser(null);
            } else {
                toast.error(data.message || 'Failed to update user');
            }
        } catch (err) {
            toast.error('Error updating user');
        }
    };

    const cards = [
        {
            title: 'Total Users',
            value: stats ? stats.totalUsers : '-',
            icon: Users,
            color: 'bg-blue-500'
        },
        {
            title: 'POS Requests',
            value: stats ? stats.posRequestsCount : '-',
            icon: ClipboardList,
            color: 'bg-green-500'
        },
        {
            title: 'Ticket Requests',
            value: stats ? stats.ticketRequestsCount : '-',
            icon: Ticket,
            color: 'bg-orange-500'
        },
        {
            title: 'Latest User',
            value: stats && stats.latestUser ? stats.latestUser.fullName : 'No users yet',
            icon: Users,
            color: 'bg-purple-500'
        }
    ];

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-[#002044]">Dashboard Overview</h2>

            {loading && <p className="text-gray-600">Loading data...</p>}
            {error && <p className="text-red-600">Error: {error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                        <div className={`${card.color} p-4 rounded-lg text-white mr-4`}>
                            <card.icon size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">{card.title}</p>
                            <h3 className="text-2xl font-bold text-[#002044]">{card.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-[#002044]">Registered Users</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        {users.length} Users
                    </span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                            <tr>
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">Full Name</th>
                                <th className="px-6 py-4">Username</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Joined Date</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">#{user.id}</td>
                                    <td className="px-6 py-4">{user.full_name}</td>
                                    <td className="px-6 py-4">{user.username}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">{new Date(user.created_at).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button
                                            onClick={() => handleEditUser(user)}
                                            className="text-blue-600 hover:text-blue-800 transition-colors"
                                            title="Edit User"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteUser(user.id)}
                                            className="text-red-600 hover:text-red-800 transition-colors"
                                            title="Delete User"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && !loading && (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit User Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                        <div className="bg-[#002044] p-6 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-white">Edit User</h3>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-white/70 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleUpdateUser} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={editingUser?.full_name || ''}
                                    onChange={(e) => setEditingUser({ ...editingUser, full_name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                <input
                                    type="text"
                                    value={editingUser?.username || ''}
                                    onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={editingUser?.email || ''}
                                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-[#002044] text-white font-medium rounded-lg hover:bg-[#00356b] transition-colors flex items-center gap-2"
                                >
                                    <Save size={18} />
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
