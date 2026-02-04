"use client";

import { useState } from "react";
import { Plus, MoreVertical, Shield, Loader2, X } from "lucide-react";
import {
    useGetAllAdmins,
    useAdminCreate,
    useAdminUpdate,
    useAdminDelete,
} from "@/hooks/admin";

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
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function AdminManagement() {
    const { data: admin = [], isLoading } = useGetAllAdmins();
    const createAdmin = useAdminCreate();
    const updateAdmin = useAdminUpdate();
    const deleteAdmin = useAdminDelete();

    const [form, setForm] = useState({
        id: null,
        name: "",
        email: "",
        password: "",
    });

    const isSubmitting = createAdmin.isPending || updateAdmin.isPending;

    const resetForm = () =>
        setForm({ id: null, name: "", email: "", password: "" });

    const handleSubmit = () => {
        // Basic validation
        if (!form.name || !form.email) return;
        if (!form.id && !form.password) return; // Password required only for create

        if (form.id) {
            updateAdmin.mutate(
                {
                    adminId: form.id,
                    data: {
                        name: form.name,
                        email: form.email,
                        // Only send password if user typed a new one
                        ...(form.password && { password: form.password }),
                    },
                },
                {
                    onSuccess: () => resetForm(),
                }
            );
        } else {
            createAdmin.mutate(
                {
                    name: form.name,
                    email: form.email,
                    password: form.password,
                },
                {
                    onSuccess: () => resetForm(),
                }
            );
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-950 text-white">
                <Loader2 className="animate-spin h-8 w-8 text-indigo-500" />
            </div>
        );
    }

    return (
        <div className="p-8 bg-slate-950 min-h-screen text-white">
            <h2 className="text-3xl font-bold mb-6">Admin Management</h2>

            {/* Create / Edit Section */}
            <div className="bg-slate-900 p-6 rounded-xl mb-8 border border-slate-800">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg">
                        {form.id ? "Edit Admin" : "Create New Admin"}
                    </h3>
                    {form.id && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={resetForm}
                            className="text-slate-400 hover:text-white"
                        >
                            <X className="mr-2 h-4 w-4" /> Cancel Edit
                        </Button>
                    )}
                </div>

                <div className="grid md:grid-cols-4 gap-4">
                    <Input
                        className="bg-slate-950 border-slate-700 text-white"
                        placeholder="Full Name"
                        value={form.name}
                        disabled={isSubmitting}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />

                    <Input
                        className="bg-slate-950 border-slate-700 text-white"
                        placeholder="Email"
                        value={form.email}
                        disabled={isSubmitting}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />

                    <Input
                        className="bg-slate-950 border-slate-700 text-white"
                        placeholder={form.id ? "New Password (optional)" : "Password"}
                        type="password"
                        value={form.password}
                        disabled={isSubmitting}
                        onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                        }
                    />

                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Plus className="mr-2 h-4 w-4" />
                        )}
                        {form.id ? "Update Admin" : "Create Admin"}
                    </Button>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-slate-900 border-slate-800">
                            <TableHead className="text-slate-400">Admin</TableHead>
                            <TableHead className="text-slate-400">Email</TableHead>
                            <TableHead className="text-slate-400">Role</TableHead>
                            <TableHead className="text-right text-slate-400">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {admin.map((admin) => (
                            <TableRow key={admin.id} className="border-slate-800 hover:bg-slate-800/50">
                                <TableCell className="font-semibold text-white">
                                    {admin.name}
                                </TableCell>

                                <TableCell className="text-slate-300">
                                    {admin.email}
                                </TableCell>

                                <TableCell>
                                    <Badge className="bg-indigo-900/40 text-indigo-300 hover:bg-indigo-900/60 border-indigo-800">
                                        <Shield className="h-3 w-3 mr-1" />
                                        {admin.role || "Admin"}
                                    </Badge>
                                </TableCell>

                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                <MoreVertical className="h-4 w-4 text-slate-400" />
                                            </Button>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent
                                            align="end"
                                            className="bg-slate-900 border-slate-800 text-white"
                                        >
                                            <DropdownMenuItem
                                                className="focus:bg-slate-800 focus:text-white cursor-pointer"
                                                onClick={() =>
                                                    setForm({
                                                        id: admin.id,
                                                        name: admin.name,
                                                        email: admin.email,
                                                        password: "",
                                                    })
                                                }
                                            >
                                                Edit
                                            </DropdownMenuItem>

                                            <DropdownMenuItem
                                                className="text-red-500 focus:bg-red-900/20 focus:text-red-400 cursor-pointer"
                                                onClick={() => deleteAdmin.mutate(admin.id)}
                                            >
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}

                        {admin.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="text-center text-slate-400 py-12"
                                >
                                    No admins found. Create one to get started.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}