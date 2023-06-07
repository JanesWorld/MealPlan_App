import { Box, Button, Stack, Typography, Grid } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import LatestRecipes from "./LatestRecipes";

const HomePage = ({ setSelectedCategory }) => {
  let navigate = useNavigate();
  const meatType = ["Beef", "Chicken", "Lamb", "Vegan"];

  const handleChooseForMe = () => {
    const randomIndex = Math.floor(Math.random() * meatType.length);
    setSelectedCategory(meatType[randomIndex]);
    navigate("/recommended");
  };

  return (
    <div style={{ backgroundColor: "white", paddingTop: "15px" }}>
      <div
        style={{
          height: "50px",
          margin: "0 auto",
          width: "60%",
          backgroundColor: "#FECD2A",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: "5px",
          borderRadius: "8px",
        }}
      >
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "10px",
          }}
        >
          Choose your meat type
        </h2>
      </div>
      <Container sx={{ paddingTop: "20px" }}>
        <Container
          sx={{
            border: "1px solid lightgrey",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "240px",
            width: "80%",
          }}
        >
          <Stack
            paddingTop="22px"
            paddingBottom="10px"
            direction="column"
            spacing={2}
            width="80%"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            {meatType.map((val, id) => {
              return (
                <Button
                  sx={{
                    backgroundColor: "#0085e7",
                    "&:hover": {
                      backgroundColor: "#13AF5C",
                      color: "white",
                    },
                    color: "white",
                    width: "50%",
                  }}
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
          </Stack>
        </Container>
        <Container sx={{ marginTop: "30px", marginBottom: "10px" }}>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={handleChooseForMe}
              sx={{
                backgroundColor: "black",
                color: "white",
                borderRadius: "18px",
                width: "30%",
                "&:hover": {
                  backgroundColor: "#13AF5C",
                  color: "white",
                },
              }}
            >
              Choose for me
            </Button>
          </Grid>
        </Container>

        <div style={{ marginTop: "50px", marginBottom: "50px" }}>
          <LatestRecipes />
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
