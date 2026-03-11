'use client';

import AdminLayout from '@/Layouts/AdminLayout';
import { Utensils, CalendarDays, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
    stats: {
        total_dishes: number;
        pending_reservations: number;
        total_reservations: number;
    };
    recent_reservations: any[];
}

export default function Dashboard({ stats, recent_reservations }: Props) {
    const statCards = [
        { label: 'Total Dishes', value: stats.total_dishes, icon: Utensils, color: 'text-saffron' },
        { label: 'Pending Bookings', value: stats.pending_reservations, icon: CalendarDays, color: 'text-orange-400' },
        { label: 'Total Reservations', value: stats.total_reservations, icon: TrendingUp, color: 'text-green-400' },
    ];

    return (
        <AdminLayout>
            <div className="space-y-12">
                <header>
                    <h1 className="text-4xl font-playfair font-bold text-white mb-2 uppercase tracking-tight">Admin Overview</h1>
                    <p className="text-white/40 font-cairo">Welcome back. Here is what is happening at Yemeni Restaurant Paris.</p>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {statCards.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-charcoal p-8 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-saffron/20 transition-all"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-white/40 text-sm uppercase tracking-wider mb-2 font-cairo font-bold">{stat.label}</p>
                                    <h4 className="text-4xl font-playfair font-bold text-white tracking-tighter">{stat.value}</h4>
                                </div>
                                <stat.icon className={`${stat.color} opacity-80 group-hover:scale-110 transition-all`} size={32} />
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-saffron/5 rounded-full blur-2xl" />
                        </motion.div>
                    ))}
                </div>

                {/* Recent Bookings Table */}
                <div className="bg-charcoal rounded-2xl border border-white/5 p-8">
                    <h3 className="text-xl font-playfair font-bold text-white mb-8 border-b border-white/5 pb-4">Recent Reservations</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left font-cairo">
                            <thead>
                                <tr className="text-white/40 text-xs uppercase tracking-widest border-b border-white/5">
                                    <th className="pb-4 font-bold">Guest</th>
                                    <th className="pb-4 font-bold">Date & Time</th>
                                    <th className="pb-4 font-bold">Guests</th>
                                    <th className="pb-4 font-bold">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-sm">
                                {recent_reservations.length > 0 ? (
                                    recent_reservations.map((res) => (
                                        <tr key={res.id} className="group hover:bg-white/[0.02]">
                                            <td className="py-4 font-medium text-white">{res.name}</td>
                                            <td className="py-4 text-white/60">{res.date} at {res.time}</td>
                                            <td className="py-4 text-white/60">{res.guests} people</td>
                                            <td className="py-4">
                                                <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold ${res.status === 'confirmed' ? 'bg-green-500/10 text-green-400' :
                                                        res.status === 'cancelled' ? 'bg-red-500/10 text-red-400' :
                                                            'bg-orange-500/10 text-orange-400'
                                                    }`}>
                                                    {res.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="py-12 text-center text-white/20 italic">No recent reservations found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
