"use client";

import { useEffect, useState } from "react";
import { Plus, MoreVertical, Shield, Loader2, X, Search, User } from "lucide-react";

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
    const { data, isLoading } = useGetAllAdmins();
    const allAdmins = data?.admin || [];

    const createAdmin = useAdminCreate();
    const updateAdmin = useAdminUpdate();
    const deleteAdmin = useAdminDelete();


    const [admins, setAdmins] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const [form, setForm] = useState({
        id: null,
        name: "",
        email: "",
        password: "",
    });

    const isSubmitting = createAdmin.isPending || updateAdmin.isPending;

    useEffect(() => {
        if (!Array.isArray(allAdmins)) return;

        const mapped = allAdmins.map((a) => ({
            id: a.id,
            name: a.name,
            email: a.email,
            role: a.role || "Admin",
            joinedDate: a.created_at
                ? new Date(a.created_at).toLocaleDateString("en-IN")
                : "-",
        }));

        setAdmins(mapped);
    }, [allAdmins]);

    const filteredAdmins = admins.filter(
        (a) =>
            a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const resetForm = () =>
        setForm({ id: null, name: "", email: "", password: "" });

    const handleSubmit = () => {
        if (!form.name || !form.email) return;
        if (!form.id && !form.password) return;

        if (form.id) {
            updateAdmin.mutate(
                {
                    adminId: form.id,
                    data: {
                        name: form.name,
                        email: form.email,
                        ...(form.password && { password: form.password }),
                    },
                },
                { onSuccess: resetForm }
            );
        } else {
            createAdmin.mutate(
                {
                    name: form.name,
                    email: form.email,
                    password: form.password,
                },
                { onSuccess: resetForm }
            );
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-Secondary">
                <Loader2 className="w-12 h-12 animate-spin text-white" />
            </div>
        );
    }

    return (
        <div className="p-8 bg-Secondary min-h-screen">
            <h2 className="text-2xl font-semibold text-white mb-6">
                Admin Management
            </h2>

            <div className="bg-white p-6 rounded-xl mb-8 border shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg text-gray-800">
                        {form.id ? "Edit Admin" : "Create New Admin"}
                    </h3>

                    {form.id && (
                        <Button variant="ghost" size="sm" onClick={resetForm}>
                            <X className="h-4 w-4 mr-2" />
                            Cancel Edit
                        </Button>
                    )}
                </div>

                <div className="grid md:grid-cols-4 gap-4">
                    <Input
                        placeholder="Full Name"
                        value={form.name}
                        disabled={isSubmitting}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                    />

                    <Input
                        placeholder="Email"
                        value={form.email}
                        disabled={isSubmitting}
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                    />

                    <Input
                        type="password"
                        placeholder={form.id ? "New Password (optional)" : "Password"}
                        value={form.password}
                        disabled={isSubmitting}
                        onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                        }
                    />

                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                            <Plus className="h-4 w-4 mr-2" />
                        )}
                        {form.id ? "Update Admin" : "Create Admin"}
                    </Button>
                </div>
            </div>

            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                    <User size={22} /> Admins
                </h2>
                <div className="flex items-center mb-4 bg-white rounded-lg px-3 py-2 w-80">
                    <Search className="h-4 w-4 text-gray-500 mr-2" />
                    <Input
                        placeholder="Search admin..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border-0 focus-visible:ring-0"
                    />
                </div>
            </div>

            <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-Primary">
                        <TableRow>
                            <TableHead className="text-white">Admin</TableHead>
                            <TableHead className="text-white">Email</TableHead>
                            <TableHead className="text-white">Role</TableHead>
                            <TableHead className="text-right text-white">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {filteredAdmins.map((admin) => (
                            <TableRow key={admin.id}>
                                <TableCell className="font-medium">
                                    {admin.name}
                                </TableCell>

                                <TableCell>{admin.email}</TableCell>

                                <TableCell>
                                    <Badge variant="secondary">
                                        <Shield className="h-3 w-3 mr-1" />
                                        {admin.role}
                                    </Badge>
                                </TableCell>

                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
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
                                                className="text-red-600"
                                                onClick={() =>
                                                    deleteAdmin.mutate(admin.id)
                                                }
                                            >
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}

                        {filteredAdmins.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-12">
                                    No admins found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
