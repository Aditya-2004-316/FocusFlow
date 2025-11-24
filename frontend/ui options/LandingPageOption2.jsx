import React, { useState } from "react";

const LandingPage = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    const handleRegisterClick = () => {
        setIsRegisterOpen(true);
        setIsLoginOpen(false);
    };

    const handleLoginClick = () => {
        setIsLoginOpen(true);
        setIsRegisterOpen(false);
    };

    const handleCloseModal = () => {
        setIsLoginOpen(false);
        setIsRegisterOpen(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
            {/* Navbar */}
            <nav className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                        FocusFlow
                    </div>
                    <button
                        onClick={handleRegisterClick}
                        className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-purple-300 transition-all hover:scale-105"
                    >
                        Get Started
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-6 py-20 text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                    Unlock Your Productivity with{" "}
                    <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                        FocusFlow
                    </span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                    FocusFlow is your all-in-one platform for task management
                    and time tracking. Achieve more, stress less—always free,
                    with no hidden fees.
                </p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={handleRegisterClick}
                        className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-10 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-purple-300 transition-all hover:scale-105"
                    >
                        Get Started
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
                    Why Choose{" "}
                    <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                        FocusFlow?
                    </span>
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white rounded-3xl p-8 shadow-lg shadow-purple-100 border border-purple-100 hover:shadow-xl hover:shadow-purple-200 transition-all hover:-translate-y-2">
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-5">
                            <svg
                                className="w-7 h-7 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-900">
                            Effortless Task Management
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Organize your day with a simple drag-and-drop
                            interface, custom categories, and smart reminders.
                        </p>
                    </div>
                    <div className="bg-white rounded-3xl p-8 shadow-lg shadow-purple-100 border border-purple-100 hover:shadow-xl hover:shadow-purple-200 transition-all hover:-translate-y-2">
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-5">
                            <svg
                                className="w-7 h-7 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-900">
                            Built-in Time Tracking
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Monitor your focus and track time spent on tasks and
                            projects. Get detailed insights to help you work
                            smarter, not harder.
                        </p>
                    </div>
                    <div className="bg-white rounded-3xl p-8 shadow-lg shadow-purple-100 border border-purple-100 hover:shadow-xl hover:shadow-purple-200 transition-all hover:-translate-y-2">
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-5">
                            <svg
                                className="w-7 h-7 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-900">
                            Collaborate with Anyone
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Share workspaces, assign tasks, and stay in sync
                            with friends, family, or teammates.
                        </p>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-gradient-to-br from-purple-50 to-white py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
                        Loved by Our{" "}
                        <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                            Community
                        </span>
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-3xl p-8 shadow-lg shadow-purple-100 border border-purple-100">
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="w-5 h-5 text-purple-500"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-gray-700 mb-6 italic leading-relaxed">
                                "FocusFlow is the best productivity tool I've
                                ever used. No paywalls, just pure value!"
                            </p>
                            <div>
                                <div className="font-semibold text-purple-600">
                                    Sarah Johnson
                                </div>
                                <div className="text-sm text-gray-500">
                                    Project Manager
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-3xl p-8 shadow-lg shadow-purple-100 border border-purple-100">
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="w-5 h-5 text-purple-500"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-gray-700 mb-6 italic leading-relaxed">
                                "Finally, a platform that gives me everything I
                                need to stay organized—without asking for my
                                credit card."
                            </p>
                            <div>
                                <div className="font-semibold text-purple-600">
                                    Michael Chen
                                </div>
                                <div className="text-sm text-gray-500">
                                    Software Developer
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-3xl p-8 shadow-lg shadow-purple-100 border border-purple-100">
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="w-5 h-5 text-purple-500"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-gray-700 mb-6 italic leading-relaxed">
                                "As a freelancer, FocusFlow helps me stay on top
                                of my work and deadlines."
                            </p>
                            <div>
                                <div className="font-semibold text-purple-600">
                                    Emily Rodriguez
                                </div>
                                <div className="text-sm text-gray-500">
                                    Freelance Designer
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-6xl mx-auto px-6 py-20 my-12">
                <div className="bg-gradient-to-br from-purple-600 to-purple-500 rounded-3xl p-16 text-center shadow-2xl shadow-purple-300">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                        Experience FocusFlow Today
                    </h2>
                    <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of happy users who organize, track, and
                        achieve more every day.
                    </p>
                    <button
                        onClick={handleRegisterClick}
                        className="bg-white text-purple-600 px-10 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all hover:scale-105"
                    >
                        Get Started
                    </button>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="bg-white py-20">
                <div className="max-w-5xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">
                        How{" "}
                        <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                            FocusFlow
                        </span>{" "}
                        Works
                    </h2>
                    <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto leading-relaxed">
                        Getting started is simple! Create your first task, set a
                        timer, and watch your productivity soar. Easily organize
                        your to-dos, track your progress, and collaborate with
                        others—all from a clean, intuitive dashboard. Whether
                        you're working solo or with a team, FocusFlow adapts to
                        your workflow and helps you stay on track every step of
                        the way.
                    </p>
                    <div className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-10 mb-8 border border-purple-100 shadow-lg">
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center flex-shrink-0 font-bold text-white shadow-lg">
                                    1
                                </div>
                                <p className="text-gray-700 pt-2">
                                    Sign up and personalize your workspace
                                </p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center flex-shrink-0 font-bold text-white shadow-lg">
                                    2
                                </div>
                                <p className="text-gray-700 pt-2">
                                    Add tasks and set priorities
                                </p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center flex-shrink-0 font-bold text-white shadow-lg">
                                    3
                                </div>
                                <p className="text-gray-700 pt-2">
                                    Use the built-in timer to stay focused
                                </p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center flex-shrink-0 font-bold text-white shadow-lg">
                                    4
                                </div>
                                <p className="text-gray-700 pt-2">
                                    Track your achievements and review insights
                                </p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center flex-shrink-0 font-bold text-white shadow-lg">
                                    5
                                </div>
                                <p className="text-gray-700 pt-2">
                                    Invite others to collaborate, if you wish
                                </p>
                            </div>
                        </div>
                    </div>
                    <p className="text-gray-600 text-center font-medium">
                        Start now and discover how easy it is to take control of
                        your time and tasks with FocusFlow!
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gradient-to-br from-purple-900 to-purple-800 text-white py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="text-2xl font-bold bg-gradient-to-r from-purple-200 to-white bg-clip-text text-transparent mb-4">
                                FocusFlow
                            </div>
                            <p className="text-purple-200 text-sm">
                                Your all-in-one platform for task management and
                                time tracking.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4 text-purple-100">
                                Product
                            </h3>
                            <div className="space-y-2 text-purple-200 text-sm">
                                <div>
                                    <a
                                        href="#"
                                        className="hover:text-white transition"
                                    >
                                        Features
                                    </a>
                                </div>
                                <div>
                                    <a
                                        href="#"
                                        className="hover:text-white transition"
                                    >
                                        Pricing
                                    </a>
                                </div>
                                <div>
                                    <a
                                        href="#"
                                        className="hover:text-white transition"
                                    >
                                        Security
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4 text-purple-100">
                                Company
                            </h3>
                            <div className="space-y-2 text-purple-200 text-sm">
                                <div>
                                    <a
                                        href="#"
                                        className="hover:text-white transition"
                                    >
                                        About
                                    </a>
                                </div>
                                <div>
                                    <a
                                        href="#"
                                        className="hover:text-white transition"
                                    >
                                        Blog
                                    </a>
                                </div>
                                <div>
                                    <a
                                        href="#"
                                        className="hover:text-white transition"
                                    >
                                        Careers
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4 text-purple-100">
                                Support
                            </h3>
                            <div className="space-y-2 text-purple-200 text-sm">
                                <div>
                                    <a
                                        href="#"
                                        className="hover:text-white transition"
                                    >
                                        Help Center
                                    </a>
                                </div>
                                <div>
                                    <a
                                        href="#"
                                        className="hover:text-white transition"
                                    >
                                        Contact
                                    </a>
                                </div>
                                <div>
                                    <a
                                        href="#"
                                        className="hover:text-white transition"
                                    >
                                        Privacy
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-purple-700 pt-8 text-center text-purple-300 text-sm">
                        <p>&copy; 2025 FocusFlow. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            {/* Auth Modals */}
            {isLoginOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={handleCloseModal}
                >
                    <div
                        className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-purple-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-bold mb-6 text-gray-900">
                            Login
                        </h2>
                        <div className="space-y-4">
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 py-3 rounded-xl bg-purple-50 border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none text-gray-900"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full px-4 py-3 rounded-xl bg-purple-50 border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none text-gray-900"
                            />
                            <button className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-300 transition-all">
                                Login
                            </button>
                        </div>
                        <p className="text-center text-gray-600 text-sm mt-4">
                            Don't have an account?{" "}
                            <button
                                onClick={() => {
                                    setIsLoginOpen(false);
                                    setIsRegisterOpen(true);
                                }}
                                className="text-purple-600 font-semibold hover:underline"
                            >
                                Sign up
                            </button>
                        </p>
                    </div>
                </div>
            )}

            {isRegisterOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={handleCloseModal}
                >
                    <div
                        className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-purple-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-bold mb-6 text-gray-900">
                            Sign Up
                        </h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full px-4 py-3 rounded-xl bg-purple-50 border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none text-gray-900"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 py-3 rounded-xl bg-purple-50 border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none text-gray-900"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full px-4 py-3 rounded-xl bg-purple-50 border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none text-gray-900"
                            />
                            <button className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-300 transition-all">
                                Sign Up
                            </button>
                        </div>
                        <p className="text-center text-gray-600 text-sm mt-4">
                            Already have an account?{" "}
                            <button
                                onClick={() => {
                                    setIsRegisterOpen(false);
                                    setIsLoginOpen(true);
                                }}
                                className="text-purple-600 font-semibold hover:underline"
                            >
                                Login
                            </button>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LandingPage;
