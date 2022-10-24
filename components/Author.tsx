import React from "react";
import { Image, Text, HStack, Icon } from "@chakra-ui/react";
import { AiOutlineHeart } from "react-icons/ai";

// 投稿者のデータ型定義
type AuthorProps = {
  date: Date | null;
  name: string;
};

export const Author: React.FC<AuthorProps> = (props) => {
  return (
    <HStack spacing="2" display="flex" alignItems="center">
      {/* プロフィール画像 */}
      <Image
        borderRadius="full"
        boxSize="36px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${props.name}`}
      />

      {/* ユーザーネーム */}
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>

      {/* 投稿日時 */}
      <Text>{props.date?.toLocaleDateString()}</Text>
    </HStack>
  );
};
