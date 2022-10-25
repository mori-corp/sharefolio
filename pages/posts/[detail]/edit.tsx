import React from "react";
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
  useColorModeValue,
  Stack,
  Textarea,
  Select,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";
const edit: NextPage = () => {
  const languages = [
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

  const router = useRouter();
  const { detail } = router.query;

  const handleEditButtonClick = () => {
    alert("Edit button clicked!");
  };

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
              <Input type="text" />
            </FormControl>

            {/* タイトル */}
            <FormControl mb={4}>
              <FormLabel>投稿タイトル</FormLabel>
              <Input type="text" placeholder="20文字以内で入力してください" />
              <FormHelperText fontSize={"xs"}>
                例：プロジェクトをシェアして共有できるサイト！ShareFolio
              </FormHelperText>
            </FormControl>

            {/* 説明 */}
            <FormControl mb={4}>
              <FormLabel>説明</FormLabel>
              <Textarea placeholder="簡単な説明を入力" />
            </FormControl>

            {/* レベル */}
            <FormControl mb={4}>
              <FormLabel>レベル</FormLabel>
              <Select placeholder="レベル" w={40}>
                <option value="beginner">初心者</option>
                <option value="intermediate">中級者</option>
                <option value="advanced">上級者</option>
              </Select>
            </FormControl>

            {/* 言語設定 */}
            <FormControl mb={4}>
              <FormLabel>使用技術</FormLabel>
              <CheckboxGroup>
                {languages.map((language) => (
                  <Checkbox m={2} key={language}>
                    {language}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </FormControl>

            {/* アプリURL */}
            <FormControl mb={4}>
              <FormLabel>アプリURL</FormLabel>
              <Input type="text" placeholder="URL: " />
            </FormControl>

            {/* Github */}
            <FormControl mb={4}>
              <FormLabel>Github</FormLabel>
              <Input type="text" placeholder="Github: " />
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
