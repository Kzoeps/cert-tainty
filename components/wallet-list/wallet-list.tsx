import {Connector, useConnect} from 'wagmi';
import {useEffect, useState} from 'react';
import {Icon, VStack} from '@chakra-ui/react';
import MetaMaskIcon from '../mtmsk-icon/mtmsk-icon';
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

{/*					{connector.name}
					{!connector.ready && ' (unsupported)'}
					{isConnecting &&
					connector.id === pendingConnector?.id &&
					' (connecting)'}
				</CertIconButton>*/}
