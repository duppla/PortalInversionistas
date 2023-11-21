'use client'
import { ResponsiveBar } from '@nivo/bar'
import { useEffect, useState } from 'react';



function truncateValue(value: number): number {
  // Implementa tu lógica de truncamiento aquí
  return Math.floor(value);
}

interface DataApiType {
  fecha: string;
  clientes: number;
  duppla: number;
  inversionistas: number;
  // otras propiedades que los objetos en dataApi pueden tener...
}
const BarChartComponentA2 = () => {

  const [dataApi, setDataApi] = useState<DataApiType[]>([]);

  useEffect(() => {
    const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/2023.5.8' } };

    fetch('https://salesforce-gdrive-conn.herokuapp.com/inversionistas/main/e?investor=skandia', options)
      .then(response => response.json())
      .then(response => {
        console.log(response + 'respuesta endpoint');
        const data = response;
        setDataApi(data);
      })
      .catch(err => console.error(err));
  }, []);



  const meses = dataApi.map((item) => {
    // Obtener solo el mes (por ejemplo, "2023-01-15" -> "01")
    return item.fecha.split('-')[1];
  });

  /* data del enpoint para renderizar la grafica por un map */

  const data = dataApi.map((item) => ({
    meses: Number(item.fecha.split('-')[1]) || 0, // Usa 0 si no es un número válido
    clientes: item.clientes,
    duppla: item.duppla,
    inversionistas: item.inversionistas,
  }));


  const colors: Record<string, string> = {
    clientes: '#28ACFF',
    duppla: '#5ED1B1',
    inversionistas: '#723DFD',
  };

  data.forEach((item: Record<string, any>) => {
    item.color = colors[item.meses];
  });

  const keys = ['duppla', 'clientes', 'inversionistas'];

  const formattedData = data.map((item: Record<string, any>) => {
    const formattedItem: Record<string, any> = { meses: item.meses };
    keys.forEach(key => {
      formattedItem[key] = item[key];
    });
    return formattedItem;
  });

 
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


  console.log('Data para el gráfico:', JSON.stringify(formattedData));

  return (
    <div className='grafica-barcharts nivo-text'>


      <ResponsiveBar
        data={data.filter(item => !isNaN(item.duppla) && !isNaN(item.clientes) && !isNaN(item.inversionistas))}
        keys={['duppla', 'clientes', 'inversionistas']}
        indexBy="meses"
        label={() => ''}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear', min: 0 }}
        indexScale={{ type: 'band', round: true }}
        colors={[ '#5ED1B1', '#28ACFF','#723DFD']} // Define tus propios colores
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

        tooltip={({ id, value, color }) => (
          <div style={{ background: 'black', padding: '8px', borderRadius: '4px', color: '#9B9EAB' }}>
            <strong >
              {id}: {formatNumberTooltip(value)}
            </strong>

          </div>
        )}

        borderRadius={4}
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

export default BarChartComponentA2

