import {
    Box,
    Flex,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { BsPerson } from 'react-icons/bs';
import { MdOutlinePersonAddDisabled } from 'react-icons/md';
import { FaCloudDownloadAlt } from 'react-icons/fa';
import { FiUserCheck } from 'react-icons/fi';
import { UserData } from '../admin-components/admin.model';
import { useQuery } from '@apollo/client';
import { QUERY_PROFILES_STATUS } from '../../api/admin.api';

interface StatsCardProps {
    title: string;
    stat: string;
    icon: ReactNode;
    color: string;
    subTitle: string;
}
function StatsCard(props: StatsCardProps) {
    const { title, stat, icon, color, subTitle } = props;
    return (
        <Box width='310px'>
            <Stat
                px={{ base: 2, md: 4 }}
                py={'5'}
                boxShadow='lg'
                rounded={'lg'}>
                <Flex justifyContent={'space-between'}>
                    <Box pl={{ base: 2, md: 4 }}>
                        <StatLabel color={color} fontWeight={'small'} >
                            {title}
                        </StatLabel>
                        <StatNumber color={color} fontSize={'2xl'} fontWeight={'small'}>
                            {stat}
                        </StatNumber>
                        <StatNumber color={color} fontSize={'10px'} fontWeight={'light'}>
                            {subTitle}
                        </StatNumber>
                    </Box>
                    <Box
                        my={'auto'}
                        color={useColorModeValue('gray.800', 'gray.200')}
                        alignContent={'center'}>
                        {icon}
                    </Box>
                </Flex>
            </Stat>
        </Box>
    );
}

export default function BasicStatistics(props: {data: any}) {
    const { data  } = useQuery(QUERY_PROFILES_STATUS);
    return (
        <Box maxW="7xl" mx={'auto'} pt={2} px={{ base: 2, sm: 12, md: 17 }}>
            <SimpleGrid columns={{ base: 4, md: 4}} spacing={{ base: 5, lg: 8 }}>
                <StatsCard
                    color='blue.300'
                    title={'Institutions'}
                    stat={data?.profiles[0]?.approvedCount}
                    subTitle='32.78% Increase Since Last Week'
                    icon={<BsPerson color='#63B3ED' size={'3em'} />}
                />
                <StatsCard
                    color='green.500'
                    title={'Accepted Institutions'}
                    stat={data?.profiles[0]?.approvedCount}
                    subTitle='16.24% Increase Since Last Week'
                    icon={<FiUserCheck color='#38A169' size={'3em'} />}
                />
                <StatsCard
                    color='red.500'
                    title={'Rejected Institutions'}
                    stat={data?.profiles[0]?.rejectedCount}
                    subTitle='3% Increase Since Last Week'
                    icon={<MdOutlinePersonAddDisabled color='#E53E3E' size={'3em'} />}
                />
                <StatsCard
                    color='black.500'
                    title={'NFT Mint'}
                    stat={'120'}
                    subTitle='12.14% Increase Since Last Week'
                    icon={<FaCloudDownloadAlt size={'3em'} color='#cccccc' />}
                />
            </SimpleGrid>
        </Box>
    );
}
