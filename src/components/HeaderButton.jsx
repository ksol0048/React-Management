import React from "react";
import styled from "styled-components";

function HeaderButton({ id, isActive, disabled, onClick, text }) {
  return (
    <Button id={id} isActive={isActive} disabled={disabled} onClick={onClick}>
      {text}
    </Button>
  );
}

const Button = styled.button`
  width: 90px;
  height: 40px;
  border-radius: 5px;
  margin-right: 8px;

  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
  color: black;

  border: 0px;

  cursor: ${({ id, isActive }) => {
    if (
      id === "edit" ||
      id === "return" ||
      id === "save" ||
      id === "register"
    ) {
      return isActive ? "pointer" : "cursor";
    } else if (id === "delete") {
      return isActive ? "pointer" : "cursor";
    } else {
      return "pointer";
    }
  }};

  background-color: ${({ id, isActive }) => {
    if (
      id === "edit" ||
      id === "return" ||
      id === "save" ||
      id === "register"
    ) {
      return isActive ? "#D8D8D8" : "#5c677d";
    } else if (id === "delete") {
      return isActive ? "#D8D8D8" : "#5c677d";
    } else {
      return "#D8D8D8";
    }
  }};
`;

export default HeaderButton;
