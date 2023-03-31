import { Button } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

const HomePage = ({ setSelectedCategory }) => {
  let navigate = useNavigate();
  const meatType = ["Beef", "Chicken", "Lamb", "Vegan"];

  return (
    <div style={{ backgroundColor: "lightBlue" }}>
      <h3>Choose your meat type</h3>
      <Container>
        {meatType.map((val, id) => {
          return (
            <Button
              key={id}
              onClick={() => {
                setSelectedCategory(val);
                navigate("/recommended");
              }}
            >
              {val}
            </Button>
          );
        })}
        <div style={{ marginTop: "50px", marginBottom: "50px" }}>
          <RecipeCard />
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
