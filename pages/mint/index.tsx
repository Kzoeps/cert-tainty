import {Box, Button, Center, FormControl, Heading, Input, Stack, Text, Textarea} from '@chakra-ui/react';
import {DatePicker} from 'antd';
import {Formik, Form} from 'formik';
import React from 'react';
import {MINT_FORM_INIT, MintForm} from '../../models/parchment.models';
import {useMutation} from '@apollo/client';
import {GENERATE_CERTIFICATE, MINT_CERTIFICATE} from '../../api/minting.api';
import {omit} from 'lodash'

export interface MintProps {
}

const MintProps = (props: MintProps) => {
	const[createCertificate, {data: mintingData, loading: mintLoading, error: mintError}] = useMutation(MINT_CERTIFICATE);
	const[generateCertificate, {data: pdfData, loading: pdfLoading, error: pdfError}] = useMutation(GENERATE_CERTIFICATE);
	const createMintVariables = (values: Partial<MintForm>) => ({
		variables: {
			attributes: {
				attributes: {
					...values
				}
			}
		}
	})
	const handleSubmit = async (values: MintForm) => {
		const temp = {...values};
		delete temp.yearAwarded;
		const data = await createCertificate(createMintVariables(temp));
		console.log(data)
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

								<Box style={{marginTop: '30px', marginBottom: '30px'}}>
									<Heading as="h4" size="md">
										Description
									</Heading>
									<FormControl maxW="100%" mt={2} id="name">
										<Textarea name="description" onChange={formik.handleChange} placeholder="Add any extra information details here"/>
									</FormControl>
								</Box>

								<Button type='submit' colorScheme="green">
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
