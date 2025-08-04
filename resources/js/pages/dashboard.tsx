import { AppShell } from '@/components/app-shell';
import { Head, Link, usePage } from '@inertiajs/react';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
}

interface SharedData {
    auth: {
        user: User;
    };
    [key: string]: unknown;
}

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    return (
        <AppShell>
            <Head title="🏠 Dashboard - TaxiGo" />
            
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        🏠 Welcome to TaxiGo Dashboard
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Hello, {user.name}! You are logged in as a <strong>{user.role}</strong>.
                    </p>
                </div>

                {/* Role-based Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {user.role === 'admin' && (
                        <>
                            <Link
                                href={route('admin.index')}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow group"
                            >
                                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🛠️</div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    Admin Panel
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    Manage drivers, view orders, and monitor system status
                                </p>
                            </Link>
                            <Link
                                href={route('orders.index')}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow group"
                            >
                                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📋</div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    All Orders
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    View detailed order history and manage assignments
                                </p>
                            </Link>
                        </>
                    )}

                    {user.role === 'driver' && (
                        <Link
                            href={route('driver.index')}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow group"
                        >
                            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🚗</div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Driver Console
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Manage your trips and update your status
                            </p>
                        </Link>
                    )}

                    {user.role === 'user' && (
                        <Link
                            href={route('home')}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow group"
                        >
                            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🚕</div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Book a Ride
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Place a new taxi order for your next trip
                            </p>
                        </Link>
                    )}

                    {/* Common features for all users */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                        <div className="text-4xl mb-3">👤</div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Your Profile
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                            Manage your account settings and preferences
                        </p>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Name:</span>
                                <span className="font-medium">{user.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Email:</span>
                                <span className="font-medium">{user.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Role:</span>
                                <span className="font-medium capitalize">{user.role}</span>
                            </div>
                            {user.role === 'driver' && (
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Status:</span>
                                    <span className={`font-medium ${
                                        user.status === 'ready' ? 'text-green-600' :
                                        user.status === 'on_road' ? 'text-yellow-600' :
                                        'text-gray-600'
                                    }`}>
                                        {user.status === 'ready' ? '✅ Ready' :
                                         user.status === 'on_road' ? '🚗 On Road' :
                                         '❌ Offline'}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* System Info */}
                <div className="bg-blue-50 dark:bg-blue-900 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-3">
                        🚕 TaxiGo System
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="text-blue-800 dark:text-blue-300">
                            <strong>For Users:</strong> Book rides easily through our simple order form
                        </div>
                        <div className="text-blue-800 dark:text-blue-300">
                            <strong>For Drivers:</strong> Simple interface with Start and Selesai buttons
                        </div>
                        <div className="text-blue-800 dark:text-blue-300">
                            <strong>For Admins:</strong> Complete dashboard to manage drivers and orders
                        </div>
                    </div>
                </div>

                {/* Quick Stats (visible to all users) */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        📊 System Overview
                    </h3>
                    <div className="text-center text-gray-600 dark:text-gray-400">
                        <p>Welcome to the TaxiGo platform! Your role-specific features are available above.</p>
                        <p className="mt-2 text-sm">
                            {user.role === 'admin' && 'As an admin, you have full access to manage the system.'}
                            {user.role === 'driver' && 'As a driver, you can manage your trips and status.'}
                            {user.role === 'user' && 'As a user, you can book rides and track your orders.'}
                        </p>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}