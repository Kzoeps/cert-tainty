import {Box, Center, Flex, Heading, HStack, Stack} from '@chakra-ui/react';
import React from "react";
import {useRouter} from 'next/router';
import Image from 'next/image';

export interface MintViewProps {
}

export const MintView = (props: MintViewProps) => {
	const router = useRouter();
	const { id } = router.query;
    return (
        <>
			<Center w="100%" bg="gray.50">
					<Flex minH='100vh' align="center" justify="center" bg="gray.50">
						<HStack w="100%" spacing={12}>
							<Stack w="lg">
								<Image layout="fill" alt="certificate" src="https://lh3.googleusercontent.com/lbBYOkRPvDaOZm2xBhsvTtwE9nubmUmL7FA5UjTDDZIXsxwpf5e5bjeUfhrNF95WNefnvoCLlwcWfhe6X_5_qRvR2ZIeYOIR7I5a=w600"/>
							</Stack>
							<Stack rounded="lg" bg="white" as={Box} textAlign={'left'}>
								<Heading as="h4" size="md">
									Name
								</Heading>
							</Stack>
						</HStack>
					</Flex>
			</Center>
        </>
    )
}

export default MintView;
