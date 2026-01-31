"use client";
import { axiosInstance } from "@/libs/axios";
import toast from "react-hot-toast";

 export  const handlePayment = async () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded yet. Try again.");
      return;
    }

    const { data: order } = await axiosInstance.post("/subscription/create", { amount: 1 });

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Ai Mock Frontend",
      description: "Test Transaction",
      order_id: order.id,
      handler: function (response) {
        toast.success(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: "Aniket",
        email: "aniket@example.com",
        contact: "9999999999",
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  
