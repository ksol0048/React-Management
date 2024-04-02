import { atom } from "recoil";


/**
 * 테이블에서 선택된 Row 데이터
 */
export const aboutSelectedRow = atom({
 key: "aboutSelectedRow",
 default: {
   index: -1,
   imgList: [],
 },
});

/**
* 테이블에서 체크박스 선택된 Row 데이터
*/
export const aboutCheckedRowList = atom({
 key: "aboutCheckedRowList",
 default: {},
});