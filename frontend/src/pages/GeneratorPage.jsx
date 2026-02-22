import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Sparkles, History, Send, Loader2, Wand2, Type, ArrowLeft, ChevronDown, Rocket,
    Film, Library, Globe
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import { writerAPI, generateScript, createSession, listSessions } from '../services/api';
import { toast } from 'react-hot-toast';

const GeneratorPage = () => {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');
    const navigate = useNavigate();

    const [options, setOptions] = useState({
        genre: 'film-noir',
        tone: 'epic',
        length: 'medium'
    });

    const handleGenerate = async () => {
        if (!input.trim() || loading) return;
        setLoading(true);
        setResult('');

        try {
            // Check for existing sessions or create a default one for the generator
            let targetSessionId;
            const sessionsRes = await listSessions();
            if (sessionsRes.data.length > 0) {
                targetSessionId = sessionsRes.data[0].id;
            } else {
                const newSessionRes = await createSession("Quick AI Draft");
                targetSessionId = newSessionRes.data.id;
            }

            toast.success("AI is architecting your narrative...");

            const res = await generateScript({
                session_id: targetSessionId,
                prompt: input,
                genre: options.genre,
                tone: options.tone,
                length: options.length
            });

            if (res.data.generated_text) {
                setResult(res.data.generated_text);
                toast.success("Narrative draft complete!");
            } else {
                throw new Error("No text generated");
            }

        } catch (err) {
            console.error(err);
            toast.error("Generation failed: " + (err.response?.data?.error || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-12 pb-20">
            <header className="text-center space-y-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-20 h-20 bg-premium-gradient rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-purple-500/20"
                >
                    <Sparkles className="w-10 h-10 text-white" />
                </motion.div>
                <h1 className="text-5xl font-extrabold font-['Outfit'] tracking-tight">AI Narrative Generator</h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">Transform high-level concepts into comprehensive narrative frameworks and outlines.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Input & Options */}
                <div className="lg:col-span-2 space-y-8">
                    <GlassCard className="!p-8 border-white/5 space-y-6">
                        <div className="space-y-4">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                <Rocket className="w-4 h-4 text-purple-400" /> Story Concept or Prompt
                            </label>
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="A noir detective hunting a rogue AI in a rain-soaked cyberpunk metropolis..."
                                className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 h-40 outline-none focus:border-purple-500 transition-all text-lg font-medium tracking-tight"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2 flex items-center gap-2">
                                    <Film className="w-3 h-3 text-indigo-400" /> Narrative Genre
                                </label>
                                <select
                                    value={options.genre}
                                    onChange={(e) => setOptions({ ...options, genre: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm font-bold outline-none cursor-pointer hover:bg-white/10 transition-colors"
                                >
                                    <option value="film-noir">Film Noir</option>
                                    <option value="sci-fi">High-End Sci-Fi</option>
                                    <option value="fantasy">Epic Fantasy</option>
                                    <option value="thriller">Psychological Thriller</option>
                                </select>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2 flex items-center gap-2">
                                    <Globe className="w-3 h-3 text-pink-400" /> Atmospheric Tone
                                </label>
                                <select
                                    value={options.tone}
                                    onChange={(e) => setOptions({ ...options, tone: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm font-bold outline-none cursor-pointer hover:bg-white/10 transition-colors"
                                >
                                    <option value="epic">Epic & Cinematic</option>
                                    <option value="gritty">Gritty & Realistic</option>
                                    <option value="whimsical">Whimsical & Light</option>
                                    <option value="dark">Dark & Melancholic</option>
                                </select>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2 flex items-center gap-2">
                                    <Library className="w-3 h-3 text-emerald-400" /> Target Length
                                </label>
                                <select
                                    value={options.length}
                                    onChange={(e) => setOptions({ ...options, length: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm font-bold outline-none cursor-pointer hover:bg-white/10 transition-colors"
                                >
                                    <option value="short">Tactical Draft</option>
                                    <option value="medium">Strategy Outline</option>
                                    <option value="long">Comprehensive Framework</option>
                                </select>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                onClick={handleGenerate}
                                disabled={loading || !input.trim()}
                                className={`w-full premium-button h-16 text-xl !rounded-2xl gap-3 group ${(!input.trim() || loading) && 'opacity-50 grayscale'}`}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                        Initializing Neural Engine...
                                    </>
                                ) : (
                                    <>
                                        Invoke AI Generator <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </GlassCard>
                </div>

                {/* Output Side */}
                <div>
                    <GlassCard className="h-full min-h-[500px] border-white/5 flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-premium-gradient"></div>
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-bold font-['Outfit']">Generated Output</h3>
                            {result && <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest py-1 px-3 bg-emerald-500/10 rounded-full">Complete</span>}
                        </div>

                        <div className="flex-1 text-gray-300 overflow-y-auto scrollbar-hide">
                            {result ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="whitespace-pre-wrap leading-relaxed font-medium italic"
                                >
                                    {result}
                                </motion.div>
                            ) : loading ? (
                                <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-50">
                                    <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ x: '-100%' }}
                                            animate={{ x: '100%' }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                            className="w-full h-full bg-premium-gradient"
                                        />
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-widest">Architecting Narrative...</span>
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-30 space-y-4">
                                    <Wand2 className="w-16 h-16" />
                                    <p className="font-bold uppercase tracking-widest text-xs">Awaiting neural input</p>
                                </div>
                            )}
                        </div>

                        {result && (
                            <div className="mt-8 pt-8 border-t border-white/5 flex gap-4">
                                <button
                                    onClick={() => { navigator.clipboard.writeText(result); toast.success("Copied!"); }}
                                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
                                >
                                    Copy Draft
                                </button>
                                <button className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                                    Export to Session
                                </button>
                            </div>
                        )}
                    </GlassCard>
                </div>

            </div>
        </div>
    );
};

export default GeneratorPage;
