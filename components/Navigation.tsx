import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Popover,
  PopoverTrigger,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { useSetRecoilState } from "recoil";
import { userState } from "../lib/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";

export const Navigation: React.FC = () => {
  const { isOpen, onToggle } = useDisclosure();
  const router = useRouter();
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
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 4 }}
        px={{ base: 8 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          {/* ハンバーガーボタン */}
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          alignItems={{ base: "center" }}
        >
          {/* *** ロゴ  *** */}
          <NextLink href="/posts" passHref>
            <Text
              as="a"
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontFamily={"heading"}
              color={useColorModeValue("gray.800", "white")}
              _hover={{
                cursor: "pointer",
              }}
            >
              Logo
            </Text>
          </NextLink>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
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

          {/* ログアウト処理 */}

          <NextLink href="/" passHref>
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
          </NextLink>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

const DesktopNav = () => {
  const linkColor = "gray.600";
  const linkHoverColor = "gray.800";

  return (
    <Stack direction={"row"} spacing={4}>
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
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        // as={NextLink}
        // href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <NextLink href={href ?? "#"}>
          <Text
            as="a"
            fontWeight={600}
            color={useColorModeValue("gray.600", "gray.200")}
            _hover={{
              cursor: "pointer",
            }}
            marginBottom={"10px"}
          >
            {label}
          </Text>
        </NextLink>
      </Flex>
    </Stack>
  );
};

interface NavItem {
  label: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "投稿する",
    href: "/posts/create",
  },
  {
    label: "マイページ",
    href: "/mypage",
  },
];
