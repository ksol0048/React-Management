import React from 'react'
import './Loginform.css'
import { FaUser, FaLock } from "react-icons/fa";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userData, isLoggedIn } from '../../states/page_atoms';
import { RecoilState, useRecoilState } from 'recoil';

function Loginform() {
  const [, setUserData] = useRecoilState(userData);
  const [, setisLogin] = useRecoilState(isLoggedIn);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 여기에서 로그인 처리를 할 수 있습니다.
    axios.post('http://localhost:8081/login', { username, password })
      .then(res => {
        if (res.data) {
          setisLogin(true);
          setUserData(username);
          // navigate('/home');
          // window.location.href = '/home';
        } else {
          setUsername([]);
          setPassword([]);
          alert("잘못된 정보입니다.")
        }
        // 로그인이 성공하면 홈페이지로 이동
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    const wrapper = document.querySelector('.wrapper');
    const loginLink = document.querySelector('.login-link');
    const registerLink = document.querySelector('.register-link');

    registerLink.addEventListener('click', () => {
      wrapper.classList.add('active');
    })

    loginLink.addEventListener('click', () => {
      wrapper.classList.remove('active');
    })
  }, []);
  // onChanege={e=> setUsername(e.target.value)}
  // onChanege={e=> setPassword(e.target.value)} 으로 변경 가능
  return (
    <div className='wrapper'>
      <div className='form-box login'>
        <form action='' onSubmit={handleSubmit}>
          <h1 className='Text'>Login</h1>
          <div className="input-box">
            <input id='loginid' type='text' placeholder='UserName' value={username} onChange={handleUsernameChange} required />
            <FaUser className='icon' />
          </div>
          <div className="input-box">
            <input id='pw' type='password' placeholder='Password' value={password} onChange={handlePasswordChange} required />
            <FaLock className='icon' />
          </div>
          <div className='remember-forgot'>
            <label>
              <input type='checkbox' /> Remebeer me</label>
            <a href='/#'>비밀번호 찾기</a>
          </div>
          <button type='submit' >Login</button>
          <div className='login-register'>
            <p>Don't have an account?<a href='/#' className='register-link'>회원가입</a></p>
          </div>
        </form>
      </div>

      <div className='form-box register'>
        <form action='' onSubmit={handleSubmit}>
          <h1 className='Text'>Registation</h1>
          <div className="input-box">
            <input type='text' placeholder='UserName' required />
            <FaUser className='icon' />
          </div>
          <div className="input-box">
            <input type='text' placeholder='ID' required />
            <FaUser className='icon' />
          </div>
          <div className="input-box">
            <input type='password' placeholder='Password' value={password} onChange={handlePasswordChange} required />
            <FaLock className='icon' />
          </div>
          <div className='remember-forgot'>
            <label>
              <input type='checkbox' /> I agree to thr terms & conditions</label>
          </div>
          <button type='submit'>회원가입</button>
          <div className='login-register'>
            <p>Already have an accout?<a href='/#' className='login-link'>로그인</a></p>
          </div>
        </form>
      </div>
      {/* <script src='script.js'></script> */}
    </div>
  )
}

export default Loginform
