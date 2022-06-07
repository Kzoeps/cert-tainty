import {Box, useToast, Button, Center, FormControl, Heading, Input, Stack, Text, Textarea} from '@chakra-ui/react';
import {DatePicker, UploadProps} from 'antd';
import {Form, Formik} from 'formik';
import React, {useState} from 'react';
import {MINT_FORM_INIT, MintForm} from '../../models/parchment.models';
import {useMutation, useQuery} from '@apollo/client';
import {GENERATE_CERTIFICATE, generateMetaData, GET_INSTITUTION_NAME, MINT_CERTIFICATE} from '../../api/minting.api';
import ParchmentUpload from '../../components/upload/upload';
import {UPLOAD_PROPS} from '../../components/upload/upload.constants';
import ParchmentContract from '../../utils/contract.json';
import {useAccount, useContract, useSigner} from 'wagmi';
import {createRef, uploadFile} from '../../api/file-upload.api';
import {getDownloadURL} from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import {SUCCESS_T_CONST} from '../../models/parchment.constants';
import {useRouter} from 'next/router';
import { CONTRACT_ADDRESS, ABI } from '../../models/parchment.constants';

export interface MintProps {
}

const fileMetaData = {
	contentType: 'application/json'
}

const uploadLogo = async (file: File, wallet_address: string | undefined): Promise<string | undefined> => {
	if (wallet_address) {
		const ref = createRef(`institutionLogos/${wallet_address}`);
		const uploadedFile = await uploadFile(ref, file);
		return await getDownloadURL(uploadedFile.ref);
	}
	return undefined;
}

const uploadMetaData = async (file: Blob, wallet_address: string) => {
	const fileId = uuid();
	if (wallet_address) {
		const ref = createRef(`certificates/${wallet_address}/${fileId}.json`);
		const convFile = new File([file], fileId)
		const uploadedFile = await uploadFile(ref, convFile, fileMetaData);
		return await getDownloadURL(uploadedFile.ref);
	}
}

