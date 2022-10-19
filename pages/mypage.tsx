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
import NextLink from "next/link";

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
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            mr={4}
          >
            更新
          </Button>
          <NextLink href="/posts" passHref>
            <Button
              as="a"
              loadingText="Submitting"
              bg={"gray.400"}
              color={"white"}
              _hover={{
                bg: "gray.500",
              }}
            >
              TOPへ
            </Button>
          </NextLink>
        </Box>
      </Flex>
    </Layout>
  );
};

export default myPage;
