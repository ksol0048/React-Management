import React, { useEffect } from "react";
import { MdOutlineLabelImportant } from "react-icons/md";
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import styled from "styled-components";
import { isDialogOpen, isEditDialog } from "../pages/states/page_atoms";
import HeaderButton from "./HeaderButton";

function DetailHeader({
  title,
  children,
  isEditAvailable,
  isDeleteAvailable,
  onDelete,
  buttonExist = true,
  addButtonExist = true,
  editButtonExist = true,
  deleteButtonExist = true,
  customButtons = [],
  isDark = false,
  user, // Make sure user data is passed as a prop
}) {
  const setDialog = useSetRecoilState(isDialogOpen);
  const setIsEdit = useSetRecoilState(isEditDialog);

  /* const userAuth =
    user.auth === undefined
      ? { add: true, edit: true, query: true, delete: true, excel: true }
      : user.auth[page.sub_page];

  if (addButtonExist) {
    addButtonExist = userAuth.add;
    if (!addButtonExist) {
      customButtons = [];
    }
  }
  if (editButtonExist) {
    editButtonExist = userAuth.edit;
  }
  if (deleteButtonExist) {
    deleteButtonExist = userAuth.delete;
  }
 */
  const onClick = (key) => {
    if (key === "등록") {
      setIsEdit(false);
      setDialog(true);
    } else {
      setIsEdit(true);
      setDialog(true);
    }
  };

  return (
    <DetailHeaderWrapper>
      <Title>
        <MdOutlineLabelImportant size={24} />
        <span>{title}</span>
      </Title>
      {buttonExist && (
        <div>
          {
            <HeaderButton
              id="add"
              onClick={() => onClick("등록")}
              text={"등록"}
            />
          }
          {
            <HeaderButton
              id="edit"
              isActive={isEditAvailable}
              disabled={!isEditAvailable}
              onClick={() => isEditAvailable && onClick("수정")}
              text={"수정"}
            />
          }
          {
            <HeaderButton
              id="delete"
              isActive={isDeleteAvailable}
              disabled={!isDeleteAvailable}
              onClick={onDelete}
              text={"삭제"}
            />
          }
          {customButtons.map((e) => e)}
        </div>
      )}
      {children}
    </DetailHeaderWrapper>
  );
}

const DetailHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-width: calc(1200px - 300px);
  margin-bottom: 10px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 700;
  font-size: 24px;
  line-height: 35px;
  color: white;
  span {
    padding-top: 4px;
    padding-left: 8px;
  }
`;

export default DetailHeader;
