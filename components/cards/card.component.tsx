import {
    Box,
    chakra,
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

interface StatsCardProps {
    title: string;
    stat: string;
    icon: ReactNode;
    color: string
}
function StatsCard(props: StatsCardProps) {
    const { title, stat, icon, color } = props;
    return (
        <Box width='310px'>
            <Stat
                px={{ base: 2, md: 4 }}
                py={'5'}
                boxShadow='lg'
                rounded={'lg'}>
                <Flex justifyContent={'space-between'}>
                    <Box pl={{ base: 2, md: 4 }}>
                        <StatLabel color={color} fontWeight={'small'} isTruncated>
                            {title}
                        </StatLabel>
                        <StatNumber color={color} fontSize={'2xl'} fontWeight={'small'}>
                            {stat}
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

export default function BasicStatistics() {
    return (
        <Box maxW="7xl" mx={'auto'} pt={2} px={{ base: 2, sm: 12, md: 17 }}>
            <SimpleGrid columns={{ base: 4, md: 4}} spacing={{ base: 5, lg: 8 }}>
                <StatsCard
                    color='blue.300'
                    title={'Users'}
                    stat={'5,000'}
                    icon={<BsPerson color='#63B3ED' size={'3em'} />}
                />
                <StatsCard
                    color='green.500'
                    title={'Accepted User'}
                    stat={'1,000'}
                    icon={<FiUserCheck color='#38A169' size={'3em'} />}
                />
                <StatsCard
                    color='red.500'
                    title={'Rejected User'}
                    stat={'74'}
                    icon={<MdOutlinePersonAddDisabled color='#E53E3E' size={'3em'} />}
                />
                <StatsCard
                    color='yellow.400'
                    title={'NFT Mint'}
                    stat={'11,117'}
                    icon={<FaCloudDownloadAlt size={'3em'} color='#ECC94B' />}
                />
            </SimpleGrid>
        </Box>
    );
}
