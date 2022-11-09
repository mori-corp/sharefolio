import {
  ButtonGroup,
  Container,
  IconButton,
  Stack,
  Text,
  Image,
  Link,
} from '@chakra-ui/react'
import * as React from 'react'
import { FaGithub } from 'react-icons/fa'

export const Footer: React.FC = () => (
  <Container
    as="footer"
    role="contentinfo"
    py={8}
    m={0}
    minW={'100%'}
    borderTop={1}
    borderStyle={'solid'}
    borderColor={'gray.200'}
  >
    <Stack spacing={{ base: '4', md: '5' }}>
      <Stack justify="start" direction="row" align="center">
        <Image src="/logo.png" alt="logo" w={'100px'} />
        <ButtonGroup variant="ghost">
          <Link href="https://github.com/mori-corp/sharefolio" isExternal>
            <IconButton
              aria-label="GitHub"
              icon={<FaGithub fontSize="1.25rem" />}
            />
          </Link>
          {/* <IconButton
            as="a"
            aria-label="Twitter"
            icon={<FaTwitter fontSize="1.25rem" />}
          /> */}
        </ButtonGroup>
      </Stack>
      <Text fontSize="sm" color="subtle">
        &copy; {new Date().getFullYear()} ShareFolio All rights reserved.
      </Text>
    </Stack>
  </Container>
)
