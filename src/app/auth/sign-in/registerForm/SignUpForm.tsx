"use client";

import {
  Box,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Select,
  Flex,
  Stack,
  Checkbox,
  Popover,
  Progress,
  Modal,
} from "@mantine/core";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { SetUpRegisterSchema } from "./schema";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterAccounts } from "../action";
import { Controller } from "react-hook-form";
import {
  IconCircleCheckFilled,
  IconX,
  IconXboxXFilled,
} from "@tabler/icons-react";

const passwordRules = [
  { re: /[a-z]/, label: "ตัวอักษรภาษาอังกฤษทั้งพิมพ์เล็ก" },
  { re: /[A-Z]/, label: "ตัวอักษรภาษาอังกฤษพิมพ์ใหญ่" },
  { re: /[0-9]/, label: "ตัวเลขอย่างน้อย 1 ตัวอักษร" },
  {
    re: /[$&+,:;=?@#|'<>.^*()%!]/,
    label: "อักขระพิเศษ (@$!%*#?&_.) อย่างน้อย 1 ตัวอักษร",
  },
];

function PasswordCheck({ meets, label }: { meets: boolean; label: string }) {
  return (
    <Flex gap={5}>
      <Text>
        {meets ? (
          <IconCircleCheckFilled color="#0A3A57" />
        ) : (
          <IconX color="gray" />
        )}
      </Text>
      <Text c={meets ? "#0A3A57" : "gray"}>{label}</Text>
    </Flex>
  );
}

function getPasswordStrength(password: string) {
  let multiplier = password.length > 8 ? 0 : 1;
  passwordRules.forEach((rule) => {
    if (!rule.re.test(password)) multiplier += 1;
  });
  return Math.max(100 - (100 / (passwordRules.length + 1)) * multiplier, 10);
}

export default function SignUpForm({ goToLogin }: { goToLogin: () => void }) {
  const [modalOpened, setModalOpened] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalSuccess, setModalSuccess] = useState(false);
  const { form, action, handleSubmitWithAction } = useHookFormAction(
    RegisterAccounts,
    zodResolver(SetUpRegisterSchema)
  );
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const strength = getPasswordStrength(passwordValue);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

  const passwordChecks = passwordRules.map((rule, i) => (
    <PasswordCheck
      key={i}
      meets={rule.re.test(passwordValue)}
      label={rule.label}
    />
  ));

  useEffect(() => {
    if (action.hasSucceeded) {
      setModalMessage(
        action.result?.data?.success
          ? "บันทึกสำเร็จ"
          : action.result?.data?.message || "เกิดข้อผิดพลาด"
      );
      setModalSuccess(action.result?.data?.success || false);
      setModalOpened(true);
      if (action.result?.data?.success) {
        form.reset();
        goToLogin();
      }
    } else if (action.hasErrored) {
      setModalMessage("สมัครสมาชิกไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
      setModalSuccess(false);
      setModalOpened(true);
    }
  }, [action.hasSucceeded, action.hasErrored]);

  useEffect(() => {
    if (modalOpened) {
      const time = setTimeout(() => setModalOpened(false), 3000);
      return () => clearTimeout(time);
    }
  }, [modalOpened]);

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

      <form onSubmit={handleSubmitWithAction}>
        <Flex direction="column" gap="xs" align="center">
          <Text size="24px" c="#0A3A57" fw={600}>
            สมัครสมาชิก
          </Text>
          <Text size="16px">กรอกข้อมูลเพื่อสร้างบัญชีผู้ใช้งาน</Text>
        </Flex>

        <Stack mt="md">
          <Controller
            control={form.control}
            name="Prefix"
            render={({ field }) => (
              <Select
                {...field}
                label="คำนำหน้า"
                placeholder="เลือกคำนำหน้า"
                size="sm"
                data={[
                  { value: "Mr", label: "นาย" },
                  { value: "Ms", label: "นาง" },
                  { value: "Miss", label: "นางสาว" },
                ]}
                required
                error={form.formState.errors.Prefix?.message}
              />
            )}
          />

          {[
            { name: "firstName", label: "ชื่อ" },
            { name: "lastName", label: "นามสกุล" },
            { name: "personId", label: "เลขบัตรประชาชน" },
            { name: "phoneNumber", label: "เบอร์โทรศัพท์" },
            { name: "email", label: "อีเมล" },
          ].map((field) => (
            <TextInput
              key={field.name}
              label={field.label}
              placeholder={`กรอก${field.label}`}
              size="sm"
              required
              {...form.register(field.name as keyof typeof form.register)}
              error={
                form.formState.errors[
                  field.name as keyof typeof form.formState.errors
                ]?.message
              }
            />
          ))}

          <Popover opened={popoverOpen} width="target" position="bottom">
            <Popover.Target>
              <div
                onFocusCapture={() => setPopoverOpen(true)}
                onBlurCapture={() => setPopoverOpen(false)}
              >
                <PasswordInput
                  label="รหัสผ่าน"
                  required
                  placeholder="••••••"
                  {...form.register("password")}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  error={form.formState.errors.password?.message}
                />
              </div>
            </Popover.Target>
            <Popover.Dropdown>
              <Progress value={strength} size="xs" color={color} />
              <PasswordCheck
                meets={passwordValue.length >= 8}
                label="ความยาวอย่างน้อย 8 ตัวอักษร"
              />
              {passwordChecks}
            </Popover.Dropdown>
          </Popover>

          <PasswordInput
            label="ยืนยันรหัสผ่าน"
            placeholder="••••••"
            size="sm"
            required
            {...form.register("confirmPassword")}
            error={form.formState.errors.confirmPassword?.message}
          />

          <Controller
            control={form.control}
            name="check"
            render={({ field }) => (
              <Checkbox
                label="ยอมรับเงื่อนไขและข้อตกลง"
                checked={field.value || false}
                onChange={(e) => field.onChange(e.currentTarget.checked)}
                error={form.formState.errors.check?.message}
              />
            )}
          />

          <Flex direction="column" gap="md" mt="md">
            <Button type="submit" fullWidth color="#0E4E8E">
              สมัครสมาชิก
            </Button>
            <Button
              variant="subtle"
              fullWidth
              color="#0E4E8E"
              onClick={() => {
                window.location.reload();
              }}
            >
              กลับไปหน้าล็อกอิน
            </Button>
          </Flex>
        </Stack>
      </form>
    </>
  );
}
