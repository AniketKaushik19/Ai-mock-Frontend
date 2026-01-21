"use client";

import { useState } from "react";
import {validateField } from "@/utils/validation";
import Signup from "./_component/Signup";
import Otpverify from "./_component/Otpverify";


export default function SignUpPage() {
  const [showOtp, setShowOtp] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value, setErrors);

    if (name === "confirmPassword") {
      if (value !== formData.password) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match.",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: undefined,
        }));
      }
    }
  };

  if (showOtp) {
    return <Otpverify/>;
  }

  return (
    <Signup  handleChange={handleChange}
     formData={formData}
      errors={errors}
      setErrors={setErrors}
      setShowOtp={setShowOtp}
       />
  );
}


