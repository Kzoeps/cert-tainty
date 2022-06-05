import { Box, Heading, Text } from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';

export default function Info() {
	return (
		<Box bg="gray.50" textAlign="center" py={10} px={6}>
			<InfoIcon mt="80px" boxSize={'50px'} color={'blue.500'} />
			<Heading as="h2" size="xl" mt={6} mb={2}>
				Your verification is still in progress
			</Heading>
			<Text mb={"150px"} color={'gray.500'}>
				We have received your documents and are currently reviewing your application. Please feel free to email us if
				the verification takes longer than a week
			</Text>
		</Box>
	);
}
