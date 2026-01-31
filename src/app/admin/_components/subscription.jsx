import { useState } from "react";
import {
    Search,
    MoreVertical,
    DollarSign,
    TrendingUp,
    Users,
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

const mockSubscriptions = [
    {
        id: "1",
        userName: "John Doe",
        userEmail: "john.doe@example.com",
        plan: "Premium",
        status: "active",
        startDate: "2025-01-15",
        renewalDate: "2025-02-15",
        amount: 2499,
    },
    {
        id: "2",
        userName: "Sarah Smith",
        userEmail: "sarah.smith@example.com",
        plan: "Free",
        status: "active",
        startDate: "2025-01-20",
        renewalDate: "-",
        amount: 0,
    },
    {
        id: "3",
        userName: "Michael Johnson",
        userEmail: "michael.j@example.com",
        plan: "Basic",
        status: "cancelled",
        startDate: "2025-01-10",
        renewalDate: "2025-02-10",
        amount: 999,
    },
];

export default function Subscription() {
    const [searchQuery, setSearchQuery] = useState("");
    const [subscriptions] = useState(mockSubscriptions);

    const filteredSubscriptions = subscriptions.filter(
        (sub) =>
            sub.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sub.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sub.plan.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const activeSubscriptions = subscriptions.filter(
        (s) => s.status === "active"
    ).length;

    const monthlyRevenue = subscriptions
        .filter((s) => s.status === "active")
        .reduce((sum, s) => sum + s.amount, 0);

    const premiumUsers = subscriptions.filter(
        (s) => s.plan === "Premium" && s.status === "active"
    ).length;

    return (
        <div className="p-8 bg-slate-50 min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-1">
                    Plans & Subscriptions
                </h2>
                <p className="text-slate-600">
                    Manage student plans, renewals, and revenue
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl border border-slate-200">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-slate-500">Active Students</p>
                            <p className="text-3xl font-bold">{activeSubscriptions}</p>
                        </div>
                        <Users className="size-12 text-indigo-600 opacity-20" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-slate-500">Monthly Revenue</p>
                            <p className="text-3xl font-bold">
                                ₹{monthlyRevenue.toLocaleString()}
                            </p>
                        </div>
                        <DollarSign className="size-12 text-teal-600 opacity-20" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-slate-500">Premium Students</p>
                            <p className="text-3xl font-bold">{premiumUsers}</p>
                        </div>
                        <TrendingUp className="size-12 text-purple-600 opacity-20" />
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                    <Input
                        placeholder="Search students or plans..."
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
                            <TableHead>Plan</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Start</TableHead>
                            <TableHead>Renewal</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {filteredSubscriptions.map((sub) => (
                            <TableRow key={sub.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                                            {sub.userName.charAt(0)}
                                        </div>
                                        <span className="font-medium">{sub.userName}</span>
                                    </div>
                                </TableCell>

                                <TableCell className="text-slate-600">
                                    {sub.userEmail}
                                </TableCell>

                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className={
                                            sub.plan === "Premium"
                                                ? "border-purple-600 text-purple-600 bg-purple-50"
                                                : sub.plan === "Basic"
                                                    ? "border-indigo-600 text-indigo-600 bg-indigo-50"
                                                    : "border-slate-400 text-slate-600 bg-slate-50"
                                        }
                                    >
                                        {sub.plan}
                                    </Badge>
                                </TableCell>

                                <TableCell>
                                    <Badge
                                        className={
                                            sub.status === "active"
                                                ? "bg-green-100 text-green-800"
                                                : sub.status === "cancelled"
                                                    ? "bg-orange-100 text-orange-800"
                                                    : "bg-red-100 text-red-800"
                                        }
                                    >
                                        {sub.status}
                                    </Badge>
                                </TableCell>

                                <TableCell className="text-slate-600">
                                    {new Date(sub.startDate).toLocaleDateString()}
                                </TableCell>

                                <TableCell className="text-slate-600">
                                    {sub.renewalDate === "-"
                                        ? "-"
                                        : new Date(sub.renewalDate).toLocaleDateString()}
                                </TableCell>

                                <TableCell className="font-semibold">
                                    {sub.amount > 0 ? `₹${sub.amount}` : "Free"}
                                </TableCell>

                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                <MoreVertical className="size-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>View Student</DropdownMenuItem>
                                            <DropdownMenuItem>Change Plan</DropdownMenuItem>
                                            <DropdownMenuItem>Send Invoice</DropdownMenuItem>
                                            {sub.status === "active" && (
                                                <DropdownMenuItem className="text-red-600">
                                                    Cancel Plan
                                                </DropdownMenuItem>
                                            )}
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
