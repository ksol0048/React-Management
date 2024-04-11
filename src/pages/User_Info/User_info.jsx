import React, { useState } from 'react'
import styled from 'styled-components'
import { FaUser, FaLock } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
import { userName, userid, userbirthday } from '../states/page_atoms';
import { useRecoilState } from 'recoil';
import bcrypt from 'bcryptjs';
import { fetchFormattedData, insertData } from '../../functions/sql_service';

function UserInfo() {
  const [username,] = useRecoilState(userName);
  const [ID,] = useRecoilState(userid);
  const [birthday,] = useRecoilState(userbirthday);
  const [checkpassword, setcheckpassword] = useState('');
  const [passwordError, setPasswordError] = useState("");
  const [passwordcheckError, setPasswordcheckError] = useState("");
  const [inputs, setInputs] = useState({
    userbirthdate: birthday,
    password: "",
    pwcheck: "",
  });

  const resetData = () => {
    setInputs({
      userbirthdate: birthday,
      password: "",
      pwcheck: "",
    });
  }; //리셋 데이터

  const handleSubmit = (event) => {
    event.preventDefault();

    fetchFormattedData({
      from: "FROM login",
      where: `WHERE loginid = '${ID}'`
    }).then(res => {
      var userData = res[0];

      bcrypt.compare(checkpassword, userData.pw, (err, response) => {
        if (err) throw err;
        if (response === true) {
          const wrapper = document.querySelector(ItemBox);
          wrapper.classList.add('active');
          setInputs(prevInputs => ({
            ...prevInputs,
            password: "",
            pwcheck: "",
          }));
          setPasswordError('');
          setPasswordcheckError('');
        } else {
          alert('비밀번호가 일치하지않습니다.\n' + '다시 입력해주세요');
          setcheckpassword('');
        }
      })
    });
  }; // itempwcheck 버튼 클릭 이벤트

  const handlepreSubmit = (e) => {
    e.preventDefault();

    const wrapper = document.querySelector(ItemBox);
    wrapper.classList.remove('active');
  } // 이전 버튼 클릭 이벤트

  const handleChangeSubmit = (e) => {
    e.preventDefault();

    const regDttm = new Date(Date.now() + 9 * 3600 * 1000)
      .toISOString()
      .slice(0, 10)
      .replace("T", " ");

    const finalResult = { ...inputs };

    const usingData = finalResult;

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(usingData["password"], salt, (err, hash) => {
        if (err) throw err;
        const changepwData = {
          birth_date: '"' + usingData["userbirthdate"] + '"',
          pw: '"' + hash + '"', // Store hashed password
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
          where: `WHERE loginid = '${ID}'`
        }).then(res => {
          var userData = res[0];

          bcrypt.compare(inputs.password, userData.pw, (err, response) => {
            if (err) throw err;
            if (passwordError === "" && passwordcheckError === "" && response === false) {
              var body = `UPDATE login SET ${updateValuesString} WHERE loginid = '${ID}'`

              insertData({ body }).then((res) => {
                alert("비밀번호가 변경되었습니다.");
                resetData();
              })
            } else if (passwordError !== "" || passwordcheckError !== "") {
              alert('비밀번호 입력이 잘못되었습니다.\n' + '다시 입력해주세요');
              resetData();
              setPasswordError('');
              setPasswordcheckError('');
            } else if (response === true) {
              alert('이전 비밀번호와 일치합니다.\n' + '새로운 비밀번호로 다시 입력해주세요');
              resetData();
            }
          })
        });
      });
    });

  } // 변경 버튼 클릭 이벤트

  const validatePassword = (password) => {
    // 비밀번호 유효성을 검사하는 로직을 추가하세요.
    // 예를 들어, 영문, 특수문자, 숫자 포함 8자 이상인지 확인할 수 있습니다.
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{9,20}$/;
    return passwordRegex.test(password);
  }; // 비밀번호 영문,특수문자, 숫자 설정

  const pwError = (e) => {
    const tempInputs = { ...inputs };
    tempInputs[e.target.name] = e.target.value;

    if (!validatePassword(tempInputs.password) && tempInputs.password !== '') {
      setPasswordError("영문, 특수문자, 숫자 포함 8자 이상을 입력하세요");
    } else if (tempInputs.password === '') {
      setPasswordError('');
    } else {
      setPasswordError("");
    } //사용자 비밀번호 value
  }; //pw에 의한 에러 코드

  const pwcheckError = (e) => {
    const tempInputs = { ...inputs };
    tempInputs[e.target.name] = e.target.value;
    if (!validatePassword(tempInputs.pwcheck) && tempInputs.pwcheck !== '') {
      setPasswordcheckError("영문, 특수문자, 숫자 포함 8자 이상을 입력하세요");
    } else if (tempInputs.password !== tempInputs.pwcheck) {
      setPasswordcheckError("패스워드가 일치하지 않습니다.");
    } else if (tempInputs.pwcheck === '') {
      setPasswordcheckError('');
    } else {
      setPasswordcheckError('');
    } //비밀번호 체크 value
  }; //pwcheck에 의한 에러 코드

  const onValueChange = (e) => {
    const tempInputs = { ...inputs };
    tempInputs[e.target.name] = e.target.value;
    setInputs(tempInputs);

    if (e.target.name === 'password') {
      pwError(e);
    } else if (e.target.name === 'pwcheck') {
      pwcheckError(e);
    }
  };

  return (
    <Wrapper>
      <ItemBox>
        <form className='itempwcheck' action='' onSubmit={handleSubmit}>
          <Text>회원 정보</Text>
          <ItemColumn>
            <ItemTitle><FaLock />&nbsp; PassWord 확인</ItemTitle>
            <InputItem name='userpwcheck' type='password' placeholder='Password 확인' value={checkpassword || ''} onChange={e => setcheckpassword(e.target.value)} required maxLength={20} />
          </ItemColumn>
          <button className='button' type='submit'>확인</button>
        </form>

        <form className='itemchange' action='' onSubmit={handleChangeSubmit}>
          <Text>회원 정보</Text>
          <ItemColumn>
            <ItemTitle><FaUser /> &nbsp; UserName</ItemTitle>
            <InputItem name='username' type='text' placeholder={username} readOnly={true} required />
          </ItemColumn>
          <ItemColumn>
            <ItemTitle><FaUser />&nbsp; ID </ItemTitle>
            <InputItem name="userID" type='text' placeholder={ID} readOnly={true} required />
          </ItemColumn>
          <ItemColumn>
            <ItemTitle><BsCalendarDate />&nbsp; 생년월일</ItemTitle>
            <InputItem name='userbirthdate' type='date' value={inputs.userbirthdate || ""} onChange={onValueChange} required />
          </ItemColumn>
          <ItemColumn>
            <ItemTitle><FaLock />&nbsp; PassWord</ItemTitle>
            <InputItem name='password' type='password' placeholder='Password' value={inputs.password || ""} onChange={onValueChange} required maxLength={20} />
          </ItemColumn>
          {passwordError && <Error>{passwordError}</Error>}
          <ItemColumn>
            <ItemTitle><FaLock />&nbsp; PassWord 확인</ItemTitle>
            <InputItem name='pwcheck' type='password' placeholder='Password 확인' value={inputs.pwcheck || ""} onChange={onValueChange} required maxLength={20} />
          </ItemColumn>
          {passwordcheckError && <Error>{passwordcheckError}</Error>}
          <ButtonWrapper>
            <button className='button' type='button' onClick={handlepreSubmit}>이전</button>
            <button className='button' type='submit'>변경</button>
          </ButtonWrapper>
        </form>
      </ItemBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: calc(90vh - 56px);
  
`;

const ItemBox = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 300px;
  background: white;
  border: 2px solid rgba(255, 255, 255, .5);
  backdrop-filter: blur(30px);
  box-shadow: 0 0 10px rgba(0, 0, 0, .5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #efff;
  border-radius: 10px;
  overflow: hidden;
  transition: height .2s ease;

  .itempwcheck{
    transition: transform .18s ease;
    transform: translateX(0px);
    
    .button{
      margin-top: 20px;
    width: 100%;
    height: 50px;
    background: #333;
    border: none;
    outline: none;
    border-radius: 40px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    cursor: pointer;
    font-size: 16px;
    color: #fff;
    font-weight: 700;
  }
  }
  .itemchange{
    position: absolute;
    transition: none;
    transform: translateX(500px);

    .button{
    width: 50%;
    height: 50px;
    background: #333;
    border: none;
    outline: none;
    border-radius: 40px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    cursor: pointer;
    font-size: 16px;
    color: #fff;
    font-weight: 700;
  }
  }

  &.active {
    height: 600px;
    .itempwcheck{
      transition: none;
      transform: translateX(-500px);
    }
    .itemchange{
      transition: transform .18s ease;
      transform: translateX(0);
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 30px;
`;

/* const ItemLogin = styled.div`
   .ItemBox {
    transition: transform .18s ease;
    transform: translateX(500px);
  }

  & .itembox.active {
    transition: none;
    transform: translateX(-500px);
  }
`; */

/* const ItemChange = styled.div`
   position: absolute;
  transition: none;
  transform: translateX(500px);
  

  &.active {
    transition: transform .18s ease;
    transform: translateX(0);
  }
`; */

const ItemColumn = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  column-gap: 20px;
  width: 100%;
  height: 50px;
  margin-top: 20px;
`;

/* const InputBox = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  margin: 30px 0;
`;
 */
const ItemTitle = styled.div`
  width: 120px;
  font-size: 13px;
  color: black;
  display: flex; /* 수직 정렬을 위해 flex 사용 */
  align-items: center; /* 수직 방향으로 중앙 정렬 */

  svg {
    margin-right: 3px; /* 아이콘과 텍스트 사이의 간격 조정 */
  }
`;


const InputItem = styled.input`
  width: 300px;
  height: 100%;
  background: transparent;
  border: 2px solid rgba(10, 9, 9, 0.2);
  outline: none;
  border-radius: 40px;
  font-size: 16px;
  color: black;
  padding: 20px 45px 20px 20px;

  &::placeholder {
    color: black;
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
  font-size: 10px;
  text-align: center;
  font-weight: bold;
  margin-top: 5px;
`;

const RememberForgot = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14.5px;
  margin: 0px 0 15px;

  label {
    color: black; /* 글자 색을 검은색으로 설정 */
    input {
      accent-color: black; /* accent-color는 브라우저 지원이 불안정할 수 있습니다. */
      margin-right: 4px;
    }
  }
`;

const Text = styled.div`
  text-align: center;
  font-size: 30px;
  color: black;
`;

const Button = styled.div`
  display: flex; /* Flexbox 사용 */
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  width: 100%;
  height: 50px;
  background: #333;
  border: none;
  outline: none;
  border-radius: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .1);
  cursor: pointer;
  font-size: 16px;
  color: #fff;
  font-weight: 700;
`;




export default UserInfo
