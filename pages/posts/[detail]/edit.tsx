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
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { DeleteButton } from "../../../components/DeleteButton";

const edit: NextPage = () => {
  const {
    id,
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

  //投稿の編集
  const handleEditButtonClick = async (id: string) => {
    // firestoreのドキュメントの参照
    const docRef = doc(db, "posts", id);

    // 編集内容を定義
    const payload = {
      appName: editedAppName,
      title: editedTitle,
      description: editedDescription,
      level: editedLevel,
      language: editedLanguage,
      appUrl: editedAppUrl,
      github: editedGithub,
    };

    //変更のあった箇所のみ、ドキュメントをアップデート
    await updateDoc(docRef, payload);

    router.push("/posts");
    alert("投稿が編集されました！");
  };

  // チェックボックスの値の取得関数
  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    if (checked) {
      // case1: 言語にチェックがされた時
      setEditedLanguage([...editedLanguage, value]);
    } else {
      // case2: 言語からチェックがはずされた時
      setEditedLanguage(editedLanguage.filter((e) => e !== value));
    }
  };

  //投稿の削除
  const handleDeleteButtonClick = async (id: string) => {
    // firestoreのドキュメントを、Recoilでセットしている投稿idで参照
    const docRef = doc(db, "posts", id); //第３引数は、document id
    await deleteDoc(docRef);

    alert("投稿が削除されました！");

    router.push("/posts");
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
              <CheckboxGroup defaultValue={language}>
                {displayedLanguages.map((displayedLanguage) => (
                  <Checkbox
                    m={2}
                    key={displayedLanguage}
                    onChange={handleCheckBoxChange}
                    value={displayedLanguage}
                  >
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

            <Stack>
              {/* 更新ボタン */}
              <Button
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={() => handleEditButtonClick(id)}
              >
                編集する
              </Button>

              {/* 削除ボタン */}
              <Button
                size="lg"
                bg={"red.500"}
                color={"white"}
                _hover={{
                  bg: "red.400",
                }}
                onClick={() => handleDeleteButtonClick(id)}
              >
                削除
              </Button>
              <DeleteButton title={"投稿を削除"} />

              {/* 戻るボタン */}
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
