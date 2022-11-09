// 投稿作成ページ

import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage, db } from "../firebase";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
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
  Text,
} from "@chakra-ui/react";
import { useUser } from "@/lib/auth";
import { validateImage } from "image-validator";
import { useForm, SubmitHandler } from "react-hook-form";
import { PostType } from "@/types/post";

const Create: NextPage = () => {
  const [language, setLanguage] = useState<string[]>([]);
  const [file, setFile] = useState<File>(null!);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Recoilで状態管理しているuserのuidを投稿者のid(userId)として設定
  const user = useUser();
  const userId = user.uid;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostType>();

  // チェックボックスの値の取得関数
  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  const handleSubmitPost: SubmitHandler<PostType> = async (data) => {
    setIsSubmitting(true);
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
        .then(() => {
          console.log("画像アップロードに成功しました");
        })
        .catch((error) => {
          console.log("画像アップロードに失敗しました", error);
        });

      // cloud storageのURLを取得
      await getDownloadURL(
        ref(storage, `images/${randomChar}_${file.name}`)
      ).then((url) => {
        // 追加する項目の定義
        const collectionRef = collection(db, "posts");
        const payload = {
          authorId: userId,
          appName: data.appName,
          title: data.title,
          description: data.description,
          image: url,
          level: data.level,
          language: language,
          appUrl: data.appUrl,
          github: data.github,
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
        appName: data.appName,
        title: data.title,
        description: data.description,
        image: "",
        level: data.level,
        language: language,
        appUrl: data.appUrl,
        github: data.github,
        postedDate: serverTimestamp(),
      };
      // データベースへの追加（document_idは、firebaseが自動生成）
      addDoc(collectionRef, payload);
    }

    //投稿一覧へリダイレクト
    router.push("/");
    setIsSubmitting(false);
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
    <Layout title={"投稿作成｜ShareFolio"}>
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
          <form onSubmit={handleSubmit(handleSubmitPost)}>
            {/* アプリ名 */}
            <FormControl mb={4} isInvalid={errors.appName ? true : false}>
              <FormLabel
                htmlFor="appName"
                fontWeight={"bold"}
                color={"blue.500"}
              >
                アプリ / サイト名（必須）
              </FormLabel>
              <Input
                id="appName"
                type="text"
                {...register("appName", {
                  required: "入力が必須の項目です",
                  maxLength: {
                    value: 30,
                    message: "30文字以内で入力してください",
                  },
                })}
                autoComplete="off"
              />
              <FormErrorMessage>
                {errors.appName && errors.appName.message}
              </FormErrorMessage>
            </FormControl>

            {/* タイトル */}
            <FormControl mb={4} isInvalid={errors.title ? true : false}>
              <FormLabel htmlFor="title" fontWeight={"bold"} color={"blue.500"}>
                投稿タイトル（必須）
              </FormLabel>
              <Input
                id="title"
                type="text"
                {...register("title", {
                  required: "入力が必須の項目です",
                  maxLength: {
                    value: 60,
                    message: "60文字以内で入力してください",
                  },
                })}
                autoComplete="off"
              />
              <FormHelperText fontSize={"xs"}>
                例：プロジェクトをシェアして共有できるサイト！ShareFolio
              </FormHelperText>
              <FormErrorMessage>
                {errors.title && errors.title.message}
              </FormErrorMessage>
            </FormControl>

            {/* 説明 */}
            <FormControl mb={4} isInvalid={errors.description ? true : false}>
              <FormLabel
                htmlFor="description"
                fontWeight={"bold"}
                color={"blue.500"}
              >
                説明（必須）
              </FormLabel>
              <Textarea
                id="description"
                placeholder="アプリやサイトの簡単な説明を記載してください。"
                {...register("description", {
                  required: "入力が必須の項目です",
                  maxLength: {
                    value: 1000,
                    message: "文字数をオーバーしています（1000文字まで）",
                  },
                })}
                rows={10}
                autoComplete="off"
              />
              <FormErrorMessage>
                {errors.description && errors.description.message}
              </FormErrorMessage>
            </FormControl>

            {/* スクショ画像アップロード */}
            <FormControl mb={4}>
              <FormLabel htmlFor="image" fontWeight={"bold"} color={"blue.500"}>
                アプリ / サイトの画像
              </FormLabel>
              <input id="image" type="file" onChange={handleImageSelect} />
              <FormHelperText fontSize={"xs"}>
                例：トップページのスクリーンショット等
              </FormHelperText>
            </FormControl>

            {/* レベル */}
            <FormControl mb={4}>
              <FormLabel htmlFor="level" fontWeight={"bold"} color={"blue.500"}>
                レベル
              </FormLabel>
              <Select w={40} id="level" {...register("level", {})}>
                <option value="beginner">初心者</option>
                <option value="intermediate">中級者</option>
                <option value="advanced">上級者</option>
              </Select>
            </FormControl>

            {/* 使用言語選択 */}
            <FormControl mb={4}>
              <FormLabel
                htmlFor="language"
                fontWeight={"bold"}
                color={"blue.500"}
              >
                使用技術
              </FormLabel>
              <CheckboxGroup>
                {displayedLanguages.map((displayedLanguage) => (
                  <Checkbox
                    id="language"
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
            <FormControl mb={4} isInvalid={errors.appUrl ? true : false}>
              <FormLabel
                htmlFor="appUrl"
                fontWeight={"bold"}
                color={"blue.500"}
              >
                アプリ / サイトURL（必須）
              </FormLabel>
              <Input
                id="appUrl"
                type="text"
                placeholder="URL: "
                {...register("appUrl", {
                  required: "入力が必須の項目です",
                  pattern: {
                    value:
                      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
                    message: "アドレスの形式が正しくありません",
                  },
                })}
                autoComplete="off"
              />
              <FormErrorMessage>
                {errors.appUrl && errors.appUrl.message}
              </FormErrorMessage>
            </FormControl>

            {/* Github */}
            <FormControl mb={4} isInvalid={errors.github ? true : false}>
              <FormLabel
                htmlFor="github"
                fontWeight={"bold"}
                color={"blue.500"}
              >
                GitHub
              </FormLabel>
              <Input
                id="github"
                type="text"
                placeholder="GitHub: "
                {...register("github", {
                  pattern: {
                    value:
                      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
                    message: "アドレスの形式が正しくありません",
                  },
                })}
                autoComplete="off"
              />
              <FormErrorMessage>
                {errors.github && errors.github.message}
              </FormErrorMessage>
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
                isLoading={isSubmitting ? true : false}
              >
                投稿する
              </Button>
            </Stack>
          </form>
          {isSubmitting && (
            <Text color={"red.500"} fontWeight={"bold"}>
              投稿を作成しています...
            </Text>
          )}
        </Box>
      </Flex>
    </Layout>
  );
};

export default Create;
