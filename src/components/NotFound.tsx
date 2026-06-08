import Box from "@mui/material/Box";
import React, { useContext, useState } from "react";
import { userContext } from "../userContext/userContext.tsx";
import { Navigate, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const NotFound = () => {
  const { user } = useContext(userContext)!;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  function handleRedirect() {
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
      setLoading(true);
      navigate("/todos");
      setLoading(false);
    } else {
      setLoading(true);
      navigate("/login");
      setLoading(false);
    }
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Box>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            m: 4,
          }}
        >
          No Page found
        </Typography>
        <Button variant="contained" onClick={handleRedirect}>
          Go to home page
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;
