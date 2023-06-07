import { Button, Container, Typography, Box, Stack } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  const pathName = location.pathname;
  return (
    <Container
      sx={{
        backgroundColor: "#F7EEE0",
        marginBottom: "30px",
        marginTop: "30px",
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Meal Plan</h1>
        <Box
          sx={{
            backgroundColor: "#BCA987",
            borderRadius: "10px",
            width: "45%",
            marginTop: "20px",
            marginBottom: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Stack direction="row" spacing={2}>
            <Button component={Link} to="/" sx={{ color: "black" }}>
              Home
            </Button>

            <Button component={Link} to="/favourites" sx={{ color: "black" }}>
              Favourites
            </Button>
            <Button component={Link} to="/courses" sx={{ color: "black" }}>
              Education
            </Button>
          </Stack>
        </Box>
      </div>
      {/* <div
        style={{
          backgroundColor: "#FECD2A",
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
      </div> */}
      <div style={{ paddingBottom: "30px" }}>{children}</div>
    </Container>
  );
};

export default Layout;
