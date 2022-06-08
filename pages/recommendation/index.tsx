import { background, Box, Button, Heading, Input, SimpleGrid, Text, Textarea } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Card } from 'antd';
import { useMutation } from '@apollo/client';
import { MINT_LETTER } from '../../api/minting.api';

export function Recommendation() {
    const [ message, setMessage ] = useState( '' );
    const [sendLetter, { data, error, loading }] = useMutation(MINT_LETTER);
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
        </Box>
    )
}

export default Recommendation;