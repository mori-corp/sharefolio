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
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../../../firebase";
import { validateImage } from "image-validator";

const edit: NextPage = () => {
  const {
    id,
    title,
    appName,
    description,
    image,
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
  const [editedFile, setEditedFile] = useState<File>(null!);

  const router = useRouter();
  const { detail } = router.query;

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
    const reader = new FileReader();
    const file = e.target.files![0];
    if (!(await validateFile(file))) {
      return;
    }
    reader.onloadend = async () => {
      setEditedFile(file);
    };
    reader.readAsDataURL(file);
  };

  //投稿の編集
  const handleEditButtonClick = async (id: string) => {
    // もし、インプットフィールドに新しい画像がアップされている場合
    if (editedFile) {
      // アプリイメージ画像の参照とURL生成
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");

      // Cloud storageへアップロード
      const storageRef = ref(
        storage,
        `images/${randomChar}_${editedFile.name}`
      );
      await uploadBytes(storageRef, editedFile)
        .then((snapshot) => {
          console.log("画像アップロードに成功しました");
        })
        .catch((error) => {
          console.log("画像アップロードに失敗しました。error: ", error);
        });

      // cloud storageのURLを取得
      await getDownloadURL(
        ref(storage, `images/${randomChar}_${editedFile.name}`)
      ).then((url) => {
        const docRef = doc(db, "posts", id);
        const payload = {
          appName: editedAppName,
          title: editedTitle,
          description: editedDescription,
          image: url,
          level: editedLevel,
          language: editedLanguage,
          appUrl: editedAppUrl,
          github: editedGithub,
        };

        updateDoc(docRef, payload);
        
        // もし元画像がある場合は、ファイルをstorageから削除
        if (image) {
          const imageRef = ref(storage, image);
          deleteObject(imageRef)
            .then(() => {
              console.log("画像ファイルが、storageから削除されました。");
            })
            .catch((error) => {
              console.log("画像ファイルの削除に失敗しました。error: ", error);
            });
        }
      });
    } else {
      //画像がアップロードされていない場合
      const docRef = doc(db, "posts", id);
      const payload = {
        appName: editedAppName,
        title: editedTitle,
        description: editedDescription,
        level: editedLevel,
        language: editedLanguage,
        appUrl: editedAppUrl,
        github: editedGithub,
        // imageは変更なし
      };
      updateDoc(docRef, payload);
    }

    // フォームのクリア
    setEditedAppName("");
    setEditedTitle("");
    setEditedDescription("");
    setEditedLevel("");
    setEditedLanguage([]);
    setEditedAppUrl("");
    setEditedGithub("");
    setEditedFile(null!);

    alert("投稿が編集されました！");
    //投稿一覧へリダイレクト
    router.push("/posts");
  };

  //投稿の削除
  const handleDeleteButtonClick = async (id: string) => {
    // firestoreのドキュメントを、Recoilでセットしている投稿idで参照
    const docRef = doc(db, "posts", id); //第３引数は、document id
    await deleteDoc(docRef);

    // 画像ファイルを削除
    const imageRef = ref(storage, image);
    deleteObject(imageRef)
      .then(() => {
        console.log("画像ファイルが、storageから削除されました。");
      })
      .catch((error) => {
        console.log("画像ファイルの削除に失敗しました。error: ", error);
      });

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
      <Flex
        flexDirection={"column"}
        align={"center"}
        w={"full"}
        p={{ base: 2, sm: 4, md: 8 }}
      >
        {/* ヘディング部分 */}
        <Heading fontSize={"4xl"} mb={8}>
          投稿編集ページ
        </Heading>

        <Box
          rounded={"lg"}
          bg={"white"}
          boxShadow={"lg"}
          py={10}
          px={{ base: 4, md: 14 }}
          w={{ base: "100%", md: "80%" }}
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
                rows={10}
              />
            </FormControl>

            {/* スクショ画像アップロード */}
            <input type="file" onChange={handleImageSelect} />

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
