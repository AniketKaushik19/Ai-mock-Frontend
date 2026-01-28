"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Home, Info, LayoutDashboard } from "lucide-react";
import ProfileModal from "./profilemodal";
import useAuthStore from "../../../store/authStore";
import { useGetProfile } from "@/hooks/user";
import ProfileHoverCard from "./ProfileHoverCard";

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "About", path: "/about", icon: Info },
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
];

const Navbar = () => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hoverOpen, setHoverOpen] = useState(false);

  const { user, login } = useAuthStore();

  const { data } = useGetProfile({
    enabled: mounted && !!user,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (data?.user) {
      login(data.user);
    }
  }, [data, login]);

  const UserLoggedIn = mounted && user;

  if (!mounted) {
    return (
      <nav className="w-full border-b border-white/10 bg-Ternary">
        <div className="container mx-auto h-20 px-4" />
      </nav>
    );
  }

  return (
    <nav className="w-full border-b border-white/10 bg-Ternary">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/image/celogo.png"
            alt="CountryEdu Logo"
            width={200}
            height={50}
            priority
            className="object-contain h-8 md:h-12 w-auto"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.name}
                href={item.path}
                className={`relative text-sm font-bold transition ${isActive
                  ? "text-[#4F7DFF]"
                  : "text-white hover:text-[#386bed]"
                  }`}
              >
                {item.name}

                {/* Active underline */}
                {isActive && (
                  <span className="absolute left-0 -bottom-2 w-full h-[2px] bg-[#4F7DFF] rounded-full" />
                )}
              </Link>
            );
          })}

          {UserLoggedIn ? (
            <div
              className="relative"
              onMouseEnter={() => setHoverOpen(true)}
              onMouseLeave={() => setHoverOpen(false)}
            >
              <div
                onClick={() => setProfileOpen(true)}
                className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#4F7DFF] cursor-pointer hover:scale-105 transition"
              >
                <Image
                  src={user?.img || "/image/avatar.png"}
                  alt="Profile"
                  width={48}
                  height={48}
                  className="object-cover rounded-full"
                />
              </div>

              {hoverOpen && <ProfileHoverCard user={user} />}
            </div>
          ) : (
            <>
              <Link href="/login" className="text-sm font-bold text-white">
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-[#386bed] text-white font-bold py-2 px-6 rounded-md hover:bg-[#2b52b8] transition"
              >
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Mobile Navbar Right */}
        <div className="md:hidden flex items-center gap-3">
          {UserLoggedIn && (
            <div
              onClick={() => setProfileOpen(true)}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#4F7DFF] cursor-pointer"
            >
              <Image
                src={user?.img || "/image/avatar.png"}
                alt="Profile"
                width={40}
                height={40}
                className="object-cover rounded-full"
              />
            </div>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-2"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white absolute top-20 left-0 w-full z-50 shadow-xl py-8 px-6 flex flex-col gap-6 items-center">
          {navItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 text-lg font-semibold ${isActive
                  ? "text-[#4F7DFF]"
                  : "text-Ternary"
                  }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </div>
      )}

      {/* Profile Modal */}
      <ProfileModal open={profileOpen} setOpen={setProfileOpen} />
    </nav>
  );
};

export default Navbar;
