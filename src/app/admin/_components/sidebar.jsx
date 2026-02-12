"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Shield, CreditCard, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const navItems = [
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Admins", href: "/admin/admins", icon: Shield },
  { name: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-950 text-white p-6 hidden md:block">
      <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
      <SidebarNav />
    </aside>
  );
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-64 bg-slate-950 text-white border-r-slate-800 p-0 !fixed !top-20 !bottom-0 !h-[calc(100vh-5rem)] z-[900] shadow-xl"
        style={{ top: "5rem" }}
      >
        <SheetHeader className="p-4 text-left border-b border-slate-800">
          <SheetTitle className="text-white text-xl font-bold">
            Admin Panel
          </SheetTitle>
        </SheetHeader>
        <div className="p-6 overflow-y-auto h-full">
          <SidebarNav onLinkClick={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

function SidebarNav({ onLinkClick }) {
  const pathname = usePathname();

  return (
    <nav className="space-y-2">
      {navItems.map((item) => {
        const active = pathname === item.href;

        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => onLinkClick && onLinkClick()}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              active
                ? "bg-indigo-600 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <item.icon size={18} />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
