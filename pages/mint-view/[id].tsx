import {Box, Center, Flex, Heading, HStack, Stack, Text} from '@chakra-ui/react';
import React from 'react';
import {useRouter} from 'next/router';
import Image from 'next/image';
import {FaUserAlt} from 'react-icons/fa';

export interface MintViewProps {
}

export const MintView = (props: MintViewProps) => {
	const router = useRouter();
	const {id} = router.query;
    return (
        <>
			<Center w="100%" bg="gray.50">
				<Flex minH="100vh" align="center" justify="center" bg="gray.50">
					<HStack rounded="xl" w="4xl" pl={4} mt={4} mb={4} bg={'gray.50'} spacing={2}>
						<Stack boxShadow="lg" w="55%" border={'1px'} bg={'white'} py={2} height={710}
							   borderColor={'gray.200'} borderStyle={'block'} rounded={'lg'}>
							<Image width={400} height={700} alt="certificate"
								   src="https://lh3.googleusercontent.com/lbBYOkRPvDaOZm2xBhsvTtwE9nubmUmL7FA5UjTDDZIXsxwpf5e5bjeUfhrNF95WNefnvoCLlwcWfhe6X_5_qRvR2ZIeYOIR7I5a=w600"/>
						</Stack>
						<Stack as={Box} w={'45%'} boxShadow={'lg'} h={710} py={4} pl={4} bg="white" rounded={'lg'}
							   border={'1px'} borderColor={'gray.200'} borderStyle={'block'} textAlign={'left'}>
								<Flex gap={2}>
									<FaUserAlt style={{marginTop: '3px', color: 'gray'}} size={'18px'}/> <Heading as='h4' size={'md'}>Name</Heading>
								</Flex>
							<Text fontSize="lg">
								Karma Zoepa Yoezer
							</Text>
							<Heading as="h4" size="md">
								Major
							</Heading>
							<Text fontSize="lg">
								Computer Science
							</Text>
							<Heading as="h4" size="md">
								Date Awarded
							</Heading>
							<Text fontSize="lg">
								2022-05-14
							</Text>
							<Heading as="h4" size="md">
								Description
							</Heading>
							<Text fontSize="lg">
								Graduated With summa cum laude
							</Text>
						</Stack>
						</HStack>
					</Flex>
			</Center>
        </>
    )
}

export default MintView;
