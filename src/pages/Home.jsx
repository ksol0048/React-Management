import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Loginform from './Loginform/Loginform';
import { styled } from '@material-ui/core';
import Layout from '../components/Layout';
import Homacontain from './Home_contain/Home_contain';
import About from './About/About';
import { currentPage, isLoggedIn } from './states/page_atoms';

function Home() {
  const page = useRecoilValue(currentPage);
  const isLogin = useRecoilValue(isLoggedIn);

  let layout;

  switch (page.sub_page) {
    case "홈":
      layout = <Homacontain />;
      break;

    case "about":
      layout = <About />;
      break;

    default:
      layout = <h1>없음</h1>;
      break;
  }

  return (
    <div>
      {isLogin ? (
        <Layout>
          <Background>{layout}</Background>
        </Layout>
      ) : (
        <Loginform />
      )}
    </div>
  );
}

const Background = styled('div')({
  width: '100%',
  height: '100%',
  padding: '26px',
  paddingtop: '40px',
});

export default Home
