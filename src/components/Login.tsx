import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { NavLink, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import { userContext } from "../userContext/userContext.tsx";
import Typography from "@mui/material/Typography";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { toast } from "react-toastify";
import { allAPICall } from "../api2.ts";
const Login = () => {
    const [formField, setFormField] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const { setUser ,setLogData} = useContext(userContext)!;
    const navigate = useNavigate();
    async function handleLogin(
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) {
        e.preventDefault();
        setLoading(true);
        setIsClicked(true);
        const res = await allAPICall("fetchLogin", formField);
        if (res?.data?.success) {
            const userRes = await allAPICall("getUser");
            setUser(userRes?.data?.data);
            setLoading(false);
            navigate("/todos");
        } else {
            setError(res?.data?.message);
            if(res?.data.message=="you are not verified. verify your email first"){
                setLogData(formField.email);
            }
            setLoading(false);
            setIsClicked(false);
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
                            autoComplete='new-password'
                            type={showPass ? "text" : "password"}
                            value={formField.password}
                            onChange={(e) => {
                                setFormField({ ...formField, password: e.target.value });
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
                        <NavLink to="/signup">Not Register ? Signup here</NavLink>
                        <NavLink to="/verify">Resend Verification link</NavLink>
                    </Box>

                    <Button
                        variant="contained"
                        onClick={(e) => handleLogin(e)}
                        type="submit"
                        size="large"
                        disabled = {isClicked}
                    >
                        {loading ? "loading..." : "Log in"}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Login;
