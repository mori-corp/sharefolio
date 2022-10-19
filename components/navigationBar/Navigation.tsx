import {
  Box,
  Flex,
  Text,
  IconButton,
  Collapse,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

export const Navigation: React.FC = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg={"white"}
        color={"gray.600"}
        minH={"60px"}
        py={4}
        px={8}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={"gray.200"}
        align={"center"}
      >
        {/* ハンバーガーボタン */}
        <Flex ml={{ base: -2 }} display={{ base: "flex", md: "none" }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>

        {/*　ナビゲーション部分 */}
        <Flex
          flex={1}
          justify={{ base: "center", md: "start" }}
          alignItems={"center"}
          w={"full"}
        >
          {/* *** ロゴ  *** */}
          <NextLink href="/posts" passHref>
            <Text
              as="a"
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontFamily={"heading"}
              color={"gray.800"}
              _hover={{
                cursor: "pointer",
              }}
            >
              Logo
            </Text>
          </NextLink>

          {/* デスクトップ用ナビゲーション */}
          <Flex display={{ base: "none", md: "flex" }} ml={10} w={"full"}>
            <DesktopNav />
          </Flex>
        </Flex>
      </Flex>

      {/* モバイル用ナビゲーション */}
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};
