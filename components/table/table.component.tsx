import { Box, Button, SimpleGrid, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import { Table, TableContainer } from '@chakra-ui/table';

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
                               <Button background='green.500' width='fit-content'>Approve</Button>
                               <Button background='red.500' width='fit-content'>Reject</Button>
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
                                <Button background='green.500' width='fit-content'>Approve</Button>
                                <Button background='red.500' width='fit-content'>Reject</Button>
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
                                <Button background='green.500' width='fit-content'>Approve</Button>
                                <Button background='red.500' width='fit-content'>Reject</Button>
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