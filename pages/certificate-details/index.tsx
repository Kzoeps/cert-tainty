import { Box, Heading, Input, SimpleGrid, Text } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

export function CertificateDetails() {
    return(
        <Box textAlign="center" py={10} px={6}>
            <Input placeholder='Basic usage' />
            <Heading as="h2" size="xl" mt={6} mb={2}>
                This is the headline
            </Heading>
            <SimpleGrid columns={ { base: 1, md: 2 } } spacing={ { base: 5, lg: 8 } }>
                <Box> hello </Box>
                <Box> hi</Box>
            </SimpleGrid>
        </Box>
    )
}

export default CertificateDetails;