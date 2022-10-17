import React from "react";
import { NextPage } from "next";
import Layout from "../../components/Layout";
import Post from "../../components/Post";

const index: NextPage = () => {
  return (
    <Layout title={"Posts - sharefolio"}>
      <Post />
    </Layout>
  );
};
export default index;
