import { useState } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { signInWithGoogle } from "../lib/auth";
import { useRouter } from "next/router";

export const Auth: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  // googleでサインイン
  const handleGoogleSignIn = async () => {
    signInWithGoogle();
  };

  // Email,passwordでの新規登録
  const handleSignUpWithEmail = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
    router.push("/mypage");
  };

  // Email,passwordでのログイン
  const handleLoginWithEmail = async () => {
    await signInWithEmailAndPassword(auth, email, password);

    router.push("/posts");
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.50"}>
      <Stack spacing={8} mx={"auto"} my={0} maxW={"lg"} py={4} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            {isLogin ? "Login" : "Sign up"}
          </Heading>
        </Stack>

        {/* フォームの白枠部分 */}
        <Box
          rounded={"lg"}
          bg={"white"}
          boxShadow={"lg"}
          py={8}
          px={12}
          w={"md"}
        >
          <Stack spacing={4} h={"full"}>
            {/* フォーム */}
            <form>
              {/* email入力欄 */}
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              {/* Submitボタン */}
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={
                    isLogin
                      ? async () => {
                          try {
                            await handleLoginWithEmail();
                          } catch (err: any) {
                            alert(err.message);
                          }
                        }
                      : async () => {
                          try {
                            await handleSignUpWithEmail();
                          } catch (err: any) {
                            alert(err.message);
                          }
                        }
                  }
                >
                  {isLogin ? "Login" : "Sing Up"}
                </Button>
              </Stack>
            </form>

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

            {/* 認証方法の切り替えボタン */}
            <Text
              py={4}
              color={"blue.500"}
              align={"center"}
              fontSize={"sm"}
              onClick={() => setIsLogin(!isLogin)}
              _hover={{
                cursor: "pointer",
              }}
            >
              {isLogin
                ? "まだアカウントをお持ちでない方"
                : "既にアカウントをお持ちの方"}
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
