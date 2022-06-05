import { Button, SimpleGrid, Tbody, Td, Tfoot, Th, Thead, Tr, Table, TableContainer, Text } from '@chakra-ui/react';

export function TableComponent() {
    return(
        <TableContainer>
            <Table variant='striped'>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Institution Name</Th>
                        <Th>Institution Type</Th>
                        <Th>Documents</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>Jigme</Td>
                        <Td>jigme@lodey.com</Td>
                        <Td>Selise</Td>
                        <Td>College</Td>
                        <Td>https://www.hello.com</Td>
                        <Td>
                            <SimpleGrid  columns={ { base: 1, md: 2 } } spacing={{ lg: 1 }}>
                                <Button background='green.400'
                                        _hover={{ bg: "green.500" }}
                                        _focus={{ boxShadow: "outline" }} width='fit-content'>
                                    <Text color='white' fontWeight='300'>Accept</Text>
                                </Button>
                                <Button _hover={{ bg: "red.500" }}
                                        _focus={{ boxShadow: "outline" }}
                                        background='red.400' width='fit-content'>
                                    <Text color='white' fontWeight='300'>Reject</Text>
                                </Button>
                            </SimpleGrid>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>Jigme</Td>
                        <Td>jigme@lodey.com</Td>
                        <Td>Selise</Td>
                        <Td>College</Td>
                        <Td>https://www.hello.com</Td>
                        <Td>
                            <SimpleGrid  columns={ { base: 1, md: 2 } } spacing={{ lg: 1 }}>
                                <Button background='green.400'
                                        _hover={{ bg: "green.500" }}
                                        _focus={{ boxShadow: "outline" }} width='fit-content'>
                                    <Text color='white' fontWeight='300'>Accept</Text>
                                </Button>
                                <Button _hover={{ bg: "red.500" }}
                                        _focus={{ boxShadow: "outline" }}
                                        background='red.400' width='fit-content'>
                                    <Text color='white' fontWeight='300'>Reject</Text>
                                </Button>
                            </SimpleGrid>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>Jigme</Td>
                        <Td>jigme@lodey.com</Td>
                        <Td>Selise</Td>
                        <Td>College</Td>
                        <Td>https://www.hello.com</Td>
                        <Td>
                            <SimpleGrid  columns={ { base: 1, md: 2 } } spacing={{ lg: 1 }}>
                                <Button background='green.400'
                                        _hover={{ bg: "green.500" }}
                                        _focus={{ boxShadow: "outline" }} width='fit-content'>
                                    <Text color='white' fontWeight='300'>Accept</Text>
                                </Button>
                                <Button _hover={{ bg: "red.500" }}
                                        _focus={{ boxShadow: "outline" }}
                                        background='red.400' width='fit-content'>
                                    <Text color='white' fontWeight='300'>Reject</Text>
                                </Button>
                            </SimpleGrid>
                        </Td>
                    </Tr>
                </Tbody>
                <Tfoot>

                </Tfoot>
            </Table>
        </TableContainer>
    )
}