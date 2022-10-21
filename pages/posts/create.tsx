import React, { useState } from "react";
import type { NextPage } from "next";
import { db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Layout from "../../components/Layout";
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

const create: NextPage = () => {
  // 投稿時の各属性の定義
  const [appName, setAppName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string[]>([]);
  const [appUrl, setAppUrl] = useState("");
  const [github, setGithub] = useState("");

  // 本来は、userIDを、Recoilで状態管理しているuserのuidに設定する。
  const userId = "shin-sampleId";

  // CheckBoxの管理
  const [checked, setChecked] = useState(false);

  const handleCheckBoxChange = (e: any) => {
    // チェックの有無を確認する
    setChecked(e.target.value);

    if (checked) {
      // もしチェックがされていれば、arrayに格納する
      setSelectedLanguage([...selectedLanguage, e.target.value]);
    }
    //もしチェックが外された場合は、arrayからfilterをして取り除く
    
  };

  // 投稿作成
  const handleSubmitPost = async (e: any) => {
    e.preventDefault();
    const collectionRef = collection(db, "posts");
    const payload = {
      userId: userId,
      appName: appName,
      title: title,
      description: description,
      level: level,
      language: selectedLanguage,
      appUrl: appUrl,
      github: github,
      date: serverTimestamp(),
    };

    console.log(payload);
    // 追加（document_idは、firebaseが自動生成）
    // await addDoc(collectionRef, payload);

    alert("投稿を作成しました");
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
    <Layout title={"Create - ShareFolio"}>
      <Flex flexDirection={"column"} align={"center"} w={"full"} p={8}>
        {/* ヘディング部分 */}
        <Heading fontSize={"4xl"} mb={8}>
          投稿作成
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
          <form onSubmit={handleSubmitPost}>
            {/* アプリ名 */}
            <FormControl mb={4} isRequired>
              <FormLabel>アプリ / サービス名</FormLabel>
              <Input
                type="text"
                value={appName}
                onChange={(e) => {
                  setAppName(e.target.value);
                }}
              />
            </FormControl>

            {/* タイトル */}
            <FormControl mb={4} isRequired>
              <FormLabel>投稿タイトル</FormLabel>
              <Input
                type="text"
                placeholder="20文字以内で入力してください"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <FormHelperText fontSize={"xs"}>
                例：プロジェクトをシェアして共有できるサイト！ShareFolio
              </FormHelperText>
            </FormControl>

            {/* 説明 */}
            <FormControl mb={4} isRequired>
              <FormLabel>説明</FormLabel>
              <Textarea
                placeholder="簡単な説明を入力"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </FormControl>

            {/* レベル */}
            <FormControl mb={4} isRequired>
              <FormLabel>レベル</FormLabel>
              <Select
                placeholder="レベル"
                w={40}
                value={level}
                onChange={(e) => {
                  setLevel(e.target.value);
                }}
              >
                <option value="beginner">初心者</option>
                <option value="intermediate">中級者</option>
                <option value="advanced">上級者</option>
              </Select>
            </FormControl>

            {/* 使用言語選択 */}
            <FormControl mb={4}>
              <FormLabel>使用技術</FormLabel>
              <CheckboxGroup>
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
            <FormControl mb={4} isRequired>
              <FormLabel>アプリURL</FormLabel>
              <Input
                type="text"
                placeholder="URL: "
                value={appUrl}
                onChange={(e) => {
                  setAppUrl(e.target.value);
                }}
              />
            </FormControl>

            {/* Github */}
            <FormControl mb={4}>
              <FormLabel>Github</FormLabel>
              <Input
                type="text"
                placeholder="Github: "
                value={github}
                onChange={(e) => {
                  setGithub(e.target.value);
                }}
              />
            </FormControl>
            <Stack spacing={10} pt={2} mb={4}>
              <Button
                type="submit"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                投稿する
              </Button>
            </Stack>
          </form>
        </Box>
      </Flex>
    </Layout>
  );
};

export default create;
