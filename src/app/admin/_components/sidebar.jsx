"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Shield, CreditCard } from "lucide-react";

const navItems = [
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Admins", href: "/admin/admins", icon: Shield },
    { name: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-slate-950 text-white p-6">
            <h2 className="text-xl font-bold mb-8">Admin Panel</h2>

            <nav className="space-y-2">
                {navItems.map((item) => {
                    const active = pathname === item.href;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${active
                                    ? "bg-indigo-600 text-white"
                                    : "text-slate-300 hover:bg-slate-800"
                                }`}
                        >
                            <item.icon size={18} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
