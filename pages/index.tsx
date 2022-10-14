import type { NextPage } from "next";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <Layout title={"Signup - sharefolio"}>
      <p>ここに、新規ユーザー登録フォームを設置</p>
      <p>React form hooksを使用し、バリデーション設定</p>
      <p>ユーザー名、Email、パスワード</p>
    </Layout>
  );
};

export default Home;
