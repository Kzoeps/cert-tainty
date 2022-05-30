import {Connector, useConnect} from 'wagmi';
import {useEffect, useState} from 'react';

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
		<div>
			{connectoroes.map((connector) => (
				<button
					disabled={!connector.ready}
					key={connector.id}
					onClick={() => connect(connector)}
				>
					{connector.name}
					{!connector.ready && ' (unsupported)'}
					{isConnecting &&
					connector.id === pendingConnector?.id &&
					' (connecting)'}
				</button>
			))}

			{error && <div>{error.message}</div>}
		</div>
	)
}
