import { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
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
  Image,
} from "@chakra-ui/react";
import { AiOutlineHeart } from "react-icons/ai";
import { Author } from "../../../components/Author";
import { LanguageTags } from "../../../components/LanguageTags";
import { useUser } from "../../../lib/auth";
import { PostType } from "../../../types/post";
import { useRecoilState } from "recoil";
import { postState, usePostIdValue } from "../../../lib/atoms";

const detail: NextPage = () => {
  const [post, setPost] = useState<PostType>();
  const router = useRouter();
  const { detail } = router.query;
  const postId = usePostIdValue();
  const [postDetail, setPostDetail] = useRecoilState<PostType>(postState);

  // firebaseから、ドキュメントを投稿idで参照
  useEffect((): any => {
    const readDoc = async () => {
      const docRef = doc(db, "posts", postId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPost({
          ...docSnap.data(),
          id: postId,
          title: docSnap.data().title,
          appName: docSnap.data().appName,
          description: docSnap.data().description,
          appUrl: docSnap.data().appUrl,
          language: docSnap.data().language,
          level: docSnap.data().level,
          github: docSnap.data().github,
          postedDate: docSnap.data().postedDate,
          authorId: docSnap.data().authorId,
        });
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    return readDoc;
  }, []);

  // 各投稿をクリック、Recoilへ状態保持
  const handleEditButtonClick = (postId: any) => {
    setPostDetail({
      id: postId,
      title: post?.title,
      appName: post?.appName,
      description: post?.description,
      appUrl: post?.appUrl,
      language: post?.language,
      level: post?.level,
      github: post?.github,
      postedDate: post?.postedDate,
      authorId: post?.authorId,
    });
  };

  // firebaseより取得したtimestampを、yy/mm/dd/hh/mm形式へ変換
  // const getDisplayTime = (dateObj: any) => {
  //   if (dateObj === null) return;
  //   const year = dateObj.toDate().getFullYear();
  //   const month = ("0" + (dateObj.toDate().getMonth() + 1)).slice(-2);
  //   const date = ("0" + dateObj.toDate().getDate()).slice(-2);
  //   const hour = ("0" + dateObj.toDate().getHours()).slice(-2);
  //   const min = ("0" + dateObj.toDate().getMinutes()).slice(-2);

  //   return `${year}年${month}月${date}日 ${hour}:${min}`;
  // };

  const user = useUser();

  const levels = (level: string | undefined) => {
    switch (level) {
      case "beginner":
        return "初級";
        break;
      case "intermediate":
        return "中級";
        break;
      case "advanced":
        return "上級";
        break;
    }
  };

  return (
    <Layout title={"Detail - ShareFolio"}>
      <Flex flexDirection={"column"} align={"center"} w={"full"}>
        {/* 投稿タイトル */}
        <Heading
          maxW={"2xl"}
          textAlign={"center"}
          fontSize={"2xl"}
          px={{ sm: 8 }}
          mt={20}
        >
          {post?.title}
        </Heading>

        <Stack
          textAlign={"center"}
          w={{ lg: "60%", md: "80%", sm: "100%" }}
          p={4}
          spacing="4"
        >
          {/* アプリ名 */}
          <Text my={4} fontSize={"4xl"} fontWeight={"bold"} color={"blue.400"}>
            {post?.appName}
          </Text>

          {/* アプリの説明欄 */}
          <Box
            rounded={"lg"}
            bg={"white"}
            boxShadow={"lg"}
            py={10}
            px={{ lg: 14, md: 14, sm: 4 }}
          >
            <Box>{post?.description}</Box>
          </Box>

          {/* プレビュー画像 */}
          <Image
            borderRadius="lg"
            src={
              "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
            }
            alt="some good alt text"
            objectFit="contain"
          />

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
                <ListIcon color="green.500" />
                アプリURL：
                <Link href={post?.appUrl} color={"blue.400"} isExternal>
                  {post?.appUrl}
                </Link>
              </ListItem>

              {/* GitHub */}
              <ListItem>
                <ListIcon color="green.500" />
                GitHub：
                <Link href={post?.github} color={"blue.400"} isExternal>
                  {post?.github}
                </Link>
              </ListItem>

              {/* 使用言語 */}
              <ListItem>
                <ListIcon color="green.500" />
                使用言語：
                <LanguageTags tags={post?.language} />
              </ListItem>

              {/* レベル */}
              <ListItem>
                <ListIcon color="green.500" />
                レベル：{levels(post?.level)}
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
              <Author name="example" />
            </HStack>
          </Flex>

          {/* コメント欄（外枠） */}
          {/* <Stack
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
          </Stack> */}
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
                onClick={() => handleEditButtonClick(post?.id)}
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
