import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Paper,
  MenuItem,
  TextField
} from "@mui/material";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProvinceDetailPage from "./pages/Province/ProvinceDetailPage";

function App() {

 
  return (

     <Routes>

      <Route
        path="/"
        element={<Dashboard />}
      />

      <Route
        path="/province/:code/:year"
        element={<ProvinceDetailPage />}
      />

    </Routes>


  )

}

export default App