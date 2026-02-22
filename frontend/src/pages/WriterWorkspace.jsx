import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Send, Sparkles, Wand2, Type, ArrowLeft, MoreHorizontal, Settings, Info,
    ChevronDown, MessageSquare, Copy, RotateCcw, Save, Check, Loader2
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import { listParagraphs, writerAPI, enhanceParagraph, createParagraph } from '../services/api';
import { toast } from 'react-hot-toast';

const WriterWorkspace = () => {
    const [input, setInput] = useState('');
    const [paragraphs, setParagraphs] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const sessionId = location.state?.sessionId;
    const scrollRef = useRef(null);
    const [copiedId, setCopiedId] = useState(null);

    const [options, setOptions] = useState({
        mode: 'enhance', // Default to Enhance as per user's preference in text
        tone: 'storyteller',
        level: 'medium',
        genre: 'general',
        wordCount: '300',
        language: 'english'
    });

    useEffect(() => {
        if (!sessionId) {
            toast.error("Please select a session first");
            navigate('/app/dashboard');
            return;
        }
        fetchParagraphs();
    }, [sessionId]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [paragraphs]);

    const fetchParagraphs = async () => {
        try {
            const res = await listParagraphs(sessionId);
            setParagraphs(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSend = async () => {
        if (!input.trim() || loading) return;
        const currentInput = input;
        setInput('');
        setLoading(true);

        try {
            // Use writerAPI which handles both generate and enhance based on internal logic 
            // or we can map them specifically if needed. The provided backend uses WriterView
            const res = await writerAPI({
                session_id: sessionId,
                user_input: currentInput,
                mode: options.mode,
                tone: options.tone,
                level: options.level,
                genre: options.genre,
                language: options.language,
                target_words: parseInt(options.wordCount) || 300
            });

            toast.success(options.mode === 'generate' ? "Script generated!" : "Content enhanced!");
            await fetchParagraphs();
        } catch (err) {
            toast.error("Failed to process request");
            setInput(currentInput);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        toast.success("Copied to clipboard");
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto flex flex-col h-full relative">

            {/* Scrollable Content Area */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto pb-44 space-y-12 scrollbar-hide pt-4"
            >
                {paragraphs.length === 0 && !loading && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="h-[60vh] flex flex-col items-center justify-center text-center opacity-70"
                    >
                        <div className="w-20 h-20 bg-premium-gradient rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl shadow-purple-500/20">
                            <Sparkles className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-3xl font-bold mb-4 font-['Outfit']">What are we creating today?</h3>
                        <p className="max-w-md text-gray-400 text-lg leading-relaxed">
                            Start writing your story or paste text to enhance. AI Writer is ready to assist.
                        </p>
                    </motion.div>
                )}

                <AnimatePresence initial={false}>
                    {paragraphs.map((para) => (
                        <motion.div
                            key={para.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="group"
                        >
                            <div className="flex items-start gap-6">
                                <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-lg group-hover:border-purple-500/30 transition-colors">
                                    <Type className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div className="glass-card !bg-white/[0.03] !p-8 border-white/5 rounded-3xl group-hover:border-white/10 transition-all relative">
                                        <p className="text-gray-200 text-lg leading-relaxed whitespace-pre-wrap font-medium">
                                            {para.content}
                                        </p>

                                        <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6">
                                            <div className="flex gap-6">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Drift Score</span>
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-1.5 w-16 bg-white/5 rounded-full overflow-hidden">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${(para.drift_score || 0) * 100}%` }}
                                                                className="h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                                                            />
                                                        </div>
                                                        <span className="text-xs font-mono text-blue-400">{(para.drift_score?.toFixed(2)) || '0.00'}</span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Consistency</span>
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-1.5 w-16 bg-white/5 rounded-full overflow-hidden">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${(para.consistency_score || 0) * 100}%` }}
                                                                className="h-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"
                                                            />
                                                        </div>
                                                        <span className="text-xs font-mono text-green-400">{(para.consistency_score?.toFixed(2)) || '0.00'}</span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Emotion</span>
                                                    <span className="text-xs font-bold text-purple-400 uppercase tracking-tighter">{para.emotion || 'Neutral'}</span>
                                                </div>
                                            </div>

                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleCopy(para.content, para.id)}
                                                    className="p-2.5 hover:bg-white/5 rounded-xl text-gray-400 hover:text-white transition-all"
                                                    title="Copy"
                                                >
                                                    {copiedId === para.id ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                                                </button>
                                                <button className="p-2.5 hover:bg-white/5 rounded-xl text-gray-400 hover:text-white transition-all" title="Regenerate">
                                                    <RotateCcw className="w-5 h-5" />
                                                </button>
                                                <button className="p-2.5 hover:bg-white/5 rounded-xl text-gray-400 hover:text-white transition-all" title="Save">
                                                    <Save className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Hover Glow */}
                                        <div className="absolute inset-0 bg-purple-500/[0.02] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity rounded-3xl"></div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-4 text-purple-400 font-medium"
                    >
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>AI Writer is thinking...</span>
                    </motion.div>
                )}
            </div>

            {/* Floating Input Area (ChatGPT Style) */}
            <div className="sticky bottom-6 w-full max-w-4xl mx-auto px-4 z-40 transition-all duration-300 mb-10">
                <div className="glass-card !bg-slate-900 shadow-2xl p-4 border-white/10 rounded-[3rem]">

                    {/* Control Bar */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 mb-2 overflow-x-auto scrollbar-hide">
                        <div className="flex bg-white/5 p-1 rounded-2xl mr-4 shrink-0">
                            <button
                                onClick={() => setOptions({ ...options, mode: 'generate' })}
                                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${options.mode === 'generate' ? 'bg-premium-gradient text-white shadow-lg shadow-purple-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            >
                                Generate Mode
                            </button>
                            <button
                                onClick={() => setOptions({ ...options, mode: 'enhance' })}
                                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${options.mode === 'enhance' ? 'bg-premium-gradient text-white shadow-lg shadow-purple-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            >
                                Enhance Mode
                            </button>
                        </div>

                        {options.mode === 'generate' ? (
                            <>
                                <div className="flex items-center gap-2 shrink-0">
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2">Genre</span>
                                    <select
                                        value={options.genre}
                                        onChange={(e) => setOptions({ ...options, genre: e.target.value })}
                                        className="bg-white/5 border border-white/5 rounded-xl text-xs py-1.5 px-3 outline-none focus:border-purple-500/50 cursor-pointer text-white"
                                    >
                                        <option value="general" className="bg-slate-900 text-white">General</option>
                                        <option value="sci-fi" className="bg-slate-900 text-white">Sci-Fi</option>
                                        <option value="noir" className="bg-slate-900 text-white">Noir</option>
                                        <option value="drama" className="bg-slate-900 text-white">Drama</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2">Words</span>
                                    <input
                                        type="number"
                                        value={options.wordCount}
                                        onChange={(e) => setOptions({ ...options, wordCount: e.target.value })}
                                        className="bg-white/5 border border-white/5 rounded-xl text-xs py-1.5 px-3 w-16 outline-none focus:border-purple-500/50"
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex items-center gap-2 shrink-0">
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2">Intensity</span>
                                    <select
                                        value={options.level}
                                        onChange={(e) => setOptions({ ...options, level: e.target.value })}
                                        className="bg-white/5 border border-white/5 rounded-xl text-xs py-1.5 px-3 outline-none focus:border-purple-500/50 cursor-pointer text-white"
                                    >
                                        <option value="low" className="bg-slate-900 text-white">Subtle</option>
                                        <option value="medium" className="bg-slate-900 text-white">Medium</option>
                                        <option value="high" className="bg-slate-900 text-white">Complex</option>
                                    </select>
                                </div>
                            </>
                        )}

                        <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2">Tone</span>
                            <select
                                value={options.tone}
                                onChange={(e) => setOptions({ ...options, tone: e.target.value })}
                                className="bg-white/5 border border-white/5 rounded-xl text-xs py-1.5 px-3 outline-none focus:border-purple-500/50 cursor-pointer text-white"
                            >
                                <option value="storyteller" className="bg-slate-900 text-white">Storyteller</option>
                                <option value="formal" className="bg-slate-900 text-white">Formal</option>
                                <option value="casual" className="bg-slate-900 text-white">Casual</option>
                                <option value="technical" className="bg-slate-900 text-white">Technical</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 border-l border-white/5 pl-2 ml-2">
                            <span className="text-[10px] font-bold text-premium-gradient uppercase tracking-widest px-2 group">Language</span>
                            <select
                                value={options.language}
                                onChange={(e) => setOptions({ ...options, language: e.target.value })}
                                className="bg-white/10 border border-purple-500/30 rounded-xl text-xs py-1.5 px-3 outline-none focus:border-purple-500 cursor-pointer font-bold text-purple-200"
                            >
                                <option value="english" className="bg-slate-900 text-white">English (US)</option>
                                <option value="hindi" className="bg-slate-900 text-white">Hindi (हिन्दी)</option>
                            </select>
                        </div>
                    </div>

                    {/* Input Box */}
                    <div className="relative flex items-end gap-3 px-4 py-2">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                            placeholder="Type your content or story prompt here..."
                            className="w-full bg-transparent p-4 pb-4 outline-none resize-none max-h-[350px] min-h-[100px] scrollbar-hide text-xl font-medium tracking-tight placeholder:text-gray-600"
                            rows={1}
                            style={{ height: 'auto' }}
                            onInput={(e) => {
                                e.target.style.height = 'auto';
                                e.target.style.height = e.target.scrollHeight + 'px';
                            }}
                        />
                        <button
                            onClick={handleSend}
                            disabled={loading || !input.trim()}
                            className={`mb-2 p-4 rounded-[1.5rem] transition-all ${input.trim() ? 'bg-premium-gradient text-white shadow-xl shadow-purple-500/30 active:scale-95 hover:scale-105' : 'bg-white/5 text-gray-500 cursor-not-allowed'}`}
                        >
                            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
                <p className="mt-4 text-center text-[10px] text-gray-500 font-bold uppercase tracking-widest opacity-50">
                    Atharva AI Engine v2.0 • Advanced Narrative Processing
                </p>
            </div>
        </div>
    );
};

export default WriterWorkspace;
