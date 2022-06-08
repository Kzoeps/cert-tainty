import React from 'react';
import { Card } from 'antd';
import type { TableProps } from 'antd/lib/table';
import { Box, Center, CircularProgress, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import BasicStatistics from '../../components/cards/card.component';
import Example from '../../components/admin-components/admin.component';
import TotalEarningComponent from '../../components/admin-components/admin-total-earning.component';
import { TableComponent } from '../../components/table/table.component';
import { useQuery } from '@apollo/client';
import { QUERY_PROFILES_STATUS } from '../../api/admin.api';
import { RejectedComponent } from '../../components/table/rejected.component';
import Head from 'next/head';

const AdminDashboard: React.FC = () => {
    const {data: APPROVE, error: approveError, loading: approveLoading}  = useQuery(QUERY_PROFILES_STATUS, {
        variables: {
            kycStatus: 'approved'
        }
    });
    const {data: Reject, error: rejectError, loading: rejectLoading}  = useQuery(QUERY_PROFILES_STATUS, {
        variables: {
            kycStatus: 'rejected'
        }
    });
    const {data: PROGRESS, error: progressError, loading: loadingError}  = useQuery(QUERY_PROFILES_STATUS, {
        variables: {
            kycStatus: 'in_progress'
        }
    });
    const data = {
        approve: APPROVE,
        Reject,
        PROGRESS
    }
    return (
		<>
			<Head>
				<title>Admin Dashboard</title>
			</Head>
        <Box>
            <Box m='32px'>
                <Stack direction='row'>
                    <BasicStatistics data={ data }/>
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
                                    <CircularProgress thickness='4px' color='pink.400' value={ 40 } size='70px'/>
                                </Box>
                                <Box sx={ { width: 'fit-content' } }>
                                    <SimpleGrid columns={ { base: 1, md: 1 } } spacing={ { base: 0, lg: 2 } }>
                                        <Box>
                                            <Heading fontSize='18px'>
                                                Colleges Joined
                                            </Heading>
                                        </Box>
                                        <Box>
                                            6.09% Since Last Week
                                        </Box>
                                    </SimpleGrid>
                                </Box>
                            </SimpleGrid>
                        </Card>
                        <Card>
                            <SimpleGrid columns={ { base: 1, md: 2 } }>
                                <Box sx={ { width: 'fit-content' } }>
                                    <CircularProgress thickness='4px' color='red.400' value={ 12 } size='70px'/>
                                </Box>
                                <Box sx={ { width: 'fit-content' } }>
                                    <SimpleGrid columns={ { base: 1, md: 1 } } spacing={ { base: 0, lg: 2 } }>
                                        <Box>
                                            <Heading fontSize='18px'>
                                                Schools Joined
                                            </Heading>
                                        </Box>
                                        <Box>
                                            16.14% Since Last Week
                                        </Box>
                                    </SimpleGrid>
                                </Box>
                            </SimpleGrid>
                        </Card>
                        <Card>
                            <SimpleGrid columns={ { base: 1, md: 2 } }>
                                <Box sx={ { width: 'fit-content' } }>
                                    <CircularProgress thickness='4px' color='green.400' value={ 22 } size='70px'/>
                                </Box>
                                <Box sx={ { width: 'fit-content' } }>
                                    <SimpleGrid columns={ { base: 1, md: 1 } } spacing={ { base: 0, lg: 2 } }>
                                        <Box>
                                            <Heading fontSize={'18px'}>Others</Heading>
                                        </Box>
                                        <Box>
                                            12.14% Since Last Week
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
                <SimpleGrid columns={ { base: 1, md: 2 } } spacing={ { base: 5, lg: 4 } }>
                    <Card>
                        <Box my='12px'>
                            <Heading fontSize='18px'>
                                Total Accepted
                            </Heading>
                        </Box>
                        <RejectedComponent profiles={APPROVE?.profiles}/>
                    </Card>
                    <Card>
                        <Box my='12px'>
                            <Heading fontSize='18px'>
                                Total Rejected
                            </Heading>
                        </Box>
                        <RejectedComponent profiles={Reject?.profiles}/>
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
                        <TableComponent profiles={PROGRESS?.profiles}/>
                    </Card>
                </Box>
            </Center>
        </Box>
		</>
    )
};

export default AdminDashboard;
