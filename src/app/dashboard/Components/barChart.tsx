'use client'
import { ResponsiveBar } from '@nivo/bar'

function truncateValue(value: number): number {
    // Implementa tu lógica de truncamiento aquí
    return Math.floor(value);
}


function barChart() {

    const data = [
        {
            "country": "AD",
            "hot dog": 56,
            "hot dogColor": "hsl(149, 70%, 50%)",
            "burger": 153,
            "burgerColor": "hsl(9, 70%, 50%)",
            "sandwich": 177,
            "sandwichColor": "hsl(135, 70%, 50%)",
            "kebab": 84,
            "kebabColor": "hsl(154, 70%, 50%)",
            "fries": 5,
            "friesColor": "hsl(248, 70%, 50%)",
            "donut": 0,
            "donutColor": "hsl(232, 70%, 50%)"
        },
        {
            "country": "AE",
            "hot dog": 185,
            "hot dogColor": "hsl(52, 70%, 50%)",
            "burger": 171,
            "burgerColor": "hsl(173, 70%, 50%)",
            "sandwich": 66,
            "sandwichColor": "hsl(320, 70%, 50%)",
            "kebab": 59,
            "kebabColor": "hsl(6, 70%, 50%)",
            "fries": 188,
            "friesColor": "hsl(9, 70%, 50%)",
            "donut": 176,
            "donutColor": "hsl(20, 70%, 50%)"
        },
        {
            "country": "AF",
            "hot dog": 24,
            "hot dogColor": "hsl(246, 70%, 50%)",
            "burger": 95,
            "burgerColor": "hsl(309, 70%, 50%)",
            "sandwich": 98,
            "sandwichColor": "hsl(224, 70%, 50%)",
            "kebab": 129,
            "kebabColor": "hsl(112, 70%, 50%)",
            "fries": 183,
            "friesColor": "hsl(339, 70%, 50%)",
            "donut": 88,
            "donutColor": "hsl(146, 70%, 50%)"
        },
        {
            "country": "AG",
            "hot dog": 187,
            "hot dogColor": "hsl(232, 70%, 50%)",
            "burger": 91,
            "burgerColor": "hsl(305, 70%, 50%)",
            "sandwich": 26,
            "sandwichColor": "hsl(2, 70%, 50%)",
            "kebab": 107,
            "kebabColor": "hsl(335, 70%, 50%)",
            "fries": 157,
            "friesColor": "hsl(23, 70%, 50%)",
            "donut": 188,
            "donutColor": "hsl(343, 70%, 50%)"
        },
        {
            "country": "AI",
            "hot dog": 101,
            "hot dogColor": "hsl(230, 70%, 50%)",
            "burger": 68,
            "burgerColor": "hsl(165, 70%, 50%)",
            "sandwich": 118,
            "sandwichColor": "hsl(106, 70%, 50%)",
            "kebab": 88,
            "kebabColor": "hsl(296, 70%, 50%)",
            "fries": 77,
            "friesColor": "hsl(119, 70%, 50%)",
            "donut": 73,
            "donutColor": "hsl(195, 70%, 50%)"
        },
        {
            "country": "AL",
            "hot dog": 107,
            "hot dogColor": "hsl(205, 70%, 50%)",
            "burger": 143,
            "burgerColor": "hsl(28, 70%, 50%)",
            "sandwich": 187,
            "sandwichColor": "hsl(182, 70%, 50%)",
            "kebab": 74,
            "kebabColor": "hsl(250, 70%, 50%)",
            "fries": 3,
            "friesColor": "hsl(28, 70%, 50%)",
            "donut": 42,
            "donutColor": "hsl(137, 70%, 50%)"
        },
        {
            "country": "AM",
            "hot dog": 152,
            "hot dogColor": "hsl(162, 70%, 50%)",
            "burger": 166,
            "burgerColor": "hsl(79, 70%, 50%)",
            "sandwich": 28,
            "sandwichColor": "hsl(24, 70%, 50%)",
            "kebab": 135,
            "kebabColor": "hsl(249, 70%, 50%)",
            "fries": 62,
            "friesColor": "hsl(100, 70%, 50%)",
            "donut": 22,
            "donutColor": "hsl(354, 70%, 50%)"
        }
    ]

    return (
        <div className='grafica-barcharts'>
            <ResponsiveBar
                data={data}
                keys={[
                    'hot dog',
                    'burger',
                    'sandwich',
                    'kebab',
                    'fries',
                    'donut'
                ]}
                indexBy="country"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'nivo' }}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: '#38bcb2',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: '#eed312',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
                fill={[
                    {
                        match: {
                            id: 'fries'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'sandwich'
                        },
                        id: 'lines'
                    }
                ]}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.6
                        ]
                    ]
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'country',
                    legendPosition: 'middle',
                    legendOffset: 32,

                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'food',
                    legendPosition: 'middle',
                    legendOffset: -40,

                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.6
                        ]
                    ]
                }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
                role="application"
                ariaLabel="Nivo bar chart demo"
                barAriaLabel={e => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
            />

        </div>
    )
}

export default barChart


