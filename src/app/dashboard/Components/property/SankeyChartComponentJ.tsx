'use client'
import React, { useEffect, useState } from 'react'

import { ResponsiveSankey } from '@nivo/sankey'
import Grid from '@mui/material/Unstable_Grid2';
import { SelectChangeEvent } from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import { Container, Box, Button, ButtonGroup, Typography, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getApiUrl, getApiUrlFinal } from '@/app/url/ApiConfig';
import { useAuth } from '@/app/context/authContext';


type DataApiType = {
    fecha: string;
    pagado: any;
    mora: any;

};
interface Node {
    id: string;
    // otras propiedades...
}

type DataType = {
    ult_12_meses: DataApiType[];
    este_anho: DataApiType[];
    ult_6_meses: DataApiType[];
};

const SankeyChartComponentJ = () => {

    const { userEmail } = useAuth();

    const [dataSnkey, setDataSnkey] = useState<any>(null); // Estado para almacenar la data
    const [responseData, setResponseData] = useState<any>(null);
    const [dataApi, setDataApi] = useState<DataType[]>([]);
    const [selectedDataKeyJ, setSelectedDataKeyJ] = useState<string>('este_anho');
    const [selectedValue, setSelectedValue] = useState<string | number>('este_anho');
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        if (!userEmail) {
            return;
        }
        const queryParameter = userEmail;
        const fetchData = async () => {
            try {
                const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/2023.5.8' } };
                const response = await fetch(getApiUrlFinal(`/inmuebles/j1?email=${queryParameter}`), options);
                const responseData = await response.json();

                const reorderedNodes = ["Ingresos", "Utilidad bruta", "NOI", "Gastos", "Reservas",].map(nodeId => {
                    return responseData.nodes.find((node: Node) => node.id === nodeId);
                });
                const formattedData = {
                    nodes: reorderedNodes.map(node => ({
                        id: node.id,
                        nodeColor: getColor(node),
                    })),
                    links: responseData.links.map((link: any) => ({
                        source: link.source,
                        target: link.target,
                        value: link.value,
                    })),
                };

                setResponseData(responseData);
                setDataSnkey(formattedData);
                setIsLoading(false); // Indicar que los datos se han cargado
            } catch (error) {
                console.error(error);
                setIsLoading(false); // Manejar el estado de carga en caso de error
            }
        };

        fetchData();
    }, [userEmail]);


    // Definir tus escalas de colores verdes y rojos

    const greenScale = ["#1E5631", "#04c437", "#76B17D", "#8fffad"];
    const redScale = ["#a61b1b", "#f18282", "#a61b1b"];

    // Función de color personalizada
    const getColor = (node: any) => {
        const nodeId = typeof node === 'string' ? node : node.id;

        if (nodeId === "Ingresos") {
            return "#8fffad";
        } else if (nodeId === "Utilidad bruta") {
            return "#76B17D";
        } else if (nodeId === "NOI") {
            return "#04c437";
        } else if (nodeId === "Gastos") {
            return "#FF1818";
        } else if (nodeId === "Reservas") {
            return "#f18282";
        }

        return '#cccccc';
    };


    const formatValue = (value: any) => {
        if (value >= 1000000) {
            return `${(value / 1000000).toFixed(1)}M`;
        } else if (value >= 1000) {
            // Si el valor es mayor o igual a 1000, formatearlo en mil
            return `${(value / 1000).toFixed(0)} Mil`;
        } else {
            // Si el valor es menor que 1000, mostrarlo tal como está
            return value.toString();
        }
    };


    return (
        <div className='grafica-barcharts-des nivo-text'>
            <div>
                <FormControl fullWidth>
                    <Grid container spacing={2} alignItems="center" sx={{ borderBottom: '1px solid #9B9EAB' }}>
                        <Grid xs={6} md={6} lg={6}>
                            <Typography className='title-dropdown-menu-container' variant="subtitle1" sx={{ fontFamily: 'Helvetica', fontWeight: 300, color: '#ffffff', fontSize: '26px', mt: 2 }}>Pérdidas y Ganancias portafolio</Typography>
                        </Grid>
                        <Grid xs={6} md={6} lg={6} sx={{ textAlign: 'end' }}>

                        </Grid>
                    </Grid>
                </FormControl>
            </div>
            <Typography variant="subtitle1" sx={{ fontFamily: 'Helvetica', fontWeight: 300, color: '#ffffff', fontSize: '18px', mt: 2 }}>Mes actual</Typography>
            {dataSnkey && (
                <ResponsiveSankey
                    data={dataSnkey}
                    margin={{ top: 20, right: 50, bottom: 80, left: 50 }}
                    align="justify"

                    /*  colors={['#FFFFBA','#6C9FFF', '#F4DCFF','#FF9900',  '#BAFCC5',]}   */
                    /*   colors={{ scheme: 'set2' }} */
                    colors={getColor}

                    nodeOpacity={1}
                    nodeHoverOthersOpacity={0.35}
                    nodeThickness={18}
                    nodeSpacing={24}
                    nodeBorderWidth={1}

                    nodeBorderColor={{ from: 'color', modifiers: [['brighter', 0.5]] }}
                    nodeBorderRadius={3}
                    linkOpacity={0.3}
                    linkHoverOpacity={0.5}
                    linkHoverOthersOpacity={0.2}
                    linkContract={4}
                    linkBlendMode="screen"
                    enableLinkGradient={true}
                    enableLabels={true}
                    labelPadding={16}
                    labelOrientation="horizontal"
                    /* Tooltip para la grafica */

                    nodeTooltip={({
                        node
                    }) => <div style={{ backgroundColor: 'black', color: '#9B9EAB', padding: '10px' }}>
                            <div style={{ backgroundColor: node.color, width: '10px', height: '10px', display: 'inline-block', marginRight: '5px' }}></div>
                            <strong>{node.label}</strong>
                            <br />
                            {formatValue(node.value)}

                        </div>} linkTooltip={({
                            link
                        }) => <div style={{ backgroundColor: 'black', color: '#9B9EAB', padding: '10px' }}>
                                <p>  <strong>{link.source.label}</strong> a <strong>{link.target.label}</strong></p>
                                <div style={{ backgroundColor: link.color, width: '10px', height: '10px', display: 'inline-block', marginRight: '5px' }}></div>
                                {formatValue(link.value)}
                            </div>
                        }

                    layout='horizontal'
                    labelTextColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                0.1
                            ]
                        ]
                    }}

                    theme={{
                        axis: {
                            ticks: {
                                text: {
                                    fill: '#9B9EAB', // Color del texto en los ejes
                                },
                            },
                        },
                        legends: {
                            text: {
                                fill: '#9B9EAB', // Color del texto de las leyendas
                            },
                        },
                        tooltip: {
                            container: {
                                background: 'black', // Fondo del tooltip
                                color: '#9B9EAB', // Color del texto del tooltip
                            },
                        },
                    }}

                    legends={[
                        {
                            anchor: 'bottom-left',
                            direction: 'row',
                            translateX: 30,
                            translateY: 28,
                            itemWidth: 100,
                            itemHeight: 14,
                            itemDirection: 'left-to-right',
                            itemsSpacing: 2,
                            itemTextColor: '#999',
                            symbolShape: 'square',
                            symbolSize: 14,/* 
                             textSize: 20, */
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemTextColor: '#cccccc'
                                    }
                                }
                            ],

                        }


                    ]}

                />
            )}
        </div>
    );
}

export default SankeyChartComponentJ