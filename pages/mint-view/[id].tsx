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
	Skeleton,
	Stack,
	Text,
	VStack
} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {FaUserAlt} from 'react-icons/fa';
import {BsFillCalendarDateFill} from 'react-icons/bs';
import {MdDescription} from 'react-icons/md';
import {AiFillBook} from 'react-icons/ai';
import {useContract, useSigner} from 'wagmi';
import {ABI, CONTRACT_ADDRESS} from '../../models/parchment.constants';
import {SearchIcon} from '@chakra-ui/icons';
import {MetaData, NftAttributes} from '../../models/parchment.models';

export interface MintViewProps {
}

export const MintView = (props: MintViewProps) => {
	const router = useRouter();
	const {data: signer} = useSigner();
	const [search, setSearch] = useState('');
	const [certData, setCertData] = useState<undefined | MetaData>(undefined);
	const connectedContract = useContract({
		addressOrName: CONTRACT_ADDRESS,
		contractInterface: ABI,
		signerOrProvider: signer
	});
	const {id} = router.query;
	const handleSearch = () => {
		void router.push(`/mint-view/${search}`);
	};

	const findAttribute = (attributeName: string, attributes: NftAttributes[]): string | undefined => {
		return attributes?.find((attribute) => attribute.trait_type === attributeName)?.value;
	};

	useEffect(() => {
		const getTokenUri = async (tokenId: string) => {
			const turi = parseInt(tokenId) - 1;
			const tokenUri = await connectedContract.tokenURI(turi);
			const response = await fetch(tokenUri);
			const metaData = await response.json();
			setCertData(metaData);
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
							<Stack w="100%" bg={'white'} py={2} height={460}>
								<Skeleton isLoaded={!!certData?.image}>
									<img width={400} height={450} alt="certificate"
										 src={certData?.image as string}/>
								</Skeleton>
							</Stack>
							<Stack as={Box} w={'100%'} h={300} py={4} pl={10} pr={10} bg="#F9F9F9"
								   textAlign={'left'}>
								<Skeleton isLoaded={!!certData?.name}>
									<Flex gap={2}>
										<FaUserAlt style={{marginTop: '3px', color: '#48BB78'}} size={'18px'}/> <Heading
										as="h4" size={'md'}>Name</Heading>
									</Flex>
									<Text fontSize="lg">
										{certData?.name}
									</Text>
								</Skeleton>
								<Skeleton isLoaded={!!certData?.attributes}>
									<Flex gap={2}>
										<AiFillBook style={{marginTop: '3px', color: '#48BB78'}} size={'18px'}/>
										<Heading
											as="h4" size={'md'}>Major</Heading>
									</Flex>
									<Text fontSize="lg">
										{findAttribute('Major', certData?.attributes || []) ?? ''}
									</Text>
								</Skeleton>
								<Skeleton isLoaded={!!certData?.attributes}>
									<Flex gap={2}>
										<BsFillCalendarDateFill style={{marginTop: '3px', color: '#48BB78'}}
																size={'18px'}/>
										<Heading
											as="h4" size={'md'}>Date Awarded</Heading>
									</Flex>
									<Text fontSize="lg">
										{findAttribute('Date Awarded', certData?.attributes || []) ?? ''}
									</Text>
								</Skeleton>
								<Skeleton isLoaded={!!certData?.description}>
									<Flex gap={2}>
										<MdDescription style={{marginTop: '3px', color: '#48BB78'}} size={'20px'}/>
										<Heading
											as="h4" size={'md'}>Description</Heading>
									</Flex>
									<Text fontSize="lg">
										{certData?.description ?? ''}
									</Text>
								</Skeleton>
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
