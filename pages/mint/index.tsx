import {Box, Button, Center, FormControl, Heading, Input, Stack, Text, Textarea} from '@chakra-ui/react';
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

export interface MintProps {
}

const CONTRACT_ADDRESS = "0x8AECd1bDF59d196b6e8f4EDc2175BdF2213516cc"

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
	console.log(fileId)
	if (wallet_address) {
		const ref = createRef(`certificates/${wallet_address}`);
		const convFile = new File([file], fileId)
		const uploadedFile = await uploadFile(ref, convFile);
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
		contractInterface: ParchmentContract.abi,
		signerOrProvider: signer
	})
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
		const logoUrl = await uploadLogo(institutionLogo as File, accountData.address as string);
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

	const handleSubmit = async (values: MintForm) => {
		if (accountData?.address) {
			const id = await initialMint(values);
			const pdfUrl = await mintPdf(id); // file;
			const metaData = generateMetaData({...values, pdfUrl});
			const jsonifiedMetaData = JSON.stringify(metaData);
			const jsonBlob = new Blob([jsonifiedMetaData],{ type: 'application/json'});
			const metaUrl = await uploadMetaData(jsonBlob, accountData.address);
			console.log(metaUrl);
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
