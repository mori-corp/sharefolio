import { useState } from "react";
import { useForm } from "react-hook-form";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import type { NextPage } from "next";
import Layout from "./Layout";
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

import { signInWithGoogle } from "../lib/auth";

export const SignUp: React.FC = () => {
  // googleでサインインする、非同期関数
  const handleGoogleSignIn = async () => {
    signInWithGoogle();
  };

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
    <Layout title={"Signup - sharefolio"}>
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.50"}>
        <Stack spacing={8} mx={"auto"} my={0} maxW={"lg"} py={4} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            py={8}
            px={12}
            w={"md"}
            h={"md"}
          >
            <Stack spacing={4}>
              {/* フォーム */}
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Username入力 */}
                <FormControl id="userName" isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    id="userName"
                    placeholder="Username"
                    {...register("userName", {
                      required: "This is required",
                    })}
                    mb={4}
                  />
                </FormControl>

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

                {/* Google Sign inボタン */}
                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={"pink.400"}
                    color={"white"}
                    _hover={{
                      bg: " pink.500",
                    }}
                    onClick={handleGoogleSignIn}
                  >
                    SignIn with Google
                  </Button>
                </Stack>
              </form>

              {/* ログイン画面への推移ボタン */}
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <NextLink href={"/login"}>
                    <Text
                      as="span"
                      color={"blue.400"}
                      _hover={{
                        color: "blue.500",
                        cursor: "pointer",
                      }}
                    >
                      Login
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
