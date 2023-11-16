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
    // otras propiedades que los objetos en dataApi pueden tener...
}

const data: DataItem[] = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

const CustomizedLabel: React.FC<LabelProps> = ({ x, y, stroke, value }) => {
    return (
        <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
            {value}
        </text>
    );
};

const CustomizedAxisTick: React.FC<AxisTickProps> = ({ x, y, stroke, payload }) => {
    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
                {payload.value}
            </text>
        </g>
    );
};

const RechartsExample: React.FC = () => {

    const [dataSource, dataSourceSet] = useState<DataApiType[]>([]);

    useEffect(() => {
        const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/2023.5.8' } };

        fetch('https://salesforce-gdrive-conn.herokuapp.com/inversionistas/prueba_lineas?investor=skandia%40duppla.co', options)
            .then(response => response.json())
            .then(response => {
                dataSourceSet(response);
                console.log(JSON.stringify(response + 'prueba de data componete b'));
            })
            .catch(err => console.error(err));
    }, []);

    let datep = dataSource.map((item) => item.fecha);
    let valorContable = dataSource.map((item) => item.valor_contable);
    let flujoEsperado = dataSource.map((item) => item.flujo_esperado);
    console.log(datep + 'fecha' + '' + valorContable + 'valor contable' + '' + flujoEsperado);

    const transformedData = dataSource.map((item) => ({
        name: item.fecha,
        valor_contable: item.valor_contable,
        flujo_esperado: item.flujo_esperado,
        /* valor_simulado: item.valor_simulado || 0, */ // Valor simulado o 0 si no está presente
    }));


    return (
        <ResponsiveContainer className='ChartContainerSizeManager' width={720} height={480}>
            <LineChart
                width={900}
                height={400}
                data={transformedData}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" height={60} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="valor_contable" stroke="#FF864B" name="Valor Contable" />
        <Line type="monotone" dataKey="flujo_esperado" stroke="#C5F5CA" name="Flujo Esperado" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default RechartsExample;

