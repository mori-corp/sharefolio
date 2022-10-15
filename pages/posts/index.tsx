import React from "react";
import { NextPage } from "next";
import Layout from "../../components/Layout";
import styles from "./index.module.scss";
import { Logo } from "../../components/Logo";
import Post from "../../components/Post";
const index: NextPage = () => {
  return (
    <Layout title={"Posts - sharefolio"}>
      <Post></Post>
    </Layout>
  );
};
export default index;
