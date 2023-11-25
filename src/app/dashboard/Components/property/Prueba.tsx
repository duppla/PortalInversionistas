import { useEffect, useState, ReactNode } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { SelectChangeEvent } from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FormControl, Typography, Select, MenuItem } from '@mui/material';
import { ResponsiveLine } from '@nivo/line';


type DataApiType = {
    fecha: string;
    fair_market_price: number;
};


type DataType = {
    ult_12_meses: DataApiType[];
    este_anho: DataApiType[];
    ult_6_meses: DataApiType[];
};

interface Item {
    [key: string]: any;
    fecha: string;
    fair_market_price: number | null;
}

const LineChartComponentH2 = () => {
    const [data, setData] = useState<DataType>({ ult_12_meses: [], este_anho: [], ult_6_meses: [] });
    const [selectedDataKey, setSelectedDataKey] = useState<string>('este_anho');
    const [selectedValue, setSelectedValue] = useState<string | number>('este_anho');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/2023.5.8' } };
                const response = await fetch('https://salesforce-gdrive-conn.herokuapp.com/inversionistas/inmuebles/b?investor=skandia', options);
                const data = await response.json();
                setData(data);
                handleDataSelection(selectedValue.toString());
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [selectedValue]);

    const handleDataSelection = (dataKey: string) => {
        setSelectedDataKey(dataKey);
    };

    const handleSelectChange = (event: SelectChangeEvent<string | number>) => {
        const selectedOption = event.target.value as string;
        setSelectedValue(selectedOption);
        handleDataSelection(selectedOption);
    };

    const tranformeDataApi = (data: DataType, selectedDataKey: string) => {
        return (data[selectedDataKey as keyof DataType] as DataApiType[]).map((item) => ({
            x: item.fecha,
            y: item.fair_market_price,
        }));
    };



    const tranformedData = tranformeDataApi(data, selectedDataKey);



    return (
        <div className='grafica-barcharts nivo-text'>
            <div>
                <FormControl fullWidth>
                    <Grid container spacing={2} alignItems="center" sx={{ borderBottom: '1px solid #9B9EAB' }}>
                        <Grid xs={6} md={6} lg={6}>
                            <Typography variant="subtitle1" sx={{ color: '#ffffff' }}>Número de unidades</Typography>
                        </Grid>
                        <Grid xs={6} md={6} lg={6} sx={{ textAlign: 'end' }}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedValue}
                                label="Age"
                                onChange={handleSelectChange}
                                sx={{
                                    color: '#9B9EAB',
                                    justifyContent: 'flex-end',
                                    textAlign: 'end',
                                    fill: '#ffffff',
                                    '&.MuiSelect-icon': { color: '#FFFFFF !important' },
                                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                    '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                }}
                            >
                                <MenuItem value='este_anho'>Este año</MenuItem>
                                <MenuItem value='ult_6_meses'>Últimos 6 meses</MenuItem>
                                <MenuItem value='ult_12_meses'>Últimos 12 meses</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                </FormControl>
            </div>

            <ResponsiveLine
              animate
              axisBottom={{
                format: '.%L',
                legend: 'time scale',
                legendOffset: -12,
                tickValues: 'every 10 milliseconds'
              }}
              axisLeft={{
                legend: 'linear scale',
                legendOffset: 12
              }}
              curve="monotoneX"
              data={[
                {
                  data: [
                    {
                      x: '2018-01-01 12:00:01.100',
                      y: 7
                    },
                    {
                      x: '2018-01-01 12:00:01.110',
                      y: 5
                    },
                    {
                      x: '2018-01-01 12:00:01.120',
                      y: 11
                    },
                    {
                      x: '2018-01-01 12:00:01.130',
                      y: 9
                    },
                    {
                      x: '2018-01-01 12:00:01.140',
                      y: 12
                    },
                    {
                      x: '2018-01-01 12:00:01.150',
                      y: 16
                    },
                    {
                      x: '2018-01-01 12:00:01.160',
                      y: 13
                    },
                    {
                      x: '2018-01-01 12:00:01.170',
                      y: 13
                    }
                  ],
                  id: 'signal A'
                },
                {
                  data: [
                    {
                      x: '2018-01-01 12:00:01.100',
                      y: 14
                    },
                    {
                      x: '2018-01-01 12:00:01.110',
                      y: 14
                    },
                    {
                      x: '2018-01-01 12:00:01.120',
                      y: 15
                    },
                    {
                      x: '2018-01-01 12:00:01.130',
                      y: 11
                    },
                    {
                      x: '2018-01-01 12:00:01.140',
                      y: 10
                    },
                    {
                      x: '2018-01-01 12:00:01.150',
                      y: 12
                    },
                    {
                      x: '2018-01-01 12:00:01.160',
                      y: 9
                    },
                    {
                      x: '2018-01-01 12:00:01.170',
                      y: 7
                    }
                  ],
                  id: 'signal B'
                }
              ]}
              enablePointLabel
              height={400}
              margin={{
                bottom: 60,
                left: 80,
                right: 20,
                top: 20
              }}
              pointBorderColor={{
                from: 'color',
                modifiers: [
                  [
                    'darker',
                    0.3
                  ]
                ]
              }}
              pointBorderWidth={1}
              pointSize={16}
              pointSymbol={function noRefCheck(){}}
              useMesh
              width={900}
              xFormat="time:%Y-%m-%d %H:%M:%S.%L"
              xScale={{
                format: '%Y-%m-%d %H:%M:%S.%L',
                precision: 'millisecond',
                type: 'time',
                useUTC: false
              }}
              yScale={{
                type: 'linear'
              }}

              /*   animate
                axisBottom={{
                    format: '%b %d',
                   
                    legendOffset: -12,
                    tickValues: 'every month'
                }}
                axisLeft={{
                  
                    legendOffset: 12,


                }}
                theme={{
                    axis: {
                        ticks: {
                            text: {
                                fill: '#9B9EAB' // Cambia aquí al color que desees para el texto de las marcas en el eje Y
                            }
                        }
                    }
                }}
                lineWidth={6}
                curve="monotoneX"
                data={[
                    {
                        data: tranformedData,

                        id: 'Unidades'
                    }
                ]}
                colors={['#5ED1B1','#28ACFF']}
                enablePointLabel={false}

                margin={{
                    bottom: 60,
                    left: 80,
                    right: 20,
                    top: 20
                }}
                pointBorderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            0.3
                        ]
                    ]
                }}
                pointBorderWidth={1}
                pointSize={16}
                pointSymbol={function noRefCheck() { }}
                useMesh

                xFormat="time:%Y-%m-%d"
                xScale={{
                    format: '%Y-%m-%d',
                    precision: 'day',
                    type: 'time',
                    useUTC: false
                }}
                yScale={{
                    type: 'linear'
                }} */
            />

        </div>
    );
};

export default LineChartComponentH2;


