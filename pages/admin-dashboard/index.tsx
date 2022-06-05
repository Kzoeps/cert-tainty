import React, { useEffect, useState } from 'react';
import { Card, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/lib/table';
import { Box, Center, CircularProgress, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import BasicStatistics from '../../components/cards/card.component';
import Example from '../../components/admin-components/admin.component';
import { DataType } from './admin.model';
import { TABLE_DUMMY } from './admin.constant';
import TotalEarningComponent from '../../components/admin-components/admin-total-earning.component';
import { TableComponent } from '../../components/table/table.component';


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
        title: 'Email',
        dataIndex: 'email',
        // sorter: ( a, b ) => a.age - b.age,
    },
    {
        title: 'Institution Name',
        dataIndex: 'institutionName'
    },
    {
        title: 'Institution Type',
        dataIndex: 'institutionType'
    }
];


const onChange: TableProps<DataType>['onChange'] = ( pagination, filters, sorter, extra ) => {
    console.log( 'params', pagination, filters, sorter, extra );
};

const AdminDashboard: React.FC = () => {
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
                                <Heading fontSize='18px'>
                                    Total Minting
                                </Heading>
                            </Box>
                            <TotalEarningComponent/>
                        </Card>
                        <Card>
                            <SimpleGrid columns={ { base: 1, md: 1 } }>
                                <Box sx={ { width: 'fit-content' } }>
                                    <Heading fontSize='18px'>
                                        Total Earning
                                    </Heading>
                                    <Box my='8px'>
                                        <Text fontWeight='bold' fontSize='12px'>
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
                                        <Heading fontSize='18px'>
                                            Total Subscription
                                        </Heading>
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
            </Center>
            <Center>
            <Box width='90%' my='24px'>
                <SimpleGrid columns={ { base: 1, md: 2 } } spacing={ { base: 5, lg: 8 } }>
                    <Card>
                        <Box my='12px'>
                            <Heading fontSize='18px'>
                                Total Accepted
                            </Heading>
                        </Box>
                        <Table columns={ columns } dataSource={ TABLE_DUMMY } onChange={ onChange }/>
                    </Card>
                    <Card>
                        <Box my='12px'>
                            <Heading fontSize='18px'>
                                Total Rejected
                            </Heading>
                        </Box>
                        <Table columns={ columns } dataSource={ TABLE_DUMMY } onChange={ onChange }/>
                    </Card>
                </SimpleGrid>
            </Box>
        </Center>
            <Center width='100%'>
                <Box width='90%'>
                    <Card>
                        <Heading as='h4' size='md' my='12px'>
                            INSTITUTION
                        </Heading>
                        <TableComponent/>
                    </Card>
                </Box>
            </Center>
        </Box>
    )
};

export default AdminDashboard;