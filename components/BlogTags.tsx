import React from "react";
import { Tag, SpaceProps, Wrap } from "@chakra-ui/react";

type IBlogTags = {
  tags: Array<string>;
  marginTop?: SpaceProps["marginTop"];
};

export const BlogTags: React.FC<IBlogTags> = (props) => {
  return (
    <Wrap spacing={1} marginTop={2}>
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
