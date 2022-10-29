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
import { PostType } from "../../../types/post";
import { useRecoilState } from "recoil";
import { postState, usePostIdValue } from "../../../lib/atoms";
import { useUser } from "../../../lib/auth";

const Detail: NextPage = () => {
  const [post, setPost] = useState<PostType>({
    id: "",
    appName: "",
    title: "",
    description: "",
    image: "",
    level: "",
    language: [""],
    appUrl: "",
    github: "",
    postedDate: "",
    authorId: "",
  });
  const router = useRouter();
  const { detail } = router.query;
  const postId = usePostIdValue();
  const [postDetail, setPostDetail] = useRecoilState<PostType>(postState);
  const user = useUser();

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
          image: docSnap.data().image,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 各投稿をクリック、Recoilへ状態保持
  const handleEditButtonClick = (postId: string) => {
    setPostDetail({
      id: postId,
      title: post.title,
      appName: post.appName,
      description: post.description,
      image: post.image,
      appUrl: post.appUrl,
      language: post.language,
      level: post.level,
      github: post.github,
      postedDate: post.postedDate,
      authorId: post.authorId,
    });
  };

  const levels = (level: string) => {
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
          fontSize={{ base: "lg", sm: "2xl" }}
          px={{ base: 4, sm: 8 }}
          mt={20}
        >
          {post.title}
        </Heading>

        <Stack
          textAlign={"center"}
          w={{ base: "100%", md: "80%" }}
          p={4}
          spacing="4"
        >
          {/* アプリ名 */}
          <Text
            my={4}
            fontSize={{ base: "2xl", sm: "4xl" }}
            fontWeight={"bold"}
            color={"blue.400"}
          >
            {post.appName}
          </Text>

          {/* アプリの説明欄 */}
          <Box
            rounded={"lg"}
            bg={"white"}
            boxShadow={"lg"}
            py={10}
            px={{ base: 4, md: 10 }}
          >
            <Text fontSize={{ base: "sm", sm: "md" }}>{post.description}</Text>
          </Box>

          {/* アプリ画像 */}
          {post.image && (
            <Image
              borderRadius="lg"
              src={post.image}
              alt={`image of ${post.appName}`}
              objectFit="contain"
            />
          )}

          {/* アプリの詳細情報 */}
          <Box
            rounded={"lg"}
            bg={"white"}
            boxShadow={"lg"}
            py={10}
            px={{ base: 4, md: 10 }}
            textAlign={"left"}
          >
            <List spacing={4} fontSize={{ base: "sm", sm: "md" }}>
              {/* アプリURL */}
              <ListItem>
                <ListIcon color="green.500" />
                アプリURL：
                <Link href={post.appUrl} color={"blue.400"} isExternal>
                  {post.appUrl}
                </Link>
              </ListItem>

              {/* GitHub */}
              <ListItem>
                <ListIcon color="green.500" />
                GitHub：
                <Link href={post.github} color={"blue.400"} isExternal>
                  {post.github}
                </Link>
              </ListItem>

              {/* 使用言語 */}
              <ListItem>
                <ListIcon color="green.500" />
                使用言語：
                <LanguageTags tags={post.language} />
              </ListItem>

              {/* レベル */}
              <ListItem>
                <ListIcon color="green.500" />
                レベル：{levels(post.level)}
              </ListItem>

              {/* 投稿日時 */}
              {/* <ListItem>
                <ListIcon color="green.500" />
                <Text>投稿日時：{getDisplayTime(post.postedDate)}</Text>
              </ListItem> */}
            </List>
          </Box>

          {/* ハートアイコン */}
          <Flex align={"center"} justify={"space-between"}>
            <HStack>
              <Icon as={AiOutlineHeart} w={6} h={6} />
              <Text fontSize={"sm"}>100 Likes</Text>
            </HStack>
            {/* 投稿者 */}
            <HStack>
              <Text fontSize={"sm"}>投稿者:</Text>
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
            {/* 編集ボタン：ログインしているユーザーと、投稿者idが一致した場合のみ表示*/}
            {user.uid === post.authorId && (
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
                  onClick={() => handleEditButtonClick(post.id)}
                >
                  編集
                </Button>
              </NextLink>
            )}

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

export default Detail;
