// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Menu } from "lucide-react";

// const navItems = [
//   { name: "Home", path: "/" },
//   { name: "About", path: "/about" },
//   { name: "Login", path: "/login" },
// ];

// const Navbar = () => {
//   return (
//     <nav className="w-full border-b bg-[#0D2B5B]">
//       <div className="container mx-auto flex h-16 items-center justify-between px-0 my-0">
//         {/* Logo */}
//         <Link href="/" className="flex items-start  ">
//           <Image
//             src="/image/celogo.png"
//             alt="CountryEdu Logo"
//             width={300}
//             height={60}
//             priority
//             className="object-contain"
//           />
//         </Link>

//         <div className="hidden md:flex items-center gap-8">
//           {navItems.map((item, index) => (
//             <Link
//               key={index}
//               href={item.path}
//               className="text-sm font-bold text-white hover:text-[#386bed] transition"
//             >
//               {item.name}
//             </Link>
//           ))}

//           <Button
//             asChild
//             className="bg-[#386bed] text-white hover:bg-[#0f0d1d] font-bold"
//           >
//             <Link href="/signup">Signup</Link>
//           </Button>
//         </div>

//         <div className="md:hidden">
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button variant="ghost" size="icon" className="text-[#0D2B5B]">
//                 <Menu className="h-5 w-5" />
//               </Button>
//             </SheetTrigger>

//             <SheetContent side="right" className="w-64 bg-white">
//               <div className="flex flex-col gap-6 mt-8">
//                 {navItems.map((item, index) => (
//                   <Link
//                     key={index}
//                     href={item.path}
//                     className="text-base font-semibold text-[#0D2B5B] hover:text-[#F9A826]"
//                   >
//                     {item.name}
//                   </Link>
//                 ))}

//                 <Button
//                   asChild
//                   className="bg-[#386bed] text-[#0D2B5B] hover:bg-[#e39a1f] font-semibold"
//                 >
//                   <Link href="/signup">Signup</Link>
//                 </Button>
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Home, Info, LogIn } from "lucide-react"; // Imported specific icons

// Added 'icon' property to each item
const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "About", path: "/about", icon: Info },
  { name: "Login", path: "/login", icon: LogIn },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full border-b border-white/10 bg-[#0D2B5B]">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        
        {/* Logo - Responsive Sizing */}
        <Link href="/" className="flex items-center">
          <Image
            src="/image/celogo.png"
            alt="CountryEdu Logo"
            width={200}
            height={50}
            priority
            // h-8 (32px) on mobile, h-12 (48px) on desktop (md)
            className="object-contain h-8 md:h-12 w-auto transition-all duration-300" 
          />
        </Link>

        {/* Desktop Menu (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="text-sm font-bold text-white hover:text-[#386bed] transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}

          <Link 
            href="/signup" 
            className="bg-[#386bed] text-white hover:bg-[#2b52b8] font-bold py-2 px-6 rounded-md transition-colors"
          >
            Signup
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-gray-300 focus:outline-none p-2"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute top-20 left-0 w-full z-50 shadow-xl py-8 px-6 flex flex-col gap-6 items-center text-center">
          
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 text-lg font-semibold text-[#0D2B5B] hover:text-[#386bed] transition-colors"
            >
              {/* Render the specific icon for this item */}
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}

          <Link
            href="/signup"
            onClick={() => setIsOpen(false)}
            className="bg-[#386bed] text-white font-semibold py-3 px-12 rounded-full text-center hover:bg-[#2b52b8] shadow-md mt-2 w-full max-w-[200px]"
          >
            Signup
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;