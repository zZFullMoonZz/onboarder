"use client";
import { Button, Flex, Text } from "@mantine/core";
import { signOut } from "next-auth/react";
import React from "react";

export default function Page() {
  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/auth/sign-in" });
  };

  return (
    <>
      <Flex direction={"column"} w={"100%"} gap={"md"} mt={"xl"}>
        <Text ta={"center"}>Wellcome to home page</Text>
        <Flex justify={"center"}>
          <Button onClick={handleSignOut} color={"red"} w={300}>
            ออกจากระบบ
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
