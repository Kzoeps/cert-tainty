import {CheckCircleIcon} from '@chakra-ui/icons';
import {Box, Heading, Text} from '@chakra-ui/react';
import {FC} from 'react';

export interface SuccessHeadlineProps {
	headline?: string;
	description?: string;
}

const SuccessHeadline: FC<SuccessHeadlineProps> = ({headline, description}: SuccessHeadlineProps) => {
	return (
		<Box bg="gray.50"   textAlign="center" py={10} px={6}>
			<CheckCircleIcon  mt="80px" boxSize={'50px'} color={'green.500'}/>
			<Heading as="h2" size="xl" mt={8} mb={4}>
				{headline}
			</Heading>
			<Text mb="150px" color={'gray.500'}>
				{description}
			</Text>
		</Box>
	);
};


SuccessHeadline.defaultProps = {
	headline: 'This is the headline',
	description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'
};

export default SuccessHeadline;
