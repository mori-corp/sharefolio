import {
  ButtonGroup,
  Container,
  IconButton,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";
import * as React from "react";
import { FaGithub, FaTwitter } from "react-icons/fa";

export const Footer = () => (
  <Container as="footer" role="contentinfo" py={8} m={0} minW={"100%"}>
    <Stack spacing={{ base: "4", md: "5" }}>
      <Stack justify="start" direction="row" align="center">
        <Image src="/logo.png" alt="logo" w={"100px"} />
        <ButtonGroup variant="ghost">
          <IconButton
            as="a"
            href="https://github.com/mori-corp/sharefolio"
            aria-label="GitHub"
            icon={<FaGithub fontSize="1.25rem" />}
          />
          <IconButton
            as="a"
            aria-label="Twitter"
            icon={<FaTwitter fontSize="1.25rem" />}
          />
        </ButtonGroup>
      </Stack>
      <Text fontSize="sm" color="subtle">
        &copy; {new Date().getFullYear()} ShareFolio All rights reserved.
      </Text>
    </Stack>
  </Container>
);
