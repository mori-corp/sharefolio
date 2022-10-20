import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import type { NextPage } from "next";
import Layout from "../../../components/Layout";
import {
  Flex,
  Box,
  Text,
  Heading,
  Button,
  List,
  ListItem,
  ListIcon,
  Link,
  Stack,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { AiOutlineHeart } from "react-icons/ai";
import { Author } from "../../../components/Author";

const detail: NextPage = () => {
  const router = useRouter();
  const { detail } = router.query;

  return (
    <Layout title={"Detail - ShareFolio"}>
      <Flex flexDirection={"column"} align={"center"} w={"full"}>
        <Heading maxW={"2xl"} fontSize={"2xl"} px={{ sm: 8 }} mt={8}>
          ポートフォリオをシェアして楽しむプラットフォーム -
          共有とシェアのオリジナルアプリ
        </Heading>

        <Stack
          textAlign={"center"}
          w={{ lg: "60%", md: "80%", sm: "100%" }}
          p={4}
          spacing="4"
        >
          {/* アプリ名 */}
          <Text my={4} fontSize={"4xl"} fontWeight={"bold"} color={"blue.400"}>
            ShareFolio
          </Text>

          {/* アプリの説明欄 */}
          <Box
            rounded={"lg"}
            bg={"white"}
            boxShadow={"lg"}
            py={10}
            px={{ lg: 14, md: 14, sm: 4 }}
          >
            <Box>
              ポートフォリオのアイディアが欲しいエンジニア、プログラミング初学者、就職活動中の人などへ向け、たくさんのオリジナルアプリを一箇所でまとめて閲覧・シェアできるプラットフォームです。
            </Box>
          </Box>

          {/* アプリの詳細情報 */}
          <Box
            rounded={"lg"}
            bg={"white"}
            boxShadow={"lg"}
            py={10}
            px={{ lg: 14, md: 14, sm: 4 }}
            textAlign={"left"}
          >
            <List spacing={4}>
              {/* アプリURL */}
              <ListItem>
                <ExternalLinkIcon color="blue.400" />
                アプリURL：
                <Link
                  href="https://sharefolio2022.web.app/"
                  color={"blue.400"}
                  isExternal
                >
                  https://sharefolio2022.web.app/ isExternal
                </Link>
              </ListItem>

              {/* GitHub */}
              <ListItem>
                <ListIcon color="green.500" />
                GitHub：
                <Link
                  href="https://github.com/mori-corp/sharefolio"
                  color={"blue.400"}
                  isExternal
                >
                  https://github.com/mori-corp/sharefolio
                </Link>
              </ListItem>

              {/* 使用言語 */}
              <ListItem>
                <ListIcon color="green.500" />
                使用言語：HTML, CSS, Javascript, React, Next.js, Vue, Python,
                PHP, Ruby
              </ListItem>

              {/* レベル */}
              <ListItem>
                <ListIcon color="green.500" />
                レベル：初級
              </ListItem>

              {/* 投稿者 */}
              <ListItem>
                <ListIcon color="green.500" />
                投稿者：
              </ListItem>

              {/* 投稿日時 */}
              <ListItem>
                <ListIcon color="green.500" />
                投稿日時：
              </ListItem>
            </List>
          </Box>

          {/* ハートアイコン */}
          <Flex align={"center"} justify={"space-between"}>
            <HStack>
              <Icon as={AiOutlineHeart} w={8} h={8} />
              <Text fontSize={"md"}>100 Likes</Text>
            </HStack>
            {/* 投稿者 */}
            <HStack>
              <Text fontSize={"md"}>投稿者:</Text>
              <Author name="John Doe" date={new Date("2021-04-06T19:01:27Z")} />
            </HStack>
          </Flex>

          {/* コメント欄（外枠） */}
          <Stack
            spacing="8"
            rounded={"lg"}
            bg={"white"}
            boxShadow={"lg"}
            py={10}
            px={{ lg: 14, md: 14, sm: 4 }}
            textAlign={"left"}
          >
            <Text
              as="h2"
              textAlign={"center"}
              fontSize={"xl"}
              fontWeight={"bold"}
              color={"gray.600"}
            >
              コメント
            </Text>
            <Box>
              <Author name="John Doe" date={null} />
              <Box>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
                minima.
              </Box>
            </Box>
            <hr />
            <Box>
              <Author name="John Doe" date={null} />
              <Box>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,
                sint!
              </Box>
            </Box>
            <hr />
          </Stack>
          {/* ボタン部分 */}
          <Stack>
            {/* 編集ボタン */}
            <NextLink href={`/posts/${detail}/edit`} passHref>
              <Button
                as="a"
                loadingText="Submitting"
                size="lg"
                bg={"pink.400"}
                color={"white"}
                _hover={{
                  bg: "pink.500",
                }}
              >
                編集
              </Button>
            </NextLink>

            {/* 戻るボタン */}
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
          </Stack>
        </Stack>
      </Flex>
    </Layout>
  );
};

export default detail;
