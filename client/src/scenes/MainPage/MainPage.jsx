import React from 'react'
import { Navbar } from '../navbar/Navbar'
import './mainPage.css'
import MyDropzone from '../MyDropzone/MyDropzone'

const MainPage = () => {
  return (
    <div className='mainpage'>
    <div>
      <Navbar />
    </div>
    <div className='dropzone'>
      <MyDropzone />
    </div>
    </div>
  )
}

export default MainPage
