import Box from "@mui/material/Box";
import React, { useContext} from "react";
import Navbar from "./Navbar.tsx";
import { Navigate, Outlet } from "react-router-dom";
import { userContext } from "../userContext/userContext.tsx";
import CircularProgress from "@mui/material/CircularProgress";

const PubLayout = () => {
    const { user, loading } = useContext(userContext)!;
    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress aria-label="Loading…" />
            </Box>
        );
    }
    if (user) {
        return <Navigate to="/todos" replace />;
    }

    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                ml: { xs: "7vw", sm: "7vw", md: "2vw" },
            }}
        >
            <Navbar />
            <Box
                sx={{
                    ml: { md: "-10vw" },
                    display: "flex",
                    justifyContent: "center",
                }}
            ></Box>
            <Outlet />
        </Box>
    );
};

export default PubLayout;
