import React, { ReactNode } from "react";
import { colorsCard } from '../Styles/colors'
import { ResponsiveLine } from "@nivo/line";

interface Props {
    data: any[],
    children?: ReactNode;
    formatter?: any,
    axisY?: string,
    axisX?: string,
    colors?: string[]
}

export default function LineChart({
    data,
    formatter,
    axisY = "Monto (COP)",
    axisX = "Mes",
    colors = ['#C5F5CA', '#97AAFD', '#FFA971', '#C3CFFE']
}: Props) {
    return (
        <div className="h-96 w-full">
            <ResponsiveLine
                data={data}
                theme={{
                    "text": {
                        "fontSize": 11,
                        "fill": "#eef4ff",
                        "outlineWidth": 0,
                        "outlineColor": "transparent"
                    },
                    "axis": {
                        "domain": {
                            "line": {
                                "stroke": "#777777",
                                "strokeWidth": 1
                            }
                        },
                        "legend": {
                            "text": {
                                "fontSize": 12,
                                "fill": "#eef4ff",
                                "outlineWidth": 0,
                                "outlineColor": "#eef4ff"
                            }
                        },
                        "ticks": {
                            "line": {
                                "stroke": "#777777",
                                "strokeWidth": 1
                            },
                            "text": {
                                "fontSize": 11,
                                "fill": "#eef4ff",
                                "outlineWidth": 0,
                                "outlineColor": "transparent"
                            }
                        }
                    },
                    "grid": {
                        "line": {
                            "stroke": "#4f576a",
                            "strokeWidth": 1
                        }
                    },
                    "legends": {
                        "title": {
                            "text": {
                                "fontSize": 11,
                                "fill": "#eef4ff",
                                "outlineWidth": 0,
                                "outlineColor": "transparent"
                            }
                        },
                        "text": {
                            "fontSize": 11,
                            "fill": "#333333",
                            "outlineWidth": 0,
                            "outlineColor": "transparent"
                        },
                        "ticks": {
                            "line": {},
                            "text": {
                                "fontSize": 10,
                                "fill": "#333333",
                                "outlineWidth": 0,
                                "outlineColor": "transparent"
                            }
                        }
                    },
                    "annotations": {
                        "text": {
                            "fontSize": 13,
                            "fill": "#333333",
                            "outlineWidth": 2,
                            "outlineColor": "#ffffff",
                            "outlineOpacity": 1
                        },
                        "link": {
                            "stroke": "#000000",
                            "strokeWidth": 1,
                            "outlineWidth": 2,
                            "outlineColor": "#ffffff",
                            "outlineOpacity": 1
                        },
                        "outline": {
                            "stroke": "#000000",
                            "strokeWidth": 2,
                            "outlineWidth": 2,
                            "outlineColor": "#ffffff",
                            "outlineOpacity": 1
                        },
                        "symbol": {
                            "fill": "#000000",
                            "outlineWidth": 2,
                            "outlineColor": "#ffffff",
                            "outlineOpacity": 1
                        }
                    },
                    "tooltip": {
                        "wrapper": {},
                        "container": {
                            "background": "#000c29",
                            "color": "#eef4ff",
                            "fontSize": 12
                        },
                        "basic": {},
                        "chip": {},
                        "table": {},
                        "tableCell": {},
                        "tableCellValue": {}
                    }
                }}
                margin={{ top: 20, right: 10, bottom: 60, left: 80 }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: false,
                    reverse: false
                }}
                yFormat={formatter}
                curve="catmullRom"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: axisX,
                    legendOffset: 36,
                    legendPosition: 'middle',
                    truncateTickAt: 0
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: axisY,
                    legendOffset: -70,
                    legendPosition: 'middle',
                    truncateTickAt: 0,
                    format: formatter
                }}
                pointSize={7}
                pointColor="#4F576A"
                colors={colors}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabel="data.yFormatted"
                pointLabelYOffset={-12}
                enableArea={true}
                areaOpacity={0.1}
                enableTouchCrosshair={true}
                enableSlices="x"
                areaBaselineValue={0}
            />
        </div>
    );
}
