import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaUser, FaLock } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { isDialogOpen, isEditDialog } from "../../states/page_atoms";
import Dialog from "../../../components/Dialog";
import { fetchFormattedData, insertData } from "../../../functions/sql_service";
import bcrypt from 'bcryptjs';

/**
 * 공정관리 - 설비관리 다이얼로그
 * @param {function} callback1 - onConfirm(): query 된 상태 그대로 새로고침
 * @param {function} callback2 - onInit(): query 없는 상태로 새로고침
 * @param {Object} activeRowData - 선택 된 데이터 리스트
 */
function LoginformDialog({ callback, callback2, activeRowData }) {
  const [dialog, setDialog] = useRecoilState(isDialogOpen);
  const [isError, setIsError] = useState(true);
  const [data, setdata] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordcheckError, setPasswordcheckError] = useState("");
  const [inputs, setInputs] = useState({
    username: "",
    loginid: "",
    pw: "",
    pwcheck: "",
    birth_date: "",
  });

  const validatePassword = (password) => {
    // 비밀번호 유효성을 검사하는 로직을 추가하세요.
    // 예를 들어, 영문, 특수문자, 숫자 포함 8자 이상인지 확인할 수 있습니다.
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{9,20}$/;
    return passwordRegex.test(password);
  }; // 비밀번호 영문,특수문자, 숫자 설정

  const useeffectError = (e) => {
    const tempInputs = { ...inputs };
    tempInputs[e.target.name] = e.target.value;

    if (!validatePassword(tempInputs.pw) && tempInputs.pw !== '') {
      setPasswordError("영문, 특수문자, 숫자 포함 8자 이상을 입력하세요");
      setIsError(true);
    } else if (tempInputs.pw === '') {
      setPasswordError('');
      setIsError(true);
    } else {
      setPasswordError("");
    } //사용자 비밀번호 value
  }; //pw에 의한 에러 코드

  const useeffectError1 = (e) => {
    const tempInputs = { ...inputs };
    tempInputs[e.target.name] = e.target.value;
    if (!validatePassword(tempInputs.pwcheck) && tempInputs.pwcheck !== '') {
      setPasswordcheckError("영문, 특수문자, 숫자 포함 8자 이상을 입력하세요");
      setIsError(true);
    } else if (tempInputs.pw !== tempInputs.pwcheck) {
      setPasswordcheckError("패스워드가 일치하지 않습니다.");
      setIsError(true);
    } else if (tempInputs.pwcheck === '') {
      setPasswordcheckError('');
      setIsError(true);
    } else {
      setPasswordcheckError('');
    } //비밀번호 체크 value
  }; //pwcheck에 의한 에러 코드

  const resetData = () => {
    setIsError(true);
    setInputs({
      username: "",
      loginid: "",
      pw: "",
      pwcheck: "",
      birth_date: "",
    });
  }; //리셋 데이터

  useEffect(() => {
    fetchFormattedData({
      from: "FROM login",
    }).then((res) => {
      const tempData = { ...res };
      setdata(tempData);
    })
  }, []);

  const onConfirm = () => {
    const regDttm = new Date(Date.now() + 9 * 3600 * 1000)
      .toISOString()
      .slice(0, 10)
      .replace("T", " ");

    const finalResult = { ...inputs };

    const usingData = finalResult;

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(usingData["pw"], salt, (err, hash) => {
        if (err) throw err;
        const changepwData = {
          pw: '"' + hash + '"', // Store hashed password
          login_error_count: '"' + "0" + '"',
          modification_date: '"' + regDttm + '"',
        };

        //for insert
        let keys = Object.keys(changepwData);
        let values = Object.values(changepwData);
        let keyString = keys.join();
        let valueString = values.join();

        var updateValues = [];

        for (var i = 0; i < keys.length; i++) {
          var a = keys[i] + "=" + values[i];
          updateValues.push(a);
        }
        let updateValuesString = updateValues.join();
        fetchFormattedData({
          from: "FROM login",
          where: `WHERE loginid = '${usingData.loginid}'`
        }).then(res => {
          var userData = res[0];
          bcrypt.compare(usingData.pw, userData.pw, (err, response) => {
            if (err) throw err;
            
            if (passwordError === "" && passwordcheckError === "" && response === false) {
              var body = `UPDATE login SET ${updateValuesString} WHERE loginid = '${inputs.loginid}'`

              insertData({ body }).then((res) => {
                alert("비밀번호가 변경되었습니다.");
                setDialog(false);
                resetData();
              })
            } else if (response === true) {
              alert("이전 비밀번호와 일치합니다.\n" + "새로운 비밀번호를 입력해주세요");
              setInputs(prevInputs => ({
                ...prevInputs,
                pw: "",
                pwcheck: "",
              }));
            } else {
              alert("입력이 잘못되었습니다.");
              setInputs(prevInputs => ({
                ...prevInputs,
              }));
            }
          })
        });
      });
    });
  }; //확인버튼 클릭 이벤트

  const onCancel = () => {
    setPasswordError("");
    setPasswordcheckError(" ")
    setDialog(false);
    resetData();
  }; //취소버튼 클릭 이벤트

  const onValueChange = (e) => {
    const tempInputs = { ...inputs };
    tempInputs[e.target.name] = e.target.value;
    setInputs(tempInputs);

    const requisiteList = [
      "username",
      'loginid',
      'pw',
      'pwcheck',
      'birth_date',
    ];

    let validationCheckList = [];

    Object.keys(tempInputs).forEach((key) => {
      if (requisiteList.includes(key)) {
        const value = tempInputs[key];
        const isChecked = value.length !== 0;
        validationCheckList.push(isChecked);
      }
    });

    if (validationCheckList.includes(false)) {
      setIsError(true);
    } else {
      setIsError(false);
    }

    if (e.target.name === 'pw') {
      useeffectError(e);
    } else if (e.target.name === 'pwcheck') {
      useeffectError1(e);
    } else if (areFieldsMatchingData !== true) {
      setPasswordError("");
      setPasswordcheckError("");
      setInputs(prevInputs => ({
        ...prevInputs,
        pw: "",
        pwcheck: "",
      }));
    }

  }; // 값 변경 시 이벤트

  const areFieldsMatchingData = () => {
    const usernames = Object.values(data).map(item => item.username);
    const loginids = Object.values(data).map(item => item.loginid);
    const birth_dates = Object.values(data).map(item => item.birth_date);
    return (
      usernames.includes(inputs.username) &&
      loginids.includes(inputs.loginid) &&
      birth_dates.includes(inputs.birth_date)
    );
  }; //username, loginid, birth_date 일치 시 pw,pwcheck 렌더링

  return (
    <Dialog
      width={"500px"}
      title={`Forgot Password`}
      confirmText="확인"
      cancelText="취소"
      onConfirm={onConfirm}
      onCancel={onCancel}
      visible={dialog}
      isError={isError}
      errorMessage="*표시는 필수입력항목입니다. "
    >
      <PriceManagementBody>
        <ItemColumn>
          <Item key="username">
            <ItemTitle> <FaUser /> UserName *</ItemTitle>
            <InputItem
              name='username' type='text' placeholder='UserName' value={inputs.username || ""} onChange={onValueChange} required
            />
          </Item>
          <Item key="loginid">
            <ItemTitle><FaUser />  ID *</ItemTitle>
            <InputItem
              name="loginid" type='text' placeholder='ID' value={inputs.loginid || ""} onChange={onValueChange} required
            />
          </Item>
          <Item key="birth_date">
            <ItemTitle><BsCalendarDate /> 생년월일 *</ItemTitle>
            <InputItem
              name='birth_date' type='date' value={inputs.birth_date || ""}
              onChange={onValueChange} required
            />
          </Item>
          <Item key="pw" style={{ display: areFieldsMatchingData() ? 'flex' : 'none' }}>
            <ItemTitle><FaLock /> PassWord *</ItemTitle>
            <InputItem name='pw' type='password' placeholder='Password' value={inputs.pw || ""} onChange={onValueChange} required maxLength="20" />
          </Item>
          {passwordError && <Error>{passwordError}</Error>}
          <Item key="pwcheck" style={{ display: areFieldsMatchingData() ? 'flex' : 'none' }}>
            <ItemTitle><FaLock /> PassWord 확인 *</ItemTitle>
            <InputItem name='pwcheck' type='password' placeholder='Password 확인' value={inputs.pwcheck || ""} onChange={onValueChange} required maxLength="20" />
          </Item>
          {passwordcheckError && <Error>{passwordcheckError}</Error>}
        </ItemColumn>
      </PriceManagementBody>
    </Dialog>
  );
}

