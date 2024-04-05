import React from 'react'
import './Header.css'
import { currentPage, currentTab, userName, isLoggedIn } from '../../pages/states/page_atoms'
import { useRecoilState, useRecoilValue } from 'recoil'


function Header() {
  const [, setisLogin] =useRecoilState(isLoggedIn);
  const [username,] = useRecoilState(userName);
  const [currTab, setCurrentTab] = useRecoilState(currentTab);
  const [page, setPage] = useRecoilState(currentPage);

  const goToAbout = () => {
    setCurrentTab("");
    setPage({
      name: "about",
      sub_page: "about",
    });
  };
  const goToHome = () => {
    setCurrentTab("");
    setPage({
      name: "홈",
      sub_page: "홈",
    });
  };
  
  const goToUserInfo = () => {
    setCurrentTab("");
    setPage({
      name: "User_info",
      sub_page: "user_info",
    });
  };

  const logout = () => {
    setisLogin(false);
    goToHome();
  };

  return (
    <header>
      <h2 className='logo' onClick={goToHome}>MES</h2>
      <nav className='navigation'>
        <span onClick={goToAbout}>about </span>
        <span>services </span>
        <span>contact </span>
        <b onClick={goToUserInfo}>{username}</b>
        <button className='btnLogin-popup' onClick={logout}>Logout</button>
      </nav>
    </header>
  )
}


export default Header
