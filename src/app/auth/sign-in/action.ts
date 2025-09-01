"use server";

import { publicActionClient } from "@/lib/sefeAction";
import { SetUpRegisterSchema } from "./registerForm/schema";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const RegisterAccounts = publicActionClient
  .inputSchema(SetUpRegisterSchema)
  .action(async ({ parsedInput }) => {
    const checkEmail = await prisma.user.findUnique({
      where: { email: parsedInput.email },
    });

    if (checkEmail) {
      return {
        success: false,
        message: "อีเมลนี้มีผู้ใช้งานแล้ว",
      };
    }

    const hashPassword = await bcrypt.hash(parsedInput.password, 10);

    await prisma.user.create({
      data: {
        Prefix: parsedInput.Prefix,
        firstname: parsedInput.firstName,
        lastname: parsedInput.lastName,
        personId: parsedInput.personId,
        phoneNumber: parsedInput.phoneNumber,
        email: parsedInput.email,
        password: hashPassword,
        Check: parsedInput.check,
      },
    });

    return {
      success: true,
      message: "สมัครสมาชิกสําเร็จ",
    };
  });
