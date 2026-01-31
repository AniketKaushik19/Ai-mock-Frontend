'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

import useAuthStore from '../../../store/authStore';
import useAdminAuthStore from '../../../store/adminAuthStore';

import { useLogout } from '@/hooks/user';
import Loading from './Loading';


export default function ProfileHoverCard({ onClose }) {
  const router = useRouter();

  const { user, logout: userLogout } = useAuthStore();
  const { admin, logout: adminLogout } = useAdminAuthStore();

  const { mutateAsync, isPending } = useLogout();

  const isAdmin = !!admin;
  const profile = user || admin;

  const handleLogout = async () => {
    try {

      const result = await mutateAsync();
      if (result?.message ) {
        if(isAdmin){
          adminLogout();
        }
        userLogout();
        onClose?.();
        router.replace('/');
      } 
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ duration: 0.2 }}
      className="w-[320px] rounded-2xl bg-Secondary text-white shadow-2xl border border-white/10"
    >
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
            Hi, {profile?.name || 'Admin'} 👋
          </h3>

          {profile?.email && (
            <p className="text-sm text-[#CBD5E1] mt-1">
              {profile.email}
            </p>
          )}
        </div>

     
        <div className="border-t border-white/10 my-6" />

        <div className="flex flex-col gap-3">
          {!isAdmin && (
            <Button
              variant="outline"
              className="border-white/20 text-[#4F7DFF] hover:bg-white hover:text-Primary"
              onClick={() => {
                onClose?.();
                router.push('/profile');
              }}
            >
              View Profile
            </Button>
          )}

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
    </motion.div>
  );
}
