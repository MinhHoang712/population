import {
  Box,
  Toolbar,
  Typography,
  Paper,
  MenuItem,
  TextField,
  AppBar
} from "@mui/material";
import MapComponent from "../../components/map/Map";
import { useState } from "react";
import Header from "../../components/Header/Header";

function Dashboard() {

  const [selectedYear, setSelectedYear] =
    useState(2023);


  const [provinceName, setProvinceName] =
    useState("");

  return (

    <Box
      sx={{
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column"
      }}
    >

      {/* HEADER */}

      <Header selectedYear={
        selectedYear
      }

        setSelectedYear={
          setSelectedYear
        }

        provinceName={
          provinceName
        }

        setProvinceName={
          setProvinceName
        } />

      {/* CONTENT */}

      <Box
        sx={{
          flex: 1,
          display: "flex",
          overflow: "hidden",
          width: "100%"
        }}
      >
        {/* MAP */}
        <Box
          sx={{
            width: "100%",
            minHeight: 0,
            p: 1
          }}
        >


          <MapComponent
            selectedYear={selectedYear}

          />

          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >


          </Box>


        </Box>

      </Box>

    </Box>


  )

}

export default Dashboard