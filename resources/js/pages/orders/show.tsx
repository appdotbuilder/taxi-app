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
    created_at: string;
    updated_at: string;
    user?: User;
    driver?: User;
    [key: string]: unknown;
}

interface Props {
    order: Order;
    [key: string]: unknown;
}

export default function OrderShow({ order }: Props) {
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
            <Head title={`📋 Order #${order.id} - TaxiGo`} />
            
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            📋 Order #{order.id}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Order details and status information
                        </p>
                    </div>
                    <Link
                        href={route('orders.index')}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                        ← Back to Orders
                    </Link>
                </div>

                {/* Status Banner */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center justify-center space-x-4">
                        <div className="text-4xl">{getStatusEmoji(order.status)}</div>
                        <div className="text-center">
                            <span className={`px-4 py-2 text-lg font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('_', ' ')}
                            </span>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                Current order status
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Customer Information */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            👤 Customer Information
                        </h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Name:</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {order.customer_name}
                                </span>
                            </div>
                            {order.user && (
                                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Account:</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        📧 {order.user.email}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Trip Details */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            🚗 Trip Details
                        </h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Destination:</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    📍 {order.destination}
                                </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Pick-up Time:</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    ⏰ {new Date(order.order_time).toLocaleString()}
                                </span>
                            </div>
                            {order.driver && (
                                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Driver:</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        🚗 {order.driver.name}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Reason */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        💬 Reason for Trip
                    </h2>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-gray-900 dark:text-white">
                            {order.reason}
                        </p>
                    </div>
                </div>

                {/* Timeline */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        📅 Order Timeline
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
                            <div className="text-2xl">📝</div>
                            <div>
                                <div className="font-medium text-blue-900 dark:text-blue-200">
                                    Order Created
                                </div>
                                <div className="text-sm text-blue-700 dark:text-blue-300">
                                    {new Date(order.created_at).toLocaleString()}
                                </div>
                            </div>
                        </div>
                        
                        {order.status !== 'pending' && (
                            <div className="flex items-center space-x-4 p-3 bg-purple-50 dark:bg-purple-900 rounded-lg">
                                <div className="text-2xl">👨‍✈️</div>
                                <div>
                                    <div className="font-medium text-purple-900 dark:text-purple-200">
                                        Driver Assigned
                                    </div>
                                    <div className="text-sm text-purple-700 dark:text-purple-300">
                                        {order.driver ? `${order.driver.name} assigned to this trip` : 'Driver assignment pending'}
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {order.status === 'in_progress' && (
                            <div className="flex items-center space-x-4 p-3 bg-orange-50 dark:bg-orange-900 rounded-lg">
                                <div className="text-2xl">🚗</div>
                                <div>
                                    <div className="font-medium text-orange-900 dark:text-orange-200">
                                        Trip in Progress
                                    </div>
                                    <div className="text-sm text-orange-700 dark:text-orange-300">
                                        Driver is currently on the way
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {order.status === 'completed' && (
                            <div className="flex items-center space-x-4 p-3 bg-green-50 dark:bg-green-900 rounded-lg">
                                <div className="text-2xl">✅</div>
                                <div>
                                    <div className="font-medium text-green-900 dark:text-green-200">
                                        Trip Completed
                                    </div>
                                    <div className="text-sm text-green-700 dark:text-green-300">
                                        Order successfully completed
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {order.status === 'cancelled' && (
                            <div className="flex items-center space-x-4 p-3 bg-red-50 dark:bg-red-900 rounded-lg">
                                <div className="text-2xl">❌</div>
                                <div>
                                    <div className="font-medium text-red-900 dark:text-red-200">
                                        Trip Cancelled
                                    </div>
                                    <div className="text-sm text-red-700 dark:text-red-300">
                                        Order was cancelled
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Order Metadata */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        📊 Order Metadata
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="text-gray-600 dark:text-gray-400">Order ID:</span>
                            <span className="ml-2 font-medium text-gray-900 dark:text-white">#{order.id}</span>
                        </div>
                        <div>
                            <span className="text-gray-600 dark:text-gray-400">Created:</span>
                            <span className="ml-2 font-medium text-gray-900 dark:text-white">
                                {new Date(order.created_at).toLocaleString()}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-600 dark:text-gray-400">Last Updated:</span>
                            <span className="ml-2 font-medium text-gray-900 dark:text-white">
                                {new Date(order.updated_at).toLocaleString()}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-600 dark:text-gray-400">Status:</span>
                            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${getStatusColor(order.status)}`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('_', ' ')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}