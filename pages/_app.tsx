import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {ChakraProvider} from '@chakra-ui/react';
import Navigation from '../components/navigation/navigation';

function MyApp({Component, pageProps}: AppProps) {
	return (
		<ChakraProvider>
			<Navigation/>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
