import React from "react";
import { NextPage } from "next";
import Layout from "../../components/Layout";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  Input,
  Flex,
  Heading,
  Box,
  useColorModeValue,
  Stack,
  Textarea,
} from "@chakra-ui/react";

const create: NextPage = () => {
  return (
    <Layout title={"Create - sharefolio"}>
      <Flex flexDirection={"column"} align={"center"} w={"full"} p={8}>
        {/* ヘディング部分 */}
        <Heading fontSize={"4xl"} mb={8}>
          投稿作成
        </Heading>

        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
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
            <Stack spacing={10} pt={2} mb={4}>
              <Button
                type="submit"
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                投稿
              </Button>
            </Stack>
          </form>
        </Box>
      </Flex>
    </Layout>
  );
};

export default create;
