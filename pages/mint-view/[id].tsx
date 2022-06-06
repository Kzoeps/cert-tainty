import {Center, Flex, HStack, Stack} from '@chakra-ui/react';
import React from "react";
import {useRouter} from 'next/router';

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
							<Stack>
								<p>{id}</p>
							</Stack>
							<Stack>
								<p>Hello World</p>
							</Stack>
						</HStack>
					</Flex>
			</Center>
        </>
    )
}

export default MintView;
