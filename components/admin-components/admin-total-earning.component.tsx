import React, { useEffect, useState } from 'react';
import { TOTAL_MINT } from '../../pages/admin-dashboard/admin.constant';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis } from 'recharts';

export function TotalEarningComponent () {
    const [ lineData, setData ] = useState<any>( undefined );
    useEffect( () => {
        setData( TOTAL_MINT );
    }, [] );

    return (
        <>
            { lineData?.length && <LineChart
                width={ 550 }
                height={ 400 }
                data={ lineData }
                margin={ { top: 5, right: 20, left: 10, bottom: 5 } }
            >
                <XAxis dataKey="name"/>
                <Tooltip/>
                <CartesianGrid stroke="#f5f5f5"/>
                <Line type="monotone" dataKey="college" stroke="#ff7300" yAxisId={ 0 }/>
                <Line type="monotone" dataKey="school" stroke="#387908" yAxisId={ 1 }/>
            </LineChart>
            }
        </>
    )
}

export default TotalEarningComponent;