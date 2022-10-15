import React from "react";
import { NextPage } from "next";
import Layout from "../components/Layout";

const myPage: NextPage = () => {
  return (
    <Layout title={"Mypage - sharefolio"}>
      <h1>This is my page.</h1>
    </Layout>
  );
};

export default myPage;
