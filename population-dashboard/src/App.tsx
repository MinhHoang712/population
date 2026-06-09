import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Paper
} from "@mui/material";
import MapComponent from "./components/map/Map";

function App() {

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
          flexShrink:0
        }}
      >

        <Toolbar>

          <Typography
            variant="h6"
          >

            Population Dashboard

          </Typography>

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
            width: "70%",
            minHeight:0,
            p: 1
          }}
        >

        
            <MapComponent />

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


        {/* CHART */}

        <Box
          sx={{
            width: "30%",
            p: 1,
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              display: "none"
            },

            scrollbarWidth: "none"
          }}
        >

        
        </Box>

      </Box>

    </Box>

  )

}

export default App