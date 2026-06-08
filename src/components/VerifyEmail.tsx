import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { allAPICall } from "../api2.ts";
const VerifyEmail = () => {

  const [email, setEmail] = useState("");
  const [response, setResponse] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  async function handleSignup(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();
    setIsClicked(true);
    const res = await allAPICall("sendLink", { email });
    setResponse(res?.data?.message);
    setEmail("");
    setIsClicked(false);
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "column",
            lg: "column",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",

            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <AssignmentTurnedInIcon sx={{ fontSize: "36px" }} />
          <h1 style={{ borderBottom: "2px solid blue" }}>Welcome Back</h1>
        </Box>
        <Box
          component="section"
          sx={{
            width: "85vw",
            p: 2,
            display: "flex",
            gap: "15px",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box sx={{ width: 500, maxWidth: "100%" }}>
            <p style={{ color: "red" }}>{response}</p>
            <TextField
              fullWidth
              label="Enter your Email"
              id="fullWidth"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Box>
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <NavLink to="/signup">Not Register ? Signup here</NavLink>
            <NavLink to="/login">Already Verified ? Login here</NavLink>
          </Box>

          <Button
            variant="contained"
            onClick={(e) => handleSignup(e)}
            type="submit"
            size="large"
disabled = {isClicked}

          >
            Send Link
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default VerifyEmail;
