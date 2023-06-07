import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart } from "chart.js";
import { CategoryScale } from "chart.js/auto";

// Register the CategoryScale
Chart.register(CategoryScale);

const NutritionChart = ({ nutritionData }) => {
  const data = {
    labels: ["Protein", "Carbs", "Fat"],
    datasets: [
      {
        label: "Nutrition",
        data: nutritionData,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
};

export default NutritionChart;
