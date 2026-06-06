import React, { useContext } from "react";
import image from "./hero.png";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { userContext } from "../userContext/userContext.tsx";

const Home = () => {
  const login =useContext(userContext)
  console.log(login)
  return (
    <Box
      sx={{
        marginTop: "70px",
        ml: { md: "-250px" },
        p: 2,
        display: "flex",
        flexDirection: "column",
        // alignItems:"center",
        // width:"100%"
      }}
    >
      home page
    </Box>
  );
};

export default Home;
