import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {ChakraProvider} from '@chakra-ui/react';
import Navigation from '../components/navigation/navigation';
import Footer from '../components/footer/footer';

function MyApp({Component, pageProps}: AppProps) {
	return (
		<ChakraProvider>
			<Navigation/>
			<Component {...pageProps} />
			<Footer/>
		</ChakraProvider>
	);
}

export default MyApp;
