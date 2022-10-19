import {
  Flex,
  Text,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { NAV_ITEMS } from "./NavItems";

export const MobileNav: React.FC = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack bg={"white"} p={4} display={{ md: "none" }}>
      {NAV_ITEMS.map((navItem) => (
        <Stack spacing={4} onClick={onToggle}>
          <Flex
            py={2}
            justify={"space-between"}
            align={"center"}
            _hover={{
              textDecoration: "none",
            }}
          >
            <NextLink href={navItem.href ?? "#"}>
              <Text
                as="a"
                fontWeight={600}
                color={useColorModeValue("gray.600", "gray.200")}
                _hover={{
                  cursor: "pointer",
                }}
                marginBottom={"10px"}
              >
                {navItem.label}
              </Text>
            </NextLink>
          </Flex>
        </Stack>
      ))}
    </Stack>
  );
};
