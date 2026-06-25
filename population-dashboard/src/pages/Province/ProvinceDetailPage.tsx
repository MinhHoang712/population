import {
  Box,
  Grid,
  Paper,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  TextField
} from "@mui/material";

import ArrowBackIcon
  from "@mui/icons-material/ArrowBack";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar
} from "recharts";

import {
  useNavigate,
  useParams,
  useSearchParams
} from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { buildLineData, getIndicator } from "../../helper/chartHelper";
import { provinceCoords34 } from "../../const/provinceCoords34";
import { provinceCoords63 } from "../../const/provinceCoords63";

function ProvinceDetailPage() {

  const { code, year } =
    useParams();

  const navigate =
    useNavigate();


  const [selectedYear, setSelectedYear] = useState<any>(Number(year));


  const provinceInfo =
    (
      selectedYear < 2025
        ? provinceCoords63
        : provinceCoords34
    ).find(
      p => p.code === code
    )

  const provinceName =
    provinceInfo?.name || ""

  const [
    provinceData,
    setProvinceData
  ] = useState<any>();

  const colors = [
    "#1976d2", // blue
    "#d32f2f", // red
    "#388e3c", // green
    "#f57c00", // orange
    "#7b1fa2", // purple
    "#0288d1", // cyan
    "#c2185b", // pink
    "#5d4037", // brown
    "#455a64", // blue grey
    "#689f38"  // light green
  ]

  const chartIndicators = [
    // chart1
    "DÂN SỐ TỪ 0-14 TUỔI CHIA THEO GIỚI TÍNH NAM",
    "DÂN SỐ TỪ 0-14 TUỔI CHIA THEO GIỚI TÍNH NỮ",
    "DÂN SỐ TỪ 60 TUỔI TRỞ LÊN",
    "DÂN SỐ TỪ 60 TUỔI TRỞ LÊN CHIA THEO GIỚI TÍNH NAM",
    "DÂN SỐ TỪ 60 TUỔI TRỞ LÊN CHIA THEO GIỚI TÍNH NỮ",
    "DÂN SỐ TRUNG BÌNH CHIA THEO GIỚI TÍNH NAM",
    "DÂN SỐ TRUNG BÌNH CHIA THEO GIỚI TÍNH NỮ",
    "DÂN SỐ TRUNG BÌNH CHIA THEO THÀNH THỊ",
    "DÂN SỐ TRUNG BÌNH CHIA THEO NÔNG THÔN",

    // chart2
    "DIỆN TÍCH ĐẤT Ở",
    "DIỆN TÍCH ĐẤT SẢN XUẤT NÔNG NGHIỆP",

    // chart3
    "TUỔI THỌ TRUNG BÌNH TÍNH TỪ LÚC SINH",
    "TUỔI THỌ TRUNG BÌNH TÍNH TỪ LÚC SINH CHIA THEO GIỚI TÍNH NAM",
    "TUỔI THỌ TRUNG BÌNH TÍNH TỪ LÚC SINH CHIA THEO GIỚI TÍNH NỮ",

    // chart4
    "CHỈ SỐ GIÀ HÓA",
    "TỶ LỆ HỘ NGHÈO"
  ]


  // const chart1Data =
  //   buildLineData(
  //     provinceData?.data || [],
  //     [
  //       "DÂN SỐ TỪ 0-14 TUỔI CHIA THEO GIỚI TÍNH NAM",
  //       "DÂN SỐ TỪ 0-14 TUỔI CHIA THEO GIỚI TÍNH NỮ",
  //       "DÂN SỐ TỪ 60 TUỔI TRỞ LÊN",
  //       "DÂN SỐ TỪ 60 TUỔI TRỞ LÊN CHIA THEO GIỚI TÍNH NAM",
  //       "DÂN SỐ TỪ 60 TUỔI TRỞ LÊN CHIA THEO GIỚI TÍNH NỮ",
  //       "DÂN SỐ TRUNG BÌNH CHIA THEO GIỚI TÍNH NAM",
  //       "DÂN SỐ TRUNG BÌNH CHIA THEO GIỚI TÍNH NỮ",
  //       "DÂN SỐ TRUNG BÌNH CHIA THEO THÀNH THỊ",
  //       "DÂN SỐ TRUNG BÌNH CHIA THEO NÔNG THÔN"
  //     ]
  //   )

  const chart11Data =
    buildLineData(
      provinceData?.data || [],
      [
        "DÂN SỐ TỪ 0-14 TUỔI CHIA THEO GIỚI TÍNH NAM",
        "DÂN SỐ TỪ 0-14 TUỔI CHIA THEO GIỚI TÍNH NỮ"
      ]
    )

  const chart12Data =
    buildLineData(
      provinceData?.data || [],
      [
        "DÂN SỐ TỪ 60 TUỔI TRỞ LÊN",
        "DÂN SỐ TỪ 60 TUỔI TRỞ LÊN CHIA THEO GIỚI TÍNH NAM",
        "DÂN SỐ TỪ 60 TUỔI TRỞ LÊN CHIA THEO GIỚI TÍNH NỮ"
      ]
    )

  const chart13Data =
    buildLineData(
      provinceData?.data || [],
      [
        "DÂN SỐ TRUNG BÌNH CHIA THEO GIỚI TÍNH NAM",
        "DÂN SỐ TRUNG BÌNH CHIA THEO GIỚI TÍNH NỮ"
      ]
    )

  const chart14Data =
    buildLineData(
      provinceData?.data || [],
      [
        "DÂN SỐ TRUNG BÌNH CHIA THEO THÀNH THỊ",
        "DÂN SỐ TRUNG BÌNH CHIA THEO NÔNG THÔN"
      ]
    )



  const chart2Data =
    buildLineData(
      provinceData?.data || [],
      [
        "DIỆN TÍCH ĐẤT Ở",
        "DIỆN TÍCH ĐẤT SẢN XUẤT NÔNG NGHIỆP"
      ]
    )

  const chart3Data =
    buildLineData(
      provinceData?.data || [],
      [
        "TUỔI THỌ TRUNG BÌNH TÍNH TỪ LÚC SINH",
        "TUỔI THỌ TRUNG BÌNH TÍNH TỪ LÚC SINH CHIA THEO GIỚI TÍNH NAM",
        "TUỔI THỌ TRUNG BÌNH TÍNH TỪ LÚC SINH CHIA THEO GIỚI TÍNH NỮ"
      ]
    )

  const chart4Data =
    buildLineData(
      provinceData?.data || [],
      [
        "CHỈ SỐ GIÀ HÓA",
        "TỶ LỆ HỘ NGHÈO"
      ]
    )


  useEffect(() => {

    const loadData =
      async () => {

        const res =
          await fetch(

            `http://127.0.0.1:5000/api/province/history?code=${code}&year=${selectedYear}`

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

              provinceName

            }

            {" "}

            (

            {

              provinceData?.provinceShortName

            }

            )

          </Typography>

        </Box>

        <Box sx={{ mt: 3, alignItems: "center" }}>

          <Paper sx={{ p: 2 }}>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2
              }}
            >

              <Typography variant="h6">

                Các chỉ tiêu của {provinceName} năm

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
                  ml: 1,
                  width: 100
                }}
              >

                {
                  Object.keys(
                    provinceData?.data?.[0]?.values || {}
                  ).map(year => (

                    <MenuItem
                      key={year}
                      value={Number(year)}
                    >
                      {year}
                    </MenuItem>

                  ))
                }

              </TextField>

            </Box>


            <TableContainer>

              <Table size="small">

                <TableHead>

                  <TableRow>

                    <TableCell>
                      STT
                    </TableCell>

                    <TableCell>
                      Chỉ tiêu
                    </TableCell>

                    <TableCell>
                      Đơn vị
                    </TableCell>

                    <TableCell align="right">
                      Giá trị
                    </TableCell>

                  </TableRow>

                </TableHead>

                <TableBody>

                  {
                    provinceData?.data
                      ?.filter(
                        (item: any) =>
                          !chartIndicators.includes(
                            item.indicator
                          )
                      )
                      .map(
                        (
                          item: any,
                          index: number
                        ) => (

                          <TableRow
                            key={item.id}
                          >

                            <TableCell>
                              {index + 1}
                            </TableCell>

                            <TableCell>
                              {item.indicator}
                            </TableCell>

                            <TableCell>
                              {item.unit}
                            </TableCell>

                            <TableCell
                              align="right"
                            >
                              {
                                item.values?.[
                                  String(selectedYear)
                                ]?.toLocaleString()
                              }
                            </TableCell>

                          </TableRow>

                        )
                      )
                  }

                </TableBody>

              </Table>

            </TableContainer>

          </Paper>

        </Box>


        <Grid
          container
          spacing={2}
        >

          <Grid size={12}>
            <Paper sx={{ p: 2, height: 600 }}>
              <Typography
                variant="h6"
                gutterBottom
              >
                Dân số từ 0 - 14 tuổi
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                Đơn vị: Người
              </Typography>

              <ResponsiveContainer width="100%" height="90%">

                <BarChart data={chart11Data}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 50,
                    bottom: 20
                  }}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="year" />

                  <YAxis />

                  <Tooltip />

                  <Legend />

                  <Bar
                    dataKey="DÂN SỐ TỪ 0-14 TUỔI CHIA THEO GIỚI TÍNH NAM"
                    fill="#1976d2"
                  />

                  <Bar
                    dataKey="DÂN SỐ TỪ 0-14 TUỔI CHIA THEO GIỚI TÍNH NỮ"
                    fill="#d32f2f"
                  />

                </BarChart>

              </ResponsiveContainer>

            </Paper>
          </Grid>

          <Grid size={12}>
            <Paper sx={{ p: 2, height: 600 }}>
              <Typography
                variant="h6"
                gutterBottom
              >
                Dân số từ 60 tuổi trở lên
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                Đơn vị: Người
              </Typography>

              <ResponsiveContainer width="100%" height="90%">

                <BarChart data={chart12Data}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 50,
                    bottom: 20
                  }}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="year" />

                  <YAxis />

                  <Tooltip />

                  <Legend />

                  <Bar
                    dataKey="DÂN SỐ TỪ 60 TUỔI TRỞ LÊN"
                    fill="#388e3c"// green

                  />

                  <Bar
                    dataKey="DÂN SỐ TỪ 60 TUỔI TRỞ LÊN CHIA THEO GIỚI TÍNH NAM"
                    fill="#1976d2"
                  />

                  <Bar
                    dataKey="DÂN SỐ TỪ 60 TUỔI TRỞ LÊN CHIA THEO GIỚI TÍNH NỮ"
                    fill="#d32f2f"
                  />

                </BarChart>

              </ResponsiveContainer>

            </Paper>
          </Grid>

          <Grid size={12}>
            <Paper sx={{ p: 2, height: 600 }}>
              <Typography
                variant="h6"
                gutterBottom
              >
                Dân số trung bình theo giới tính
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                Đơn vị: Người
              </Typography>

              <ResponsiveContainer width="100%" height="90%">

                <BarChart data={chart13Data}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 50,
                    bottom: 20
                  }}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="year" />

                  <YAxis />

                  <Tooltip />

                  <Legend />



                  <Bar
                    dataKey="DÂN SỐ TRUNG BÌNH CHIA THEO GIỚI TÍNH NAM"
                    fill="#1976d2"
                  />

                  <Bar
                    dataKey="DÂN SỐ TRUNG BÌNH CHIA THEO GIỚI TÍNH NỮ"
                    fill="#d32f2f"
                  />

                </BarChart>

              </ResponsiveContainer>

            </Paper>
          </Grid>

          <Grid size={12}>
            <Paper sx={{ p: 2, height: 600 }}>
              <Typography
                variant="h6"
                gutterBottom
              >
                Dân số trung bình theo khu vực
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                Đơn vị: Người
              </Typography>

              <ResponsiveContainer width="100%" height="90%">

                <BarChart data={chart14Data}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 50,
                    bottom: 20
                  }}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="year" />

                  <YAxis />

                  <Tooltip />

                  <Legend />

                  <Bar
                    dataKey="DÂN SỐ TRUNG BÌNH CHIA THEO THÀNH THỊ"
                    fill="#7b1fa2"
                  />

                  <Bar
                    dataKey="DÂN SỐ TRUNG BÌNH CHIA THEO NÔNG THÔN"
                    fill="#00838f"
                  />

                </BarChart>

              </ResponsiveContainer>

            </Paper>
          </Grid>

          <Grid size={12}>
            <Paper sx={{ p: 2, height: 500 }}>

              <Typography variant="h6" gutterBottom>
                Diện tích đất
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                Đơn vị: Nghìn ha
              </Typography>

              <ResponsiveContainer width="100%" height="90%">

                <BarChart
                  data={chart2Data}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 50,
                    bottom: 20
                  }}
                >

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="year" />

                  <YAxis />

                  <Tooltip />

                  <Legend />

                  {
                    Object.keys(chart2Data[0] || {})
                      .filter(x => x !== "year")
                      .map((key, index) => (

                        <Bar
                          key={key}
                          dataKey={key}
                          fill={colors[index % colors.length]}
                        />

                      ))
                  }

                </BarChart>

              </ResponsiveContainer>

            </Paper>
          </Grid>


          <Grid size={12}>
            <Paper sx={{ p: 2, height: 500 }}>

              <Typography variant="h6" gutterBottom>
                Tuổi thọ trung bình
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                Đơn vị: Tuổi
              </Typography>

              <ResponsiveContainer width="100%" height="90%">

                <BarChart
                  data={chart3Data}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 50,
                    bottom: 20
                  }}
                >

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="year" />

                  <YAxis />

                  <Tooltip />

                  <Legend />

                  {
                    Object.keys(chart3Data[0] || {})
                      .filter(x => x !== "year")
                      .map((key, index) => (

                        <Line
                          key={key}
                          dataKey={key}
                          stroke={colors[index % colors.length]}
                          strokeWidth={2}
                          dot={false}
                        />

                      ))
                  }

                </BarChart>



              </ResponsiveContainer>

            </Paper>
          </Grid>

          <Grid size={12}>
            <Paper sx={{ p: 2, height: 500 }}>

              <Typography variant="h6" gutterBottom>
                Chỉ số già hóa và tỷ lệ hộ nghèo
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                Đơn vị: %
              </Typography>

              <ResponsiveContainer width="100%" height="90%">

                <LineChart
                  data={chart4Data}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 50,
                    bottom: 20
                  }}
                >

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="year" />

                  <YAxis />

                  <Tooltip />

                  <Legend />

                  {
                    Object.keys(chart4Data[0] || {})
                      .filter(x => x !== "year")
                      .map((key, index) => (

                        <Line
                          key={key}
                          dataKey={key}
                          stroke={colors[index % colors.length]}
                          strokeWidth={2}
                          dot={false}
                        />

                      ))
                  }

                </LineChart>

              </ResponsiveContainer>

            </Paper>
          </Grid>



        </Grid>

      </Box>

    </Box>


  )

}

export default ProvinceDetailPage;