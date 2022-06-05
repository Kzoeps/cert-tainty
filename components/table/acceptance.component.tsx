import {
    Button,
    SimpleGrid,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
    Table,
    TableContainer,
    Text,
    Link, Center
} from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { QUERY_PROFILES_STATUS } from '../../api/admin.api';
import { VscOpenPreview } from 'react-icons/vsc';
import { UserData } from '../admin-components/admin.model';

export function AcceptanceComponent(data: {profiles: UserData[]}) {
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
                    {
                        data?.profiles?.map(( data: UserData  ) =>
                            <Tr key={data?.emailAddress}>
                                <Td>{`${data?.firstName} ${data?.lastName}`}</Td>
                                <Td>{data?.emailAddress}</Td>
                                <Td>{data?.institutionName}</Td>
                                <Td>{data?.institutionType}</Td>
                                <Td>
                                    <Center>
                                        <VscOpenPreview cursor='pointer' size='34px' onClick={() => console.log(data?.documentUrl[0])} />
                                    </Center>
                                </Td>
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
                        )
                    }
                </Tbody>
                <Tfoot>

                </Tfoot>
            </Table>
        </TableContainer>
    )
}