import React, { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  useColorModeValue,
  Container,
  Icon,
  HStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { AiOutlineHeart } from "react-icons/ai";
import { Author } from "./Author";
import { BlogTags } from "./BlogTags";

type Post = {
  appName: string;
  title: string;
  description: string;
  level: string;
  language: Array<string>;
  appUrl: string;
  github: string;
  date: Date;
  userId: string;
};

export const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // firestoreから取得したドキュメント一覧を、追加時間の降順に並べ替え
    const q = query(collection(db, "posts"), orderBy("date", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          appName: doc.data().appName,
          title: doc.data().title,
          description: doc.data().description,
          level: doc.data().level,
          language: doc.data().language,
          appUrl: doc.data().appUrl,
          github: doc.data().github,
          date: doc.data().date,
          userId: doc.data().userId,
        }))
      );
    });

    console.log(posts);

    return unsub;
  }, []);

  return (
    <Container maxW={"5xl"} p="12">
      {posts.map((post) => (
        <>
          {/* 各投稿のBox */}
          <Box
            marginTop={{ base: "1", sm: "5" }}
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            justifyContent="space-between"
          >
            {/* サムネ画像部分（左半分）のBox */}
            <Box
              display="flex"
              flex="1"
              marginRight="3"
              position="relative"
              alignItems="center"
            >
              {/* サムネ画像のBox */}
              <Box
                width={{ sm: "100%" }}
                zIndex="2"
                marginTop="5%"
                marginRight={4}
              >
                {/* サムネ画像部分 */}
                <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
                  <Image
                    borderRadius="lg"
                    src={
                      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
                    }
                    alt="some good alt text"
                    objectFit="contain"
                  />
                </Link>
              </Box>
            </Box>

            {/* 文章（コンテンツ）部分（右半分）のBox */}
            <Box
              display="flex"
              flex="1"
              flexDirection="column"
              justifyContent="center"
              marginTop={{ base: "3", sm: "3" }}
            >
              {/* 投稿タイトル */}
              <Heading marginTop="1" fontSize={"2xl"}>
                {/* ダイナミックルーティングについて
            
            1. 以下のNextLink hrefには、各投稿固有のidを、パスとして指定
            2. このidが、/posts/[detail]へ受け継がれる
            
             */}
                <NextLink href="/posts/post-id">
                  <Text
                    as="a"
                    textDecoration="none"
                    _hover={{ textDecoration: "none", cursor: "pointer" }}
                  >
                    {post.title}
                  </Text>
                </NextLink>
              </Heading>

              {/* アプリの説明部分 */}
              <Text
                as="p"
                marginTop="2"
                color={useColorModeValue("gray.700", "gray.200")}
                fontSize="md"
              >
                {post.description}
              </Text>

              {/* 言語タグ一覧 */}
              <BlogTags tags={post.language} />

              {/* 投稿者情報 */}
              <HStack mt={4}>
                {/* 投稿者 */}
                <Author
                  name={post.userId}
                  date={new Date("2021-04-06T19:01:27Z")}
                />

                {/* ハートアイコン */}
                <Icon as={AiOutlineHeart} w={5} h={5} />

                {/* いいね数 */}
                <Text>100</Text>
              </HStack>
            </Box>
          </Box>
        </>
      ))}
    </Container>
  );
};
