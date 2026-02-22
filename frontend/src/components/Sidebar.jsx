import React from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard, Sparkles, Wand2, History, BarChart2, Settings, LogOut, ChevronLeft, ChevronRight, PenTool
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { logout } = useAuth();
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/app/dashboard' },
        { name: 'Writer', icon: Wand2, path: '/app/writer' },
        { name: 'Generator', icon: Sparkles, path: '/app/generator' },
        { name: 'Sessions', icon: History, path: '/app/sessions' },
        { name: 'Analytics', icon: BarChart2, path: '/app/analytics' },
        { name: 'Settings', icon: Settings, path: '/app/settings' },
    ];

    return (
        <motion.aside
            initial={false}
            animate={{ width: isOpen ? 260 : 80 }}
            className="fixed left-0 top-0 h-full bg-[#111827]/80 backdrop-blur-2xl border-r border-white/5 z-40 flex flex-col transition-all duration-300"
        >
            <div className="p-6 flex items-center justify-between">
                {isOpen && (
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-premium-gradient rounded-lg flex items-center justify-center">
                            <PenTool className="text-white w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold font-['Outfit'] text-gradient whitespace-nowrap">AI Writer</span>
                    </div>
                )}
                <button
                    onClick={toggleSidebar}
                    className={`p-2 hover:bg-white/5 rounded-lg text-gray-400 ${!isOpen && 'mx-auto'}`}
                >
                    {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>
            </div>

            <nav className="flex-1 px-4 mt-8 space-y-1">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center gap-4 p-3 rounded-xl transition-all relative group ${isActive
                                    ? 'bg-white/5 text-white'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="active-indicator"
                                    className="absolute left-[-16px] w-1.5 h-6 bg-premium-gradient rounded-r-full"
                                />
                            )}
                            <item.icon className={`w-6 h-6 shrink-0 ${isActive ? 'text-purple-400' : ''}`} />
                            {isOpen && <span className="font-medium whitespace-nowrap">{item.name}</span>}
                            {!isOpen && (
                                <div className="absolute left-20 bg-slate-900 border border-white/10 px-2 py-1 rounded text-xs invisible group-hover:visible z-50">
                                    {item.name}
                                </div>
                            )}
                        </Link>
                    );
                })}Menu
            </nav>

            <div className="p-4 border-t border-white/5">
                <button
                    onClick={logout}
                    className="flex items-center gap-4 p-3 w-full text-gray-400 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all"
                >
                    <LogOut className="w-6 h-6 shrink-0" />
                    {isOpen && <span className="font-medium">Logout</span>}
                </button>
            </div>
        </motion.aside>
    );
};

export default Sidebar;
