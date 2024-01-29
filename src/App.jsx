import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import AddPost from "./pages/AddPost"
import Post from "./pages/Post"
import Navbar from './component/Navbar'
import SinglePage from './pages/SinglePage'
import EditPage from './pages/EditPage'


const App = () => {
  return (
   <Router> 
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/addpost' element={<AddPost/>}/>
      <Route path='/post' element={<Post/>}/>
      <Route path='/post/:id' element={<SinglePage/>}/>
      <Route path="/edit/:id" element={<EditPage/>}/>
    </Routes>
   </Router>
  )
}

export default App