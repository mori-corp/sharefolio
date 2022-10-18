import React from "react";
import type { NextPage } from "next";
import Layout from "../components/Layout";
import { ImageUpload } from "../components/ImageUpload";
import {
  Flex,
  Heading,
  Box,
  FormControl,
  Input,
  FormLabel,
  Button,
} from "@chakra-ui/react";

const myPage: NextPage = () => {
  return (
    <Layout title={"Mypage - ShareFolio"}>
      <Flex flexDirection={"column"} align={"center"} w={"full"} p={8}>
        {/* ヘディング部分 */}
        <Heading fontSize={"4xl"} mb={8}>
          マイページ
        </Heading>

        <Box
          rounded={"lg"}
          bg={"white"}
          boxShadow={"lg"}
          py={10}
          px={{ lg: 14, md: 14, sm: 4 }}
          w={{ lg: "60%", md: "80%", sm: "100%" }}
        >
          <FormControl id="email" isRequired>
            <FormLabel>Username </FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="Usernameを入力"
              mb={4}
            />
          </FormControl>
          {/* 画像アップロード部分 */}
          <ImageUpload />
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
            更新
          </Button>
        </Box>
      </Flex>
    </Layout>
  );
};

export default myPage;
