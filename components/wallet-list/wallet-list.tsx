import {Connector, useAccount, useConnect, useDisconnect, useSignMessage} from 'wagmi';
import { useToast } from '@chakra-ui/react'
import {useEffect, useRef, useState} from 'react';
import {Text, VStack} from '@chakra-ui/react';
import MetaMaskIcon from '../mtmsk-icon/mtmsk-icon';
import CertIconButton from '../icon-button/icon-button';
import axios, {AxiosResponse} from 'axios';
import {useRouter} from 'next/router';
import {SUCCESS_T_CONST} from '../../models/parchment.constants';

export interface WalletListProps {
	isSignUp?: boolean
}

const headers = {
	'Accept-Encoding': 'gzip, deflate, br',
	'Content-Type': 'application/json',
	'Accept': '*/*',
	'Connection': 'keep-alive'
}

export function WalletList({isSignUp = true}: WalletListProps) {
	const router = useRouter();
	const [connectoroes, setConnectores] = useState<Connector<any, any>[]>([]);
	const [isConnected, setIsConnected] = useState<string | undefined>('loading');
	const [showLoading, setShowLoading] = useState<boolean>(false);
	const walletRef = useRef<string | undefined>(undefined);
	const nonceRef = useRef<string | undefined>(undefined);
	const URL = process.env.NEXT_PUBLIC_RR_API;
	const {data, isLoading, isError} = useAccount();
	const {signMessage} = useSignMessage({
		onSuccess(signatureData,variables) {
			if (walletRef.current && nonceRef.current) {
				setShowLoading(true);
				axios.post(`${URL}/users/sign_in`, {
					user: {
						wallet_address: walletRef.current,
						message: nonceRef.current,
						signature: signatureData
					}
				} ).then((response) => {
					debugger;
					toast({
						title: 'Logged in successfully',
						...SUCCESS_T_CONST
					})
				}).finally(() => {
					setShowLoading(false)
				})
			}
		}
	})
	const {disconnect} = useDisconnect();
	const toast = useToast();


	const {connect, connectors, error, isConnecting, pendingConnector} =
		useConnect({
			onSettled: data => {
				const wallet_address = data?.account;
				walletRef.current = wallet_address;
				if (wallet_address) {
					setShowLoading(true);
					axios.post('/api/nonce', { wallet_address }).then((response: AxiosResponse<{ hash: string }>) => {
						const {data: {hash}} = response;
						nonceRef.current = hash;
						if (isSignUp) {
							axios.post(`${URL}/users`, {
								user: { wallet_address }
							}).then((response: AxiosResponse<{ jti: string }>) => {
								const token = response.data.jti;
								toast({
									title: 'Account created.',
									description: "Account successfully created, please submit documents for verification.",
									...SUCCESS_T_CONST
								});
								void router.push('/sign-up/verification');
							})
						} else {
							signMessage({message: hash});
						}
					}).finally(() => setShowLoading(false));
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
				<CertIconButton isLoading={showLoading} onClick={() => disconnect()} title="Disconnect" icon={undefined}/>
			</VStack>
		);
	}
	return (
		<VStack>
			{connectoroes.map((connector) => (
				<CertIconButton
					isLoading={showLoading}
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
