"use client";
import React from "react";
import { Container, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import BarChartFlujos from "./Components/BarChartFlujos";
import BarChartPropiedad from "./Components/BarChartPropiedad";
import LineChartHistMora from "./Components/LineChartHistMora";
import PieChartCompCartera from "./Components/PieChartCompCartera";
import LineChartRentabilidad from "./Components/LineChartRentabilidad";
import { chartBlocks } from "./Components/ChartBlocks";
import MapMapa from "./Components/MapMapa";
import TablePyG from "./Components/TablePyG";
import LineChartUnidades from "./Components/LineChartUnidades";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CardCompBox, CardCompDateBox } from "./Components/CardComps";

import { formatNumber } from "./Components/utils";

const theme = createTheme({
    palette: {
        primary: {
            main: "#ffffff",
            light: "#E8E9F2",
            dark: "#9B9EAB",
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            main: "#ffffff",
            light: "#FFFFFF",
            // dark: will be calculated from palette.secondary.main,
            contrastText: "#47008F",
        },
    },
});

type Inmueble = {
    codigo: string;
    ciudad: string;
    latitud: number;
    longitud: number;
    estrato: string;
    valor_compra: number;
    barrio: string;
};

type Mapa = {
    ciudad: string;
    inmuebles: Inmueble[];
}

export type Inversion = {
    inversion_original: number;
    participacion_adquirida: number;
    fechas: string[];
    retorno_a_la_fecha: number[];
    devolucion_capital_acumulado: number[];
    flujo_ejecutado: number[];
    porcentaje_propiedad_portafolio: number[];
    porcentaje_propiedad_cliente: number[];
    porcentaje_propiedad_duppla: number[];
    porcentaje_pago_tarde: number[];
    rentabilidad_mensual_portafolio: number[];
    rentabilidad_anual_portafolio: number[];
    adelanto: number[];
    cartera_en_mora_30: number[];
    cartera_en_mora_60: number[];
    cartera_en_mora_90: number[];
    valor_inmuebles_contractual: number[];
    renta: number[];
    interes: number[];
    administracion_positivo: number[];
    venta_total: number[];
    reduccion_de_cartera: number[];
    impuesto: number[];
    administracion_negativo: number[];
    seguro: number[];
    mantenimiento: number[];
    capex: number[];
    fee_duppla: number[];
    fee_fiducia: number[];
    opex: number[];
    noi: number[];
    reserva_predial: number[];
    reserva_mantenimiento: number[];
    reserva_capex: number[];
    noi_ajustado: number[];
    numero_unidades: number[];
    mapa: Mapa[];
};

