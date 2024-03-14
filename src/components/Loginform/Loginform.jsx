import React from 'react'
import './Loginform.css'
import { FaUser, FaLock } from "react-icons/fa";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Loginform({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
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
          onLogin(true);
          console.log("good")
          navigate('/home');
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
  // onChanege={e=> setUsername(e.target.value)}
  // onChanege={e=> setPassword(e.target.value)} 으로 변경 가능
  return (
    <div className='wrapper'>
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
          <a href='/#'>Forgot Password</a>
        </div>
        <button type='submit'>Login</button>
        <div className='register-link'>
          <p>Don't have an account?<a href='/#'>Register</a></p>
        </div>
      </form>
    </div>
  )
}

export default Loginform