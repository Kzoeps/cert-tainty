import {Connector, useAccount, useConnect, useDisconnect} from 'wagmi';
import { useToast } from '@chakra-ui/react'
import {useEffect, useState} from 'react';
import {Text, VStack} from '@chakra-ui/react';
import MetaMaskIcon from '../mtmsk-icon/mtmsk-icon';
import CertIconButton from '../icon-button/icon-button';
import axios, {AxiosResponse} from 'axios';
import {useRouter} from 'next/router';

export interface WalletListProps {
	isSignUp?: boolean
}

export function WalletList({isSignUp = true}: WalletListProps) {
	const router = useRouter();
	const [connectoroes, setConnectores] = useState<Connector<any, any>[]>([]);
	const [isConnected, setIsConnected] = useState<string | undefined>('loading');
	const {data, isLoading, isError} = useAccount();
	const {disconnect} = useDisconnect();
	const toast = useToast();
	const {connect, connectors, error, isConnecting, pendingConnector} =
		useConnect({
			onSettled: data => {
				const wallet_address = data?.account;
				if (wallet_address) {
					axios.post('/api/nonce', {wallet_address}).then((response: AxiosResponse<{ hash: string }>) => {
						const {data} = response;
						const url = process.env.NEXT_PUBLIC_RR_API;
						if (isSignUp) {
							axios.post(`${url}/users`, {
								wallet_address
							}).then((response) => {
								toast({
									title: 'Account created.',
									description: "Account successfully created, please submit documents for verification.",
									status: 'success',
									isClosable: true,
								});
								void router.push('/sign-up/verification');
							})
						}
						console.log(process.env.NEXT_PUBLIC_RR_API);
					});
				}
			}
		});

	useEffect(() => {
		if (connectors.every(connector => connector.ready)) {
			setConnectores(connectors);
		}
	}, [connectors]);
	useEffect(() => {
		if (isLoading) {
			setIsConnected('loading');
		} else if (isError) {
			setIsConnected('error');
		}
		setIsConnected(data?.address);
	}, [isLoading, isError, data]);
	if (isConnected === 'loading') {
		return (
			<VStack>
				<Text>Loading ...</Text>
			</VStack>
		);
	}
	if (isConnected === 'error') {
		return (
			<VStack>
				<Text>Error occurred: Please refresh and try again</Text>
			</VStack>
		);
	}

	if (isConnected) {
		return (
			<VStack>
				<CertIconButton onClick={() => disconnect()} title="Disconnect" icon={undefined}/>
			</VStack>
		);
	}
	return (
		<VStack>
			{connectoroes.map((connector) => (
				<CertIconButton
					iconSpacing="1rem"
					disabled={!connector.ready}
					key={connector.id}
					title={connector.name}
					icon={<MetaMaskIcon/>}
					onClick={() => connect(connector)}
				/>
			))}

			{error && <div>{error.message}</div>}
		</VStack>
	)
}
