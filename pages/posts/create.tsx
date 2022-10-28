import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage, db } from "../../firebase";
import type { NextPage } from "next";
import { useRouter } from "next/router";
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
import { useUser } from "../../lib/auth";
import { validateImage } from "image-validator";

const create: NextPage = () => {
  // 投稿時の各属性の定義
  const [appName, setAppName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("beginner");
  const [language, setLanguage] = useState<string[]>([]);
  const [appUrl, setAppUrl] = useState("");
  const [github, setGithub] = useState("");
  const router = useRouter();
  const [file, setFile] = useState<File>(null!);

  // Recoilで状態管理しているuserのuidを投稿者のid(userId)として設定
  const user = useUser();
  const userId = user.uid;

  // チェックボックスの値の取得関数
  const handleCheckBoxChange = (e: any) => {
    const { checked, value } = e.target;
    if (checked) {
      // case1: 言語にチェックがされた時
      setLanguage([...language, value]);
    } else {
      // case2: 言語からチェックがはずされた時
      setLanguage(language.filter((e) => e !== value));
    }
  };

  // アップロードされたファイルのバリデーション関数
  const validateFile = async (file: File) => {
    // 3GBを最大のファイルサイズに設定
    const limitFileSize = 3 * 1024 * 1024;
    if (file.size > limitFileSize) {
      alert("ファイルサイズが大きすぎます。\n3メガバイト以下にしてください。");
      return false;
    }
    const isValidImage = await validateImage(file);
    if (!isValidImage) {
      alert("画像ファイル以外はアップロードできません。");
      return false;
    }
    return true;
  };

  // 画像選択関数
  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files![0];
    if (!(await validateFile(file))) {
      return;
    }
    reader.onloadend = async () => {
      setFile(file);
    };
    reader.readAsDataURL(file);
  };

  // 投稿の作成関数
  const submitPost = async (e: any) => {
    e.preventDefault();

    if (file) {
      // アプリイメージ画像の参照とURL生成
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");

      // Cloud storageへアップロード
      const storageRef = ref(storage, `images/${randomChar}_${file.name}`);
      await uploadBytes(storageRef, file)
        .then((snapshot) => {
          console.log("画像アップロードに成功しました");
        })
        .catch((error) => {
          console.log("画像アップロードに失敗しました");
        });

      // cloud storageのURLを取得
      await getDownloadURL(
        ref(storage, `images/${randomChar}_${file.name}`)
      ).then((url) => {
        // 追加する項目の定義
        const collectionRef = collection(db, "posts");
        const payload = {
          authorId: userId,
          appName: appName,
          title: title,
          description: description,
          image: url,
          level: level,
          language: language,
          appUrl: appUrl,
          github: github,
          postedDate: serverTimestamp(),
        };
        // データベースへの追加（document_idは、firebaseが自動生成）
        addDoc(collectionRef, payload);
      });
    } else {
      // 画像がアップロードされない場合
      const collectionRef = collection(db, "posts");
      const payload = {
        authorId: userId,
        appName: appName,
        title: title,
        description: description,
        image: "",
        level: level,
        language: language,
        appUrl: appUrl,
        github: github,
        postedDate: serverTimestamp(),
      };
      // データベースへの追加（document_idは、firebaseが自動生成）
      addDoc(collectionRef, payload);
    }

    // フォームのクリア
    setAppName("");
    setTitle("");
    setDescription("");
    setLevel("");
    setLanguage([]);
    setAppUrl("");
    setGithub("");
    setFile(null!);

    alert("投稿を作成しました");
    //投稿一覧へリダイレクト
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
    <Layout title={"Create - ShareFolio"}>
      <Flex
        flexDirection={"column"}
        align={"center"}
        w={"full"}
        p={{ base: 2, sm: 4, md: 8 }}
      >
        {/* ヘディング部分 */}
        <Heading fontSize={"4xl"} mb={8}>
          投稿作成
        </Heading>

        <Box
          rounded={"lg"}
          bg={"white"}
          boxShadow={"lg"}
          py={10}
          px={{ base: 4, md: 14 }}
          w={{ base: "100% ", md: "80%" }}
        >
          {/* フォーム */}
          <form onSubmit={submitPost}>
            {/* アプリ名 */}
            <FormControl mb={4} isRequired>
              <FormLabel
                htmlFor="appName"
                fontWeight={"bold"}
                color={"blue.500"}
              >
                アプリ / サービス名
              </FormLabel>
              <Input
                placeholder="20文字以内で入力してください"
                id="appName"
                type="text"
                value={appName}
                onChange={(e) => {
                  setAppName(e.target.value);
                }}
              />
            </FormControl>

            {/* タイトル */}
            <FormControl mb={4} isRequired>
              <FormLabel fontWeight={"bold"} color={"blue.500"}>
                投稿タイトル
              </FormLabel>
              <Input
                type="text"
                placeholder="40文字以内で入力してください"
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
              <FormLabel fontWeight={"bold"} color={"blue.500"}>
                説明
              </FormLabel>
              <Textarea
                placeholder="簡単な説明を入力。400文字以内"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                rows={10}
              />
            </FormControl>

            {/* スクショ画像アップロード */}
            <FormControl mb={4}>
              <FormLabel fontWeight={"bold"} color={"blue.500"}>
                アプリの画像
              </FormLabel>
              <input type="file" onChange={handleImageSelect} />
              <FormHelperText fontSize={"xs"}>
                例：トップページのスクリーンショット等
              </FormHelperText>
            </FormControl>

            {/* レベル */}
            <FormControl mb={4} isRequired>
              <FormLabel fontWeight={"bold"} color={"blue.500"}>
                レベル
              </FormLabel>
              <Select
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
              <FormLabel fontWeight={"bold"} color={"blue.500"}>
                使用技術
              </FormLabel>
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
              <FormLabel fontWeight={"bold"} color={"blue.500"}>
                アプリURL
              </FormLabel>
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
              <FormLabel fontWeight={"bold"} color={"blue.500"}>
                Github
              </FormLabel>
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
