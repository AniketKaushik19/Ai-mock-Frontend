import { axiosInstance } from "./axios"

export const adminLogin = async (data) => {
   try {
      const res = await axiosInstance.post('/admin/login', data)
      return res?.data
   } catch (error) {
      throw error
   }
}
export const adminCreate = async (data) => {
   try {
      const res = await axiosInstance.post('/admin/create', data)
      return res?.data
   } catch (error) {
      throw error
   }
}

export const adminlogout = async () => {
   try {
      const res = await axiosInstance.post(`admin/logout`);
      return res?.data;
   } catch (error) {
      throw error
   }
}

export const getAllUser = async () => {
   try {
      const res = await axiosInstance.get("admin/AllUser");
      return res?.data;
   } catch (error) {
      throw error
   }
}

export const getAllAdmins = async () => {
   try {
      const res = await axiosInstance.get("/admin/list");
      return res.data.admins;
   } catch (error) {
      throw error;
   }
};

export const updateAdmin = async ({ adminId, data }) => {
   try {
      const res = await axiosInstance.put(`/admin/${adminId}`, data);
      return res.data;
   } catch (error) {
      throw error;
   }
};
export const deleteAdmin = async (adminId) => {
  try {
    const res = await axiosInstance.delete(`/admin/${adminId}`);
    return res.data;
  } catch (error) {
    throw error
  }
};
