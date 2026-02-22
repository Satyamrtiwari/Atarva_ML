import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, PenTool, LayoutDashboard, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const { user } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isInApp = location.pathname.startsWith('/app');

    if (isInApp) return null; // Use Sidebar instead in app

    return (
        <nav className={`fixed top-0 w-full z-50 px-6 py-4 transition-all duration-300 ${isScrolled ? 'bg-white/70 dark:bg-darkBg/70 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-premium-gradient rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                        <PenTool className="text-white w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold font-['Outfit'] text-gradient">AI Writer</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <a href="#features" className="hover:text-purple-400 transition-colors">Features</a>
                    <a href="#how-it-works" className="hover:text-purple-400 transition-colors">How It Works</a>
                    <a href="#pricing" className="hover:text-purple-400 transition-colors">Pricing</a>
                    <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>

                    {user ? (
                        <Link to="/app/dashboard" className="premium-button !py-2 !px-6">Go to Dashboard</Link>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-purple-400 transition-colors">Login</Link>
                            <Link to="/register" className="premium-button !py-2 !px-6">Get Started</Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-4">
                    <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 w-full bg-slate-900 border-b border-white/10 p-6 flex flex-col gap-6 md:hidden"
                    >
                        <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
                        <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
                        <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
                        <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
                            <Link to="/login" className="text-center">Login</Link>
                            <Link to="/register" className="premium-button">Get Started</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
