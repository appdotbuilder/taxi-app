import { type SharedData } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [formData, setFormData] = useState({
        customer_name: '',
        destination: '',
        reason: '',
        order_time: '',
    });
    const [showOrderForm, setShowOrderForm] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('orders.store'), formData, {
            onSuccess: () => {
                setFormData({
                    customer_name: '',
                    destination: '',
                    reason: '',
                    order_time: '',
                });
                setShowOrderForm(false);
            },
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <Head title="🚕 TaxiGo - Online Taxi Booking">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6 text-gray-900 lg:justify-center lg:p-8 dark:from-gray-900 dark:to-gray-800 dark:text-white">
                <header className="mb-6 w-full max-w-4xl">
                    <nav className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <span className="text-3xl">🚕</span>
                            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">TaxiGo</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-lg border border-blue-600 px-6 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-800"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                <main className="flex w-full max-w-6xl flex-col lg:flex-row lg:gap-12 items-center">
                    <div className="flex-1 text-center lg:text-left mb-8 lg:mb-0">
                        <h2 className="text-5xl font-bold mb-6 leading-tight">
                            🚗 Your Ride, <br />
                            <span className="text-blue-600 dark:text-blue-400">Your Way</span>
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                            Book a taxi instantly with our easy-to-use platform. Whether you need a ride to the airport, 
                            a doctor's appointment, or anywhere else - we've got you covered!
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                                <div className="text-3xl mb-3">📱</div>
                                <h3 className="font-semibold mb-2">Easy Booking</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    Book your ride in seconds with our simple form
                                </p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                                <div className="text-3xl mb-3">🚗</div>
                                <h3 className="font-semibold mb-2">Professional Drivers</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    Experienced and verified drivers for your safety
                                </p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                                <div className="text-3xl mb-3">⏰</div>
                                <h3 className="font-semibold mb-2">On-Time Service</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    Schedule your rides and we'll be there on time
                                </p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                                <div className="text-3xl mb-3">💰</div>
                                <h3 className="font-semibold mb-2">Fair Pricing</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    Transparent and competitive pricing for all rides
                                </p>
                            </div>
                        </div>

                        {!showOrderForm && (
                            <button
                                onClick={() => setShowOrderForm(true)}
                                className="inline-block rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-lg font-semibold text-white hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all shadow-lg"
                            >
                                🚕 Book Your Ride Now
                            </button>
                        )}
                    </div>

                    <div className="flex-1 max-w-md w-full">
                        {showOrderForm ? (
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
                                <h3 className="text-2xl font-bold mb-6 text-center">📝 Book Your Taxi</h3>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">👤 Your Name</label>
                                        <input
                                            type="text"
                                            name="customer_name"
                                            value={formData.customer_name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">📍 Destination</label>
                                        <input
                                            type="text"
                                            name="destination"
                                            value={formData.destination}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
                                            placeholder="Where do you want to go?"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">⏰ Pick-up Time</label>
                                        <input
                                            type="datetime-local"
                                            name="order_time"
                                            value={formData.order_time}
                                            onChange={handleInputChange}
                                            required
                                            min={new Date().toISOString().slice(0, 16)}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">💬 Reason</label>
                                        <textarea
                                            name="reason"
                                            value={formData.reason}
                                            onChange={handleInputChange}
                                            required
                                            rows={3}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
                                            placeholder="Tell us why you need the ride (e.g., Airport pickup, Doctor appointment)"
                                        />
                                    </div>
                                    <div className="flex gap-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setShowOrderForm(false)}
                                            className="flex-1 py-3 px-4 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors dark:border-gray-600 dark:hover:bg-gray-700"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all"
                                        >
                                            🚕 Book Now
                                        </button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 text-center">
                                <div className="text-6xl mb-4">🚕</div>
                                <h3 className="text-2xl font-bold mb-4">Ready to Go?</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    Join thousands of satisfied customers who trust TaxiGo for their transportation needs.
                                </p>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                                        <span>⭐⭐⭐⭐⭐</span>
                                        <span>4.9/5 Customer Rating</span>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        🚗 50+ Professional Drivers Available
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>

                <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>
                        Built with ❤️ for better transportation experiences
                    </p>
                </footer>
            </div>
        </>
    );
}