'use client';

import { Dialog,DialogTitle, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { LogOut } from 'lucide-react';
import useAuthStore from '../../../store/authStore';
import { useLogout } from '@/hooks/user';
import Loading from './Loading';

export default function ProfileModal({ open, setOpen }) {
      const { user,logout } = useAuthStore();
      const {mutateAsync,isPending}=useLogout();

      const handleLogout=async()=>{
        const result=await mutateAsync();
        if(result.message){
            logout();
            setOpen(false);
        }

      }

   

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTitle/>
            <DialogContent className="bg-[#112A46] text-white border border-white/10 w-[340px] p-0 overflow-hidden rounded-2xl">

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className="p-6"
                >
                    {/* Header */}
                    <div className="flex flex-col items-center text-center">

                        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#4F7DFF]">
                            <Image
                                src={user?.img}
                                alt="Profile"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <h3 className="mt-4 text-xl font-bold">
                            Hi, {user?.name} 👋
                        </h3>

                        <p className="text-sm text-[#CBD5E1] mt-1">
                            {user?.email}
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/10 my-6" />

                    {/* Actions */}
                    <div className="flex flex-col gap-3">

                        <Button
                            variant="outline"
                            className="border-white/20 text-[#4F7DFF] hover:bg-white hover:text-[#0B1C2D]"
                        >
                            View Profile
                        </Button>

                        <Button
                            className="bg-[#4F7DFF] hover:bg-[#3A64E0] flex gap-2"
                          onClick={()=>handleLogout()}
                        >
                            <LogOut className="w-4 h-4" />
                          {isPending?<Loading/> :"Logout"}
                        </Button>

                    </div>

                </motion.div>

            </DialogContent>
        </Dialog>
    );
}
