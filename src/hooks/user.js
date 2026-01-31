import { useMutation, useQuery } from "@tanstack/react-query"
import { signup, login, OtpVerify, OtpResend, onboarding, forgotPassword, forgotOtpverify, forgotOtpResend, resetPassword, profile, logout } from "../libs/api"
import toast from "react-hot-toast";




export const useSignup = (setShowOtp) => {
  return useMutation({
    mutationFn: signup,
    retry: 0,
    onSuccess: (data) => {
      toast.success("Signup Successs!!!")
      console.log(data);
      setShowOtp(true);
    },
    onError: (error) => {
      if (error?.response?.status === 429) {
        toast.error("Too many signup attempts. Please try again later.");
      } else {
        toast.error(error?.response?.data?.message || "Error while Signup");
      }
    }
  });
};

export const uselogin = () => {
  return useMutation({
    mutationFn: async (userData) => login(userData),

    retry: (failureCount, error) => {
      
      if (error?.response?.status === 429) return false;

      
      return failureCount < 3;
    },

    retryDelay: (attempt) => {
      
      return Math.min(1000 * 2 ** attempt, 5000);
    },

    onSuccess: () => {
      toast.success("Login successfully!!!");
    },

    onError: (error) => {
      if (error?.response?.status === 429) {
        toast.error("Too many login attempts. Please try again later.");
      } else {
        toast.error(error?.response?.data?.message || "Error while Login");
      }
    }
  });
};


export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: OtpVerify,
    onSuccess: () => {
      toast.success("OTP verified successfully");
    },
    onError: (error) => {
      if (error?.response?.status === 429) {
        toast.error("Too many attempts. Try later.");
      } else {
        toast.error(error?.response?.data?.message || "OTP verification failed");
      }
    }
  });
};


export const useResendOtp = (setTimer) => {
  return useMutation({
    mutationFn: OtpResend,
    onSuccess: (data) => {
     toast.success("OTP resent to your email");
    setTimer(60);
    },
    onError: (error) => {
        toast.error(error?.response?.data?.message || "Error while otp resending");
    }
  });
};


export const useOnBoarding=()=>{
   return useMutation({
    mutationFn:onboarding,
    onSuccess:(data)=>{
       toast.success("Onboarding successfully")
     
    },
    onError:(error)=>{
      toast.error(error?.response?.data?.message || "Error while onboarding")
    }
   })
}

export const useForgotPassword=()=>{
  return useMutation({
    mutationFn:forgotPassword,
    onSuccess:(data)=>{
       toast.success("Otp generated successfully")
    },
    onError:(error)=>{
      toast.error(error?.response?.data?.message || "Error while Forgot password")
    }
  })
}

export const useForgotOtpVerify=()=>{
  return useMutation({
    mutationFn:forgotOtpverify,
    onSuccess:(data)=>{
       toast.success("OTP verified Successfully")
    },
    onError:(error)=>{
      toast.error(error?.response?.data?.message || "Error while verifing  OTP")
    }
  })
}

export const useForgotOtpResend=()=>{
  return useMutation({
    mutationFn:forgotOtpResend,
    onSuccess:(data)=>{
      toast.success("OTP resend successfully")
    },
    onError:(error)=>{
      toast.error(error?.response?.data?.message || "Error in Otp resend")
    }
  })
}

export const useResetPassword=()=>{
  return useMutation({
    mutationFn:resetPassword,
    onSuccess:(data)=>{
      toast.success("Password reset successfully")
    },
    onError:(error)=>{
      toast.error(error?.response?.data?.message || "Error in reset password")
    }
  })
};
export const useLogout=()=>{
  return useMutation({
    mutationFn:logout,
    onSuccess:(data)=>{
      toast.success("Logout Successfully");
    },
    onError:(error)=>{
      toast.error(error?.response?.data?.message || "Error in logout")
    }
  })
};


export const useGetProfile = (options = {}) => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: profile,
    staleTime: 5 * 60 * 1000,
    enabled: options.enabled, 
    onSuccess: (data) => {
      console.log("Data", data);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Error while fetching profile');
    },
  });
};
