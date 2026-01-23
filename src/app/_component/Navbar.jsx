"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Home, Info, LogIn } from "lucide-react";
import ProfileModal from "./profilemodal";
import useAuthStore from "../../../store/authStore";

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "About", path: "/about", icon: Info },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { user, isLoggedIn } = useAuthStore();
  // console.log(isLoggedIn())

  return (
    <nav className="w-full border-b border-white/10 bg-[#0D2B5B]">
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
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="text-sm font-bold text-white hover:text-[#386bed]"
            >
              {item.name}
            </Link>
          ))}

          {!isLoggedIn() && (
            <>
              <Link
                href="/login"
                className="text-sm font-bold text-white hover:text-[#386bed]"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="bg-[#386bed] text-white hover:bg-[#2b52b8] font-bold py-2 px-6 rounded-md"
              >
                Signup
              </Link>
            </>
          )}

          {isLoggedIn() && (
            <div
              onClick={() => setProfileOpen(true)}
              className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#4F7DFF] cursor-pointer hover:scale-105 transition"
            >
              <Image
                src={user?.avatar || "/image/avatar.png"}
                alt="Profile"
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-2"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white absolute top-20 left-0 w-full z-50 shadow-xl py-8 px-6 flex flex-col gap-6 items-center">

          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 text-lg font-semibold text-[#0D2B5B]"
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}

          {!isLoggedIn() && (
            <>
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="text-[#0D2B5B] font-semibold"
              >
                Login
              </Link>

              <Link
                href="/signup"
                onClick={() => setIsOpen(false)}
                className="bg-[#386bed] text-white font-semibold py-3 px-12 rounded-full w-full max-w-[200px] text-center"
              >
                Signup
              </Link>
            </>
          )}

          {isLoggedIn() && (
            <div
              onClick={() => setProfileOpen(true)}
              className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#4F7DFF] cursor-pointer"
            >
              <Image
                src={user?.avatar || "/image/avatar.png"}
                alt="Profile"
                width={56}
                height={56}
                className="object-cover"
              />
            </div>
          )}
        </div>
      )}

      {/* Profile Modal */}
      <ProfileModal open={profileOpen} setOpen={setProfileOpen} />
    </nav>
  );
};

export default Navbar;
