import React from 'react'
import './Loginform.css'
import { FaUser, FaLock } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
import { useState, useEffect } from 'react';
import { userName, isLoggedIn, isDialogOpen } from '../states/page_atoms';
import { RecoilState, useRecoilState, useSetRecoilState } from 'recoil';
import { fetchFormattedData, insertData } from '../../functions/sql_service';
import LoginformDialog from './components/Loginform_Dialog';
import styled from 'styled-components';
import bcrypt from 'bcryptjs';

function Loginform() {
  const [dialog, setDialog] = useRecoilState(isDialogOpen);
  // const [isDialogOpen, setIsDialogOpen] = useState(false);
  const toggleDialog = () => {
    setDialog(true);
  };
  const [, setUserName] = useRecoilState(userName);
  const [, setisLogin] = useRecoilState(isLoggedIn);
  const [userAllID, setUserAllID] = useState('');
  const [userIDError, setUserIDError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordcheckError, setPasswordcheckError] = useState("");
  const [userbirthdateError, setuserbirthdateError] = useState("");
  const [inputs, setInputs] = useState({
    username: "",
    userID: "",
    password: "",
    userpwcheck: "",
    userbirthdate: "",
  });

  const Error = (e) => {
    const tempInputs = { ...inputs };
    tempInputs[e.target.name] = e.target.value;

    if (userAllID.includes(tempInputs.userID)) {
      setUserIDError("이미 존재하는 ID입니다.");
    } else if (tempInputs.userID === "" || tempInputs.userID === undefined) {
      setUserIDError("");
    } else {
      setUserIDError("");
    } //사용자 아이디 value

    if (!validatePassword(tempInputs.password)) {
      setPasswordError("영문, 특수문자, 숫자 포함 8자 이상을 입력하세요");
    } else {
      setPasswordError("");
    } //사용자 비밀번호 value

    if (!validatePassword(tempInputs.userpwcheck)) {
      setPasswordcheckError("영문, 특수문자, 숫자 포함 8자 이상을 입력하세요");
    } else if (tempInputs.password !== tempInputs.userpwcheck) {
      setPasswordcheckError("패스워드가 일치하지 않습니다.");
    } else {
      setPasswordcheckError("");
    } //비밀번호 체크 value

    if (tempInputs.userbirthdate === "") {
      setuserbirthdateError("생년월일을 선택하세요");
    } else {
      setuserbirthdateError("");
    } //사용자 생년월일 value
  }; //onValueChange에 의한 에러 코드

  const useeffectError = () => {
    setUserIDError("");
    if (!validatePassword(inputs.password)) {
      setPasswordError("영문, 특수문자, 숫자 포함 8자 이상을 입력하세요");
    } else {
      setPasswordError("");
    } //사용자 비밀번호 value

    if (!validatePassword(inputs.userpwcheck)) {
      setPasswordcheckError("영문, 특수문자, 숫자 포함 8자 이상을 입력하세요");
    } else if (inputs.password !== inputs.userpwcheck) {
      setPasswordcheckError("패스워드가 일치하지 않습니다.");
    } else {
      setPasswordcheckError("");
    } //비밀번호 체크 value

    if (inputs.userbirthdate === "" || inputs.userbirthdate === undefined) {
      setuserbirthdateError("생년월일을 선택하세요");
    } else {
      setuserbirthdateError("");
    } //사용자 생년월일 value
  }; //useEffect에 의한 에러 코드

  const validatePassword = (password) => {
    // 비밀번호 유효성을 검사하는 로직을 추가하세요.
    // 예를 들어, 영문, 특수문자, 숫자 포함 8자 이상인지 확인할 수 있습니다.
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{9,20}$/;
    return passwordRegex.test(password);
  }; // 비밀번호 영문,특수문자, 숫자 설정

  const onValueChange = (e) => {
    const tempInputs = { ...inputs };
    tempInputs[e.target.name] = e.target.value;
    setInputs(tempInputs);

    Error(e);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetchFormattedData({
      from: "FROM login",
      where: `WHERE loginid = '${inputs.userID}'`
    }).then(res => {
      var userData = res[0];
      bcrypt.compare(inputs.password, userData.pw, (err, response) => {
        if (err) throw err;
        if (userData === undefined || userData === null) {
          setInputs({
            userID: "",
            password: "",
          });
          alert("잘못된 정보입니다");
        } else if (userData.login_error_count > 5) {
          setInputs({
            userID: "",
            password: "",
          });
          alert("비밀번호 오류 횟수가 5회를 초과하였습니다.\n" + "비밀번호 찾기를 통해 변경해주세요."
          );
        } else if (response === false) {
          var errorcount = userData.login_error_count + 1;

          var body = `UPDATE login SET login_error_count = '${errorcount}' WHERE loginid = '${inputs.userID}'`;

          insertData({ body }).then(res => {
            setInputs(prevInputs => ({
              ...prevInputs,
              password: "",
            }));
            alert("비밀번호가 잘못되었습니다\n" + "비밀번호 오류가 " + `${errorcount}` + "회 입니다.\n" + "비밀번호 재입력 혹은 비밀번호 찾기하세요."
            );
          })

        } else {
          var body = `UPDATE login SET login_error_count = '0' WHERE loginid = '${inputs.userID}'`;

          insertData({ body })
          setisLogin(true);
          setUserName(userData.username);
        }
      })
    });
  }; // 로그인 버튼 이벤트

  const handleregisterSubmit = (event) => {
    event.preventDefault();

    const madedate = new Date(Date.now() + 9 * 3600 * 1000)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const regDttm = new Date(Date.now())
      .toISOString()
      .slice(0, 10)
      .replace("T", " ");

    const finalResult = { ...inputs };

    const usingData = finalResult;

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(usingData["password"], salt, (err, hash) => {
        if (err) throw err;
        const registerData = {
          username: '"' + usingData["username"] + '"',
          birth_date:
            '"' +
            new Date(inputs["userbirthdate"])
              .toISOString()
              .slice(0, 19)
              .replace("T", " ") +
            '"',
          loginid: '"' + usingData["userID"] + '"',
          pw: '"' + hash + '"', // Store hashed password
          // userpwcheck: '"' + usingData["userpwcheck"] + '"',
          login_error_count: '"' + "0" + '"',
          made_date: '"' + madedate + '"',
          modification_date: '"' + regDttm + '"',
        };

        let keys = Object.keys(registerData);
        let keyString = keys.join();
        let values = Object.values(registerData);
        let valueString = values.join();

        if (userIDError === "" && passwordError === "" && passwordcheckError === "" && userbirthdateError === "") {
          var body = `INSERT INTO login (${keyString}) VALUES (${valueString})`;
          console.log(body)
          insertData({ body }).then(res => {
            setInputs([]);
            alert("회원가입이 완료되었습니다.");
            const wrapper = document.querySelector('.wrapper');
            wrapper.classList.remove('active');
          })
        } else {
          alert("입력이 잘못되었습니다.");
        }
      });
    });
  };  // 회원가입 버튼 이벤트

  const onInit = () => {
    fetchFormattedData({
      from: "FROM login",
    }).then(res => {
      var id = res.map((data) => data.loginid)
      setUserAllID(id);
    })

    const wrapper = document.querySelector('.wrapper');
    const loginLink = document.querySelector('.login-link');
    const registerLink = document.querySelector('.register-link');

    registerLink.addEventListener('click', () => {
      wrapper.classList.add('active');
      setInputs([]);
      useeffectError();
    })

    loginLink.addEventListener('click', () => {
      wrapper.classList.remove('active');
      setInputs([]);
    })
  };

  useEffect(() => {
    onInit();
  }, []);


  // onChanege={e=> setUsername(e.target.value)}
  // onChanege={e=> setPassword(e.target.value)} 으로 변경 가능
  return (
    <Wrapper>
      <div className='wrapper'>
        <div className='form-box login'>
          <form action='' onSubmit={handleSubmit}>
            <h1 className='Text'>Login</h1>
            <div className="input-box">
              <input name='userID' type='text' placeholder='ID' value={inputs.userID || ""} onChange={onValueChange} required />
              <FaUser className='icon' />
            </div>
            <div className="input-box">
              <input name='password' type='password' placeholder='Password' value={inputs.password || ""} onChange={onValueChange} required />
              <FaLock className='icon' />
            </div>
            <div className='remember-forgot'>
              <label>
                <input type='checkbox' /> Remember me</label>
              <a onClick={toggleDialog}>비밀번호 찾기</a>
            </div>
            <button type='submit' >Login</button>
            <div className='login-register'>
              <p>Don't have an account?<a href='/#' className='register-link'>회원가입</a></p>
            </div>
          </form>
        </div>

        <div className='form-box register'>
          <form action='' onSubmit={handleregisterSubmit}>
            <h1 className='Text'>Registation</h1>
            <div className="input-box">
              <input name='username' type='text' placeholder='UserName' value={inputs.username || ""} onChange={onValueChange} required />
              <FaUser className='icon' />
            </div>
            <div className="input-box">
              <input name="userID" type='text' placeholder='ID' value={inputs.userID || ""} onChange={onValueChange} required />
              <FaUser className='icon' />
              {userIDError && <p className="error">{userIDError}</p>}
            </div>
            <div className="input-box">
              <input name='password' type='password' placeholder='Password' value={inputs.password || ""} onChange={onValueChange} required maxLength={20} />
              <FaLock className='icon' />
              {passwordError && <p className="error">{passwordError}</p>}
            </div>
            <div className="input-box">
              <input name='userpwcheck' type='password' placeholder='Password 확인' value={inputs.userpwcheck || ""} onChange={onValueChange} required maxLength={20} />
              <FaLock className='icon' />
              {passwordcheckError && <p className="error">{passwordcheckError}</p>}
            </div>
            <div className="input-box">
              <input name='userbirthdate' type='date' value={inputs.userbirthdate || ""}
                onChange={onValueChange} required />
              <BsCalendarDate className='icon' />
              {userbirthdateError && <p className="error">{userbirthdateError}</p>}
            </div>
            <div className='remember-forgot'>
              <label>
                <input type='checkbox' /> I agree to the terms & conditions</label>
            </div>
            <button type='submit'>회원가입</button>
            <div className='login-register'>
              <p>Already have an accout?<a href='/#' className='login-link'>로그인</a></p>
            </div>
          </form>
        </div>
      </div>
      <LoginformDialog />
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

export default Loginform
