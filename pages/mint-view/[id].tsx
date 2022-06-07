import {
	Box, Button,
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
						<HStack w={'100%'} mb={6} pl={4}>
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
									bg: 'green.500',
								}}
								_focus={{
									bg: 'green.500',
								}}>
								Search
							</Button>
						</HStack>
						<HStack rounded="xl" w="4xl" pl={4} mt={4} mb={4} bg={'gray.50'} spacing={2}>
							<Stack boxShadow="lg" w="55%" border={'1px'} bg={'white'} py={2} height={710}
								   borderColor={'gray.200'} borderStyle={'block'} rounded={'lg'}>
								<Image width={400} height={700} alt="certificate"
									   src="https://lh3.googleusercontent.com/lbBYOkRPvDaOZm2xBhsvTtwE9nubmUmL7FA5UjTDDZIXsxwpf5e5bjeUfhrNF95WNefnvoCLlwcWfhe6X_5_qRvR2ZIeYOIR7I5a=w600"/>
							</Stack>
							<Stack as={Box} w={'45%'} boxShadow={'lg'} h={710} py={4} pl={4} bg="white" rounded={'lg'}
								   border={'1px'} borderColor={'gray.200'} borderStyle={'block'} textAlign={'left'}>
								<Flex gap={2}>
									<FaUserAlt style={{marginTop: '3px', color: 'gray'}} size={'18px'}/> <Heading
									as="h4" size={'md'}>Name</Heading>
								</Flex>
								<Text fontSize="lg">
									Karma Zoepa Yoezer
								</Text>
								<Heading as="h4" size="md">
									Major
								</Heading>
								<Text fontSize="lg">
									Computer Science
								</Text>
								<Heading as="h4" size="md">
									Date Awarded
								</Heading>
								<Text fontSize="lg">
									2022-05-14
								</Text>
								<Heading as="h4" size="md">
									Description
								</Heading>
								<Text fontSize="lg">
									Graduated With summa cum laude
								</Text>
								{/*<Text decoration={'underline'}>
								<Flex gap={2}>
									View on open sea <FiExternalLink style={{marginTop: '3px'}}/>
								</Flex>
							</Text>*/}
							</Stack>
						</HStack>
					</VStack>
					</Flex>
			</Center>
        </>
    )
}

export default MintView;
