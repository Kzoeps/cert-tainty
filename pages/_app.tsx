import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {ChakraProvider} from '@chakra-ui/react';
import Navigation from '../components/navigation/navigation';
import Footer from '../components/footer/footer';
import {WagmiConfig} from 'wagmi';
import {client} from '../wagmi.config';
import 'antd/dist/antd.css';
import {ApolloProvider} from '@apollo/client';
import apolloClient from '../apollo-client';

function MyApp({Component, pageProps}: AppProps) {
	return (
		<ApolloProvider client={apolloClient}>
			<ChakraProvider>
				<WagmiConfig client={client}>
					<Navigation/>
					<Component {...pageProps} />
					<Footer/>
				</WagmiConfig>
			</ChakraProvider>
		</ApolloProvider>
	);
}

export default MyApp;
