import {
	Box,
	Button,
	Center,
	Flex,
	Heading,
	HStack,
	Input,
	InputGroup,
	InputLeftElement,
	Stack,
	Text,
	VStack
} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Image from 'next/image';
import {FaUserAlt} from 'react-icons/fa';
import {BsFillBookFill, BsFillCalendarDateFill} from 'react-icons/bs';
import {MdDescription} from 'react-icons/md';
import {AiFillBook} from 'react-icons/ai';
import {useContract, useSigner} from 'wagmi';
import {ABI, CONTRACT_ADDRESS} from '../../models/parchment.constants';
import {SearchIcon} from '@chakra-ui/icons';

export interface MintViewProps {
}

export const MintView = (props: MintViewProps) => {
	const router = useRouter();
	const {data: signer} = useSigner();
	const [search, setSearch] = useState('');
	const [certData, setCertData] = useState(undefined);
	const connectedContract = useContract({
		addressOrName: CONTRACT_ADDRESS,
		contractInterface: ABI,
		signerOrProvider: signer
	});
	const {id} = router.query;
	const handleSearch = () => {
		void router.push(`/mint-view/${search}`);
	}
	useEffect(() => {
		const getTokenUri = async (tokenId: string) => {
			// const turi = parseInt(tokenId);
			// const tokenUri = await connectedContract.tokenURI(turi);
			// console.log(tokenId);
		};
		if (id) void getTokenUri(id as string);
	}, [id, connectedContract]);
	return (
		<>
			<Center w="100%" bg="gray.50">
				<Flex minH="100vh" align="center" justify="center" bg="gray.50">
					<VStack mt={8} mb={12}>
						<HStack w={'3xl'} mb={6} pl={0}>
							<InputGroup>
								<InputLeftElement
									pointerEvents="none"><SearchIcon color="black"/></InputLeftElement>
								<Input onChange={(val) => { setSearch(val.target.value) } } boxShadow={'md'} bg={'white'} variant='filled' type="tel" placeholder="Certificate ID"/>
							</InputGroup>
							<Button
								/* flex={1} */
								onClick={handleSearch}
								px={4}
								fontSize={'sm'}
								bg={'green.400'}
								color={'white'}
								boxShadow={
									'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
								}
								_hover={{
									bg: 'green.500'
								}}
								_focus={{
									bg: 'green.500'
								}}>
								Search
							</Button>
						</HStack>
						<VStack w="3xl" rounded={'lg'} boxShadow={'lg'} mt={4} mb={4} bg={'white'}>
							<Stack  w="100%" bg={'white'} py={2} height={460}>
								<Image width={400} height={450} alt="certificate"
									   src="https://lh3.googleusercontent.com/WbJWwZMuL-gPBsr7ins1cbKYVr-sQqSmpmkZdVsEfV9F_jmYqu3laqnbQ6uYTKB17fAie24I2Q9uclfCHhUhJ3ceDqx4BeNU69okJlU=s0"/>
							</Stack>
							<Stack as={Box} w={'100%'} h={300} py={4} pl={10} pr={10} bg="#F9F9F9"
								   textAlign={'left'}>
								<Flex gap={2}>
									<FaUserAlt style={{marginTop: '3px', color: '#48BB78'}} size={'18px'}/> <Heading
									as="h4" size={'md'}>Name</Heading>
								</Flex>
								<Text fontSize="lg">
									Karma Zoepa Yoezer
								</Text>
								<Flex gap={2}>
									<AiFillBook style={{marginTop: '3px', color: '#48BB78'}} size={'18px'}/> <Heading
									as="h4" size={'md'}>Major</Heading>
								</Flex>
								<Text fontSize="lg">
									Computer Science
								</Text>
								<Flex gap={2}>
									<BsFillCalendarDateFill style={{marginTop: '3px', color: '#48BB78'}} size={'18px'}/> <Heading
									as="h4" size={'md'}>Date Awarded</Heading>
								</Flex>
								<Text fontSize="lg">
									2022-05-14
								</Text>
								<Flex gap={2}>
									<MdDescription style={{marginTop: '3px', color: '#48BB78'}} size={'20px'}/> <Heading
									as="h4" size={'md'}>Description</Heading>
								</Flex>
								<Text fontSize="lg">
									Graduated With summa cum laude
								</Text>
								{/*<Text decoration={'underline'}>
								<Flex gap={2}>
									View on open sea <FiExternalLink style={{marginTop: '3px'}}/>
								</Flex>
							</Text>*/}
							</Stack>
						</VStack>
					</VStack>
					</Flex>
			</Center>
        </>
    )
}

export default MintView;
