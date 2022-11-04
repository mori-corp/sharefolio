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
import { LanguageTags } from "../../components/LanguageTags";
import { useSetRecoilState } from "recoil";
import { postIdState } from "../../lib/atoms";
import { PostType } from "../../types/post";
import { AuthorType } from "../../types/author";

const Posts: NextPage = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const setPostId = useSetRecoilState(postIdState);
  const [authors, setAuthors] = useState<AuthorType[]>([]);

  useEffect(() => {
    // firestoreから取得したドキュメント一覧を、追加時間の降順に並べ替え
    const q = query(collection(db, "posts"), orderBy("postedDate", "desc"));
    const readDocs = onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          // ドキュメントIDを割り振り
          id: doc.id,
          appName: doc.data().appName,
          title: doc.data().title,
          description: doc.data().description,
          image: doc.data().image,
          level: doc.data().level,
          language: doc.data().language,
          appUrl: doc.data().appUrl,
          github: doc.data().github,
          postedDate: doc.data().postedDate,
          authorId: doc.data().authorId,
        }))
      );
    });

    return readDocs;
  }, []);

  useEffect(() => {
    // firebase usersコレクションより全ユーザーの情報を取得
    const q = query(collection(db, "users"));
    const unsub = onSnapshot(q, (snapshot) => {
      setAuthors(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          uid: doc.data().uid,
          username: doc.data().username,
          photoUrl: doc.data().photoUrl,
        }))
      );
    });
    return unsub;
  }, []);

  // firebaseより取得したtimestampを、yy/mm/dd/hh/mm形式へ変換
  const getDisplayTime = (e: any) => {
    if (e === null) return;
    const year = e.toDate().getFullYear();
    const month = ("0" + (e.toDate().getMonth() + 1)).slice(-2);
    const date = ("0" + e.toDate().getDate()).slice(-2);
    const hour = ("0" + e.toDate().getHours()).slice(-2);
    const min = ("0" + e.toDate().getMinutes()).slice(-2);

    return `${year}年${month}月${date}日 ${hour}:${min}`;
  };
  return (
    <Layout title={"ShareFolio｜ポートフォリオの共有サイト"}>
      <Heading as="h1" textAlign={"center"} mt={16}>
        投稿一覧
      </Heading>

      <Container display={"flex"} maxW={"5xl"} p={{ base: 1, md: 12 }}>
        <UnorderedList styleType="none" m={0}>
          {posts.map((post) => (
            <ListItem key={post.id}>
              {/* 各投稿のBox */}
              <NextLink href={`/posts/${post.id}`}>
                <Box
                  my={{ base: "10", sm: "8" }}
                  display="flex"
                  flexDirection={{ base: "column", md: "row" }}
                  justifyContent="space-between"
                  p={4}
                  bg={"gray.100"}
                  _hover={{ bg: "gray.200" }}
                  borderRadius={"lg"}
                  onClick={() => setPostId(post.id)} // 投稿のドキュメントidをrecoilにセット
                >
                  {/* サムネ画像部分（左半分）のBox */}
                  <Box
                    display="flex"
                    flex="1"
                    position="relative"
                    alignItems="center"
                  >
                    {/* サムネ画像のBox */}
                    <Box
                      width={{ sm: "100%" }}
                      zIndex="2"
                      marginTop="5%"
                      marginRight={4}
                      display="flex"
                      justifyContent={"center"}
                      my={{ sm: 5, md: 0 }}
                      maxW={{ md: "md" }}
                    >
                      {/* サムネ画像部分 */}

                      <Image
                        borderRadius="lg"
                        src={post.image ? post.image : "/sample-icon.png"}
                        alt={`image of ${post.appName}`}
                        objectFit="cover"
                        align={"center"}
                        _hover={{ cursor: "pointer" }}
                      />
                    </Box>
                  </Box>

                  {/* 文章（コンテンツ）部分（右半分）のBox */}
                  <Box
                    display="flex"
                    flex="1"
                    flexDirection="column"
                    justifyContent="space-around"
                    marginTop={{ base: 3, sm: 3, md: 0 }}
                    ml={{ sm: 0, md: 4 }}
                  >
                    {/* 投稿タイトル */}
                    <Heading marginTop="1" fontSize={{ base: "lg", sm: "2xl" }}>
                      <Text
                        as="a"
                        textDecoration="none"
                        _hover={{
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        noOfLines={2}
                      >
                        {post.title}
                      </Text>
                    </Heading>

                    {/* アプリの説明部分 */}
                    <Text
                      as="p"
                      marginTop="2"
                      color="gray.700"
                      fontSize={{ base: "sm", sm: "md" }}
                      noOfLines={4}
                    >
                      {post.description}
                    </Text>

                    <Box>
                      {/* 言語タグ一覧 */}
                      <LanguageTags tags={post.language} />

                      {/* 投稿者情報 */}
                      <HStack mt={4} spacing={4}>
                        {/* 投稿者情報 */}
                        {authors.map(
                          (author) =>
                            author.uid === post.authorId && (
                              <HStack>
                                {/* ユーザーのアイコン */}
                                <Image
                                  borderRadius="full"
                                  boxSize="20px"
                                  src={
                                    author.photoUrl
                                      ? author.photoUrl
                                      : "/user.png"
                                  }
                                  alt={`Avatar of ${author.username}`}
                                />
                                {/* ユーザーネーム */}
                                <Text fontWeight="medium" fontSize={"sm"}>
                                  {author.username}
                                </Text>
                              </HStack>
                            )
                        )}

                        <Text fontSize={"sm"}>
                          投稿日時：{getDisplayTime(post.postedDate)}
                        </Text>

                        {/* ハートアイコン */}
                        {/* <Icon as={AiOutlineHeart} w={4} h={4} /> */}
                        {/* いいね数 */}
                        {/* <Text fontSize={"sm"}>10</Text> */}
                      </HStack>
                    </Box>
                  </Box>
                </Box>
              </NextLink>
            </ListItem>
          ))}
        </UnorderedList>
      </Container>
    </Layout>
  );
};
export default Posts;