const Item = styled.div`
  display: flex;
  flex-direction: row;

  gap: 40px;

  justify-content: start;
  align-items: center;

  font-size: 12px;
  font-weight: 500;
`;

const ItemTitle = styled.div`
  width: ${({ width }) => width ?? "120px"};
`;

/* const SmallInputItem = styled.input`
  width: 100px;
  height: 34px;
  font-size: 12px;

  resize: none;

  align-items: start;
  justify-content: start;

  padding: 8px 10px;

  background: white;
  color: black;

  border: 1px solid #a3b1be;

  ::placeholder {
    color: #dddddd;
  }
`; */

const InputItem = styled.input`
  width: 243px;
  height: ${(props) => props.height};
  font-size: 12px;

  resize: none;

  align-items: start;
  justify-content: start;

  padding: 8px 10px;

  background: white;
  color: black;

  border: 1px solid #a3b1be;

  ::placeholder {
    color: #dddddd;
  }

  &[type='date'] {
    position: relative;

    /* 숨겨진 텍스트와 버튼을 표시하지 않음 */
    &::-webkit-inner-spin-button,
    &::-webkit-clear-button {
      display: none;
    }

    /* 커스텀한 캘린더 아이콘을 클릭할 수 있도록 함 */
    &::-webkit-calendar-picker-indicator {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: transparent;
      color: transparent;
      cursor: pointer;
    }
  }
`;

const Error = styled.div`
  color: red;
  font-size: 10px; /* equivalent to about 6 */
  text-align: center;
  font-weight: bold;
`;


const ItemColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

/* const Row = styled.div`
  display: flex;
  width: 100%;
  margin: 10px 0px;
`; */

/* const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 10px;
`; */

const PriceManagementBody = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: space-around;

  padding-top: 30px;
  padding-bottom: 30px;
`;

export default LoginformDialog;
