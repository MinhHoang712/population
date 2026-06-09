import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Paper,
  MenuItem,
  TextField
} from "@mui/material";
import MapComponent from "./components/map/Map";
import { useState } from "react";

function App() {

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

      <AppBar
        position="static"
        sx={{
          flexShrink: 0
        }}
      >

        <Toolbar sx={{
          display: "flex",
          alignItems: "center",
          gap: 2
        }}>

          <Typography
            variant="h6"
          >

            Population Dashboard

          </Typography>


          <TextField
            select
            size="small"
            value={selectedYear}
            onChange={(e) =>
              setSelectedYear(
                Number(e.target.value)
              )
            }
            sx={{
              mr: 2,
              bgcolor: "white",
              borderRadius: 1
            }}
          >
            {
              Array.from(
                { length: 15 },
                (_, i) => 2016 + i
              ).map(year => (
                <MenuItem
                  key={year}
                  value={year}
                >
                  {year}
                </MenuItem>
              ))
            }
          </TextField>

          <TextField
            size="small"
            placeholder="Mã tỉnh hoặc tên tỉnh"
            value={provinceName}
            onChange={(e) =>
              setProvinceName(
                e.target.value
              )
            }
            sx={{
              bgcolor: "white",
              borderRadius: 1,
              "& .MuiInputLabel-root": {
                display: "none"
              }
            }}
          />


        </Toolbar>

      </AppBar>

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

export default App