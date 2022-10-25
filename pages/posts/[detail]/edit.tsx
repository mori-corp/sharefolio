import React, { useState } from "react";
import type { NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
  Input,
  Flex,
  Heading,
  Box,
  Stack,
  Textarea,
  Select,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";
import { usePostValue } from "../../../lib/atoms";

const edit: NextPage = () => {
  const {
    title,
    appName,
    description,
    appUrl,
    language,
    level,
    github,
    postedDate,
    authorId,
  } = usePostValue();

  // 編集後のデータの格納
  const [editedAppName, setEditedAppName] = useState(appName);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedLevel, setEditedLevel] = useState(level);
  const [editedLanguage, setEditedLanguage] = useState<string[]>([]);
  const [editedAppUrl, setEditedAppUrl] = useState(appUrl);
  const [editedGithub, setEditedGithub] = useState(github);

  const router = useRouter();
  const { detail } = router.query;

  const handleEditButtonClick = () => {
    alert("Edit button clicked!");
  };

  const displayedLanguages = [
    "HTML",
    "CSS",
    "Javascript",
    "Vue.js",
    "Nuxt.js",
    "React.js",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Express.js",
    "Firebase",
    "Amplify",
    "SQL",
    "NoSQL",
    "GraphQL",
    "Java",
    "Ruby",
    "Go",
    "PHP",
    "C#",
    "Python",
  ];

  return (
    <Layout title={"Edit - ShareFolio"}>
      <Flex flexDirection={"column"} align={"center"} w={"full"} p={8}>
        {/* ヘディング部分 */}
        <Heading fontSize={"4xl"} mb={8}>
          投稿編集ページ
        </Heading>

        <Box
          rounded={"lg"}
          bg={"white"}
          boxShadow={"lg"}
          py={10}
          px={{ lg: 14, md: 14, sm: 4 }}
          w={{ lg: "60%", md: "80%", sm: "100%" }}
        >
          {/* フォーム */}
          <form>
            {/* アプリ名 */}
            <FormControl mb={4}>
              <FormLabel>アプリ / サービス名</FormLabel>
              <Input
                type="text"
                placeholder="40文字以内で入力してください"
                value={editedAppName}
                onChange={(e) => setEditedAppName(e.target.value)}
              />
            </FormControl>

            {/* タイトル */}
            <FormControl mb={4}>
              <FormLabel>投稿タイトル</FormLabel>
              <Input
                type="text"
                placeholder="40文字以内で入力してください"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <FormHelperText fontSize={"xs"}>
                例：プロジェクトをシェアして共有できるサイト！ShareFolio
              </FormHelperText>
            </FormControl>

            {/* 説明 */}
            <FormControl mb={4}>
              <FormLabel>説明</FormLabel>
              <Textarea
                placeholder="簡単な説明を入力"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            </FormControl>

            {/* レベル */}
            <FormControl mb={4}>
              <FormLabel>レベル</FormLabel>
              <Select
                w={40}
                value={editedLevel}
                onChange={(e) => setEditedLevel(e.target.value)}
              >
                <option value="beginner">初心者</option>
                <option value="intermediate">中級者</option>
                <option value="advanced">上級者</option>
              </Select>
            </FormControl>

            {/* 言語設定 */}
            <FormControl mb={4}>
              <FormLabel>使用技術</FormLabel>
              <CheckboxGroup>
                {displayedLanguages.map((displayedLanguage) => (
                  <Checkbox m={2} key={displayedLanguage}>
                    {displayedLanguage}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </FormControl>

            {/* アプリURL */}
            <FormControl mb={4}>
              <FormLabel>アプリURL</FormLabel>
              <Input
                type="text"
                placeholder="URL: "
                value={editedAppUrl}
                onChange={(e) => setEditedAppUrl(e.target.value)}
              />
            </FormControl>

            {/* Github */}
            <FormControl mb={4}>
              <FormLabel>Github</FormLabel>
              <Input
                type="text"
                placeholder="Github: "
                value={editedGithub}
                onChange={(e) => setEditedGithub(e.target.value)}
              />
            </FormControl>

            {/* 更新ボタン */}
            <Stack>
              <Button
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleEditButtonClick}
              >
                編集する
              </Button>

              <NextLink href={`/posts/${detail}`} passHref>
                <Button
                  as="a"
                  size="lg"
                  bg={"gray.400"}
                  color={"white"}
                  _hover={{
                    bg: "gray.500",
                  }}
                >
                  戻る
                </Button>
              </NextLink>
            </Stack>
          </form>
        </Box>
      </Flex>
    </Layout>
  );
};

export default edit;
