import { atom } from "recoil";

export const isLoggedIn = atom({
  key: 'isLoggedIn',
  default: false,
});

export const isDialogOpen = atom({
  key: "isDialogOpen",
  default: false,
});

export const isEditDialog = atom({
  key: "isEditDialog",
  default: false,
});

export const userName = atom({
  key: "userName",
  default: {},
});

export const currentPage = atom({
  key: "currentPage",
  default: {
    name: "홈",
    sub_page: "홈",
  },
});
export const currentTab = atom({
  key: "currentTab",
  default: "",
});

export const navi = atom({
  key: "navi",
  default: [
    {
      name: "about",
    },
    /// 입출고관리
    {
      name: "user_info",
    },
    /// 생산관리
    {
      name: "생산관리",
    },
    /// 출고관리
    

    {
      name: "user_info",
    },
  ],
});