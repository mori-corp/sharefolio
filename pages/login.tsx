import React from "react";
import Layout from "../components/Layout";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { NextPage } from "next";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  // Link,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

const login: NextPage = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = () => console.log("Clicked");

  return (
    <Layout title={"signin - sharefolio"}>
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} my={0} maxW={"lg"} py={4} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Login
            </Heading>
          </Stack>
          <Box rounded={"lg"} boxShadow={"lg"} py={8} px={12} w={"md"}>
            <Stack spacing={4}>
              {/* フォーム */}
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* email入力欄 */}
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email"
                    {...register("email", {
                      required: "This is required",
                      minLength: {
                        value: 4,
                        message: "Minimum length should be 4",
                      },
                    })}
                    mb={4}
                  />
                </FormControl>

                {/* パスワード入力欄 */}
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="password"
                      {...register("password", {
                        required: "This is required",
                        minLength: {
                          value: 6,
                          message: "Minimum length should be 6",
                        },
                      })}
                      mb={4}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                {/* Sign upボタン */}
                <Stack spacing={10} pt={2}>
                  <Button
                    type="submit"
                    loadingText="Submitting"
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Sign up
                  </Button>
                </Stack>
              </form>

              {/* ログイン画面への推移ボタン */}
              <Stack pt={6}>
                <Text align={"center"}>
                  Don't have an account yet?{" "}
                  <NextLink href={"/"}>
                    <Text
                      as="span"
                      color={"blue.400"}
                      _hover={{
                        color: "blue.500",
                        cursor: "pointer",
                      }}
                    >
                      Sign up
                    </Text>
                  </NextLink>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Layout>
  );
};

export default login;
