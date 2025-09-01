"use client";

import { useState } from "react";
import {
  BackgroundImage,
  Box,
  Flex,
  Image,
  Tabs,
  Container,
  rem,
} from "@mantine/core";
import SignInForm from "./loginForm/SignInForm";
import SignUpForm from "./registerForm/SignUpForm";

interface SignInForm {
  email: string;
  password: string;
}

export default function AuthTabs() {
  const [activeTab, setActiveTab] = useState<string | null>("login");

  return (
    <BackgroundImage
      src="/bg1.jpg"
      w="100%"
      style={{
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Flex
        direction="column"
        align="center"
        justify="flex-start"
        w="100%"
        py={{ base: "5vh", md: "15vh" }}
      >
        <Image src="/Logo.png" maw={rem(180)} mx="auto" mb="xl" />

        <Container size="xs" w="100%" px={{ base: "md", sm: "xl" }}>
          <Tabs
            value={activeTab}
            onChange={setActiveTab}
            variant="pills"
            color="white"
            w="100%"
          >
            <Tabs.List
              grow
              bg="#F6F7F8"
              style={{ borderRadius: "10px 10px 0 0" }}
            >
              <Tabs.Tab
                value="login"
                c={activeTab === "login" ? "#0E4E8E" : "#999999"}
                size={"20px"}
                fw={600}
              >
                เข้าสู่ระบบ
              </Tabs.Tab>
              <Tabs.Tab
                p={"sm"}
                value="register"
                c={activeTab === "register" ? "#0E4E8E" : "#999999"}
                size={"20px"}
                fw={600}
              >
                สมัครสมาชิก
              </Tabs.Tab>
            </Tabs.List>

            <Box
              bg="white"
              p={{ base: "md", sm: "lg" }}
              style={{ borderRadius: "0 0 10px 10px" }}
            >
              <Tabs.Panel value="login">
                <SignInForm />
              </Tabs.Panel>

              <Tabs.Panel value="register">
                <SignUpForm goToLogin={() => setActiveTab("login")} />
              </Tabs.Panel>
            </Box>
          </Tabs>
        </Container>
      </Flex>
    </BackgroundImage>
  );
}
