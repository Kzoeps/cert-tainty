import React, { useEffect, useState } from 'react';
import { Card, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/lib/table';
import { Box, Center, CircularProgress, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import BasicStatistics from '../../components/cards/card.component';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis } from 'recharts';
import Example from '../../components/admin-cart/admin.component';

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

const gData = [
    { name: 'Page A', uv: 100, pv: 20, amt: 2500 },
    { name: 'Page B', uv: 300, pv: 2400, amt: 99 },
    { name: 'Page C', uv: 300, pv: 200, amt: 200 },
    { name: 'Page D', uv: 400, pv: 400, amt: 2400 },
    { name: 'Page E', uv: 200, pv: 2400, amt: 2400 }
];


const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        filters: [
            {
                text: 'Joe',
                value: 'Joe',
            },
            {
                text: 'Category 1',
                value: 'Category 1',
            },
            {
                text: 'Category 2',
                value: 'Category 2',
            },
        ],
        filterMode: 'tree',
        filterSearch: true,
        // @ts-ignore
        onFilter: ( value: string, record ) => record.address.startsWith( value ),
        width: '30%',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        sorter: ( a, b ) => a.age - b.age,
    },
    {
        title: 'Address',
        dataIndex: 'address',
        filters: [
            {
                text: <span>London</span>,
                value: 'London',
            },
            {
                text: <span>New York</span>,
                value: 'New York',
            },
        ],
        // @ts-ignore
        onFilter: ( value: string, record ) => record.address.startsWith( value ),
        filterSearch: true,
        width: '40%',
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
];

const onChange: TableProps<DataType>['onChange'] = ( pagination, filters, sorter, extra ) => {
    console.log( 'params', pagination, filters, sorter, extra );
};

const AdminDashboard: React.FC = () => {
    const [ lineData, setData ] = useState<any>( undefined );
    useEffect( () => {
        setData( gData );
    }, [] )
    return (
        <Box>
            <Box m='32px'>
                <Stack direction='row'>
                    <BasicStatistics/>
                </Stack>
            </Box>
            <Center>
                <Box width='90%'>
                    <SimpleGrid columns={ { base: 1, md: 2 } } spacing={ { base: 5, lg: 8 } }>
                        <Card>
                            <Box mb='24px'>
                                <Text fontWeight='18px'>
                                    Total Minting
                                </Text>
                            </Box>
                            { lineData?.length && <LineChart
                                width={ 550 }
                                height={ 400 }
                                data={ lineData }
                                margin={ { top: 5, right: 20, left: 10, bottom: 5 } }
                            >
                                <XAxis dataKey="name"/>
                                <Tooltip/>
                                <CartesianGrid stroke="#f5f5f5"/>
                                <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={ 0 }/>
                                <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={ 1 }/>
                            </LineChart>
                            }
                        </Card>
                        <Card>
                            <SimpleGrid columns={ { base: 1, md: 1 } }>
                                <Box sx={ { width: 'fit-content' } }>
                                    <Text fontSize='18px'>Total Earning</Text>
                                    <Box my='8px'>
                                        <Text fontWeight='bold'>
                                            Nu. 287,493
                                        </Text>
                                        <Text>
                                            1.4% Since Last Month
                                        </Text>
                                    </Box>
                                </Box>
                                <hr/>
                                <Box sx={ { width: 'fit-content' } } my='18px'>
                                    <SimpleGrid>
                                        <Text fontWeight='18px'>
                                            Total Subscription
                                        </Text>
                                        <Box my='12px'>
                                            <Text fontWeight='bold'>
                                                $87,493
                                            </Text>
                                            <Text>
                                                5.43% Since Last Month
                                            </Text>
                                            <Box my='28px'>
                                                <Example/>
                                            </Box>
                                        </Box>
                                    </SimpleGrid>
                                </Box>
                            </SimpleGrid>
                        </Card>
                    </SimpleGrid>
                </Box>
            </Center>
            <Center>
                <Box width='90%' my='24px'>
                    <SimpleGrid columns={ { base: 1, md: 3 } } spacing={ { base: 5, lg: 8 } }>
                        <Card>
                            <SimpleGrid columns={ { base: 1, md: 2 } }>
                                <Box sx={ { width: 'fit-content' } }>
                                    <CircularProgress thickness='4px' value={ 30 } size='70px'/>
                                </Box>
                                <Box sx={ { width: 'fit-content' } }>
                                    <SimpleGrid columns={ { base: 1, md: 1 } } spacing={ { base: 0, lg: 2 } }>
                                        <Box>
                                            Facebook Followers
                                        </Box>
                                        <Box>
                                            22.14% Since Last Week
                                        </Box>
                                    </SimpleGrid>
                                </Box>
                            </SimpleGrid>
                        </Card>
                        <Card>
                            <SimpleGrid columns={ { base: 1, md: 2 } }>
                                <Box sx={ { width: 'fit-content' } }>
                                    <CircularProgress thickness='4px' value={ 30 } size='70px'/>
                                </Box>
                                <Box sx={ { width: 'fit-content' } }>
                                    <SimpleGrid columns={ { base: 1, md: 1 } } spacing={ { base: 0, lg: 2 } }>
                                        <Box>
                                            Facebook Followers
                                        </Box>
                                        <Box>
                                            22.14% Since Last Week
                                        </Box>
                                    </SimpleGrid>
                                </Box>
                            </SimpleGrid>
                        </Card>
                        <Card>
                            <SimpleGrid columns={ { base: 1, md: 2 } }>
                                <Box sx={ { width: 'fit-content' } }>
                                    <CircularProgress thickness='4px' value={ 30 } size='70px'/>
                                </Box>
                                <Box sx={ { width: 'fit-content' } }>
                                    <SimpleGrid columns={ { base: 1, md: 1 } } spacing={ { base: 0, lg: 2 } }>
                                        <Box>
                                            Facebook Followers
                                        </Box>
                                        <Box>
                                            22.14% Since Last Week
                                        </Box>
                                    </SimpleGrid>
                                </Box>
                            </SimpleGrid>
                        </Card>
                    </SimpleGrid>
                </Box>
            </Center><Center>
            <Box width='90%' my='24px'>
                <SimpleGrid columns={ { base: 1, md: 2 } } spacing={ { base: 5, lg: 8 } }>
                    <Card>
                        <Table columns={ columns } dataSource={ data } onChange={ onChange }/>
                    </Card>
                    <Card>
                        <Table columns={ columns } dataSource={ data } onChange={ onChange }/>
                    </Card>
                </SimpleGrid>
            </Box>
        </Center>
            <Center width='100%'>
                <Box width='90%'>
                    <Table columns={ columns } dataSource={ data } onChange={ onChange }/>
                </Box>
            </Center>
        </Box>
    )
};

export default AdminDashboard;