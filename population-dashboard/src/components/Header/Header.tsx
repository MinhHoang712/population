import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  MenuItem,
  Autocomplete
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { provinceCoords34 } from "../../const/provinceCoords34";
import { provinceCoords63 } from "../../const/provinceCoords63";

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

  const provinces =
    selectedYear >= 2025
      ? provinceCoords34
      : provinceCoords63

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

      </Toolbar>

    </AppBar>

  )

}

export default Header
