import {Connector, useConnect} from 'wagmi';
import {useEffect, useState} from 'react';
import {VStack} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import CertIconButton from '../icon-button/icon-button';

export function WalletList(props: any) {
	const [connectoroes, setConnectores] = useState<Connector<any, any>[]>([]);
	const { connect, connectors, error, isConnecting, pendingConnector } =
		useConnect()
	useEffect(() => {
		if (connectors.every(connector => connector.ready)) {
			setConnectores(connectors);
		}
	}, [connectors])
	return (
		<VStack>
			{connectoroes.map((connector) => (
				<CertIconButton
					disabled={!connector.ready}
					key={connector.id}
					title={connector.name}
					icon={<FcGoogle/>}
					onClick={() => connect(connector)}
				/>
			))}

			{error && <div>{error.message}</div>}
		</VStack>
	)
}

{/*					{connector.name}
					{!connector.ready && ' (unsupported)'}
					{isConnecting &&
					connector.id === pendingConnector?.id &&
					' (connecting)'}
				</CertIconButton>*/}
