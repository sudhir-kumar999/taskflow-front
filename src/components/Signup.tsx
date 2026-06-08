import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useContext, useEffect, useState } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { userContext } from "../userContext/userContext.tsx";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Typography from "@mui/material/Typography";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import { allAPICall } from "../api2.ts";

const Signup = () => {
  const adornmentId = React.useId();
  const textFieldId = React.useId();
  const sxId = React.useId();

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  const { formField, setFormField } = useContext(userContext)!;
  async function handleSignup(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();
    if (formField.password !== formField.confirmPassword) {
      setError("Confirm Password does not matches");
      
      return;
    }
    setError("");
    let res = await allAPICall("signup", formField);
    setError(res?.data?.message);
    if (res?.data?.success) {
      navigate("/login");
      toast.success("signup successful");
    } else {
      setError(res?.data?.message);
    }
  }
  function showPassword() {
    setShowPass(!showPass);
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
          <AccountCircle sx={{ fontSize: "36px" }} />
          <h1 style={{ borderBottom: "2px solid blue" }}>Create Account</h1>
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
          <Box sx={{ color: "red" }}>
            {error}
          </Box>
          <Box sx={{ width: 500, maxWidth: "100%" }}>
            <TextField
              fullWidth
              label="Enter your Name"
              id="fullWidth"
              required
              value={formField.name}
              onChange={(e) => {
                setFormField({ ...formField, name: e.target.value });
              }}
            />
          </Box>
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
              type={showPass ? "text" : "password"}
              id="fullWidth"
              value={formField.password}
              onChange={(e) => {
                setFormField({ ...formField, password: e.target.value });
              }}
            />
          </Box>
          <Box sx={{ width: 500, maxWidth: "100%" }}>
            <TextField
              fullWidth
              label="Confirm the above password"
              id="fullWidth"
              type={showPass ? "text" : "password"}
              value={formField.confirmPassword}
              onChange={(e) => {
                setFormField({ ...formField, confirmPassword: e.target.value });
              }}
            />
            <Typography
              variant="body1"
              component="span"
              sx={{ position: "absolute", ml: -6, mt: 2 }}
              onClick={showPassword}
            >
              {showPass ? <VisibilityOffIcon sx={{}} /> : <VisibilityIcon />}
            </Typography>
          </Box>
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <NavLink to="/login">Already register ? Login here</NavLink>
            <NavLink to="/verify">Resend Verification link</NavLink>
          </Box>
          <Button
            variant="contained"
            onClick={(e) => handleSignup(e)}
            type="submit"
            size="large"
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
