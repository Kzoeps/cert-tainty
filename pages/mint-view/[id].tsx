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
	Link,
	Skeleton,
	Spinner,
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
import {ABI, CONTRACT_ADDRESS, OPEN_SEA_BASE_API} from '../../models/parchment.constants';
import {SearchIcon} from '@chakra-ui/icons';
import {MetaData, NftAttributes} from '../../models/parchment.models';
import axios from 'axios';
import {FiExternalLink} from 'react-icons/fi';
import {GoCloudDownload} from 'react-icons/go';
import {useMutation} from '@apollo/client';
import {DOWNLOAD_CERTIFICATE} from '../../api/minting.api';
import {downloadFile} from '../../utils/misc-utils.';

export interface MintViewProps {
}

const generateVariable = (value: any) => ({
	variables: {
		attributes: {
			attributes: value
		}
	}
})

export const MintView = (props: MintViewProps) => {
	const router = useRouter();
	const {data: signer} = useSigner();
	const [search, setSearch] = useState('');
	const [certData, setCertData] = useState<undefined | MetaData>(undefined);
	const [openSeaUrl, setOpenSeaUrl] = useState('');
	const [generateCertificateWithQr, {loading}] = useMutation(DOWNLOAD_CERTIFICATE);
	const connectedContract = useContract({
		addressOrName: CONTRACT_ADDRESS,
		contractInterface: ABI,
		signerOrProvider: signer
	});
	const {id, certId} = router.query;
	const handleSearch = () => {
		void router.push(`/mint-view/${search}`);
	};

	const findAttribute = (attributeName: string, attributes: NftAttributes[]): string | undefined => {
		return attributes?.find((attribute) => attribute.trait_type === attributeName)?.value;
	};

	const handleDownload = async () => {
		const result = await generateCertificateWithQr(generateVariable({
			certificateId: certId,
			qrCodeUrl: `https://cert-tainty.vercel.app/mint-view/${id}?=${certId}`
		}));
		const downloadUrl = result?.data?.generateCertificateWithQr?.url;
		downloadFile(downloadUrl);
	}

	useEffect(() => {
		const getUrl = async (tokenId: string) => {
			const parsedId = parseInt(tokenId) - 1;
			const result = await axios.get(`${OPEN_SEA_BASE_API}/asset/${CONTRACT_ADDRESS}/${parsedId}`);
			setOpenSeaUrl(result?.data?.permalink || '');
		};
		if (id) void getUrl(id as string);
	}, [id]);

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

	useEffect(() => {
		return () => {
			setSearch('');
			setCertData(undefined);
		}
	}, [])
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
							<Stack w="100%" bg={'white'} py={2} pl={24} height={440}>
								<Skeleton isLoaded={!!certData?.image}>
									<img width={'88%'} alt="certificate"
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
								<HStack spacing={6}>
									<Skeleton isLoaded={!!openSeaUrl}>
										<Link target="_blank" rel="noreferrer noopener" href={openSeaUrl as string}>
											<Text style={{display: 'flex', gap: '5px'}} decoration={'underline'}>
												View on Open Sea <FiExternalLink style={{marginTop: '3px'}}/>
											</Text>
										</Link>
									</Skeleton>
									<Skeleton isLoaded={!!certId}>
										<Link onClick={handleDownload}>
											{loading ? <Spinner/> :
												<Text style={{display: 'flex', gap: '5px'}} decoration={'underline'}>
													Download certificate <GoCloudDownload style={{marginTop: '3px'}}/>
												</Text>}
										</Link>
									</Skeleton>
								</HStack>
							</Stack>
						</VStack>
					</VStack>
					</Flex>
			</Center>
        </>
    )
}

export default MintView;
