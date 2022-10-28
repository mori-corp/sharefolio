import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useRecoilState } from "recoil";
import { userState } from "../../lib/auth";
import { NAV_ITEMS } from "./NavItems";
import { Box, Text, Stack, Button, HStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { useEffect, useState } from "react";

export const DesktopNav: React.FC = () => {
  const linkColor = "gray.600";
  const linkHoverColor = "gray.800";
  // const setUser = useSetRecoilState(userState);
  const [user, setUser] = useRecoilState(userState);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setIsLogin(user.uid !== "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ログアウト処理
  const handleLogout = async () => {
    alert("ログアウトしました");
    await signOut(auth);
    setUser({
      uid: "",
      photoUrl: "",
      displayName: "",
    });
  };

  return (
    <Stack
      direction={"row"}
      spacing={4}
      // alignItems={"center"}
      justify={"right"}
      w={"full"}
    >
      <HStack>
        {/* 未ログイン状態では、ナビゲーション非表示 */}
        {isLogin && (
          <>
            {NAV_ITEMS.map((navItem) => (
              <Box key={navItem.label}>
                {/* リンク */}
                <NextLink
                  href={user.uid === "" ? "/" : navItem.href ?? "#"}
                  passHref
                >
                  <Text
                    as="a"
                    p={2}
                    fontSize={"sm"}
                    fontWeight={500}
                    color={linkColor}
                    _hover={{
                      textDecoration: "none",
                      color: linkHoverColor,
                      cursor: "pointer",
                    }}
                  >
                    {navItem.label}
                  </Text>
                </NextLink>
              </Box>
            ))}
          </>
        )}

        {/* Sign upボタン */}
        {!isLogin && (
          <NextLink href="/" passHref>
            <Button
              as="a"
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"pink.400"}
              _hover={{
                bg: "pink.300",
              }}
            >
              Sign up
            </Button>
          </NextLink>
        )}

        {/* ログアウトボタン */}
        {isLogin && (
          <Button
            as="a"
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"blue.400"}
            _hover={{
              bg: "blue.300",
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </HStack>
    </Stack>
  );
};
