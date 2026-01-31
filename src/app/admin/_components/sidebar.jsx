import {
    Users,
    CreditCard,
    GraduationCap,
    ShieldCheck,
} from "lucide-react";

export default function Sidebar({ activeSection, onSectionChange }) {
    const menuItems = [
        { id: "admins", label: "Admin Management", icon: ShieldCheck },
        { id: "users", label: "Users", icon: Users },
        { id: "subscriptions", label: "Plans & Payments", icon: CreditCard },

    ];

    return (
        <div className="w-64 bg-slate-900 text-white min-h-screen flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-600 rounded-lg">
                        <GraduationCap className="size-7 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-wide">CountryEdu</h1>
                        <p className="text-sm text-slate-400">Admin Dashboard</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.id;

                        return (
                            <li key={item.id}>
                                <button
                                    onClick={() => onSectionChange(item.id)}
                                    className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                    ${isActive
                                            ? "bg-indigo-600 text-white shadow-md"
                                            : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                        }
                  `}
                                >
                                    <Icon className="size-5" />
                                    <span className="font-medium">{item.label}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800">
                <div className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-800 transition">
                    <div className="size-9 bg-teal-500 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-slate-900">CE</span>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-semibold">Admin</p>
                        <p className="text-xs text-slate-400">admin@countryedu.in</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
