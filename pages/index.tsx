import type { NextPage } from "next";
import { useEffect } from "react";
import { AuthPage } from "../components/AuthPage";
import Layout from "../components/Layout";
import { useAuth } from "../lib/auth";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const user = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user.uid) {
      router.push("/posts");
    } else {
      return;
    }
  }, []);
  return (
    <Layout title={"ShareFolio｜ポートフォリオの共有サイト"}>
      <AuthPage />
    </Layout>
  );
};

export default Home;
