import { Box, Button, Heading, Input, SimpleGrid, Text, Textarea } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Card } from 'antd';

export function Recommendation() {
    const [ message, setMessage ] = useState( '' )
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
                        <SimpleGrid columns={{ md:2 }} spacing={{ md: 4 }}>
                            <Button mt='24px' backgroundColor='green.400' color='white'> Generate Signature </Button>
                            <Button mt='24px' backgroundColor='green.400' color='white'> Sumbit </Button>
                        </SimpleGrid>
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