import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  MenuItem
} from "@mui/material";

type HeaderProps = {

  selectedYear: number;

  setSelectedYear: (
    year: number
  ) => void;

  provinceName: string;

  setProvinceName: (
    value: string
  ) => void;

}

function Header({

  selectedYear,

  setSelectedYear,

  provinceName,

  setProvinceName

}: HeaderProps) {

  return (

    <AppBar
      position="static"
      sx={{
        flexShrink: 0
      }}
    >

      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2
        }}
      >

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

              Number(
                e.target.value
              )

            )

          }
          sx={{
            bgcolor: "white",
            borderRadius: 1,
            minWidth: 120
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
            minWidth: 250,
            "& .MuiInputLabel-root": {
              display: "none"
            }
          }}
        />

      </Toolbar>

    </AppBar>

  );

}

export default Header;