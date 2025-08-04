import React from 'react';
import { Head, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Driver {
    id: number;
    name: string;
    email: string;
    status: string;
    [key: string]: unknown;
}

interface Order {
    id: number;
    customer_name: string;
    destination: string;
    reason: string;
    order_time: string;
    status: string;
    user?: { name: string };
    driver?: { name: string };
    [key: string]: unknown;
}

interface Stats {
    total_orders: number;
    pending_orders: number;
    active_drivers: number;
    busy_drivers: number;
}

interface Props {
    drivers: Driver[];
    orders: Order[];
    stats: Stats;
    [key: string]: unknown;
}

export default function AdminIndex({ drivers, orders, stats }: Props) {
    const handleDriverAction = (driverId: number, action: 'approve' | 'reset') => {
        router.post(route('admin.store'), {
            driver_id: driverId,
            action: action,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'ready': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'on_road': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'offline': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
            case 'pending': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'assigned': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
            case 'in_progress': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
            case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    return (
        <AppShell>
            <Head title="🛠️ Admin Dashboard - TaxiGo" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        🛠️ Admin Dashboard
                    </h1>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Real-time system overview
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">📊</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.total_orders}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">⏳</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Orders</p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.pending_orders}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">✅</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Ready Drivers</p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.active_drivers}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">🚗</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Busy Drivers</p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.busy_drivers}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Drivers Management */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            🚗 Driver Management
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Monitor and manage driver status
                        </p>
                    </div>
                    <div className="p-6">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-900">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Driver
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {drivers.map((driver) => (
                                        <tr key={driver.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {driver.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        {driver.email}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(driver.status)}`}>
                                                    {driver.status === 'ready' ? '✅ Ready' : 
                                                     driver.status === 'on_road' ? '🚗 On Road' : 
                                                     '❌ Offline'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                                                {driver.status === 'ready' && (
                                                    <button
                                                        onClick={() => handleDriverAction(driver.id, 'approve')}
                                                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-medium"
                                                    >
                                                        🚗 Send on Trip
                                                    </button>
                                                )}
                                                {driver.status === 'on_road' && (
                                                    <button
                                                        onClick={() => handleDriverAction(driver.id, 'reset')}
                                                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium"
                                                    >
                                                        ↩️ Mark Ready
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            📋 Recent Orders
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Latest order requests and status
                        </p>
                    </div>
                    <div className="p-6">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-900">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Customer
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Destination
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Time
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Driver
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {orders.map((order) => (
                                        <tr key={order.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {order.customer_name}
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    {order.reason}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                📍 {order.destination}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                ⏰ {new Date(order.order_time).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {order.driver ? `🚗 ${order.driver.name}` : '⏳ Not assigned'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}