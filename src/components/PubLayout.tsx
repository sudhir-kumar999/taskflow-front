import Box from '@mui/material/Box'
import React, { useContext } from 'react'
import Navbar from './Navbar.tsx'
import { Navigate, Outlet } from 'react-router-dom'
import { userContext } from '../userContext/userContext.tsx'

const PubLayout = () => {
const {user,loading}=useContext(userContext)!
if(loading){
    return <Box>Loading...</Box>
}
if(user){
    return <Navigate to="/todos" replace/>
}
  return <Outlet/>
}

export default PubLayout
