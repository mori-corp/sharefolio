export type Post = {
  id: string;
  appName: string;
  title: string;
  description: string;
  level: string;
  language: Array<string>;
  appUrl: string;
  github: string;
  postedDate: any | null;
  userId: string;
};
