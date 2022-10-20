import React from "react";
import type { NextPage } from "next";
import Layout from "../../components/Layout";
import { Posts } from "../../components/Posts";
import { Heading } from "@chakra-ui/react";

const index: NextPage = () => {
  return (
    <Layout title={"Posts - ShareFolio"}>
      <Heading as="h1" textAlign={"center"} mt={16}>
        投稿一覧
      </Heading>
      <Posts />
      <Posts />
      <Posts />
    </Layout>
  );
};
export default index;
