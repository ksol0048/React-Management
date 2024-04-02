import React, { useEffect, useState } from "react";
import ReactToPrint from "react-to-print";
import styled, { css, keyframes } from "styled-components";

function Dialog({
  title,
  children,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  visible,
  isError,
  errorMessage,
  width,
  currentRef,
  isPrint = false,
  isConfirmButtonExist = true,
}) {
  const [animate, setAnimate] = useState(false);
  const [localVisible, setLocalVisible] = useState(visible);
  // const [error, setError] = useState(false);

  useEffect(() => {
    // visible 값이 true -> false 가 되는 것을 감지
    if (localVisible && !visible) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 250);
    }
    setLocalVisible(visible);
  }, [localVisible, visible]);

  const onClick = (event) => {
    event.preventDefault();
    if (isError) {
      // setError(true);
    } else {
      // setError(false);
      onConfirm();
    }
  };

  if (!animate && !localVisible) return null;
  return (
    <DarkBackground $disappear={!visible}>
      <DialogBlock $disappear={!visible} width={width}>
        <DialogHeader>{title}</DialogHeader>
        <DialogBody>{children}</DialogBody>
        <DialogButtonPart>
          <DialogErrorMessage $isShow={isError}>
            {errorMessage}
          </DialogErrorMessage>
          <DialogButtons>
            {isConfirmButtonExist &&
              (isPrint === false ? (
                <Button color="pink" onClick={onClick}>
                  {confirmText}
                </Button>
              ) : (
                <ReactToPrint
                  trigger={() => <Button>프린트</Button>}
                  content={() => currentRef.current}
                  pageStyle="@page { size: 3.2in 3.7in }"
                />
              ))}
            <Button color="gray" onClick={onCancel}>
              {cancelText}
            </Button>
          </DialogButtons>
        </DialogButtonPart>
      </DialogBlock>
    </DarkBackground>
  );
}

Dialog.defaultProps = {
  confirmText: "확인",
  cancelText: "취소",
};

const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1
  }
  to {
    opacity: 0
  }
`;

const DarkBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);

  z-index: 1000;

  animation-duration: 0.15s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;

  ${(props) =>
    props.$disappear &&
    css`
      animation-name: ${fadeOut};
    `}
`;

const DialogBlock = styled.div`
  display: flex;
  flex-direction: column;

  width: ${({ width }) => {
    return width === undefined ? "831px" : width;
  }};

  border-radius: 5px;

  h3 {
    margin: 0;
    font-size: 1.5rem;
  }
  p {
    font-size: 1.125rem;
  }
`;

const DialogHeader = styled.div`
  display: flex;
  flex-direction: row;

  height: 60px;

  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  justify-content: center;
  align-items: center;
  align-content: center;

  color: white;
  font-size: 18px;
  font-weight: 500;

  background: #5c677d;
`;

const DialogBody = styled.div`
  display: flex;
  flex-direction: column;

  background: #f2f5f8;

  padding-left: 50px;
  padding-right: 50px;
`;

const DialogErrorMessage = styled.div`
  display: flex;

  /* 글자 */
  font-size: 12px;
  font-weight: 500;
  color: ${(props) => (props.$isShow ? "red" : "#f2f5f8")};
`;

const DialogButtonPart = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  padding-bottom: 20px;
  padding-left: 50px;
  padding-right: 50px;

  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  background: #f2f5f8;
  /* background: red; */
`;

const DialogButtons = styled.div`
  display: flex;
  flex-direction: row;

  padding-top: 16px;
`;

const Button = styled.button`
  /* 공통 스타일 */
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding-top: 15px;
  padding-bottom: 15px;
  width: 165px;

  background: #5c677d;

  /* 글자 */
  font-size: 16px;
  font-weight: bold;
  color: white;

  /* 기타 */
  & + & {
    margin-left: 16px;
  }
`;

export default Dialog;
