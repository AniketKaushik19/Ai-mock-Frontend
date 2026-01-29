"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Info,
  LayoutDashboard,
  LogOut,
  Phone,
  LogIn,
  UserPlus,
} from "lucide-react";

import ProfileModal from "./profilemodal";
import ProfileHoverCard from "./ProfileHoverCard";
import useAuthStore from "../../../store/authStore";
import { useGetProfile } from "@/hooks/user";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact Us", path: "/contact" },
  { name: "Dashboard", path: "/dashboard" },
];

const mobileNavItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "About", path: "/about", icon: Info },
  { name: "Contact Us", path: "/contact", icon: Phone },
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Login", path: "/login", icon: LogIn },
  { name: "Signup", path: "/signup", icon: UserPlus },
];

export default function Navbar() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [hoverOpen, setHoverOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { user, login, logout } = useAuthStore();

  const { data } = useGetProfile({
    enabled: mounted && !!user,
  });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (data?.user) login(data.user);
  }, [data, login]);

  const UserLoggedIn = mounted && user;

  const filteredNavItems = navItems.filter((item) => {
    if (item.name === "Dashboard") return UserLoggedIn;
    return true;
  });

  const filteredMobileNav = mobileNavItems.filter((item) => {
    if (item.name === "Dashboard") return UserLoggedIn;
    if (item.name === "Login" || item.name === "Signup") return !UserLoggedIn;
    return true;
  });

  if (!mounted) return <div className="h-20 bg-Ternary" />;

  return (
    <nav className="fixed md:relative top-0 left-0 w-full z-[999] border-b border-white/10 bg-Ternary">

      {/* Desktop Navbar */}
      {!isOpen && (
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
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

          <div className="hidden md:flex items-center gap-8">
            {filteredNavItems.map((item) => {
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
                  {isActive && (
                    <span className="absolute left-0 -bottom-2 w-full h-[2px] bg-[#4F7DFF] rounded-full" />
                  )}
                </Link>
              );
            })}

            {!UserLoggedIn && (
              <>
                <Link
                  href="/login"
                  className={`relative text-sm font-bold transition ${pathname === "/login"
                    ? "text-[#4F7DFF]"
                    : "text-white hover:text-[#386bed]"
                    }`}
                >
                  Login
                  {pathname === "/login" && (
                    <span className="absolute left-0 -bottom-2 w-full h-[2px] bg-[#4F7DFF] rounded-full" />
                  )}
                </Link>

                <Link
                  href="/signup"
                  className="bg-[#386bed] text-white font-bold py-2 px-6 rounded-md hover:bg-[#2b52b8] transition"
                >
                  Signup
                </Link>
              </>
            )}

            {UserLoggedIn && (
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
            )}
          </div>

          {/* Mobile Right */}
          <div className="md:hidden flex items-center gap-3">
            {UserLoggedIn && (
              <div
                onClick={() => setProfileOpen(true)}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#4F7DFF]"
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
              onClick={() => setIsOpen(true)}
              className="text-white p-2"
            >
              <Menu />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 140, damping: 22 }}
            drag="x"
            dragConstraints={{ left: 0, right: 200 }}
            onDragEnd={(e, info) => {
              if (info.offset.x > 120) setIsOpen(false);
            }}
            className="fixed inset-0 bg-[#0B1C2D] z-[999] flex flex-col px-6 py-10 md:hidden"
          >
            <div className="flex justify-between items-center">
              <span className="text-white font-bold text-xl"></span>

              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 1.35 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                onClick={() => setIsOpen(false)}
                className="text-white text-4xl font-bold"
              >
                <motion.span
                  whileTap={{ color: "#4F7DFF" }}
                  className="flex items-center justify-center"
                >
                  <X className="w-8 h-8" />
                </motion.span>
              </motion.button>
            </div>


            <div className="flex flex-1 flex-col items-center justify-center gap-10">
              {filteredMobileNav.map((item) => {
                const isActive = pathname === item.path;

                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-4 text-4xl font-semibold transition ${isActive
                      ? "text-[#4F7DFF]"
                      : "text-white hover:text-[#4F7DFF]"
                      }`}
                  >
                    <item.icon className="h-7 w-7" />
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {UserLoggedIn && (
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-red-600 hover:bg-red-700 font-bold text-white text-lg"
              >
                <LogOut className="h-6 w-6" />
                Logout
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <ProfileModal open={profileOpen} setOpen={setProfileOpen} />
    </nav>
  );
}
