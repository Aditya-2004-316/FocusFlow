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
        <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-300 to-cyan-300">
            {/* Navbar */}
            <nav className="bg-blue-500/30 backdrop-blur-md border-b border-blue-400/30">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="text-2xl font-bold text-white">
                        FocusFlow
                    </div>
                    <button
                        onClick={handleRegisterClick}
                        className="bg-gradient-to-r from-cyan-400 to-cyan-300 text-blue-900 px-6 py-2.5 rounded-full text-sm font-bold hover:shadow-lg hover:shadow-cyan-300/50 transition-all hover:scale-105"
                    >
                        Get Started
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-6 py-20 text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
                    Unlock Your Productivity with{" "}
                    <span className="text-cyan-300">FocusFlow</span>
                </h1>
                <p className="text-xl text-blue-50 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow">
                    FocusFlow is your all-in-one platform for task management
                    and time tracking. Achieve more, stress less—always free,
                    with no hidden fees.
                </p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={handleRegisterClick}
                        className="bg-gradient-to-r from-cyan-400 to-cyan-300 text-blue-900 px-10 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-cyan-300/50 transition-all hover:scale-105"
                    >
                        Get Started
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <h2 className="text-4xl font-bold text-center mb-16 text-white drop-shadow-lg">
                    Why Choose <span className="text-cyan-300">FocusFlow?</span>
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-400 rounded-2xl flex items-center justify-center mb-5 shadow-lg">
                            <svg
                                className="w-8 h-8 text-white"
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
                        <h3 className="text-2xl font-bold mb-4 text-blue-900">
                            Effortless Task Management
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Organize your day with a simple drag-and-drop
                            interface, custom categories, and smart reminders.
                        </p>
                    </div>
                    <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-400 rounded-2xl flex items-center justify-center mb-5 shadow-lg">
                            <svg
                                className="w-8 h-8 text-white"
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
                        <h3 className="text-2xl font-bold mb-4 text-blue-900">
                            Built-in Time Tracking
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Monitor your focus and track time spent on tasks and
                            projects. Get detailed insights to help you work
                            smarter, not harder.
                        </p>
                    </div>
                    <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-400 rounded-2xl flex items-center justify-center mb-5 shadow-lg">
                            <svg
                                className="w-8 h-8 text-white"
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
                        <h3 className="text-2xl font-bold mb-4 text-blue-900">
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
            <section className="relative py-20 overflow-hidden">
                {/* Wave decoration */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-blue-600"></div>
                <svg
                    className="absolute bottom-0 w-full"
                    viewBox="0 0 1440 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
                        fill="white"
                    />
                </svg>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <h2 className="text-4xl font-bold text-center mb-16 text-white drop-shadow-lg">
                        Loved by Our{" "}
                        <span className="text-cyan-300">Community</span>
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-3xl p-8 shadow-xl">
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="w-5 h-5 text-cyan-400"
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
                                <div className="font-bold text-blue-600">
                                    Sarah Johnson
                                </div>
                                <div className="text-sm text-gray-500">
                                    Project Manager
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-3xl p-8 shadow-xl">
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="w-5 h-5 text-cyan-400"
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
                                <div className="font-bold text-blue-600">
                                    Michael Chen
                                </div>
                                <div className="text-sm text-gray-500">
                                    Software Developer
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-3xl p-8 shadow-xl">
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="w-5 h-5 text-cyan-400"
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
                                <div className="font-bold text-blue-600">
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
            <section className="bg-white py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-16 text-center shadow-2xl">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
                            Experience FocusFlow Today
                        </h2>
                        <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
                            Join thousands of happy users who organize, track,
                            and achieve more every day.
                        </p>
                        <button
                            onClick={handleRegisterClick}
                            className="bg-gradient-to-r from-cyan-400 to-cyan-300 text-blue-900 px-10 py-4 rounded-full text-lg font-bold hover:shadow-xl transition-all hover:scale-105"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="bg-gradient-to-br from-blue-400 to-cyan-300 py-20">
                <div className="max-w-5xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-8 text-white drop-shadow-lg">
                        How <span className="text-cyan-300">FocusFlow</span>{" "}
                        Works
                    </h2>
                    <p className="text-blue-50 text-center mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow">
                        Getting started is simple! Create your first task, set a
                        timer, and watch your productivity soar. Easily organize
                        your to-dos, track your progress, and collaborate with
                        others—all from a clean, intuitive dashboard. Whether
                        you're working solo or with a team, FocusFlow adapts to
                        your workflow and helps you stay on track every step of
                        the way.
                    </p>
                    <div className="bg-white rounded-3xl p-10 mb-8 shadow-2xl">
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-300 flex items-center justify-center flex-shrink-0 font-bold text-blue-900 shadow-lg text-lg">
                                    1
                                </div>
                                <p className="text-gray-700 pt-2.5 font-medium">
                                    Sign up and personalize your workspace
                                </p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-300 flex items-center justify-center flex-shrink-0 font-bold text-blue-900 shadow-lg text-lg">
                                    2
                                </div>
                                <p className="text-gray-700 pt-2.5 font-medium">
                                    Add tasks and set priorities
                                </p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-300 flex items-center justify-center flex-shrink-0 font-bold text-blue-900 shadow-lg text-lg">
                                    3
                                </div>
                                <p className="text-gray-700 pt-2.5 font-medium">
                                    Use the built-in timer to stay focused
                                </p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-300 flex items-center justify-center flex-shrink-0 font-bold text-blue-900 shadow-lg text-lg">
                                    4
                                </div>
                                <p className="text-gray-700 pt-2.5 font-medium">
                                    Track your achievements and review insights
                                </p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-300 flex items-center justify-center flex-shrink-0 font-bold text-blue-900 shadow-lg text-lg">
                                    5
                                </div>
                                <p className="text-gray-700 pt-2.5 font-medium">
                                    Invite others to collaborate, if you wish
                                </p>
                            </div>
                        </div>
                    </div>
                    <p className="text-blue-50 text-center font-semibold drop-shadow">
                        Start now and discover how easy it is to take control of
                        your time and tasks with FocusFlow!
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="text-2xl font-bold text-cyan-300 mb-4">
                                FocusFlow
                            </div>
                            <p className="text-blue-200 text-sm">
                                Your all-in-one platform for task management and
                                time tracking.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-4 text-cyan-300">
                                Product
                            </h3>
                            <div className="space-y-2 text-blue-200 text-sm">
                                <div>
                                    <a
                                        href="#"
                                        className="hover:text-cyan-300 transition"
                                    >
                                        Features
                                    </a>
                                </div>
                                <div>
                                    <a
                                        href="#"
                                        className="hover:text-cyan-300 transition"
                                    >
                                        Pricing
                                    </a>
                                </div>
                                <div>
                                    <a
                                        href="#"
                                        className="hover:text-cyan-300 transition"
                                    >
                                        Security
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold mb-4 text-cyan-300">
                                Company
                            </h3>
                            <div className="space-y-2 text-blue-200 text-sm">
                                <div>
                                    <a
                                        href="#"
                                        className="hover:text-cyan-300 transition"
                                    >
                                        About
                                    </a>
                                </div>
                                <div>
                                    <a
                                        href="#"
                                        className="hover:text-cyan-300 transition"
                                    >
                                        Blog
                                    </a>
                                </div>
                                <div>
                                    <a
                                        href="#"
                                        className="hover:text-cyan-300 transition"
                                    >
                                        Careers
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold mb-4 text-cyan-300">
                                Support
                            </h3>
                            <div className="space-y-2 text-blue-200 text-sm">
                                <div>
                                    <a
                                        href="#"
                                        className="hover:text-cyan-300 transition"
                                    >
                                        Help Center
                                    </a>
                                </div>
                                <div>
                                    <a
                                        href="#"
                                        className="hover:text-cyan-300 transition"
                                    >
                                        Contact
                                    </a>
                                </div>
                                <div>
                                    <a
                                        href="#"
                                        className="hover:text-cyan-300 transition"
                                    >
                                        Privacy
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-blue-500 pt-8 text-center text-blue-300 text-sm">
                        <p>&copy; 2025 FocusFlow. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            {/* Auth Modals */}
            {isLoginOpen && (
                <div
                    className="fixed inset-0 bg-blue-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={handleCloseModal}
                >
                    <div
                        className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-bold mb-6 text-blue-900">
                            Login
                        </h2>
                        <div className="space-y-4">
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 py-3 rounded-xl bg-blue-50 border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-gray-900"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full px-4 py-3 rounded-xl bg-blue-50 border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-gray-900"
                            />
                            <button className="w-full bg-gradient-to-r from-cyan-400 to-cyan-300 text-blue-900 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-300/50 transition-all">
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
                                className="text-blue-600 font-bold hover:underline"
                            >
                                Sign up
                            </button>
                        </p>
                    </div>
                </div>
            )}

            {isRegisterOpen && (
                <div
                    className="fixed inset-0 bg-blue-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={handleCloseModal}
                >
                    <div
                        className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-bold mb-6 text-blue-900">
                            Sign Up
                        </h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full px-4 py-3 rounded-xl bg-blue-50 border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-gray-900"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 py-3 rounded-xl bg-blue-50 border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-gray-900"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full px-4 py-3 rounded-xl bg-blue-50 border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-gray-900"
                            />
                            <button className="w-full bg-gradient-to-r from-cyan-400 to-cyan-300 text-blue-900 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-300/50 transition-all">
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
                                className="text-blue-600 font-bold hover:underline"
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
