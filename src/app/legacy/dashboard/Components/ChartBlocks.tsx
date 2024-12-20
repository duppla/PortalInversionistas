import { Grid } from "@mui/material";

export function chartBlocks(
  element: JSX.Element,
  height_container: number,
  height_element: number = 460,
  mt: number = 0
) {
  return (
    <Grid
      container
      sx={{
        mb: 5,
        display: "flex",
        justifyContent: "center",
        justifyItems: "center",
        width: "100%",
        height: height_container,
        backgroundColor: "#212126",
        borderRadius: "20px",
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Grid
        className=""
        xs={12}
        sm={12}
        md={10}
        lg={10}
        sx={{
          width: "100%",
          height: height_element,
          backgroundColor: "#212126",
          borderRadius: "20px",
          mt: mt,
        }}
      >
        {element}
      </Grid>
    </Grid>
  );
}
