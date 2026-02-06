import { adminCreate, adminLogin, adminlogout, deleteUser, getAllUser, updateAdmin, deleteAdmin, getAllAdmins } from "@/libs/adminApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
    retry: 0,
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

export const useGetAllAdmins = () => {
  return useQuery({
    queryKey: ["admin"],
    queryFn: getAllAdmins,
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || 'Error while Getting all Admins'
      );
    },
  })
};
export const useAdminUpdate = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: updateAdmin,
    onSuccess: () => {
      toast.success("Admin updated successfully");
      qc.invalidateQueries({ queryKey: ["admins"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Update failed");
    },
  });
};
export const useAdminDelete = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteAdmin,
    onSuccess: () => {
      toast.success("Admin deleted successfully");
      qc.invalidateQueries({ queryKey: ["admins"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Delete failed");
    },
  });
};