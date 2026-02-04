import { adminCreate, adminLogin, adminlogout, deleteUser, getAllUser } from "@/libs/adminApi";
import { useMutation , useQuery,useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";


export const useAdminLogin = () => {
  return useMutation({
    mutationFn: adminLogin,

    onSuccess: (data) => {
      toast.success("Admin login successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Error while login");
    }
  })
}

export const useAdminCreate = () => {
  return useMutation({
    mutationFn: adminCreate,

    onSuccess: (data) => {
      toast.success("Admin Created successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Error while Ccreating Admin");
    }
  })
}

export const useAdminLogout = () => {
  return useMutation({
    mutationFn: adminlogout,
    retry:0,
    onSuccess: (data) => {
      toast.success("Logout Successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Error in logout")
    }
  })
};

export const useGetAllUser = () => {
  return useQuery({
    queryKey: ["getAllUser"],
    queryFn: getAllUser,
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || 'Error while Getting all User'
      );
    },
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId) => deleteUser(userId),

    onSuccess: () => {
      // refetch users list after delete
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },

    onError: (error) => {
      console.error("Delete user failed:", error);
    },
  });
}