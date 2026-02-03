// 'use client';

// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import { LogOut } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { useRouter } from 'next/navigation';

// import useAuthStore from '../../../store/authStore';
// import useAdminAuthStore from '../../../store/adminAuthStore';

// import { useUserLogout,useAdminLogout } from '@/hooks/user';
// import Loading from './Loading';


// export default function ProfileHoverCard({ onClose }) {
//   const router = useRouter();

//   const { user, logout: userLogout } = useAuthStore();
//   const { admin, logout: adminLogout } = useAdminAuthStore();

  

//   const isAdmin = !!admin;
//   const profile = user || admin;

//   const { mutateAsync:userMutate, isPending:userPending } = useUserLogout();
//   const { mutateAsync:adminMutate, isPending:adminPending } = useAdminLogout();
//     const isPending = userPending || adminPending;

// // const handleLogout = async () => {
// //         if (isAdmin) {
// //           const result = await adminMutate();
// //           if (result.message) {
// //             adminLogout();
// //             localStorage.removeItem('admin-auth-storage');
// //             onClose?.();
// //             router.replace('/');
// //             router.refresh();
// //           }
// //         } else {
// //           const result = await userMutate();
// //           if (result.message) {
// //             userLogout();
// //             localStorage.removeItem('auth-storage');
// //             onClose?.();
// //             router.replace('/');
// //             router.refresh();
// //           }
// //         }
// //       }
// const handleLogout = async () => {
//         const result = await userMutate();
//         if (result.message) {
//             userLogout();
//            onClose?.();
//             router.replace('/');
//         }

//       }
  
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.95, y: 10 }}
//       animate={{ opacity: 1, scale: 1, y: 0 }}
//       exit={{ opacity: 0, scale: 0.95, y: 10 }}
//       transition={{ duration: 0.2 }}
//       className="w-[320px] rounded-2xl bg-Secondary text-white shadow-2xl border border-white/10"
//     >
//       <div className="p-6">
//         {/* Header */}
//         <div className="flex flex-col items-center text-center">
//           <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#4F7DFF]">
//             <Image
//               src={profile?.img || '/image/avatar.png'}
//               alt="Profile"
//               fill
//               className="object-cover"
//             />
//           </div>

//           <h3 className="mt-4 text-xl font-bold">
//             Hi, {profile?.name || 'Admin'} 👋
//           </h3>

//           {profile?.email && (
//             <p className="text-sm text-[#CBD5E1] mt-1">
//               {profile.email}
//             </p>
//           )}
//         </div>

     
//         <div className="border-t border-white/10 my-6" />

//         <div className="flex flex-col gap-3">
//           {!isAdmin && (
//             <Button
//               variant="outline"
//               className="border-white/20 text-[#4F7DFF] hover:bg-white hover:text-Primary"
//               onClick={() => {
//                 onClose?.();
//                 router.push('/profile');
//               }}
//             >
//               View Profile
//             </Button>
//           )}

//           <Button
//             className="bg-[#4F7DFF] hover:bg-[#3A64E0] flex gap-2 items-center justify-center"
//             onClick={handleLogout}
//             disabled={isPending}
//           >
//             <LogOut className="w-4 h-4" />
//             {isPending ? <Loading /> : 'Logout'}
//           </Button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }



'use client';

import { Dialog,DialogTitle, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { LogOut } from 'lucide-react';
import useAuthStore from '../../../store/authStore';
import {  useUserLogout } from '@/hooks/user';
import Loading from './Loading';
import { useRouter } from 'next/navigation';

export default function ProfileModal({ onClose }) {
const router=useRouter();
const { user,logout } = useAuthStore();
const {mutateAsync,isPending}=useUserLogout();

const handleLogout=async()=>{
const result=await mutateAsync();
if(result.message){
logout();
onClose?.();
router.replace('/');
}

}

   

return (
<Dialog open={open} onOpenChange={onClose }>
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
src={user?.img ? user.img : "/image/avatar.png"} 
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
                            onClick={()=>{
                               onClose?.(); 
                                router.push('/profile')}}
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