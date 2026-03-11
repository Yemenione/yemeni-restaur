'use client';

import { Link } from '@inertiajs/react';
import { LayoutDashboard, Utensils, CalendarDays, LogOut, Menu, Tag, Settings } from 'lucide-react';
import { useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const navItems = [
        { label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
        { label: 'Categories', icon: Tag, href: '/admin/categories' },
        { label: 'Menu Items', icon: Utensils, href: '/admin/menu' },
        { label: 'Reservations', icon: CalendarDays, href: '/admin/reservations' },
        { label: 'Settings', icon: Settings, href: '/admin/settings' },
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white flex font-cairo">
            {/* Sidebar */}
            <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 bg-charcoal border-r border-white/5 flex flex-col`}>
                <div className="p-6 flex items-center justify-between">
                    {isSidebarOpen && <span className="text-saffron font-playfair font-bold text-xl tracking-tighter uppercase">Yemeni Admin</span>}
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white/40 hover:text-white transition-colors">
                        <Menu size={20} />
                    </button>
                </div>

                <nav className="flex-1 mt-10 px-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                        >
                            <item.icon size={20} className="text-saffron group-hover:scale-110 transition-transform" />
                            {isSidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button className="flex items-center space-x-4 p-3 w-full rounded-lg hover:bg-red-500/10 text-red-500 transition-colors">
                        <LogOut size={20} />
                        {isSidebarOpen && <span className="text-sm font-medium">Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 md:p-12 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
