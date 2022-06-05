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
import { UserData } from '../../pages/admin-dashboard/admin.model';
import { VscOpenPreview } from 'react-icons/vsc';

export function RejectedComponent(data: {profiles: UserData[]}) {
    return(
        <TableContainer>
            <Table variant='striped'>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Institution Name</Th>
                        <Th>Institution Type</Th>
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