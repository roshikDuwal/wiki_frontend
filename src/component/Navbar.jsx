import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Button } from "@mui/material"

const Navbar = () => {

 

  return (
    <nav className=' flex justify-evenly w-full p-5 shadow-xl items-center'>
      <div>
        <h1>Logo</h1>
      </div>
      <ul className=' flex gap-5 justify-center items-center'>
        <li><Link to="/">Home</Link></li>

        <li><Link to="/addpost">AddPost</Link></li>


        <li><Link to="/post">Post</Link></li>
      </ul>


    </nav>
  )
}

export default Navbar