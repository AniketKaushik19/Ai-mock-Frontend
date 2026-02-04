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
import useAdminAuthStore from "../../../store/adminAuthStore";
import AdminHoverCard from "./AdminHoverCard";


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
  

  const { logout: adminLogout, admin } = useAdminAuthStore()
  const { user, login, logout } = useAuthStore();

  const { data } = useGetProfile({
    enabled: mounted && !!user,
  });

  
  
  useEffect(() =>{setMounted(true)
  }, []);

  useEffect(() => {
    if (data?.user) login(data.user);
  }, [data, login]);
  const UserLoggedIn = mounted && !!user;
  const AdminLoggedIn = mounted && !!admin;

  const isDesktop =
    typeof window !== "undefined" && window.innerWidth >= 768;

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
    <nav className="sticky top-0 z-[999] w-full bg-Ternary border-b border-white/10">
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
              className="h-8 md:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {filteredNavItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`relative text-sm font-bold transition ${isActive
                      ? "text-orange-500"
                      : "text-white hover:text-Button"
                    }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute -bottom-2 left-0 h-[2px] w-full bg-orange-500" />
                  )}
                </Link>
              );
            })}

            {!UserLoggedIn && !AdminLoggedIn && (
              <>
                <Link
                  href="/login"
                  className={`text-sm font-bold ${pathname === "/login"
                      ? "text-orange-500"
                      : "text-white hover:text-Button"
                    }`}
                >
                  Login
                </Link>
        
                <Link
                  href="/signup"
                  className="rounded-md bg-Button px-6 py-2 font-bold text-white hover:bg-[#2b52b8]"
                >
                  Signup
                </Link>
              </>
            )}


            {/* Avatar + Hover Card */}
            {UserLoggedIn && (
              <div
                className="relative"
                onMouseEnter={() => isDesktop && setHoverOpen(true)}
                onMouseLeave={() => isDesktop && setHoverOpen(false)}
              >
                <div
                  onClick={() => setProfileOpen(true)}
                  className="h-12 w-12 cursor-pointer overflow-hidden rounded-full border-2 border-[#4F7DFF] hover:scale-105 transition"
                >
                  <Image
                    src={user?.img || "/image/avatar.png"}
                    alt="Profile"
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                </div>

                <AnimatePresence>
                  {hoverOpen && (
                    <motion.div
                      className="absolute right-0 top-14 z-50"
                      onMouseEnter={() => setHoverOpen(true)}
                      onMouseLeave={() => setHoverOpen(false)}
                    >
                      <ProfileHoverCard onClose={() => setHoverOpen(false)} />
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            )}
            {/* //Admin hover Card  */}
            {AdminLoggedIn && (
              <div
                className="relative"
                onMouseEnter={() => isDesktop && setHoverOpen(true)}
                onMouseLeave={() => isDesktop && setHoverOpen(false)}
              >
                <div
                  className="h-12 w-12 cursor-pointer overflow-hidden rounded-full border-2 border-[#4F7DFF] hover:scale-105 transition"
                >
                  <Image
                    src={"/image/avatar.png"}
                    alt="Profile"
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                </div>

                <AnimatePresence>
                  {hoverOpen && (
                    <motion.div
                      className="absolute right-0 top-14 z-50"
                      onMouseEnter={() => setHoverOpen(true)}
                      onMouseLeave={() => setHoverOpen(false)}
                    >
                      <AdminHoverCard onClose={() => setHoverOpen(false)} />
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            )}
          </div>

          {/* Mobile Right */}
          <div className="md:hidden flex items-center gap-3">
            {UserLoggedIn && (
              <div
                onClick={() => setProfileOpen(true)}
                className="h-10 w-10 overflow-hidden rounded-full border-2 border-[#4F7DFF]"
              >
                <Image
                  src={user?.img || "/image/avatar.png"}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              </div>
            )}

            <button onClick={() => setIsOpen(true)} className="text-white">
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
            className="fixed inset-0 z-[999] flex flex-col bg-Primary px-6 py-10 md:hidden"
          >
            <div className="flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="text-white"
              >
                <X size={32} />
              </button>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center gap-10">
              {filteredMobileNav.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-4 text-4xl font-semibold ${isActive ? "text-[#4F7DFF]" : "text-white"
                      }`}
                  >
                    <item.icon />
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
                className="mt-auto flex items-center justify-center gap-3 rounded-xl bg-red-600 py-4 font-bold text-white"
              >
                <LogOut />
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