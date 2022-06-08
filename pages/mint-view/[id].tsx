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
			qrCodeUrl: openSeaUrl
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
			<Flex direction={'column'} alignItems='center' justifyContent={'center'} my={5}>
						<HStack w={'60%'} pl={0}>
							<InputGroup>
								<InputLeftElement
									pointerEvents="none"><SearchIcon color="black"/></InputLeftElement>
								<Input onChange={(val) => { setSearch(val.target.value) } } boxShadow={'md'} bg={'white'} border={'1px'} variant='outline' type="tel" placeholder="Certificate ID" size='md'/>
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
						<Flex w="100%" rounded={'lg'} boxShadow={'lg'} my={5} bg={'white'}>
							<Stack w="100%" bg={'white'} py={2} pl={24} h={'70%'}>
								{certData?.image  ? <img width={'100%'} height={'70%'} alt="certificate"
										 src={certData?.image as string}/> : <Spinner style={{position: 'absolute', left: '50%', top: '50%'}}/>}
							</Stack>
							<Flex direction={'column'}  justifyContent={'center'} as={Box} bg={'white'} w={'50%'} h={'100%'} mt={20} py={4} pl={10} pr={10} 
								   textAlign={'left'}>
								<Flex direction={'column'}>
									<Skeleton isLoaded={!!certData?.name} mt={6}> 
										<Flex gap={2} fontSize="3xl">
											<Heading as="h4">Name:</Heading>
											<Text  fontSize="3xl">
											{certData?.name}
										</Text>
										</Flex>									
									</Skeleton>
									<Skeleton isLoaded={!!certData?.attributes} mt={8}>
										<Flex gap={2}>
											<Heading
												as="h4" size={'md'}>Major:
											</Heading>
											<Text fontSize="lg">
											{findAttribute('Major', certData?.attributes || []) ?? ''}
											</Text>
										</Flex>
									</Skeleton>
									<Skeleton isLoaded={!!certData?.attributes} mt={8}>
										<Flex gap={2}>
											<Heading
												as="h4" size={'md'}>Date Awarded:</Heading>
											<Text fontSize="lg">
											{findAttribute('Date Awarded', certData?.attributes || []) ?? ''}
											</Text>
										</Flex>
										
									</Skeleton>
									<Skeleton isLoaded={!!certData?.description} mt={8}>
										<Flex gap={2}>
											<Heading
												as="h4" size={'md'}>Description:</Heading>
											<Text fontSize="lg">
											{certData?.description ?? ''}
										</Text>
										</Flex>
										
									</Skeleton>
								</Flex>
								<HStack spacing={6} mt={8}>
									<Skeleton isLoaded={!!openSeaUrl}>
										<Link target="_blank" rel="noreferrer noopener" href={openSeaUrl as string}>
											<Button
											 bg={'green.400'}
											color={'white'} 
											_hover={{ bg: 'green.500' }}
											rightIcon={<FiExternalLink/>}>
											View on Open Sea
											</Button>
										</Link>
									</Skeleton>
									{!!certId &&
										<Skeleton isLoaded={!!openSeaUrl}>
											<Link onClick={handleDownload}>
												{loading ? <Spinner/> :
													<Button
											 		color={'green.400'}
													 variant='outline'
													rightIcon={<GoCloudDownload/>}>
													Download certificate
													</Button>
													}

											</Link>
										</Skeleton>
									}
								</HStack>
							</Flex>
						</Flex>
				</Flex>
        </>
    )
}

export default MintView;
