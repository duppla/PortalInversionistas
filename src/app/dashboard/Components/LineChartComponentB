'use client'

import React, { useEffect, useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

interface DataItem {
    name: string;
    uv: number;
    pv: number;
    amt: number;
}

interface LabelProps {
    x: number;
    y: number;
    stroke: string;
    value: number;
}

interface AxisTickProps {
    x: number;
    y: number;
    stroke: string;
    payload: { value: string };
}
interface DataApiType {
    fecha: string;
    valor_contable: number;
    flujo_esperado: number;
    valor_simulado: number;
    // otras propiedades que los objetos en dataApi pueden tener...
}



const RechartsExample: React.FC = () => {

    const [dataSource, dataSourceSet] = useState<DataApiType[]>([]);

    useEffect(() => {
        const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/2023.5.8' } };

        fetch('https://salesforce-gdrive-conn.herokuapp.com/inversionistas/prueba_lineas?investor=skandia%40duppla.co', options)
            .then(response => response.json())
            .then(response => {
                dataSourceSet(response);
                /* console.log(JSON.stringify(response + 'prueba de data componete b')); */
            })
            .catch(err => console.error(err));
    }, []);


    const transformedData = dataSource.map((item) => ({
        fecha: new Date(item.fecha).toLocaleDateString(),
        valor_contable: item.valor_contable,
        valor_simulado: item.valor_simulado,
    }));

    console.log(JSON.stringify(transformedData) + 'transformedData');


    return (
        <ResponsiveContainer className='ChartContainerSizeManager' width={1020} height={480}>

            <LineChart
                width={1000}
                height={300}
                data={transformedData}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="6 6" /* vertical={false} */ />
                <XAxis dataKey="fecha" height={80} tickFormatter={(fecha) => fecha} />
                <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />

                <YAxis tickFormatter={(value) => `${(Number(value) / 1000000).toFixed(0)}M`} />

                <Tooltip
                    contentStyle={{ backgroundColor: 'black', border: 'none', color: 'white' }}
                   
                    formatter={(value, name, props) => {
                        return [`${(Number(value) / 1000000).toFixed(0)}M`, name];
                    }}
                />

                <Line connectNulls type="monotone" dataKey="valor_contable" stroke="#FF864B" name="Valor Contable" animationDuration={0} />
                <Line connectNulls type="monotone" dataKey="valor_simulado" stroke="#C5F5CA" name="Valor Simulado" animationDuration={0} />


                {/*        <Line connectNulls type="monotone" dataKey="valor_contable" stroke="#FF864B" name="Valor Contable" />
                <Line connectNulls type="monotone" dataKey="valor_simulado" stroke="#C5F5CA" name="Valor Simulado" /> */}
            </LineChart>
            {/*   </ResponsiveContainer> */}
        </ResponsiveContainer>
    );
};

export default RechartsExample;

