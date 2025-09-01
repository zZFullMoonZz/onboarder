import {
  Card,
  Flex,
  TextInput,
  Text,
  Container,
  Button,
  Stack,
  BackgroundImage,
} from "@mantine/core";
import Link from "next/link";
import React from "react";

export default function Page() {
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
      <Flex w={"100%"} h={"100vh"} justify={"center"} align={"center"} p={"md"}>
        <Container w={"100%"} size={"xs"}>
          <Card withBorder h={"fit-content"} w={"100%"} radius={"md"}>
            <Text ta={"center"} size="20px" fw={600}>
              ลืมรหัสผ่าน
            </Text>
            <Stack mt={"md"}>
              <TextInput w={"100%"} placeholder="กรอกที่อยู่อีเมลของท่าน" />
              <Flex gap={10}>
                <Button
                  color="#0E4E8E"
                  fullWidth
                  component={Link}
                  href="/auth/sign-in"
                  variant="outline"
                >
                  ย้อนกลับ
                </Button>
                <Button color="#0E4E8E" fullWidth>
                  ยืนยัน
                </Button>
              </Flex>
            </Stack>
          </Card>
        </Container>
      </Flex>
    </BackgroundImage>
  );
}
