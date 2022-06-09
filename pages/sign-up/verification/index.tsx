import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Input,
	Menu,
	MenuButton,
	MenuItem,
	MenuList, Spinner,
	Stack,
	Text,
	useColorModeValue,
	useToast
} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import {VERIFICATION_FORM_INIT, VerificationFormI} from '../../../models/_auth.models';
import {Form, Formik} from 'formik';
import ParchmentUpload from '../../../components/upload/upload';
import {UPLOAD_PROPS} from '../../../components/upload/upload.constants';
import {UploadProps} from 'antd';
import {createRef, uploadFile} from '../../../api/file-upload.api';
import {getDownloadURL} from 'firebase/storage';
import {useAccount} from 'wagmi';
import {SUCCESS_T_CONST} from '../../../models/parchment.constants';
import {useRouter} from 'next/router';
import {useMutation, useQuery} from '@apollo/client';
import {QUERY_VERIFICATION_STATUS, VERIFY_KYC} from '../../../api/kyc.api';
import {InstitutionEnum, KYC_PROGRESS_ROUTES, KYC_ROUTE_ENUMS, KycStatusEnum} from '../../../models/parchment.models';
import Head from 'next/head';

const uploadVerifFile = async (file: File, wallet_address: string | undefined): Promise<string | undefined> => {
	if (wallet_address) {
		const ref = createRef(`verification/${wallet_address}/${file.name}`);
		const uploadedFile = await uploadFile(ref, file);
		return await getDownloadURL(uploadedFile.ref);
	}
	return undefined;
};

export default function VerificationForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [initialLoad, setInitialLoad] = useState(false);
	const [files, setFiles] = useState<File[]>([]);
	const [updateKyc, {data, loading, error}] = useMutation(VERIFY_KYC);
	const [kycStatus, setKycStatus] = useState<string | undefined | boolean>(false);
	const {loading: verifLoading, refetch} = useQuery(QUERY_VERIFICATION_STATUS);
	const {data: accountData} = useAccount();
	const toast = useToast();
	const router = useRouter();
	const uploadProps: UploadProps = {
		...UPLOAD_PROPS,
		beforeUpload: (file) => {
			setFiles((files) => [...files, file as File]);
			return false;
		}
	};
	const handleSubmit = async ({firstName, lastName, institutionName, email, institutionType}: VerificationFormI) => {
		const fileUrls = [];
		for (const file of files) {
			fileUrls.push(await uploadVerifFile(file, accountData?.address));
		}
		await updateKyc({
			variables: {
				attributes: {
					attributes: {
						documentUrl: fileUrls,
						emailAddress: email,
						firstName,
						lastName,
						institutionName,
						institutionType
					}
				}
			}
		});
		toast({
			...SUCCESS_T_CONST,
			title: 'Upload Successful'
		});
		setIsLoading(false);
		await router.push(`verification/success`);
	};
	useEffect(() => {
		if (verifLoading) setInitialLoad(true);
		refetch().then((response) => {
			setInitialLoad(false);
			const kycStatus = response?.data?.profile?.kycStatus as KycStatusEnum;
			const route = KYC_PROGRESS_ROUTES[kycStatus];
			if (KYC_ROUTE_ENUMS.includes(kycStatus)) {
				void router.push(route);
			}
		});
	}, [router, refetch, verifLoading]);

	/* eslint-disable */
	return (
		<>
			<Head>
				<title>Parchment Verification</title>
			</Head>
			<Formik initialValues={VERIFICATION_FORM_INIT} onSubmit={handleSubmit}>
				{(formik) => (
					<Form>
						<Flex minH={'100vh'} align={'center'} justify={'center'}
							  bg={useColorModeValue('gray.50', 'gray.800')}>
							<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
								<Stack align={'center'}>
									<Heading fontSize={'4xl'} textAlign={'center'}>
										Verify Yourself
									</Heading>
									<Text fontSize={'lg'} color={'gray.600'}>
										to enjoy a seamless and cert-ain certification ✌️
									</Text>
								</Stack>
								<Box
									rounded={'lg'}
									bg={useColorModeValue('white', 'gray.700')}
									boxShadow={'lg'}
									p={8}>
									<Stack spacing={4}>
										<HStack>
											<Box>
												<FormControl id="firstName" isRequired>
													<FormLabel>First Name</FormLabel>
													<Input name="firstName" onChange={formik.handleChange} type="text"/>
												</FormControl>
											</Box>
											<Box>
												<FormControl id="lastName" isRequired>
													<FormLabel>Last Name</FormLabel>
													<Input name="lastName" onChange={formik.handleChange} type="text"/>
												</FormControl>
											</Box>
										</HStack>
										<FormControl id="email" isRequired>
											<FormLabel>Email address</FormLabel>
											<Input name="email" onChange={formik.handleChange} type="email"/>
										</FormControl>
										<FormControl id="school" isRequired>
											<FormLabel> Institution Name</FormLabel>
											<Input name="institutionName" onChange={formik.handleChange}/>
										</FormControl>
										<Menu>
											<MenuButton>
												<FormControl id="type" isRequired>
													<FormLabel> Institution Type </FormLabel>
													<Input value={formik.values.institutionType} readOnly name="institutionName"/>
												</FormControl>
											</MenuButton>
											<MenuList>
												<MenuItem onClick={() => formik.setFieldValue('institutionType', InstitutionEnum.school)}  value={InstitutionEnum.school}>School</MenuItem>
												<MenuItem onClick={() => formik.setFieldValue('institutionType', InstitutionEnum.college)} value={InstitutionEnum.college}>College</MenuItem>
											</MenuList>
										</Menu>
										<ParchmentUpload uploadProps={uploadProps}/>
										<Stack spacing={10} pt={2}>
											<Button
												isLoading={isLoading}
												loadingText="Submitting"
												size="lg"
												type="submit"
												bg={'green.400'}
												color={'white'}
												_hover={{
													bg: 'green.500'
												}}>
												Submit
											</Button>
										</Stack>
									</Stack>
								</Box>
							</Stack>
						</Flex>
					</Form>
				)}
			</Formik>
		</>
	);
	/* eslint-disable */
}
