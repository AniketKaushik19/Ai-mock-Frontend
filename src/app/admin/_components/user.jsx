import { useState } from "react";
import {
    Search,
    MoreVertical,
    UserCheck,
    UserX,
    Mail,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const mockUsers = [
    {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        status: "active",
        interviews: 15,
        joinedDate: "2025-01-15",
        subscription: "Premium",
    },
    {
        id: "2",
        name: "Sarah Smith",
        email: "sarah.smith@example.com",
        status: "active",
        interviews: 8,
        joinedDate: "2025-01-20",
        subscription: "Free",
    },
    {
        id: "3",
        name: "Michael Johnson",
        email: "michael.j@example.com",
        status: "inactive",
        interviews: 3,
        joinedDate: "2025-01-10",
        subscription: "Basic",
    },
];

export default function UserManagement() {
    const [searchQuery, setSearchQuery] = useState("");
    const [users, setUsers] = useState(mockUsers);

    const filteredUsers = users.filter(
        (u) =>
            u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleStatus = (id) => {
        setUsers(
            users.map((u) =>
                u.id === id
                    ? { ...u, status: u.status === "active" ? "inactive" : "active" }
                    : u
            )
        );
    };

    const activeStudents = users.filter((u) => u.status === "active").length;
    const totalInterviews = users.reduce((sum, u) => sum + u.interviews, 0);

    return (
        <div className="p-8 bg-slate-50 min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-1">
                    Student Management
                </h2>
                <p className="text-slate-600">
                    Manage students, activity, and subscriptions
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl border border-slate-200">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-slate-500">Total Students</p>
                            <p className="text-3xl font-bold">{users.length}</p>
                        </div>
                        <UserCheck className="size-12 text-indigo-600 opacity-20" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-slate-500">Active Students</p>
                            <p className="text-3xl font-bold">{activeStudents}</p>
                        </div>
                        <UserCheck className="size-12 text-teal-600 opacity-20" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-slate-500">Total Interviews</p>
                            <p className="text-3xl font-bold">{totalInterviews}</p>
                        </div>
                        <Mail className="size-12 text-purple-600 opacity-20" />
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                    <Input
                        placeholder="Search students by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Student</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Plan</TableHead>
                            <TableHead>Interviews</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {filteredUsers.map((u) => (
                            <TableRow key={u.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                                            {u.name.charAt(0)}
                                        </div>
                                        <span className="font-medium">{u.name}</span>
                                    </div>
                                </TableCell>

                                <TableCell className="text-slate-600">
                                    {u.email}
                                </TableCell>

                                <TableCell>
                                    <Badge
                                        className={
                                            u.status === "active"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-slate-200 text-slate-700"
                                        }
                                    >
                                        {u.status}
                                    </Badge>
                                </TableCell>

                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className={
                                            u.subscription === "Premium"
                                                ? "border-purple-600 text-purple-600"
                                                : u.subscription === "Basic"
                                                    ? "border-indigo-600 text-indigo-600"
                                                    : "border-slate-400 text-slate-600"
                                        }
                                    >
                                        {u.subscription}
                                    </Badge>
                                </TableCell>

                                <TableCell className="font-semibold">
                                    {u.interviews}
                                </TableCell>

                                <TableCell className="text-slate-600">
                                    {u.joinedDate}
                                </TableCell>

                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                <MoreVertical className="size-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                                            <DropdownMenuItem>Send Email</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => toggleStatus(u.id)}>
                                                {u.status === "active"
                                                    ? "Deactivate Student"
                                                    : "Activate Student"}
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-600">
                                                Remove Student
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