const MintProps = (props: MintProps) => {
	const [createCertificate, {
		data: mintingData,
		loading: mintLoading,
		error: mintError
	}] = useMutation(MINT_CERTIFICATE);
	const [generateCertificate, {
		data: pdfData,
		loading: pdfLoading,
		error: pdfError
	}] = useMutation(GENERATE_CERTIFICATE);
	const { data, refetch } = useQuery(GET_INSTITUTION_NAME);
	const { data: signer } = useSigner();
	const { data: accountData} = useAccount();
	const connectedContract = useContract({
		addressOrName: CONTRACT_ADDRESS,
		contractInterface: ABI,
		signerOrProvider: signer
	})
	const [certificateId, setCertificateId] = useState('');
	const [institutionLogo, setInstitutionLogo] = useState<File | undefined>(undefined);
	const createMintVariables = (values: Partial<MintForm & { institutionLogoUrl: string; institutionName: string }>) => ({
		variables: {
			attributes: {
				attributes: {
					...values
				}
			}
		}
	});
	const toast = useToast();
	const router = useRouter();

	const getMintPdfVariables = (certificateId: string) => ({
		variables: {
			attributes: {
				certificateId
			}
		}
	});
	const uploadProps: UploadProps = {
		...UPLOAD_PROPS,
		beforeUpload: (file) => {
			setInstitutionLogo(file);
		}
	};

	const getInstitutionName = async () => {
		const result = await refetch();
		return result?.data.profile?.institutionName;
	};

	const initialMint = async (values: MintForm) => {
		const institutionName = await getInstitutionName() || '';
		const logoUrl = await uploadLogo(institutionLogo as File, accountData?.address as string);
		const temp = {...values, institutionLogoUrl: logoUrl, institutionName};
		delete temp.yearAwarded;
		const result = await createCertificate(createMintVariables(temp));
		return result?.data?.createCertificate?.id;
	};

	const mintPdf = async (id: string): Promise<string> => {
		const config = getMintPdfVariables(id);
		const result = await generateCertificate(config);
		return result?.data?.generateCertificatePdf?.url;
	};

	const mintNFT = async (values: MintForm & { pdfUrl: string}) => {
		// const pdfUrl = 'data:image/jpeg;base64,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'
		const metaData = generateMetaData({...values });
		const jsonifiedMetaData = JSON.stringify(metaData);
		const jsonBlob = new Blob([jsonifiedMetaData],{ type: 'application/json'});
		const metaUrl = await uploadMetaData(jsonBlob, accountData?.address as string);
		const tokenId = await connectedContract.safeMint(accountData?.address as string, metaUrl);
		await tokenId.wait();
		try {
			const result = await connectedContract.getTokenId();
			const id = result._hex;
			toast({
				title: 'Successfully minted your certificate',
				...SUCCESS_T_CONST
			});
			await router.push(`/mint-view/${id}?certId=${certificateId}`);
		} catch (e) {
			console.log(e);
		}
	}

	const handleSubmit = async (values: MintForm) => {
		if (accountData?.address) {
			const id = await initialMint(values);
			setCertificateId(id);
			const pdfUrl = await mintPdf(id);
			await mintNFT({ ...values, pdfUrl })
		}
	};

	return (
		<Formik initialValues={MINT_FORM_INIT} onSubmit={handleSubmit}>
			{(formik) => {
				return (
					<Form>
						<Center bg="gray.50" w="100%" textAlign={'center'}>
							<Stack rounded="lg" boxShadow="lg" bg="white" maxW="xl" p={8} as={Box} textAlign={'left'}
								   mb={24}
								   mt={20}>
								<Heading
									lineHeight={1.1}
									fontWeight={600}
									fontSize={{base: '2xl', sm: '3xl', lg: '4xl'}}>
									Mint a certificate
								</Heading>
								<Text w="100%" mb={12} color="gray.500">
									Generate an nft for your college degree to ensure authenticity backed with
									cryptography.
									Please provide all required details below to mint a certificate.
								</Text>

								<Box style={{marginTop: '30px'}}>
									<Heading as="h4" size="md">
										Name
									</Heading>
									<FormControl maxW="100%" mt={2} id="name">
										<Input name="awardedTo" onChange={formik.handleChange} type="text"/>
									</FormControl>
								</Box>

								<Box style={{marginTop: '30px'}}>
									<Heading as="h4" size="md">
										Major
									</Heading>
									<FormControl maxW="100%" mt={2} id="name">
										<Input name="major" onChange={formik.handleChange} type="text"/>
									</FormControl>
								</Box>

								<Box style={{marginTop: '30px'}}>
									<Heading as="h4" size="md">
										Year Awarded
									</Heading>
									<FormControl maxW="100%" mt={2} id="name">
										<DatePicker name="yearAwarded" onChange={(date, dateString) => formik.setFieldValue('yearAwarded', dateString)} size="large" style={{width: '100%'}}/>
									</FormControl>
								</Box>

								<Box style={{marginTop: '30px'}}>
									<Heading as="h4" size="md">
										Description
									</Heading>
									<FormControl maxW="100%" mt={2} id="name">
										<Textarea name="description" onChange={formik.handleChange}
												  placeholder="Add any extra information details here"/>
									</FormControl>
								</Box>
								<Box style={{marginTop: '30px', marginBottom: '30px'}}>
									<Heading mb={2} as="h4" size="md">
										Institution Logo
									</Heading>
									<ParchmentUpload title="Upload Institution Logo"
													 description="A 500px by 500px logo looks the best. Please make sure that the background is either transparent or white"
													 uploadProps={uploadProps}/>
								</Box>
								<Button type="submit" colorScheme="green">
									Submit
								</Button>
							</Stack>
						</Center>
					</Form>
				);
			}}
		</Formik>
	);
};

export default MintProps;

/*
		const { ethereum } = window;
		if (ethereum) {
			// @ts-ignore
			const provider = new ethers.providers.Web3Provider(ethereum);
			const signer = provider.getSigner();
			const nftContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
			debugger;
			const nftTxn = await nftContract.safeMint(accountData?.address as string, metaUrl);
			await nftTxn.wait();
			debugger;
			console.log('done', nftTxn)
			const tokenId = await connectedContract.safeMint(accountData?.address as string, metaUrl);
		}*/
