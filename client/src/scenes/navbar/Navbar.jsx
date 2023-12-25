import React from 'react'
import "./navbar.css"
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div className='outer-div'>
    <Link to="/" style={{ textDecoration: 'none' }}>
        <div className="sitename">Card Detector<br/></div>
    </Link>
    <div className="content-outer">
      <div className='contents'>
        <Link to="/results" style={{ textDecoration: 'none',color: '#0F0F0F',fontFamily: 'Segoe UI', fontStyle: 'bold', fontSize: 'x-large' }}>
          <div className="results">Results<br/></div>
        </Link>
      </div>
    </div>    
    </div>
  )
}