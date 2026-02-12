import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .regex(/[A-Z]/, "Must include at least one uppercase letter.")
  .regex(/[a-z]/, "Must include at least one lowercase letter.")
  .regex(/\d/, "Must include at least one number.")
  .regex(/[^A-Za-z0-9]/, "Must include at least one symbol.");

export const SignUpSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters."),
    email: z.string().email("Enter a valid email address."),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const ForgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email address."),
});

export const ResetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });


export const validateField = (name, value, setErrors) => {

  if (name === "confirmPassword") return;

  const fieldSchema = SignUpSchema.shape[name];
  if (!fieldSchema) return;

  const result = fieldSchema.safeParse(value);

  if (result.success) {
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  } else {
    setErrors((prev) => ({
      ...prev,
      [name]: result.error.issues[0]?.message,
    }));
  }
};
