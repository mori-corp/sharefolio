import React from "react";
import type { NextPage } from "next";
import Layout from "../../components/Layout";
import Post from "../../components/Post";
import { Heading } from "@chakra-ui/react";

const index: NextPage = () => {
  return (
    <Layout title={"Posts - ShareFolio"}>
      <Heading as="h1" textAlign={"center"} mt={16}>
        投稿一覧
      </Heading>
      <Post />
      <Post />
      <Post />
      <Post />
    </Layout>
  );
};
export default index;
