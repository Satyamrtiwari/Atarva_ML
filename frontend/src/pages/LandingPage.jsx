import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import GlassCard from '../components/GlassCard';
import {
    Sparkles, Zap, Shield, BarChart3, ArrowRight, Play, CheckCircle2,
    MessageSquare, Wand2, Search
} from 'lucide-react';

const LandingPage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-darkBg relative overflow-hidden transition-colors duration-500">
            {/* Premium Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-pink-500/5 blur-[180px] rounded-full pointer-events-none"></div>

            <Navbar />

            {/* Hero Section */}
            <section className="pt-40 pb-24 px-6 max-w-7xl mx-auto text-center relative z-10">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.span
                        variants={itemVariants}
                        className="px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-semibold mb-8 inline-block"
                    >
                        AI-Powered Writing Assistant
                    </motion.span>

                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-8xl font-bold font-['Outfit'] mb-8 leading-[1.1] tracking-tight text-slate-900 dark:text-white"
                    >
                        Transform Your Writing <br />
                        with <span className="text-gradient">Intelligent AI</span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-slate-600 dark:text-gray-400 text-xl max-w-3xl mx-auto mb-12 leading-relaxed"
                    >
                        Enhance your content with narrative consistency tracking, style transformation,
                        emotion detection and explainable AI suggestions.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-6 mb-20">
                        <Link to="/register" className="premium-button text-xl px-10 py-4 shadow-2xl shadow-purple-500/40">
                            Start Writing Free
                        </Link>
                        <button className="px-10 py-4 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-all font-bold flex items-center gap-3 text-xl">
                            <Play className="w-5 h-5 fill-current" /> Watch Demo
                        </button>
                    </motion.div>

                    {/* Stat Cards */}
                    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="p-8 rounded-3xl border border-slate-200 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] backdrop-blur-sm">
                            <h4 className="text-4xl font-extrabold mb-1 text-gradient">10K+</h4>
                            <p className="text-gray-500 dark:text-gray-400 font-medium">Documents Enhanced</p>
                        </div>
                        <div className="p-8 rounded-3xl border border-slate-200 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] backdrop-blur-sm">
                            <h4 className="text-4xl font-extrabold mb-1 text-gradient">50+</h4>
                            <p className="text-gray-500 dark:text-gray-400 font-medium">Writing Styles</p>
                        </div>
                        <div className="p-8 rounded-3xl border border-slate-200 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] backdrop-blur-sm">
                            <h4 className="text-4xl font-extrabold mb-1 text-gradient">99%</h4>
                            <p className="text-gray-500 dark:text-gray-400 font-medium">Satisfaction Rate</p>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-extrabold font-['Outfit'] mb-6 text-slate-900 dark:text-white">
                        Everything you need to <span className="text-gradient">Innovate</span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">Seamlessly blend AI intelligence with your creative process.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <GlassCard className="group">
                        <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500 mb-8 border border-indigo-500/20 group-hover:scale-110 transition-transform">
                            <Zap className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Smart Content Enhancement</h3>
                        <ul className="space-y-3 text-gray-500 dark:text-gray-400">
                            <li className="flex items-center gap-2 font-medium"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Tone Control</li>
                            <li className="flex items-center gap-2 font-medium"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Enhancement Level</li>
                            <li className="flex items-center gap-2 font-medium"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Readability Tracking</li>
                        </ul>
                    </GlassCard>

                    <GlassCard className="group">
                        <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500 mb-8 border border-purple-500/20 group-hover:scale-110 transition-transform">
                            <Wand2 className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">AI Script Generator</h3>
                        <ul className="space-y-3 text-gray-500 dark:text-gray-400">
                            <li className="flex items-center gap-2 font-medium"><CheckCircle2 className="w-4 h-4 text-purple-500" /> Genre detection</li>
                            <li className="flex items-center gap-2 font-medium"><CheckCircle2 className="w-4 h-4 text-purple-500" /> Word limit control</li>
                            <li className="flex items-center gap-2 font-medium"><CheckCircle2 className="w-4 h-4 text-purple-500" /> Story planning</li>
                        </ul>
                    </GlassCard>

                    <GlassCard className="group border-pink-500/10">
                        <div className="w-14 h-14 bg-pink-500/10 rounded-2xl flex items-center justify-center text-pink-500 mb-8 border border-pink-500/20 group-hover:scale-110 transition-transform">
                            <BarChart3 className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Explainable AI Dashboard</h3>
                        <ul className="space-y-3 text-gray-500 dark:text-gray-400">
                            <li className="flex items-center gap-2 font-medium"><CheckCircle2 className="w-4 h-4 text-pink-500" /> Drift Score</li>
                            <li className="flex items-center gap-2 font-medium"><CheckCircle2 className="w-4 h-4 text-pink-500" /> Emotion Detection</li>
                            <li className="flex items-center gap-2 font-medium"><CheckCircle2 className="w-4 h-4 text-pink-500" /> Narrative Consistency</li>
                        </ul>
                    </GlassCard>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="glass-card !bg-premium-gradient p-16 text-center text-white border-none shadow-3xl overflow-hidden relative"
                >
                    <div className="absolute top-0 left-0 w-full h-full bg-black/10 pointer-events-none"></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-extrabold mb-8 font-['Outfit']">Ready to elevate your writing?</h2>
                        <p className="text-white/80 text-xl max-w-xl mx-auto mb-12 font-medium">Join thousands of writers using AI Writer to create world-class content.</p>
                        <Link to="/register" className="bg-white text-purple-600 px-12 py-5 rounded-2xl text-2xl font-bold shadow-xl hover:shadow-2xl transition-all inline-block hover:-translate-y-1 active:translate-y-0">
                            Start Now
                        </Link>
                    </div>
                </motion.div>
            </section>

            <footer className="py-12 border-t border-slate-100 dark:border-white/5 text-center text-gray-500 text-sm">
                <p>© 2026 AI Writer. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
