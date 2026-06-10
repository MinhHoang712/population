import {
  Box,
  Grid,
  Paper,
  Typography,
  IconButton
} from "@mui/material";

import ArrowBackIcon
  from "@mui/icons-material/ArrowBack";

import {
  useNavigate,
  useParams,
  useSearchParams
} from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";

function ProvinceDetailPage() {

  const { code } =
    useParams();

  const navigate =
    useNavigate();

  const [searchParams] =
    useSearchParams();

  const year =
    Number(
      searchParams.get("year")
    );

  const [
    selectedYear,
    setSelectedYear
  ] = useState(year);

  const [
    provinceName,
    setProvinceName
  ] = useState("");

  const [
    provinceData,
    setProvinceData
  ] = useState<any>();


  useEffect(() => {

    const loadData =
      async () => {

        const res =
          await fetch(

            `http://127.0.0.1:5000/api/province/history?code=${code}`

          )

        const data =
          await res.json()

        setProvinceData(
          data
        )

        console.log(data)

      }

    loadData()

  }, [code])

  return (

    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }}
    >

      <Header

        selectedYear={
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
        }

      />

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2
        }}
      >

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 3
          }}
        >

          <IconButton
            onClick={() =>
              navigate("/")
            }
          >

            <ArrowBackIcon />

          </IconButton>

          <Typography
            variant="h5"
          >

            {

              provinceData?.provinceName

            }

            {" "}

            (

            {

              provinceData?.provinceShortName

            }

            )

          </Typography>

        </Box>

        <Grid
          container
          spacing={2}
        >

          <Grid size={6}>
            <Paper
              sx={{
                height: 350,
                p: 2
              }}
            >
              Chart 1
            </Paper>
          </Grid>

          <Grid size={6}>
            <Paper
              sx={{
                height: 350,
                p: 2
              }}
            >
              Chart 2
            </Paper>
          </Grid>

          <Grid size={6}>
            <Paper
              sx={{
                height: 350,
                p: 2
              }}
            >
              Chart 3
            </Paper>
          </Grid>

          <Grid size={6}>
            <Paper
              sx={{
                height: 350,
                p: 2
              }}
            >
              Chart 4
            </Paper>
          </Grid>

        </Grid>

      </Box>

    </Box>


  )

}

export default ProvinceDetailPage;