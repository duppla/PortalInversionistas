'use client'
import { ResponsiveBar } from '@nivo/bar'
import { useEffect, useState } from 'react';



function truncateValue(value: number): number {
  // Implementa tu lógica de truncamiento aquí
  return Math.floor(value);
}

interface DataApiType {
  fecha: string;
  arriendo: number;
  compra_venta: number;
  prepago: number;
  // otras propiedades que los objetos en dataApi pueden tener...
}
const BarChartComponentA2 = () => {

  const [dataApi, setDataApi] = useState<DataApiType[]>([]);

  useEffect(() => {
    const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/2023.5.8' } };

    fetch('https://salesforce-gdrive-conn.herokuapp.com/inversionistas/main/a2?investor=skandia', options)
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
  /*  const data = dataApi.map(item => ({
     meses: item.fecha.split('-')[1], // Obtener el mes de la fecha actual
     compra_venta: Number(item.compra_venta) || 0,
     prepago: Number(item.prepago) || 0,
     arriendo: Number(item.arriendo) || 0,
   })); */

  const data = dataApi.map((item) => ({
    meses: Number(item.fecha.split('-')[1]) || 0, // Usa 0 si no es un número válido
    compra_venta: item.compra_venta,
    prepago: item.prepago,
    arriendo: item.arriendo,
  }));


  const colors: Record<string, string> = {
    compra_venta: '#6C6FFF',
    prepago: '#C5F5CA',
    arriendo: '#FF864B',
  };

  data.forEach((item: Record<string, any>) => {
    item.color = colors[item.meses];
  });

  const keys = ['compra_venta', 'prepago', 'arriendo'];

  const formattedData = data.map((item: Record<string, any>) => {
    const formattedItem: Record<string, any> = { meses: item.meses };
    keys.forEach(key => {
      formattedItem[key] = item[key];
    });
    return formattedItem;
  });

  const dataNivo = [
    {
      "country": "AD",
      "hot dog": 114,
      "hot dogColor": "hsl(205, 70%, 50%)",
      "burger": 39,
      "burgerColor": "hsl(291, 70%, 50%)",
      "sandwich": 42,
      "sandwichColor": "hsl(254, 70%, 50%)",
      "kebab": 64,
      "kebabColor": "hsl(320, 70%, 50%)",
      "fries": 15,
      "friesColor": "hsl(69, 70%, 50%)",
      "donut": 155,
      "donutColor": "hsl(11, 70%, 50%)"
    },
    {
      "country": "AE",
      "hot dog": 84,
      "hot dogColor": "hsl(250, 70%, 50%)",
      "burger": 46,
      "burgerColor": "hsl(151, 70%, 50%)",
      "sandwich": 57,
      "sandwichColor": "hsl(239, 70%, 50%)",
      "kebab": 130,
      "kebabColor": "hsl(311, 70%, 50%)",
      "fries": 69,
      "friesColor": "hsl(121, 70%, 50%)",
      "donut": 177,
      "donutColor": "hsl(277, 70%, 50%)"
    },
    {
      "country": "AF",
      "hot dog": 7,
      "hot dogColor": "hsl(260, 70%, 50%)",
      "burger": 36,
      "burgerColor": "hsl(21, 70%, 50%)",
      "sandwich": 4,
      "sandwichColor": "hsl(112, 70%, 50%)",
      "kebab": 199,
      "kebabColor": "hsl(276, 70%, 50%)",
      "fries": 31,
      "friesColor": "hsl(242, 70%, 50%)",
      "donut": 37,
      "donutColor": "hsl(256, 70%, 50%)"
    },
    {
      "country": "AG",
      "hot dog": 196,
      "hot dogColor": "hsl(171, 70%, 50%)",
      "burger": 142,
      "burgerColor": "hsl(312, 70%, 50%)",
      "sandwich": 2,
      "sandwichColor": "hsl(83, 70%, 50%)",
      "kebab": 93,
      "kebabColor": "hsl(67, 70%, 50%)",
      "fries": 39,
      "friesColor": "hsl(317, 70%, 50%)",
      "donut": 107,
      "donutColor": "hsl(164, 70%, 50%)"
    },
    {
      "country": "AI",
      "hot dog": 174,
      "hot dogColor": "hsl(311, 70%, 50%)",
      "burger": 145,
      "burgerColor": "hsl(320, 70%, 50%)",
      "sandwich": 50,
      "sandwichColor": "hsl(155, 70%, 50%)",
      "kebab": 59,
      "kebabColor": "hsl(192, 70%, 50%)",
      "fries": 149,
      "friesColor": "hsl(79, 70%, 50%)",
      "donut": 147,
      "donutColor": "hsl(349, 70%, 50%)"
    },
    {
      "country": "AL",
      "hot dog": 41,
      "hot dogColor": "hsl(29, 70%, 50%)",
      "burger": 25,
      "burgerColor": "hsl(333, 70%, 50%)",
      "sandwich": 119,
      "sandwichColor": "hsl(4, 70%, 50%)",
      "kebab": 194,
      "kebabColor": "hsl(79, 70%, 50%)",
      "fries": 175,
      "friesColor": "hsl(342, 70%, 50%)",
      "donut": 5,
      "donutColor": "hsl(344, 70%, 50%)"
    },
    {
      "country": "AM",
      "hot dog": 38,
      "hot dogColor": "hsl(39, 70%, 50%)",
      "burger": 124,
      "burgerColor": "hsl(241, 70%, 50%)",
      "sandwich": 159,
      "sandwichColor": "hsl(246, 70%, 50%)",
      "kebab": 169,
      "kebabColor": "hsl(213, 70%, 50%)",
      "fries": 126,
      "friesColor": "hsl(300, 70%, 50%)",
      "donut": 193,
      "donutColor": "hsl(221, 70%, 50%)"
    }
  ]


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
        data={data.filter(item => !isNaN(item.compra_venta) && !isNaN(item.prepago) && !isNaN(item.arriendo))}
        keys={['compra_venta', 'prepago', 'arriendo']}
        indexBy="meses"
        label={() => ''}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear', min: 0 }}
        indexScale={{ type: 'band', round: true }}
        colors={['#6C6FFF', '#5ED1B1', '#00B383']} // Define tus propios colores
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

