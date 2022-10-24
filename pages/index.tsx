import type { NextPage } from "next";
import { AuthPage } from "../components/AuthPage";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <Layout title={"ShareFolio"}>
      <AuthPage />
    </Layout>
  );
};

export default Home;
