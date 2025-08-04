import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Order {
    id: number;
    customer_name: string;
    destination: string;
    reason: string;
    order_time: string;
    status: string;
    user?: User;
    driver?: User;
    [key: string]: unknown;
}

interface PaginatedOrders {
    data: Order[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    [key: string]: unknown;
}

interface Props {
    orders: PaginatedOrders;
    [key: string]: unknown;
}

export default function OrdersIndex({ orders }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'assigned': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
            case 'in_progress': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
            case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    const getStatusEmoji = (status: string) => {
        switch (status) {
            case 'pending': return '⏳';
            case 'assigned': return '📝';
            case 'in_progress': return '🚗';
            case 'completed': return '✅';
            case 'cancelled': return '❌';
            default: return '❓';
        }
    };

    return (
        <AppShell>
            <Head title="📋 All Orders - TaxiGo" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            📋 Order Management
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Complete order history and management
                        </p>
                    </div>
                    <Link
                        href={route('admin.index')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                        ← Back to Admin
                    </Link>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {['pending', 'assigned', 'in_progress', 'completed', 'cancelled'].map((status) => {
                        const count = orders.data.filter(order => order.status === status).length;
                        return (
                            <div key={status} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center">
                                <div className="text-2xl mb-1">{getStatusEmoji(status)}</div>
                                <div className="text-lg font-semibold text-gray-900 dark:text-white">{count}</div>
                                <div className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                                    {status.replace('_', ' ')}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Orders Table */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            All Orders ({orders.total} total)
                        </h2>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Order ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Customer
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Destination
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Order Time
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Driver
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {orders.data.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                            #{order.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                    👤 {order.customer_name}
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                                                    {order.reason}
                                                </div>
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
                                                {getStatusEmoji(order.status)} {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {order.driver ? `🚗 ${order.driver.name}` : '⏳ Unassigned'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                                            <Link
                                                href={route('orders.show', order.id)}
                                                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                            >
                                                👁️ View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {orders.last_page > 1 && (
                        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Showing page {orders.current_page} of {orders.last_page}
                                </div>
                                <div className="flex space-x-2">
                                    {orders.current_page > 1 && (
                                        <Link
                                            href={`?page=${orders.current_page - 1}`}
                                            className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                                        >
                                            Previous
                                        </Link>
                                    )}
                                    {orders.current_page < orders.last_page && (
                                        <Link
                                            href={`?page=${orders.current_page + 1}`}
                                            className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                                        >
                                            Next
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {orders.data.length === 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
                        <div className="text-6xl mb-4">📋</div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            No Orders Found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Orders will appear here once customers start booking rides.
                        </p>
                    </div>
                )}
            </div>
        </AppShell>
    );
}