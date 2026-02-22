import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, UserPlus, ArrowRight, PenTool } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { toast } from 'react-hot-toast';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: ''
    });
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirm_password) {
            toast.error("Passwords don't match");
            return;
        }

        setLoading(true);
        const result = await register(formData);
        if (result.success) {
            toast.success("Account created! Welcome to AI Writer.");
            navigate('/login');
        } else {
            toast.error(typeof result.error === 'object' ? JSON.stringify(result.error) : result.error);
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-darkBg flex flex-col items-center justify-center p-6 relative overflow-hidden font-['Inter']">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(168,85,247,0.08),transparent_50%)] pointer-events-none"></div>
            <Navbar />

            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-md z-10"
            >
                <div className="glass-card !p-12 border-white/5 bg-[#111827]/60 shadow-[0_0_50px_rgba(0,0,0,0.3)] rounded-[2.5rem] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-premium-gradient opacity-10 blur-3xl rounded-full translate-x-10 -translate-y-10"></div>

                    <div className="text-center mb-10 relative z-10">
                        <Link to="/" className="inline-flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 bg-premium-gradient rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                                <PenTool className="text-white w-6 h-6" />
                            </div>
                            <span className="text-2xl font-bold font-['Outfit'] text-gradient">AI Writer</span>
                        </Link>
                        <h2 className="text-3xl font-extrabold font-['Outfit'] mb-2 tracking-tight">Create Account</h2>
                        <p className="text-gray-400 font-medium">Join the next generation of storytellers.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Username</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                                <input
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-6 focus:ring-2 focus:ring-purple-500/50 outline-none transition-all font-medium placeholder:text-gray-600 shadow-inner"
                                    placeholder="johndoe"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-6 focus:ring-2 focus:ring-purple-500/50 outline-none transition-all font-medium placeholder:text-gray-600 shadow-inner"
                                    placeholder="name@provider.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-6 focus:ring-2 focus:ring-purple-500/50 outline-none transition-all font-medium placeholder:text-gray-600 text-sm shadow-inner"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Confirm</label>
                                <input
                                    name="confirm_password"
                                    type="password"
                                    value={formData.confirm_password}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-6 focus:ring-2 focus:ring-purple-500/50 outline-none transition-all font-medium placeholder:text-gray-600 text-sm shadow-inner"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full premium-button !rounded-2xl py-5 mt-4 flex items-center justify-center gap-3 group text-lg font-bold shadow-2xl shadow-purple-500/30"
                        >
                            {loading ? (
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><PenTool className="w-5 h-5" /></motion.div>
                            ) : (
                                <>
                                    Register Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 text-center text-gray-400 font-medium relative z-10">
                        Already have an account? <Link to="/login" className="text-purple-400 hover:text-white transition-colors font-bold border-b border-purple-500/30">Sign In</Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
