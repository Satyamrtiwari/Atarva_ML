import React from 'react';
import { motion } from 'framer-motion';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, RadialBarChart, RadialBar, Legend
} from 'recharts';
import {
    BarChart2, TrendingUp, Zap, Sparkles, Target, Activity, PieChart as PieIcon,
    CircleDot, Smile, Ghost
} from 'lucide-react';
import GlassCard from '../components/GlassCard';

const lineData = [
    { name: '10 AM', readability: 65, consistency: 80 },
    { name: '12 PM', readability: 72, consistency: 78 },
    { name: '2 PM', readability: 68, consistency: 85 },
    { name: '4 PM', readability: 85, consistency: 92 },
    { name: '6 PM', readability: 81, consistency: 88 },
    { name: '8 PM', readability: 89, consistency: 94 },
];

const barData = [
    { name: 'Excitement', value: 85 },
    { name: 'Mystery', value: 72 },
    { name: 'Joy', value: 45 },
    { name: 'Melancholy', value: 30 },
    { name: 'Fear', value: 15 },
];

const pieData = [
    { name: 'Storyteller', value: 400 },
    { name: 'Formal', value: 300 },
    { name: 'Casual', value: 300 },
    { name: 'Technical', value: 200 },
];

const radialData = [
    { name: 'Drift', value: 24, fill: '#8b5cf6' },
];

const COLORS = ['#6366f1', '#a855f7', '#ec4899', '#f43f5e'];

const AnalyticsPage = () => {
    return (
        <div className="space-y-10 pb-20">
            <header>
                <h1 className="text-4xl font-bold font-['Outfit'] mb-2">Analytics Dashboard</h1>
                <p className="text-gray-400 font-medium">Deep insights into your writing patterns and AI-driven enhancements.</p>
            </header>

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Enhancements', val: '1,284', icon: Zap, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                    { label: 'Scripts Generated', val: '52', icon: Sparkles, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                    { label: 'Avg. Consistency', val: '92.4%', icon: Target, color: 'text-green-400', bg: 'bg-green-500/10' },
                    { label: 'Avg. Readability', val: '78.5', icon: Activity, color: 'text-pink-400', bg: 'bg-pink-500/10' },
                ].map((stat, i) => (
                    <GlassCard key={i} className="flex items-center gap-5 border-white/5">
                        <div className={`p-4 ${stat.bg} ${stat.color} rounded-2xl shadow-xl`}>
                            <stat.icon className="w-7 h-7" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
                            <h3 className="text-3xl font-extrabold font-['Outfit']">{stat.val}</h3>
                        </div>
                    </GlassCard>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Readability Chart */}
                <GlassCard className="h-[450px] border-white/5 flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-purple-400" /> Readability Over Time
                        </h3>
                        <span className="text-xs font-bold text-gray-500 bg-white/5 px-3 py-1 rounded-full uppercase tracking-tighter">Last 24 Hours</span>
                    </div>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={lineData}>
                                <defs>
                                    <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #ffffff10', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
                                    itemStyle={{ color: '#fff', fontSize: '12px' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="readability"
                                    stroke="#a855f7"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#purpleGradient)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="consistency"
                                    stroke="#6366f1"
                                    strokeWidth={4}
                                    fillOpacity={0}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                {/* Emotion Distribution */}
                <GlassCard className="h-[450px] border-white/5 flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <Smile className="w-5 h-5 text-pink-400" /> Emotion Distribution
                        </h3>
                    </div>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData} layout="vertical">
                                <CartesianGrid stroke="#ffffff05" horizontal={false} strokeDasharray="5 5" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} width={100} />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #ffffff10', borderRadius: '16px' }}
                                />
                                <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={25}>
                                    {barData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                {/* Tone Usage & Drift */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:col-span-2">
                    <GlassCard className="h-[400px] flex flex-col items-center">
                        <h3 className="text-xl font-bold mb-8 w-full flex items-center gap-2">
                            <PieIcon className="w-5 h-5 text-indigo-400" /> Tone Usage Patterns
                        </h3>
                        <div className="flex-1 w-full flex items-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        innerRadius={80}
                                        outerRadius={120}
                                        paddingAngle={8}
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #ffffff10', borderRadius: '16px' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </GlassCard>

                    <GlassCard className="h-[400px] flex flex-col items-center justify-center relative">
                        <h3 className="text-xl font-bold mb-8 w-full absolute top-8 left-8 flex items-center gap-2">
                            <CircleDot className="w-5 h-5 text-purple-400" /> Narrative Drift Score
                        </h3>
                        <div className="w-full h-full flex flex-col items-center justify-center pt-10">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadialBarChart
                                    innerRadius="60%"
                                    outerRadius="100%"
                                    barSize={20}
                                    data={radialData}
                                    startAngle={180}
                                    endAngle={0}
                                >
                                    <RadialBar
                                        minAngle={15}
                                        background={{ fill: '#ffffff05' }}
                                        clockWise
                                        dataKey="value"
                                        cornerRadius={20}
                                    />
                                    <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
                                </RadialBarChart>
                            </ResponsiveContainer>
                            <div className="absolute top-[60%] flex flex-col items-center">
                                <span className="text-5xl font-extrabold font-['Outfit'] text-purple-400">24%</span>
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-2">Optimal range</span>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
