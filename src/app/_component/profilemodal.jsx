'use client';

import { Dialog, DialogTitle, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { LogOut } from 'lucide-react';
import useAuthStore from '../../../store/authStore';
import { useUserLogout } from '@/hooks/user';
import Loading from './Loading';
import { useRouter } from 'next/navigation';

export default function ProfileModal({ open, setOpen }) {
    const { user, logout: userLogout } = useAuthStore();
 
  const { mutateAsync, isPending } = useUserLogout();
  const profile = user
 const router=useRouter()
  const handleLogout = async () => {
    try {
      const result = await mutateAsync();
      if (result?.message ) {
        userLogout();
        // onClose?.();
        router.replace('/');
        setOpen(false)
      } 
    } catch (err) {
      console.error('Logout failed', err);
    }

   
};

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTitle />
            <DialogContent className="bg-Secondary text-white border border-white/10 w-[340px] p-0 overflow-hidden rounded-2xl">

                 <div className="p-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#4F7DFF]">
            <Image
              src={profile?.img || '/image/avatar.png'}
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>

          <h3 className="mt-4 text-xl font-bold">
            Hi, {profile?.name} 👋
          </h3>

          {profile?.email && (
            <p className="text-sm text-[#CBD5E1] mt-1">
              {profile.email}
            </p>
          )}
        </div>

     
        <div className="border-t border-white/10 my-6" />
   
        <div className="flex flex-col gap-3">
      
            <Button
              variant="outline"
              className="border-white/20 text-[#4F7DFF] hover:bg-white hover:text-Primary"
              onClick={() => {
                setOpen(false);;
                router.push('/profile');
              }}
            >
              View Profile
            </Button>
         
          <Button
            className="bg-[#4F7DFF] hover:bg-[#3A64E0] flex gap-2 items-center justify-center"
            onClick={handleLogout}
            disabled={isPending}
          >
            <LogOut className="w-4 h-4" />
            {isPending ? <Loading /> : 'Logout'}
          </Button>
        </div>
      </div>

            </DialogContent>
        </Dialog>
    );
}
