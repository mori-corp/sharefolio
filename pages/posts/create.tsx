import React from "react";
import { NextPage } from "next";
import Layout from "../../components/Layout";
import { Text, Button, HStack } from "@chakra-ui/react";

const create: NextPage = () => {
  const posts = [
    {
      id: 1,
      title: "title1",
    },
    {
      id: 2,
      title: "title2",
    },
    {
      id: 3,
      title: "title3",
    },
  ];
  return (
    <Layout title={"Create - sharefolio"}>
      <h1>Create page</h1>
    </Layout>
  );
};

export default create;
