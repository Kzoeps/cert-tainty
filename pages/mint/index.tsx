import {Box, Button, Center, FormControl, Heading, Input, Stack, Text, Textarea} from '@chakra-ui/react';
import React from 'react';

export interface MintProps {
}

const MintProps = (props: MintProps) => {
	return (
		<Center bg="gray.50" w="100%"  textAlign={'center'}>
				<Stack rounded="lg" boxShadow='lg' bg="white" maxW="xl" p={8} as={Box} textAlign={'left'} mb={24} mt={20}>
					<Heading
						lineHeight={1.1}
						fontWeight={600}
						fontSize={{base: '2xl', sm: '3xl', lg: '4xl'}}>
						Mint a certificate
					</Heading>
					<Text w="100%" mb={12} color="gray.500">
						Generate an nft for your college degree to ensure authenticity backed with cryptography.
						Please provide all required details below to mint a certificate.
					</Text>

					<Box style={{marginTop: '30px'}}>
						<Heading as="h4" size="md">
							Name
						</Heading>
						<FormControl maxW="100%" mt={2} id="name">
							<Input type="text"/>
						</FormControl>
					</Box>

					<Box style={{marginTop: '30px'}}>
						<Heading as="h4" size="md">
							Major
						</Heading>
						<FormControl maxW="100%" mt={2} id="name">
							<Input type="text"/>
						</FormControl>
					</Box>

					<Box style={{marginTop: '30px'}}>
						<Heading as="h4" size="md">
							Year Awarded
						</Heading>
						<FormControl maxW="100%" mt={2} id="name">
							<Input type="text"/>
						</FormControl>
					</Box>

					<Box style={{marginTop: '30px', marginBottom: '30px'}}>
						<Heading as="h4" size="md">
							Description
						</Heading>
						<FormControl maxW="100%" mt={2} id="name">
							<Textarea placeholder="Add any extra information details here"/>
						</FormControl>
					</Box>

					<Button colorScheme='green'>
						Submit
					</Button>
				</Stack>
		</Center>
	);
};

export default MintProps;
