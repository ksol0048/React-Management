import { atom } from "recoil";

export const isLoggedIn = atom({
  key: 'isLoggedIn',
  default: false,
});

export const userData = atom({
  key: "userData",
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
      name: "입출고관리",
    },
    /// 생산관리
    {
      name: "생산관리",
    },
    /// 출고관리
    

    {
      name: "품질검사",
    },
  ],
});