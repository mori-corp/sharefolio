import type { NextPage } from "next";
import { AuthPage } from "../components/AuthPage";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <Layout title={"ShareFolio｜ポートフォリオの共有サイト"}>
      <AuthPage />
    </Layout>
  );
};

export default Home;
