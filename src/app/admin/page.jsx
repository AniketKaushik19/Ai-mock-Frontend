'use client';
import { useState } from "react";
import Sidebar from "./_components/sidebar";
import UserManagement from "./_components/user";
import Subscription from "./_components/subscription";
import AdminManagement from "./_components/adminmanagement";

export default function App() {
    const [activeSection, setActiveSection] = useState("users");

    return (
        <div className="flex min-h-screen bg-slate-50">


            <main className="flex-1 overflow-auto">
                {activeSection === "admins" && <AdminManagement />}
                {activeSection === "users" && <UserManagement />}
                {activeSection === "subscriptions" && <Subscription />}

            </main>
        </div>
    );
}
