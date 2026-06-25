import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  MenuItem,
  Autocomplete,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Paper,
} from "@mui/material";

import PublicIcon from "@mui/icons-material/Public";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { provinceCoords34 } from "../../const/provinceCoords34";
import { provinceCoords63 } from "../../const/provinceCoords63";
import { Bar, BarChart, Tooltip, CartesianGrid, Cell, ResponsiveContainer, XAxis, YAxis, Legend } from "recharts";

type HeaderProps = {
  selectedYear: number
  setSelectedYear: (v: number) => void
  provinceName: string
  setProvinceName: (v: string) => void
}

function Header({
  selectedYear,
  setSelectedYear,
  provinceName,
  setProvinceName
}: HeaderProps) {

  const navigate = useNavigate();

  const [openCountryDialog, setOpenCountryDialog] =
    useState(false)

  const [countryData, setCountryData] =
    useState<any>()

  const provinces =
    selectedYear >= 2025
      ? provinceCoords34
      : provinceCoords63

  const loadCountryData = async () => {

    try {

      const res = await fetch(

        `http://127.0.0.1:5000/api/country?year=${selectedYear}`

      )

      const data =
        await res.json()

      setCountryData(data)

      setOpenCountryDialog(true)

    }
    catch (err) {

      console.error(err)

    }

  }

  const malePopulation =
    countryData?.data?.find(
      (x: any) =>
        x.indicator ===
        "DÂN SỐ TRUNG BÌNH CHIA THEO GIỚI TÍNH NAM"
    )

  const femalePopulation =
    countryData?.data?.find(
      (x: any) =>
        x.indicator ===
        "DÂN SỐ TRUNG BÌNH CHIA THEO GIỚI TÍNH NỮ"
    )

  const populationCompare =
    Object.keys(
      malePopulation?.values || {}
    ).map(year => ({

      year,

      Nam:
        malePopulation?.values?.[year],

      Nữ:
        femalePopulation?.values?.[year]

    }))

  const residentialLand =
    countryData?.data?.find(
      (x: any) =>
        x.indicator ===
        "DIỆN TÍCH ĐẤT Ở"
    )

  const agricultureLand =
    countryData?.data?.find(
      (x: any) =>
        x.indicator ===
        "DIỆN TÍCH ĐẤT SẢN XUẤT NÔNG NGHIỆP"
    )

  const landCompare =
    Object.keys(
      residentialLand?.values || {}
    ).map(year => ({

      year,

      "Đất ở":
        residentialLand?.values?.[year],

      "Đất nông nghiệp":
        agricultureLand?.values?.[year]

    }))

  return (

    <AppBar position="static">

      <Toolbar
        sx={{
          display: "flex",
          gap: 2
        }}
      >

        <Typography variant="h6">
          BẢN ĐỒ DÂN SỐ
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

        <Autocomplete

          options={provinces}

          sx={{
            width: 300,
            bgcolor: "white",
            borderRadius: 1
          }}

          inputValue={provinceName}

          onInputChange={(_, value) =>
            setProvinceName(value)
          }

          getOptionLabel={(option) =>

            `${option.code} - ${option.name}`

          }

          filterOptions={(options, state) => {

            const keyword =
              state.inputValue
                .toLowerCase()

            return options.filter(
              p =>

                p.code.includes(keyword) ||

                p.name
                  .toLowerCase()
                  .includes(keyword)

            )

          }}

          renderInput={(params) => (

            <TextField
              {...params}
              size="small"
              placeholder="Mã tỉnh hoặc tên tỉnh"
            />

          )}

          onChange={(_, province) => {

            if (!province)
              return

            navigate(
              `/province/${province.code}/${selectedYear}`
            )

          }}

        />

        <Button
          variant="contained"
          startIcon={<PublicIcon />}
          onClick={loadCountryData}
        >
          Toàn quốc
        </Button>

      </Toolbar>
      <Dialog
        open={openCountryDialog}
        onClose={() =>
          setOpenCountryDialog(false)
        }
        maxWidth="lg"
        fullWidth
      >

        <DialogTitle>

          Chỉ tiêu toàn quốc năm {selectedYear}

        </DialogTitle>

        <DialogContent>

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
                  countryData?.data?.map(
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
                            ] != null
                              ? item.values[
                                String(selectedYear)
                              ].toLocaleString()
                              : "-"
                          }
                        </TableCell>

                      </TableRow>

                    )
                  )
                }

              </TableBody>

            </Table>

          </TableContainer>


          <Grid
            container
            spacing={2}
            sx={{ my: 3 }}
          >

            <Grid size={12}>

              <Paper sx={{ p: 2 }}>

                <Typography
                  variant="h6"
                >
                  Dân số nam / nữ
                </Typography>

                <ResponsiveContainer
                  width="100%"
                  height={500}

                >

                  <BarChart
                    data={populationCompare}
                    margin={{
                      top: 20,
                      right: 20,
                      left: 60,
                      bottom: 20
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="year" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Bar
                      dataKey="Nam"
                      fill="#1976d2"
                    />

                    <Bar
                      dataKey="Nữ"
                      fill="#d32f2f"
                    />

                  </BarChart>

                </ResponsiveContainer>

              </Paper>

            </Grid>

            <Grid size={12}>

              <Paper sx={{ p: 2 }}>

                <Typography
                  variant="h6"
                >
                  Diện tích đất
                </Typography>

                <ResponsiveContainer
                  width="100%"
                  height={500}
                >

                  <BarChart
                    data={landCompare}
                    margin={{
                      top: 20,
                      right: 20,
                      left: 60,
                      bottom: 20
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="year" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Bar
                      dataKey="Đất ở"
                      fill="#ed6c02"
                    />

                    <Bar
                      dataKey="Đất nông nghiệp"
                      fill="#2e7d32"
                    />

                  </BarChart>

                </ResponsiveContainer>

              </Paper>

            </Grid>

          </Grid>

        </DialogContent>

        <DialogActions>

          <Button
            onClick={() =>
              setOpenCountryDialog(false)
            }
          >
            Đóng
          </Button>

        </DialogActions>

      </Dialog>


    </AppBar>

  )

}

export default Header
