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
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
            {/* Navbar - keeping original structure */}
            <nav className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                        FocusFlow
                    </div>
                    <button
                        onClick={handleRegisterClick}
                        className="bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-2 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                    >
                        Get Started
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-6 py-20 text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                    Unlock Your Productivity with{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                        FocusFlow
                    </span>
                </h1>
                <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
                    FocusFlow is your all-in-one platform for task management
                    and time tracking. Achieve more, stress less—always free,
                    with no hidden fees.
                </p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={handleRegisterClick}
                        className="bg-gradient-to-r from-purple-600 to-blue-500 px-8 py-3 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                    >
                        Get Started
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <h2 className="text-4xl font-bold text-center mb-16">
                    Why Choose{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                        FocusFlow?
                    </span>
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-purple-500/50 transition-all">
                        <h3 className="text-2xl font-bold mb-4 text-purple-400">
                            Effortless Task Management
                        </h3>
                        <p className="text-gray-400">
                            Organize your day with a simple drag-and-drop
                            interface, custom categories, and smart reminders.
                        </p>
                    </div>
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-purple-500/50 transition-all">
                        <h3 className="text-2xl font-bold mb-4 text-purple-400">
                            Built-in Time Tracking
                        </h3>
                        <p className="text-gray-400">
                            Monitor your focus and track time spent on tasks and
                            projects. Get detailed insights to help you work
                            smarter, not harder.
                        </p>
                    </div>
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-purple-500/50 transition-all">
                        <h3 className="text-2xl font-bold mb-4 text-purple-400">
                            Collaborate with Anyone
                        </h3>
                        <p className="text-gray-400">
                            Share workspaces, assign tasks, and stay in sync
                            with friends, family, or teammates.
                        </p>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-slate-900/50 py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-16">
                        Loved by Our{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                            Community
                        </span>
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
                            <p className="text-gray-300 mb-6 italic">
                                "FocusFlow is the best productivity tool I've
                                ever used. No paywalls, just pure value!"
                            </p>
                            <div>
                                <div className="font-semibold text-purple-400">
                                    Sarah Johnson
                                </div>
                                <div className="text-sm text-gray-500">
                                    Project Manager
                                </div>
                            </div>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
                            <p className="text-gray-300 mb-6 italic">
                                "Finally, a platform that gives me everything I
                                need to stay organized—without asking for my
                                credit card."
                            </p>
                            <div>
                                <div className="font-semibold text-purple-400">
                                    Michael Chen
                                </div>
                                <div className="text-sm text-gray-500">
                                    Software Developer
                                </div>
                            </div>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
                            <p className="text-gray-300 mb-6 italic">
                                "As a freelancer, FocusFlow helps me stay on top
                                of my work and deadlines."
                            </p>
                            <div>
                                <div className="font-semibold text-purple-400">
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
            <section className="max-w-7xl mx-auto px-6 py-20 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Experience{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                        FocusFlow
                    </span>{" "}
                    Today
                </h2>
                <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                    Join thousands of happy users who organize, track, and
                    achieve more every day.
                </p>
                <button
                    onClick={handleRegisterClick}
                    className="bg-gradient-to-r from-purple-600 to-blue-500 px-10 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                >
                    Get Started
                </button>
            </section>

            {/* How It Works Section */}
            <section className="bg-slate-900/50 py-20">
                <div className="max-w-5xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-8">
                        How{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                            FocusFlow
                        </span>{" "}
                        Works
                    </h2>
                    <p className="text-gray-400 text-center mb-12 max-w-3xl mx-auto">
                        Getting started is simple! Create your first task, set a
                        timer, and watch your productivity soar. Easily organize
                        your to-dos, track your progress, and collaborate with
                        others—all from a clean, intuitive dashboard. Whether
                        you're working solo or with a team, FocusFlow adapts to
                        your workflow and helps you stay on track every step of
                        the way.
                    </p>
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 mb-8">
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center flex-shrink-0 font-bold">
                                    1
                                </div>
                                <p className="text-gray-300">
                                    Sign up and personalize your workspace
                                </p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center flex-shrink-0 font-bold">
                                    2
                                </div>
                                <p className="text-gray-300">
                                    Add tasks and set priorities
                                </p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center flex-shrink-0 font-bold">
                                    3
                                </div>
                                <p className="text-gray-300">
                                    Use the built-in timer to stay focused
                                </p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center flex-shrink-0 font-bold">
                                    4
                                </div>
                                <p className="text-gray-300">
                                    Track your achievements and review insights
                                </p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center flex-shrink-0 font-bold">
                                    5
                                </div>
                                <p className="text-gray-300">
                                    Invite others to collaborate, if you wish
                                </p>
                            </div>
                        </div>
                    </div>
                    <p className="text-gray-400 text-center">
                        Start now and discover how easy it is to take control of
                        your time and tasks with FocusFlow!
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 border-t border-slate-800 py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
                                FocusFlow
                            </div>
                            <p className="text-gray-400 text-sm">
                                Your all-in-one platform for task management and
                                time tracking.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4 text-purple-400">
                                Product
                            </h3>
                            <div className="space-y-2 text-gray-400 text-sm">
                                <div>
                                    <a
                                        href="#"
                                        className="hover:text-purple-400 transition"
                                    >
                                        Features
                                    </a>
                                </div>
                                <div>
                                    <a
                                        href="#"
                                        className="hover:text-purple-400 transition"
                                    >
                                        Pricing
                                    </a>
                                </div>
                                <div>
                                    <a
                                        href="#"
                                        className="hover:text-purple-400 transition"
                                    >
                                        Security
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4 text-purple-400">
                                Company
                            </h3>
                            <div className="space-y-2 text-gray-400 text-sm">
                                <div>
                                    <a
                                        href="#"
                                        className="hover:text-purple-400 transition"
                                    >
                                        About
                                    </a>
                                </div>
                                <div>
                                    <a
                                        href="#"
                                        className="hover:text-purple-400 transition"
                                    >
                                        Blog
                                    </a>
                                </div>
                                <div>
                                    <a
                                        href="#"
                                        className="hover:text-purple-400 transition"
                                    >
                                        Careers
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4 text-purple-400">
                                Support
                            </h3>
                            <div className="space-y-2 text-gray-400 text-sm">
                                <div>
                                    <a
                                        href="#"
                                        className="hover:text-purple-400 transition"
                                    >
                                        Help Center
                                    </a>
                                </div>
                                <div>
                                    <a
                                        href="#"
                                        className="hover:text-purple-400 transition"
                                    >
                                        Contact
                                    </a>
                                </div>
                                <div>
                                    <a
                                        href="#"
                                        className="hover:text-purple-400 transition"
                                    >
                                        Privacy
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-slate-800 pt-8 text-center text-gray-500 text-sm">
                        <p>&copy; 2025 FocusFlow. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            {/* Auth Modals */}
            {isLoginOpen && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={handleCloseModal}
                >
                    <div
                        className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-md w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-bold mb-6">Login</h2>
                        <div className="space-y-4">
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-purple-500 outline-none text-white"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-purple-500 outline-none text-white"
                            />
                            <button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                                Login
                            </button>
                        </div>
                        <p className="text-center text-gray-400 text-sm mt-4">
                            Don't have an account?{" "}
                            <button
                                onClick={() => {
                                    setIsLoginOpen(false);
                                    setIsRegisterOpen(true);
                                }}
                                className="text-purple-400 hover:underline"
                            >
                                Sign up
                            </button>
                        </p>
                    </div>
                </div>
            )}

            {isRegisterOpen && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={handleCloseModal}
                >
                    <div
                        className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-md w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-purple-500 outline-none text-white"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-purple-500 outline-none text-white"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-purple-500 outline-none text-white"
                            />
                            <button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                                Sign Up
                            </button>
                        </div>
                        <p className="text-center text-gray-400 text-sm mt-4">
                            Already have an account?{" "}
                            <button
                                onClick={() => {
                                    setIsRegisterOpen(false);
                                    setIsLoginOpen(true);
                                }}
                                className="text-purple-400 hover:underline"
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
