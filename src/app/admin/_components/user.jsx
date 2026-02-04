"use client";

import { useEffect, useState } from "react";
import { Search, MoreVertical } from "lucide-react";

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

import { useDeleteUser, useGetAllUser } from "@/hooks/admin";
import Loading from "@/app/_component/Loading";

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  
  const { data, isPending } = useGetAllUser();
  const {mutateAsync,isPending:deletePending}=useDeleteUser()
  const allUser = data?.allUser || [];
  console.log(allUser);
  
  
  useEffect(() => {
    if (!Array.isArray(allUser)) return;

    const mapped = allUser.map((u) => ({
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
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isPending) {
    return <div className="p-8">Loading...</div>;
  }
  const handleDelete=async(userId)=> {
     await mutateAsync(userId)
  }
    const handleEmail = (email) => {
    // Gmail compose link
    const gmailUrl =
      `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;

    window.open(gmailUrl, "_blank"); // opens Gmail in a new tab
  };


  return (
    <div className="p-8">
      <Input
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4"
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Interviews</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredUsers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            filteredUsers.map((u) => (
              <TableRow key={u.id}>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>

                <TableCell>
                  <Badge>{u.status}</Badge>
                </TableCell>

                <TableCell>{u.subscription}</TableCell>
                <TableCell>{u.interviews}</TableCell>
                <TableCell>{u.joinedDate}</TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="ghost">
                        <MoreVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem><button onClick={()=>handleEmail(u.email)} >Email</button></DropdownMenuItem>
                      <DropdownMenuItem className={"bg-red-500 text-white"} >
                        {deletePending ? <Loading/>:
                        <button onClick={()=>{handleDelete(u.id)}}>Delete</button>
                        }
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
  );
}
