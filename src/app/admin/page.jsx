'use client';
import { useEffect, useState } from "react";
import Sidebar from "./_components/sidebar";
import UserManagement from "./_components/user";
import Subscription from "./_components/subscription";
import AdminManagement from "./_components/adminmanagement";
import useAdminAuthStore from "../../../store/adminAuthStore";
import { useRouter } from "next/navigation";

export default function App() {
    const [activeSection, setActiveSection] = useState("users");
    const {admin}=useAdminAuthStore()
    const router=useRouter()
    useEffect(()=>{
        if(!admin){
            router.replace("/")
        }
    },[admin])

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
