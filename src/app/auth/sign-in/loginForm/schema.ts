import z from "zod";

export const signInFormSchema = z.object({
  email: z.string().email({ message: "อีเมลไม่ถูกต้อง" }),
  password: z.string(),
});
