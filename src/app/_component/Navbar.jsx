"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Home, Info } from "lucide-react";
import ProfileModal from "./profilemodal";
import useAuthStore from "../../../store/authStore";
import { useGetProfile } from "@/hooks/user";

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "About", path: "/about", icon: Info },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { user, isLoggedIn, login } = useAuthStore();

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

  // 🚨 CRITICAL: never evaluate auth before mount
  const UserLoggedIn = mounted && isLoggedIn();

  // 🧊 Prevent hydration mismatch
  if (!mounted) {
    return (
      <nav className="w-full border-b border-white/10 bg-[#0D2B5B]">
        <div className="container mx-auto h-20 px-4" />
      </nav>
    );
  }

  return (
    <nav className="w-full border-b border-white/10 bg-[#0D2B5B]">
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
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="text-sm font-bold text-white hover:text-[#386bed]"
            >
              {item.name}
            </Link>
          ))}

          {UserLoggedIn ? (
            <div
              onClick={() => setProfileOpen(true)}
              className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#4F7DFF] cursor-pointer"
            >
              <Image
                src={user?.img || "/image/avatar.png"}
                alt="Profile"
                width={48}
                height={48}
                className="object-cover rounded-full"
              />
            </div>
          ) : (
            <>
              <Link href="/login" className="text-sm font-bold text-white">
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-[#386bed] text-white font-bold py-2 px-6 rounded-md"
              >
                Signup
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white absolute top-20 left-0 w-full z-50 shadow-xl py-8 px-6 flex flex-col gap-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 text-lg font-semibold text-[#0D2B5B]"
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </div>
      )}

      <ProfileModal open={profileOpen} setOpen={setProfileOpen} />
    </nav>
  );
};

export default Navbar;