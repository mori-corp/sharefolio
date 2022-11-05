import type { NextPage } from "next";
import { useEffect } from "react";
import { AuthPage } from "../components/AuthPage";
import Layout from "../components/Layout";
import { useAuth } from "../lib/auth";
import { useRouter } from "next/router";

const Signup: NextPage = () => {
  const user = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user.uid) {
      router.push("/");
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

export default Signup;
