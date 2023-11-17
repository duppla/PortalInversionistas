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

        fetch('https://salesforce-gdrive-conn.herokuapp.com/inversionistas/main/a1?investor=skandia', options)
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

/* data del enpoint para renderizar la grafica por un map */
    const data = dataApi.map(item => ({
        meses: item.fecha.split('-')[1], // Obtener el mes de la fecha actual
        flujo_real: item.flujo_real,
        flujo_esperado: item.flujo_esperado,
    }));


    /* prueba de formateo data a legible */  

   function formatNumber(value: number): string {
        const suffixes = ['', 'K', 'M', 'B', 'T'];
        const suffixNum = Math.floor(('' + value).length / 3);
        let shortValue = (suffixNum !== 0 ? (value / Math.pow(1000, suffixNum)) : value).toFixed(1);
        
        if (shortValue.endsWith('.0')) {
            shortValue = shortValue.slice(0, -2); // Elimina el punto decimal y el cero decimal
        }
    
        return shortValue + (suffixNum > 0 ? ' ' + suffixes[suffixNum] : '');
    }
  /* prueba de formateo data a legible tooltip */  
    function formatNumberTooltip(value: number): string {
        const suffixes = ['', 'K', 'M', 'B', 'T'];
        const suffixNum = Math.floor(('' + value).length / 3);
        let shortValue = (suffixNum !== 0 ? (value / Math.pow(1000, suffixNum)) : value).toFixed(1);
    
        if (shortValue.endsWith('.0')) {
            shortValue = shortValue.slice(0, -2); // Elimina el punto decimal y el cero decimal
        }
    
        return shortValue + (suffixNum > 0 ? ' ' + suffixes[suffixNum] : '');
    }
    
    
    




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
                theme={{
                    axis: {
                        ticks: {
                            text: {
                                fill: 'white', // Color del texto en los ejes
                            },
                        },
                    },
                    legends: {
                        text: {
                            fill: 'white', // Color del texto de las leyendas
                        },
                    },
                    tooltip: {
                        container: {
                            background: 'black', // Fondo del tooltip
                            color: 'white', // Color del texto del tooltip
                        },
                    },
                }}
                
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
                tooltip={({ id, value, color }) => (
                    <div style={{ background: 'black', padding: '8px', borderRadius: '4px', color: 'white' }}>
                        <strong >
                            {id}: {formatNumberTooltip(value)}
                        </strong>
                       {/*  {id === 'flujo_real' && <div style={{ color: 'red' }}>Flujo Real</div>}
                        {id === 'flujo_esperado' && <div style={{ color: 'green' }}>Flujo Esperado</div>} */}
                    </div>
                )}
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
                    format: value => formatNumber(value),                 

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


