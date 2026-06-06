import React, { useContext } from "react";
import Navbar from "./Navbar.tsx";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "./Footer.tsx";
import Box from "@mui/material/Box";
import { userContext } from "../userContext/userContext.tsx";

const MainLayout = () => {
    const {user,loading}=useContext(userContext)!
     if(loading){
        return <Box>Loading...</Box>
    }
    if(!user){
        return <Navigate to="/login" replace />
    }
   

  return (
    <Box sx={{ display: "flex" ,minHeight:"100vh"}}>
      <Navbar />
      <Box
        sx={{
          flexGrow: 1,
          ml: { md: "300px" },
          width: { md: `calc(100%-300px)` },
          display:"flex",
          justifyContent:"center",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
