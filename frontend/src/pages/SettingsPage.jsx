import React from 'react';
import { motion } from 'framer-motion';
import {
    User, Mail, Shield, Bell, Moon, Sun, Monitor, LogOut, Trash2,
    ChevronRight, Lock, Key, Smartphone
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import GlassCard from '../components/GlassCard';
import { toast } from 'react-hot-toast';

const SettingsPage = () => {
    const { user, logout } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();

    const handleUpdate = () => {
        toast.success("Profile updated successfully");
    };

    const handleDeleteAccount = () => {
        const confirm = window.confirm("Are you sure? This action is irreversible.");
        if (confirm) {
            toast.error("Account deletion requested");
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-20">
            <header>
                <h1 className="text-4xl font-bold font-['Outfit'] mb-2">Settings</h1>
                <p className="text-gray-400 font-medium">Manage your account preferences and security configuration.</p>
            </header>

            <div className="grid grid-cols-1 gap-8">

                {/* Profile Info */}
                <section className="space-y-6">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <User className="w-5 h-5 text-purple-400" /> Profile Information
                    </h3>
                    <GlassCard className="!p-10 border-white/5 space-y-8">
                        <div className="flex flex-col md:flex-row gap-10">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-32 h-32 bg-premium-gradient rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/20 text-white text-5xl font-extrabold uppercase">
                                    {user?.username?.charAt(0) || 'U'}
                                </div>
                                <button className="text-xs font-bold text-purple-400 uppercase tracking-widest hover:text-purple-300 transition-colors">Change Avatar</button>
                            </div>

                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Username</label>
                                    <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3 font-medium text-white/80">
                                        {user?.username || 'Writer'}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email Address</label>
                                    <input
                                        type="email"
                                        defaultValue="writer@premium.com"
                                        className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3 font-medium text-white outline-none focus:border-purple-500 transition-all w-full"
                                    />
                                </div>
                                <div className="md:col-span-2 pt-4">
                                    <button
                                        onClick={handleUpdate}
                                        className="premium-button !py-3 !px-10 text-sm font-bold"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </section>

                {/* Preferences */}
                <section className="space-y-6">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <Monitor className="w-5 h-5 text-indigo-400" /> Preferences
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <GlassCard className="flex items-center justify-between !p-8 border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
                                    {isDarkMode ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                                </div>
                                <div>
                                    <h4 className="font-bold">Display Mode</h4>
                                    <p className="text-xs text-gray-500 mt-1 uppercase font-bold tracking-tighter">{isDarkMode ? 'Dark Mode Active' : 'Light Mode Active'}</p>
                                </div>
                            </div>
                            <button
                                onClick={toggleTheme}
                                className="relative w-14 h-8 bg-slate-800 rounded-full p-1 transition-all duration-300 border border-white/5"
                            >
                                <motion.div
                                    animate={{ x: isDarkMode ? 24 : 0 }}
                                    className="w-6 h-6 bg-premium-gradient rounded-full shadow-lg"
                                />
                            </button>
                        </GlassCard>

                        <GlassCard className="flex items-center justify-between !p-8 border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-pink-500/10 text-pink-400 rounded-xl">
                                    <Bell className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold">Notifications</h4>
                                    <p className="text-xs text-gray-500 mt-1 uppercase font-bold tracking-tighter">Desktop alerts enabled</p>
                                </div>
                            </div>
                            <button className="relative w-14 h-8 bg-purple-500 rounded-full p-1 border border-white/5">
                                <motion.div className="w-6 h-6 bg-white rounded-full ml-auto" />
                            </button>
                        </GlassCard>
                    </div>
                </section>

                {/* Security & Danger Zone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <section className="space-y-6">
                        <h3 className="text-xl font-bold flex items-center gap-2 text-red-500">
                            <Shield className="w-5 h-5" /> Account Actions
                        </h3>
                        <GlassCard className="!p-8 border-red-500/10 bg-red-500/[0.01]">
                            <div className="space-y-4">
                                <button
                                    onClick={logout}
                                    className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all group"
                                >
                                    <div className="flex items-center gap-4">
                                        <LogOut className="w-5 h-5 text-gray-400 group-hover:text-white" />
                                        <span className="font-bold">Sign Out</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-600" />
                                </button>
                                <button
                                    onClick={handleDeleteAccount}
                                    className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-red-500/10 transition-all group border border-transparent hover:border-red-500/20"
                                >
                                    <div className="flex items-center gap-4">
                                        <Trash2 className="w-5 h-5 text-red-500" />
                                        <span className="font-bold text-red-500">Delete Account</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-red-600" />
                                </button>
                            </div>
                        </GlassCard>
                    </section>

                    <section className="space-y-6">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <Lock className="w-5 h-5 text-blue-400" /> Security
                        </h3>
                        <GlassCard className="!p-8 border-white/5">
                            <div className="space-y-4">
                                <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <Key className="w-5 h-5 text-gray-400 group-hover:text-white" />
                                        <span className="font-bold">Change Password</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-600" />
                                </button>
                                <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <Smartphone className="w-5 h-5 text-gray-400 group-hover:text-white" />
                                        <span className="font-bold">Two-Factor Auth</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-600" />
                                </button>
                            </div>
                        </GlassCard>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
