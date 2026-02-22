import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { History, Search, Filter, Trash2, ExternalLink, Calendar, Clock, BarChart2 } from 'lucide-react';
import { listSessions, deleteSession } from '../services/api';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import { toast } from 'react-hot-toast';

const SessionsPage = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchSessions();
    }, []);

    const fetchSessions = async () => {
        try {
            const res = await listSessions();
            setSessions(res.data);
        } catch (err) {
            toast.error("Failed to load sessions");
        } finally {
            setLoading(false);
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

    const filteredSessions = sessions.filter(s =>
        s.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-10">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold font-['Outfit'] mb-2">My Sessions</h1>
                    <p className="text-gray-400 font-medium">Manage and revisit your previously generated content.</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search sessions..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-3 w-full md:w-80 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                    />
                </div>
            </header>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="h-48 bg-white/5 rounded-3xl animate-pulse" />
                    ))}
                </div>
            ) : filteredSessions.length === 0 ? (
                <div className="h-[40vh] flex flex-col items-center justify-center text-center opacity-50">
                    <History className="w-16 h-16 mb-4" />
                    <p className="text-xl">No sessions found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredSessions.map((session) => (
                        <motion.div
                            layout
                            key={session.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -8 }}
                            onClick={() => navigate('/app/writer', { state: { sessionId: session.id } })}
                            className="group cursor-pointer"
                        >
                            <GlassCard className="!p-8 h-full flex flex-col justify-between border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all relative overflow-hidden active:scale-95">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-3xl rounded-full translate-x-10 -translate-y-10 group-hover:bg-purple-500/10 transition-colors"></div>

                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-purple-500/10 group-hover:text-purple-400 transition-colors mb-6 shadow-xl">
                                        <BarChart2 className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 font-['Outfit'] truncate">{session.title}</h3>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                                            <Calendar className="w-4 h-4" />
                                            Created: {new Date(session.created_at).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                                            <Clock className="w-4 h-4" />
                                            Last active: {new Date(session.updated_at || session.created_at).toLocaleTimeString()}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex items-center justify-between relative z-10">
                                    <span className="text-xs font-bold uppercase tracking-widest text-purple-400/70 py-1.5 px-3 bg-purple-500/5 rounded-lg border border-purple-500/10 group-hover:bg-purple-500/10 group-hover:text-purple-400 transition-all">
                                        Open Workshop
                                    </span>
                                    <button
                                        onClick={(e) => handleDelete(e, session.id)}
                                        className="p-3 bg-white/0 hover:bg-red-500/10 rounded-xl text-gray-500 hover:text-red-400 transition-all"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SessionsPage;
