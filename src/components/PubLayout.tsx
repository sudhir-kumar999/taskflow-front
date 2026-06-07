import Box from '@mui/material/Box'
import React, { useContext } from 'react'
import Navbar from './Navbar.tsx'
import { Navigate, Outlet } from 'react-router-dom'
import { userContext } from '../userContext/userContext.tsx'
import PublicNav from './PublicNav.tsx'
import CircularProgress from '@mui/material/CircularProgress'

const PubLayout = () => {
const {user,loading}=useContext(userContext)!
if(loading){
    return <Box sx={{ display: 'flex' ,justifyContent:"center",alignItems:"center",height:"100vh"}}>
      <CircularProgress aria-label="Loading…" />
    </Box>
}
if(user){
    return <Navigate to="/todos" replace/>
}
  return (
    <Box sx={{ display: "flex" ,minHeight:"100vh"}}>
      <Navbar />
      <Box
        sx={{
        //   flexGrow: 1,
        //   ml: { md: "-300px" },
          width: { md: `calc(100%-300px)` },
          display:"flex",
          justifyContent:"center",
        }}
      >
      </Box>
        <Outlet />

    </Box>
  )
}

export default PubLayout
