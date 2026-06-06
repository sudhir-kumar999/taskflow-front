import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useContext, useState } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import { NavLink, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import { userContext } from "../userContext/userContext.tsx";
// import { fetchLogin } from "../api.ts";
const Login = () => {
  const adornmentId = React.useId();
  const textFieldId = React.useId();
  const sxId = React.useId();
  const [formField, setFormField] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [iserror, setIsError] = useState(false);
  const { fetchLogin } = useContext(userContext)!;
  const { setUser, getUser } = useContext(userContext)!;
  const navigate = useNavigate();

  async function handleLogin(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();
    console.log(formField);
    const res = await fetchLogin(formField);
console.log("res",res)
    if (res) {
        console.log("user")
      const userRes = await getUser();
      
      if (userRes.data?.data) {
        console.log("user ser")
        setUser(userRes.data.data);
      }
      navigate("/");
    }else{
        setError("login failed")
    }
    // setFormField({
    //   email: "",
    //   password: "",
    // });
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
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
          <LoginIcon sx={{ fontSize: "36px" }} />
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
          <Box sx={{ color: "red" }}>{error}</Box>

          <Box sx={{ width: 500, maxWidth: "100%" }}>
            {iserror && <p>{error}</p>}
            <TextField
              fullWidth
              label="Enter your Email"
              id="fullWidth"
              value={formField.email}
              onChange={(e) => {
                setFormField({ ...formField, email: e.target.value });
              }}
            />
          </Box>
          <Box sx={{ width: 500, maxWidth: "100%" }}>
            {iserror && <p>{error}</p>}
            <TextField
              fullWidth
              label="Enter password"
              id="fullWidth"
              value={formField.password}
              onChange={(e) => {
                setFormField({ ...formField, password: e.target.value });
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
            <NavLink to="/verify">Resend Verification link</NavLink>
          </Box>

          <Button
            variant="contained"
            onClick={(e) => handleLogin(e)}
            type="submit"
            size="large"
          >
            Log in
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
