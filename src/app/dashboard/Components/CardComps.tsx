import { Box, Card, CardContent, Typography } from "@mui/material";

export function CardCompBox(title: string, data: string) {
  const box = (
    <Box
      className="size-card-main-d-f"
      sx={{ backgroundColor: "#020101", borderRadius: "14px" }}
    >
      <Card
        className="size-card-main-d-f"
        sx={{
          mt: 2,
          mb: 2,
          backgroundColor: "#020101",
          borderRadius: "14px",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          textAlign: "center",
        }}
      >
        <CardContent sx={{ mt: 1, mb: 1 }}>
          <Typography
            className="title-D-F"
            component="div"
            sx={{
              color: "#5782F2",
              fontFamily: "Rustica",
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              mt: 0.2,
              mb: 1.5,
              color: "#E3E8F3",
              fontStyle: "normal",
              fontWeight: "700",
              fontSize: "1.6rem",
            }}
          >
            {data}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
  return box;
}

export function CardCompDateBox(
  title: string,
  formattedDate: string,
  data: string
) {
  const box = (
    <Box
      className="card-with-date-component"
      sx={{ backgroundColor: "#020101", borderRadius: "14px" }}
    >
      <Card
        className="card-with-date-component"
        sx={{
          mt: 1.2,
          mb: 0,
          backgroundColor: "#020101",
          borderRadius: "14px",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          textAlign: "center",
        }}
      >
        <CardContent sx={{ mt: 0, mb: 0 }}>
          <Typography
            className="title-card-with-date-component"
            component="div"
            sx={{
              color: "#5782F2",
              fontFamily: "Rustica",
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            {title}
          </Typography>
          <Typography
            component="div"
            sx={{
              color: "#5782F2",
              fontFamily: "Rustica",
              fontSize: "12px",
              fontWeight: "500",
            }}
          >
            {formattedDate}
          </Typography>
          <Typography
            sx={{
              mt: 0,
              mb: 0,
              color: "#E3E8F3",
              fontStyle: "normal",
              fontWeight: "700",
              fontSize: "1.6rem",
            }}
          >
            {data}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
  return box;
}
