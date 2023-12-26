import React from 'react'
import { Navbar } from '../navbar/Navbar'
import './mainPage.css'
import MyDropzone from '../MyDropzone/MyDropzone'
import { Typography } from '@mui/material'

const MainPage = () => {
  return (
    <div className='mainpage'>
    <div>
      <Navbar />
    </div>
    <div className='dropzone'>
      <MyDropzone />
    </div>
    <div className='aboutSite'>
      <div className='Title'>
      <Typography variant="h3" sx={{ fontWeight: 'bold', fontFamily: 'Sevillana' }}>
        About
      </Typography>
      </div>
      <div className='contentMain'>
        <Typography variant="body1" sx={{ fontSize: '25px', fontFamily: 'Bitter' }}>
          This is a Thai National ID Card Reader website where you can upload images of your card through the dropzone provided.After succesfully uploading the images u can see them in results.You can also delete them from the results page.Altough remember that the website provides a soft delete functionality and hence once deleted the data wont be shown but will be with us in our database.
        </Typography>
      </div>
    </div>
    </div>
  )
}

export default MainPage
