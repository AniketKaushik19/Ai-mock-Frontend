"use client";

import { useEffect, useState } from "react";
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

import {
  Search,
  MoreVertical,
  Mail,
  Trash2,
  User,
  Calendar,
  CreditCard,
  Loader2,
} from "lucide-react";

import { useGetAllUser } from "@/hooks/admin";
import Loading from "@/app/_component/Loading";

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);

  const { data, isPending } = useGetAllUser();
  const allUser = data?.allUser || [];
  console.log(allUser);

  useEffect(() => {
    if (!Array.isArray(allUser)) return;
    const mapped = allUser
      .filter((u) => u.subscription_name && u.subscription_name !== "Free")
      .map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        status: u.subscription_name ? "active" : "inactive",
        subscription: u.subscription_name || "Free",
        interviews: Number(u.interview_attempts) || 0,
        joinedDate: new Date(u.created_at).toLocaleDateString("en-IN"),
      }));
    setUsers(mapped);
  }, [allUser]);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-Secondary">
        <Loader2 className="animate-spin  w-12 h-12 text-white " />
      </div>
    );
  }

  const handleEmail = (email) => {
    // Gmail compose link
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;

    window.open(gmailUrl, "_blank"); // opens Gmail in a new tab
  };

  return (
    <div className="p-4 md:p-8 bg-Secondary min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
          <User size={22} /> Students
        </h2>

        <div className="relative w-full md:w-72">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/90 w-full"
          />
        </div>
      </div>

      {/* Table Card */}
      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-Primary">
              <TableRow>
                <TableHead className="text-white">Student</TableHead>
                <TableHead className="text-white">Email</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-white">Plan</TableHead>
                <TableHead className="text-white">Interviews</TableHead>
                <TableHead className="text-white">Joined</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-10 text-gray-500"
                  >
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((u) => (
                  <TableRow key={u.id} className="hover:bg-slate-50 transition">
                    {/* Student */}
                    <TableCell className="font-medium flex items-center gap-2">
                      <User size={16} className="text-gray-500" />
                      {u.name}
                    </TableCell>

                    {/* Email */}
                    <TableCell className="text-gray-600">{u.email}</TableCell>

                    {/* Status */}
                    <TableCell>
                      <Badge
                        className={`${
                          u.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {u.status}
                      </Badge>
                    </TableCell>

                    {/* Plan */}
                    <TableCell className="flex items-center gap-2 text-gray-700">
                      <CreditCard size={14} />
                      {u.subscription}
                    </TableCell>

                    {/* Interviews */}
                    <TableCell className="text-center font-semibold">
                      {u.interviews}
                    </TableCell>

                    {/* Joined */}
                    <TableCell className="flex items-center gap-2 text-gray-600">
                      <Calendar size={14} />
                      {u.joinedDate}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="hover:bg-slate-100"
                          >
                            <MoreVertical size={16} />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem
                            onClick={() => handleEmail(u.email)}
                            className="flex items-center gap-2"
                          >
                            <Mail size={14} /> Email
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
