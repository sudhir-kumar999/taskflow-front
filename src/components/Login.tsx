import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useContext, useState } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import { NavLink, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import { userContext } from "../userContext/userContext.tsx";
import Typography from "@mui/material/Typography";
// import { fetchLogin } from "../api.ts";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
const Login = () => {
  const adornmentId = React.useId();
  const textFieldId = React.useId();
  const sxId = React.useId();
  const [formField, setFormField] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading,setLoading]=useState(false)
    const [showPass,setShowPass]=useState(false)
  const { fetchLogin } = useContext(userContext)!;
  const { setUser, getUser,user } = useContext(userContext)!;
  const navigate = useNavigate();

  async function handleLogin(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();
    setLoading(true)
    const res = await fetchLogin(formField);
console.log("res",res)
    if (res?.data?.success) {
      const userRes = await getUser();
        setUser(userRes?.data?.data);
      setLoading(false)
      navigate("/");
    }else{
        // if(!user){
        //     // await getUser();
        //     navigate("/login")
        //     return
        // }
        setError(res?.data?.message)
        setLoading(false)
    }

  }
  function showPassword(){
    setShowPass(!showPass)
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
            <TextField
              fullWidth
              label="Enter password"
              id="fullWidth"
              type={showPass?"text":"password"}
              value={formField.password}
              onChange={(e) => {
                setFormField({ ...formField, password: e.target.value });
              }}
            />
            <Typography variant="body1" component="span" sx={{position:"absolute",ml:-6, mt:2}} onClick={showPassword}>{showPass?<VisibilityOffIcon  sx={{}}/>:<VisibilityIcon />}</Typography>

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
            {loading?"loading...":"Log in"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
