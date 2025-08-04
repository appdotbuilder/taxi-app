import React from 'react';
import { Head, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface User {
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
    [key: string]: unknown;
}

interface Props {
    driver: User;
    currentOrder?: Order;
    [key: string]: unknown;
}

export default function DriverIndex({ driver, currentOrder }: Props) {
    const handleAction = (action: 'start' | 'finish') => {
        router.post(route('driver.store'), {
            action: action,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const getStatusDisplay = (status: string) => {
        switch (status) {
            case 'ready': return { emoji: '✅', text: 'Ready for Orders', color: 'text-green-600' };
            case 'on_road': return { emoji: '🚗', text: 'On the Road', color: 'text-yellow-600' };
            case 'offline': return { emoji: '❌', text: 'Offline', color: 'text-gray-600' };
            default: return { emoji: '❓', text: 'Unknown', color: 'text-gray-600' };
        }
    };

    const statusDisplay = getStatusDisplay(driver.status);

    return (
        <AppShell>
            <Head title="🚗 Driver Dashboard - TaxiGo" />
            
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        🚗 Driver Dashboard
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Welcome back, {driver.name}!
                    </p>
                </div>

                {/* Status Card */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
                    <div className="text-6xl mb-4">{statusDisplay.emoji}</div>
                    <h2 className={`text-2xl font-semibold mb-2 ${statusDisplay.color}`}>
                        {statusDisplay.text}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {driver.status === 'ready' && 'You are available to accept new orders'}
                        {driver.status === 'on_road' && 'You are currently on a trip'}
                        {driver.status === 'offline' && 'You are not available for orders'}
                    </p>

                    {/* Action Buttons */}
                    <div className="space-y-4">
                        {driver.status === 'ready' && currentOrder && (
                            <button
                                onClick={() => handleAction('start')}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg text-lg transition-colors"
                            >
                                🚀 Start Trip
                            </button>
                        )}
                        
                        {driver.status === 'on_road' && (
                            <button
                                onClick={() => handleAction('finish')}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg text-lg transition-colors"
                            >
                                ✅ Selesai (Finish Trip)
                            </button>
                        )}

                        {driver.status === 'ready' && !currentOrder && (
                            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6">
                                <div className="text-4xl mb-3">⏳</div>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Waiting for order assignment...
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Current Order Details */}
                {currentOrder && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            📋 Current Order
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Customer:</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    👤 {currentOrder.customer_name}
                                </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Destination:</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    📍 {currentOrder.destination}
                                </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Pick-up Time:</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    ⏰ {new Date(currentOrder.order_time).toLocaleString()}
                                </span>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2">Reason:</span>
                                <span className="text-gray-900 dark:text-white">
                                    💬 {currentOrder.reason}
                                </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
                                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Status:</span>
                                <span className="font-semibold text-blue-900 dark:text-blue-200">
                                    {currentOrder.status === 'assigned' ? '📝 Assigned' : 
                                     currentOrder.status === 'in_progress' ? '🚗 In Progress' : 
                                     currentOrder.status}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Driver Stats */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        📊 Quick Stats
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {driver.status === 'ready' ? '✅' : driver.status === 'on_road' ? '🚗' : '❌'}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Current Status
                            </div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {currentOrder ? '1' : '0'}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Active Orders
                            </div>
                        </div>
                    </div>
                </div>

                {/* Instructions */}
                <div className="bg-blue-50 dark:bg-blue-900 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-3">
                        📖 How it Works
                    </h3>
                    <div className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
                        <p>• When assigned an order, click <strong>"Start Trip"</strong> to begin</p>
                        <p>• Your status will change to <strong>"On the Road"</strong></p>
                        <p>• When you complete the trip, click <strong>"Selesai"</strong> to finish</p>
                        <p>• You'll return to <strong>"Ready"</strong> status and can accept new orders</p>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}