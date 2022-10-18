import React from "react";
import type { NextPage } from "next";
import Layout from "../../components/Layout";
import Post from "../../components/Post";

const index: NextPage = () => {
  return (
    <Layout title={"Posts - ShareFolio"}>
      <Post />
    </Layout>
  );
};
export default index;
