import {
    background,
    Box,
    Button,
    Heading,
    Input,
    Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader,
    ModalOverlay,
    SimpleGrid,
    Text,
    Textarea, useDisclosure
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { useMutation } from '@apollo/client';
import { MINT_LETTER } from '../../api/minting.api';

export function Recommendation() {
    const [ message, setMessage ] = useState( '' );
    const [sendLetter, { data, error, loading }] = useMutation(MINT_LETTER);
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
       data && onOpen()
    }, [data]);
    return (
        <Box p='32px'>
            <SimpleGrid columns={ { base: 1, md: 2 } } spacing={ { base: 5, lg: 8 } }>
                <Card>
                    <Box mb='24px'>
                        <Heading fontSize='18px'>
                            Recommendation Letter
                        </Heading>
                    </Box>
                    <Box>
                        <Textarea resize='none' placeholder='Typing...' height={'100vh'} onChange={ ( text ) => setMessage( text.target.value ) }/>
                            <Button onClick={() => sendLetter({
                                variables: {
                                    input:{
                                        attributes: {
                                            message,
                                        }
                                    }
                                }
                            }) } _hover={ { background: 'green.500' }} width='100%' mt='24px' backgroundColor='green.400' color='white'> Generate Signature </Button>
                    </Box>
                </Card>
                <Card>
                    <>
                        <Heading fontSize='18px'>
                            Letter Sample
                        </Heading>
                        <Box mt='24px'>
                            <Textarea resize='none'  height={'100vh'} width='100%' value={ message } disabled/>
                        </Box>
                    </>
                </Card>
            </SimpleGrid>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Your Recommendation Id is</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                           <Box>
                               {data}
                           </Box>

                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='red.400' mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button variant='green.400'>Secondary Action</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

        </Box>
    )
}

export default Recommendation;