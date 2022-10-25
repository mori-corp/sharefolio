import type { NextPage } from "next";
import Layout from "../../components/Layout";
import React, { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Container,
  Icon,
  HStack,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { AiOutlineHeart } from "react-icons/ai";
import { Author } from "../../components/Author";
import { LanguageTags } from "../../components/LanguageTags";

import { useRecoilState } from "recoil";
import { postState } from "../../lib/atoms";
import { useUser } from "../../lib/auth";
import { PostType } from "../../types/post";

const index: NextPage = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [postDetail, setPostDetail] = useRecoilState(postState);
  const user = useUser();

  useEffect(() => {
    // firestoreから取得したドキュメント一覧を、追加時間の降順に並べ替え
    const q = query(collection(db, "posts"), orderBy("postedDate", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          // ドキュメントIDを割り振り
          id: doc.id,
          appName: doc.data().appName,
          title: doc.data().title,
          description: doc.data().description,
          level: doc.data().level,
          language: doc.data().language,
          appUrl: doc.data().appUrl,
          github: doc.data().github,
          postedDate: doc.data().postedDate,
          authorId: doc.data().userId,
        }))
      );
    });

    return unsub;
  }, []);

  // 各投稿をクリック、Recoilへ状態保持
  const showDetail = (post: any) => {
    setPostDetail({
      id: post.id,
      appName: post.appName,
      title: post.title,
      description: post.description,
      level: post.level,  
      language: post.language,
      appUrl: post.appUrl,
      github: post.github,
      postedDate: post.postedDate,
      authorId: post.authorId,
    });
  };

  return (
    <Layout title={"Posts - ShareFolio"}>
      <Heading as="h1" textAlign={"center"} mt={16}>
        投稿一覧
      </Heading>

      <Container maxW={"5xl"} p="12">
        <UnorderedList>
          {posts.map((post) => (
            <ListItem key={post.id}>
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
                    <Link
                      textDecoration="none"
                      _hover={{ textDecoration: "none" }}
                    >
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
                    <NextLink href={`/posts/${post.id}`}>
                      <Text
                        as="a"
                        textDecoration="none"
                        _hover={{ textDecoration: "none", cursor: "pointer" }}
                        onClick={() => showDetail(post)}
                      >
                        {post.title}
                      </Text>
                    </NextLink>
                  </Heading>

                  {/* アプリの説明部分 */}
                  <Text as="p" marginTop="2" color="gray.700" fontSize="md">
                    {post.description}
                  </Text>

                  {/* 言語タグ一覧 */}
                  <LanguageTags tags={post.language} />

                  {/* 投稿者情報 */}
                  <HStack mt={4}>
                    {/* 投稿者 */}
                    <Author name="example" date={new Date()} />

                    {/* ハートアイコン */}
                    <Icon as={AiOutlineHeart} w={5} h={5} />

                    {/* いいね数 */}
                    <Text>100</Text>
                  </HStack>
                </Box>
              </Box>
            </ListItem>
          ))}
        </UnorderedList>
      </Container>
    </Layout>
  );
};
export default index;
