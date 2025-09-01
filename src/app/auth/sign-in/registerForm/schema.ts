import { z } from "zod";

const passwordRules = [
  { re: /[a-z]/, message: "ต้องมีตัวอักษรพิมพ์เล็ก" },
  { re: /[A-Z]/, message: "ต้องมีตัวอักษรพิมพ์ใหญ่" },
  { re: /[0-9]/, message: "ต้องมีตัวเลขอย่างน้อย 1 ตัว" },
  {
    re: /[$&+,:;=?@#|'<>.^*()%!]/,
    message: "ต้องมีอักขระพิเศษอย่างน้อย 1 ตัว",
  },
];

export const SetUpRegisterSchema = z
  .object({
    Prefix: z.enum(["Mr", "Ms", "Miss"], { message: "กรุณาเลือกคำนำหน้า" }),
    firstName: z.string().min(1, { message: "กรุณากรอกชื่อ" }),
    lastName: z.string().min(1, { message: "กรุณากรอกนามสกุล" }),
    personId: z
      .string()
      .length(13, { message: "เลขบัตรประชาชนต้องมี 13 หลัก" }),
    phoneNumber: z
      .string()
      .regex(/^0[0-9]{9}$/, { message: "เบอร์โทรศัพท์ไม่ถูกต้อง" }),
    email: z.string().email({ message: "อีเมลไม่ถูกต้อง" }),
    password: z
      .string()
      .min(8, { message: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร" })
      .refine((val) => passwordRules.every((rule) => rule.re.test(val)), {
        message: "รหัสผ่านไม่ตรงตามเงื่อนไขทั้งหมด",
      }),
    confirmPassword: z.string(),
    check: z.literal(true, { message: "กรุณายอมรับเงื่อนไข" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  });
