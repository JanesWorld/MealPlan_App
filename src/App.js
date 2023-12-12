import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import RecommendedPage from "./RecommendedPage";
import { useState } from "react";
import MealPage from "./MealPage";
import Layout from "./Layout";
import Favourites from "./Favourites";
import Courses from "./Courses";
import { FavouritesProvider } from "./Context/FavouritesContext";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <FavouritesProvider>
      <div className="App">
        <Router>
          <Layout>
            <Routes>
              <Route
                path="/"
                element={<HomePage setSelectedCategory={setSelectedCategory} />}
              />
              <Route
                path="/recommended"
                element={
                  <RecommendedPage selectedCategory={selectedCategory} />
                }
              />
              <Route
                path="/meal/:id"
                element={<MealPage selectedCategory={selectedCategory} />}
              />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/courses" element={<Courses />} />
            </Routes>
          </Layout>
        </Router>
      </div>
    </FavouritesProvider>
  );
}

export default App;
