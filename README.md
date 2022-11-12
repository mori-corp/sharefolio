# アプリケーション名

### ShareFolio（シェアフォリオ）

![アプリ画像](https://github.com/mori-corp/sharefolio/blob/images/ShareFolio.png)

<br>

# アプリケーション概要

ポートフォリオやオリジナルアプリのアイディアが欲しいエンジニア、プログラミング初学者、就職活動中の人などへ向け、たくさんのオリジナルアプリを一箇所でまとめて閲覧・投稿できるプラットフォームです。

<br>

# アプリ URL

https://sharefolio2022.web.app/

<br>

# アプリを作成した背景

ポートフォリオアプリのアイディアを探していた際に、何を作れば良いのかわからず、やみくもに Google で検索をかけていました。その時に、自分と近いレベルの人であったり、同じ言語を使用している人が作ったプロジェクトを、一箇所でまとめて閲覧できるサイトがあったらいいな、と思い制作に至りました。誰かのアプリからインスピレーションを受けたり、逆に自分が投稿したアプリが、他のエンジニアの刺激になる、気軽にフィードバックしあえるような場所になってゆくことを目指しています。

<br>

# テスト用アカウント

- メールアドレス　： test@test.com
- パスワード　　　： test2022

<br>

# 利用方法

1. 投稿閲覧（ログインせずに閲覧できます）
2. 新規ユーザー登録

   - メールアドレスで登録
   - Google で登録

3. ログイン
4. 投稿の作成
5. 投稿の編集/削除
6. 投稿へのコメント

<br>

# 機能一覧

| 機能                     | ログインユーザー | 非ログインユーザー |
| ------------------------ | ---------------- | ------------------ |
| ユーザー登録             | ×                | ◯                  |
| ユーザープロフィール編集 | ◯                | ×                  |
| 投稿閲覧                 | ◯                | ◯                  |
| 投稿作成                 | ◯                | ×                  |
| 投稿編集・削除           | ◯                | ×                  |
| 投稿へのコメント          | ◯                | ×                  |


<br>

# 実装予定の機能

- ソート、検索機能

<br>

# 開発環境

- フロントエンド
  - React(v18.2.0)
  - Next.js(v12.3.1)
  - Typescript
  - Recoil
  - Chakra UI
- バックエンド
  - Firebase (v9.12.1)
- その他
  - Firebase hosting

<br>

# 工夫した点

### 1. 投稿とユーザーの紐付け

投稿を作成した時には、投稿者が誰かわかるように、名前とアイコンを表示しています。Firebase database において、投稿用とユーザー用に二つのデータテーブルを用意して紐づけることで、後からユーザーがプロフィールを変更しても、全ての投稿に情報（ユーザー名とアイコン）の変更が反映されるよう実装しました。また、この紐付けにより、ログインしているユーザーは、自分が作成した投稿のみ「編集/削除」といった操作が可能となるように、実装しています。

<br>

### 2. ユーザーへのフィードバック

ユーザーが投稿の作成や編集、認証操作を行う際に、バックエンドでの処理に時間がかかることがあり、ブラウザ側で処理中を示す UI を実装して、ユーザーが迷うことがないように、常にフィードバックを返すように工夫をしました。「投稿の削除」など、確認が必要な操作については、アラートを表示させ、ユーザーが誤って操作することがないようにしています。

<br>
