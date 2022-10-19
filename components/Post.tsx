import React from "react";
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Tag,
  SpaceProps,
  useColorModeValue,
  Container,
  Wrap,
  Icon,
  HStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { AiOutlineHeart } from "react-icons/ai";
import { Author } from "./Author";

type IBlogTags = {
  tags: Array<string>;
  marginTop?: SpaceProps["marginTop"];
};

const BlogTags: React.FC<IBlogTags> = (props) => {
  return (
    <Wrap spacing={1} marginTop={props.marginTop}>
      {props.tags.map((tag) => {
        return (
          <Tag size={"sm"} variant="solid" colorScheme="pink" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </Wrap>
  );
};

// 投稿一覧
export default function ArticleList() {
  return (
    <Container maxW={"5xl"} p="12">
      {/* 各投稿のBox */}
      <Box
        marginTop={{ base: "1", sm: "5" }}
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="space-between"
      >
        {/* サムネ画像部分（左半分）のBox */}
        <Box
          display="flex"
          flex="1"
          marginRight="3"
          position="relative"
          alignItems="center"
        >
          {/* サムネ画像のBox */}
          <Box width={{ sm: "100%" }} zIndex="2" marginTop="5%" marginRight={4}>
            {/* サムネ画像部分 */}
            <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
              <Image
                borderRadius="lg"
                src={
                  "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
                }
                alt="some good alt text"
                objectFit="contain"
              />
            </Link>
          </Box>
        </Box>

        {/* 文章（コンテンツ）部分（右半分）のBox */}
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: "3", sm: "3" }}
        >
          {/* ポートフォリオタイトル */}
          <Heading marginTop="1" fontSize={"2xl"}>
            <NextLink href="/posts/detail">
              <Text
                as="a"
                textDecoration="none"
                _hover={{ textDecoration: "none", cursor: "pointer" }}
              >
                シェアして楽しむポートフォリオ - ShareFolio
              </Text>
            </NextLink>
          </Heading>

          {/* 説明部分 */}
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue("gray.700", "gray.200")}
            fontSize="md"
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Text>

          {/* 言語タグ一覧 */}
          <BlogTags
            tags={["HTML", "CSS", "Javascript", "React", "Next.js", "Python"]}
            marginTop={2}
          />

          {/* 投稿者 */}
          <HStack mt={4}>
            <Author name="John Doe" date={new Date("2021-04-06T19:01:27Z")} />
            {/* ハートアイコン */}
            <Icon as={AiOutlineHeart} w={5} h={5} />
            <Text>100</Text>
          </HStack>
        </Box>
      </Box>
    </Container>
  );
}
