import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer p-3'>
      <h4 className='text-center'>All Right Reserved &copy; Balvesh</h4>
      <p>
        <Link to="/about">About</Link> | <Link to="/contact">Contact</Link> | <Link to="/policy">Policy</Link>
      </p>
    </div>
  )
}

export default Footer
