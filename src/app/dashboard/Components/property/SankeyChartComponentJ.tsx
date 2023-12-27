import React from 'react'
import { ResponsiveSankey } from '@nivo/sankey'
import Grid from '@mui/material/Unstable_Grid2';
import { SelectChangeEvent } from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import { Container, Box, Button, ButtonGroup, Typography, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';

/* const darkTheme = {
    background: '#212126',
    axis: {
        domain: {
            line: {
                stroke: '#777777',
                strokeWidth: 1
            }
        },
        ticks: {
            line: {
                stroke: '#777777',
                strokeWidth: 1
            },
            text: {
                fill: '#FFFFFF'
            }
        }
    },
    grid: {
        line: {
            stroke: '#444444',
            strokeWidth: 1
        }
    },
    legends: {
        text: {
            fill: '#AAAAAA'
        }
    },
    tooltip: {
        container: {
            background: '#222222',
            color: '#FFFFFF',
        },
    },
}; */


const SankeyChartComponentJ = () => {

    const dataSnkey = {
        "nodes": [
            {
                "id": "John",
                "nodeColor": "#6C9FFF"
            },
            {
                "id": "Raoul",
                "nodeColor": "#BAFCC5"
            },
            {
                "id": "Jane",
                "nodeColor": "#FF9900"
            },
            {
                "id": "Marcel",
                "nodeColor": "#FFFFBA"
            },
            {
                "id": "Ibrahim",
                "nodeColor": "#F4DCFF"
            },

        ],
        "links": [

            {
                "source": "Raoul",
                "target": "Ibrahim",
                "value": 115
            },
            {
                "source": "Marcel",
                "target": "John",
                "value": 163
            },
            {
                "source": "Marcel",
                "target": "Ibrahim",
                "value": 195
            },
            {
                "source": "Marcel",
                "target": "Jane",
                "value": 194
            },
            {
                "source": "Ibrahim",
                "target": "John",
                "value": 135
            },
            {
                "source": "John",
                "target": "Jane",
                "value": 20
            }
        ]
    }


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
            <ResponsiveSankey
                data={dataSnkey}
                margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
                align="justify"

                /*  colors={['#FFFFBA','#6C9FFF', '#F4DCFF','#FF9900',  '#BAFCC5',]}   */
             colors={{ scheme: 'set2' }} 
              
                nodeOpacity={1}
                nodeHoverOthersOpacity={0.35}
                nodeThickness={18}
                nodeSpacing={24}
                nodeBorderWidth={1}
                /*   nodeBorderColor={{
                      from: 'color',
                      modifiers: [
                          [
                              'darker',
                              0.6
                          ]
                      ]
                  }} */
                nodeBorderColor={{ from: 'color', modifiers: [['brighter', 0.5]] }}
                nodeBorderRadius={3}
                linkOpacity={0.3}
                linkHoverOpacity={0.5}
                linkHoverOthersOpacity={0.2}
                linkContract={4}
                linkBlendMode="hard-light"
                enableLinkGradient={true}
                enableLabels={false}
                labelPadding={16}
                /*     labelTextColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                0.6
                            ]
                        ]
                    }} */
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
                
              /*   theme={darkTheme} */

            /* legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    translateX: 130,
                    itemWidth: 100,
                    itemHeight: 14,
                    itemDirection: 'right-to-left',
                    itemsSpacing: 2,
                    itemTextColor: '#999',
                    symbolSize: 14,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]} */
            />
        </div>
    )
}

export default SankeyChartComponentJ