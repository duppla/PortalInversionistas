'use client'
import { ResponsiveBar } from '@nivo/bar'
import { useEffect, useState } from 'react';


function truncateValue(value: number): number {
    // Implementa tu lógica de truncamiento aquí
    return Math.floor(value);
}

interface DataApiType {
    fecha: string;
    flujo_real: number;
    flujo_esperado: number;
    // otras propiedades que los objetos en dataApi pueden tener...
}

function BarChart() {


    const [dataApi, setDataApi] = useState<DataApiType[]>([]);

    useEffect(() => {
        const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/2023.5.8' } };

        fetch('https://salesforce-gdrive-conn.herokuapp.com/inversionistas/prueba_barras?investor=skandia%40duppla.co', options)
            .then(response => response.json())
            .then(response => {
                console.log(response + 'respuesta endpoint');
                const data = response;
                setDataApi(data);
            })

            .catch(err => console.error(err));
    }, []);

    const fecha = dataApi.map((item) => item.fecha);
    const flujo_real = dataApi.map((item) => item.flujo_real);
    const flujo_esperado = dataApi.map((item) => item.flujo_esperado);
    console.log(fecha + 'fecha' + '' + flujo_real + 'flujo real' + '' + flujo_esperado);

    const meses = dataApi.map((item) => {
        // Obtener solo el mes (por ejemplo, "2023-01-15" -> "01")
        return item.fecha.split('-')[1];
    });




    const data = [
        {
            "meses": meses[0],
            "flujo_real": flujo_real[0],
            "flujo_esperado": flujo_esperado[0],
        },
        {
            "meses": meses[1],
            "flujo_real": flujo_real[1],
            "flujo_esperado": flujo_esperado[1],
        },
        {
            "meses": meses[2],
            "flujo_real": flujo_real[2],
            "flujo_esperado": flujo_esperado[2],
        },
        {
            "meses": meses[3],
            "flujo_real": flujo_real[3],
            "flujo_esperado": flujo_esperado[3],
        },
        {
            "meses": meses[4],
            "flujo_real": flujo_real[4],
            "flujo_esperado": flujo_esperado[4],
        },
        {
            "meses": meses[5],
            "flujo_real": flujo_real[5],
            "flujo_esperado": flujo_esperado[5],
        },
        {
            "meses": meses[6],
            "flujo_real": flujo_real[6],
            "flujo_esperado": flujo_esperado[6],
        },
        {
            "meses": meses[7],
            "flujo_real": flujo_real[7],
            "flujo_esperado": flujo_esperado[7],
        },
        {
            "meses": meses[8],
            "flujo_real": flujo_real[8],
            "flujo_esperado": flujo_esperado[8],
        },
        {
            "meses": meses[9],
            "flujo_real": flujo_real[9],
            "flujo_esperado": flujo_esperado[9],
        },
        {
            "meses": meses[10],
            "flujo_real": flujo_real[10],
            "flujo_esperado": flujo_esperado[10],
        },
        {
            "meses": meses[11],
            "flujo_real": flujo_real[11],
            "flujo_esperado": flujo_esperado[11],
        },
    ]

    return (
        <div className='grafica-barcharts nivo-text'>
            <ResponsiveBar
                data={data}
                keys={['flujo_real', 'flujo_esperado']}

                indexBy="meses"
                label={() => ''}
                
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                groupMode="grouped"
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={['#6C6FFF', '#C5F5CA']} // Define tus propios colores
                
               /*  defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: '#000000',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: '#333333',
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
                ]} */

                defs={[
                    {
                      id: 'text',
                      type: 'text',
                      color: 'white',
                    },
                  ]}
                  fill={[{ match: { id: 'text' }, id: 'text' }]}

                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.4
                        ]
                    ]
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendPosition: 'middle',
                    legendOffset: 32,
                    
                    format: value => {
                        // Puedes personalizar el formato de los ticks si es necesario
                        // Por ejemplo, para mostrar "Ene", "Feb", "Mar"...
                        const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
                        return months[value - 1]; // Restar 1 porque los meses generalmente van de 1 a 12
                    }
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
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

export default BarChart


