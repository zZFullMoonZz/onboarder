"use client";

import {
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Flex,
  Text,
  Modal,
  Box,
  Anchor,
} from "@mantine/core";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInFormSchema } from "./schema";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { IconCircleCheckFilled, IconXboxXFilled } from "@tabler/icons-react";
import { useState, useEffect } from "react";

export default function SignInForm() {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(signInFormSchema),
  });
  const router = useRouter();

  const [modalOpened, setModalOpened] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalSuccess, setModalSuccess] = useState(false);

  const handleSignIn = handleSubmit(async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (!res || !res.ok) {
      setModalMessage("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      setModalSuccess(false);
      setModalOpened(true);
      return;
    }

    setModalMessage("เข้าสู่ระบบสำเร็จ");
    setModalSuccess(true);
    setModalOpened(true);
  });

  useEffect(() => {
    if (modalOpened && modalSuccess) {
      const time = setTimeout(() => {
        setModalOpened(false);
        router.push("/home-page");
      }, 2000);
      return () => clearTimeout(time);
    } else if (modalOpened && !modalSuccess) {
      const timer = setTimeout(() => setModalOpened(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [modalOpened, modalSuccess, router]);

  return (
    <>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        withCloseButton={false}
        centered
        radius="md"
        size="md"
      >
        <Flex direction="column" align="center">
          <Box>
            {modalSuccess ? (
              <IconCircleCheckFilled color="green" size={50} />
            ) : (
              <IconXboxXFilled color="red" size={50} />
            )}
          </Box>
          <Text size="md" ta={"center"}>
            {modalMessage}
          </Text>
        </Flex>
      </Modal>

      <form onSubmit={handleSignIn}>
        <Flex direction="column" gap="xs" align="center">
          <Text size="24px" c="#0A3A57" fw={600}>
            เข้าสู่ระบบ
          </Text>
          <Text size="16px">เพื่อเข้าใช้งานบัญชีของคุณ</Text>
        </Flex>

        <Stack>
          <TextInput
            label="อีเมล"
            size="sm"
            placeholder="you@email.com"
            {...register("email")}
          />
          <PasswordInput
            label="รหัสผ่าน"
            size="sm"
            placeholder="••••••"
            {...register("password")}
          />

          <Anchor href="/forgot-password">
            <Text ta={"right"} size="14px" c={"dimmed"}>
              ลืมรหัสผ่าน?
            </Text>
          </Anchor>

          <Flex gap={"md"} direction={"column"} mt={"md"}>
            <Button
              variant="filled"
              color="#0E4E8E"
              fullWidth
              type="submit"
              loading={formState.isSubmitting}
            >
              เข้าสู่ระบบ
            </Button>
            <Button
              variant="subtle"
              color="#0E4E8E"
              fullWidth
              component={Link}
              href={"/auth/sign-in"}
            >
              กลับหน้าหลัก
            </Button>
          </Flex>
        </Stack>
      </form>
    </>
  );
}
