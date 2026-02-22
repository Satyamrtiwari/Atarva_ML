import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight, PenTool } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { toast } from 'react-hot-toast';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await login(username, password);
        if (result.success) {
            toast.success("Welcome back to AI Writer!");
            navigate('/app/dashboard');
        } else {
            toast.error(result.error);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-darkBg flex flex-col items-center justify-center p-6 relative overflow-hidden font-['Inter']">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.08),transparent_50%)] pointer-events-none"></div>
            <Navbar />

            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-md z-10"
            >
                <div className="glass-card !p-12 border-white/5 bg-[#111827]/60 shadow-[0_0_50px_rgba(0,0,0,0.3)] rounded-[2.5rem] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-premium-gradient opacity-10 blur-3xl rounded-full translate-x-10 -translate-y-10 group-hover:bg-purple-500/10 transition-colors"></div>

                    <div className="text-center mb-12 relative z-10">
                        <Link to="/" className="inline-flex items-center gap-2 mb-8">
                            <div className="w-12 h-12 bg-premium-gradient rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                                <PenTool className="text-white w-7 h-7" />
                            </div>
                            <span className="text-3xl font-bold font-['Outfit'] text-gradient">AI Writer</span>
                        </Link>
                        <h2 className="text-4xl font-extrabold font-['Outfit'] mb-3 tracking-tight">Welcome Back</h2>
                        <p className="text-gray-400 font-medium">Experience the future of narrative intelligence.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">Username</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-purple-500/50 outline-none transition-all font-medium placeholder:text-gray-600"
                                    placeholder="Enter your handle"
                                    required
                                />
                            </div>
                        </div>

                        <div className="pb-4">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-purple-500/50 outline-none transition-all font-medium placeholder:text-gray-600"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full premium-button !rounded-2xl py-5 flex items-center justify-center gap-3 group text-lg font-bold shadow-2xl shadow-purple-500/30"
                        >
                            {loading ? (
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><PenTool className="w-6 h-6" /></motion.div>
                            ) : (
                                <>
                                    Sign In <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 text-center text-gray-400 font-medium relative z-10">
                        Don't have an account? <Link to="/register" className="text-purple-400 hover:text-white transition-colors font-bold border-b border-purple-500/30">Create one</Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
