import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <>
      <div>
        <header>Meal Plan App - MVP</header>
      </div>
      <Button component={Link} to="/">
        Back Home
      </Button>
      {children}
    </>
  );
};

export default Layout;
