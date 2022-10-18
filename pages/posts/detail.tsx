import NextLink from "next/link";
import type { NextPage } from "next";
import Layout from "../../components/Layout";
import {
  Flex,
  Box,
  Text,
  Heading,
  Button,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const detail: NextPage = () => {
  return (
    <Layout title={"Detail - ShareFolio"}>
      <Flex direction={"column"} align={"center"} w={"full"} p={8}>
        <Heading maxW={"xl"} fontSize={"2xl"}>
          ポートフォリオをシェアして楽しむプラットフォーム
        </Heading>

        {/* アプリ名 */}
        <Text my={8} fontSize={"4xl"} fontWeight={"bold"} color={"blue.400"}>
          ShareFolio
        </Text>

        {/* アプリの説明欄 */}
        <Box
          rounded={"lg"}
          bg={"white"}
          boxShadow={"lg"}
          py={10}
          px={{ lg: 14, md: 14, sm: 4 }}
          m={4}
          w={{ lg: "60%", md: "80%", sm: "100%" }}
        >
          <Box>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum
            corrupti totam quae a nostrum, at facere facilis vel quia sequi
            adipisci consequatur vitae delectus neque culpa ipsum sed ducimus,
            quidem quos iusto. Tenetur temporibus, culpa deserunt reprehenderit
            perspiciatis debitis nostrum?
          </Box>
        </Box>

        {/* アプリの詳細情報 */}
        <Box
          rounded={"lg"}
          bg={"white"}
          boxShadow={"lg"}
          py={10}
          px={{ lg: 14, md: 14, sm: 4 }}
          w={{ lg: "60%", md: "80%", sm: "100%" }}
          m={4}
        >
          <List spacing={3}>
            <ListItem>
              <ExternalLinkIcon color="blue.400" />
              アプリURL：
            </ListItem>
            <ListItem>
              <ListIcon color="green.500" />
              GitHub：
            </ListItem>
            <ListItem>
              <ListIcon color="green.500" />
              投稿者：
            </ListItem>
            {/* You can also use custom icons from react-icons */}
            <ListItem>
              <ListIcon color="green.500" />
              投稿日時：
            </ListItem>
          </List>
        </Box>
        <NextLink href="/posts" passHref>
          <Button
            as="a"
            loadingText="Submitting"
            size="lg"
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
          >
            戻る
          </Button>
        </NextLink>
      </Flex>
    </Layout>
  );
};

export default detail;
