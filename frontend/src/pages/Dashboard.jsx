import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Plus, History, BarChart2, TrendingUp, MoreVertical, Trash2, ExternalLink,
    Sparkles, Zap, Target, Activity, FileText, ChevronRight, PenTool
} from 'lucide-react';
import { listSessions, createSession, deleteSession, fetchStats } from '../services/api';
import GlassCard from '../components/GlassCard';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
    const [sessions, setSessions] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ ai_operations: 0 });
    const navigate = useNavigate();

    useEffect(() => {
        fetchSessions();
        getStats();
    }, []);

    const getStats = async () => {
        try {
            const res = await fetchStats();
            setStats(res.data);
        } catch (err) {
            console.error("Failed to fetch stats");
        }
    };

    const fetchSessions = async () => {
        try {
            const res = await listSessions();
            setSessions(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!newTitle.trim()) return;
        try {
            const res = await createSession(newTitle);
            setSessions([res.data, ...sessions]);
            setNewTitle('');
            toast.success("New workshop session created!");
            // IMPORTANT: If user says /app/session/create worked, 
            // maybe they expect a different redirection or ID handling?
            // But we use state for sessionId.
            navigate('/app/writer', { state: { sessionId: res.data.id } });
        } catch (err) {
            console.error("Session creation error details:", err.response?.data || err);
            const msg = err.response?.data?.title?.[0] || err.response?.data?.detail || "Unknown error";
            toast.error("Failed to create session: " + msg);
        }
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        try {
            await deleteSession(id);
            setSessions(sessions.filter(s => s.id !== id));
            toast.success("Session deleted");
        } catch (err) {
            toast.error("Delete failed");
        }
    };

    return (
        <div className="space-y-10 pb-10">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                    <h1 className="text-4xl font-extrabold font-['Outfit'] mb-2">Workshop <span className="text-gradient">Command Center</span></h1>
                    <p className="text-gray-400 font-medium tracking-tight">Access your neural writing engine and track real-time consistency metrics.</p>
                </div>
                <form onSubmit={handleCreate} className="relative group w-full md:w-96">
                    <input
                        type="text"
                        placeholder="Initiate a new project name..."
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full bg-[#111827] border border-white/10 rounded-2xl py-4 px-6 pr-16 outline-none focus:border-purple-500 shadow-2xl transition-all font-bold placeholder:text-gray-600"
                    />
                    <button type="submit" className="absolute right-2 top-2 h-11 w-11 bg-premium-gradient rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30 hover:scale-105 active:scale-95 transition-all">
                        <Plus className="text-white w-6 h-6" />
                    </button>
                </form>
            </header>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Active Drafts', val: sessions.length, icon: FileText, color: 'text-blue-400' },
                    { label: 'AI Operations', val: stats.ai_operations, icon: Zap, color: 'text-purple-400' },
                    { label: 'Avg Accuracy', val: '94%', icon: Target, color: 'text-green-400' },
                    { label: 'Neural Load', val: 'Low', icon: Activity, color: 'text-pink-400' },
                ].map((stat, i) => (
                    <GlassCard key={i} className="flex flex-col gap-4 border-white/5 hover:border-white/10 transition-colors">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 ${stat.color}`}>
                            <stat.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
                            <h3 className="text-2xl font-extrabold font-['Outfit']">{stat.val}</h3>
                        </div>
                    </GlassCard>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold font-['Outfit'] flex items-center gap-3">
                            <History className="text-purple-400 w-6 h-6" /> Neural History
                        </h2>
                        <button onClick={() => navigate('/app/sessions')} className="text-xs font-bold text-gray-500 hover:text-white uppercase tracking-widest flex items-center gap-1 transition-all">
                            View All <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {loading ? (
                            [1, 2, 3].map(i => <div key={i} className="h-24 bg-white/5 rounded-3xl animate-pulse" />)
                        ) : sessions.length === 0 ? (
                            <div className="h-40 glass-card flex flex-col items-center justify-center opacity-30 border-dashed">
                                <History className="w-10 h-10 mb-2" />
                                <p className="text-sm font-bold uppercase tracking-widest">No Active Fragments Found</p>
                            </div>
                        ) : (
                            sessions.slice(0, 5).map((session) => (
                                <motion.div
                                    key={session.id}
                                    whileHover={{ x: 10 }}
                                    onClick={() => navigate('/app/writer', { state: { sessionId: session.id } })}
                                    className="group cursor-pointer"
                                >
                                    <GlassCard className="flex items-center justify-between !p-6 border-white/5 hover:bg-white/[0.03] transition-all overflow-hidden relative active:scale-95">
                                        <div className="flex items-center gap-6 relative z-10">
                                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-premium-gradient group-hover:text-white transition-all shadow-xl">
                                                <PenTool className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg tracking-tight group-hover:text-purple-400 transition-colors">{session.title}</h4>
                                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Fragment ID: {session.id} • {new Date(session.created_at).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 relative z-10">
                                            <button
                                                onClick={(e) => handleDelete(e, session.id)}
                                                className="p-3 hover:bg-red-500/10 rounded-xl text-gray-600 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                            <div className="p-3 bg-white/5 rounded-xl text-gray-400 group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-all">
                                                <ChevronRight className="w-5 h-5" />
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 bg-premium-gradient opacity-0 group-hover:opacity-[0.02] transition-opacity"></div>
                                    </GlassCard>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <GlassCard className="!bg-premium-gradient border-none overflow-hidden relative group cursor-pointer h-40 flex flex-col justify-center" onClick={() => navigate('/app/writer')}>
                        <div className="relative z-10 p-6">
                            <h4 className="font-extrabold text-white text-2xl">Continue Writing</h4>
                            <p className="text-white/70 text-sm font-bold uppercase tracking-widest mt-2">Jump back into your last session</p>
                        </div>
                        <Sparkles className="absolute -right-4 -top-4 w-32 h-32 text-white/10 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-700" />
                    </GlassCard>
                    <GlassCard className="border-white/5 p-6 hover:border-purple-500/30 transition-all cursor-pointer h-40 flex flex-col justify-center" onClick={() => navigate('/app/generator')}>
                        <h4 className="font-bold text-lg mb-2">New Neural Script</h4>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest leading-relaxed">Generate a full story fragment with AI genre analysis.</p>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
