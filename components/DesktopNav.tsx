import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useSetRecoilState } from "recoil";
import { userState } from "../lib/auth";
import { NAV_ITEMS } from "./NavItems";
import {
  Box,
  Text,
  Stack,
  Popover,
  PopoverTrigger,
  Button,
  HStack,
} from "@chakra-ui/react";
import NextLink from "next/link";

export const DesktopNav: React.FC = () => {
  const linkColor = "gray.600";
  const linkHoverColor = "gray.800";
  const setUser = useSetRecoilState(userState);

  // ログアウト処理
  const handleLogout = async () => {
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
      alignItems={"center"}
      justify={"space-between"}
      w={"full"}
    >
      <HStack>
        {NAV_ITEMS.map((navItem) => (
          <Box key={navItem.label}>
            <Popover trigger={"hover"} placement={"bottom-start"}>
              <PopoverTrigger>
                {/* リンク */}
                <NextLink href={navItem.href ?? "#"} passHref>
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
              </PopoverTrigger>
            </Popover>
          </Box>
        ))}
      </HStack>
      {/* Sign upボタン */}
      <HStack>
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

        {/* ログアウトボタン */}
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
      </HStack>
    </Stack>
  );
};
