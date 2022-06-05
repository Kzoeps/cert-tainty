import React, { useEffect, useState } from 'react';
import {
    AreaChart,
    XAxis,
    CartesianGrid,
    YAxis,
    Tooltip, Area
} from 'recharts';
import { TOTAL_EARNING } from '../../pages/admin-dashboard/admin.constant';



export default function Example() {
    const [ lineData, setData ] = useState<any>( undefined );
    useEffect( () => {
        setData( TOTAL_EARNING );
    }, [] )
    return (
            <>
                {
                    lineData?.length && <AreaChart width={600} height={250} data={lineData}
                               margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                        <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                    </AreaChart>
                }
            </>
        );
}