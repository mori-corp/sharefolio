type NavItemType = {
  label: string;
  children?: Array<NavItemType>;
  href?: string;
};

export const NAV_ITEMS: Array<NavItemType> = [
  {
    label: "投稿する",
    href: "/posts/create",
  },
  {
    label: "マイページ",
    href: "/mypage",
  },
];
