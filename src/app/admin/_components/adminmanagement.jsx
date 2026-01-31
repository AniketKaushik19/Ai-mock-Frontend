import { useState } from "react";
import { Plus, Search, MoreVertical, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const initialAdmins = [
    {
        id: "1",
        name: "Super Admin",
        email: "admin@countryedu.in",
        role: "Super",
    },
    {
        id: "2",
        name: "Support Admin",
        email: "support@countryedu.in",
        role: "Admin",
    },
];

export default function AdminManagement() {
    const [admins, setAdmins] = useState(initialAdmins);
    const [search, setSearch] = useState("");
    const [form, setForm] = useState({
        id: null,
        name: "",
        email: "",
        password: "",
        role: "Admin",
    });

    const filteredAdmins = admins.filter(
        (a) =>
            a.name.toLowerCase().includes(search.toLowerCase()) ||
            a.email.toLowerCase().includes(search.toLowerCase())
    );

    const resetForm = () =>
        setForm({ id: null, name: "", email: "", password: "", role: "Admin" });

    const handleSubmit = () => {
        if (!form.name || !form.email || (!form.id && !form.password)) return;

        if (form.id) {
            setAdmins(
                admins.map((a) =>
                    a.id === form.id
                        ? { ...a, name: form.name, email: form.email, role: form.role }
                        : a
                )
            );
        } else {
            setAdmins([
                ...admins,
                {
                    id: Date.now().toString(),
                    name: form.name,
                    email: form.email,
                    role: form.role,
                },
            ]);
        }
        resetForm();
    };

    const handleEdit = (admin) => setForm({ ...admin, password: "" });
    const handleDelete = (id) =>
        setAdmins(admins.filter((a) => a.id !== id));

    return (
        <div className="p-8 bg-slate-950 min-h-screen text-slate-100">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold">Admin Management</h2>
                <p className="text-slate-400">
                    Create, update, and manage platform admins
                </p>
            </div>

            {/* Create / Edit */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
                <h3 className="font-semibold mb-4 text-slate-100">
                    {form.id ? "Edit Admin" : "Create New Admin"}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Input
                        className="bg-slate-950 border-slate-700 text-slate-100"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <Input
                        className="bg-slate-950 border-slate-700 text-slate-100"
                        placeholder="Email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <Input
                        className="bg-slate-950 border-slate-700 text-slate-100"
                        placeholder={form.id ? "New Password (optional)" : "Password"}
                        type="password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                    <Button className="bg-indigo-600 hover:bg-indigo-700 gap-2">
                        <Plus className="size-4" />
                        {form.id ? "Update Admin" : "Add Admin"}
                    </Button>
                </div>
            </div>

            {/* Search */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6">
                <div className="relative max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
                    <Input
                        className="pl-9 bg-slate-950 border-slate-700 text-slate-100"
                        placeholder="Search admins..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="text-slate-400">Admin</TableHead>
                            <TableHead className="text-slate-400">Email</TableHead>
                            <TableHead className="text-slate-400">Role</TableHead>
                            <TableHead className="text-right text-slate-400">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {filteredAdmins.map((admin) => (
                            <TableRow
                                key={admin.id}
                                className="hover:bg-slate-800/50"
                            >
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="size-9 bg-indigo-600 rounded-full flex items-center justify-center font-semibold">
                                            {admin.name.charAt(0)}
                                        </div>
                                        {admin.name}
                                    </div>
                                </TableCell>

                                <TableCell className="text-slate-400">
                                    {admin.email}
                                </TableCell>

                                <TableCell>
                                    <Badge
                                        className={
                                            admin.role === "Super"
                                                ? "bg-purple-900/40 text-purple-300"
                                                : "bg-indigo-900/40 text-indigo-300"
                                        }
                                    >
                                        <Shield className="size-3 mr-1" />
                                        {admin.role}
                                    </Badge>
                                </TableCell>

                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm" className="text-slate-300">
                                                <MoreVertical className="size-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            align="end"
                                            className="bg-slate-900 border-slate-800 text-slate-100"
                                        >
                                            <DropdownMenuItem onClick={() => handleEdit(admin)}>
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="text-red-400"
                                                onClick={() => handleDelete(admin.id)}
                                            >
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
