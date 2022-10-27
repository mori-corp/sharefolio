export type PostType = {
  id: string;
  appName: string | undefined;
  title: string | undefined;
  description: string | undefined;
  image: string | undefined;
  level: string | undefined;
  language: Array<string> | undefined;
  appUrl: string | undefined;
  github: string | undefined;
  postedDate: any | null;
  authorId: string | undefined;
};
