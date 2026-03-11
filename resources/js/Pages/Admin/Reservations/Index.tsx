'use client';

import AdminLayout from '@/Layouts/AdminLayout';
import { router } from '@inertiajs/react';
import { Check, X, Trash2, Calendar, Clock, User, Users, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

interface Reservation {
    id: number;
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    guests: number;
    special_requests: string;
    status: 'pending' | 'confirmed' | 'cancelled';
}

interface Props {
    reservations: Reservation[];
}

export default function ReservationIndex({ reservations }: Props) {
    const updateStatus = (id: number, status: string) => {
        router.patch(`/admin/reservations/${id}/status`, { status });
    };

    const handleDelete = (id: number) => {
        if (confirm('Delete this reservation records?')) {
            router.delete(`/admin/reservations/${id}`);
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-12">
                <header>
                    <h1 className="text-4xl font-playfair font-bold text-white mb-2 uppercase tracking-tight">Reservations</h1>
                    <p className="text-white/40 font-cairo text-lg">Manage your guest bookings and requests.</p>
                </header>

                <div className="bg-charcoal rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left font-cairo">
                            <thead>
                                <tr className="text-white/40 text-xs uppercase tracking-widest border-b border-white/5 bg-black/20">
                                    <th className="p-6 font-bold">Guest Detail</th>
                                    <th className="p-6 font-bold">Schedule</th>
                                    <th className="p-6 font-bold">Guests</th>
                                    <th className="p-6 font-bold">Special Requests</th>
                                    <th className="p-6 font-bold">Status</th>
                                    <th className="p-6 font-bold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {reservations.length > 0 ? (
                                    reservations.map((res, i) => (
                                        <motion.tr
                                            key={res.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="group hover:bg-white/[0.02] transition-colors"
                                        >
                                            <td className="p-6">
                                                <div className="flex flex-col">
                                                    <span className="text-white font-bold text-lg">{res.name}</span>
                                                    <span className="text-white/40 text-xs">{res.email}</span>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex flex-col space-y-1">
                                                    <div className="flex items-center gap-2 text-white/60 text-sm">
                                                        <Calendar size={14} className="text-saffron" />
                                                        {res.date}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-white/60 text-sm">
                                                        <Clock size={14} className="text-saffron" />
                                                        {res.time}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6 text-white/60">
                                                <div className="flex items-center gap-2">
                                                    <Users size={16} />
                                                    {res.guests} people
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                {res.special_requests ? (
                                                    <div className="max-w-xs text-xs text-white/40 italic line-clamp-2 hover:line-clamp-none transition-all cursor-help">
                                                        "{res.special_requests}"
                                                    </div>
                                                ) : (
                                                    <span className="text-white/10 italic text-xs">No special requests</span>
                                                )}
                                            </td>
                                            <td className="p-6">
                                                <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold border ${res.status === 'confirmed' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                        res.status === 'cancelled' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                                            'bg-orange-500/10 text-orange-400 border-orange-500/20'
                                                    }`}>
                                                    {res.status}
                                                </span>
                                            </td>
                                            <td className="p-6 text-right">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {res.status !== 'confirmed' && (
                                                        <button
                                                            onClick={() => updateStatus(res.id, 'confirmed')}
                                                            className="w-10 h-10 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-white transition-all flex items-center justify-center p-2"
                                                            title="Confirm"
                                                        >
                                                            <Check size={18} />
                                                        </button>
                                                    )}
                                                    {res.status !== 'cancelled' && (
                                                        <button
                                                            onClick={() => updateStatus(res.id, 'cancelled')}
                                                            className="w-10 h-10 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center p-2"
                                                            title="Cancel"
                                                        >
                                                            <X size={18} />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleDelete(res.id)}
                                                        className="w-10 h-10 rounded-lg bg-white/5 text-white/40 hover:bg-red-600 hover:text-white transition-all flex items-center justify-center p-2"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="p-20 text-center">
                                            <div className="flex flex-col items-center space-y-4 opacity-20">
                                                <Calendar size={64} />
                                                <p className="text-xl font-playfair italic">No reservations found yet.</p>
                                            </div>
                                        </td>
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