const PageGenerator = (data: Inversion) => {

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    flexGrow: 1,
                    mt: 1,
                    ml: 1,
                    mr: 1,
                    borderRadius: "20px",
                    overflow: "hidden",
                }}
            >
                <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }} className="">
                    {/* primera fila  componente D*/}
                    <Grid
                        container
                        className="size-card-main"
                        sx={{
                            mb: 5,
                            display: "flex",
                            justifyContent: "center",
                            justifyItems: "center",
                            backgroundColor: "#212126",
                            borderRadius: "20px",
                            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                            p: 0.5,
                        }}
                        columnGap={3}
                        rowGap={1}
                    >
                        <Grid xs={12} sm={12} md={3} lg={2.5} sx={{}}>
                            <CardCompBox title="Inversión original" data={data ? "$ " + data.inversion_original.toLocaleString("es-co") : ""} />
                        </Grid>
                        <Grid xs={12} sm={12} md={3} lg={2.5} sx={{}}>
                            <CardCompBox title="Participación adquirida" data={data ? formatNumber(data.participacion_adquirida, 1, true) : ""} />
                        </Grid>
                        <Grid xs={12} sm={12} md={3} lg={2.5} sx={{}}>
                            <CardCompBox title="Retorno total a la fecha" data={data ? "$ " + data.retorno_a_la_fecha.reduce((a, b) => a + b, 0).toLocaleString("es-co") : ""} />
                        </Grid>
                        <Grid xs={12} sm={12} md={3} lg={2.5} sx={{}}>
                            <CardCompBox title="Devolución capital a la fecha" data={data ? "$ " + Math.round(data.devolucion_capital_acumulado.slice(-1)[0]).toLocaleString("es-co") : ""} />
                        </Grid>
                    </Grid>
                    {chartBlocks(<LineChartRentabilidad fechas={data ? data.fechas : []} rentabilidad={data ? data.rentabilidad_mensual_portafolio : []} />, 310, 290, 2)}
                    {chartBlocks(<BarChartFlujos fechas={data ? data.fechas : []} flujo={data ? data.flujo_ejecutado : []} adelanto={data ? data.adelanto : []} reduccion_cartera={data ? data.reduccion_de_cartera : []} noi_ajustado={data ? data.noi_ajustado : []} />, 430, 410, 2)}
                    {chartBlocks(<BarChartPropiedad fechas={data ? data.fechas : []} porc_prop_portafolio={data ? data.porcentaje_propiedad_portafolio : []} porc_prop_cliente={data ? data.porcentaje_propiedad_cliente : []} porc_prop_duppla={data ? data.porcentaje_propiedad_duppla : []} />, 430, 410)}
                    {/* Componente G */}
                    <Grid
                        container
                        sx={{
                            marginTop: "10px",
                            display: "flex",
                            justifyContent: "center",
                            justifyItems: "center",
                            width: "100%",
                            height: "auto",
                            borderRadius: "20px",
                            /* boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', */
                            mt: 2,
                        }}
                        columnGap={5}
                        rowGap={1}
                    >
                        <Grid
                            className="container-G"
                            xs={12}
                            sm={12}
                            md={5.5}
                            lg={7}
                            sx={{
                                borderRadius: "10px",
                                backgroundColor: "#212126",
                                mt: 2,
                                mb: 2,
                                p: 2,
                            }}
                        >
                            <LineChartHistMora fechas={data ? data.fechas : []} tasa_mora={data ? data.porcentaje_pago_tarde : []} />
                        </Grid>
                        <Grid
                            className=""
                            xs={12}
                            sm={12}
                            md={5.5}
                            lg={4.5}
                            sx={{
                                borderRadius: "10px",
                                backgroundColor: "#212126",
                                mt: 2,
                                mb: 2,
                                p: 4,
                            }}
                        >
                            <PieChartCompCartera mora_30={data ? data.cartera_en_mora_30.slice(-1)[0] : 0} mora_60={data ? data.cartera_en_mora_60.slice(-1)[0] : 0} mora_90={data ? data.cartera_en_mora_90.slice(-1)[0] : 0} />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        className="size-card-main-f"
                        sx={{
                            marginTop: "20px",
                            display: "flex",
                            justifyContent: "center",
                            justifyItems: "center",
                            backgroundColor: "#212126",
                            borderRadius: "20px",
                            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                            mt: 4,
                            mb: 4,
                            p: 1,
                        }}
                        columnGap={10}
                        rowGap={1}
                    >
                        <Grid xs={12} sm={12} md={3} lg={3} sx={{}}>
                            <CardCompDateBox title="NOI" fecha={data ? data.fechas.slice(-1)[0] : ""} value={data ? "$ " + data.noi.slice(-1)[0].toLocaleString("es-co") : ""} />
                        </Grid>
                        <Grid xs={12} sm={12} md={3} lg={3} sx={{}}>
                            <CardCompDateBox title="Tasa de morosidad" fecha={data ? data.fechas.slice(-1)[0] : ""} value={data ? formatNumber(data.porcentaje_pago_tarde.slice(-1)[0], 1, true) : ""} />
                        </Grid>
                        <Grid xs={9} sm={12} md={3} lg={3} sx={{}}>
                            <CardCompDateBox title="Adelanto" fecha={data ? data.fechas.slice(-1)[0] : ""} value={data ? "$ " + data.adelanto.slice(-1)[0].toLocaleString("es-co") : ""} />
                        </Grid>
                    </Grid>
                    {chartBlocks(<MapMapa mapa={data ? data.mapa : []} />, 640, 460, 2)}
                    {chartBlocks(<TablePyG fechas={data ? data.fechas : []} opex={data ? data.opex : []} reserva_predial={data ? data.reserva_predial : []} reserva_mantenimiento={data ? data.reserva_mantenimiento : []} reserva_capex={data ? data.reserva_capex : []} noi_ajustado={data ? data.noi_ajustado : []} noi={data ? data.noi : []} venta_total={data ? data.venta_total : []} reduc_cartera={data ? data.reduccion_de_cartera : []} />, 460)}
                    {chartBlocks(<LineChartUnidades fechas={data ? data.fechas : []} num_unidades={data ? data.numero_unidades : []} />, 320, 300, 2)}
                </Container>
            </Box>
        </ThemeProvider>
    )
}

export default PageGenerator;