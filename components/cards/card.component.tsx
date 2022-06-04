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
import { FiServer } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';

interface StatsCardProps {
    title: string;
    stat: string;
    icon: ReactNode;
}
function StatsCard(props: StatsCardProps) {
    const { title, stat, icon } = props;
    return (
        <Stat
            px={{ base: 2, md: 4 }}
            py={'5'}
            shadow={'xl'}
            border={'1px solid'}
            borderColor={useColorModeValue('gray.800', 'gray.500')}
            rounded={'lg'}>
            <Flex justifyContent={'space-between'}>
                <Box pl={{ base: 2, md: 4 }}>
                    <StatLabel fontWeight={'medium'} isTruncated>
                        {title}
                    </StatLabel>
                    <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
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
    );
}

export default function BasicStatistics() {
    return (
        <Box maxW="7xl" mx={'auto'} pt={2} px={{ base: 2, sm: 12, md: 17 }}>
            <SimpleGrid columns={{ base: 4, md: 4 }} spacing={{ base: 5, lg: 8 }}>
                <StatsCard
                    title={'Users'}
                    stat={'5,000'}
                    icon={<BsPerson size={'3em'} />}
                />
                <StatsCard
                    title={'Accepted User'}
                    stat={'1,000'}
                    icon={<FiServer size={'3em'} />}
                />
                <StatsCard
                    title={'Rejected User'}
                    stat={'7'}
                    icon={<GoLocation size={'3em'} />}
                />
                <StatsCard
                    title={'NFT'}
                    stat={'7'}
                    icon={<GoLocation size={'3em'} />}
                />
            </SimpleGrid>
        </Box>
    );
}
