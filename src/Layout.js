import { Button, Container, Typography, Box } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  const pathName = location.pathname;
  return (
    <Container sx={{ backgroundColor: "#eae2b7", marginBottom: "30px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" fontWeight="light" paddingLeft="5px">
          Plan a meal
        </Typography>
        <Box
          sx={{
            backgroundColor: "#264653",
            borderRadius: "10px",
            width: "30%",
            marginTop: "20px",
            marginBottom: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            component={Link}
            to="/"
            sx={{ backgroundColor: "#264653", color: "white" }}
          >
            Back Home
          </Button>
        </Box>
      </div>
      <div
        style={{
          backgroundColor: "#FFCD29",
          height: "120px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          width="80%"
          paddingLeft="30px"
        >
          Time and health are two precious assets that we don't recognize and
          appreciate until they have been depleted.
        </Typography>
      </div>
      <div style={{ paddingBottom: "30px" }}>{children}</div>
    </Container>
  );
};

export default Layout;
