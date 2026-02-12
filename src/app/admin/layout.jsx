import Sidebar, { MobileSidebar } from "./_components/sidebar";

export default function AdminLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-Secondary">
            <Sidebar />
            <div className="flex-1 flex flex-col min-h-screen min-w-0 overflow-x-hidden">
                <div className="md:hidden w-full p-4 pb-0 bg-Secondary">
                    <MobileSidebar />
                </div>
                <main className="flex-1 overflow-auto w-full">
                    {children}
                </main>
            </div>
        </div>
    );
}
