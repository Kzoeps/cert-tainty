import {Center, Flex} from '@chakra-ui/react';
import React from "react";

export interface MintViewProps {
}

export const MintView = (props: MintViewProps) => {
    return (
        <>
			<Center w="100%" bg="gray.50">
					<Flex minH='100vh' align="center" justify="center" bg="gray.50">

					</Flex>
			</Center>
        </>
    )
}

export default MintView;
