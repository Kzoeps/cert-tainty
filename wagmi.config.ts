import { WagmiConfig, createClient, defaultChains, configureChains } from 'wagmi'

import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

const alchemyId = process.env.ALCHEMY_ID

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
	alchemyProvider({ alchemyId }),
	publicProvider(),
])

// Set up client
export const client = createClient({
	autoConnect: true,
	connectors: [
		new MetaMaskConnector({ chains }),
		new CoinbaseWalletConnector({
			chains,
			options: {
				appName: 'wagmi',
			},
		})
	],
	provider,
	webSocketProvider,
});
