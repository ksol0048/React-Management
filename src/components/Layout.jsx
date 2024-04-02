import { styled } from '@material-ui/core';
import React from 'react'
import Homacontain from '../pages/Home_contain/Home_contain';
import Header from './Header/Header';
import '../App.css'

function Layout(props) {
  return (
    <div>
      <main>
        <div className='Wrapper'>
          <Header />
          <div className='Row'>
            {props.children}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Layout
