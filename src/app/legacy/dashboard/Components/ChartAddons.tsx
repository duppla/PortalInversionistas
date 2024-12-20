// react imports
import { Dispatch, SetStateAction } from "react";

// material-ui imports
import Grid from "@mui/material/Unstable_Grid2";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import { Typography, Select, MenuItem } from "@mui/material";

// custom imports
import { changeArrow } from "./utils";

export function titleGrid(
  title: string,
  explainText: string = "",
  mt: number = 0,
  mb: number = 0
) {
  return (
    <Grid xs={6} md={6} lg={6} sx={{ mt: mt, mb: mb }}>
      <Grid container>
        <Grid xs={8} sm={8} md={8} lg={8}>
          <Typography
            className="title-dropdown-menu-container"
            variant="subtitle1"
            sx={{
              fontFamily: "Helvetica",
              fontWeight: 300,
              color: "#ffffff",
              fontSize: "26px",
            }}
          >
            {title}
          </Typography>
        </Grid>
        {explainText ? setExplanationText(explainText) : ""}
      </Grid>
    </Grid>
  );
}

type Tramos = {
  este_anho: string;
  ult_6_meses: string;
  ult_12_meses: string;
};

export function selectGrid(
  selectedKey: keyof Tramos,
  handleSelectChange: any,
  menuOpen: boolean,
  setMenuOpen: Dispatch<SetStateAction<boolean>>
) {
  return (
    <Grid xs={6} md={6} lg={6} sx={{ textAlign: "end" }}>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedKey}
        label="Age"
        onChange={handleSelectChange}
        sx={{
          color: "#9B9EAB",
          justifyContent: "flex-end",
          textAlign: "end",
          fill: "#ffffff",
          "&.MuiSelect-icon": { color: "#FFFFFF !important" },
          "& .MuiOutlinedInput-notchedOutline": { border: "none" },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          PaperProps: {
            sx: {
              backgroundColor: "#212126", // Fondo del menú desplegado
              border: "1px solid #5682F2", // Borde azul
              color: "#9B9EAB", // Letra blanca
            },
          },
        }}
        open={menuOpen}
        onClose={() => setMenuOpen(false)} // Cierra el menú cuando se hace clic fuera de él
        onOpen={() => setMenuOpen(true)} // Abre el menú cuando se hace clic en el botón
        IconComponent={() => changeArrow(menuOpen, setMenuOpen)}
      >
        <MenuItem value="ult_6_meses">Últimos 6 meses</MenuItem>
        <MenuItem value="ult_12_meses">Últimos 12 meses</MenuItem>
      </Select>
    </Grid>
  );
}

export function setExplanationText(explanationText: string) {
  return (
    <Grid xs={2} sm={2} md={2} lg={2}>
      <Tooltip title={explanationText}>
        <InfoIcon
          sx={{
            color: "#757575",
            fill: "#757575",
            marginTop: 1.5,
            height: "12px",
            width: "12px",
            marginLeft: "10px",
          }}
        />
      </Tooltip>
    </Grid>
  );
}
